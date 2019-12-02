<template>
	<div id="top">
        <span v-if="isLoggedIn" class="topbar" >
            <p class="q-mr-xl">Welcome to {{this.$store.state.currentUser}}'s DCM</p>
            <p class="q-mr-sm">Pacemaker status  </p>
            <q-icon v-if="!isPaceMakerConnected" name="ion-radio-button-on" size="20px" color="red-13"/>
            <q-icon v-else name="ion-radio-button-on" size="25px" color="green-13"/>
            <p class="q-ml-sm" v-text="isPaceMakerConnected?'Connected!':'Disconnected'"/>
        </span>
		<div v-else>
			<q-tabs active-color="teal-14" class="text-blue-grey-7">
				<q-route-tab label="Login" icon="ion-log-in" to="/" exact />
				<q-route-tab label="Sign Up" icon="ion-person-add" to="/SignUp" exact />
			</q-tabs>
		</div>
	</div>
</template>

<script>
import { QTabs, QRouteTab } from "quasar";
import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
import Ready from "@serialport/parser-ready";
// import { resolve } from 'dns';
// @vuese
// Used also used for login flow and display user info
export default {
  name: "topbar",
	components: {
        QTabs,
        QRouteTab,
    },
    data() {
        return {
           isPaceMakerConnected: false, 
        }
    },
    computed:{
        isLoggedIn(){
            return (this.$store.state.currentUser != '')
        }
	},
	methods: {
		getDeviceComName(manufacturer) {
			
			return SerialPort.list().then ((ports) => {	
				var devComName;
				ports.forEach((path) => {
					let {comName} = path;
					console.log(path);
					if (path.manufacturer === manufacturer)   {
						devComName = comName;
					}
				});
				console.log(devComName);
				const devicePort = new SerialPort(devComName, {baudRate:115200}, console.log);
				console.log(devicePort);
				return devicePort;
			});
		},
		sendData(devicePort){
			var enumPaceType;
			const {streamMode, currentUser} = this.$store.state;
			const {
				paceType,
				// lowerRateLimit,
				// upperRateLimit,
				atricalPulseAmp,
				atricalPulseWidth,
				atricalRefractoryPeriod,
				VentricularPulseAmp,
				VentricularPulseWidth,
				PVARP
				// HRL 
				} = currentUser;
		/*
			Beginning of transmission
			Set or Echo
			Width
			BPM
			Mode
			Duty Cycle In -> amplitude
			ARP
			VRP
			order of pace types Aoo, voo, doo, aoor, voor, door, aai, vvi, aair, vvir
		*/
			if(paceType == "AOO") enumPaceType = 1;
			if(paceType == "VOO") enumPaceType = 2;
			if(paceType == "DOO") enumPaceType = 3;
			if(paceType == "AOOR") enumPaceType = 4;
			if(paceType == "VOOR") enumPaceType = 5;
			if(paceType == "DOOR") enumPaceType = 6;
			if(paceType == "AAI") enumPaceType = 7;
			if(paceType == "VVI") enumPaceType = 8;
			if(paceType == "AAIR") enumPaceType = 9;
			if(paceType == "VVIR") enumPaceType = 10;
			
			var buffer = new Buffer(14);
			// var int8Vals = new Int8Array(buffer);
			// var int16Values = new Int16Array(buffer);

			if(paceType){
				if(paceType.charAt(0) == 'A'){
					buffer[2] = atricalPulseWidth;
					buffer[5] = atricalPulseAmp;
				} else {
					buffer[2] = VentricularPulseWidth;
					buffer[5] = VentricularPulseAmp;
				}
			}
			buffer[0] = 0x16;
			buffer[1] = streamMode;
			buffer[3] = 60;
			buffer[4] = enumPaceType
			buffer[6] = atricalRefractoryPeriod;
			buffer[7] = PVARP;

			devicePort.write(buffer);
			devicePort.drain();
			console.log("wrote some values to paceMaker")

			var parser = devicePort.pipe(new Ready({ delimiter: "READY" }));
			parser.on('ready', () => {
				console.log('the ready byte sequence has been received');
				console.log(buffer);
				for(var i = 0; i < 20; i++) {
					devicePort.write(buffer);
					devicePort.drain();
				}
			});
			return {devicePort, buffer};
				// console.log('Data:', devicePort.read())
				// parser = devicePort.pipe(new Readline({delimiter: "\n"}));
				// parser.on('data', console.log);
		},
		confirmSet({devicePort, buffer}) {
			console.log(devicePort);

			const parser = devicePort.pipe(new Readline());
			parser.on('data', (data) => {
				console.log("confirming Set data: " +  data);
				if(data === "echo: " + buffer + "\n"){
					console.log("data has been set");
				}else {
					console.log("data has not been set");
					devicePort.write(buffer);
					// this.sendData(devicePort).then(this.confirmSet);
				}
			});
		},
		arduinoTalk(){
			var devicePort;
			var parser;
			
			SerialPort.list().then ((ports) => {
				var devComName;
				ports.forEach((path) => {
					let {comName} = path;
					console.log(path);
					// const port = new SerialPort(comName, {baudRate: 9600}, console.log);
					if (path.manufacturer === "Arduino LLC (www.arduino.cc)") {
						devComName = comName;
					}
				});
				return devComName;

			}).then((deviceComName) => {
				console.log(deviceComName);
				devicePort = new SerialPort(deviceComName, {baudRate:9600}, console.log);
				console.log(devicePort);
				// devicePort.open();
				parser = devicePort.pipe(new Ready({ delimiter: 'READY' }));
				parser.on('ready', () => {
					console.log('the ready byte sequence has been received');
					devicePort.write("Please talk to me\n");
					// devicePort.drain();
				});
			}).then(() => {
				parser = devicePort.pipe(new Readline({delimiter: "No\n"}));
				parser.on('data', (data) => {
					console.log("2" + data);
					devicePort.write("Cmon Please talk to me\n");
					// devicePort.drain();
				}); 
			}).then(() => {
				parser = devicePort.pipe(new Readline({delimiter: "I don't wanna\n"}));
				parser.on('data', (data) => {
					console.log("3" + data);
					devicePort.write("Why won't you talk to me\n");
					// devicePort.drain();
				}); 
			}).then(() => {
				parser = devicePort.pipe(new Readline({delimiter: "Cause they're watching us\n"}));
				parser.on('data', (data) => {
					console.log("4" + data);
				});
			}).then(() => {
				parser = devicePort.pipe(new Readline({delimiter: "END\n"}));
				parser.on('data', (data) => {
					console.log("5" + data);
					return;
				});
			}).catch(console.log);
		}
	},
    mounted: function(){
		const arduino = "Arduino LLC (www.arduino.cc)";
		// const paceMaker = "SEGGER"
		const t = this.getDeviceComName(arduino);
		const u = t.then(this.sendData);
		u.then(this.confirmSet);
    }
};
</script>

<style scoped>
.topbar{
    display: flex;
    padding: 20px 20px 0px 20px;
    border-bottom: 2.5px solid lightgray
}

.statusDot{
    font-size:75px;

}
</style>
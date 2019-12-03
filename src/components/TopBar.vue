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
			console.log("get Device Com Name");
			SerialPort.list().then ((ports) => {	
				var devComName;
				ports.forEach((path) => {
					let {comName} = path;
					console.log(path);
					if (path.manufacturer === manufacturer.name)   {
						devComName = comName;
					}
				});
				console.log(devComName);
				const devicePort = new SerialPort(devComName, {baudRate:manufacturer.baudRate}, console.log);
				console.log(devicePort);
				if(devicePort !== null || devicePort !== undefined){
					this.isPaceMakerConnected = true;
					this.$store.commit("setDevicePort", devicePort);
					console.log(this.$store.state.devicePort);
				} else {
					this.isPaceMakerConnected = false;
					this.$store.commit("setDevicePort", devicePort);
					console.log("devicePort has disconneted");
				}
				return devicePort;
			});
		},
		sendData(devicePort){
			var enumPaceType;
			const {userData, currentUser} = this.$store.state;
			const {
				paceType,
				lowerRateLimit,
				upperRateLimit,
				BPM,
				atricalPulseAmp,
				atricalPulseWidth,
				ARP,
				ventricularPulseAmp,
				ventricularPulseWidth,
				VRP
				} = userData[currentUser];
		/*
			Beginning of transmission
			Set or Echo
			Width
			BPM
			Mode
			Duty Cycle In -> amplitude
			ARP
			VRP
			upper rate limit
			lower rate limit
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
			
			var buffer = new ArrayBuffer(18);
			var int8Vals = new Int8Array(buffer, 0, 2);
			var int16Values = new Int16Array(buffer, 2, 8);

			if(paceType){
				if(paceType.charAt(0) == 'A'){
					int16Values[0] = atricalPulseWidth * 10;
					int16Values[3] = atricalPulseAmp * 2;
				} else {
					int16Values[0] = ventricularPulseWidth * 10;
					int16Values[3] = ventricularPulseAmp * 2;
				}
			}
			int8Vals[0] = 0x16;
			int8Vals[1] = 0x55;
			int16Values[1] = BPM;
			int16Values[2] = enumPaceType;
			int16Values[4] = ARP;
			int16Values[5] = VRP;
			int16Values[6] = upperRateLimit;
			int16Values[7] = lowerRateLimit;
			var writeBuffer = Buffer.from(buffer)
			devicePort.open();
			for(var i = 0; i < 20; i++) {
				devicePort.write(writeBuffer);
				devicePort.drain();
				console.log("wrote some values to paceMaker: " + writeBuffer)
			}

			// var parser = devicePort.pipe(new Ready({ delimiter: "READY" }));
			// parser.on('ready', () => {
			// 	console.log('the ready byte sequence has been received');
			// 	console.log(buffer);
			// 	for(var i = 0; i < 20; i++) {
			// 		devicePort.write(writeBuffer);
			// 		devicePort.drain();
			// 		devicePort.read();
			// 	}
			// });
			return {devicePort, writeBuffer};
				// console.log('Data:', devicePort.read())
				// parser = devicePort.pipe(new Readline({delimiter: "\n"}));
				// parser.on('data', console.log);
		},
		confirmSet({devicePort, writeBuffer}) {
			console.log(devicePort);

			const parser = devicePort.pipe(new Readline());
			console.log(parser);
			parser.on('data', (data) => {
				console.log("confirming Set data: " +  data);
				if(data === "echo: " + writeBuffer + "\n"){
					console.log("data has been set");
				}else {
					console.log("data has not been set");
					devicePort.write(writeBuffer);
					// this.sendData(devicePort).then(this.confirmSet);
				}
			});
		},
	},
    mounted: function(){
		console.log("topbar is mounted");
		const arduino = {name: "Arduino LLC (www.arduino.cc)", baudRate: 9600};
		// const paceMaker = {name: "SEGGER", baudRate: 115200}
		//var {currentUser, userData} = this.$store.state;
		

		setInterval(this.getDeviceComName, 500, arduino);
			// u.then(this.confirmSet);
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
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
var devicePort = null;
export default {
  name: "topbar",
	components: {
        QTabs,
        QRouteTab,
    },
    data() {
        return {
            
        }
    },
    computed:{
        isLoggedIn(){
            return (this.$store.state.currentUser != '')
		},
		isPaceMakerConnected(){
			return this.$store.state.isPaceMakerConnected;
		}
	},
	methods: {
		getDeviceComName(manufacturer) {
			// console.log("get Device Com Name");
			// console.log(this.isPaceMakerConnected);
			var devComName = null;
			SerialPort.list().then ((ports) => {	
				ports.forEach((path) => {
					let {comName} = path;
					//console.log(path);
					if (path.manufacturer === manufacturer.name) {
						devComName = comName;
						setTimeout(() => {this.$store.commit("setIsPaceMakerConnected", true);}, 500);
					}
				});
				console.log(devComName);
				//console.log(devicePort);
				if(devComName === null){
					setTimeout(() => {
						this.$store.commit("setIsPaceMakerConnected", false);
						devicePort = null;
					}, 500);
				}
				try{
					if(devicePort === null && this.isPaceMakerConnected){
						devicePort = new SerialPort(devComName, {baudRate:manufacturer.baudRate}, console.log);
						console.log("%c New SerialPort", "color:red; font-size: 20px");
					}
				}catch{
					devicePort = null;
					this.$store.commit("setIsPaceMakerConnected", false);
				}

			});
		},
		sendData: async function(){
			console.log("start send data");
			console.log("send data path: ");
			console.log(devicePort);
			var enumPaceMode;
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
				VRP,
				fixedAvDelay
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
			if(paceType === "AOO") enumPaceMode = 1;
			if(paceType === "VOO") enumPaceMode = 2;
			if(paceType === "DOO") enumPaceMode = 3;
			if(paceType === "AOOR") enumPaceMode = 4;
			if(paceType === "VOOR") enumPaceMode = 5;
			if(paceType === "DOOR") enumPaceMode = 6;
			if(paceType === "AAI") enumPaceMode = 7;
			if(paceType === "VVI") enumPaceMode = 8;
			if(paceType === "AAIR") enumPaceMode = 9;
			if(paceType === "VVIR") enumPaceMode = 10;
			if(paceType === "DDDR") enumPaceMode = 11;
			
			var buffer = new ArrayBuffer(20);
			var int8Vals = new Int8Array(buffer, 0, 2);
			var int16Values = new Int16Array(buffer, 2, 9);

			if(paceType){
				if(paceType.charAt(0) == 'A'){
					int16Values[0] = atricalPulseWidth;
					int16Values[3] = atricalPulseAmp;
				} else {
					int16Values[0] = ventricularPulseWidth;
					int16Values[3] = ventricularPulseAmp;
				}
			}
			int8Vals[0] = 0x16;
			int8Vals[1] = 0x55;
			int16Values[1] = BPM;
			int16Values[2] = enumPaceMode;
			int16Values[4] = ARP;
			int16Values[5] = VRP;
			int16Values[6] = upperRateLimit;
			int16Values[7] = lowerRateLimit;
			int16Values[8] = fixedAvDelay;
			var writeBuffer = Buffer.from(buffer)
			
			if(devicePort !== null && this.isPaceMakerConnected){
				// if(!devicePort.write(writeBuffer)){
				// 	devicePort.drain()
				// }
				// devicePort.on("write", () => devicePort.write(writeBuffer));
				devicePort.on("open", () => {
					console.log("open port");
					devicePort.write(writeBuffer);
					// devicePort.on("data", (data) => {
					// 	console.log("data that has been echoed: " + data);
					// });
				});
				for(var i = 0; i < 20; i++) {
					devicePort.write(writeBuffer);
					//devicePort.drain();
					console.log("wrote some values to paceMaker: ");
					console.log("data that has been echoed: " + devicePort.read())
					console.log(buffer);
				}
			
				console.log("sent all data");
				alert("Press ok to send data to the pacemaker");
				//return {devicePort, writeBuffer};
			
				//devicePort.close();
			}else alert("Parameters Not Saved! Error: Device not connected");
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
		// const arduino = {name: "Arduino LLC (www.arduino.cc)", baudRate: 9600};
		const paceMaker = {name: "SEGGER", baudRate: 115200}
		//var {currentUser, userData} = this.$store.state;
		
		//this.getDeviceComName(paceMaker);
		setInterval(this.getDeviceComName, 500, paceMaker);
		window.addEventListener('send-data', this.sendData);
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
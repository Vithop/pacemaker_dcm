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
    mounted: function(){
        var devicePort;
		var parser;
		
		SerialPort.list().then ((ports) => {
			var devComName;
			ports.forEach((path) => {
				let {comName} = path;
				console.log(path);
				// const port = new SerialPort(comName, {baudRate: 9600}, console.log);
				if (path.manufacturer === "Arduino LLC (www.arduino.cc)") {
					// deviceComName = path.comName;
					// const myPort = new SerialPort(path.comName, {baudRate:9600}, console.log);
					// console.log("yoyoyo", myPort);
					// resolve(comName);
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
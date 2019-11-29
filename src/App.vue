<template>
	<div id="app">
		<q-layout view="hHh lpR fFf">
			<SideBar v-if="isLoggedIn" />
			<q-page-container>
				<NavBar />
				<router-view />
			</q-page-container>
		</q-layout>
	</div>
</template>

<script>
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
import Ready from "@serialport/parser-ready";
// import { resolve } from 'dns';

export default {
	name: "app",
	components: {
		SideBar,
		NavBar
	},
	beforeCreate: function(){ 
		this.$store.dispatch("logout")
	},
	computed: {
		isLoggedIn(){
            return (this.$store.state.currentUser != '')
        }
	},
	mounted: function() {
		var number = 26;
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
				}else{
					number++;
					console.log(number);
					// port.close();
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

<style lang="scss">
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
p {
	font-size: 15px;
}
</style>





// parser.on('ready', () => {
// 	console.log('the ready byte sequence has been received');

// 	parser = devicePort.pipe(new Readline({delimiter: '\n'}));
// 	if(devicePort.write("Please talk to me\n")) {
// 		parser.on('data', console.log); // all data after READY is received
// 		if(devicePort.write("Cmon Please talk to me\n")){
// 			parser.on('data', console.log); // all data after READY is received
// 		}
// 	}else {
// 		devicePort.write("Please talk to me\n");
// 		console.log("Please talk to me");
// 	}
	
// 	// console.log("Please talk to me");
	
// 	console.log("Cmon Please talk to me");
// 	devicePort.write("Why won't you talk to me\n");
// 	console.log("Why won't you talk to me\n");
// 	});

// parser.on('data', console.log); // all data after READY is received
// devicePort.open();

// devicePort.close();
// const parser2 = devicePort.pipe(new Readline({ delimiter: '\r\n' }))
// parser2.on("data", console.log)	
// devicePort.close();

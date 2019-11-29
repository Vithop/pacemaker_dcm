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
	created: function() {
		var number = 26;
		var devicePort;

		SerialPort.list().then ((ports) => {
			ports.forEach((path) => {
				console.log(path);

				// let { comName } = path;

				// const port = new SerialPort(comName, {baudRate: 9600}, console.log);

				if (path.manufacturer === "Arduino LLC (www.arduino.cc)") {
					devicePort = new SerialPort(path.comName, {baudRate:9600}, console.log);
					console.log("yoyoyo", devicePort);

					var parser = devicePort.pipe(new Ready({ delimiter: 'READY' }));

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

					parser.on('ready', () => {
						console.log('the ready byte sequence has been received');
						devicePort.write("Please talk to me\n");
						// devicePort.drain();
					});
					
					parser = devicePort.pipe(new Readline({delimiter: "Please talk to me\n"}));
					parser.on('data', (data) => {
						console.log(data);
						devicePort.write("Cmon Please talk to me\n");
						// devicePort.drain();
					}); 

					parser = devicePort.pipe(new Readline({delimiter: "Cmon Please talk to me\n"}));
					parser.on('data', (data) => {
						console.log(data);
						devicePort.write("Why won't you talk to me\n");
						// devicePort.drain();
					}); 
					parser = devicePort.pipe(new Readline({delimiter: "\r\n"}));
					parser.on('data', (data) => {
						console.log(data);
					});

					// parser.on('data', console.log); // all data after READY is received
					// devicePort.open();
					
					// devicePort.close();
					// const parser2 = devicePort.pipe(new Readline({ delimiter: '\r\n' }))
					// parser2.on("data", console.log)	
					// devicePort.close();
				}else{
					number++;
					console.log(number);
					// port.close();
				}

				// port.write("data" + 1);
			});
		}).then(() => {
			// devicePort.open();
			// devicePort.write("Please talk to me");
			// console.log("Please talk to me")
			// devicePort.write("Cmon Please talk to me");
			// console.log("Cmon Please talk to me")
			// devicePort.write("Why won't you talk to me");
			// console.log("Why won't you talk to me")
			// devicePort.close();
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

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
		// const serialPort = require('serialport');
		// var number = 26;
		var devicePort;

		SerialPort.list().then ((ports) => {
			ports.forEach((path) => {
				console.log(path);

				let { comName } = path;

				const port = new SerialPort(comName, {baudRate: 9600}, console.log);

				if (path.manufacturer === "Arduino LLC (www.arduino.cc)") {
					devicePort = path;
					console.log("yoyoyo", devicePort);
				}

				const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
				parser.on("data", console.log)
				// port.write("data" + 1);
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

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

		SerialPort.list().then ((ports) => {
			ports.forEach((path) => {
				console.log(path);

				let { comName } = path;

				const port = new SerialPort(comName, {
					baudRate: 9600
				}, console.log);
				
				port.on('data', console.log);
			});
		}).catch((err) =>{
			return console.log(err);
		});

		
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

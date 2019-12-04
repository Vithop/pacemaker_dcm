<template>
	<div id="app">
		<q-layout view="hHh lpR fFf">
			<SideBar v-if="isLoggedIn" />
			<q-page-container>
				<TopBar />
				<router-view />
			</q-page-container>
		</q-layout>
	</div>
</template>

<script>
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";


export default {
	name: "app",
	components: {
		SideBar,
		TopBar
	},
	beforeCreate: function(){ 
		//this.$store.dispatch("logout")
	},
	computed: {
		isLoggedIn(){
            return (this.$store.state.currentUser != '')
        }
	},
	beforeUpdate: function(){
		// if(!this.isLoggedIn && this.$route.path != "/" && this.$route.path != "/SignUp"){
		// 	this.$router.push("/");
		// }
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

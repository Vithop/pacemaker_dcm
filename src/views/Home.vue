<template>
	<div>
		<h2 v-if="username == ''">Login</h2>
		<h2 v-else>Welcome {{username}}</h2>
		<div class="login">
			<q-input rounded outlined v-model="username" hint="User Name" v-on:keyup.enter="doLogin" />
			<br>
			<q-input rounded outlined v-model="password" type="password" hint="Password" v-on:keyup.enter="doLogin" />
		</div>
		<q-btn unelevated rounded color="teal-13" label="Login"  v-on:click="doLogin" />
		<p style="color: red"> {{message}} </p>
		<h4>About</h4>
		<div>Application Model Number: 2.0</div>
		<div>Revision Number: 83.0</div>
		<div>DCM serial number: 235-457-553</div>
		<div>Made by Dasani Skwad</div>
	</div>
</template>
<script>
import { QInput, QBtn } from "quasar";
// @vuese
//Login Screen
export default {
	name: "home",
	components: {
		QInput,
		QBtn
	},
	data: function() {
		return {
			// Takes User name input
			username: "",
			// Take Password input
			password: "",
			// Displays messages for user when submiting info
			message: ""
		};
	},
	beforeMount:function(){
		if(this.$store.state.currentUser != "") {
			this.$router.push("/DashBoard");
		}  
	},
	methods: {
		// @vuese
		// Used to submit login info and move to Dashboard screen if succesfull
		doLogin: function(event) {
			if (event) {
				this.$store
					.dispatch("login", {
						username: this.username,
						password: this.password
					})
					.then(() => {
						console.log("go to dashboard")
						this.$router.push("/DashBoard");
					})
					.catch(err => {
						this.message = err;
					});
			}
		}
	}
};
</script>

<style lang="css">
	.login{
		width: 30%;
		margin: auto; 
	}
</style>
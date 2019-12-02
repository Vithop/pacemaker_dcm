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
		<p style="color: red">{{message}}</p>
		<h4>About</h4>
		<ul>Application Model Number: 1.0</ul>
		<ul>Revision Number: 0.0</ul>
		<ul>DCM serial number: 235-457-553</ul>
		<ul>Made by Dasani Skwad</ul>
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
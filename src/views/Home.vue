<template>
	<div>
		<h2 v-if="username == ''">Login</h2>
		<h2 v-else>Hello {{username}}</h2>
		<div class="login">
			<q-input rounded outlined v-model="username" hint="User Name" />
			<br>
			<q-input rounded outlined v-model="password" type="password" hint="Password" />
		</div>
		<button v-on:click="doLogin">Login</button>
		<p>{{message}}</p>
		<br />
		<h4>About</h4>
		<ul>Application Model Number: 1.0</ul>
		<ul>Revision Number: 0.0</ul>
		<ul>DCM serial number: 235-457-553</ul>
		<h5>Made by Dasani Skwad</h5>
	</div>
</template>
<script>
import { QInput } from "quasar";
export default {
	components: {
		QInput
	},
	name: "home",
	data: function() {
		return {
			username: "",
			password: "",
			message: ""
		};
	},
	methods: {
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
<template>
	<div>
		<h1>Login</h1>
		<p>User Name</p>
		<input v-model="username" placeholder="User Name" />
		<p>Password</p>
		<input type="password" v-model="password" placeholder="Password" />
		<button v-on:click="doLogin">Login</button>
		<p>{{message}}</p>
		<br>
		<h4>About</h4>
		<ul>Application Model Number: 1.0</ul>
		<ul>Revision Number: 0.0</ul>
		<ul>DCM serial number: 235-457-553</ul>
		<h5>Made by Dasani Skwad</h5>
	</div>
</template>
<script>
export default {
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
      if(event){
        this.$store.dispatch("login", {
            username: this.username,
            password: this.password
          }).then(() => {
            this.$router.push('/DashBoard')
          }).catch((err =>{
            this.message = err
          }))
      }
		}
	}
};
</script>
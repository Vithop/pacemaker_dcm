<template>
	<div>
		<h1>This is a login page</h1>
		<input v-model="username" placeholder="User Name" />
		<p>User Name</p>
		<input v-model="password" placeholder="Password" />
		<p>Password</p>
		<button v-on:click="doLogin">Login</button>
		<p>{{message}}</p>
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
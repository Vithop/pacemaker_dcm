<template>
	<div>
		<h1>This is a sign up page</h1>
		<p>User Name</p>
		<input v-model="username" placeholder="User Name" />
		<p>Password</p>
		<input v-model="tempPassWord1" placeholder="Password" />
		<p>Retype Password</p>
		<input v-model="tempPassWord2" placeholder="One more time" />
		<div>
			<button v-on:click="doSignUp" class="btn">Sign Up</button>
		</div>
		<p>{{message}}</p>
	</div>
</template>

<script>
export default {
	name: "signUp",
	data: function() {
		return {
			username: "",
			tempPassWord1: "",
			tempPassWord2: "",
			message: ""
		};
	},
	methods: {
		doSignUp: function(event) {
      if(event){
        if (this.$store.state.users.includes[this.username]) {
          this.message = "User name is already taken";
        } else if (this.tempPassWord1 != this.tempPassWord2) {
          this.message = "Passwords don't match";
        } else {
          this.message = "Yeah you signed up!";
          this.$store.dispatch("signUp", {
            username: this.username,
            tempPassWord1: this.username
          });
        }
      }
		}
	}
};
</script>

<style scoped>
.btn { 
	margin-top: 10px;
}
</style>
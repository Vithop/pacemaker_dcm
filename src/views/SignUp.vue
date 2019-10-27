<template>
	<div>
		<h2>Sign Up</h2>
		<div class="login">
			<q-input rounded outlined v-model="username" hint="User Name" />
			<br>
			<q-input v-model="tempPassWord1" rounded outlined :type="isPwd ? 'password' : 'text'" hint="Password">
				<template v-slot:append>
				<q-icon
					:name="isPwd ? 'ion-eye-off':'ion-eye'"
					class="cursor-pointer"
					v-on:click="isPwd = !isPwd"
				/>
				</template>
			</q-input>
			<br>
			<q-input rounded outlined v-model="tempPassWord2" type="password" hint="Retype Password" />
		</div>
		<q-btn unelevated rounded color="teal-13" label="Login"  v-on:click="doSignUp" />
		<p style="color: red" >{{message}}</p>
	</div>
</template>

<script>
import { QInput, QBtn, QIcon } from "quasar";

export default {
	name: "signUp",
	components:{
		QInput,
		QBtn,
		QIcon
	},
	data: function() {
		return {
			username: "",
			tempPassWord1: "",
			tempPassWord2: "",
			isPwd:true,
			message: ""
		};
	},
	methods: {
		doSignUp: function(event) {
      if(event){
        console.log(this.$store.state)
        console.log(this.$store.state.users)
        if (this.$store.state.users.includes[this.username]) {
          this.message = "User name is already taken";
        } else if (this.tempPassWord1 != this.tempPassWord2) {
          this.message = "Passwords don't match";
        } else {
          this.message = "Yeah you signed up!";
          console.log(this.username)
          console.log(this.tempPassWord1)
          this.$store.dispatch("signUp", {
            username: this.username,
            password: this.tempPassWord1
          }).then( () => {
            this.$router.push('/DashBoard')
          })
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
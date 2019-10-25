<template>
  <div class="signUp">
    <h1>This is a sign up page</h1>
    <input v-model="username" placeholder="User Name">
    <p>User Name </p>
    <input v-model="tempPassWord1" placeholder="User Name">
    <p>Password </p>
    <input v-model="tempPassWord2" placeholder="User Name">
    <p>Retype Password </p>
    <button v-on:click="doSignUp">Sign Up</button>
  </div>
</template>
<script>
export default {
  name: 'signUp'
}
</script>
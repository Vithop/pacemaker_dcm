<template>
  <div id="app">
    <q-layout view="hHh lpR fFf">
    
      <SideBar v-if="this.$store.state.currentUser != null"/>
      <q-page-container>
        <div id="nav">
          <div id="welcomePage" v-if="this.$store.state.currentUser === null">
            <router-link to="/">Login</router-link> |
            <router-link to="/SignUp">Sign Up</router-link>
          </div>
          <div v-else> should be logged in </div>
        </div>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
  // console.log(this.$store.state.users);
export default {
  components:{
    SideBar
  }


}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#welcomePage {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

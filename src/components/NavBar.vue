<template>
	<div id="nav">
        <span v-if="isLoggedIn" class="navbar" >
            <p class="q-mr-xl">Welcome to {{this.$store.state.currentUser}}'s DCM</p>
            <p class="q-mr-sm">Pacemaker status  </p>
            <q-icon v-if="!isPaceMakerConnected" name="ion-radio-button-on" size="20px" color="red-13"/>
            <q-icon v-else name="ion-radio-button-on" size="25px" color="green-13"/>
            <p class="q-ml-sm" v-text="isPaceMakerConnected?'Connected!':'Disconnected'"/>
        </span>
		<div v-else>
			<q-tabs active-color="teal-14" class="text-blue-grey-7">
				<q-route-tab label="Login" icon="ion-log-in" to="/" exact />
				<q-route-tab label="Sign Up" icon="ion-person-add" to="/SignUp" exact />
			</q-tabs>
		</div>
	</div>
</template>

<script>
import { QTabs, QRouteTab } from "quasar";

export default {
  name: "navbar",
	components: {
        QTabs,
        QRouteTab,
    },
    data() {
        return {
           isPaceMakerConnected: false, 
        }
    },
    computed:{
        isLoggedIn(){
            return (this.$store.state.currentUser != '')
        }
    }
};
</script>

<style scoped>
.navbar{
    display: flex;
    padding: 20px 20px 0px 20px;
    border-bottom: 2.5px solid lightgray
}

.statusDot{
    font-size:75px;

}
</style>
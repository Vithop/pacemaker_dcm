<template>
	<div id="app">
		<q-layout view="hHh lpR fFf">
			<SideBar v-if="this.$store.state.currentUser != ''" />
			<q-page-container>
				<div id="nav">
					<div v-if="this.$store.state.currentUser == ''">
						<q-tabs active-color="teal-14" class="text-blue-grey-7">
							<q-route-tab label="Login" icon="ion-log-in" to="/" exact />
							<q-route-tab label="Sign Up" icon="ion-person-add" to="/SignUp" exact />
						</q-tabs>
					</div>
					<div v-else>should be logged in</div>
				</div>
				<router-view />
			</q-page-container>
		</q-layout>
	</div>
</template>

<script>
import SideBar from "@/components/SideBar";
import { QTabs, QRouteTab } from "quasar";

export default {
	components: {
		SideBar,
		QTabs,
		QRouteTab
	}
};
</script>

<style lang="scss">
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
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

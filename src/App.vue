<template>
	<div id="app">
		<q-layout view="hHh lpR fFf">
			<SideBar v-if="isLoggedIn" />
			<q-page-container>
				<TopBar />
				<router-view />
			</q-page-container>
		</q-layout>
	</div>
</template>

<script>
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";

export default {
	name: "app",
	components: {
		SideBar,
		TopBar
	},
	beforeCreate: function(){
		this.$store.dispatch("logout")
	},
	computed: {
		isLoggedIn(){
            return (this.$store.state.currentUser != '')
        }
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
p {
	font-size: 15px;
}
</style>

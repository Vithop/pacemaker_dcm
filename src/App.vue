<template>
	<div id="app">
		<q-layout view="hHh lpR fFf">
			<SideBar v-if="this.$store.state.currentUser != ''" />
			<q-page-container>
        <NavBar/>
				<router-view />
			</q-page-container>
		</q-layout>
	</div>
</template>

<script>
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";

export default {
  name: "app",
	components: {
    SideBar,
    NavBar,
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
p{
	font-size: 15px
}
</style>

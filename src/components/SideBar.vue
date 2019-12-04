
<template>
	<q-drawer
		show-if-above
		side="left"
		behavior="desktop"
		:mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
		:width="150"
		:breakpoint="500"
		bordered
		content-class="bg-white-3"
	>
		<!-- drawer content -->
		<q-list padding class="sidebar">
			<q-item active clickable v-ripple to="/DashBoard" color="black">
				<q-item-section avatar>
					<q-icon name="ion-pulse" color="secondary"/>
				</q-item-section>
				<q-item-section color="black">DashBoard</q-item-section>
			</q-item>
			<q-item active clickable v-ripple to="/PacingModes">
				<q-item-section avatar>
					<q-icon name="ion-settings" color="secondary"/>
				</q-item-section>
				<q-item-section>Settings</q-item-section>
			</q-item>

			<q-item active clickable v-ripple v-on:click="signOut">
				<q-item-section avatar>
					<q-icon name="ion-log-out" color="red-13"/>
				</q-item-section>
				<q-item-section>Sign Out</q-item-section>
			</q-item>

		</q-list>
	</q-drawer>
</template>

<script>
// @vuese
// Controls navagation after login


export default {
	name: "sideBar",
	data() {
		return {
			drawer: false,
			miniState: true
		};
	},	
	methods: {
		signOut: function(event) {
			if (event) {
				this.$store.dispatch("logout").then(() => {
					this.$router.push("/")
				});
			}
		}
	}
};
</script>

<style scoped>
.q-icon {
	font-size: 32px;
	padding-right: 10px;
}
.q-item {
	padding-top: 10px;
	padding-bottom: 10px;
}
.q-item__section--avatar {
	min-width: 0px;
}
.q-item__section--main {
	color: black;
	text-align: left;
}
</style>
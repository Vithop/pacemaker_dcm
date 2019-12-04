<template>
	<div>
		<div class="small">
			<line-chart :chartData="datacollection"></line-chart>
		</div>
		<div class="q-pa-md row items-start q-gutter-md">
			<q-card class="my-card bg-grey-3 text-grey-10">
				<q-card-section>
					<div class="text-h6">Serial Monitor from Pacemaker</div>
				</q-card-section>

				<q-card-section>{{ serialMonitor }}</q-card-section>

				<q-separator />

				<q-card-actions>
					<q-btn flat v-on:click="fillData()">Randomize</q-btn>
				</q-card-actions>
			</q-card>
		</div>
	</div>
</template>
<script>
import LineChart from "../charts/LineChart";
import { QCard, QCardSection, QCardActions, QSeparator } from "quasar";
// @vuese
// Dashboard view where ECG and other data can be viewed
export default {
	name: "dashboard",
	components: {
		LineChart,
		QCard,
		QCardSection,
		QCardActions,
		QSeparator
	},
	data() {
		return {
			datacollection: null,
			serialMonitor:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
		};
	},
	beforeMount:function(){
		if(this.$store.state.currentUser == "") {
			this.$router.push("/");
		}  
	},
	mounted() {
		this.fillData();
	},
	methods: {
		fillData() {
			this.datacollection = {
				labels: [this.getRandomInt(), this.getRandomInt()],
				datasets: [
					{
						label: "Data One",
						backgroundColor: "#027be3",
						data: [this.getRandomInt(), this.getRandomInt()]
					},
					{
						label: "Data Two",
						backgroundColor: "#26a69a",
						data: [this.getRandomInt(), this.getRandomInt()]
					}
				]
			};
		},
		getRandomInt() {
			return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
		}
	}
};
</script>

<style scoped>
.small {
	max-width: 50%;
	max-height: 50%;
}
.chartjs-render-monitor {
	width: 400px;
	height: 400px;
}
.my-card {
	width: 100%;
}
</style>
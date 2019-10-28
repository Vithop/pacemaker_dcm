<template>
	<div>
		<div class="small">
			<line-chart :chart-data="datacollection"></line-chart>
		</div>
		<div class="q-pa-md row items-start q-gutter-md">
			<q-card class="my-card bg-grey-3 text-grey-10">
				<q-card-section>
					<div class="text-h6">Our Changing Planet</div>
					<div class="text-subtitle2">by John Doe</div>
				</q-card-section>

				<q-card-section>{{ serialMonitor }}</q-card-section>

				<q-separator/>

				<q-card-actions>
					<q-btn flat v-on:click="fillData()">Randomize</q-btn>
				</q-card-actions>
			</q-card>
		</div>
	</div>
</template>
<script>
import LineChart from "../charts/LineChart";
import {
  QCard,
  QCardSection,
  QCardActions,
  QSeparator
} from 'quasar'
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
      serialMonitor: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		};
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
						backgroundColor: "#f87979",
						data: [this.getRandomInt(), this.getRandomInt()]
					},
					{
						label: "Data One",
						backgroundColor: "#f87979",
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
.my-card{
  width: 100%;
}
</style>
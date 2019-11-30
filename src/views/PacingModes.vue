<template>
	<div>
		<h3>Pacing Modes and Programmable Parameters</h3>
		<q-tabs v-model="paceType" class="bg-teal text-white shadow-2">
			<div v-for="(paceOption, index) in paceOptions" :key="index">
				<q-tab :name="paceOption" :label="paceOption" />
			</div>
		</q-tabs>
		<div class="row">
			<div class="col">
				<div class="q-pa-md">
					<q-item-label header class="pace-rate-label">Pacing Rate Limit</q-item-label>
					<span class="slider-badge">
						<q-badge color="secondary">Lower Rate Limit (30 - 50ppm): {{ lowerRateLimit }}</q-badge>
					</span>
					<q-slider
						v-model.lazy="lowerRateLimit"
						:min="30"
						:max="50"
						markers
						:step="5"
						color="green"
						label
					/>
					<span class="slider-badge">
						<q-badge color="secondary">Upper rate Limit (50 - 175ppm): {{ upperRateLimit }}</q-badge>
					</span>
					<q-slider v-model="upperRateLimit" :min="50" :max="175" markers :step="5" color="green" label />
				</div>

				<div
					class="q-pa-md"
					v-if="paceType === 'AOOR' || paceType === 'AAIR' || paceType === 'VOOR' || paceType === 'VVIR' || paceType === 'DOOR'"
				>
					<q-item-label header class="pace-rate-label">Maximum Sensor Rate</q-item-label>

					<span class="slider-badge">
						<q-badge color="secondary">Maximum Sensor Rate (50 - 175ppm): {{ atricalPulseAmp }}</q-badge>
					</span>

					<q-slider v-model="maxSensorRate" :min="50" :max="175" markers :step="5" color="green" label />
				</div>

				<div
					class="q-pa-md"
					v-if="paceType === 'AOOR' || paceType === 'AAIR' || paceType === 'VOOR' || paceType === 'VVIR' || paceType === 'DOOR'"
				>
					<q-item-label header class="pace-rate-label">Maximum Sensor Rate</q-item-label>

					<span class="slider-badge">
						<q-badge color="secondary">Maximum Sensor Rate (50 - 175ppm): {{ atricalPulseAmp }}</q-badge>
					</span>

					<q-slider v-model="maxSensorRate" :min="50" :max="175" markers :step="5" color="green" label />
				</div>

				<div class="q-pa-md" v-if="paceType === 'DOO' || paceType === 'DOOR'">
					<q-item-label header class="pace-rate-label">Fixed AV Delay</q-item-label>

					<span class="slider-badge">
						<q-badge color="secondary">Fixed AV Delay (70 - 300ms): {{ fixedAvDelay }}</q-badge>
					</span>

					<q-slider v-model="fixedAvDelay" :min="70" :max="300" markers :step="5" color="green" label />
				</div>

				<div
					class="q-pa-md"
					v-if="paceType === 'AOO' || paceType === 'AAI' || paceType === 'AOOR' || paceType === 'AAIR'"
				>
					<q-item-label header class="pace-rate-label">Atrial Pulse Amplitude</q-item-label>

					<span class="slider-badge">
						<q-badge color="primary">Atrial Pulse Amplitude (0.5 - 3.2V): {{ atricalPulseAmp }}</q-badge>
					</span>

					<q-slider
						v-model="atricalPulseAmp"
						:min="0.5"
						:max="3.2"
						markers
						:step="0.5"
						color="blue"
						label
					/>
				</div>

				<div
					class="q-pa-md"
					v-if="paceType == 'AOO' || paceType == 'AAI' || paceType === 'AOOR' || paceType === 'AAIR'"
				>
					<q-item-label header class="pace-rate-label">Atrial Pulse Width</q-item-label>

					<span class="slider-badge">
						<q-badge color="primary">Atrial Pulse Width (0.1 - 1.9ms): {{ atricalPulseWidth }}</q-badge>
					</span>

					<q-slider
						v-model="atricalPulseWidth"
						:min="0.1"
						:max="1.9"
						markers
						:step="0.1"
						color="blue"
						label
					/>
				</div>

        <div class="q-pa-md" v-if="paceType == 'AAI' || paceType == 'AAIR'">
					<q-item-label header class="pace-rate-label">Atrial Sensitivity</q-item-label>

					<span class="slider-badge">
						<q-badge color="primary">Atrial Sensitivity (150 - 500ms): {{ atricalSensitivity }}</q-badge>
					</span>

					<q-slider v-model="atricalSensitivity" :min="150" :max="500" markers :step="10" color="blue" label />
				</div>


				<div class="q-pa-md" v-if="paceType == 'AAI' || paceType == 'AAIR'">
					<q-item-label header class="pace-rate-label">Atrial Refactory Period</q-item-label>

					<span class="slider-badge">
						<q-badge color="primary">Atrial Refactory Period (150 - 500ms): {{ ARP }}</q-badge>
					</span>

					<q-slider v-model="ARP" :min="150" :max="500" markers :step="10" color="blue" label />
				</div>

				<div class="q-pa-md" v-if="paceType == 'AAI' || paceType == 'AAIR'">
					<q-item-label header class="pace-rate-label">Post Ventricular Atrial Refractory Period (PVARP)</q-item-label>

					<span class="slider-badge">
						<q-badge color="primary">PVARP (150 - 500ms): {{ PVARP }}</q-badge>
					</span>

					<q-slider v-model="PVARP" :min="150" :max="500" markers :step="10" color="blue" label />
				</div>
			</div>


			<div class="col2">
				<div
					class="q-pa-md"
					v-if="paceType == 'AAI' || paceType == 'VVI' || paceType == 'AAI' || paceType == 'VVI'"
				>
					<q-item-label header class="pace-rate-label">Hysteresis Rate Limit</q-item-label>

					<span class="slider-badge">
						<q-badge color="red">Off or same choice as Lower Rate Limit currently: {{lowerRateLimit}}</q-badge>
					</span>

					<q-toggle v-model="HRL" color="green" />
				</div>

				<div class="q-pa-md" v-if="paceType == 'VOO' || paceType == 'VVI'">
					<q-item-label header class="pace-rate-label">Ventricular Pulse Amplitude</q-item-label>

					<span class="slider-badge">
						<q-badge color="red">Ventricular Pulse Amplitude (3.5 - 7.0V): {{ ventricularPulseAmp }}</q-badge>
					</span>

					<q-slider
						v-model="ventricularPulseAmp"
						:min="3.5"
						:max="7.0"
						markers
						:step="0.5"
						color="red"
						label
					/>
				</div>

				<div class="q-pa-md" v-if="paceType == 'VOO' || paceType == 'VVI'">
					<q-item-label header class="pace-rate-label">Ventricular Pulse Width</q-item-label>

					<span class="slider-badge">
						<q-badge color="red">Ventricular Pulse Width (0.1 - 1.9ms): {{ ventricularPulseWidth }}</q-badge>
					</span>

					<q-slider
						v-model="ventricularPulseWidth"
						:min="0.1"
						:max="1.9"
						markers
						:step="0.1"
						color="red"
						label
					/>
				</div>


        <div class="q-pa-md" v-if="paceType == 'VVI' || paceType == 'VVIR'">
          <q-item-label header class="pace-rate-label">Ventricular Refactory Period</q-item-label>

          <span class="slider-badge">
            <q-badge color="primary">Ventricular Refactory Period (150 - 500ms): {{ VRP }}</q-badge>
          </span>

          <q-slider	v-model="VRP"	:min="150"  :max="500"	markers	:step="10"  color="blue"	label />
        </div>
        
			</div>
		</div>
		<q-btn unelevated rounded color="teal-13" label="Save Settings" v-on:click="submitData" />
	</div>
</template>
<script>
import { /*QRange,*/ QBadge, QSlider, QToggle, QTabs, QTab } from "quasar";
// @vuese
// Pacing modes and parameters view
export default {
	name: "pacingmodes",
	components: {
		//QRange,
		QBadge,
		QSlider,
		QToggle,
		QTabs,
		QTab
	},
	data: function() {
		return {
			paceType: "AOO",
			paceOptions: [
				"AOO",
				"VOO",
				"AAI",
				"VVI",
				"DOO",
				"AOOR",
				"AAIR",
				"VOOR",
				"VVIR",
				"DOOR"
			],
			lowerRateLimit: 30,
			upperRateLimit: 175,
			maxSensorRate: 5,
			fixedAvDelay: 5,
			atricalPulseAmp: 2.0,
			atricalPulseWidth: 0.5,
			atricalSensitivity: 1,
			ARP: 200,
			ventricularPulseAmp: 4.0,
			ventricularPulseWidth: 0.5,
			ventricularSensitivity: 1,
			VRP: 200,
			PVARP: 200,
			HRL: true,
			rateSmoothing: 1,
			activityThreshold: 5,
			reactTime: 0.1,
			resFactor: 3,
			recoveryTime: 3
		};
	},
	methods: {
		rateLimitCheck: function(val) {
			// console.log(value)
			//setTimeout
			if (val.min > 50) {
				this.rateLimit = { min: 50, max: val.max };
			} else if (val.max < 50) {
				this.rateLimit = { min: val.min, max: 50 };
			}
			return this.rateLimitCheck;
		},
		submitData: function(event) {
			if (event) {
				this.$store
					.dispatch("saveUsersParameters", {
						paceType: this.paceType,
						lowerRateLimit: this.lowerRateLimit,
						upperRateLimit: this.upperRateLimit,
						maxSensorRate: this.maxSensorRate,
						fixedAvDelay: this.fixedAvDelay,
						atricalPulseAmp: this.atricalPulseAmp,
						atricalPulseWidth: this.atricalPulseWidth,
						atricalSensitivity: this.atricalPulseAmp,
						ARP: this.ARP,
						ventricularPulseAmp: this.ventricularPulseAmp,
						ventricularPulseWidth: this.ventricularPulseWidth,
						ventricularSensitivity: 1,
						VRP: this.VRP,
						PVARP: this.PVARP,
						HRL: this.HRL,
						rateSmoothing: this.rateSmoothing,
						activityThreshold: this.activityThreshold,
						reactTime: this.reactTime,
						resFactor: this.resFactor,
						recoveryTime: this.recoveryTime
					})
					.then(() => {
						alert("Saved Settings!");
						console.log(
							this.$store.state.newUsers[
								this.$store.state.currentUser
							]
						);
					})
					.catch(err => {
						alert("Parameters Not Saved! Error: " + err);
					});
			}
		}
	}
};
</script>

<style scoped>
.row {
	display: flex;
}
.col {
	width: 50%;
	padding: 10px 20px;
}
.col2 {
	width: 50%;
	padding: 10px 20px 10px 20px;
}
.pace-rate-label {
	text-align: left;
}
.slider-badge {
	justify-content: space-between;
	display: flex;
}
</style>
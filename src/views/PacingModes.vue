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
						<q-badge color="secondary">Lower Rate Limit (50 - 80bpm): {{ lowerRateLimit }}</q-badge>
					</span>
					<q-slider v-model.lazy="lowerRateLimit" :min="50" :max="80" :step="1" color="green" label/>
					<span class="slider-badge">
						<q-badge color="secondary">Upper rate Limit (50 - 175ppm): {{ upperRateLimit }}</q-badge>
					</span>
					<q-slider v-model="upperRateLimit" :min="80" :max="200" :step="1" color="green" label />
				</div>

 
				<div class="q-pa-md" v-if="paceType === 'AOO' || paceType === 'AAI' || paceType === 'VOO' || paceType === 'VVI' || paceType === 'DOO'">
					<q-item-label header class="pace-rate-label">Beats per Minute</q-item-label>

					<span class="slider-badge">
						<q-badge color="secondary">Beats per Minute (50 - 100bpm): {{ BPM }}</q-badge>
					</span>

					<q-slider v-model="BPM" :min="50" :max="100" :step="1" color="green" label />
				</div>

				<div class="q-pa-md" v-if="paceType === 'DOO' || paceType === 'DOOR'">
					<q-item-label header class="pace-rate-label">Fixed AV Delay</q-item-label>

					<span class="slider-badge">
						<q-badge color="accent">Fixed AV Delay (70 - 300ms): {{ fixedAvDelay }}</q-badge>
					</span>

					<q-slider v-model="fixedAvDelay" :min="70" :max="300" markers :step="10" color="accent" label />
				</div>

				<div
					class="q-pa-md"
					v-if="paceType === 'AOO' ||  paceType === 'AAI' ||  paceType === 'AOOR' || paceType === 'AAIR'">
					<q-item-label header class="pace-rate-label">Atrial Pulse Amplitude</q-item-label>

					<span class="slider-badge">
						<q-badge color="primary">
							Atrial Pulse Amplitude (1-100% of 5V):
							{{ round_two_digits((atricalPulseAmp/100) * 5) }}V
						</q-badge>
					</span>

					<q-slider v-model="atricalPulseAmp"	:min="1" :max="100" :step="1"	color="blue" label/>
				</div>

				<div
					class="q-pa-md"
					v-if="paceType == 'AOO' || paceType == 'AAI' || paceType === 'AOOR' || paceType === 'AAIR'">
					<q-item-label header class="pace-rate-label">Atrial Pulse Width</q-item-label>

					<span class="slider-badge">
						<q-badge color="primary">
							Atrial Pulse Width (1 - 10ms):
							{{ atricalPulseWidth }}
						</q-badge>
					</span>

					<q-slider v-model="atricalPulseWidth" :min="1" :max="10" markers :step="1" color="blue" label/>
				</div>

				<div class="q-pa-md" v-if="paceType == 'VOO' || paceType == 'VVI' || paceType == 'VOOR' || paceType == 'VVIR'">
					<q-item-label header class="pace-rate-label">Ventricular Pulse Amplitude</q-item-label>

					<span class="slider-badge">
						<q-badge color="red">
							Ventricular Pulse Amplitude (1-100% of 5V):
							{{ round_two_digits((ventricularPulseAmp/100) * 5) }}V
						</q-badge>
					</span>

					<q-slider v-model="ventricularPulseAmp" :min="1" :max="100" :step="1" color="red" label/>
				</div>

				<div class="q-pa-md" v-if="paceType == 'VOO' || paceType == 'VVI' || paceType == 'VOOR' || paceType == 'VVIR'">
					<q-item-label header class="pace-rate-label">Ventricular Pulse Width</q-item-label>

					<span class="slider-badge">
						<q-badge color="red">
							Ventricular Pulse Width (1 - 10ms):
							{{ ventricularPulseWidth }}
						</q-badge>
					</span>

					<q-slider v-model="ventricularPulseWidth" :min="1" :max="10"	markers	:step="1"	color="red"	label/>
				</div>

				<div class="q-pa-md" v-if="paceType == 'AAI' || paceType == 'AAIR'">
					<q-item-label header class="pace-rate-label">Atrial Sensitivity</q-item-label>

					<span class="slider-badge">
						<q-badge color="primary">
							Atrial Sensitivity (1.0 - 10mV):
							{{ atricalSensitivity }}
						</q-badge>
					</span>

					<q-slider
						v-model="atricalSensitivity"
						:min="1.0"
						:max="10"
						markers
						:step="0.5"
						color="blue"
						label
					/>
				</div>

				<div class="q-pa-md" v-if="paceType == 'AAI' || paceType == 'AAIR'">
					<q-item-label header class="pace-rate-label">Atrial Refactory Period</q-item-label>

					<span class="slider-badge">
						<q-badge color="orange">Atrial Refactory Period (150 - 500ms): {{ ARP }}</q-badge>
					</span>

					<q-slider v-model="ARP" :min="150" :max="500" :step="10" color="orange" label />
				</div>

				<div class="q-pa-md" v-if="paceType == 'AAI' || paceType == 'AAIR'">
					<q-item-label header class="pace-rate-label">Post Ventricular Atrial Refractory Period (PVARP)</q-item-label>

					<span class="slider-badge">
						<q-badge color="orange">PVARP (150 - 500ms): {{ PVARP }}</q-badge>
					</span>

					<q-slider v-model="PVARP" :min="150" :max="500" markers :step="10" color="orange" label />
				</div>
				
				
				<div class="q-pa-md" v-if="paceType == 'VVI' || paceType == 'VVIR'">
					<q-item-label header class="pace-rate-label">Ventricular Sensitivity</q-item-label>

					<span class="slider-badge">
						<q-badge color="red">
							Ventricular Sensitivity (1 - 10mV):
							{{ ventricularSensitivity }}
						</q-badge>
					</span>

					<q-slider
						v-model="ventricularSensitivity"
						:min="1"
						:max="10"
						markers
						:step="0.5"
						color="red"
						label
					/>
				</div>


				<div class="q-pa-md" v-if="paceType == 'VVI' || paceType == 'VVIR'">
					<q-item-label header class="pace-rate-label">Ventricular Refactory Period</q-item-label>

					<span class="slider-badge">
						<q-badge color="orange">Ventricular Refactory Period (150 - 500ms): {{ VRP }}</q-badge>
					</span>

					<q-slider v-model="VRP" :min="150" :max="500" :step="10" color="orange" label />
				</div>

			</div>
			<div class="col2">
				<div
					class="q-pa-md"
					v-if="paceType == 'AAI' || paceType == 'VVI' || paceType == 'AAIR' || paceType == 'VVIR'">
					<q-item-label header class="pace-rate-label">Hysteresis Rate Limit</q-item-label>

					<span class="slider-badge">
						<q-badge color="green">
							Off or same choice as Lower Rate Limit currently:
							{{ this.HRL ? this.lowerRateLimit : 0 }}
						</q-badge>
					</span>

					<q-toggle v-model="HRL" color="green" />
				</div>


				<div
					class="q-pa-md"
					v-if="paceType === 'AOOR' || paceType === 'AAIR' || paceType === 'VOOR' || paceType === 'VVIR' || paceType === 'DOOR'">
					<q-item-label header class="pace-rate-label">Maximum Sensor Rate</q-item-label>

					<span class="slider-badge">
						<q-badge color="pink">Maximum Sensor Rate (50 - 175ppm): {{ maxSensorRate }}</q-badge>
					</span>

					<q-slider v-model="maxSensorRate" :min="50" :max="175" markers :step="5" color="pink" label />
				</div>


				<div class="q-pa-md" v-if="paceType == 'AAI' || paceType == 'VVI' || paceType == 'AAI' || paceType == 'VVI'">
					<q-item-label header class="pace-rate-label">Rate Smoothing</q-item-label>

					<span class="slider-badge">
						<q-badge color="pink">
							Rate Smoothing:(Off, 3, 6, 9, 12, 15, 18, 21){{
							rateSmoothing
							}}
						</q-badge>
					</span>
					<q-slider v-model="rateSmoothing" :min="0" :max="21" markers :step="3" color="pink" label />
				</div>

				<div
					class="q-pa-md"
					v-if="paceType === 'AOOR' ||  paceType === 'AAIR' || paceType === 'VOOR' || paceType === 'VVIR' || paceType === 'DOOR'">
					<q-item-label header class="pace-rate-label">Activity Threshold</q-item-label>

					<span class="slider-badge">
						<q-badge color="pink">Activity Threshold: {{ activityThreshold }}</q-badge>
					</span>

					<q-option-group style="text-align: left; padding-top: 20px;" v-model="activityThreshold" :options="aTOptions" color="pink" inline dense />
				</div>

				<div
					class="q-pa-md"
					v-if="paceType === 'AOOR' ||  paceType === 'AAIR' || paceType === 'VOOR' || paceType === 'VVIR' || paceType === 'DOOR'">
					<q-item-label header class="pace-rate-label">Reaction Time</q-item-label>

					<span class="slider-badge">
						<q-badge color="pink">Reaction Time (10 - 50 sec): {{ reactTime }}</q-badge>
					</span>

					<q-slider v-model="reactTime" :min="10" :max="50" markers :step="10" color="pink" label />
				</div>

				<div
					class="q-pa-md"
					v-if="paceType === 'AOOR' ||  paceType === 'AAIR' || paceType === 'VOOR' || paceType === 'VVIR' || paceType === 'DOOR'">
					<q-item-label header class="pace-rate-label">Response Factor</q-item-label>

					<span class="slider-badge">
						<q-badge color="pink">Response Factor (1 - 16): {{ resFactor }}</q-badge>
					</span>

					<q-slider v-model="resFactor" :min="1" :max="16" markers :step="1" color="pink" label />
				</div>

				<div
					class="q-pa-md"
					v-if=" paceType === 'AOOR' || paceType === 'AAIR' || paceType === 'VOOR' || paceType === 'VVIR' || paceType === 'DOOR'">
					<q-item-label header class="pace-rate-label">Recovery Time</q-item-label>

					<span class="slider-badge">
						<q-badge color="pink">Recovery Time (2 - 16): {{ recoveryTime }}</q-badge>
					</span>

					<q-slider v-model="recoveryTime" :min="2" :max="16" markers :step="1" color="pink" label />
				</div>


			</div>
		</div>
		<q-btn unelevated rounded color="teal-13" label="Save Settings to Board" v-on:click="submitData" />
	</div>
</template>
<script>
import { /*QRange,*/ QBadge, QSlider, QToggle, QTabs, QTab, QOptionGroup } from "quasar";
//import {mapState} from "vuex";
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
		QTab,
		QOptionGroup
	},
	data: function() {
		return {
			paceOptions: [
				"AOO",
				"VOO",
				"DOO",
				"AOOR",
				"VOOR",
				"DOOR",
				"AAI",
				"VVI",
				"AAIR",
				"VVIR"
			],
			aTOptions: [
				{
					label: "V-Low",
					value: "V-Low"
				},
				{
					label: "Low",
					value: "Low"
				},
				{
					label: "Med-Low",
					value: "Med-Low"
				},
				{
					label: "Med",
					value: "Med"
				},
				{
					label: "Med-High",
					value: "Med-High"
				},
				{
					label: "High",
					value: "High"
				},
				{
					label: "V-High",
					value: "V-High"
				}
			],
		};
	},
	computed:{
		
		paceType:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].paceType;
			},
			set(value){
				this.$store.commit("setPaceType",value)
			}
		}, 
		lowerRateLimit:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].lowerRateLimit;
			},
			set(value){
				this.$store.commit("setLowerRateLimit",value)
			}
		}, 
		upperRateLimit:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].upperRateLimit;
			},
			set(value){
				this.$store.commit("setUpperRateLimit",value)
			}
		}, 
		BPM:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].BPM;
			},
			set(value){
				this.$store.commit("setBPM",value);
			}
		},
		maxSensorRate:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].maxSensorRate;
			},
			set(value){
				this.$store.commit("setMaxSensorRate",value)
			}
		}, 
		fixedAvDelay:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].fixedAvDelay;
			},
			set(value){
				this.$store.commit("setFixedAvDelay",value)
			}
		}, 
		atricalPulseAmp:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].atricalPulseAmp;
			},
			set(value){
				this.$store.commit("setAtricalPulseAmp",value)
			}
		}, 
		atricalPulseWidth:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].atricalPulseWidth;
			},
			set(value){
				this.$store.commit("setAtricalPulseWidth",value)
			}
		}, 
		atricalSensitivity:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].atricalSensitivity;
			},
			set(value){
				this.$store.commit("setAtricalSensitivity",value)
			}
		}, 
		ARP:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].ARP;
			},
			set(value){
				this.$store.commit("setARP",value)
			}
		}, 
		ventricularPulseAmp:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].ventricularPulseAmp;
			},
			set(value){
				this.$store.commit("setVentricularPulseAmp",value)
			}
		}, 
		ventricularPulseWidth:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].ventricularPulseWidth;
			},
			set(value){
				this.$store.commit("setVentricularPulseWidth",value)
			}
		}, 
		ventricularSensitivity:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].ventricularSensitivity;
			},
			set(value){
				this.$store.commit("setVentricularSensitivity",value)
			}
		}, 
		VRP:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].VRP;
			},
			set(value){
				this.$store.commit("setVRP",value)
			}
		}, 
		PVARP:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].PVARP;
			},
			set(value){
				this.$store.commit("setPVARP",value)
			}
		}, 
		HRL:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].HRL;
			},
			set(value){
				this.$store.commit("setHRL",value)
			}
		}, 
		rateSmoothing:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].rateSmoothing;
			},
			set(value){
				this.$store.commit("setRateSmoothing",value)
			}
		}, 
		activityThreshold:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].activityThreshold;
			},
			set(value){
				this.$store.commit("setActivityThreshold",value)
			}
		}, 
		reactTime:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].reactTime;
			},
			set(value){
				this.$store.commit("setReactTime",value)
			}
		}, 
		resFactor:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].resFactor;
			},
			set(value){
				this.$store.commit("setResFactor",value)
			}
		}, 
		recoveryTime:{
			get(){
				return this.$store.state.userData[this.$store.state.currentUser].recoveryTim;
			},
			set(value){
				this.$store.commit("setRecoveryTime",value)
			}
		}, 
	
	},
	mounted:function(){
		console.log(this.$store.state.currentUser);
		console.log(this.$store.state.userData);
	},
	methods: {
		round_two_digits: function (x) {
			var y = Math.trunc(x *100);
			return y/100;
		},
		submitData: function(event) {
			if (event) {
				this.$store
					.dispatch("saveUsersParameters").then(() => 
					{
						alert("Settings have been saved to your pacemaker!");
						console.log(
							this.$store.state.userData[
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

<template>
  <div>
    <h3>Pacing Modes and Programmable Parameters</h3>
      <q-tabs
      v-model="paceType"
      class="bg-teal text-white shadow-2"
    >
      <q-tab :name="paceOptions[0]" :label="paceOptions[0]" />
      <q-tab :name="paceOptions[1]" :label="paceOptions[1]" />
      <q-tab :name="paceOptions[2]" :label="paceOptions[2]" />
      <q-tab :name="paceOptions[3]" :label="paceOptions[3]" />
    </q-tabs>
    <div class="row">
      <div class="col">

        <div class="q-pa-md">
          <q-item-label header class="pace-rate-label">Pacing Rate Limit</q-item-label>

          <span class="slider-badge">
            <q-badge color="secondary">Lower Rate Limit (30 - 50ppm): {{ rateLimit.min }}</q-badge>
            <q-badge color="secondary">Upper rate Limit (50 - 175ppm): {{ rateLimit.max }}</q-badge>
          </span>

          <q-range
            v-model="rateLimit"
            :min="30"
            :max="175"
            color="green"
            @input="rateLimitCheck"
            label
          />
        </div>

        <div class="q-pa-md" v-if="paceType === 'AOO' || paceType === 'AAI'">
          <q-item-label header class="pace-rate-label">Atrial Pulse Amplitude</q-item-label>

          <span class="slider-badge">
            <q-badge color="primary">Atrial Pulse Amplitude (0.5 - 3.2V): {{ atricalPulseAmp }}</q-badge>
          </span>

          <q-slider v-model="atricalPulseAmp" :min="0.5" :max="3.2" :step="0.5" color="blue" label />
        </div>

        <div class="q-pa-md" v-if="paceType == 'AOO' || paceType == 'AAI'">
          <q-item-label header class="pace-rate-label">Atrial Pulse Width</q-item-label>

          <span class="slider-badge">
            <q-badge color="primary">Atrial Pulse Width (0.1 - 1.9ms): {{ atricalPulseWidth }}</q-badge>
          </span>

          <q-slider
            v-model="atricalPulseWidth"
            :min="0.1"
            :max="1.9"
            :step="0.1"
            color="blue"
            label
          />
        </div>

        <div class="q-pa-md" v-if="paceType == 'AAI'">
          <q-item-label header class="pace-rate-label">Atrial Refactory Period</q-item-label>

          <span class="slider-badge">
            <q-badge
              color="primary"
            >Atrial Refactory Period (150 - 500ms): {{ atricalRefractoryPeriod }}</q-badge>
          </span>

          <q-slider
            v-model="atricalRefractoryPeriod"
            :min="150"
            :max="500"
            :step="10"
            color="blue"
            label
          />
        </div>

        <div class="q-pa-md" v-if="paceType == 'AAI'">
          <q-item-label
            header
            class="pace-rate-label"
          >Post Ventricular Atrial Refractory Period (PVARP)</q-item-label>

          <span class="slider-badge">
            <q-badge color="primary">PVARP (150 - 500ms): {{ PVARP }}</q-badge>
          </span>

          <q-slider v-model="PVARP" :min="150" :max="500" :step="10" color="blue" label />
        </div>
      </div>

      <div class="col2">
        <div class="q-pa-md" v-if="paceType == 'AAI' || paceType == 'VVI'">
          <q-item-label header class="pace-rate-label">Hysteresis Rate Limit</q-item-label>

          <span class="slider-badge">
            <q-badge color="red">Off or same choice as Lower Rate Limit currently: {{rateLimit.min}} </q-badge>
          </span>

          <q-toggle v-model="HRL" color="green" />
        </div>

        <div class="q-pa-md" v-if="paceType == 'VOO' || paceType == 'VVI'">
          <q-item-label header class="pace-rate-label">Ventricular Pulse Amplitude</q-item-label>

          <span class="slider-badge">
            <q-badge color="red">Ventricular Pulse Amplitude (3.5 - 7.0V): {{ VentricularPulseAmp }}</q-badge>
          </span>

          <q-slider
            v-model="VentricularPulseAmp"
            :min="3.5"
            :max="7.0"
            :step="0.5"
            color="red"
            label
          />
        </div>

        <div class="q-pa-md" v-if="paceType == 'VOO' || paceType == 'VVI'">
          <q-item-label header class="pace-rate-label">Ventricular Pulse Width</q-item-label>

          <span class="slider-badge">
            <q-badge color="red">Ventricular Pulse Width (0.1 - 1.9ms): {{ VentricularPulseWidth }}</q-badge>
            
          </span>

          <q-slider
            v-model="VentricularPulseWidth"
            :min="0.1"
            :max="1.9"
            :step="0.1"
            color="red"
            label
          />
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { QRange, QBadge, QSlider, QToggle, QTabs, QTab } from "quasar";

export default {
  name: "pacingmodes",
  components: {
    QRange,
    QBadge,
    QSlider,
    QToggle,
    QTabs,
    QTab
  },
  data() {
    return {
      paceType: "AOO",
      paceOptions: ["AOO", "VOO", "AAI", "VVI"],
      rateLimit: {
        min: 30,
        max: 175
      },
      atricalPulseAmp: 2.0,
      atricalPulseWidth: 0.5,
      atricalRefractoryPeriod: 200,

      VentricularPulseAmp: 4.0,
      VentricularPulseWidth: 0.5,

      PVARP: 200,
      HRL: true
    };
  },
  methods: {
    rateLimitCheck: function(value) {
      // console.log(value)
      if (value.min > 50) {
        this.rateLimit = { min: 50, max: value.max };
      } else if (value.max < 50) {
        this.rateLimit = { min: value.min, max: 50 };
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
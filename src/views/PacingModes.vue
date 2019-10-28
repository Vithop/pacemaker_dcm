<template>
  <div>
    <h3>pacing mode view</h3>

    <div class="col">
      <!-- change this to q-tabs -->
      <q-select rounded outlined v-model="paceType" :options="paceOptions" label="Pacing Mode" />
        
      <div class="q-pa-md">
        <q-item-label header class="pace-rate-label">
          Pacing Rate Limit
        </q-item-label>

        <span class="rate-limit-badge">
          <q-badge color="secondary">
            Lower Rate Limit (30 - 50ppm): {{ rateLimit.min }}
          </q-badge>

          <q-badge color="secondary">
            Upper rate Limit (50 - 175ppm): {{ rateLimit.max }}
          </q-badge>
        </span>

        <q-range 
          v-model="rateLimit"
          :min="10" 
          :max="200" 
          color="green" 
          @input="rateLimitCheck"
          label
        />
      </div>
    </div>
  </div>
</template>
<script>
import { QSelect, QRange, QBadge } from "quasar";

export default {
  name: "pacingmodes",
  components: {
    QSelect,
    QRange,
    QBadge
  },
  data() {
    return {
      paceType: null,
      paceOptions: ["AOO", "VOO", "AAI", "VVI"],
      rateLimit: {
        min: 30,
        max: 175
      }
    }
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
.col {
  width: 50%;
  padding: 10px 20px;
}
.pace-rate-label {
  text-align: left;
}
.rate-limit-badge {
  justify-content: space-between;
  display: flex;
}
</style>
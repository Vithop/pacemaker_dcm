<template>
<div>
  <h2> pacing mode view </h2>
  <q-select 
    rounded 
    outlined 
    v-model="paceType" 
    :options="paceOptions" 
    label="Pacing Mode"
  />
</div>
</template>
<script>
import {QSelect} from "quasar"

export default {
    name:'pacingmodes',
    components: {
      QSelect
    },
    data() {
      return {
        paceType: null,
        paceOptions: [
          'AOO', 'VOO', 'AII', 'VII'
        ]
      }
    }
}
</script>

<style scoped>
</style>
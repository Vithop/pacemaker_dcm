
<template>
    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      behavior="desktop"
      :mini="true"
      :mini-width="75"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <!-- drawer content -->
      <q-list padding class="sidebar">
        <q-item 
          active
          clickable
          v-ripple
          to="/DashBoard"
        >
          <q-item-section avatar>
            <q-icon name="ion-pulse" />
          </q-item-section>
        </q-item>
        <q-item 
          active
          clickable
          v-ripple
          to="/PacingModes"
        >
          <q-item-section avatar>
            <q-icon name="ion-heart" />
          </q-item-section>
        </q-item>

        <q-item 
          active
          clickable
          v-ripple
          v-on:click="signOut"
        >
          <q-item-section avatar>
            <q-icon name="ion-log-out" />
          </q-item-section>
        </q-item>

        <q-item 
          active
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="ion-settings" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
</template>

<script>

export default {

  name: "sideBar",
  methods: {
    signOut: function(event) {
      if(event) {
        this.$store.dispatch("signOut").then( () => {
            this.$router.push('/Login')
          }
        )
      }
    }
  }
}
</script>

<style scoped>
.q-icon {
  font-size: 32px;
}
.q-item {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
<template lang="pug">

q-layout(view="lHh Lpr lFf")
  q-header(elevated class="glossy")
    q-toolbar
      q-btn(
        flat dense round
        v-on:click="leftDrawerOpen = !leftDrawerOpen"
        aria-label="Menu"
        icon="menu"
      )
      q-toolbar-title Dealer Web App

  q-drawer(
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    class="bg-grey-2"
  )
    q-list
      q-item-label(header) Essential Links

      q-item(clickable @click="onClickMenu('eventbasedjob')")
        q-item-section(avatar)
          q-icon(name="school")
        q-item-section
          q-item-label Event Based Job
          q-item-label(caption) For testing 

      q-item(clickable @click="onClickMenu('timebasedjob')")
        q-item-section(avatar)
          q-icon(name="code")
        q-item-section
          q-item-label Time Based Job
          q-item-label(caption) For testing

  q-page-container
    router-view

</template>

<style>
</style>

<script>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'LayoutDefault',
  components: {
    HelloWorld
  },
  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  },
  methods: {
    onClickMenu: function (menu) {
      switch (menu) {
        case 'eventbasedjob':
          this.$router.push({path: `/${menu}`})
          break;
        case 'timebasedjob':
          this.$router.push({path: `/${menu}`})
          break;
      
        default:
          break;
      }

    }
  }
}
</script>
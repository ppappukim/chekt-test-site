<template>
  <div>
    <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat dense round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer()"/>

          <q-toolbar-title>
            CHeKT Test
          </q-toolbar-title>

          <div>Created by Bobby kim</div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above bordered>
        <q-list bordered separator>
          <q-item-label header>
            Menu
          </q-item-label>
          <q-item clickable v-ripple
          v-for="(v, i) in menu" :key="i"
          :active="activeMenu === v.title"
          @click="onClickMenu(v.title)">

            <q-item-section avatar>
              <q-icon :name="v.icon" />
            </q-item-section>

            <q-item-section avatar>
              {{ v.title }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      leftDrawerOpen: false,
      activeMenu: 'automation rule',
      menu: [
        {
          title: 'automation rule',
          caption: 'Do Test',
          icon: 'motion_photos_auto',
        },
        {
          title: 'test',
          caption: 'Do Test',
          icon: 'manage_history',
        },
      ],
    }
  },
  methods: {
    toggleLeftDrawer: function () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    onClickMenu: function (title) {
      this.activeMenu = title
      switch (title) {
        case 'automation rule':
          this.$router.push({path: 'automationrule'})
          break;
        case 'test':
          this.$router.push({path: 'test'})
          break;
        default:
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

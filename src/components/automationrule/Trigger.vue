<template>
  <div>
    <!-- Trigger -->
    <div class="text-h6">Trigger</div>
    <div class="text-body">When triggersed somthing...</div>
    <div class="row q-col-gutter-md">
      <!-- Step 1 -->
      <q-select outlined v-model="triggerType" :options="triggerTypeList" label="Trigger Type" style="width: 300px" />
      <!-- Step 2 -->
      <q-select v-if="triggerType && triggerType == 'Zone Triggered'" multiple outlined stack-label use-chips v-model="triggerTypeChild" :rules="[triggerTypeChildRule]" :options="triggerTypeChildList" label="Trigger Type 2" style="width: 300px" />
      <q-select v-else-if="triggerType" outlined v-model="triggerTypeChild" :options="triggerTypeChildList" label="Trigger Type 2" style="width: 300px" />
      <!-- Step 3 -->
      <q-select v-if="triggerType == 'Relay'" outlined  v-model="triggerTypeChildChild" :options="triggerTypeChildChildList" label="Trigger Type 3" style="width: 300px" />
      <!-- Step 4 -->
      <!-- <q-input 
      v-if="triggerType == 'Relay' && triggerTypeChildChild == 'Momentary'" 
      v-model="triggerTypeChildChildChild" 
      filled 
      type="number"
      :rules="[
        triggerTypeChildChildChild => !!triggerTypeChildChildChild || '* Required',
        triggerTypeChildChildChild => triggerTypeChildChildChild < 301 || 'Can set max 300seconds',
      ]" 
      label="Action Type 4"
      hint="Min 1s Max 300s" 
      suffix="second(s)" /> -->
    </div>

  </div>
</template>

<script>

export default {
  name: 'trigger-compo',
  props: {
  },
  components: {
  },
  computed: {
  },
  watch: {
    
    // Trigger
    triggerType: function () {

      // When Select Trigger - Arming Change
      // Delete Condition - Arming 
      if (this.triggerType == 'Arming Change') {
        if (this.condiType == 'Arming') this.condiType = null
        this.condiTypeList = ['No Condition','Time']
      }
      else this.condiTypeList = ['No Condition', 'Time', 'Arming']

    
      switch (this.triggerType) {
        case 'zone triggered':
        case 'Zone Triggered':
          // this.triggerTypeChild = null
          this.triggerTypeChildList = ['All Zones','Zone A', 'Zone B (Bridge A)', 'Zone B (Bridge B)', 'Zone C', 'Zone D']
          // this.triggerTypeChildChildList = ['Active', 'Inactive']
          this.triggerTypeChild = [this.triggerTypeChildList[0]]
          // this.triggerTypeChildChild = this.triggerTypeChildChildList[0]
          break;
        case 'arming change':
        case 'Arming Change':
          this.triggerTypeChildList = ['Armed', 'Disarmed']
          this.triggerTypeChild = this.triggerTypeChildList[0]

          break;
        case 'monitoring portal':
        case 'Monitoring Portal':
          this.triggerTypeChildList = ['Open', 'Close']
          this.triggerTypeChild = this.triggerTypeChildList[0]
          break;
        case 'Relay':
        case 'relay':
          this.triggerTypeChildList = ['Relay A', 'Relay B', 'Relay C']
          this.triggerTypeChildChildList = ['Latch', 'Momentary']
          this.triggerTypeChild = this.triggerTypeChildList[0]
          this.triggerTypeChildChild = this.triggerTypeChildChildList[0]
          this.triggerTypeChildChildChild = '60'
          break;
      
        default:
          break;
      }
    },
  },
  created: function () {
  },
  mounted: function () {
  },
  data: function() {
    return {
      triggerType: null,
      triggerTypeChild: null,
      triggerTypeChildChild: null,
      triggerTypeChildChildChild: null,
      triggerTypeList: ['Zone Triggered', 'Arming Change', 'Monitoring Portal', 'Relay'],
      triggerTypeChildList: [],
      triggerTypeChildChildList: [],

    }
  },
  methods: {
    triggerTypeChildRule: function (val) {
      for (let i = 0; i < val.length; i++) {
        const triggerTypeChild = val[i]

        if (triggerTypeChild == 'All Zones' && val.length > 1) {
          this.triggerTypeChild = []
          this.triggerTypeChild = [val[val.length-1]]
          break 
        }
      }
    },
  }
}
</script>

<style scoped>
</style>


<template>
  <div>
    <div class="row q-col-gutter-md">
      <!-- Step 1 -->
      <q-select outlined v-model="condiType" :options="condiTypeList" label="Condition Type" style="width: 300px" />

      <!-- Step 2 -->
      <q-select v-if="condiType == 'Time'" v-model="condiTypeChild" :options="condiTypeChildList" :rules="[condiTypeChildRule]" label="Condition Type 2" outlined multiple stack-label use-chips style="width: 300px" />
      <q-select v-if="condiType == 'Arming'" v-model="condiTypeChild" :options="condiTypeChildList" label="Condition Type 2" outlined style="width: 300px" />
      
      <!-- Step 3 -->
      <q-input v-if="condiType == 'Time'" v-model="condiTypeChildChildStart" filled type="time" hint="Start" />
      <q-input v-if="condiType == 'Time'" v-model="condiTypeChildChildEnd" filled type="time"  hint="End"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'condition-compo',
  props: {
  },
  components: {
  },
  computed: {
  },
  watch: {
    
    // Condition
    condiType: function () {
      switch (this.condiType) {
        case 'Time':
        case 'time':
          this.condiTypeChildList = [ 'All Week', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          this.condiTypeChild = [this.condiTypeChildList[0]]
          this.condiTypeChildChildStart = '00:00'
          this.condiTypeChildChildEnd = '23:59'
          break;
        case 'Arming':
        case 'arming':
          this.condiTypeChildList = ['Armed', 'Disarmed']
          this.condiTypeChild = this.condiTypeChildList[0]
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
      condiType: null,
      condiTypeChild: null,
      condiTypeChildChildStart: null,
      condiTypeChildChildEnd: null,
      condiTypeList: ['No Condition', 'Time', 'Arming'],
      condiTypeChildList: [],
      condiTypeChildChildList: [],
    }
  },
  methods: {
    condiTypeChildRule: function (val) {
      console.log(val);
      for (let i = 0; i < val.length; i++) {
        const condiTypeChild = val[i]

        if (condiTypeChild == 'All Week' && val.length > 1) {
          this.condiTypeChild = []
          this.condiTypeChild = [val[val.length-1]]
          break 
        }
      }
    },
  }
}
</script>

<style scoped>
</style>


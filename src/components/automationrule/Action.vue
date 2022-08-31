<template>
  <div>
    <!-- Action -->
    <div class="row q-col-gutter-lg q-p-lg">
      <!-- Step 1 -->
      <q-select outlined v-model="actionType" :options="actionTypeList" label="Action Type" style="width: 300px" />
      <!-- Step 2 -->
      <q-select v-if="actionType == 'Record Video (20s)'" multiple outlined stack-label use-chips v-model="actionTypeChild" :options="actionTypeChildList" label="Action Type 2" style="width: 300px" />
      <q-select v-else-if="actionType" outlined v-model="actionTypeChild" :options="actionTypeChildList" label="Action Type 2" style="width: 300px" />
      <!-- Step 3 -->
      <q-select v-if="actionType == 'Talkdown'" outlined multiple stack-label use-chips v-model="actionTypeChildChild" :rules="[actionTypeChildChildRule]" :options="actionTypeChildChildList" label="Action Type 3" style="width: 300px" />
      <q-select v-else-if="actionTypeChildChild" outlined v-model="actionTypeChildChild" :options="actionTypeChildChildList" label="Action Type 3" style="width: 300px" />
      <!-- Step 4 -->
      <q-input 
      v-if="actionType == 'Relay' && actionTypeChildChild == 'Momentary'" 
      v-model="actionTypeChildChildChild" 
      filled 
      type="number"
      :rules="[
        actionTypeChildChildChild => !!actionTypeChildChildChild || '* Required',
        actionTypeChildChildChild => actionTypeChildChildChild < 301 || 'Can set max 300seconds',
      ]" 
      label="Action Type 4"
      hint="Max 60second" 
      suffix="second(s)" />
      <q-select v-if="actionType == 'Talkdown'" outlined v-model="actionTypeChildChildChild" :options="actionTypeChildChildChildList" label="Action Type 4" style="width: 300px" />

      <!-- Step 5 -->
      <q-select
      outlined
      v-if="actionType == 'Talkdown' && actionTypeChildChildChild !== '1 time'" 
      v-model="actionTypeChildChildChildChild" 
      :options="actionTypeChildChildChildChildList"
      label="Action Type 5"/>

      <!-- Step 6 -->
      <q-input  
      type="number"
      v-if="actionType == 'Talkdown' && actionTypeChildChildChild !== '1 time' && actionTypeChildChildChildChild == 'Play Interval'" 
      v-model="actionTypeChildChildChildChildChild" 
      filled 
      :rules="[
        actionTypeChildChildChildChildChild => !!actionTypeChildChildChildChildChild || '* Required',
        actionTypeChildChildChildChildChild => actionTypeChildChildChildChildChild < 61 || 'Can set max 60seconds',
      ]" 
      label="Action Type 6"
      hint="Max 60minutes" 

      fill-mask="0"
      prefix="Every"
      suffix="Minute(s)" />
    </div>

  </div>
</template>

<script>
export default {
  name: 'action-compo',
  props: {
  },
  components: {
  },
  computed: {
  },
  watch: {
    // Action
    actionType: function () {
      switch (this.actionType) {
        case 'talkdown':
        case 'Talkdown':
          this.actionTypeChildList = ['Message A', 'Message B', 'Message C']
          this.actionTypeChildChildList = ['All Speakers', 'Speaker A', 'Speaker B', 'Speaker C', 'Speaker D']
          this.actionTypeChildChildChildList = ['1 time', '2 times', '3 times', '4 times', '5 times']
          this.actionTypeChildChildChildChildList = ['Play Instantly', 'Play Interval']
          this.actionTypeChild = this.actionTypeChildList[0]
          this.actionTypeChildChild = [this.actionTypeChildChildList[0]]
          this.actionTypeChildChildChild = this.actionTypeChildChildChildList[0]
          this.actionTypeChildChildChildChild = this.actionTypeChildChildChildChildList[0]

          break;
        case 'relay':
        case 'Relay':
          this.actionTypeChildList = ['Relay A', 'Relay B', 'Relay C']
          this.actionTypeChildChildList = ['Latch', 'Momentary']
          this.actionTypeChild = this.actionTypeChildList[0]
          this.actionTypeChildChild = this.actionTypeChildChildList[0]
          this.actionTypeChildChildChild = '60'
          break;
        case 'Record Video (20s)':
        case 'record video (20s)':
          this.actionTypeChildList = ['Camera A', 'Camera B', 'Camera C']
          this.actionTypeChild = [this.actionTypeChildList[0]]
          this.actionTypeChildChildList = ['With Send App Push Notification', 'Do not Send App Push Notification']
          this.actionTypeChildChild = this.actionTypeChildChildList[0]
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
      actionType: null,
      actionTypeChild: null,
      actionTypeChildChild: null,
      actionTypeChildChildChild: null,
      actionTypeChildChildChildChild: null,
      actionTypeChildChildChildChildChild: '1',
      actionTypeList: ['Talkdown', 'Relay', 'Record Video (20s)'],
      actionTypeChildList: [],
      actionTypeChildChildList: [],
      actionTypeChildChildChildList: [],
      actionTypeChildChildChildChildList: [],
      actionTypeChildChildChildChildChildList: [],
    }
  },
  methods: {
    actionTypeChildChildRule: function (val) {
      for (let i = 0; i < val.length; i++) {
        const triggerTypeChildChild = val[i]

        if (triggerTypeChildChild == 'All Speakers' && val.length > 1) {
          this.actionTypeChildChild = []
          this.actionTypeChildChild = [val[val.length-1]]
          break 
        }
      }
    },
  }
}
</script>

<style scoped>
</style>


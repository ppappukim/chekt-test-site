<template>
  <div>
    <div class="col q-col-gutter-lg q-pa-xl" style="text-align: left;">
      
      <!-- Trigger -->
      <div class="text-h6">Trigger</div>
      <div class="text-body">When triggered somthing..?.</div>
      <div class="row q-col-gutter-md">
        <!-- Step 1 -->
        <q-select outlined v-model="triggerType" :options="triggerTypeList" label="Trigger Type" style="width: 300px" />
        <!-- Step 2 -->
        <q-select v-if="triggerType && triggerType == 'Zone Triggered'" multiple outlined stack-label use-chips v-model="triggerTypeChild" :rules="[triggerTypeChildRule]" :options="triggerTypeChildList" label="Trigger Type 2" style="width: 300px" />
        <q-select v-else-if="triggerType" outlined v-model="triggerTypeChild" :options="triggerTypeChildList" label="Trigger Type 2" style="width: 300px" />
        <!-- Step 3 -->
        <q-select v-if="triggerType == 'Relay'" outlined  v-model="triggerTypeChildChild" :options="triggerTypeChildChildList" label="Trigger Type 3" style="width: 300px" />
        <!-- Step 4 -->
        <q-input 
        v-if="triggerType == 'Relay' && triggerTypeChildChild == 'Momentary'" 
        v-model="triggerTypeChildChildChild" 
        filled 
        type="number"
        :rules="[
          triggerTypeChildChildChild => !!triggerTypeChildChildChild || '* Required',
          triggerTypeChildChildChild => triggerTypeChildChildChild < 61 || 'Can set max 60seconds',
        ]" 
        label="Action Type 4"
        hint="Max 60seconds" 
        suffix="second(s)" />
      </div>

      <!-- Action -->
      <div class="text-h6" style="margin-top:50px;">Action</div>
      <div class="text-body">Do Action somthing...</div>
      <div class="row q-col-gutter-md">
        <!-- Step 1 -->
        <q-select outlined v-model="actionType" :options="actionTypeList" label="Action Type" style="width: 300px" />
        <!-- Step 2 -->
        <q-select v-if="actionType == 'Record Video'" multiple outlined stack-label use-chips v-model="actionTypeChild" :options="actionTypeChildList" label="Action Type 2" style="width: 300px" />
        <q-select v-else-if="actionType" outlined v-model="actionTypeChild" :options="actionTypeChildList" label="Action Type 2" style="width: 300px" />
        <!-- Step 3 -->
        <q-select v-if="actionTypeChildChild" outlined v-model="actionTypeChildChild" :options="actionTypeChildChildList" label="Action Type 3" style="width: 300px" />
        <!-- Step 4 -->
        <q-input 
        v-if="actionType == 'Relay' && actionTypeChildChild == 'Momentary'" 
        v-model="actionTypeChildChildChild" 
        filled 
        type="number"
        :rules="[
          actionTypeChildChildChild => !!actionTypeChildChildChild || '* Required',
          actionTypeChildChildChild => actionTypeChildChildChild < 61 || 'Can set max 60seconds',
        ]" 
        label="Action Type 4"
        hint="Max 60seconds" 
        suffix="second(s)" />

        <q-input 
        type="number"
        v-if="actionType == 'Talkdown' && actionTypeChildChild !== '1 time'" 
        v-model="actionTypeChildChildChild" 
        filled 
        :rules="[
          actionTypeChildChildChild => !!actionTypeChildChildChild || '* Required',
          actionTypeChildChildChild => actionTypeChildChildChild < 61 || 'Can set max 60seconds',
        ]" 
        label="Action Type 4"
        hint="Max 60minutes" 

        fill-mask="0"
        prefix="Every"
        suffix="Minute(s)" />

        <!-- <q-select v-if="actionType == 'Talkdown'" outlined v-model="actionTypeChildChildChild" :options="actionTypeChildChildChildList" prefix="Every" label="Action Type 4" style="width: 300px" /> -->
      </div>
      <div class="q-py-xl">
        <q-btn color="primary" label="Add another action" @click="addRule"></q-btn>
      </div>

      <!-- Condition -->
      <div class="text-h6" style="margin-top:50px;">Condition</div>
      <div class="text-body">Only do somthing when Condition is...</div>
      <div class="row q-col-gutter-md">
        <!-- Step 1 -->
        <q-select outlined v-model="condiType" :options="condiTypeList" label="Condition Type" style="width: 300px" />

        <!-- Step 2 -->
        <q-select v-if="condiType == 'Time'" v-model="condiTypeChild" :options="condiTypeChildList" label="Condition Type 2" outlined multiple stack-label use-chips style="width: 300px" />
        <q-select v-if="condiType == 'Arming'" v-model="condiTypeChild" :options="condiTypeChildList" label="Condition Type 2" outlined style="width: 300px" />
        
         <!-- Step 3 -->
        <q-input v-if="condiType == 'Time'" v-model="condiTypeChildChildStart" filled type="time" hint="Start" />
        <q-input v-if="condiType == 'Time'" v-model="condiTypeChildChildEnd" filled type="time"  hint="End"/>
      </div>
      
    </div>

    <!-- Button -->
    <!-- <div class="q-pa-xl">
      <q-btn color="primary" label="Add" @click="addRule"></q-btn>
    </div> -->

    <!-- List -->
    <div id="ruleList">
      <div v-html="ruleList" class="col q-col-gutter-lg q-pa-xl"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AutomationRule',
  props: {
    msg: String
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

    // Action
    actionType: function () {
      switch (this.actionType) {
        case 'talkdown':
        case 'Talkdown':
          this.actionTypeChildList = ['Message A', 'Message B', 'Message C']
          this.actionTypeChildChildList = ['1 time', '2 times', '3 times', '4 times', '5 times']
          this.actionTypeChild = this.actionTypeChildList[0]
          this.actionTypeChildChild = this.actionTypeChildChildList[0]
          this.actionTypeChildChildChild = '01'
          break;
        case 'relay':
        case 'Relay':
          this.actionTypeChildList = ['Relay A', 'Relay B', 'Relay C']
          this.actionTypeChildChildList = ['Latch', 'Momentary']
          this.actionTypeChild = this.actionTypeChildList[0]
          this.actionTypeChildChild = this.actionTypeChildChildList[0]
          this.actionTypeChildChildChild = '60'
          break;
        case 'record video':
        case 'Record Video':
          this.actionTypeChildList = ['Camera A', 'Camera B', 'Camera C']
          this.actionTypeChild = [this.actionTypeChildList[0]]
          this.actionTypeChildChild = null
          break;
        default:
          break;
      }
    },
    // Condition
    condiType: function () {
      switch (this.condiType) {
        case 'Time':
        case 'time':
          this.condiTypeChildList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          this.condiTypeChild = null
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
    condiTypeChild: function () {
      if (this.condiTypeChild == 'Day') {
        this.condiTypeChildChildList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      }
    },
  },
  created: function () {
    // this.init()
  },
  mounted: function () {
    // this.$refs.triggerEl.options[1].selected = true

  },
  data: function() {
    return {
      ruleList: null,

      triggerType: null,
      triggerTypeChild: null,
      triggerTypeChildChild: null,
      triggerTypeChildChildChild: null,
      triggerTypeList: ['Zone Triggered', 'Arming Change', 'Monitoring Portal', 'Relay'],
      triggerTypeChildList: [],
      triggerTypeChildChildList: [],


      actionType: null,
      actionTypeChild: null,
      actionTypeChildChild: null,
      actionTypeChildChildChild: null,
      actionTypeList: ['Talkdown', 'Relay', 'Record Video'],
      actionTypeChildList: [],
      actionTypeChildChildList: [],
      actionTypeChildChildChildList: [],


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
    triggerTypeChildRule: function (val) {
      for (let i = 0; i < val.length; i++) {
        const triggerTypeChild = val[i];
        console.log(triggerTypeChild);

        if (triggerTypeChild == 'All Zone' && val.length > 1) {
          this.triggerTypeChild = []
          this.triggerTypeChild = [val[val.length-1]]
          break 
        }
      }
    },
    addRule: function () {
      let triggerType = ``
      let triggerTypeChild = ``
      let triggerTypeChildChild = ``
      let triggerTypeChildChildChild = ``

      if (this.triggerType) {
        triggerType = `<div>${this.triggerType}</div>`
        triggerTypeChild = `<div>${this.triggerTypeChild}</div>`
      }
      if (this.triggerTypeChild) triggerTypeChildChild = `<div>${this.triggerTypeChildChild}</div>`
      if (this.triggerTypeChildChild) triggerTypeChildChildChild = `<div>${this.triggerTypeChildChildChild}</div>`

      this.ruleList = 
      `
        <div id="rule">
          <div id="trigger">
            <div class="rule-title">Trigger</div>
            <div>
              ${triggerType}
              ${triggerTypeChild}
              ${triggerTypeChildChild}
              ${triggerTypeChildChildChild}
            </div>
          </div>
          <div id="action">
            <div class="rule-title">Action</div>
            <div>
              <div>${this.actionType}</div>
              <div>${this.actionTypeChild}</div>
              <div>${this.actionTypeChildChild}</div>
              <div>${this.actionTypeChildChildChild}</div>
            </div>
          </div>
          <div id="condition">
            <div class="rule-title">Condition</div>
            <div>
              <div>${this.condiType}</div>
              <div>${this.condiTypeChild}</div>
              <div>${this.condiTypeChildChildStart}</div>
              <div>${this.condiTypeChildChildEnd}</div>
            </div>
          </div>
        </div>
      `
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rule-item {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;

  border: solid 1px black;
  padding: 20px 10px;
  font-size: 100px;
}
#ruleList {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  margin-top: 30px;
}
::v-deep #rule {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 100px;
}
::v-deep .rule-title {
  font-size: 18px;
  font-weight: 500;
}
</style>


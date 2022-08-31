<template>
  <div>

    <!-- Trigger -->
    <Trigger class="col q-col-gutter-lg q-pl-xl q-pt-xl" />

    <!-- Condition -->
    <div ref="actions" class="col q-col-gutter-lg q-pl-xl q-pt-lg">
      <div class="text-h6" style="margin-top:50px;">Condition</div>
      <div class="text-body">When Condition is...</div>
      <Condition class="col q-col-gutter-lg q-pt-lg" />
      <div v-for="(v, i) in conditionList" :key="v">
        <div class="row">
          <div @click="onClickRemoveCondi(i)" style="margin-top:7px; padding-right:20px;">
            <q-btn round color="white" text-color="red" icon="remove" />
          </div>
          <Condition class="col" />
        </div>
      </div>
      <!-- Button -->
      <div v-if="!hideCondiButton">
        <q-btn color="white" text-color="black" icon="add"  label="Add another condition" @click="addAnotherCondi()"></q-btn>
      </div>
      <div v-else class="text-subtitle1"> Max 5 Conditions.</div>
    </div>
    

    <!-- Action -->
    <div ref="actions" class="col q-col-gutter-lg q-pl-xl q-pt-lg">
      <div class="text-h6" style="margin-top:50px;">Action</div>
      <div class="text-body">Do Action somthing...</div>
      <Action class="col q-col-gutter-lg q-pt-lg" />
      <div v-for="(v, i) in actionList" :key="v">
        <div class="row">
          <div @click="onClickRemoveAction(i)" style="margin-top:7px; padding-right:20px;">
            <q-btn round color="white" text-color="red" icon="remove" />
          </div>
          <Action class="col" />
        </div>
      </div>
      <!-- Button -->
      <div v-if="!hideActionButton">
        <q-btn color="white" text-color="black" icon="add"  label="Add another action" @click="addAnotherAction()"></q-btn>
      </div>
      <div class="text-subtitle1" v-else> Max 5 Actions.</div>
    </div>



    <!-- List -->
    <div id="ruleList">
      <div v-html="ruleList" class="col q-col-gutter-lg q-pa-xl"></div>
    </div>

  </div>
</template>

<script>
import Action from '@/components/automationrule/Action'
import Condition from '@/components/automationrule/Condition'
import Trigger from '@/components/automationrule/Trigger'

export default {
  name: 'automation-rule',
  props: {
  },
  components: {
    Action,
    Condition,
    Trigger
  },
  computed: {
  },
  watch: {
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
      actionList: [],
      actionIndex: 0,
      conditionList: [],
      conditionIndex: 0,
      hideActionButton: false,
      hideCondiButton: false 
    }
  },
  methods: {
    addAnotherAction: function () {
      if (this.actionIndex > 2) {
        this.hideActionButton = true
        this.actionList.push(`action${this.actionIndex++}`)
      }
      else this.actionList.push(`action${this.actionIndex++}`)
    },
    onClickRemoveAction: function (i) {
      if (this.actionIndex < 5) this.hideActionButton = false
      this.actionList.splice(i, 1)
      this.actionIndex--
    },
    addAnotherCondi: function () {
      if (this.conditionIndex > 2) {
        this.hideCondiButton = true
        this.conditionList.push(`action${this.conditionIndex++}`)
      }
      else this.conditionList.push(`action${this.conditionIndex++}`)
    },
    onClickRemoveCondi: function (i) {
      if (this.conditionIndex < 5) this.hideCondiButton = false
      this.conditionList.splice(i, 1)
      this.conditionIndex--
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


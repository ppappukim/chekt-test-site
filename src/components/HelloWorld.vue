<template>
  <div class="hello">
    Hello world
    <q-btn @click="doSomething" label="Do something" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

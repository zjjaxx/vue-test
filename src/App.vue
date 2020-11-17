<template>
  <div id="app">
    <Todolist></Todolist>
  </div>
</template>

<script>
import Todolist from './views/todolist'
export default {
  name: 'App',
  components: {
    Todolist
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
}
</style>

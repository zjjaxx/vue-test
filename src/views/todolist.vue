<template>
  <div>
    <Header @inputEnter="inputEnter"></Header>
    <UndoList
      @changeItemType="changeItemType"
      @updateItem="updateItem"
      :todoList="todoList"
      @removeItem="removeItem"
    ></UndoList>
  </div>
</template>

<script>
import Header from '@/components/header'
import UndoList from '@/components/undolist'
export default {
  name: 'Todolist',
  components: {
    Header,
    UndoList
  },
  data () {
    return {
      todoList: []
    }
  },
  methods: {
    inputEnter (value) {
      this.todoList.push({ type: 'div', value: value, status: false })
    },
    removeItem (index) {
      this.todoList.splice(index, 1)
    },
    updateItem (value, index) {
      this.todoList.forEach((item, _index) => {
        if (_index === index) {
          item.value = value
        }
      })
    },
    changeItemType (index, type) {
      this.todoList.forEach((item, _index) => {
        if (_index === index) {
          item.type = type
        }
      })
    }
  }
}
</script>

<style>
</style>

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
import { mapMutations, mapState } from 'vuex'
import Header from '@/components/header'
import UndoList from '@/components/undolist'
export default {
  name: 'Todolist',
  components: {
    Header,
    UndoList
  },
  data () {
    return {}
  },
  computed: mapState({
    todoList: (state) => state.todoList
  }),
  methods: {
    ...mapMutations({
      updateTodoList: 'updateTodoList'
    }),
    inputEnter (value) {
      this.updateTodoList({
        action: 'ADD',
        data: { type: 'div', value: value, status: false }
      })
    },
    removeItem (index) {
      this.updateTodoList({
        action: 'REMOVE',
        data: { index }
      })
    },
    updateItem (value, index) {
      console.log(value)
      this.updateTodoList({
        action: 'UPDATE',
        data: { index, value, param: 'value' }
      })
    },
    changeItemType (index, type) {
      this.updateTodoList({
        action: 'UPDATE',
        data: { index, type, param: 'type' }
      })
    }
  }
}
</script>

<style>
</style>

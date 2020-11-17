import { shallowMount } from '@vue/test-utils'
import Todolist from '@/views/todolist.vue'
import Header from '@/components/header'
import Undolist from '@/components/undolist'
describe('todolist test', () => {
  let todoWrapper = null
  beforeEach(() => {
    todoWrapper = shallowMount(Todolist, {})
  })
  test('todolist 存在', () => {
    expect(Todolist).not.toBeUndefined()
    expect(todoWrapper.exists()).toBe(true)
  })
  test('input有值时，按下回车键，todolist 添加输入值', () => {
    const headerWrapper = todoWrapper.findComponent(Header)
    headerWrapper.vm.$emit('inputEnter', 'bbb')
    expect(todoWrapper.vm.$data.todoList[0]).toEqual({ value: 'bbb', type: 'div', status: false })
  })
  test('删除 undoItem', () => {
    todoWrapper.setData({ todoList: [{ type: 'div', value: 'todoItem-1', status: false }, { type: 'div', value: 'todoItem-2', status: false }] })
    todoWrapper.findComponent(Undolist).vm.$emit('removeItem', 0)
    console.log(todoWrapper.vm.$data.todoList)
    expect(todoWrapper.vm.$data.todoList).toEqual([{ type: 'div', value: 'todoItem-2', status: false }])
  })
  test('编辑更新 todoList', () => {
    todoWrapper.setData({ todoList: [{ type: 'div', value: 'todoItem-1', status: false }, { type: 'div', value: 'todoItem-2', status: false }] })
    todoWrapper.findComponent(Undolist).vm.$emit('changeItemType', 1, 'input')
    expect(todoWrapper.vm.$data.todoList).toEqual([{ type: 'div', value: 'todoItem-1', status: false }, { type: 'input', value: 'todoItem-2', status: false }])
    todoWrapper.findComponent(Undolist).vm.$emit('updateItem', 'update', 1)
    expect(todoWrapper.vm.$data.todoList).toEqual([{ type: 'div', value: 'todoItem-1', status: false }, { type: 'input', value: 'update', status: false }])
  })
})

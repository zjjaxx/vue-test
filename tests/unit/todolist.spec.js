import { mount } from '@vue/test-utils'
import Todolist from '@/views/todolist.vue'

describe('todolist 集成测试', () => {
  let todoWrapper = null
  beforeEach(() => {
    todoWrapper = mount(Todolist)
  })
  test(`
        1. header 组件中的input 输入框输入待办事项
        2. 点击回车键
        3. undolist 组件中显示代办事项
        4. 清空input 输入框内容
    `, async () => {
    const input = todoWrapper.find('#input')
    input.setValue('todoItem')
    await input.trigger('keyup.enter')
    expect(todoWrapper.findAll('.undo-list .undo-item').length).toBe(1)
    expect(todoWrapper.find('.undo-list .undo-item .undo-item-text').text()).toEqual('todoItem')
    expect(input.element.value).toEqual('')
  })
  test(`
        1. undolist 组件中的item 点击删除按钮
        2. undolist 删除该item
    `, async () => {
    await todoWrapper.setData({ todoList: [{ status: false, type: 'div', value: 'undoItem1' }, { status: false, type: 'div', value: 'undoItem2' }] })
    await todoWrapper.findAll('.undo-list .undo-item .undo-item-remove-icon').at(1).trigger('click')
    expect(todoWrapper.findAll('.undo-list .undo-item').length).toBe(1)
    expect(todoWrapper.find('.undo-list .undo-item .undo-item-text').text()).toEqual('undoItem1')
  })
  test(`
        1. 点击undoItem 代办事项内容，span变成input,可以编辑该内容
        2. 修改内容
        3. 失焦时重新变回文本元素
    `, async () => {
    await todoWrapper.setData({ todoList: [{ status: false, type: 'div', value: 'undoItem1' }, { status: false, type: 'div', value: 'undoItem2' }] })
    await todoWrapper.findAll('.undo-list .undo-item .undo-item-text').at(1).trigger('click')
    expect(todoWrapper.findAll('.undo-list .undo-item').at(1).find('.undo-item-input').exists()).toBe(true)
    await todoWrapper.find('.undo-list .undo-item .undo-item-input').setValue('undoItem update')
    await todoWrapper.find('.undo-list .undo-item .undo-item-input').trigger('blur')
    expect(todoWrapper.findAll('.undo-list .undo-item').at(1).find('.undo-item-text').exists()).toBe(true)
    expect(todoWrapper.findAll('.undo-list .undo-item').at(1).find('.undo-item-text').text()).toEqual('undoItem update')
  })
})

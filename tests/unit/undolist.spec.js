import { shallowMount } from '@vue/test-utils'
import Undolist from '@/components/undolist'

describe('undolist test', () => {
  let undoWrapper = null
  beforeEach(() => {
    undoWrapper = shallowMount(Undolist, {
      propsData: {
        todoList: []
      }
    })
  })
  test('undolist 存在', () => {
    expect(Undolist).not.toBeUndefined()
    expect(undoWrapper.exists()).toBe(true)
  })
  test('当todoList为空时,count 显示为0 ,列表为空', () => {
    expect(undoWrapper.find('.undo-count').text()).toEqual('0')
    expect(undoWrapper.find('.undo-item').exists()).toBe(false)
  })
  test('当todoList 有值时，count 显示为todoList.length ,列表长度为todoList.length', async () => {
    await undoWrapper.setProps({ todoList: [{ type: 'div', value: 'todoItem-1', status: false }, { type: 'div', value: 'todoItem-2', status: false }] })
    expect(undoWrapper.find('.undo-count').text()).toEqual('2')
    expect(undoWrapper.findAll('.undo-item').length).toEqual(2)
    expect(undoWrapper.findAll('.undo-item .undo-item-text').at(1).text()).toEqual('todoItem-2')
  })
  test('test todoItem 删除', async () => {
    await undoWrapper.setProps({ todoList: [{ type: 'div', value: 'todoItem-1', status: false }, { type: 'div', value: 'todoItem-2', status: false }] })
    undoWrapper.findAll('.undo-item-remove-icon').at(0).trigger('click')
    expect(undoWrapper.emitted().removeItem[0]).toEqual([0])
  })
  test('todoItem type 为div 显示文本，type 为input 时显示输入框', async () => {
    await undoWrapper.setProps({ todoList: [{ type: 'div', value: 'todoItem-1', status: false }, { type: 'input', value: 'todoItem-2', status: false }] })
    expect(undoWrapper.findAll('.undo-item').at(0).find('.undo-item-text').exists()).toBe(true)
    expect(undoWrapper.findAll('.undo-item').at(1).find('.undo-item-input').exists()).toBe(true)
  })
  test('todoItem 点击切换编辑,失焦恢复文本,input输入', async () => {
    await undoWrapper.setProps({ todoList: [{ type: 'div', value: 'todoItem-1', status: false }, { type: 'div', value: 'todoItem-2', status: false }] })
    undoWrapper.findAll('.undo-item .undo-item-text').at(1).trigger('click')

    await undoWrapper.setProps({ todoList: [{ type: 'div', value: 'todoItem-1', status: false }, { type: 'input', value: 'todoItem-2', status: false }] })
    undoWrapper.findAll('.undo-item .undo-item-input').at(0).trigger('blur')

    undoWrapper.findAll('.undo-item .undo-item-input').at(0).setValue('update')

    expect(undoWrapper.emitted().changeItemType[0]).toEqual([1, 'input'])
    expect(undoWrapper.emitted().changeItemType[1]).toEqual([1, 'div'])
    expect(undoWrapper.emitted().updateItem[0]).toEqual(['update', 1])
  })

  test('todoItem status 和 checkbox 为选中状态同步,改变状态触发changeStatus事件', async () => {
    await undoWrapper.setProps({ todoList: [{ type: 'div', value: 'todoItem-1', status: true }] })
    expect(undoWrapper.find('.checkbox').element.checked).toBe(true)
    await undoWrapper.setProps({ todoList: [{ type: 'div', value: 'todoItem-1', status: false }] })
    expect(undoWrapper.find('.checkbox').element.checked).toBe(false)

    undoWrapper.find('.checkbox').setChecked(true)
    expect(undoWrapper.emitted().changeStatus[0]).toEqual([true, 0])
  })
})

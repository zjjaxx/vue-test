import { shallowMount } from '@vue/test-utils'
import Header from '@/components/header.vue'
describe('test header', () => {
  let headerWrapper = null
  beforeEach(() => {
    headerWrapper = shallowMount(Header, {
    })
  })
  test('header 存在', () => {
    expect(Header).not.toBeUndefined()
    expect(headerWrapper.exists()).toBe(true)
  })
  test('header 包含input 元素', () => {
    expect(headerWrapper.find('#input').exists()).toBe(true)
  })
  test('input 框初始内容为空', () => {
    expect(headerWrapper.find('#input').element.value).toEqual('')
  })
  test('input v-model', () => {
    headerWrapper.find('#input').setValue('aaa')
    //  等价于
    //  headerWrapper.find('#input').element.value = 'aaa'
    //  headerWrapper.find('#input').trigger('input')
    expect(headerWrapper.vm.$data.inputValue).toEqual('aaa')
  })
  test('input 监听回车键，input没有值时，按下enter键不发送inputEnter事件，无反应', () => {
    headerWrapper.find('#input').trigger('keyup.enter')
    expect(headerWrapper.vm.$data.inputValue).toEqual('')
    expect(headerWrapper.emitted().inputEnter).toBeFalsy()
  })
  test('input 监听回车键，input有值时，按下enter键清空input ,并且发送inputEnter事件', () => {
    headerWrapper.find('#input').setValue('aaa')
    headerWrapper.find('#input').trigger('keyup.enter')
    expect(headerWrapper.vm.$data.inputValue).toEqual('')
    expect(headerWrapper.emitted().inputEnter[0]).toEqual(['aaa'])
  })
  test('header 样式快照', () => {
    expect(headerWrapper).toMatchSnapshot()
  })
})

<template>
  <div class="header-wrap">
    <div class="header">
      <span class="title"> TodoList </span>
      <input
        class="input"
        id="input"
        type="text"
        v-model="inputValue"
        @keyup.enter="inputEnter"
        placeholder="please enter todoItem"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    inputEnter () {
      if (!this.inputValue) {
        return
      }
      this.$emit('inputEnter', this.inputValue)
      this.inputValue = ''
    }
  }
}
</script>

<style lang="less">
.header-wrap {
  height: 60px;
  background: #333;
  .header {
    width: 600px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 24px;
      color: #fff;
    }
    .input {
      text-indent: 10px;
      color: #333;
      font-size: 16px;
      line-height: 26px;
    }
  }
}
</style>

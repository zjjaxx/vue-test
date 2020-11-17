<template>
  <div class="undo-wrap">
    <div class="undo-list-header">
      <span class="undo-text">{{
        type == "undo" ? "代办事项" : "已完成"
      }}</span>
      <span class="undo-count">{{ todoList.length }}</span>
    </div>
    <ul class="undo-list">
      <li class="undo-item" v-for="(item, index) in todoList" :key="index">
        <input
          class="checkbox"
          @change="changeStatus($event, index)"
          type="checkbox"
          :checked="item.status"
        />
        <span
          v-if="item.type == 'div'"
          @click="changeItemType(index, 'input')"
          class="undo-item-text"
          >{{ item.value }}</span
        >
        <input
          v-else
          class="undo-item-input"
          type="text"
          v-focus
          :value="item.value"
          @blur="changeItemType(index, 'div')"
          @input="update($event, index)"
        />
        <span class="undo-item-remove-icon" @click="removeItem(index)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  props: {
    type: {
      type: String,
      default: () => {
        return 'undo'
      }
    },
    todoList: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    }
  },
  methods: {
    changeStatus ({ target: { checked } }, index) {
      this.$emit('changeStatus', checked, index)
    },
    changeItemType (index, type) {
      this.$emit('changeItemType', index, type)
    },
    update ({ target: { value } }, index) {
      this.$emit('updateItem', value, index)
    },
    removeItem (index) {
      this.$emit('removeItem', index)
    }
  }
}
</script>

<style lang="less">
.undo-wrap {
  margin: 10px auto;
  width: 600px;
  .undo-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    line-height: 40px;
    .undo-count {
      padding: 2px 8px;
      border-radius: 50%;
      background: #999;
      color: #333;
      font-size: 18px;
      line-height: 24px;
    }
  }
  .undo-list {
    .undo-item {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: bold;
      color: #999;
      .checkbox {
        height: 20px;
        width: 20px;
      }
      .undo-item-text {
        margin-left: 20px;
        margin-right: auto;
        cursor: pointer;
      }
      .undo-item-input {
        width: 400px;
        text-indent: 10px;
        line-height: 24px;
        font-size: 18px;
        color: #999;
        font-weight: bold;
        margin-left: 20px;
        margin-right: auto;
      }
      .undo-item-remove-icon {
        height: 25px;
        width: 25px;
        background: url("../assets/remove-icon.png");
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
}
</style>

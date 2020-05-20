<template>
  <div class="note-input">
    <div class="note-input__body">
      <div>
        <div class="todo-title__wrapper">
          <input type="text" v-model="todoValue" @input="onInputChange()" :placeholder="`Введите название`" class="todo-title__text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterNote',
  data() {
    return {
      todoValue: ''
    }
  },
  methods: {
    onInputChange() {
      this.$emit('change', this.todoValue)
    }
  }
}
</script>

<style lang="scss" scoped>
  .note-input__body {
    background: #fff;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);
    border-radius: 5px;
    padding: 10px;
    width: 500px;
    max-width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .todo-title__text {
    width: 100%;
    height: 20px;
    padding: 5px 2px;
    font-size: 20px;
    border: none;
    border-bottom: 1px solid #3C366B;
    &:focus {
      outline-width: 0;
    }
  }
  .todo-input__wrapper {
    margin: 50px 0 50px 0;
    display: flex;
  }
  @media screen and (max-width: 1023px) {
    .note-input__body {
      width: 80%;
    }
    .todo-input__wrapper {
      flex-direction: column;
    }
    .todo-input__btn {
      margin: 15px 0 0 0;
      justify-content: center;
    }
    .edit-panel {
      flex-direction: column-reverse;
    }
    .edit-panel__wrapper {
      flex-direction: column-reverse;
      .bottom-edit-panel__btn.delete-btn {
        margin-right: 0;
      }
    }
    .edit-panel__btn {
      margin: 10px 0 0 0;
      justify-content: center;
    }
  }
</style>
<template>
  <div class="todo-item">
    <div class="todo-item__wrapper" @click="onTodoClick()">
      <input 
        type="checkbox"
        :checked="todo.isChecked" 
        class="todo-item__checkbox"
      />
      <span
        class="todo-item__text"
        :style="{textDecoration: todo.isChecked ? 'line-through' : 'none'}">
        {{todo.text}}
      </span>
    </div>
    <div class="todo-item__btn">
      <span @click="onMove()" title="переместить в другую папку" class="btn__icon"><i class="mdi mdi-file-move" /></span>
      <span @click="onOpen()" title="открыть в новом окне" class="btn__icon"><i class="mdi mdi-open-in-new" /></span>
      <span @click="onDelete()" title="удалить" class="btn__icon"><i class="mdi mdi-close" /></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: Object,
    noteId: Number
  },
  methods: {
    onDelete() {
      this.$emit('delete', this.todo.todoId)
    },
    onTodoClick() {
      this.todo.isChecked = !this.todo.isChecked
    },
    onMove() {
      this.$store.dispatch('showPopup', ['changeNote', this.noteId, this.todo])
    },
    onOpen() {
      this.$router.push({name: 'TodoView', params: {todoId: this.todo.todoId, noteId: this.noteId}})
    },
  }
}
</script>

<style lang="scss" scoped>
  .todo-item {
    background: #fff;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
    width: 100%;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    overflow: hidden;
  }
  .todo-item__wrapper {
    display: flex;
    align-items: center;
    max-width: 80%;
  }
  .todo-item__checkbox {
    -webkit-transform: translate(0px);
    transform: translate(0px);
    margin-right: 6px;
    cursor: pointer;
  }
  .todo-item__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .note-item__edit-panel {
    display: flex;
    justify-content: flex-end;
  }
  .todo-item__btn {
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (max-width: 1023px) {
    .note-item {
      width: 90%;
      margin: 10px 0 0 0;
    }
    .btn__icon {
      font-size: 23px;
    }
  }
</style>
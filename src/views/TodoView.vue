<template>
<div class="todo-item__view">
  <button @click="redirectToHome()" class="header__note-btn btn primary-btn">
    Вернутся на главную страницу
  </button>
  <h2>{{note.title}}</h2>
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
      <span @click="onDelete()" class="todo-item__btn"><i class="mdi mdi-close" /></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'TodoItem',
  computed: {
    note() {
      let noteId = this.$route.params.noteId
      return this.$store.getters.getNote(noteId)
    },
    todo() {
      let todoId = this.$route.params.todoId
      return this.note.todos.find(todo => todo.todoId === todoId)
    }
  },
  methods: {
    onDelete() {
      let newTodos = this.note.todos.filter(todo => todo.todoId !== this.todo.todoId)
      this.note.todos = [...newTodos]
      this.$store.dispatch('saveNote', this.note)
      this.redirectToHome()
    },
    onTodoClick() {
      this.todo.isChecked = !this.todo.isChecked
    },
    redirectToHome() {
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .todo-item__view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .todo-item {
    background: #fff;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
    max-width: 100%;
    width: 500px;
    height: 200px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    overflow: hidden;
  }
  .todo-item__wrapper {
    display: flex;
    align-items: flex-start;
    max-width: 90%;
    width: 90%;
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
    white-space: normal;
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
    .todo-item {
      width: 90%;
      margin: 10px 0 0 0;
    }
  }
</style>
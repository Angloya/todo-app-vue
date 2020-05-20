<template>
  <div class="note-item">
    <div class="note-item__body">
      <div class="note-item__header">
        <h2 class="header__title">{{note.title}}</h2>
        <div class="header__wrapper">
          <div class="note-item__edit-panel">
            <input 
              type="checkbox"
              @click="setFilterByStatus()"
              :checked="isOnlyChecked" 
              class="note-item__checkbox"
            />
            <span @click="onReset()" class="note-item__btn"><i class="mdi mdi-replay" /></span>
          </div>
          <span @click="onDelete()" class="note-item__btn"><i class="mdi mdi-close" /></span>
        </div>
      </div>
      <div class="note-item__button">
        <button @click="showFilter = !showFilter" class="btn primary-btn">
          Фильтр по названию
        </button>
      </div>
      <filter-note v-if="showFilter" class="note-item__filter" @change="setFilterValue($event)"/>
      <div class="note-item__button">
        <button @click="showInput = !showInput" class="btn primary-btn">
          Добавить заметку
        </button>
      </div>
      <NoteInput @close="closeInput()" v-if="showInput" :noteId="note.noteId"/>
      <div v-for="todo in todosFiltered" :key="todo.todoId" class="todos-preview__wrapper">
        <todoItem :noteId="note.noteId" :todo="todo" @delete="onDeleteTodo($event)"/>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
import NoteInput from '@/components/NoteInput.vue'
import FilterNote from '@/components/FilterNote.vue'

export default {
  name: 'NoteItem',
  props: {
    note: Object,
    todosItems: Array
  },
  data() {
    return {
      showInput: false,
      showFilter: false,
      filterValue: '',
      isOnlyChecked: false,
      showAll: true
    }
  },
  computed: {
    todos() {
      if (!this.showAll) {
        return this.todosItems.filter(todo => todo.isChecked === this.isOnlyChecked)
      } else {
        return this.todosItems
      }
    },
    todosFiltered() {
      return this.todos.filter(todo => todo.text.includes(this.filterValue.toLowerCase()))
    }
  },
  methods: {
    onDelete() {
      this.$store.dispatch('showPopup', ['deleteNote', this.note.noteId])
    },
    setFilterByStatus() {
      this.showAll = false
      this.isOnlyChecked = !this.isOnlyChecked
    },
    setFilterValue(value) {
      this.filterValue = value
    },
    onReset() {
      this.showAll = true
    },
    closeInput() {
      this.showInput = false
    },
    onDeleteTodo(todoId) {
      let newTodos = this.note.todos.filter(todo => todo.todoId !== todoId)
      this.$store.dispatch('showPopup', ['deleteNote', this.note.noteId, newTodos])
    }
  },
  components: {
    TodoItem,
    NoteInput,
    FilterNote
  }
}
</script>

<style lang="scss" scoped>
  .note-item__edit-panel {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .note-item__btn {
    cursor: pointer;
    font-size: 20px;
    margin: 0 2px;
    color: #757575;
    &:hover {
      color: #494949;
    }
  }
  .header__wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .note-item {
    background: #fff;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);
    border-radius: 5px;
    padding: 10px 10px 10px 20px;
    margin: 10px 10px 0 0;
    width: 40%;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .note-item__button{
      display: flex;
      justify-content: center;
      margin: 10px;
    }
  .todos-preview__wrapper {
    display: flex;
    align-items: center;
  }
  .todos-preview__todo-checkbox {
    -webkit-transform: translate(0px);
    transform: translate(0px);
    margin-right: 6px;
  }
  .note-item__filter {
    margin: 10px;
  }
  .note-item__edit-panel {
    display: flex;
    justify-content: space-between;
  }
  .note-item__header {
    display: flex;
  }
  .header__title {
    max-width: 90%;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
  @media screen and (max-width: 1023px) {
    .note-item {
      width: 90%;
      margin: 10px 0 0 0;
    }
  }
</style>
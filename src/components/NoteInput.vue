<template>
  <div class="note-input">
    <header class="note-input__header">
        Добавление {{inputLabel}}
    </header>
    <div class="note-input__body">
      <div>
        <div class="todo-title__wrapper">
          <input type="text" v-model="todoValue" :placeholder="`Название ${inputLabel}`" class="note-title__text" />
        </div>
      </div>

      <div class="edit-panel">
        <div class="edit-panel__wrapper">
          <div @click="onCancel()" class="bottom-edit-panel__btn btn delete-btn">Отмена</div>
        </div>
        <div @click="onSaveNote()" :class="'primary-btn'" class="bottom-edit-panel__btn btn">Сохранить</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteInput',
  props: {
    noteId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      todoValue: '',
      isEmptyInputValue: true,
      note: {
        noteId: Math.floor(Math.random() * 1000),
        title: '',
        todos: []
      },
    }
  },
  watch: {
    todoValue(_val) {
      if (_val) {
        this.isEmptyInputValue = false
      } else {
        this.isEmptyInputValue = true
      }
    }
  },
  computed: {
    inputLabel() {
      return this.noteId ? 'заметки' : 'группы заметок'
    },
    notes() {
      return this.$store.state.notes
    }
  },
  methods: {
    onSaveNote() {
      if (this.noteId) {
        let note = this.$store.getters.getNote(this.noteId)
        let todoId = Math.floor(Math.random() * 1000)
        note.todos.push({todoId, isChecked: false, text: this.todoValue})
        this.$store.dispatch('saveNote', note)
      } else {
        this.note.title = this.todoValue
        this.$store.dispatch('saveNote', this.note)
      }
      this.todoValue = ''
      this.$emit('close')
    },
    onCancel() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .note-input__header {
    display: flex;
    justify-content: center;
    margin: 20px 5px;
    font-size: 16px;
  }
  .note-input__body {
    background: #fff;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);
    border-radius: 5px;
    padding: 30px;
    width: 500px;
    max-width: 80%;
    min-height: 100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .note-title__text {
    width: 100%;
    height: 20px;
    padding: 5px 2px;
    font-size: 22px;
    border: none;
    border-bottom: 1px solid #3C366B;
    &:focus {
      outline-width: 0;
    }
  }
  .edit-panel {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  .edit-panel__wrapper {
    display: flex;
    .edit-panel__btn.delete-btn {
      margin-right: 10px;
    }
  }
  @media screen and (max-width: 1023px) {
    .note-input__body {
      width: 80%;
    }
    .edit-panel {
      flex-direction: column-reverse;
    }
    .edit-panel__wrapper {
      flex-direction: column-reverse;
    }
    .bottom-edit-panel__btn {
      margin: 5px;
    }
    .edit-panel__btn {
      margin: 10px 0 0 0;
      justify-content: center;
    }
  }
</style>
<template>
  <div v-if="isPopup" class="overlay">
    <div class="popup">
      <div class="popup__text" v-if="!isChangeNodeAction">
        {{popupText}}
      </div>
      <div v-if="isChangeNodeAction">
        Выберете в какую группу переместить заметку
        <div class="popup__change-group" @click="onSelected(note)" v-for="note in notes" :key="note.noteId">
          <span class="change-group__title" v-if="note.noteId !== popupNoteId"> Группа: {{note.title}}</span>
        </div>
        <div v-if="!selectedNote">
          Группа не выбрана
        </div>
      </div>
      <div class="popup__btns">
        <div @click=onConfirm class="popup__btn btn primary-btn">Подтвердить</div>
        <div @click=onCancel class="popup__btn btn primary-btn">Отмена</div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: 'Popup',
  data() {
    return {
      selectedNote: null,
      noteAfterUpdate: null,
      isNoteHaveThisTodo: false,
      currentNote: null
    }
  },
  watch: {
    popupNoteId() {
      this.currentNote = this.$store.getters.getNote(this.popupNoteId)
    }
  },
  computed: {
    isPopup() {
      return this.$store.state.popupState.isShow
    },
    popupAction() {
      return this.$store.state.popupState.action
    },
    popupData() {
      return this.$store.state.popupState.data
    },
    popupNoteId() {
      return this.$store.state.popupState.noteId
    },
    popupText() {
      return this.$store.state.popupState.text
    },
    isChangeNodeAction() {
      return this.popupAction === 'changeNote'
    },
    notes() {
      return this.$store.state.notes
    }
  },
  methods: {
    onConfirm() {
      if(!this.isChangeNodeAction) {
        this.$store.dispatch(this.popupAction, [this.popupNoteId, this.popupData])
      } else if(this.isChangeNodeAction && this.selectedNote) {
        this.$store.dispatch('saveNote', this.selectedNote)
        this.$store.dispatch('deleteNote', [this.noteAfterUpdate.noteId, this.noteAfterUpdate.todos])
        this.selectedNote = null,
        this.noteAfterUpdate = null,
        this.isNoteHaveThisTodo = false
      }
      this.$store.commit('hidePopup')
    },
    onSelected(note) {
      this.selectedNote =  JSON.parse(JSON.stringify(note))
      this.isNoteHaveThisTodo = this.selectedNote.todos.some(todo => todo.todoId === this.popupData.todoId)
      this.selectedNote.todos.push(this.popupData)
      let updatedTodos = this.currentNote.todos.filter(todo => todo.todoId !== this.popupData.todoId)
      this.noteAfterUpdate =  {...this.currentNote}
      this.noteAfterUpdate.todos = updatedTodos
    },
    onCancel() {
      this.$store.commit('hidePopup')
    }
  }
}
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
  }
  .change-group__title {
  background: #fff;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
    max-width: 100%;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    overflow: hidden;
  }
  .popup {
    margin: 100px auto;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    width: 30%;
    position: relative;
    transition: all 0.5s ease-in-out;
    text-align: center;
  }
  .popup__text {
    font-size: 18px;
  }
  .popup__btns {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
  .popup__btn {
    margin-right: 10px;
  }
  @media screen and (max-width: 1023px) {
    .popup {
      width: 80%;
    }
  }
</style>
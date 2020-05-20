  
export default {
  saveNote({commit, state, dispatch}, note) {
    let noteId = state.notes.findIndex(item => item.noteId === note.noteId)
    if (noteId > -1) {
      commit('updateNote', [note, noteId])
    } else {
      commit('saveNote', note)
    }
    dispatch('saveToLS')
  },
  saveNotes({commit}, notes) {
    commit('saveNotes', notes)
  },
  deleteNote({commit, state, dispatch}, [noteId, data = null]) {
    let index = state.notes.findIndex(note => note.noteId === noteId)
    let note = state.notes.find(note => note.noteId === noteId)
    if(data && index > -1) {
      note.todos = [...data]
      commit('updateNote', [note, index])
    } else if(index > -1) {
      commit('deleteNote', [note, index])
    }
    dispatch('saveToLS')
  },
  showPopup({commit}, [action, noteId, data, text = "Подтвердитe удаление"]) {
    commit('showPopup', [action, noteId, data, text])
  },
  saveToLS({state}) {
    if(localStorage) {
      localStorage.setItem('notes', JSON.stringify(state.notes));
    }
  }
}
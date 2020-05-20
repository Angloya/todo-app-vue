export default {
  saveNotes(state, notes) {
    state.notes = notes
  },
  saveNote(state, note) {
    state.notes.push(note)
  },
  deleteNote(state, noteIndex) {
    state.notes.splice(noteIndex, 1)
  },
  updateNote(state, [note, noteId]) {
    state.notes[noteId] = note
  },
  showPopup(state, [action, noteId, data = null, text]) {
    state.popupState.action = action
    state.popupState.data = data
    state.popupState.noteId = noteId
    state.popupState.text = text
    state.popupState.isShow = true
  },
  hidePopup(state) {
    state.popupState.isShow = false
  },
}
export default {
  getNote: state => noteId => {
    return state.notes.find(note => note.noteId === noteId)
  },
  getFilterNotes: state => title => {
    return state.notes.filter(note => note.title.includes(title.toLowerCase()))
  },
  getNotes: state => {
    return state.notes
  }
}
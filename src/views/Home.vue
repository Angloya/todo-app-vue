<template>
  <div class="home-view">
    <header class="home-view__header">
      <button @click="showInput = !showInput" class="header__note-btn btn primary-btn">
        Создать группу заметок
      </button>
    </header>
    <div class="home-view__filter">
      <h2 class="home-view__title">Фильтр по названию группы</h2>
      <filter-note @change="setFilterValue($event)"/>
    </div>
    <NoteInput @close="closeInput()" v-if="showInput"/>
    <NoteList :notes="notes"/>
  </div>
</template>

<script>
import NoteList from '@/components/NoteList.vue'
import NoteInput from '@/components/NoteInput.vue'
import FilterNote from '@/components/FilterNote.vue'
export default {
  name: 'Home',
  data() {
    return {
      showInput: false,
      filterValue: ''
    }
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes
    }
  },
  methods: {
    setFilterValue(value) {
      this.filterValue =value
    },
    closeInput() {
      this.showInput = false
    }
  },
  components: {
    NoteInput,
    NoteList,
    FilterNote
  },
}
</script>

<style lang="scss" scoped>
  .home-view__filter {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .home-view__title {
    text-align: center;
  }
  .home-view__header {
    display: flex;
    justify-content: flex-end;
    margin: 20px 5px;
  }
  .header__note-btn {
    text-decoration: none;
  }
</style>

<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoggedIn', 'isAdmin'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>
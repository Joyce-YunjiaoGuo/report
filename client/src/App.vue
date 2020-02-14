<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  name: 'App',
  created() {
    const token = localStorage.token;
    const decoded = jwtDecode(token);
    this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded));
    this.$store.dispatch('setUser', decoded);
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      );
    },
  },
};
</script>

<style>
</style>

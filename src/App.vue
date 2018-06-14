<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <ShopMain/>
  </div>
</template>

<script>
  import ShopMain from './components/ShopMain'

  export default {
    name: 'App',
    components: {
      ShopMain
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background: slategrey;
    color: #2c3e50;
    margin: -8px;
  }
</style>

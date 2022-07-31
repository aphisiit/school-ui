<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Search from './components/Search.vue'
</script>

<template>
  <header>
    
    <div class="wrapper container">
      <img alt="Vue logo" class="logo" src="./assets/white-logo.png" width="80" height="80" />
      <HelloWorld msg="Protoss Training" />
    </div>
  </header>

  <main class="container">
    <Search />
    <!-- <AddUpdate action="Add"/> -->
    <!-- <Table /> -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

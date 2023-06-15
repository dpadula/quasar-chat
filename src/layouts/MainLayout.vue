<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar></NavBar>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import NavBar from "components/NavBar.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    NavBar,
  },

  setup() {
    // const leftDrawerOpen = ref(false);

    return {
      // leftDrawerOpen,
      // toggleLeftDrawer() {
      //   leftDrawerOpen.value = !leftDrawerOpen.value;
      // },
    };
  },
});
</script>

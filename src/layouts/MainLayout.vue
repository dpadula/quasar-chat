<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar></NavBar>
    <q-page-container>
      {{ userGoogle }}
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, inject } from "vue";

import NavBar from "components/NavBar.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    NavBar,
  },

  setup() {
    const userGoogle = inject("userGoogle");
    return {
      userGoogle,
    };
  },
});
</script>

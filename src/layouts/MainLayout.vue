<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar></NavBar>
    <FooterChat></FooterChat>
    <q-page-container>
      <!-- {{ userGoogle }} -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, inject } from "vue";
import NavBar from "components/NavBar.vue";
import FooterChat from "components/FooterChat.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    NavBar,
    FooterChat,
  },

  setup() {
    const userGoogle = inject("userGoogle");

    return {
      userGoogle,
    };
  },
});
</script>

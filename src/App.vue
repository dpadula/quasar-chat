<template>
  <router-view />
</template>

<script>
import { defineComponent, ref, provide } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default defineComponent({
  name: "App",

  setup() {
    const userGoogle = ref(null);
    provide("userGoogle", userGoogle);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        userGoogle.value = user;
        // ...
      } else {
        // User is signed out
        // ...
        userGoogle.value = null;
      }
    });
    return {
      onAuthStateChanged,
    };
  },
});
</script>

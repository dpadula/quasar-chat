<template>
  <router-view v-if="userGoogle !== false" />
</template>

<script>
import { defineComponent, ref, provide } from "vue";
import { useQuasar } from "quasar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default defineComponent({
  name: "App",

  setup() {
    const $q = useQuasar();
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
      $q.loading.hide();
    });
    $q.loading.show({
      // delay: 3000, // ms
    });
    return {
      onAuthStateChanged,
      userGoogle,
    };
  },
});
</script>

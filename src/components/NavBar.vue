<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

      <q-toolbar-title> Quasar Chat </q-toolbar-title>

      <q-btn color="accent" label="Login" @click="login" />
      <q-btn color="positive" label="Logout" @click="logout" />
    </q-toolbar>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    <q-list>
      <q-item-label header> Essential Links </q-item-label>

      <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
    </q-list>
  </q-drawer>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "./EssentialLink.vue";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
];

const essentialLinks = linksList;

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const login = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // // The signed-in user info.
      // const user = result.user;
      // // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log("result :>> ", result);
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("ERROR :>> ", error);
      // // ...
    });
};
const logout = () => {
  signOut(auth)
    .then((result) => {
      // Sign-out successful.
      console.log("logout google :>> ");
    })
    .catch((error) => {
      console.log("error :>> ", error);
    });
};
</script>

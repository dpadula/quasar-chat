<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        v-if="userGoogle"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title> Quasar Chat </q-toolbar-title>

      <q-btn v-if="!userGoogle" color="accent" label="Login" @click="login" />
      <q-btn v-if="userGoogle" color="positive" label="Logout" @click="logout" />
    </q-toolbar>
  </q-header>

  <q-drawer v-if="userGoogle" v-model="leftDrawerOpen" show-if-above bordered>
    <q-list>
      <q-item-label header> User</q-item-label>

      <UserAvatar
        :key="userGoogle.uid"
        :title="userGoogle.displayName"
        :caption="userGoogle.email"
        :photo-u-r-l="userGoogle.photoURL"
        :link="userGoogle.photoURL"
      />
    </q-list>
  </q-drawer>
</template>

<script setup>
import { ref, inject } from "vue";
import UserAvatar from "./UserAvatar.vue";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
];

const leftDrawerOpen = ref(false);

const userGoogle = inject("userGoogle");

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
    })
    .catch((error) => {
      console.log("error :>> ", error);
    });
};
</script>

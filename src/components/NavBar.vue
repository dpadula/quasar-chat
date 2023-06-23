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
    <q-img
      class="absolute-top"
      src="https://cdn.quasar.dev/img/material.png"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img :src="userGoogle.photoURL" />
        </q-avatar>
        <div class="text-weight-bold">{{ userGoogle.displayName }}</div>
        <div>{{ userGoogle.email }}</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script setup>
import { ref, inject } from "vue";
import { useQuasar } from "quasar";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const $q = useQuasar();

const leftDrawerOpen = ref(false);

const userGoogle = inject("userGoogle");

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const login = () => {
  const provider = new GoogleAuthProvider();
  $q.loading.show({
    // delay: 3000, // ms
  });
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // // The signed-in user info.
      // const user = result.user;
      // // IdP data available using getAdditionalUserInfo(result)
      // ...
      $q.loading.hide();
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // console.log("ERROR :>> ", error);
      $q.loading.hide();
      // // ...
    });
};
const logout = () => {
  $q.loading.show({
    // delay: 3000, // ms
  });
  signOut(auth)
    .then((result) => {
      // Sign-out successful.
      $q.loading.hide();
    })
    .catch((error) => {
      console.log("error :>> ", error);
      $q.loading.hide();
    });
};
</script>

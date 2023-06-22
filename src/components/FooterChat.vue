<template>
  <q-footer v-if="userGoogle">
    <q-toolbar>
      <q-input
        v-model="chatInput"
        dark
        dense
        standout
        input-class="text-left"
        class="q-ml-md full-width"
        label="Ingrese un texto"
        @keyup.enter="addText"
      >
        <template #append>
          <q-icon
            name="send"
            class="cursor-pointer"
            :disable="chatInput"
            @click="addText"
          />
        </template>
      </q-input>
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import { ref, inject } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const chatInput = ref("");
const userGoogle = inject("userGoogle");

const addText = () => {
  if (chatInput.value !== "") {
    addDoc(collection(db, "chats"), {
      text: chatInput.value,
      uid: userGoogle.value.uid,
      time: Date.now(),
      displayName: userGoogle.value.displayName,
      photoURL: userGoogle.value.photoURL,
    })
      .then(() => {
        chatInput.value = "";
      })
      .catch(() => {
        console.log("ERROR al agregar chat");
      });
  }
};
</script>

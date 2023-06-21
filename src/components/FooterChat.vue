<template>
  <q-footer>
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
          <q-icon name="send" class="cursor-pointer" @click="addText" />
        </template>
      </q-input>
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import { ref, inject } from "vue";
import { useQuasar } from "quasar";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const $q = useQuasar();

const chatInput = ref("");
const userGoogle = inject("userGoogle");

const addText = () => {
  console.log("object :>> ", chatInput.value);
  addDoc(collection(db, "chats"), {
    text: chatInput.value,
    uid: userGoogle.value.uid,
    time: Date.now(),
    displayName: userGoogle.value.displayName,
    photoURL: userGoogle.value.photoURL,
  })
    .then(() => {
      console.log("Producir sonido");
      chatInput.value = "";
    })
    .catch(() => {
      console.log("ERROR al agregar chat");
    });
};
</script>

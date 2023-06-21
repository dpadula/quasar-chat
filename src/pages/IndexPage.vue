<script setup>
import { inject, ref } from "vue";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const messages = ref([]);
const userGoogle = inject("userGoogle");

const q = query(collection(db, "chats"), orderBy("time"));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      messages.value.push({
        id: change.doc.id,
        ...change.doc.data(),
      });
    }
  });
});
</script>

<template>
  <q-page v-if="!userGoogle" class="flex flex-center"> <h3>Iniciar Sesión</h3></q-page>
  <q-page v-else>
    <div class="q-pa-md row justify-center items-center content-center">
      <div class="q-pa-md col-5" style="overflow: auto">
        <template v-for="message in messages" :key="message.id">
          <q-chat-message
            :name="message.displayName"
            :avatar="message.photoURL"
            :text="[message.text]"
            :sent="message.uid === userGoogle.uid"
          />
        </template>
      </div>
    </div>
  </q-page>
</template>

<!-- Notice lang="scss" -->
<style lang="scss">
.borde {
  border: 1px solid red;
  // background-color: $grey-5;
}
.verde {
  border: 1px solid green;
  // background-color: $grey-5;
}
</style>

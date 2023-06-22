<script setup>
import { inject, ref, nextTick, watchEffect } from "vue";
import { scroll } from "quasar";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const messages = ref([]);
const chatBox = ref(null);
const userGoogle = inject("userGoogle");
const { getScrollTarget, setVerticalScrollPosition, getScrollHeight } = scroll;

const scrollToElement = (el) => {
  const target = getScrollTarget(el);
  //const offset = el.offsetTop; // esto es hasta el top del div
  const offset = getScrollHeight(el); //esto es hasta el bottom del div
  const duration = 100;
  setVerticalScrollPosition(target, offset, duration);
};

watchEffect((onCleanup) => {
  // "watchEffect" revisa por los cambios en los elementos que haya dentro de la funcion
  if (userGoogle.value) {
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

      nextTick(() => {
        scrollToElement(chatBox.value);
        const lastMsg = messages.value.at(-1);
        console.log("lastMsg :>> ", lastMsg);
        if (lastMsg.uid === userGoogle.value.uid) {
          const imessageSent = new Audio("/imessage_send.mp3");
          imessageSent.play();
          // if (promisePlay !== undefined) {
          //   // para prevenir https://developer.chrome.com/blog/autoplay/
          //   promisePlay
          //     .then((_) => {
          //       // Autoplay started!
          //     })
          //     .catch((error) => {
          //       // Autoplay was prevented.
          //       // Show a "Play" button so that user can start playback.
          //     });
          // }
        } else {
          const imessageReceive = new Audio("/imessage_receive.mp3");
          imessageReceive.play();
        }
      });
      //
    });
    onCleanup(unsubscribe);
  }
});
</script>

<template>
  <q-page v-if="!userGoogle" class="flex flex-center"> <h3>Iniciar Sesión</h3></q-page>
  <q-page v-else>
    <div ref="chatBox" class="q-pa-md row justify-center items-center content-center">
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

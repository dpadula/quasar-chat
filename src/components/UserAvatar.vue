<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <q-item-section v-if="photoURL" avatar>
      <q-avatar>
        <img :src="photoURL" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserAvatar",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    photoURL: {
      type: String,
      default: "",
    },
  },
});
</script>

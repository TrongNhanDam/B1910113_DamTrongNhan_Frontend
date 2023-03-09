<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="(contact, index) in contacts.sort((a, b) => a.name > b.name ? 1 : -1)"
      :key="contact._id" :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
      {{ contact.name }}
      <i v-if="contact.favorite" class="fa-solid fa-heart float-right text-info"></i>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    contacts: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },

}

</script>


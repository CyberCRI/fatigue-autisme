<template>
  <HomeParent v-if="isParent"/>
  <HomeChild v-else/>
</template>

<script>
import HomeParent from './Home/HomeParent.vue';
import HomeChild from './Home/HomeChild.vue';

export default {
  components: {
    HomeParent,
    HomeChild
  },
  computed: {
    isParent() {
      return this.$store.getters.isParent;
    }
  }
};
</script>

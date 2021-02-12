<template>
  <v-row justify="center">
    <v-col cols="10" class="pa-1">
      <v-textarea
        v-model="inputVal"
        name="context"
        solo
        label=""
        auto-grow
        prepend-inner-icon="mdi-pencil"
      ></v-textarea>
    </v-col>
  </v-row>
</template>

<script>
export default {
    props: ['value']
    ,
    computed: {
        inputVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
}
</script>
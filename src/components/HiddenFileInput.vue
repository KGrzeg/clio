<template>
  <input type="file" ref="file" :name="name" @change="changeHandler" hidden />
</template>

<script>
export default {
  name: "HiddenFileInput",
  props: ["name", "change"],
  methods: {
    changeHandler() {
      const uploadFile = this.$refs.file.files[0];
      this.$emit("change", uploadFile);
    },
    trigger() {
      this.$refs.file.click();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

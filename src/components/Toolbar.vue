<template>
  <div class="toolbar">
    <button @click="showExport">export</button>
  </div>
</template>

<script>
import exporter from "../exporter";

export default {
  name: "Toolbar",
  props: ["editor"],
  methods: {
    showExport() {
      alert("Diagram exported do the console");
      console.log(exporter(this.editor));
      console.log(JSON.stringify(exporter(this.editor)));
    },
  },
};
</script>

<style scoped>
.toolbar {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.toolbar button {
  padding: 20px;
  margin: 5px;
  background-color: #777;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<template>
  <div class="toolbar">
    <button @click="exportScenario">export</button>
  </div>
</template>

<script>
import { saveAs } from 'file-saver';
import exporter from "../exporter";

export default {
  name: "Toolbar",
  props: ["editor"],
  methods: {
    exportScenario() {
      const export_txt = JSON.stringify(exporter(this.editor));
      const blob = new Blob([export_txt], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "scenario.json");
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

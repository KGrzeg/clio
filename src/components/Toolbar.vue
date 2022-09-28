<template>
  <div class="toolbar">
    <button @click="exportCLIO">export CLIO</button>
    <button @click="$refs.import.trigger()">import CLIO</button>
    <button @click="exportJSON">export JSON</button>
    <HiddenFileInput name="importClio" @change="importCLIO" ref="import" />
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import exporter from "../exporter";
import HiddenFileInput from "./HiddenFileInput.vue";

function exportAsFile(data, name) {
  const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
  saveAs(blob, name);
}

export default {
  name: "Toolbar",
  props: ["editor"],
  components: {
    HiddenFileInput,
  },
  methods: {
    exportCLIO() {
      const diagram = this.editor.save();
      const data = JSON.stringify(diagram);
      exportAsFile(data, "scenario.clio");
    },
    importCLIO(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const scenarioDataRaw = event.target.result;
          const scenarioData = JSON.parse(scenarioDataRaw);
          this.editor.load(scenarioData);
        } catch (err) {
          alert("Error occurred. Did you select a correct CLIO file?");
          console.error(err);
        }
      };
      reader.readAsText(file);
    },
    exportJSON() {
      try {
        const export_txt = JSON.stringify(exporter(this.editor));
        exportAsFile(export_txt, "scenario.json");
      } catch (err) {
        alert("Error occurred. Do you have unconnected nodes?");
        console.error(err);
      }
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

<template>
  <div class="editor">
    <baklava-editor :plugin="viewPlugin"></baklava-editor>
  </div>
</template>

<script>
import { Editor } from "@baklavajs/core";
import { Engine } from "@baklavajs/plugin-engine";
import { ViewPlugin } from "@baklavajs/plugin-renderer-vue";
import { OptionPlugin } from "@baklavajs/plugin-options-vue";
import { createSimpleSnappingProvider } from "@baklavajs/plugin-renderer-vue";

import MathNode from "./components/nodes/MathNode";
import DisplayNode from "./components/nodes/DisplayNode";
import MessageNode from "./components/nodes/MessageNode";

export default {
  data() {
    return {
      editor: new Editor(),
      engine: new Engine(true),
      viewPlugin: new ViewPlugin(),
    };
  },
  created() {
    this.editor.use(this.viewPlugin);
    this.editor.use(this.engine);
    this.editor.use(new OptionPlugin());

    this.viewPlugin.enableMinimap = true;
    this.viewPlugin.snappingProvider = createSimpleSnappingProvider(30, 30);

    this.editor.registerNodeType("Math", MathNode);
    this.editor.registerNodeType("Display", DisplayNode);
    this.editor.registerNodeType("Message", MessageNode);
  },
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>

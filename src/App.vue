<template>
  <div class="editor">
    <baklava-editor :plugin="viewPlugin"></baklava-editor>
    <Toolbar :editor="editor" />
  </div>
</template>

<script>
import { Editor } from "@baklavajs/core";
import { Engine } from "@baklavajs/plugin-engine";
import { ViewPlugin } from "@baklavajs/plugin-renderer-vue";
import { OptionPlugin } from "@baklavajs/plugin-options-vue";
import { createSimpleSnappingProvider } from "@baklavajs/plugin-renderer-vue";

import Toolbar from "./components/Toolbar.vue";
import StoryChoiceNode from "./nodes/StoryChoice";
import StartNode from "./nodes/Start";
import EndNode from "./nodes/End";
import MessageNode from "./nodes/Message";

export default {
  data() {
    return {
      editor: new Editor(),
      engine: new Engine(true),
      viewPlugin: new ViewPlugin(),
    };
  },
  components: {
    Toolbar,
  },
  created() {
    this.editor.use(this.viewPlugin);
    this.editor.use(this.engine);
    this.editor.use(new OptionPlugin());

    this.viewPlugin.enableMinimap = true;
    this.viewPlugin.snappingProvider = createSimpleSnappingProvider(30, 30);

    this.editor.registerNodeType("StartNode", StartNode);
    this.editor.registerNodeType("StoryChoiceNode", StoryChoiceNode);
    this.editor.registerNodeType("MessageNode", MessageNode);
    this.editor.registerNodeType("EndNode", EndNode);
  },
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>

import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder("EndNode")
  .setName("End")
  .addInputInterface("Source", "decision")
  .addOption("Message", "InputOption")
  .addOption("Type", "SelectOption", "Defeat", undefined, {
    items: ["Defeat", "Win"],
  })
  .build();

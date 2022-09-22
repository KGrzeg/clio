import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder("StartNode")
  .setName("Start")
  .addOutputInterface("Target")
  .addOption("Message", "InputOption", "...")
  .build();

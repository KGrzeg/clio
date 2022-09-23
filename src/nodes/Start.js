import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder("StartNode")
  .setName("Start")
  .addOutputInterface("Target")
  .addOption("Message", "InputOption", "...")
  .build();

export function simplify(startNode, resolver) {
  return {
    type: "Start",
    id: startNode.id,
    message: startNode.options[0][1],
    next: resolver(startNode.interfaces[0][1].id)
  }
}

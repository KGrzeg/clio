import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder("EndNode")
  .setName("End")
  .addInputInterface("Source", "decision")
  .addOption("Message", "InputOption")
  .addOption("Type", "SelectOption", "Defeat", undefined, {
    items: ["Defeat", "Win"],
  })
  .build();

export function simplify(endNode, resolver) {
  return {
    type: "End",
    id: endNode.id,
    message: endNode.options[0][1],
    kind: endNode.options[1][1],
    previous: resolver(endNode.interfaces[0][1].id)
  }
}

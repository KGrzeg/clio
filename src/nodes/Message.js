import { Node } from "@baklavajs/core";

export default class MessageNode extends Node {
  constructor() {
    super();

    this.type = "MessageNode";
    this.name = "Message";

    this.addInputInterface("Source", "decision", "");
    this.addOption("Message", "InputOption", "...");
    this.addOutputInterface("Target");
  }

  calculate() {
    const source = this.getOptionValue("Message");
    this.getInterface("Target").value = source;
  }
}

export function simplify(messageNode, resolver) {
  return {
    type: "Message",
    id: messageNode.id,
    message: messageNode.options[0][1],
    previous: resolver(messageNode.interfaces[0][1].id),
    next: resolver(messageNode.interfaces[1][1].id)
  }
}

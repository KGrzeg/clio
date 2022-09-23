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

import { Node } from "@baklavajs/core";

export default class StoryChoiceNode extends Node {
  lastChoicesCount = 0;

  constructor() {
    super();

    this.type = "StoryChoiceNode";
    this.name = "StoryChoice";

    this.addInputInterface("Source", "decision");
    this.addOption("Message", "InputOption", "...");
    this.addOption("Choices count", "SelectOption", "2", undefined, {
      items: ["2", "3", "4"]
    });

    this.events.update.addListener("choices", this.update.bind(this));
    this.changeChoicesCount(2);
  }

  update() {
    const count = parseInt(this.getOptionValue("Choices count"));
    if (count !== this.lastChoicesCount) {
      this.changeChoicesCount(count);
    }
  }

  changeChoicesCount(count) {
    if (count < this.lastChoicesCount)
      for (let i = this.lastChoicesCount; i > count; --i) {
        this.removeOption(`Choice ${i}`)
        this.removeInterface(`Answer ${i}`);
      }

    if (count > this.lastChoicesCount)
      for (let i = this.lastChoicesCount + 1; i <= count; ++i) {
        this.addOption(`Choice ${i}`, "InputOption", "");
        this.addOutputInterface(`Answer ${i}`);
      }

    this.lastChoicesCount = count;
  }
}

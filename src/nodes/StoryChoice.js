import { Node } from "@baklavajs/core";

export default class StoryChoiceNode extends Node {
  constructor() {
    super();

    this.type = "StoryChoiceNode";
    this.name = "StoryChoice";
    this.lastChoicesCount = 0;

    this.addInputInterface("Source", "decision");
    this.addOption("Message", "InputOption", "...");
    this.addOption("Choices count", "SelectOption", "2", undefined, {
      items: ["2", "3", "4"],
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
        this.removeOption(`Choice ${i}`);
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

export function simplify(storyChoiceNode, resolver) {
  const previous_id = storyChoiceNode.interfaces[0][1].id;
  const choicesCount = parseInt(storyChoiceNode.options[1][1]);
  const choices = [];

  for (let i = 0; i < choicesCount; ++i) {
    const next_id = storyChoiceNode.interfaces[1 + i][1].id;
    choices.push({
      message: storyChoiceNode.options[2 + i][1],
      next: resolver(next_id)
    });
  }

  return {
    type: "StoryChoice",
    id: storyChoiceNode.id,
    message: storyChoiceNode.options[0][1],
    previous: resolver(previous_id),
    choices
  };
}

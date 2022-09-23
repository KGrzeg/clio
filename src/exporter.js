import { simplify as simplifyStart } from "./nodes/Start";
import { simplify as simplifyEnd } from "./nodes/End";
import { simplify as simplifyMessage } from "./nodes/Message";
import { simplify as simplifyStoryChoice } from "./nodes/StoryChoice";

const type_to_simplify_matcher = {
  'StartNode': simplifyStart,
  'EndNode': simplifyEnd,
  'MessageNode': simplifyMessage,
  'StoryChoiceNode': simplifyStoryChoice,
}

const connectionResolverBuilder = (diagram) => {
  const interface_to_node = {};

  diagram.nodes.forEach(node => {
    node.interfaces.forEach(inter => {
      interface_to_node[inter[1].id] = node.id;
    })
  })

  return (interface_id) => {
    const connection = diagram.connections.find(conn =>
      conn.from === interface_id || conn.to === interface_id
    );

    if (connection.from === interface_id)
      return interface_to_node[connection.to];
    return interface_to_node[connection.from];
  };
}

export default function (editor) {
  const diagram = editor.save();
  const resolver = connectionResolverBuilder(diagram);

  const nodes = diagram.nodes.map(node => {
    const simplify = type_to_simplify_matcher[node.type];
    return simplify(node, resolver);
  });

  return {
    nodes
  };
}

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
import { Node, NodeInput, nodes } from './samples.js';

function calculateHeight(node: Node, nodes: Node[]): number {
    if (!node.parentID) {
      // If the node is the root, height is 0
      node.height = 0;
    } else {
      // If the node has a parent, calculate height recursively
      const parent = nodes.find((potentialParent) => potentialParent.id === node.parentID);
      if (parent) {
        node.height = 1 + calculateHeight(parent, nodes);
      } else {
        throw new Error(`Parent node with id ${node.parentID} not found.`);
      }
    }
  
    return node.height;
}

const resolvers = {
    Query: {
      node: (root, { id }) => {
        return nodes.find(node => node.id == id);
      },
    },
    Mutation: {
        addNode: (_, args) => {
            // Implementation for adding a new node
            const nodeInput = args.node;
            const newNode : Node = {
                //Implements a simple autoincrementing id, based on highest existing ID value
                id: Math.max(...nodes.map(node => node.id)) + 1,
                name: nodeInput.name,
                parentID: Number(nodeInput.parentId),
                department: nodeInput.department,
                programmingLanguage: nodeInput.programmingLanguage
            };

            nodes.push(newNode);
            return newNode;
        },
        changeParentNode: (parent, args) => {
          const nodeIndex = nodes.findIndex((node) => node.id == args.nodeId);
          if (nodeIndex === -1) {
            throw new Error(`Node with id ${args.nodeId} not found.`);
          }
    
          const newParentIndex = nodes.findIndex((node) => node.id == args.newParentId);
          if (newParentIndex === -1) {
            throw new Error(`New parent node with id ${args.newParentId} not found.`);
          }
    
          // Update the parent of the node
          nodes[nodeIndex].parentID = Number(args.newParentId);
          
          // Recalculate height for the affected node, in case we're moving to a completely different level
          delete nodes[nodeIndex].height;
    
          return nodes[nodeIndex];
        },
      },
    Node: {
        children: (root) => {
            return nodes.filter(node => node.parentID == root.id);
        },
        height: (root) => {
            return calculateHeight(root, nodes);
        }
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
console.log(`🚀  Server ready at: ${url}`);
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import { typeDefs } from './schema.js';
import { nodes } from './samples.js';
function calculateHeight(node, nodes) {
    if (!node.parentID) {
        // If the node is the root, height is 0
        node.height = 0;
    }
    else {
        // If the node has a parent, calculate height recursively
        const parent = nodes.find((potentialParent) => potentialParent.id === node.parentID);
        if (parent) {
            node.height = 1 + calculateHeight(parent, nodes);
        }
        else {
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
            const newNode = {
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
    context: async ({ req, res }) => {
        //Get the Authorization header
        const auth = req.headers.authorization || null;
        //We're just doing a simple check on Authorization header here for access.
        if (auth !== "QWxsIFlvdXIgQmFzZSBBcmUgQmVsb25nIFRvIFVz") {
            // throwing a `GraphQLError` here allows us to specify an HTTP status code,
            // standard `Error`s will have a 500 status code by default
            throw new GraphQLError('User is not authenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                },
            });
        }
        return {};
    },
});
console.log(`🚀  Server ready at: ${url}`);

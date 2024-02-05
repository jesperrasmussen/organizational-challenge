import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # The "Node" type basically is our main object, constructing the tree structure itself
  # Notice that the "parent" attribute here can be nullified, 
  # defining whether or not the Node is at the root of the organization or not.
  type Node {
    id: ID!
    name: String!
    parent: Node
    children: [Node]
    height: Int!
    department: String
    programmingLanguage: String
  }
  
  type Query {
    node(id: ID!): Node
  }
  
  type Mutation {
    addNode(name: String!, parentId: ID): Node
    changeParentNode(nodeId: ID!, newParentId: ID!): Node
  }
  
  input NodeInput {
    name: String!
    parentId: ID
    department: String
    programmingLanguage: String
  }
`;
// Sample nodes
const nodes = [
    {
        id: '1',
        name: 'Eric CEO',
        parent: null,
        department: 'Management',
        programmingLanguage: null
    },
    {
        id: '2',
        name: 'Manager A',
        parent: '1',
        department: 'Engineering',
        programmingLanguage: null
    },
    {
        id: '3',
        name: 'Developer A',
        parent: '2',
        department: null,
        programmingLanguage: 'JavaScript'
    },
    // Add more nodes as needed
];
const resolvers = {
    Query: {
        node: (root, { id }) => {
            return nodes.find(node => node.id === id);
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);

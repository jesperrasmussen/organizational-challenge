// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
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
    addNode(node: NodeInput): Node
    changeParentNode(nodeId: ID!, newParentId: ID!): Node
  }
  
  input NodeInput {
    name: String!
    parentId: ID
    department: String
    programmingLanguage: String
  }
`;

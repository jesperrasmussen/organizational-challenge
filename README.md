# organizational-challenge
A simple API for constructing and interacting with an organizational structure

## Implementation details

- [X] Setup [Apollo Server] (https://www.apollographql.com/docs/apollo-server) 
- [X] Implement a basic schema for the requirements of this solution
- [ ] Implement basic resolving for querying as well as mutating data
- [ ] Implement simple solution for handling authentication
- [X] Introduce resolving of height, based on position in hierarchy
- [ ] Introduce handling of manager/developer role
- [ ] **Optional** - Implement simple integrationtests for ensuring feature completeness
- [ ] **Optional** - Setup service in a hosted enviroment

## Technical decisions

As time is sparse, I'm skipping persistent storage for this simple implementation. 

The organizational nodes are stored using a simple object array in internal memory, and is reset whenever the node service is restarted.

Given more time, it might be beneficial to look into document storage or a graph database for this particular system, given the access patterns mentioned.

## Running the solution

TBD

## Reflections

There's definitely a lot of things to potentially do from here on out. 

Persistent storage would be obvious.

Adding authentication in the form of JWT or OAuth would also make sense. One might argue that something role-based would be beneficial here, to avoid 

In terms of handling Manager/Developer roles, one might consider defining a common interface for the different roles, allowing for setting the role either on creation of the organizational node - or determining the role based on the position in the hierarchy, defining a developer as someone with no organizational "children"
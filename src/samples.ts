export type Node = {
    id?: number;
    name: string;
    parentID: number;
    height?: number;
    department: string,
    programmingLanguage: string
}

export type NodeInput =  {
    name: string;
    parentID: number;
    department: string;
    programmingLanguage?: string;
}

// Sample nodes
export const nodes : Node[] = [
    {
        id: 1, 
        name: 'Eric CEO', 
        parentID: null, 
        department: 'Management', 
        programmingLanguage: null
    },
    {
        id: 2, 
        name: 'Manager A',
        parentID: 1,
        department: 'Engineering',
        programmingLanguage: null
    },
    {
        id: 3, 
        name: 'Manager B',
        parentID: 1,
        department: 'Engineering',
        programmingLanguage: null
    },
    {
        id: 4, 
        name: 'Developer A',
        parentID: 2,
        department: null, 
        programmingLanguage: 'JavaScript'
    },
    {
        id: 5, 
        name: 'Developer 1337',
        parentID: 2,
        department: null, 
        programmingLanguage: 'Rust'
    },
  ];
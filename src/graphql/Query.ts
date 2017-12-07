import gql from "graphql-tag";


export const DESCRIPTORS = gql`
    query allDescriptors {
        descriptors {
            id
            name
            description
            tags
        }
    }
`;
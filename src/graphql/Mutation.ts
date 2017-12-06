import gql from 'graphql-tag';


export const ADD = gql`mutation DescriptorAdd($descriptor: DescriptorInput!) {
    add(descriptor: $descriptor) {
        id
        name
        description
        tags
    }
}`;
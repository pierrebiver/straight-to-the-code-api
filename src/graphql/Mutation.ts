import gql from 'graphql-tag';


export const ADD = gql`mutation DescriptorAdd($descriptor: DescriptorInput!) {
    add(descriptor: $descriptor) {
        name
        description
        tags
    }
}`;

export const EDIT = gql`mutation DescriptorEdit($descriptor: DescriptorInput!) {
    edit(descriptor: $descriptor) {
        id
        name
        description
        tags
    }
}`;


export const DELETE = gql`mutation DescriptorDELETE($descriptorId: ID!) {
    delete(descriptorId: $descriptorId)
}`;
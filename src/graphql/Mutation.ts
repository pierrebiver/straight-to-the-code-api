import gql from 'graphql-tag';


export const ADD = gql`mutation DescriptorAdd($descriptor: DescriptorAddInput!) {
    add(descriptor: $descriptor) {
        id
        name
        description
        tags
    }
}`;

export const EDIT = gql`mutation DescriptorEdit($descriptor: DescriptorEditInput!) {
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
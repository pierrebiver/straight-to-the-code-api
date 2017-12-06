import {types, flow} from "mobx-state-tree";
import client from "graphql/config";
import {ApolloQueryResult} from "apollo-client";
import {ADD} from "graphql/Mutation";


const Descriptor = types.model("Descriptor", {
    id: types.identifier(),
    name: types.string,
    tags: types.optional(types.array(types.string), []),
    description: types.maybe(types.string),
});

export type IDescriptor = typeof Descriptor.Type;

const DescriptorInput = types.model("DescriptorInput", {
    name: types.maybe(types.string),
    tags: types.optional(types.array(types.string), []),
    description: types.maybe(types.string),
});

export type IDescriptorInput = typeof DescriptorInput.Type;


export const DescriptorStore = types.model("DescriptorStore", {
    descriptors: types.optional(types.array(Descriptor), []),
    descriptorInput: types.optional(DescriptorInput, DescriptorInput.create()),
    tags: types.optional(types.array(types.string), []),
}).actions(self => {

    function sendAdd(descriptor: IDescriptorInput) {
        return client.mutate({
            mutation: ADD,
            variables: {descriptor}
        }).then((result: ApolloQueryResult<{ add: IDescriptor }>) => result.data.add)
            .catch(e => console.log("Failed to add new descriptor", e))
    }

    return {
        add: flow(function* add() {
            const newDescriptor = yield sendAdd(self.descriptorInput);
            self.descriptors.push(newDescriptor);
        }),
        resetNewDescriptor() {
            self.descriptorInput = DescriptorInput.create({})
        },
        updateNewDescriptor(fieldName: string, value: any) {
            self.descriptorInput[fieldName] = value;
        }
    }
});

export type IDescriptorStore = typeof DescriptorStore.Type;

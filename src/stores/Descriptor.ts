import {types, flow} from "mobx-state-tree";
import client from "graphql/config";
import {ApolloQueryResult} from "apollo-client";
import {ADD} from "graphql/Mutation";
import {DESCRIPTORS} from "graphql/Query";


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
    saving: types.optional(types.boolean, false),
    loading: types.optional(types.boolean, false),
}).actions(self => {

    function sendAdd(descriptor: IDescriptorInput) {
        return client.mutate({
            mutation: ADD,
            variables: {descriptor}
        }).then((result: ApolloQueryResult<{ add: IDescriptor }>) => result.data.add)
            .catch(e => console.log("Failed to add new descriptor", e))
    }

    function sendFetch() {
        return client.query({
            query: DESCRIPTORS
        }).then( (query: ApolloQueryResult<{descriptors: IDescriptor[]}>) => query.data.descriptors)
            .catch(e => console.log("Failed to fetch descriptor list", e))
    }

    function resetNewDescriptor() {
        self.descriptorInput = DescriptorInput.create({})
    }

    return {
        add: flow(function* add() {
            self.saving = true;
            const newDescriptor = yield sendAdd(self.descriptorInput);
            self.saving = false;
            self.descriptors.push(newDescriptor);
            resetNewDescriptor();
        }),
        updateNewDescriptor(fieldName: string, value: any) {
            self.descriptorInput[fieldName] = value;
        },
        afterCreate: flow(function* afterCreate() {
            self.loading = true;
            self.descriptors = yield sendFetch();
            self.loading = false;
        })
    }
});

export type IDescriptorStore = typeof DescriptorStore.Type;

import {types, flow, getSnapshot, applySnapshot} from "mobx-state-tree";
import client from "graphql/config";
import {ApolloQueryResult} from "apollo-client";
import {ADD, EDIT, DELETE} from "graphql/Mutation";
import {DESCRIPTORS} from "graphql/Query";


const Descriptor = types.model("Descriptor", {
    id: types.identifier(),
    name: types.string,
    tags: types.optional(types.array(types.string), []),
    description: types.maybe(types.string),
});

export type IDescriptor = typeof Descriptor.Type;

const DescriptorInput = types.model("DescriptorInput", {
    id: types.maybe(types.identifier()),
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
    filter: types.maybe(types.string),
    loading: types.optional(types.boolean, false),
})
    .views(self => {
        return {
            get filteredDescriptors() {
                const matchTags = (descriptor: IDescriptor) => !self.filter || descriptor.tags.some((t: string) => t.toUpperCase().includes(self.filter.toUpperCase()));
                const matchName = (descriptor: IDescriptor) => descriptor.name.toUpperCase().includes(self.filter.toUpperCase());
                return self.descriptors.filter((d: IDescriptor) => matchTags(d) || matchName(d))
            }
        }
    })
    .actions(self => {
        function sendSave(descriptor: IDescriptorInput, query: any) {
            return client.mutate({
                mutation: query,
                variables: {descriptor}
            }).then((result: ApolloQueryResult<{ add?: IDescriptor, edit: IDescriptor }>) => result.data.add || result.data.edit)
                .catch(e => console.log("Failed to add new descriptor", e))
        }

        function sendFetch() {
            return client.query({
                query: DESCRIPTORS
            }).then((query: ApolloQueryResult<{ descriptors: IDescriptor[] }>) => query.data.descriptors)
                .catch(e => console.log("Failed to fetch descriptor list", e))
        }

        function sendRemove(descriptorId: String) {
            return client.mutate({
                mutation: DELETE,
                variables: {descriptorId}
            }).then((result: ApolloQueryResult<{}>) => "ok")
                .catch(e => console.log("Failed to remove descriptor", e))

        }

        function resetNewDescriptor() {
            self.descriptorInput = DescriptorInput.create({})
        }

        return {
            save: flow(function* add() {
                self.saving = true;
                let query = ADD;

                if (self.descriptorInput.id) {
                    query = EDIT;
                }
                const newDescriptor = yield sendSave(self.descriptorInput, query);
                self.saving = false;

                let existingDescriptor: IDescriptor = self.descriptors.find((d: IDescriptor) => d.id.toString() === newDescriptor.id.toString());
                if (existingDescriptor) {
                    applySnapshot(existingDescriptor, newDescriptor)
                } else {
                    self.descriptors.push(newDescriptor);
                }
                resetNewDescriptor();
            }),
            remove: flow(function* remove(descriptorId: string) {
                const msg = yield sendRemove(descriptorId);
                self.descriptors.remove(self.descriptors.find(d => d.id.toString() === descriptorId));
            }),
            updateNewDescriptor(fieldName: string, value: any) {
                self.descriptorInput[fieldName] = value;
            },
            setFilter(filter: string | undefined) {
                self.filter = filter;
            },
            afterCreate: flow(function* afterCreate() {
                self.loading = true;
                self.descriptors = yield sendFetch();
                self.loading = false;
            }),
            setDescriptorInput(d: IDescriptor) {
                self.descriptorInput = DescriptorInput.create(getSnapshot(d));
            }
        }
    });

export type IDescriptorStore = typeof DescriptorStore.Type;

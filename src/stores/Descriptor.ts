import {types} from "mobx-state-tree";


const Descriptor = types.model("Descriptor", {
    id: types.identifier(),
    name: types.string,
    tags: types.array(types.string),
    description: types.maybe(types.string),
    example: types.maybe(types.string)
});

export type IDescriptor = typeof Descriptor.Type;


export const DescriptorStore = types.model("DescriptorStore", {
    descriptors: types.optional(types.array(Descriptor), []),
    tags: types.optional(types.array(types.string), []),
}).actions( self => {

    return {}
});

export type IDescriptorStore = typeof DescriptorStore.Type;

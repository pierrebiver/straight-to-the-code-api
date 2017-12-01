import {types} from "mobx-state-tree";


const Descriptor = types.model("Descriptor", {
    id: types.identifier(),
    name: types.string,
    tags: types.array(types.string),
    description: types.maybe(types.string),
    example: types.maybe(types.string)
});

export type IDescriptor = typeof Descriptor.Type;


const DescriptorStore = types.model("DescriptorStore", {});
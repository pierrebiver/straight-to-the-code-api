import * as React from 'react';
import {Search, SearchProps} from 'semantic-ui-react';
import {compose, withHandlers} from "recompose";
import {inject, observer} from "mobx-react";
import {IDescriptorStore} from "../stores/Descriptor";
import {SyntheticEvent} from "react";


const SearchDescriptor = ({descriptorStore, onSearchChange}: DescriptorProps) => (
    <Search fluid placeholder="Search for Go's feature" onSearchChange={onSearchChange}
            open={false} value={descriptorStore.filter || undefined}
    />
);

type DescriptorProps = {
    descriptorStore: IDescriptorStore;
    onSearchChange: (event: any, data: SearchProps) => void
}

const withOnChange = withHandlers({
    onSearchChange: ({descriptorStore}: DescriptorProps) => (event: SyntheticEvent<any>, data: SearchProps) => descriptorStore.setFilter(data.value)
});

export default compose<{ descriptorStore: IDescriptorStore }, {}>(
    inject("descriptorStore"),
    withOnChange,
    observer
)(SearchDescriptor)


import * as React from 'react';
import {compose} from "recompose";
import {inject, observer} from "mobx-react";
import {IDescriptor, IDescriptorStore} from "stores/Descriptor";
import {Card} from "semantic-ui-react";
import DescriptorCard from 'components/DescriptorCard';

type DescriptorListProps = {
    descriptorStore: IDescriptorStore
}


const DescriptorListComponent = ({descriptorStore}: DescriptorListProps) => (
    <Card.Group itemsPerRow="1">
        {descriptorStore.filteredDescriptors.map((d: IDescriptor) => <DescriptorCard key={d.id as string} descriptor={d}/>)}
    </Card.Group>
);


export default compose<DescriptorListProps, {}>(
    inject("descriptorStore"),
    observer
)(DescriptorListComponent)
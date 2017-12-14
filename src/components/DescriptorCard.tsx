import * as React from 'react';
import {IDescriptor, IDescriptorStore} from "stores/Descriptor";
import {Card, List, Modal, Button} from 'semantic-ui-react';
import {ReactMdePreview} from "react-mde";
import Add from "components/Add";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";

type DescriptorCardProps = {
    descriptor: IDescriptor,
    descriptorStore: IDescriptorStore
}

const DescriptorCardComponent = ({descriptor, descriptorStore}: DescriptorCardProps) => (
    <Card centered style={{margin: "10px 3em 10px 3em"}}>
        <Card.Content>
            <Card.Header>{descriptor.name}</Card.Header>
            <Card.Description>
                <ReactMdePreview markdown={descriptor.description}/>
            </Card.Description>
        </Card.Content>
        <Card.Content>
                {descriptor.tags.map(t => <span style={{ color: "dodgerblue" }} key={t} >{`#${t}`}</span>)}
        </Card.Content>
        <Card.Content extra>
            <Modal trigger={<Button>Edit</Button>}>
                <Modal.Content>
                    <Add descriptor={descriptor}/>
                </Modal.Content>
            </Modal>
            <Button negative
                    onClick={() => descriptorStore.remove(descriptor.id.toString())}>Delete</Button>
        </Card.Content>
    </Card>
);

export default compose<DescriptorCardProps, { descriptor: IDescriptor }>(
    inject("descriptorStore"),
    observer
)(DescriptorCardComponent)
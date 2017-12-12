import * as React from 'react';
import {IDescriptor, IDescriptorStore} from "stores/Descriptor";
import {Card, List, Modal, Button} from 'semantic-ui-react';
import {ReactMdePreview} from "react-mde";
import Add from "components/Add";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";

type DescritorCardProps = {
    descriptor: IDescriptor,
    descriptorStore: IDescriptorStore
}

const DescriptorCardComponent = ({descriptor, descriptorStore}: DescritorCardProps) => (
    <Card centered style={{margin: "10px 3em 10px 3em"}}>
        <Card.Content>
            <Card.Header>{descriptor.name}</Card.Header>
            <Card.Description>
                <ReactMdePreview markdown={descriptor.description}/>
            </Card.Description>
        </Card.Content>
        <Card.Content>
            <List horizontal>
                {descriptor.tags.map(t => <List.Item key={t}>{`#${t}`}</List.Item>)}
            </List>
        </Card.Content>
        <Card.Content extra>
            <Modal trigger={<Button>Edit</Button>}>
                <Modal.Content>
                    <Add descriptor={descriptor}/>
                </Modal.Content>
            </Modal>
            <Button icon="trash" negative
                    onClick={() => descriptorStore.remove(descriptor.id.toString())}>Delete</Button>
        </Card.Content>
    </Card>
);

export default compose<DescritorCardProps, { descriptor: IDescriptor }>(
    inject("descriptorStore"),
    observer
)(DescriptorCardComponent)
import * as React from 'react';
import {IDescriptor} from "../stores/Descriptor";
import {Card, List} from 'semantic-ui-react';
import {ReactMdePreview} from "react-mde";

export default ({descriptor}: { descriptor: IDescriptor }) => (
    <Card>
        <Card.Content>
            <Card.Header>{descriptor.name}</Card.Header>
            <Card.Description>
                <ReactMdePreview  markdown={descriptor.description}/>
            </Card.Description>
        </Card.Content>
        <Card.Content>
            <List horizontal>
                {descriptor.tags.map(t => <List.Item key={t}>{`#${t}`}</List.Item>)}
            </List>
        </Card.Content>
    </Card>
);
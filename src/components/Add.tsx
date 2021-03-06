import * as React from 'react';
import {Container, DropdownProps, Form, Header, Button} from "semantic-ui-react";
import {compose, lifecycle, withState} from "recompose";
import ReactMde, {ReactMdeCommands, ReactMdeTypes} from "react-mde";


import 'react-mde/lib/styles/css/react-mde-all.css';
import 'font-awesome/css/font-awesome.css';
import {IDescriptor, IDescriptorStore} from "../stores/Descriptor";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";


type ReactMardownProps = {
    description: string,
    setDescription: (fieldName: string, value: string) => void
}

const ReactMarkdown = ({description, setDescription}: ReactMardownProps) => (
    <ReactMde commands={ReactMdeCommands.getDefaultCommands()} value={{text: description}}
              onChange={(value: ReactMdeTypes.Value) => setDescription("description", value.text)}/>
);


const tagsOptions = [
    {text: "test", value: "value"}
];

const handleAddOptions = (e: any, data: DropdownProps) => tagsOptions.push({
    text: data.value as string,
    value: data.value as string
});

type AddProps = {
    descriptorStore: IDescriptorStore,
    descriptor?: IDescriptor
}

const isEdit = lifecycle<AddProps, {}>({
    componentDidMount() {
        if (this.props.descriptor) {
            this.props.descriptorStore.setDescriptorInput(this.props.descriptor);
            this.props.descriptorStore.descriptorInput.tags.forEach(t => tagsOptions.push({text: t, value: t}));
        }
    }
});

const AddComponent = ({descriptorStore}: { descriptorStore: IDescriptorStore }) => (
    <Container>
        <Header>Add/Edit new Descriptor</Header>
        <Form>
            <Form.Input label="Name" value={descriptorStore.descriptorInput.name || ''}
                        onChange={(e, data) => descriptorStore.updateNewDescriptor("name", data.value)}/>
            <label> Description </label>
            <ReactMarkdown description={descriptorStore.descriptorInput.description || ''}
                           setDescription={descriptorStore.updateNewDescriptor}/>

            <Form.Dropdown label="#Tags" selection onAddItem={handleAddOptions} allowAdditions search
                           options={tagsOptions} multiple value={[...descriptorStore.descriptorInput.tags]}
                           onChange={(e, data) => descriptorStore.updateNewDescriptor("tags", data.value)}/>
            <Button primary onClick={() => descriptorStore.save()} loading={descriptorStore.saving}> Save </Button>
            <Button><Link to="/">Back</Link></Button>
        </Form>
    </Container>
);

export default compose<AddProps, { descriptor?: IDescriptor }>(
    inject("descriptorStore"),
    isEdit,
    observer
)(AddComponent);
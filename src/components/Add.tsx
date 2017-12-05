import * as React from 'react';
import {Container, DropdownProps, Form, Header, Button} from "semantic-ui-react";
import {compose, withState} from "recompose";
import ReactMde, {ReactMdeCommands, ReactMdeTypes} from "react-mde";


import 'react-mde/lib/styles/css/react-mde-all.css';
import 'font-awesome/css/font-awesome.css';


type ReactMardownProps = {
    text: {
        reactMdeValue: ReactMdeTypes.Value
    };
    setText: (text: { reactMdeValue: ReactMdeTypes.Value }) => void
}

const ReactMarkdownComponent = ({text, setText}: ReactMardownProps) => (
    <ReactMde commands={ReactMdeCommands.getDefaultCommands()} value={text.reactMdeValue}
              onChange={(value: ReactMdeTypes.Value) => setText({reactMdeValue: value})}/>
);

const withValue = withState("text", "setText", {reactMdeValue: ""});

const ReactMarkdown = compose<ReactMardownProps, {}>(
    withValue
)(ReactMarkdownComponent);

const tagsOptions = [
    {text: "test", value: "value"}
];

const handleAddOptions = (e: any, data: DropdownProps) => tagsOptions.push({
    text: data.value as string,
    value: data.value as string
});

export const Add = () => (
    <Container>
        <Header>Add new Descriptor</Header>
        <Form>
            <Form.Input label="Name"/>
            <label> Description </label>
            <ReactMarkdown/>

            <Form.Dropdown label="#Tags" selection onAddItem={handleAddOptions} allowAdditions={true} search
                           options={tagsOptions} multiple/>
            <Button primary> Save </Button>
        </Form>
    </Container>
);
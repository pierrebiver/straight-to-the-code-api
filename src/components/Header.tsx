import * as React from 'react'
import {Header, Segment, Image, Menu, Icon} from "semantic-ui-react";
import Search from 'components/Search';

const goIcon = require('images/Go-brown.png');

const AdditionalInfo = () => (
    <Menu floated="right" borderless inverted color="blue" size="huge">
        <a href="https://github.com/pierrebiver/straight-to-the-code-api">
            <Menu.Item
                icon={<Icon style={{fontSize: "2.4em"}} name="github" link/>}/></a>
    </Menu>
);


export const HeaderGo = () => (
    <Segment inverted
             textAlign='center'
             style={{minHeight: 400, padding: '1em 0em', "marginBottom": '2em'}}
             vertical color="blue">
        <AdditionalInfo/>
        <Header as="h1"
                style={{fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em'}}>
            <Image src={goIcon} inline/>
            The Go's Wiki
        </Header>
        <Search/>
    </Segment>
);
import * as React from 'react'
import {Header, Image} from "semantic-ui-react";

const banner = require('images/twitter-gopher-banner-small.jpg');

export const HeaderGo = () => (
    <Image height="300px" width="100%" src={banner}/>
);
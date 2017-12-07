import * as React from 'react';
import {HeaderGo} from "components/Header";
import SearchDescriptor from "components/Search";
import DescriptorList from "components/DescriptorList";

export const App = () => (
    <div>
        <HeaderGo/>
        <SearchDescriptor/>
        <DescriptorList/>
    </div>
);
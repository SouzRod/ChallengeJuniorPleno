import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import User from '../pages/User';

export default () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={User} />
        </BrowserRouter>
    )
}
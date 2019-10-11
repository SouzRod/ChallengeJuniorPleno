import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import User from '../pages/User';
import Register from '../pages/Register';
import Edit from '../pages/Edit';

export default () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={User} />
            <Route path="/cadastrar" exact component={Register} />
            <Route path="/editar" exact component={Edit} />
        </BrowserRouter>
    )
}
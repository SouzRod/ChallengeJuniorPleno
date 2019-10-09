import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './User.css';

import api from '../../config/api'

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            element: ''
        }
        this.getUser().then(res => res)
    }
    getUser = async () => {

        let result = await api.get('/user')
        this.setState({ users: result.data })
    }

    createTable() {
        let table = this.state.users.map(user => {
            return <tr id={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <Link id={user._id} className="linkButtons" to="#" onClick={e => this.showDetail(e)} >Detalhes</Link>
                        <Link className="linkButtons" to="#">Deletar</Link>
                        <Link className="linkButtons" to="#">alterar</Link>
                    </td>
                   </tr>
        })

        return table
    }

    showDetail = async event => {

        event.preventDefault()

        let id = event.target.id
        let result = await api.get(`/user/${id}`)

        let user = result.data
        console.log(user)

        this.elementDetail(user)

    }

    elementDetail = user => {
        this.setState( { element : (
            <div className="divDetailuser">
                <div className="interDivDetail" id="iterDivDetail">
                    <h1>Detalhes do produto</h1>
                    <p>Nome: {user.name}</p>
                    <p>E-mail: {user.description}</p>
                    <p>Endereço: {user.description}</p>
                    <p>Cidade: {user.description} - {user.description}</p>
                    <p>Data de Criação: {user.createdAt}</p>
                </div>
            </div>
        )})
    }

    render(){
        return (
            <div className="containerUser">
                <div className="divTableUser">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Botões</th>
                            </tr>                           
                        </thead>
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
                {this.state.element}
            </div>
        )
    }
}


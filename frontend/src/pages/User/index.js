import React, { Component } from 'react';
import './User.css';

import api from '../../config/api'
import btnDelete from '../../img/delete.svg';
import btnEdit from '../../img/edit.svg';

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


    editUser = async (event) => {

        event.preventDefault()

        let id = event.target.id
        let userList = await api.get('/user')

        const user = userList.data.filter((user) => user._id === id)
        this.props.history.push('/editar', { ...user[0] })
    }

    createTable() {
        let table = this.state.users.map(user => {
            return <tr id={user._id} onClick={e => this.showDetail(e)}>
                    <td id={user._id}>{user.name}</td>
                    <td id={user._id}>{user.email}</td>
                    <td id={user._id}>
                        <button id={user._id} type="button" onClick={e => this.deleteUser(e)}><img  id={user._id} src={btnDelete} alt="Delete" /></button>
                        <button id={user._id} type="button" onClick={e => this.editUser(e)}><img  id={user._id} src={btnEdit} alt="Edit" /></button>
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

        this.elementDetail(user)

    }

    elementDetail = user => {
        this.setState( { element : (
            <div className="divDetailUser">
                <div className="interDivDetail" id="iterDivDetail">
                    <h2>Detalhes do Usuário</h2>
                    <ul>
                        <li><span>Nome:</span> {user.name}</li>
                        <li><span>E-mail:</span> {user.email}</li>
                        <li><span>Endereço:</span> {user.address}</li>
                        <li><span>Cidade:</span> {user.city} - {user.state}</li>
                        <li><span>Data de Criação:</span> {user.createdAt}</li>
                    </ul>
                </div>
            </div>
        )})
    }

    deleteUser = async (event) => {
        event.preventDefault()

        let id = event.target.id
        await api.delete(`/user/${id}`)

        await this.getUser()
        this.setState({ element: ''})
    }

    showPageRegister = (event) => {
        event.preventDefault()

        this.props.history.push('/cadastrar')
         
    }

    render(){
        return (
            <div className="containerPage">
                <div className="navBar">
                    <h1>CRUD de usuário</h1>
                    <button type="button" onClick={e => this.showPageRegister(e)}>Novo Usuário</button>
                </div>
                <div className="containerUser">
                    <div className="divTableUser">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>E-mail</th>
                                    <th>Ação</th>
                                </tr>                           
                            </thead>
                            <tbody>
                                {this.createTable()}
                            </tbody>
                        </table>
                    </div>
                    {this.state.element}
                </div>
            </div>
        )
    }
}


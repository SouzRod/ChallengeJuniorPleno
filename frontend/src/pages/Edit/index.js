import React, { Component } from 'react';
import './Edit.css';

import api from '../../config/api'

export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = this.props.location.state

        this.fillState()
    }

    fillState(){
        console.log("Location: ",this.props.location.state)
        // const {_id, name, email, address, city, state} = this.props.location.state
        this.setState(this.props.location.state)

        console.log(this.state)
    }

    validateButton() {
        return this.state.name.length > 0 && this.state.email.length > 0 && this.state.address.length > 0 && this.state.city.length > 0 && this.state.state.length > 0
    }

    handleChange = event => {
        this.setState({ [event.target.id] : event.target.value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const result = await api.put(`/user/${this.state._id}`, {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state
        })

        if (result.statusText !== 'OK') {
            alert(result.statusText)
            return false
        }

        alert('Usuário editado com sucesso!')

        this.props.history.push('/')
    }

    handleCancelar = (event) => {
        event.preventDefault()
        this.props.history.push('/')
    }
    render(){
        return (
            <div className="containerPage">
                <div className="containerRegister">
                    <form className="formRegister">
                        <h1>Edição de Usuário</h1>
                        <input type="text" className="inputRegister" name="name" value={this.state.name} id="name" onChange={e => this.handleChange(e)} placeholder='Nome' />
                        <input type="email" className="inputRegister" name="email" value={this.state.email} id="email" onChange={e => this.handleChange(e)} placeholder='Email' />
                        <input type="text" className="inputRegister" name="address" value={this.state.address} id="address" onChange={e => this.handleChange(e)} placeholder="Endereço" />
                        <div className="divInput">
                            <input type="text" className="inputCity" name="city" value={this.state.city} id="city" onChange={e => this.handleChange(e)} placeholder="Cidade" />
                            <input type="text" className="inputState" name="state" value={this.state.state} id="state" onChange={e => this.handleChange(e)} placeholder="Estado" />
                        </div>
                        <div className="divButton">
                            <button type="submit" id="register" className="buttonRegister" onClick={this.handleSubmit} >Editar</button>
                            <button type="submit" className="buttonRegister" onClick={this.handleCancelar}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


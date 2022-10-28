import React from "react"
import axios from "axios"

// import base_url dari file config.js
import { base_url } from "../config.js";
import "../assets/style.css"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            role: "",
            Logged: true
        }
    }
    // arrow function -> untuk menjalankan fungsi login
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }

        let url = base_url + "/auth"

        axios.post(url, sendData)
        .then(res => {
            console.log(res);
            this.setState({logged: res.data.logged})
            if (this.state.logged) {
                let user = res.data.data
                let token = res.data.token
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                // if (res.data.data.role !== this.state.role) window.alert(
                //     "your option is not same with it account"
                // )
                this.props.history.push("/")
            } else {
                this.setState({message: res.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="background_login">
            <div className="container d-flex h-100 justify-content-center align-items-center">

                <div className="col-sm-6 card my-5 bg-dark">
                    <div className="card-header bg- text-white text-center">
                        <h4 className="login_title">LAUNDRY</h4>
                        {/* <strong className="halo">SIGN IN</strong> */}
                    </div>
                    <div className="card-body">
                        { !this.state.logged ? 
                        (
                            <div>
                                 {/* { this.state.message } */}
                            </div>
                        ) : null }
                        <form onSubmit={ev => this.Login(ev)}>
                        <div className="login_title1">username</div>
                            <input type="text" placeholder="enter username" className="form-control mb-1" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})} />

                        <div className="login_title1">password</div>
                            <input type="password" placeholder="enter password" className="form-control mb-1" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})}
                            autoComplete="false" />

                        <div className="form-group">
                            <label className="login_title1">role</label>
                            <select className="form-control" value={this.state.role} onChange={ ev => this.setState({ role: ev.target.value})}>
                                
                                <option> pilih.. </option>
                                <option value="admin">Admin</option>
                                <option value="kasir">Kasir</option>
                            </select>
                        </div><br/>
                                                
                            <button type="submit" className="btn btn-secondary btn-block ">Login</button>
                        </form>
                    </div>
                </div>
            </div>

            </div>
        )
    }
}

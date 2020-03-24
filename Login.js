import React, {Component} from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import {Link} from 'react-router-dom';

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      role: "",
      message: ""
    }
  }

  bind = (event) => {
    this.setState({[event.target.name] : event.target.value});
  }

  Login = (event) => {
    event.preventDefault();
    let url = "http://localhost/toko_online/public/user/auth";
    let form = new FormData();
    form.append("email", this.state.email);
    form.append("password", this.state.password);

    axios.post(url, form)
    .then(response => {
      let logged = response.data.status;
      if (logged) {
        let role = JSON.parse(localStorage.getItem("role"))
        console.log(role === "Admin")
        console.log(role)
        { role === "Admin" ? window.location = "/produk" : window.location = "/client" }
        this.setState({message: "Login Berhasil"});
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem("role", JSON.stringify(response.data.role));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("id", JSON.stringify(response.data.user.id));
      } else{
        this.setState({message: "Login Gagal"});
      }
      $("#message").toast("show");
    })
    .catch(error => {
      console.log(error);
    })
  }

  render(){
    return(
      <div className="container width" style={{width: 24 + "rem", paddingTop: 6 + "rem"}}>
        <h3 className="mt-4 text-center">Login</h3>
        <Toast id="message" autohide="false" title="Informasi">
          {this.state.message}
        </Toast>
        <form onSubmit={this.Login} className="mt-4">
          <div className="form-group mt-4">
            <input type="email" className="form-control" name="email"
            placeholder="Email" value={this.state.email} onChange={this.bind} />
          </div>
          <div className="form-group mt-4">
            <input type="password" className="form-control" name="password"
            placeholder="Password" value={this.state.password} onChange={this.bind} />
          </div>
          <button type="submit" className="btn btn-block btn-warning">Login</button>
        </form>
        <p className="text-center mt-2">Don't have an account?
        <Link to="/register">Register</Link>
        </p>
      </div>
    )
  }
}

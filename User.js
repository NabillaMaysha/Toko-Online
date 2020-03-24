import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class User extends Component {
  constructor(){
    super();
    this.state = {
      user: [],
      id: "",
      nama: "",
      email: "",
      password: "",
      role: "",
      namalengkap:"",
      image: null,
      action: "",
      find: "",
      message: ""
    }
    //jika tidak terdapat data token pada local storage
    if(!localStorage.getItem("Token")){
      //direct ke halaman login
      window.location = "/";
    }
  }
  bind = (event) => {
    // input teks
    this.setState({[event.target.name] : event.target.value});
  }
  bindImage = (e) => {
    // input file
    this.setState({image: e.target.files[0]})
  }
  Add = () => {
    //membuka modal
    $("#modal_user").modal("show");
    //mengosongkan data pada form
    this.setState({
      action: "insert",
      id: "",
      nama: "",
      email: "",
      password: "",
      role: "",
      namalengkap: "",
      image: null
    });
  }
  Edit = (item) => {
    //membuka modal
    $("#modal_user").modal("show");
    //mengisikan data pada form
    this.setState({
      action: "update",
      id: item.id,
      nama: item.nama,
      email: item.email,
      password: item.password,
      role: item.role,
      namalengkap: item.namalengkap,
      image: item.image
    });
  }
  get_user = () => {

    let url = "http://localhost/toko_online/public/user";
    axios.get(url)
    .then(response => {
      this.setState({user: response.data.user});

    })
    .catch(error => {
      console.log(error);
    });
  }
  Drop = (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {

      let url = "http://localhost/toko_online/public/user/drop/"+id;
      axios.delete(url)
      .then(response => {

        this.setState({message: response.data.message});

        this.get_user();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  componentDidMount = () => {
    this.get_user();
  }
  Save = (event) => {
      event.preventDefault();
      console.log(this.state.image)
      //menutup form modal
      $("#modal_user").modal("hide");
      let url = "http://localhost/toko_online/public/user/save"; // api nyimpan data
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("nama", this.state.nama);
      form.append("email", this.state.email);
      form.append("password", this.state.password);
      form.append("role", this.state.role);
      form.append("namalengkap", this.state.namalengkap);
      form.append("image", this.state.image, this.state.image.name); // satunya file, satunya namanya aja
      axios.post(url, form)
      .then(response => {
        this.setState({message: response.data.message});
        this.get_user();
      })
      .catch(error => {
        console.log(error);
      });
  }
  search = (event) => {
    if (event.keyCode === 13) {
      // keyCode 13 = tombol enter
      let url = "http://localhost/toko_online/public/user";
      let form = new FormData();
      form.append("find", this.state.find);
      axios.post(url, form)
      .then(response => {
        this.setState({user: response.data.user});
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  render(){
    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg-dark">
            <div className="row">
              <div className="col-sm-8">
                <h4 className="text-white">Data User</h4>
              </div>
              <div className="col-sm-4">
                <input type="text" className="form-control" name="find"
                  onChange={this.bind} value={this.state.find}
                  onKeyUp={this.search} placeholder="Pencarian..." />
                </div>
              </div>
            </div>
            {/* content card */}
            <div className="card-body bg-warning">
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
              <Toast id="loading" autohide="false" title="Informasi">
                <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
              </Toast>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nama User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Nama Lengkap</th>
                    <th>Image</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.user.map((item) => {
                    return(
                      <tr key={item.id}>
                        <td>{item.nama}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>{item.namalengkap}</td>
                        <td>
                          <img src={'http://localhost/toko_online/public/images/' + item.image}
                          alt={item.image} width="200px" height="200px"/>
                        </td>
                        <td>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Drop(item.id)}>
                            <span className="fa fa-trash"></span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* tombol tambah */}
              <button className="btn btn-dark my-2" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data
              </button>

              {/* from modal user */}
              <Modal id="modal_user" title="Form User" bg-header="warning" text_header="white">
                <form onSubmit={this.Save}>
                  Nama User
                  <input type="text" className="form-control" name="nama" value={this.state.nama} onChange={this.bind} required />
                  Email
                  <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.bind} required />
                  Password
                  <input type="text" className="form-control" name="password" value={this.state.password} onChange={this.bind} required />
                  Role
                  <input type="text" className="form-control" name="role" value={this.state.role} onChange={this.bind} required />
                  Nama Lengkap
                  <input type="text" className="form-control" name="namalengkap" value={this.state.namalengkap} onChange={this.bind} required />
                  Image
                  <input type="file" className="form-control" name="image" onChange={this.bindImage} required />
                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
    );
  }
}

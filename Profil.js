import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class Profil extends Component{
  constructor() {
    super();
    this.state = {
      user: [],
      id: "",
      nama: "",
      email: "",
      password: "",
      role: "user",
      namalengkap: "",
      gender: "",
      tempatlahir: "",
      tglahir: "",
      nohp: "",
      alamat: [],
      id_pengiriman: "",
      nama_penerima: "",
      kode_pos: "",
      kecamatan: "",
      kota: "",
      jalan: "",
      rt: "",
      rw: "",
      action: "",
      find: "",
      message: ""
    }
    if(!localStorage.getItem("Token")){
      window.location = "/";
    }
  }

  bind = (event) => {
    this.setState({[event.target.name] : event.target.value});
  }
  bindImage = (e) => {
    this.setState({image: e.target.files[0]})
  }

  get_user = () => {
    let id = JSON.parse(localStorage.getItem('id'))
    let url = "http://localhost/toko_online/public/user/"+id;
    axios.get(url)
    .then(response => {
      this.setState({
        user: response.data.user,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  

  get_alamat = () => {
    let id = JSON.parse(localStorage.getItem('id'))
    let url = "http://localhost/toko_online/public/alamat/"+id;
    axios.get(url)
    .then(response => {
      this.setState({
        alamat: response.data.alamat,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount = () => {
    this.get_user();
    this.get_alamat();
  }

  Add_alamat = () => {
    $("#modal_alamat").modal("show");
    this.setState({
      action: "insert",
      id_pengiriman: "",
      id: "",
      nama_penerima: "",
      kode_pos: "",
      kecamatan: "",
      kota: "",
      jalan: "",
      rt: "",
      rw: ""
    });
  }

  Edit_alamat = (item) => {
    $("#modal_alamat").modal("show");
    this.setState({
      action: "update",
      id_pengiriman: item.id_pengiriman,
      id: item.id,
      nama_penerima: item.nama_penerima,
      kode_pos: item.kode_pos,
      kecamatan: item.kecamatan,
      kota: item.kota,
      jalan: item.jalan,
      rt: item.rt,
      rw: item.rw
    });
  }

  Drop_alamat = (id_pengiriman) => {
    if(window.confirm("Apakah anda yakin ingin menghapus data alamat ini?")) {
      let url = "http://localhost/toko_online/public/alamat/drop/"+id_pengiriman;
      axios.delete(url)
      .then(response => {
        this.setState({message: response.data.message});
        this.get_alamat();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }



  Save = (event) => {
    console.log(this.state.id)
    event.preventDefault();
    $("#modal_user").modal("hide");
    let url = "http://localhost/toko_online/public/user/save_profil";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id", this.state.id);
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    form.append("role", this.state.role);
    form.append("nama", this.state.nama);
    form.append("namalengkap", this.state.namalengkap);
    form.append("gender", this.state.gender);
    form.append("tempatlahir", this.state.tempatlahir);
    form.append("tglahir", this.state.tglahir);
    form.append("nohp", this.state.nohp);
    axios.post(url, form)
    .then(response => {
      this.setState({
        message: response.data.message});
        $("$message").toast("show");
        this.get_user();
    })
    .catch(error => {
      console.log(error);
    });
  }

  Save_alamat = (event) => {
    let id = JSON.parse(localStorage.getItem('id'))
    event.preventDefault();
    $("#modal_alamat").modal("hide");
    let url = "http://localhost/toko_online/public/alamat/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_pengiriman", this.state.id_pengiriman);
    form.append("id", id);
    form.append("nama_penerima", this.state.nama_penerima);
    form.append("kode_pos", this.state.kode_pos);
    form.append("kecamatan", this.state.kecamatan);
    form.append("kota", this.state.kota);
    form.append("jalan", this.state.jalan);
    form.append("rt", this.state.rt);
    form.append("rw", this.state.rw);
    axios.post(url, form)
    .then(response => {
      this.setState({message: response.data.message});
      $("$message").toast("show");
    })
    .catch(error => {
      console.log(error);
    });
    this.componentDidMount();
  }

  render(){
    const { user, alamat } = this.state;
    console.log(user);
    // console.log(email);
    return(
      <div className="container">
        <div className="card mt-2">
          <div style={{ paddingTop: "5%", paddingLeft: "7%"}}>
            <div className="#" style={{ maxwidth: "200px" }}>
              <div className="row no-gutters">
                <div className="col-md-4">
                    {user.map((item,index) => {
                      return(
                        <img className="rounded float-left" src={"http://localhost/toko_online/public/images/"+item.image} style={{ height: "240px", width: "200px" }} />
                      )
                    })}
                    <input aria-hidden="true" type="file" className="fa fa-upload" name="image"
                    onChange={this.bindImage} required />
                </div>
                  <div style={{ paddingTop: "2%", paddingLeft: "0%" }}>
                    <div className="card-body">
                      <h4 className="card-title" style={{ fontWeight: "700" }}>Profile</h4>
                      <table className="table table-borderless">
                        {user.map((item, index) => {
                          return (
                            <ul class="list-group" key={index}>
                              <li class="list-group-item"> Username : {item.nama} </li>
                              <li class="list-group-item"> Email : {item.email} </li>
                              <li class="list-group-item"> Nama Lengkap : {item.namalengkap} </li>
                              <li class="list-group-item"> Gender : {item.gender} </li>
                              <li class="list-group-item"> Tempat Lahir : {item.tempatlahir} </li>
                              <li class="list-group-item"> Tanggal Lahir : {item.tglahir} </li>
                              <li class="list-group-item"> No HP : +62{item.nohp} </li>
                              <button className="m-1 btn btn-sm btn-outline-warning" onClick={() => this.Edit(item)}>
                              <span className="fa fa-edit"></span>Edit
                              </button>
                            </ul>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                  <Modal id="modal_user" title="Form User" bg_header="warning">
                    <form onSubmit={this.Save}>
                      Username
                      <input type="text" className="form-control" name="nama"
                      value={this.state.nama} onChange={this.bind} required />
                      Nama Lengkap
                      <input type="text" className="form-control" name="namalengkap"
                      value={this.state.namalengkap} onChange={this.bind} required />
                      Gender
                      <input type="enum" className="form-control" name="gender"
                      value={this.state.gender} onChange={this.bind} required />
                      Tempat Lahir
                      <input type="text" className="form-control" name="tempatlahir"
                      value={this.state.tempatlahir} onChange={this.bind} required />
                      Tanggal Lahir
                      <input type="date" className="form-control" name="tglahir"
                      value={this.state.tglahir} onChange={this.bind} required />
                      No HP
                      <input type="text" className="form-control" name="nohp"
                      value={this.state.nohp} onChange={this.bind} required />
                      <button type="submit" className="btn btn-warning pull-right m-2">
                      <span className="fa fa-check"></span> Simpan
                      </button>
                    </form>
                  </Modal>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-2">
          <div style={{ paddingTop: "5%", paddingLeft: "7%"}}>
            <div className="#" style={{ maxwidth: "200px" }}>
              <div className="container">
                  <div style={{ paddingTop: "2%", paddingLeft: "0%" }}>
                    <div className="card-body">
                      <h4 className="card-title" style={{ fontWeight: "700" }}>Alamat</h4>
                      <button className="m-1 btn btn-sm btn-outline-warning" onClick={this.Add_alamat}>
                        <span className="fa fa-plus"></span> Tambah Alamat
                      </button>
                      <table className="table table-borderless">
                        {alamat.map((item, index) => {
                          return (
                            <ul class="list-group" key={index}>
                            <li className="list-group-item">Nama Penerima : {item.nama_penerima}</li>
                            <li className="list-group-item">Kode Pos : {item.kode_pos}</li>
                            <li className="list-group-item">Kecamatan : {item.kecamatan}</li>
                            <li className="list-group-item">Kota : {item.kota}</li>
                            <li className="list-group-item">Jalan : {item.jalan}</li>
                            <li className="list-group-item">RT : {item.rt}</li>
                            <li className="list-group-item">RW : {item.rw}</li>
                            <li className="list-group-item">
                            <button className="m-1 btn btn-sm btn-outline-warning" onClick={() => this.Edit_alamat(item)}>
                              <span className="fa fa-edit"> Edit </span>
                            </button>
                            <button className="m-1 btn btn-sm btn-outline-warning" onClick={() => this.Drop_alamat(item.id_pengiriman)}>
                              <span className="fa fa-trash"> </span>
                            </button>
                            </li>
                            </ul>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                  <Modal id="modal_alamat" title="Form Alamat" bg_header="warning">
                    <form onSubmit={this.Save_alamat}>
                      Nama Penerima
                      <input type="text" className="form-control" name="nama_penerima" value={this.state.nama_penerima} onChange={this.bind} required />
                      Kode Pos
                      <input type="text" className="form-control" name="kode_pos" value={this.state.kode_pos} onChange={this.bind} required />
                      Kecamatan
                      <input type="text" className="form-control" name="kecamatan" value={this.state.kecamatan} onChange={this.bind} required />
                      Kota
                      <input type="text" className="form-control" name="kota" value={this.state.kota} onChange={this.bind} required />
                      Jalan
                      <input type="text" className="form-control" name="jalan" value={this.state.jalan} onChange={this.bind} required />
                      RT
                      <input type="text" className="form-control" name="rt" value={this.state.rt} onChange={this.bind} required />
                      RW
                      <input type="text" className="form-control" name="rw" value={this.state.rw} onChange={this.bind} required />

                      <button type="submit" className="btn btn-warning pull-right m-2">
                        <span className="fa fa-check"></span> Simpan
                      </button>
                    </form>
                  </Modal>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

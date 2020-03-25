import React, { Component } from 'react'
import $ from "jquery";
import axios from "axios";


export default class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carts: [],
      num: 0,
      total: 0,
      alamat: [],
            id_pengiriman: "",
            nama_penerima: "",
            kode_pos: "",
            kecamatan: "",
            kota: "",
            jalan: "",
            rt: "",
            rw: "",
            message: "",
            action: "",
            find: "",
            message: ""
    }


    }


  getCarts = () => {
    let items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
let total = 0
let num = 0
items.forEach(item => {
  total += item.total
  num += item.stok
});
this.setState({
  carts: items,
  num: num,
  total: total
});


  }

  componentDidMount() {
    this.getCarts()
    this.get_alamat();
  }

  removeFromCart = (produk) => {
    let carts = JSON.parse(localStorage.getItem('cart'));
    let cart = carts.filter(item => item.id !== produk.id );
    localStorage.setItem('cart', JSON.stringify(cart));
    this.getCarts()


  }
  clearCart = () => {
    localStorage.removeItem('cart');
    this.setState({carts: []});

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

render(){
   const { carts, num, total, alamat} =  this.state;
   console.log(alamat);
   return(
     <div>
       <div className="container">
         <div className="py-5 text-center">
           <h2>Checkout</h2>
         </div>
         <div className="row">

         { !carts.length ?

         <div className="col-md-4 order-md-2 mb-4">
             <h4 className="d-flex justify-content-between align-items-center mb-3">
               <span className="text-muted">Your cart</span>
               <span className="badge badge-warning badge-pill">0</span>
             </h4>
             <ul className="list-group mb-3">
                 <div>
                 <h3 className="text-warning">No item on the cart</h3>
                 </div>
                 <li className="list-group-item d-flex justify-content-between">
                   <span>Total (IDR)</span>
                   <strong>Rp.0</strong>
                 </li>
                 <button className="btn btn-danger float-right" onClick={this.clearCart}
                     style={{ marginRight: "0px", marginTop:"10px" }}><span className="fa fa-trash"></span> Clear Cart
                 </button>

              </ul>
           </div>
          :

           <div className="col-md-4 order-md-2 mb-4">
             <h4 className="d-flex justify-content-between align-items-center mb-3">
               <span className="text-muted">Your cart</span>
               <span className="badge badge-secondary badge-pill">{num}</span>
             </h4>
             <ul className="list-group mb-3">
                 <div>{carts.map((produk, index) =>
                   <div key={index}>
                     <li className="list-group-item d-flex justify-content-between lh-condensed">
                       <div>
                         <h6 className="my-0">{produk.nama_produk}</h6>
                         <small className="text-muted">Harga {produk.harga}</small>
                       </div>
                       <span className="text-muted">Rp.{produk.total}</span>
                       <button className="btn btn-sm btn-warning"
                         onClick={() => this.removeFromCart(produk)}><span className="fa fa-times-circle"></span> Remove
                       </button>
                     </li>
                   </div>
                   )}
                 </div>

                 { carts.length ?
                 <li className="list-group-item d-flex justify-content-between">
                   <span>Total (IDR)</span>
                   <strong>Rp.{total}</strong>
                 </li>: ''
                 }
                 <button className="btn btn-danger float-right" onClick={this.clearCart}
                     style={{ marginRight: "0px", marginTop:"10px" }}><span className="fa fa-trash"></span> Clear Cart
                 </button>
              </ul>
           </div>
           }


           <div className="col-md-8 order-md-1">
             <h4 className="mb-3">Pilih Alamat yang Akan dituju</h4>
             <form className="needs-validation" noValidate>

               <div className="row">
                 <div className="col mb-3 md-3">
                 <label htmlFor="state">Alamat</label>
                    <select className="form-control" name="role" value={this.state.value} onChange={this.bind} required>
                    {this.state.alamat.map((item) => {
                  return(
                    <option value="{item.id}">{item.jalan}</option>
                    )})}
                  </select>
                   <div className="invalid-feedback">
                     Please select a valid country.
                   </div>
                 </div>
               </div>

               <hr className="mb-4" />
               <button className="btn btn-warning btn-lg btn-block" type="submit" style={{marginTop:"110px"}}>
                 Continue to checkout
               </button>
             </form>
           </div>
         </div>
       </div>
     </div>
   );
 }


    }

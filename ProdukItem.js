import React from 'react';

export default class ProductItem extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            total: 0
        }
    }

    bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    addToCart = (item) => {
        let oldItems = JSON.parse(localStorage.getItem('cart')) || []
        let newid = item.id_produk
        let match = oldItems.find(({ id_produk }) => id_produk === newid);
        if (match)
        {
                match['stok'] += parseInt(this.state.stok);
                match['total'] = match['total'] + (item.harga * parseInt(this.state.stok));
        }
        else
        {
            let newItem = {
                'id_produk': item.id_produk,
                'nama_produk': item.nama_produk,
                'harga': item.harga,
                'stok': parseInt(this.state.stok),
                'total': item.harga * parseInt(this.state.stok)
            };
            oldItems.push(newItem);
        }
        localStorage.setItem('cart', JSON.stringify(oldItems));
      }

      render(){
        const { item } = this.props;
        return (
            <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100" style={{ marginBottom: "10px"}}>
                <a href="#"><img className="card-img-top" src={'http://localhost/toko_online/public/images/' + item.image} alt="" /></a>
                    <div className="card-body">
                        <h4 className="card-title">
                            <a href="#">{item.nama_produk}</a>
                        </h4>
                        <h5>Rp. {item.harga}</h5>
                        <p className="card-text">{item.deskripsi}</p>
                        <span className="card-text">
                            <small>Available Quantity: </small>{item.stok}
                        </span>
                        { item.stok > 0 ?
                        <div>
                        <button className="btn btn-sm btn-warning"
                            onClick={() =>this.addToCart(item)}>Add to cart</button>
                        <input type="number" value={this.state.stok} name="stok"
                            onChange={this.bind} className="float-right" 
                            style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
                        </div> :
                            <p className="text-danger"> product is out of stock </p>
                        }
                </div>
            </div>
            </div>
       )
    }

}

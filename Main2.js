import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

//Load Navbar
import Navbar from "./component2/Navbar";
//Load halaman
import Produk from "./page2/Produk";
import User from "./page2/User";
import Client from "./page2/Client";
import Cart from "./page2/Cart";
import Profil from "./page2/Profil";
import Login from "./page2/Login";
import Register from "./page2/Register";
import Orders from "./page2/Orders";


class Main2 extends Component {
  render = () => {
    return (
      <Switch>
        {/* Load component tiap halaman */}
<Route exact path="/" component={Login} />
<Route exact path="/register" component={Register} />
        <Route path="/produk">
          <Navbar />
          <Produk />
        </Route>

        <Route path="/user">
          <Navbar />
          <User />
        </Route>

        <Route path="/client">
          <Navbar />
          <Client />
        </Route>

        <Route path="/cart">
          <Navbar />
          <Cart />
        </Route>

        <Route path="/profil">
          <Navbar />
          <Profil />
        </Route>

        <Route path="/order">
          <Navbar />
          <Orders />
        </Route>




      </Switch>
    );
  }
}
export default Main2;

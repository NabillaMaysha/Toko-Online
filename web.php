<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    // return $router->app->version();
    return str_random(40);
});
// $router->get('/siswa','SiswaController@get');
// $router->post('/siswa','SiswaController@find');
// $router->post('/siswa/save','SiswaController@save');
// $router->delete('/siswa/drop/{id_siswa}','SiswaController@drop');
//
// $router->get('/pelanggaran','PelanggaranController@get');
// $router->post('/pelanggaran','PelanggaranController@find');
// $router->post('/pelanggaran/save','PelanggaranController@save');
// $router->delete('/pelanggaran/drop/{id_siswa}','PelanggaranController@drop');
//
$router->get('/user','UserController@get');
$router->post('/user','UserController@find');
$router->post('/user/save','UserController@save');
$router->delete('/user/drop/{id_user}','UserController@drop');
$router->post("/user/auth", "UserController@auth");
$router->post('register','UserController@register');
$router->post('/user/save_profil','UserController@save_profil');
$router->get('/user/{id}','UserController@getById');
//
$router->get('/alamat/{id}','AlamatController@get');
$router->post('/alamat/save','AlamatController@save');
$router->delete('/alamat/drop/{id_pengiriman}','AlamatController@drop');

$router->get('/produk','ProdukController@get');
$router->post('/produk','ProdukController@find');
$router->post('/produk/save','ProdukController@save');
$router->delete('/produk/drop/{id_produk}','ProdukController@drop');

$router->get('/orders','OrdersController@get');
$router->post('/orders','OrdersController@find');
$router->post('/orders/save','OrdersController@save');
$router->delete('/orders/drop/{id_order}','OrdersController@drop');
$router->get('/orders/{id}','OrdersController@getById');
$router->post('/decline/{id_order}','OrdersController@decline');
$router->post('/accept/{id_order}','OrdersController@accept');

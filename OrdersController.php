<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Orders;
use App\DetailOrders;
use App\User;
use App\Alamat;
use App\Produk;
use Auth;
class OrdersController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    $orders = [];
    foreach (Orders::all() as $o) {
      $detail = [];
      foreach ($o->detail_order as $d) {
        $itemDetail = [
          "id_order" => $d->id_order,
          "id_produk" => $d->id_produk,
          "nama_produk" => $d->produk->nama_produk,
          "qty" => $d->qty
        ];
        array_push ($detail, $itemDetail);
      }
      $item = [
        "id_order" => $o->id_order,
        "id" => $o->id,
        "nama" => $o->user->nama,
        "id_pengiriman" => $o->id_pengiriman,
        "jalan" => $o->alamat->jalan,
        "total" => $o->total,
        "bukti_bayar" => $o->bukti_bayar,
        "status" => $o->status,
        "detail" => $o->detail
      ];
      array_push($orders, $item);
    }
    return response(["orders" => $orders]);
  }

  public function getById($id)
  {
    $orders = [];
    foreach (Orders::where("id_order", $id_order)->get() as $o) {
      $detail = [];
      foreach ($o->detail_order as $d) {
        $itemDetail = [
          "id_order" => $d->id_order,
          "id_produk" => $d->id_produk,
          "nama_produk" => $d->produk->nama_produk,
          "qty" => $d->qty
        ];
        array_push ($detail, $itemDetail);
      }
      $item = [
        "id_order" => $o->id_order,
        "id" => $o->id,
        "id_pengiriman" => $o->id_pengiriman,
        "jalan" => $o->alamat->jalan,
        "total" => $o->total,
        "bukti_bayar" => $o->bukti_bayar,
        "status" => $o->status,
        "detail" => $o->detail
      ];
      array_push($orders, $item);
    }
    return response(["orders" => $orders]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $produk = Produk::where("id","like","%$find%")
    ->orWhere("nama","like","%$find%")
    ->orWhere("harga","like","%$find%")
    ->orWhere("deskripsi","like","%$find%")
    ->get();
    return response([
      "produk" => $produk
    ]);
  }

  public function save(Request $request)
  {
    try{
      $orders = new Orders();
      $orders->id = $request->id;
      $orders->id_pengiriman = $request->id_pengiriman;
      $orders->total = $request->total;
      $orders->status = "dipesan";
      $orders->save();

      $o = Orders::where("id_order", $request->id_order)->latest()->first();
      $detail = new Detail();
      $detail->id_order = $o->id_order;
      $detail->id_produk = $request->id_produk;
      $detail->qty = $request->qty;

      $detail->save();

      return response(["message" => "Data order berhasil ditambahkan"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function accept($id_order)
  {
    $o = Orders::where("id_order", $id_order)->first();
    $o->status = "dikirim";
    $o->save();
  }

  public function decline($id_order)
  {
    $o = Orders::where("id_order", $id_order)->first();
    $o->status = "ditolak";
    $o->save();
  }

  public function drop($id_order)
  {
    try {
      Orders::where("id_order", $id_order)->delete();
      return response(["message" => "Data order berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
 ?>

<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Produk;
use Auth;
class ProdukController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    return response([
      "produk" => Produk::all()
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $produk = Produk::where("nama_produk","like","%$find%")->orWhere("stok","like","%$find%")
    ->orWhere("harga","like","%$find%")->get();
    return response([
      "produk" => $produk
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $produk = new Produk();
        $produk->nama_produk = $request->nama_produk;
        $produk->stok = $request->stok;
        $produk->harga = $request->harga;
        $produk->deskripsi = $request->deskripsi;
        if($request->file('image')){
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/images", $name);
          $produk->image = $name;
        }
        $produk->save();
        return response(["message" => "Data produk berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $produk = Produk::where("id_produk", $request->id_produk)->first();
        $produk->nama_produk = $request->nama_produk;
        $produk->stok = $request->stok;
        $produk->harga = $request->harga;
        $produk->deskripsi = $request->deskripsi;
        if($request->file('image')){
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/images", $name);
          $produk->image = $name;
        }
        $produk->save();
        return response(["message" => "Data produk berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_produk)
  {
    try {
      Produk::where("id_produk", $id_produk)->delete();
      return response(["message" => "Data produk berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
 ?>

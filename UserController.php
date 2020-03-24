<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\User;
use Auth;
class UserController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    $user = [];
    foreach (User::all() as $u) {
      $item = [
        "id" => $u->id,
        "nama" => $u->nama,
        "email" => $u->email,
        'image'=>$u->image,
        "password" => Crypt::decrypt($u->password),
        "role" => $u->role
      ];
      array_push($user, $item);
    }
    return response([
      "user" => $user
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $users = User::where("nama","like","%$find%")
    ->orWhere("role","like","%$find%")->get();
    $user = [];
    foreach ($users as $u) {
      $item = [
        "id" => $u->id,
        "nama" => $u->nama,
        "email" => $u->email,
        "password" => Crypt::decrypt($u->password),
        "role" => $u->role
      ];
      array_push($user, $item);
    }
    return response([
      "user" => $user
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $user = new User();
        $user->nama = $request->nama;
        $user->email = $request->email;
        $user->password = Crypt::encrypt($request->password);
        $user->role = $request->role;
        if($request->file('image')){
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/images", $name);
          $user->image = $name;
        }
        $user->save();
        return response(["message" => "Data user berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $user = User::where("id", $request->id)->first();
        $user->nama = $request->nama;
        $user->email = $request->email;
        $user->password = Crypt::encrypt($request->password);
        $user->role = $request->role;
        if($request->file('image')){
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/images", $name);
          $user->image = $name;
        }
        $user->save();
        return response(["message" => "Data user berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id)
  {
    try {
      User::where("id", $id)->delete();
      return response(["message" => "Data user berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function auth(Request $request)
  {
    $email = $request->email;
    $password = $request->password;

    $user = User::where("email", $email);
    if ($user->count() > 0) {
      // login sukses
      $u = $user->first();
      if(Crypt::decrypt($u->password) == $password){
        return response(["status" => true, "user" => $u,
        "role" => $u->role, "token" => Crypt::encrypt($u->id)]);
      }else{
        return response(["status" => false]);
      }
    }else{
      return response(["status" => false]);
    }
  }

  public function register(Request $request)
  {
    try{
      $user = new User();
      $user->nama = $request->nama;
      $user->email = $request->email;
      $user->password = Crypt::encrypt($request->password);
      $user->role = "user";
      $user->save();

      return response(["message" => $e->getMessage()]);
      }
      catch(\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
  }

  public function save_profil(Request $request){
    $action = $request->action;
    if($action == "update"){
      try{
        $user = User::where("id", $request->id)->first();
        $user->nama = $request->nama;
        $user->namalengkap = $request->namalengkap;
        // $user->image = $request->image;
        $user->gender = $request->gender;
        $user->tempatlahir = $request->tempatlahir;
        $user->tglahir = $request->tglahir;
        $user->nohp = $request->nohp;
        $user->save();

        return response(["message" => "Data user berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function getById($id)
  {
    try{
      $user = User::where("id", $id)->get();
      return response(["user" => $user]);
    } catch(\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
 ?>

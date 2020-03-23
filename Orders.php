<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $table = "orders";
    protected $primaryKey = "id_order";
    protected $fillable = ["id","id_pengiriman","total","bukti_bayar","status"];

    public function user()
    {
      return $this->belongsTo("App\User", "id", "id");
    }

    public function alamat()
    {
      return $this->belongsTo("App\Alamat", "id_pengiriman", "id_pengiriman");
    }

    public function detail_order()
    {
      return $this->hasMany("App\DetailOrders", "id_order");
    }
}

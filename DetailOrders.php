<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetailOrders extends Model
{
    protected $table = "detail_orders";
    protected $fillable = ["id_order","id_produk","qty"];

    public function orders()
    {
      return $this->belongsTo("App\Orders", "id_order", "id_order");
    }

    public function produk()
    {
      return $this->belongsTo("App\Produk", "id_produk", "id_produk");
    }
}

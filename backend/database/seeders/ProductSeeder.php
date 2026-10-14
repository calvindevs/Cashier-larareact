<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Kopi Espresso Robusta 250g',
                'price' => 45000,
                'stock' => 50,
                'description' => 'Biji kopi robusta pilihan dengan aroma khas yang kuat dan pekat.'
            ],
            [
                'name' => 'Teh Hijau Jasmine Premium',
                'price' => 25000,
                'stock' => 75,
                'description' => 'Teh hijau melati pilihan yang menyegarkan dan kaya antioksidan.'
            ],
            [
                'name' => 'Roti Tawar Gandum Utuh',
                'price' => 18000,
                'stock' => 30,
                'description' => 'Roti tawar sehat tinggi serat yang cocok untuk menu sarapan.'
            ],
            [
                'name' => 'Susu UHT Full Cream 1L',
                'price' => 22000,
                'stock' => 100,
                'description' => 'Susu sapi segar berkualitas tinggi dengan kandungan kalsium lengkap.'
            ],
            [
                'name' => 'Minyak Goreng Sawit 2L',
                'price' => 38000,
                'stock' => 60,
                'description' => 'Minyak goreng jernih berkualitas untuk hasil masakan yang renyah.'
            ],
            [
                'name' => 'Gula Pasir Putih 1kg',
                'price' => 15000,
                'stock' => 120,
                'description' => 'Gula tebu murni pilihan yang manis dan higienis.'
            ],
            [
                'name' => 'Tepung Terigu Serbaguna 1kg',
                'price' => 13000,
                'stock' => 85,
                'description' => 'Tepung terigu berkualitas tinggi cocok untuk aneka kue dan gorengan.'
            ],
            [
                'name' => 'Telur Ayam Ras 1kg',
                'price' => 28000,
                'stock' => 40,
                'description' => 'Telur ayam segar pilihan langsung dari peternakan lokal.'
            ],
            [
                'name' => 'Mentega Serbaguna 200g',
                'price' => 12000,
                'stock' => 65,
                'description' => 'Mentega gurih untuk keperluan memasak dan membuat kue.'
            ],
            [
                'name' => 'Keju Cheddar Blok 165g',
                'price' => 21000,
                'stock' => 45,
                'description' => 'Keju cheddar olahan yang gurih, mudah diparut dan dilelehkan.'
            ],
            [
                'name' => 'Saus Tomat Botol 340ml',
                'price' => 16000,
                'stock' => 55,
                'description' => 'Saus tomat segar pilihan dengan rasa asam manis yang pas.'
            ],
            [
                'name' => 'Saus Sambal Ekstra Pedas 340ml',
                'price' => 17000,
                'stock' => 70,
                'description' => 'Saus sambal pedas nikmat penyempurna berbagai hidangan.'
            ],
            [
                'name' => 'Kecap Manis Botol 520ml',
                'price' => 24000,
                'stock' => 90,
                'description' => 'Kecap manis kental dari kedelai hitam pilihan berkualitas.'
            ],
            [
                'name' => 'Mie Instan Goreng (Dus/40pcs)',
                'price' => 110000,
                'stock' => 25,
                'description' => 'Mie instan goreng favorit dengan bumbu gurih yang khas.'
            ],
            [
                'name' => 'Air Mineral Botol 600ml (1 Dus)',
                'price' => 35000,
                'stock' => 80,
                'description' => 'Air mineral segar dari sumber mata air pegunungan alami.'
            ],
            [
                'name' => 'Cokelat Batang Hitam 100g',
                'price' => 26000,
                'stock' => 40,
                'description' => 'Dark chocolate kaya rasa untuk camilan atau bahan kue.'
            ],
            [
                'name' => 'Keripik Singkong Balado 250g',
                'price' => 15000,
                'stock' => 60,
                'description' => 'Keripik singkong renyah dengan bumbu balado pedas manis.'
            ],
            [
                'name' => 'Biskuit Gandum Cokelat 150g',
                'price' => 14000,
                'stock' => 50,
                'description' => 'Biskuit gandum sehat isi krim cokelat yang lezat.'
            ],
            [
                'name' => 'Sabun Cuci Piring Lemon 750ml',
                'price' => 19000,
                'stock' => 70,
                'description' => 'Cairan pencuci piring ampuh mengangkat lemak dengan aroma lemon.'
            ],
            [
                'name' => 'Deterjen Bubuk Wangi 1kg',
                'price' => 23000,
                'stock' => 65,
                'description' => 'Deterjen bubuk dengan formula pembersih aktif dan wangi tahan lama.'
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}

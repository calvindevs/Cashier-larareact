export default function CashierListProduct({ products, addToCart, cart }) {
  return (
    <>
      {products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-slate-400 font-medium animate-pulse">
            Memuat data produk...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isInCart = cart.some((item) => item.id === product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Bagian Gambar Produk */}
                  <div className="relative overflow-hidden bg-slate-100 h-44">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={
                        product.image_url ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60"
                      }
                      alt={product.name}
                    />
                    {/* Badge Stok di atas gambar */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-xs border border-slate-100">
                      Stok: {product.stock ?? 0}
                    </div>
                  </div>

                  {/* Bagian Teks/Konten */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description || "Tidak ada deskripsi produk."}
                    </p>
                  </div>
                </div>

                {/* Bagian Bawah: Harga & Tombol Add */}
                <div className="p-5 pt-0 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xs text-slate-400 block">Harga</span>
                    <span className="text-lg font-bold text-slate-900">
                      Rp {Number(product.price || 0).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled={isInCart}
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
                    onClick={() => addToCart(product)}
                  >
                    <svg
                      className="w-4 h-4 mr-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                      />
                    </svg>
                    {isInCart ? "Sudah di keranjang" : "Tambah"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { api } from "./lib/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useState("Products");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  }

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/products");
        setProducts(response.data.dataProducts.data);
      } catch (error) {
        console.error(error);
        setError("Gagal mengambil data produk.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const menus = [
    { name: "Orders", icon: "🛒" },
    { name: "Products", icon: "📦" },
    { name: "Laporan Penjualan", icon: "📊" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-5">
          <h1 className="text-xl font-bold text-gray-900">Cashier App</h1>
          <p className="mt-1 text-sm text-gray-500">Management Dashboard</p>
        </div>

        <nav className="space-y-2 p-4">
          {menus.map((menu) => (
            <button
              key={menu.name}
              type="button"
              onClick={() => setActiveMenu(menu.name)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                activeMenu === menu.name
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{menu.icon}</span>
              <span>{menu.name}</span>
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="absolute bottom-5 left-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <span>↪</span>
          <span>Logout</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="min-h-screen p-6 md:ml-64 md:p-8">
        <header className="mb-8">
          <p className="text-sm text-gray-500">Dashboard / {activeMenu}</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {activeMenu}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola {activeMenu.toLowerCase()} di sini.
          </p>
        </header>

        {/* Products */}
        {activeMenu === "Products" && (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Daftar Produk
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Total {products.length} produk
                </p>
              </div>
            </div>

            {loading && (
              <p className="py-8 text-center text-gray-500">Memuat produk...</p>
            )}

            {error && (
              <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error}
              </p>
            )}

            {!loading && !error && products.length === 0 && (
              <p className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
                Belum ada produk.
              </p>
            )}

            {!loading && products.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="mb-4 flex h-36 items-center justify-center rounded-lg bg-gray-100">
                      <span className="text-4xl">📦</span>
                    </div>

                    <h4 className="truncate font-semibold text-gray-900">
                      {product.name}
                    </h4>

                    <p className="mt-2 text-lg font-bold text-emerald-700">
                      {Number(product.price).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      })}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      Stok: {product.stock ?? 0}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Orders */}
        {activeMenu === "Orders" && (
          <section className="rounded-xl border border-gray-200 bg-white p-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Daftar Orders
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Halaman pesanan belum dihubungkan ke API.
            </p>
          </section>
        )}

        {/* Sales report */}
        {activeMenu === "Laporan Penjualan" && (
          <section className="rounded-xl border border-gray-200 bg-white p-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Laporan Penjualan
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Laporan akan ditampilkan setelah data transaksi dihubungkan ke
              API.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

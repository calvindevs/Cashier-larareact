import { useState } from "react";
import { api } from "./lib/api";

export default function CashierCart({
  cart,
  addToCart,
  decreaseQuantity,
  deleteProductFromCart,
  clearCart,
}) {
  const [amountPaid, setAmountPaid] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const paid = Number(amountPaid);
  const change = paid - total;

  const formatRupiah = (number) => Number(number).toLocaleString("id-ID");

  const handlePayment = async () => {
    if (cart.length === 0 || amountPaid === "" || paid < total) return;

    try {
      setIsSubmitting(true);
      console.log("Cart:", cart);

      // const payload = {
      //   items: cart.map((item) => ({
      //     product_id: item.id,
      //     quantity: item.quantity,
      //   })),
      //   amount_paid: paid,
      // };

      // const response = await api.post("/orders", payload);
      const response = await api.post("/orders", {
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        amount_paid: paid,
      });
      alert(response.data.message || "Transaksi berhasil!");
      setAmountPaid("");
      clearCart();
    } catch (error) {
      const responseData = error.response?.data;
      const validationErrors = responseData?.error;

      if (validationErrors) {
        const messages = Object.values(validationErrors).flat();
        alert(messages.join("\n"));
      } else {
        alert(responseData?.message || "Checkout gagal.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Keranjang</h2>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} item
        </span>
      </div>

      {/* Daftar produk */}
      <div className="flex flex-col gap-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 px-4 py-10 text-center">
            <p className="font-medium text-slate-500">Keranjang masih kosong</p>
            <p className="mt-1 text-sm text-slate-400">
              Tambahkan produk untuk memulai transaksi.
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="border-b border-slate-100 pb-4 last:border-b-0"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="break-words font-semibold text-slate-800">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Rp {formatRupiah(item.price)} / item
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteProductFromCart(item)}
                  className="shrink-0 rounded-lg px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
                  aria-label={`Hapus ${item.name} dari keranjang`}
                >
                  Hapus
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100"
                    aria-label={`Kurangi ${item.name}`}
                  >
                    −
                  </button>

                  <span className="min-w-5 text-center font-semibold text-slate-800">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100"
                    aria-label={`Tambah ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <span className="text-sm font-bold text-slate-800">
                  Rp {formatRupiah(Number(item.price) * item.quantity)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pembayaran */}
      <div className="mt-5 border-t border-slate-200 pt-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="font-medium text-slate-600">Total pembayaran</span>

          <span className="text-xl font-bold text-slate-900">
            Rp {formatRupiah(total)}
          </span>
        </div>

        <label
          htmlFor="amountPaid"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Uang pembayaran
        </label>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
            Rp
          </span>

          <input
            id="amountPaid"
            type="number"
            min="0"
            step="1"
            value={amountPaid}
            onChange={(event) => setAmountPaid(event.target.value)}
            placeholder="Masukkan nominal"
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-3">
          <span className="text-sm text-slate-600">Kembalian</span>

          <span
            className={`font-bold ${
              amountPaid !== "" && paid < total
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            Rp {formatRupiah(Math.max(0, change))}
          </span>
        </div>

        {amountPaid !== "" && paid < total && cart.length > 0 && (
          <p className="mt-2 text-sm text-red-600">
            Uang pembayaran belum mencukupi.
          </p>
        )}

        <button
          type="button"
          onClick={handlePayment}
          disabled={
            isSubmitting ||
            cart.length === 0 ||
            amountPaid === "" ||
            paid < total
          }
          className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
        </button>
      </div>
    </div>
  );
}

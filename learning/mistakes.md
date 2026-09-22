# Mistakes

Record meaningful bugs or recurring misconceptions. Preserve the original reasoning.

## YYYY-MM-DD: Short title

- **Problem:**
- **Mistake:**
- **Original mental model:**
- **Correct mental model:**
- **Category:**
- **Prevention:**
- **Follow-up exercise:**

## 2026-09-22: Lupa keputusan sendiri saat menulis ulang desain

- **Problem:** Menulis ulang struktur `order_items`/`orders` tiga kali, setiap kali menjatuhkan keputusan yang baru saja disepakati (price snapshot → "join saja"; lalu malah menaruh `product_price` di `orders`).
- **Mistake:** Menjawab dari naskah baru tiap putaran, bukan mengecek keputusan sebelumnya.
- **Original mental model:** Desain ditulis ulang = mulai dari kosong; keputusan lama masih "nyangkut" sendiri.
- **Correct mental model:** Setiap iterasi desain wajib dicek ulang terhadap daftar keputusan final (matriks role, out-of-scope, keputusan snapshot). Kontradiksi = sinyal berhenti, bukan hal biasa.
- **Category:** Konsistensi desain / tidak menjaga constraint sendiri.
- **Prevention:** Simpan daftar keputusan final (decision log) dan baca sebelum menulis versi berikutnya; uji desain dengan contoh konkret (mis. struk 2 produk) bukan abstraksi.
- **Follow-up exercise:** Gambar ulang ERD dari nol besok tanpa melihat catatan, lalu bandingkan — kolom mana yang hilang lagi.

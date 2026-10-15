import { useEffect, useState } from "react";
import { api } from "./lib/api";
import CashierHeader from "./CashierHeader";
import CashierCart from "./CashierCart";
import CashierListProduct from "./CashierListProduct";

export default function CashierDashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get("/products");
        setProducts(response.data.dataProducts.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (product) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const deleteProductFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header Halaman */}
      <CashierHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Daftar produk di kiri */}
        <div className="lg:col-span-2">
          <CashierListProduct
            products={products}
            cart={cart}
            addToCart={addToCart}
            decreaseQuantity={decreaseQuantity}
          />
        </div>
        <div className="lg:col-span-1">
          <CashierCart
            cart={cart}
            addToCart={addToCart}
            decreaseQuantity={decreaseQuantity}
            deleteProductFromCart={deleteProductFromCart}
            clearCart={clearCart}
          />
        </div>
      </div>
    </div>
  );
}

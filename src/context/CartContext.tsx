"use client";

import Image from "next/image";
import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  src: string;
  category: string;
  tag?: string;
  bg?: string;
  text?: string;
};

export type CartItem = {
  product: CartProduct;
  quantity: number;
};

type CartContextValue = {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: CartProduct, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems],
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((value) => !value);

  const addItem = (product: CartProduct, quantity: number) => {
    setCartItems((current) => {
      const existingIndex = current.findIndex((item) => item.product.id === product.id);
      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...current, { product, quantity }];
    });
    openCart();
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((current) => current.filter((item) => item.product.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        isOpen,
        toggleCart,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export function CartDrawer() {
  const { cartItems, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCart();

  const checkoutMessage = cartItems
    .map((item) => `${item.product.name} x${item.quantity} = ₹${item.product.price * item.quantity}`)
    .join("%0A");

  const paymentOptions = ["UPI", "Visa", "Mastercard", "RuPay", "NetBanking"];

  const handleCheckout = () => {
    const message = `Hello Gems Juice,%0AI want to order:%0A${checkoutMessage}%0A%0ACustomer Name:%0APhone:%0AAddress:%0A`;
    if (typeof window !== "undefined") {
      window.open(`https://wa.me/6383308836?text=${message}`, "_blank");
    }
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 sm:w-105 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Your Cart</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Order summary</h2>
        </div>
        <button
          type="button"
          onClick={closeCart}
          className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
          aria-label="Close cart"
        >
          <HiOutlineXMark size={24} />
        </button>
      </div>

      <div className="h-[calc(100vh-220px)] overflow-y-auto px-6 py-5">
        {cartItems.length === 0 ? (
          <div className="py-16 text-center text-slate-600">
            No items in your cart yet.
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.product.id} className="mb-5 rounded-3xl border border-slate-200 p-4">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-3xl bg-slate-100">
                  <Image src={item.product.src} alt={item.product.name} width={80} height={80} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{item.product.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">₹{item.product.price} each</p>
                  <div className="mt-4 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
                      aria-label="Decrease quantity"
                    >
                      <AiOutlineMinus size={16} />
                    </button>
                    <span className="min-w-8 text-center font-semibold text-slate-900">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
                      aria-label="Increase quantity"
                    >
                      <AiOutlinePlus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal: ₹{item.product.price * item.quantity}</span>
                <button
                  type="button"
                  onClick={() => removeItem(item.product.id)}
                  className="font-semibold text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-slate-200 px-6 py-5">
        <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-slate-500">
          <span>Total</span>
          <span className="text-lg font-bold text-slate-900">₹{totalPrice}</span>
        </div>

        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-700">
            Express Drive-Thru
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Driving on the NH? Place your order 10–15 minutes before you arrive, and we’ll have your hot snacks and icy juices waiting at your car window.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {paymentOptions.map((option) => (
            <div key={option} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
              {option}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
          className="mt-5 w-full rounded-full bg-[#1f4027] px-5 py-4 text-sm font-bold uppercase text-white transition hover:bg-[#16321d] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Checkout on WhatsApp
        </button>
      </div>
    </div>
  );
}

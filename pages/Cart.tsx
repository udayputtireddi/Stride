
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../App.tsx';

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-black mb-4">YOUR BAG IS EMPTY</h2>
        <p className="text-gray-500 mb-8">Once you add something to your bag, it will appear here. Ready to get started?</p>
        <Link to="/shop" className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold uppercase">
          Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black uppercase mb-12">Your Bag ({cart.length})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex gap-6 border-b border-gray-100 pb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                    <p className="text-gray-500 text-sm mt-1">Size: {item.selectedSize}</p>
                  </div>
                  <p className="font-bold text-lg">${item.price * item.quantity}</p>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center gap-4">
                     {/* Quantity could be a selector here */}
                     <span className="text-sm text-gray-500">Qty {item.quantity}</span>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-6">Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated Delivery & Handling</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated Tax</span>
                <span className="font-medium">—</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-full font-bold uppercase hover:bg-gray-800 transition-colors flex justify-center items-center gap-2">
              Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import SwalConfig from '../utils/swalConfig';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import dashboardService from '../services/dashboardService';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleClearCart = () => {
    SwalConfig.confirm(
      'Clear All Items?',
      'This will remove all items from your cart. This action cannot be undone.',
      {
        confirmButtonText: 'Yes, Clear Cart',
        cancelButtonText: 'Cancel'
      }
    ).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        SwalConfig.success('Cart Cleared! 🗑️', 'All items have been removed from your cart.');
      }
    });
  };

  const handleRemoveItem = (item) => {
    SwalConfig.confirm(
      'Remove Item?',
      `Remove "${item.title}" from your cart?`,
      {
        confirmButtonText: 'Yes, Remove',
        cancelButtonText: 'Cancel'
      }
    ).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(item.id);
        SwalConfig.toast('Item Removed! 🗑️', 'success');
      }
    });
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
   
    setTimeout(() => {
      
      const orderTotal = getCartTotal() * 1.18; 
      
     
      const orderData = {
        items: cartItems,
        subtotal: getCartTotal(),
        tax: getCartTotal() * 0.18,
        total: orderTotal,
        itemCount: cartItems.length
      };
      
     
      const newOrder = dashboardService.addOrder(orderData);
      
     
      Swal.fire({
        title: 'Order Placed Successfully! 🎉',
        html: `
          <div class="text-left space-y-2">
            <div class="flex justify-between">
              <span class="font-medium">Order ID:</span>
              <span class="text-blue-600 font-mono">${newOrder.id}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Total Amount:</span>
              <span class="text-green-600 font-bold">₹${orderTotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Items:</span>
              <span>${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}</span>
            </div>
            <hr class="my-3">
            <div class="text-sm text-gray-600">
              <p>✅ Order confirmed</p>
              <p>📦 Processing will begin shortly</p>
              <p>🚚 Free shipping included</p>
            </div>
          </div>
        `,
        icon: 'success',
        confirmButtonText: '🛍️ Continue Shopping',
        confirmButtonColor: '#3B82F6',
        showCancelButton: true,
        cancelButtonText: '📋 View Orders',
        cancelButtonColor: '#6B7280',
        allowOutsideClick: false,
        customClass: {
          popup: 'rounded-xl',
          title: 'text-2xl font-bold text-gray-900',
          htmlContainer: 'text-left'
        }
      }).then((result) => {
        if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
          // Navigate to orders page
          window.location.href = '/orders';
        } else {
          // Navigate to products page
          window.location.href = '/products';
        }
      });
      
      
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <Layout title="Shopping Cart" subtitle="Review your selected items">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-gray-400 mb-6">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Cart is Empty</h3>
          <p className="text-gray-600 mb-6">Add some products to your cart to get started.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Shopping Cart" subtitle={`${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-4">
               
                <div className="relative w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                </div>

               
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-600">
                      ₹{(item.price * 83).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{(item.price * 83 * 1.2).toFixed(2)}
                    </span>
                  </div>
                </div>

            
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>

              
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{(item.price * 83 * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="text-red-500 hover:text-red-700 text-sm transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

         
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Clear All Items
            </button>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

      
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹{(getCartTotal() * 0.18).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{(getCartTotal() * 1.18).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                isCheckingOut
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
              } text-white`}
            >
              {isCheckingOut ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                '🚀 Proceed to Checkout'
              )}
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Secure checkout powered by SSL encryption
              </p>
            </div>

           
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">📦 Order Information</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Free shipping on all orders</li>
                <li>• 7-15 days delivery time</li>
                <li>• 30 days return policy</li>
                <li>• 24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import SwalConfig from '../utils/swalConfig';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
  
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
      
      
      SwalConfig.toast(`Added to Cart! 🛒`, 'success');
    }, 300);
  };
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Discount Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            20% OFF
          </span>
        </div>
       
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
            <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200">
            {product.category}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-green-600">
                ₹{(product.price * 83).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 line-through">
                ₹{(product.price * 83 * 1.2).toFixed(2)}
              </span>
              <span className="text-xs text-green-600 font-semibold">
                Save ₹{((product.price * 83 * 1.2) - (product.price * 83)).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full border border-yellow-200">
            <span className="text-yellow-500 text-sm">⭐</span>
            <span className="text-sm font-semibold text-gray-700 ml-1">
              {product.rating?.rate || 'N/A'}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating?.count || 0})
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold shadow-sm transition-all duration-200 ${
              isAdding 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 hover:shadow-md'
            } text-white`}
          >
            {isAdding ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                🛒 Add to Cart
              </div>
            )}
          </button>
          <button className="px-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

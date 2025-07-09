import React from 'react';
import Layout from '../components/Layout';

const Orders = () => {
  return (
    <Layout title="Orders" subtitle="Manage your order history">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Order History</h3>
        <p className="text-gray-600">Your order history will appear here once you start placing orders.</p>
      </div>
    </Layout>
  );
};

export default Orders;

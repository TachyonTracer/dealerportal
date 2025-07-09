
import { useState, useEffect, useCallback } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);


      const promises = [];
      for (let i = 1; i <= 5; i++) {
        promises.push(fetch("https://fakestoreapi.com/products"));
      }

      const responses = await Promise.all(promises);
      const allData = [];

      for (const response of responses) {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        allData.push(...data);
      }

     
      const productsWithUniqueIds = allData.map((product, index) => ({
        ...product,
        uniqueId: `${product.id}-${Math.floor(index / 20)}`,
      }));

      setProducts(productsWithUniqueIds);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

 
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });


  const getProductById = useCallback((id) => {
    return products.find(product => product.uniqueId === id || product.id === id);
  }, [products]);

  const getProductsByCategory = useCallback((category) => {
    if (category === "all") return products;
    return products.filter(product => product.category === category);
  }, [products]);

 
  const searchProducts = useCallback((term) => {
    setSearchTerm(term);
  }, []);

 
  const filterByCategory = useCallback((category) => {
    setCategoryFilter(category);
  }, []);

  
  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setCategoryFilter("all");
  }, []);

  
  const getProductsStats = useCallback(() => {
    return {
      total: products.length,
      filtered: filteredProducts.length,
      categories: categories.length,
      byCategory: categories.reduce((acc, category) => {
        acc[category] = products.filter(p => p.category === category).length;
        return acc;
      }, {})
    };
  }, [products, filteredProducts, categories]);

 
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return {
   
    products,
    categories,
    filteredProducts,
    
    
    loading,
    error,
    searchTerm,
    categoryFilter,
    
    
    fetchProducts,
    fetchCategories,
    searchProducts,
    filterByCategory,
    clearFilters,
    
   
    getProductById,
    getProductsByCategory,
    getProductsStats,
    

    setSearchTerm,
    setCategoryFilter
  };
};

export default useProducts;

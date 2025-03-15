import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faTrash } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (categoryName) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/delete`, {
        data: { category_name: categoryName }
      });
      setCategories(categories.filter(cat => cat.category_name !== categoryName));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Filter and sort categories
  const filteredCategories = categories
    .filter(cat => 
      cat.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return new Date(a.created_at) - new Date(b.created_at);
    });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Categories Management</h1>
          <Link
            to="/categories/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Create New Category
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-3 text-gray-400"
            />
          </div>
          
          <div className="relative">
            <select
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <FontAwesomeIcon 
              icon={faFilter} 
              className="absolute left-3 top-3 text-gray-400"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map(category => (
            <div 
              key={category.category_name}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {category.category_name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Created: {new Date(category.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(category.category_name)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {category.course_count} Courses
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No categories found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
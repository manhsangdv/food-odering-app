import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/AddInitialMenuItemsPage.css';

const AddInitialMenuItemsPage = ({ user, API_URL }) => {
  const navigate = useNavigate();

  const apiBase = API_URL || import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:3000/api';

  
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'MAIN', // Default category
    image: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!user || !user.restaurantId) {
      setError('You must have a restaurant to add menu items.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiBase}/restaurants/${user.restaurantId}/menu`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify({
    ...formData,
    price: parseFloat(formData.price)
  })
});


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add menu item');
      }

      const newItem = await response.json();
      setMenuItems(prev => [...prev, newItem]);
      
      // Clear the form for the next item
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'MAIN',
        image: ''
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    // Navigate to the main restaurant dashboard
    navigate('/restaurant/dashboard');
  };

  return (
    <div className="add-menu-items-container">
      <h2>Bước 2: Thêm món ăn vào thực đơn</h2>
      <p>Thêm một vài món ăn để khách hàng có thể bắt đầu đặt hàng.</p>

      <div className="content-wrapper">
        <form onSubmit={handleAddItem} className="add-item-form">
          <h3>Thêm một món ăn mới</h3>
          <div className="form-group">
            <label htmlFor="name">Tên món ăn</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Giá (VNĐ)</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Loại món</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
              <option value="APPETIZER">Khai vị</option>
              <option value="MAIN">Món chính</option>
              <option value="DESSERT">Tráng miệng</option>
              <option value="BEVERAGE">Đồ uống</option>
              <option value="COMBO">Combo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">URL Hình ảnh</label>
            <input type="url" id="image" name="image" value={formData.image} onChange={handleChange} />
          </div>

          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Đang thêm...' : 'Thêm món ăn'}
          </button>
        </form>

        <div className="items-preview">
          <h3>Món ăn đã thêm ({menuItems.length})</h3>
          {menuItems.length === 0 ? (
            <p>Chưa có món ăn nào được thêm.</p>
          ) : (
            <ul className="menu-items-list">
              {menuItems.map(item => (
                <li key={item._id}>{item.name} - {item.price.toLocaleString('vi-VN')} VNĐ</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {menuItems.length > 0 && (
        <div className="finish-setup">
          <p>Bạn có thể tiếp tục thêm món ăn hoặc hoàn tất để đi đến trang quản lý chính.</p>
          <button onClick={handleFinish} className="finish-button">
            Hoàn tất và đến Trang quản lý
          </button>
        </div>
      )}
    </div>
  );
};

export default AddInitialMenuItemsPage;

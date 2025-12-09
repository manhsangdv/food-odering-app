import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/CreateRestaurantPage.css';

const CreateRestaurantPage = ({ user, updateUser, API_URL }) => {
  const navigate = useNavigate();

  // fallback nếu quên truyền
  const apiBase = API_URL || import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:3000/api';

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phoneNumber: '',
    email: '',
    address: {
      street: '',
      ward: '',
      district: '',
      city: ''
    },
    location: {
      lat: 0,
      lng: 0
    },
    logo: '',
    banner: ''
    // Skipping operatingHours for simplicity for now
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user) {
    setError('You must be logged in to create a restaurant.');
    return;
  }
  setLoading(true);
  setError('');

  try {
    // Step 1: Tạo nhà hàng qua API Gateway
    const restaurantResponse = await fetch(`${apiBase}/restaurants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        ...formData,
        ownerId: user._id || user.id,
        location: {
          lat: parseFloat((formData.location.lat || formData.location.lat === 0) ? formData.location.lat : 0),
          lng: parseFloat((formData.location.lng || formData.location.lng === 0) ? formData.location.lng : 0)
        }
      })
    });

    if (!restaurantResponse.ok) {
      const errorData = await restaurantResponse.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create restaurant');
    }

    const newRestaurant = await restaurantResponse.json();

    // Step 2: Cập nhật profile user với restaurantId mới qua Gateway
    const userUpdateResponse = await fetch(`${apiBase}/auth/profile/${user._id || user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        restaurantId: newRestaurant._id
      })
    });

    if (!userUpdateResponse.ok) {
      throw new Error('Failed to associate restaurant with user');
    }

    const updatedUser = await userUpdateResponse.json();

    // Step 3: Update context
    updateUser(updatedUser);

    // Step 4: Chuyển sang bước 2 – thêm món ăn ban đầu
    navigate('/restaurant/menu/add');

  } catch (err) {
    console.error(err);
    setError(err.message || 'Có lỗi xảy ra');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="create-restaurant-container">
      <h2>Tạo nhà hàng mới của bạn</h2>
      <p>Chào mừng! Hãy bắt đầu bằng cách cung cấp thông tin chi tiết về nhà hàng của bạn.</p>
      <form onSubmit={handleSubmit} className="create-restaurant-form">
        <div className="form-group">
          <label htmlFor="name">Tên nhà hàng</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Mô tả</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Số điện thoại</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <fieldset>
          <legend>Địa chỉ</legend>
          <div className="form-group">
            <label htmlFor="street">Đường</label>
            <input type="text" id="street" name="address.street" value={formData.address.street} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="ward">Phường/Xã</label>
            <input type="text" id="ward" name="address.ward" value={formData.address.ward} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="district">Quận/Huyện</label>
            <input type="text" id="district" name="address.district" value={formData.address.district} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="city">Tỉnh/Thành phố</label>
            <input type="text" id="city" name="address.city" value={formData.address.city} onChange={handleChange} />
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Vị trí (Tọa độ)</legend>
          <div className="form-group">
            <label htmlFor="lat">Vĩ độ (Lat)</label>
            <input type="number" step="any" id="lat" name="location.lat" value={formData.location.lat} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="lng">Kinh độ (Lng)</label>
            <input type="number" step="any" id="lng" name="location.lng" value={formData.location.lng} onChange={handleChange} required />
          </div>
        </fieldset>

        <fieldset>
          <legend>Hình ảnh</legend>
          <div className="form-group">
            <label htmlFor="logo">URL Logo</label>
            <input type="url" id="logo" name="logo" value={formData.logo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="banner">URL Banner</label>
            <input type="url" id="banner" name="banner" value={formData.banner} onChange={handleChange} />
          </div>
        </fieldset>

        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Đang tạo...' : 'Tạo nhà hàng và tiếp tục'}
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurantPage;

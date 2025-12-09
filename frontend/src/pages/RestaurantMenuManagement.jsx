"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/RestaurantMenuManagement.css"

export default function RestaurantMenuManagement({ API_URL, user }) {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  })

  useEffect(() => {
    if (user && user.restaurantId) {
      fetchMenuItems()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchMenuItems = async () => {
    if (!user || !user.restaurantId) return;
    try {
      const response = await axios.get(`${API_URL}/restaurants/${user.restaurantId}/menu`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      setMenuItems(response.data)
    } catch (error) {
      console.error("Tải thực đơn thất bại", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddItem = async (e) => {
    e.preventDefault()
    if (!user || !user.restaurantId) {
      alert("Không thể xác định nhà hàng của bạn.");
      return;
    }
    try {
      await axios.post(`${API_URL}/restaurants/${user.restaurantId}/menu`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      alert("Thêm món thành công!")
      setFormData({ name: "", description: "", price: "", category: "" })
      setShowForm(false)
      fetchMenuItems()
    } catch (error) {
      alert("Thêm món thất bại: " + error.response?.data?.message)
    }
  }

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa món này không?")) return
    try {
      await axios.delete(`${API_URL}/restaurants/menu/${itemId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      alert("Xóa món thành công!")
      fetchMenuItems()
    } catch (error) {
      alert("Xóa món thất bại")
    }
  }

  if (loading) return <div className="loading">Đang tải thực đơn...</div>

  if (!user || !user.restaurantId) {
    return (
      <div className="menu-management">
        <h2>Quản lý thực đơn</h2>
        <p>Bạn chưa tạo nhà hàng. Vui lòng tạo nhà hàng trước khi quản lý thực đơn.</p>
        <button className="btn-add-item" onClick={() => window.location.href = '/restaurant/dashboard'}>Tạo nhà hàng</button>
      </div>
    )
  }

  return (
    <div className="menu-management">
      <h2>Quản lý thực đơn</h2>

      <button className="btn-add-item" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hủy" : "Thêm món mới"}
      </button>

      {showForm && (
        <form className="add-item-form" onSubmit={handleAddItem}>
          <input
            type="text"
            name="name"
            placeholder="Tên món"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <textarea
            name="description"
            placeholder="Mô tả"
            value={formData.description}
            onChange={handleInputChange}
            className="form-textarea"
          />
          <input
            type="number"
            name="price"
            placeholder="Giá"
            value={formData.price}
            onChange={handleInputChange}
            required
            step="1000"
            className="form-input"
          />
          <input
            type="text"
            name="category"
            placeholder="Loại"
            value={formData.category}
            onChange={handleInputChange}
            className="form-input"
          />
          <button type="submit" className="btn-submit">
            Thêm món
          </button>
        </form>
      )}

      <div className="menu-items-list">
        {menuItems.length === 0 ? (
          <p className="no-items">Chưa có món ăn nào trong thực đơn</p>
        ) : (
          menuItems.map((item) => (
            <div key={item._id} className="menu-item-card">
              <div className="item-content">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="category">Loại: {item.category}</p>
                <p className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
              </div>
              <button className="btn-delete" onClick={() => handleDeleteItem(item._id)}>
                Xóa
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/RestaurantDashboard.css"

export default function RestaurantDashboard({ API_URL, user, setUser }) {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0 })
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [creating, setCreating] = useState(false)
  const [restaurant, setRestaurant] = useState(null)
  const [newRest, setNewRest] = useState({ name: '', description: '', phoneNumber: '', email: '', street: '', ward: '', district: '', city: '', lat: '', lng: '' })
  const [menuItems, setMenuItems] = useState([])
  const [newMenu, setNewMenu] = useState({ name: '', description: '', price: '', category: 'MAIN' })

  useEffect(() => {
    // If user has a restaurant, load orders & stats; otherwise show create flow
    if (user && user.restaurantId) {
      fetchOrders()
      fetchStats()
      fetchMenu()
      const interval = setInterval(() => {
        fetchOrders()
        fetchStats()
      }, 5000)
      return () => clearInterval(interval)
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/restaurant`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      setOrders(response.data)
    } catch (error) {
      console.error("Tải đơn hàng thất bại", error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/restaurant/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      setStats(response.data)
    } catch (error) {
      console.error("Tải số liệu thống kê thất bại", error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `${API_URL}/orders/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      fetchOrders()
      fetchStats()
    } catch (error) {
      alert("Cập nhật đơn hàng thất bại: " + error.response?.data?.message)
    }
  }

  const fetchMenu = async (restaurantId = (user && (user.restaurantId || user.restaurant?._id))) => {
    try {
      if (!restaurantId) return setMenuItems([])
      const res = await axios.get(`${API_URL}/restaurants/${restaurantId}/menu`)
      setMenuItems(res.data)
    } catch (err) {
      console.warn('Load menu failed', err?.response?.data || err.message)
      setMenuItems([])
    }
  }

  if (loading) return <div className="loading">Đang tải bảng điều khiển...</div>
  // If the restaurant staff hasn't created a restaurant yet, show the onboarding flow
  if (user && user.userType === 'RESTAURANT_STAFF' && !user.restaurantId) {
    return (
      <div className="dashboard-container">
        <h2>Thiết lập nhà hàng mới</h2>
        <p>Xin chào {user.firstName || user.name || user.email}, hãy tạo nhà hàng hoặc quán của bạn.</p>

        <div className="create-restaurant-form">
          <label>Tên nhà hàng</label>
          <input value={newRest.name} onChange={(e) => setNewRest({...newRest, name: e.target.value})} />

          <label>Mô tả</label>
          <textarea value={newRest.description} onChange={(e) => setNewRest({...newRest, description: e.target.value})} />

          <label>Điện thoại</label>
          <input value={newRest.phoneNumber} onChange={(e) => setNewRest({...newRest, phoneNumber: e.target.value})} />

          <label>Email</label>
          <input value={newRest.email} onChange={(e) => setNewRest({...newRest, email: e.target.value})} />

          <label>Địa chỉ - Street</label>
          <input value={newRest.street} onChange={(e) => setNewRest({...newRest, street: e.target.value})} />
          <label>Ward</label>
          <input value={newRest.ward} onChange={(e) => setNewRest({...newRest, ward: e.target.value})} />
          <label>District</label>
          <input value={newRest.district} onChange={(e) => setNewRest({...newRest, district: e.target.value})} />
          <label>City</label>
          <input value={newRest.city} onChange={(e) => setNewRest({...newRest, city: e.target.value})} />

          <label>Latitude</label>
          <input value={newRest.lat} onChange={(e) => setNewRest({...newRest, lat: e.target.value})} />
          <label>Longitude</label>
          <input value={newRest.lng} onChange={(e) => setNewRest({...newRest, lng: e.target.value})} />

          <div style={{marginTop: '12px'}}>
            <button onClick={async () => {
              setCreating(true)
              try {
                const payload = {
                  ownerId: user._id || user.id,
                  name: newRest.name,
                  description: newRest.description,
                  phoneNumber: newRest.phoneNumber,
                  email: newRest.email,
                  address: { street: newRest.street, ward: newRest.ward, district: newRest.district, city: newRest.city },
                  location: { lat: parseFloat(newRest.lat), lng: parseFloat(newRest.lng) },
                  autoVerify: true
                }
                const res = await axios.post(`${API_URL}/restaurants`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                const created = res.data
                setRestaurant(created)

                // Update user profile to attach restaurantId
                const userId = user._id || user.id
                try {
                  await axios.patch(`${API_URL}/auth/profile/${userId}`, { restaurantId: created._id }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                  // update local app-level user
                  setUser({ ...user, restaurantId: created._id })
                } catch (err) {
                  console.warn('Could not update user profile with restaurantId', err?.response?.data || err.message)
                }

                // Load menu after creation
                fetchMenu(created._id)
              } catch (err) {
                alert('Tạo nhà hàng thất bại: ' + (err.response?.data?.message || err.message))
              } finally {
                setCreating(false)
              }
            }}>{creating ? 'Đang tạo...' : 'Tạo Nhà Hàng'}</button>
          </div>
        </div>

        {/* After creating restaurant show immediate menu-creation UI */}
        {restaurant && (
          <div style={{marginTop: 24}}>
            <h3>Tạo món cho thực đơn</h3>
            <label>Tên món</label>
            <input value={newMenu.name} onChange={(e) => setNewMenu({...newMenu, name: e.target.value})} />
            <label>Mô tả</label>
            <input value={newMenu.description} onChange={(e) => setNewMenu({...newMenu, description: e.target.value})} />
            <label>Giá</label>
            <input value={newMenu.price} onChange={(e) => setNewMenu({...newMenu, price: e.target.value})} />
            <label>Danh mục</label>
            <select value={newMenu.category} onChange={(e) => setNewMenu({...newMenu, category: e.target.value})}>
              <option value="MAIN">Main</option>
              <option value="BEVERAGE">Drink</option>
              <option value="DESSERT">Dessert</option>
            </select>
            <div style={{marginTop:8}}>
              <button onClick={async () => {
                try {
                  const payload = { name: newMenu.name, description: newMenu.description, price: parseFloat(newMenu.price || 0), category: newMenu.category }
                  await axios.post(`${API_URL}/restaurants/${restaurant._id}/menu`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                  setNewMenu({ name: '', description: '', price: '', category: 'MAIN' })
                  fetchMenu(restaurant._id)
                } catch (err) {
                  alert('Tạo món thất bại: ' + (err.response?.data?.message || err.message))
                }
              }}>Thêm món</button>
            </div>

            <div style={{marginTop:12}}>
              <h4>Món hiện có</h4>
              {menuItems.length === 0 ? <p>Chưa có món nào</p> : (
                <ul>
                  {menuItems.map(m => <li key={m._id}>{m.name} - {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(m.price)}</li>)}
                </ul>
              )}
            </div>

            <div style={{marginTop:12}}>
              <button onClick={() => window.location.reload()}>Hoàn tất và chuyển đến trang quản lý</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <h2>Bảng điều khiển nhà hàng</h2>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalOrders}</h3>
          <p>Tổng số đơn hàng</p>
        </div>
        <div className="stat-card">
          <h3>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue || 0)}</h3>
          <p>Tổng doanh thu</p>
        </div>
        <div className="stat-card pending">
          <h3>{stats.pendingOrders}</h3>
          <p>Đơn hàng chờ xử lý</p>
        </div>
      </div>

      {/* Orders Management */}
      <div className="orders-section">
        <h3>Quản lý đơn hàng</h3>
        {orders.length === 0 ? (
          <p className="no-orders">Chưa có đơn hàng nào</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`order-card ${selectedOrder?._id === order._id ? "expanded" : ""}`}
                onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
              >
                <div className="order-header">
                  <div>
                    <h3>Đơn hàng #{order._id.slice(-8)}</h3>
                    <p className="order-time">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <span className={`status ${order.status?.toLowerCase()}`}>{order.status}</span>
                </div>

                <div className="order-info">
                  <p>
                    <strong>Tổng cộng:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total || 0)}
                  </p>
                  <p>
                    <strong>Mặt hàng:</strong> {order.items?.length || 0}
                  </p>
                </div>

                {selectedOrder?._id === order._id && (
                  <div className="order-details">
                    <h4>Mặt hàng:</h4>
                    <ul>
                      {order.items?.map((item, idx) => (
                        <li key={idx}>
                          {item.name} x {item.quantity} - {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                          {item.notes && <p className="notes">Ghi chú: {item.notes}</p>}
                        </li>
                      ))}
                    </ul>

                    <div className="delivery-info">
                      <h4>Địa chỉ giao hàng:</h4>
                      <p>
                        {order.deliveryAddress?.street}, {order.deliveryAddress?.ward},{" "}
                        {order.deliveryAddress?.district}, {order.deliveryAddress?.city}
                      </p>
                    </div>

                    <div className="action-buttons">
                      {order.status === "CREATED" && (
                        <button
                          className="btn-action confirmed"
                          onClick={() => updateOrderStatus(order._id, "CONFIRMED")}
                        >
                          Xác nhận đơn hàng
                        </button>
                      )}
                      {order.status === "CONFIRMED" && (
                        <button
                          className="btn-action preparing"
                          onClick={() => updateOrderStatus(order._id, "PREPARING")}
                        >
                          Bắt đầu chuẩn bị
                        </button>
                      )}
                      {order.status === "PREPARING" && (
                        <button className="btn-action ready" onClick={() => updateOrderStatus(order._id, "READY") }>
                          Đánh dấu là sẵn sàng
                        </button>
                      )}
                      {order.status === "READY" && (
                        <button
                          className="btn-action completed"
                          onClick={() => updateOrderStatus(order._d, "COMPLETED")}
                        >
                          Hoàn thành đơn hàng
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// helper removed; fetchMenu is implemented inside component

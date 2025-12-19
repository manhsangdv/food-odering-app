"use client"

import { useState } from "react"
import axios from "axios" // Import axios
import { useNavigate } from "react-router-dom"
import "../styles/HomePage.css"

// Nhận prop onLoginSuccess từ App.jsx
export default function HomePage({ onLoginSuccess, user, API_URL }) {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState("CUSTOMER")
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response;
      if (isLogin) {
        // Gọi API Login
        response = await axios.post(`${API_URL}/auth/login`, {
          email: formData.email,
          password: formData.password
        });
      } else {
        // Gọi API Register
        response = await axios.post(`${API_URL}/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: userType
        });
      }

      // Đăng nhập/Đăng ký thành công -> Gọi App chỉ với token, App sẽ fetch profile canonical
      if (response.data.token) {
        onLoginSuccess(response.data.token);
      }

    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Action failed"));
    }
  }

  // Nếu đã login rồi mà quay lại trang chủ -> Hiển thị nút điều hướng
  if (user) {
    return (
      <div className="home-container welcome">
        <h2>Chào mừng trở lại, {user.name}!</h2>
        <p>Bạn đã đăng nhập với tư cách {user.userType}</p>
        <button
          className="btn-primary"
          onClick={() => {
             if(user.userType === "ADMIN") navigate("/admin/dashboard");
             else if(user.userType === "RESTAURANT_STAFF") navigate("/restaurant/dashboard");
             else navigate("/foods");
          }}
        >
          Đi đến Bảng điều khiển
        </button>
      </div>
    )
  }

  return (
    <div className="home-container">
      <div className="hero">
        <h2>Chào mừng đến với ứng dụng đặt món ăn</h2>
        <p>Đặt món ăn ngon từ nhà hàng yêu thích của bạn</p>
      </div>

      <div className="auth-container">
        <div className="auth-form">
          <h3>{isLogin ? "Đăng nhập" : "Đăng ký"}</h3>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <div className="user-type-selector">
                  <label>Chọn loại tài khoản:</label>
                  <div className="type-options">
                    <label className="type-option">
                      <input
                        type="radio"
                        value="CUSTOMER"
                        checked={userType === "CUSTOMER"}
                        onChange={(e) => setUserType(e.target.value)}
                      />
                      <span>Khách hàng</span>
                    </label>
                    <label className="type-option">
                      <input
                        type="radio"
                        value="RESTAURANT_STAFF"
                        checked={userType === "RESTAURANT_STAFF"}
                        onChange={(e) => setUserType(e.target.value)}
                      />
                      <span>Nhân viên nhà hàng</span>
                    </label>
                    <label className="type-option">
                      <input
                        type="radio"
                        value="DRIVER"
                        checked={userType === "DRIVER"}
                        onChange={(e) => setUserType(e.target.value)}
                      />
                      <span>Tài xế</span>
                    </label>
                  </div>
                </div>
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn-primary">
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </button>
          </form>
          <p className="toggle-auth">
            {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setFormData({ name: "", email: "", password: "" })
              }}
              className="toggle-link"
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </button>
          </p>
        </div>
      </div>
      
      {/* (Giữ nguyên phần Features bên dưới của bạn...) */}
      <div className="features">
         {/* ... code cũ của bạn ... */}
      </div>
    </div>
  )
}
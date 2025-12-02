"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/RestaurantsPage.css"

export default function RestaurantsPage({ cart, addToCart, API_URL }) {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${API_URL}/restaurants`)
      setRestaurants(response.data)
    } catch (error) {
      console.error("Failed to load restaurants", error)
      alert("Failed to load restaurants")
    } finally {
      setLoading(false)
    }
  }

  // ✅ Hàm helper để hiển thị địa chỉ an toàn (Sửa lỗi Objects are not valid)
  const formatAddress = (address) => {
    if (!address) return "No address";
    if (typeof address === 'string') return address;
    // Nếu là object, ghép các trường lại
    return `${address.street || ''}, ${address.ward || ''}, ${address.district || ''}, ${address.city || ''}`.replace(/^, | , | ,/g, '');
  }

  const filteredRestaurants = restaurants.filter((r) => r.name.toLowerCase().includes(searchTerm.toLowerCase()))

  if (loading) return <div className="loading">Loading restaurants...</div>

  return (
    <div className="restaurants-container">
      <div className="restaurants-header">
        <h2>Browse Restaurants</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="restaurants-grid">
        {filteredRestaurants.length === 0 ? (
          <p className="no-results">No restaurants found</p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <div key={restaurant._id} className="restaurant-card">
              <div className="restaurant-image">
                <img
                  src={`/placeholder.svg?height=200&width=300&query=restaurant+${restaurant.name}`}
                  alt={restaurant.name}
                />
                <span className="rating">⭐ 4.5</span>
              </div>
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p className="cuisine">{restaurant.cuisineType || "Various"}</p>
                
                {/* ✅ SỬA: Dùng hàm formatAddress */}
                <p className="address">{formatAddress(restaurant.address)}</p> 
                
                <div className="delivery-info">
                  <span>📍 {restaurant.deliveryTime || "30-45"} mins</span>
                  <span>💲 ${restaurant.minOrder || "0"} min</span>
                </div>
                <button className="btn-view-menu" onClick={() => setSelectedRestaurant(restaurant)}>
                  View Menu
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedRestaurant && (
        <RestaurantMenu
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          addToCart={addToCart}
          API_URL={API_URL}
          // Truyền hàm formatAddress xuống để dùng tiếp
          formatAddress={formatAddress} 
        />
      )}
    </div>
  )
}

function RestaurantMenu({ restaurant, onClose, addToCart, API_URL, formatAddress }) {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenu()
  }, [restaurant._id])

  const fetchMenu = async () => {
    try {
      // ✅ SỬA: Đường dẫn đúng là /restaurants/{id}/menu
      const response = await axios.get(`${API_URL}/restaurants/${restaurant._id}/menu`)
      setMenuItems(response.data)
    } catch (error) {
      console.error("Failed to load menu", error)
    } finally {
      setLoading(false)
    }
  }

  // Fallback nếu không truyền prop (phòng hờ)
  const safeAddress = formatAddress ? formatAddress(restaurant.address) : (typeof restaurant.address === 'string' ? restaurant.address : "Address details unavailable");

  if (loading)
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>Loading menu...</p>
        </div>
      </div>
    )

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="menu-header">
          <h2>{restaurant.name}</h2>
          
          {/* ✅ SỬA: Hiển thị địa chỉ đã format */}
          <p>{safeAddress}</p>
          
        </div>

        <div className="menu-items">
          {menuItems.length === 0 ? (
            <p className="no-items">No items available</p>
          ) : (
            menuItems.map((item) => (
              <div key={item._id} className="menu-item">
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="description">{item.description}</p>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
                <button className="btn-add" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

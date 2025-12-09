import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CartPage.css';

export default function CartPage({ cart, removeFromCart, clearCart, API_URL, navigate, user }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('STRIPE');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    ward: '',
    district: '',
    city: ''
  });
  const [recipientName, setRecipientName] = useState(user?.name || JSON.parse(localStorage.getItem('user') || '{}')?.name || '');
  const [recipientPhone, setRecipientPhone] = useState(user?.phone || JSON.parse(localStorage.getItem('user') || '{}')?.phone || '');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 500000 ? 0 : 30000;
    return {
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee
    };
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateDeliveryAddress = () => {
    if (!deliveryAddress.street || !deliveryAddress.ward || !deliveryAddress.district || !deliveryAddress.city) {
      setError('Vui lòng điền đầy đủ địa chỉ giao hàng');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setError('Giỏ hàng trống');
      return;
    }

    if (!validateDeliveryAddress()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { total } = calculateTotal();
      
      // Get customer ID from user prop or localStorage
      const customerId = user?.id || user?._id || JSON.parse(localStorage.getItem('user') || '{}')?.id;
      
      if (!customerId) {
        setError('Vui lòng đăng nhập để đặt hàng');
        setLoading(false);
        return;
      }

      // Get restaurantId from first cart item (all items should be from same restaurant)
      const restaurantId = cart[0]?.restaurantId;
      
      if (!restaurantId) {
        setError('Không thể xác định nhà hàng');
        setLoading(false);
        return;
      }
      
      const orderData = {
        customerId,
        restaurantId,
        items: cart.map(item => ({
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        paymentMethod,
        deliveryAddress,
        recipientName,
        recipientPhone,
        totalAmount: total
      };

      const orderResponse = await axios.post(`${API_URL}/orders`, orderData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      const order = orderResponse.data;
      setCurrentOrder(order);

      if (paymentMethod === 'STRIPE' || paymentMethod === 'ONLINE') {
        setShowPaymentForm(true);
      } else {
        // COD - order is created, redirect to orders page
        clearCart();
        navigate('/orders');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi đặt hàng');
      console.error('Order creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    setShowPaymentForm(false);
    navigate('/orders');
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
  };

  const { subtotal, deliveryFee, total } = calculateTotal();

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1>Giỏ hàng của bạn</h1>
        
        {error && <div className="error-message">{error}</div>}

        {cart.length === 0 ? (
          <p>Giỏ hàng trống</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Giá: {item.price.toLocaleString('vi-VN')} ₫</p>
                    <p>Số lượng: {item.quantity}</p>
                  </div>
                  <div className="item-actions">
                    <p className="item-total">
                      {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                    </p>
                    <button 
                      onClick={() => removeFromCart(item)}
                      className="remove-btn"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Tổng tiền hàng:</span>
                <span>{subtotal.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="summary-row">
                <span>Phí giao hàng:</span>
                <span>{deliveryFee.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="summary-row total">
                <span>Tổng cộng:</span>
                <span>{total.toLocaleString('vi-VN')} ₫</span>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Phương thức thanh toán</h2>
              <div className="payment-method">
                <label>
                  <input
                    type="radio"
                    value="STRIPE"
                    checked={paymentMethod === 'STRIPE'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Thẻ tín dụng (Stripe)
                </label>
                <label>
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Thanh toán khi nhận hàng
                </label>
              </div>

              <div className="delivery-address">
                  <h3>Địa chỉ giao hàng</h3>
                  <div className="form-group">
                    <label>Tên người nhận:</label>
                    <input
                      type="text"
                      name="recipientName"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Tên người nhận"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại người nhận:</label>
                    <input
                      type="text"
                      name="recipientPhone"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      placeholder="Số điện thoại"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Đường/Phố:</label>
                    <input
                      type="text"
                      name="street"
                      value={deliveryAddress.street}
                      onChange={handleAddressChange}
                      placeholder="Số nhà, tên đường"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phường/Xã:</label>
                    <input
                      type="text"
                      name="ward"
                      value={deliveryAddress.ward}
                      onChange={handleAddressChange}
                      placeholder="Phường/Xã"
                      className="form-input"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Quận/Huyện:</label>
                      <input
                        type="text"
                        name="district"
                        value={deliveryAddress.district}
                        onChange={handleAddressChange}
                        placeholder="Quận/Huyện"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Thành phố:</label>
                      <input
                        type="text"
                        name="city"
                        value={deliveryAddress.city}
                        onChange={handleAddressChange}
                        placeholder="Thành phố"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

              <button 
                onClick={handlePlaceOrder}
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Đặt hàng'}
              </button>
            </div>

            {showPaymentForm && currentOrder && (
              <StripePaymentForm
                order={currentOrder}
                API_URL={API_URL}
                onSuccess={handlePaymentSuccess}
                onCancel={handlePaymentCancel}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StripePaymentForm({ order, API_URL, onSuccess, onCancel }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const handleCvcChange = (e) => {
    if (e.target.value.length <= 4) {
      setCvc(e.target.value.replace(/\D/g, ''));
    }
  };

  const validateForm = () => {
    const cleanCard = cardNumber.replace(/\s/g, '');
    
    if (cleanCard.length !== 16) {
      setError('Số thẻ phải có 16 chữ số');
      return false;
    }
    
    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
      setError('Ngày hết hạn phải có định dạng MM/YY');
      return false;
    }
    
    if (cvc.length !== 3 && cvc.length !== 4) {
      setError('CVC phải có 3 hoặc 4 chữ số');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      // Call payment initiation endpoint
      const paymentResponse = await axios.post(
        `${API_URL}/payments/initiate`,
        {
          orderId: order._id,
          customerId: order.customerId,
          amount: order.totalAmount,
          paymentMethod: 'STRIPE',
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiryDate,
          cvc
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (paymentResponse.data.success) {
        onSuccess();
      } else {
        setError(paymentResponse.data.message || 'Thanh toán thất bại');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi thanh toán. Vui lòng thử lại.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h2>Thanh toán bằng Stripe</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Số thẻ</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              className="form-input"
              maxLength="19"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ngày hết hạn</label>
              <input
                type="text"
                value={expiryDate}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                className="form-input"
                maxLength="5"
              />
            </div>
            <div className="form-group">
              <label>CVC</label>
              <input
                type="text"
                value={cvc}
                onChange={handleCvcChange}
                placeholder="123"
                className="form-input"
                maxLength="4"
              />
            </div>
          </div>

          <div className="form-group">
            <p>Tổng tiền: <strong>{order.totalAmount.toLocaleString('vi-VN')} ₫</strong></p>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onCancel}
              className="cancel-btn"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Thanh toán'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

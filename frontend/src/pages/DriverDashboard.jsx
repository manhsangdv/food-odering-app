import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RestaurantDashboard.css';

function OrderSummary({ order }) {
  if (!order) return null;
  return (
    <div style={{ fontSize: 13 }}>
      <p><strong>Khách:</strong> {order.customerId}</p>
      <p><strong>Tổng:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total || 0)}</p>
      <div>
        {order.items?.map((it, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{it.name} x{it.quantity}</span>
            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((it.price || 0) * it.quantity)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DriverDashboard({ API_URL }) {
  const [available, setAvailable] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [ordersMap, setOrdersMap] = useState({});
  const [customersMap, setCustomersMap] = useState({});

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 10000);
    return () => clearInterval(interval);
  }, []);

  const headers = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [a, h] = await Promise.all([
        axios.get(`${API_URL}/deliveries/available`, headers()),
        axios.get(`${API_URL}/deliveries/driver/history`, headers())
      ]);
      setAvailable(a.data || []);
      setHistory(h.data || []);
      const ids = [...(a.data || []), ...(h.data || [])].map(d => d.orderId).filter(Boolean);
      await Promise.all(ids.map(id => fetchOrderIfNeeded(id)));

      // Prefetch customer profiles for recipient name/phone
      const customerIds = [...(a.data || []), ...(h.data || [])].map(d => d.customerId).filter(Boolean);
      await Promise.all(customerIds.map(id => fetchCustomerIfNeeded(id)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderIfNeeded = async (orderId) => {
    if (!orderId) return;
    if (ordersMap[orderId]) return;
    try {
      const res = await axios.get(`${API_URL}/orders/${orderId}`);
      setOrdersMap(prev => ({ ...prev, [orderId]: res.data }));
    } catch (err) {
      // ignore
    }
  };

  const fetchCustomerIfNeeded = async (customerId) => {
    if (!customerId) return;
    if (customersMap[customerId]) return;
    try {
      const res = await axios.get(`${API_URL}/auth/profile/${customerId}`);
      setCustomersMap(prev => ({ ...prev, [customerId]: res.data }));
    } catch (err) {
      // ignore failures
    }
  };

  const accept = async (id, orderId) => {
    try {
      await axios.patch(`${API_URL}/deliveries/${id}/accept`, {}, headers());
      await fetchAll();
      await fetchOrderIfNeeded(orderId);
    } catch (err) { console.error(err); }
  };

  const arrived = async (id) => {
    try { await axios.patch(`${API_URL}/deliveries/${id}/arrived`, {}, headers()); await fetchAll(); } catch (err) { console.error(err); }
  };

  const picked = async (id) => {
    try { await axios.patch(`${API_URL}/deliveries/${id}/picked`, {}, headers()); await fetchAll(); } catch (err) { console.error(err); }
  };

  const complete = async (id) => {
    try { await axios.patch(`${API_URL}/deliveries/${id}/complete`, {}, headers()); await fetchAll(); } catch (err) { console.error(err); }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  const mapStatusClass = (s) => {
    const map = {
      CREATED: 'created',
      CONFIRMED: 'confirmed',
      ASSIGNED: 'confirmed',
      AT_RESTAURANT: 'preparing',
      PICKED_UP: 'preparing',
      DELIVERING: 'ready',
      COMPLETED: 'completed',
      CANCELLED: 'completed'
    }
    return map[s] || String(s || '').toLowerCase();
  }

  const renderCard = (d, isAvailable = false) => {
  const order = ordersMap[d.orderId];
  return (
    <div
      key={d._id}
      className={`order-card pro-card ${expanded === d._id ? 'expanded' : ''}`}
      onClick={() => setExpanded(expanded === d._id ? null : d._id)}
    >
      {/* Header */}
      <div className="order-header pro-header">
        <div>
          <h3 className="pro-title">Đơn {String(d.orderId || d._id).slice(-8)}</h3>
          <p className="order-time pro-time">
            {new Date(d.createdAt || Date.now()).toLocaleString()}
          </p>
        </div>

        <span className={`status pro-status ${mapStatusClass(d.status)}`}>
          {d.status}
        </span>
      </div>

      {/* Basic info */}
      <div className="order-info pro-info">
        <p><strong>Người nhận:</strong> {order?.recipientName || customersMap[d.customerId]?.name || d.customerId}</p>
        <p><strong>Sđt:</strong> {order?.recipientPhone || customersMap[d.customerId]?.phone || 'N/A'}</p>
        <p><strong>Địa chỉ:</strong> {order?.deliveryAddress ? `${order.deliveryAddress.street || ''}${order.deliveryAddress.ward ? ', ' + order.deliveryAddress.ward : ''}${order.deliveryAddress.district ? ', ' + order.deliveryAddress.district : ''}${order.deliveryAddress.city ? ', ' + order.deliveryAddress.city : ''}` : (d.customerLocation?.street || (d.customerLocation && `${d.customerLocation.lat},${d.customerLocation.lng}`) || 'N/A')}</p>
      </div>

      {/* Expanded */}
      {expanded === d._id && (
        <div className="order-details pro-details">
          <OrderSummary order={order} />

          <div className="action-buttons pro-actions">
            {isAvailable && (
              <button
                className="btn-action pro-btn confirmed"
                onClick={(e) => { e.stopPropagation(); accept(d._id, d.orderId); }}
              >
                Nhận đơn
              </button>
            )}

            {!isAvailable && d.status === 'ASSIGNED' && (
              <button
                className="btn-action pro-btn preparing"
                onClick={(e) => { e.stopPropagation(); arrived(d._id); }}
              >
                Đã đến quán
              </button>
            )}

            {!isAvailable && d.status === 'AT_RESTAURANT' && (
              <button
                className="btn-action pro-btn ready"
                onClick={(e) => { e.stopPropagation(); picked(d._id); }}
              >
                Đã lấy đơn
              </button>
            )}

            {!isAvailable && d.status === 'DELIVERING' && (
              <button
                className="btn-action pro-btn completed"
                onClick={(e) => { e.stopPropagation(); complete(d._id); }}
              >
                Hoàn thành
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


  return (
    <div className="restaurant-dashboard max-w-4xl mx-auto p-6 space-y-10">
  <h2 className="text-3xl font-bold text-gray-800">
    Bảng điều khiển Tài xế
  </h2>

  {/* Danh sách đơn hàng sẵn sàng */}
  <section className="space-y-4">
    <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      Đơn hàng sẵn sàng nhận
    </h3>

    {available.length === 0 ? (
      <p className="text-gray-500 italic">Không có đơn hàng mới</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {available.map(d => renderCard(d, true))}
      </div>
    )}
  </section>

  {/* Lịch sử */}
  <section className="space-y-4">
    <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
      Lịch sử & Đơn đang thực hiện
    </h3>

    {history.length === 0 ? (
      <p className="text-gray-500 italic">Chưa có đơn hàng</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map(d => renderCard(d, false))}
      </div>
    )}
  </section>
</div>

  );
}

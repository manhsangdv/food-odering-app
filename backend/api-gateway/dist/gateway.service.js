"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _dec, _dec2, _dec3, _class;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('@nestjs/common'),
  Injectable = _require.Injectable;
var axios = require('axios');
var GatewayService = (_dec = Injectable(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = /*#__PURE__*/function () {
  function GatewayService() {
    _classCallCheck(this, GatewayService);
    this.services = {
      user: process.env.USER_SERVICE_URL || 'http://user-service:3003',
      order: process.env.ORDER_SERVICE_URL || 'http://order-service:3001',
      restaurant: process.env.RESTAURANT_SERVICE_URL || 'http://restaurant-service:3002',
      delivery: process.env.DELIVERY_SERVICE_URL || 'http://delivery-service:3004',
      payment: process.env.PAYMENT_SERVICE_URL || 'http://payment-service:3005'
    };
  }
  return _createClass(GatewayService, [{
    key: "proxyRequest",
    value: function () {
      var _proxyRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(service, method, path) {
        var data,
          headers,
          url,
          config,
          response,
          _error$response,
          _error$response2,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              data = _args.length > 3 && _args[3] !== undefined ? _args[3] : null;
              headers = _args.length > 4 && _args[4] !== undefined ? _args[4] : {};
              _context.p = 1;
              url = "".concat(this.services[service]).concat(path);
              config = {
                method: method,
                url: url,
                headers: _objectSpread({
                  'Content-Type': 'application/json'
                }, headers)
              };
              if (data) {
                config.data = data;
              }
              _context.n = 2;
              return axios(config);
            case 2:
              response = _context.v;
              return _context.a(2, response.data);
            case 3:
              _context.p = 3;
              _t = _context.v;
              throw {
                status: ((_error$response = _t.response) === null || _error$response === void 0 ? void 0 : _error$response.status) || 500,
                message: ((_error$response2 = _t.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || _t.message
              };
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function proxyRequest(_x, _x2, _x3) {
        return _proxyRequest.apply(this, arguments);
      }
      return proxyRequest;
    }()
  }, {
    key: "register",
    value: function () {
      var _register = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(registerDto) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2, this.proxyRequest('user', 'POST', '/api/auth/register', registerDto));
          }
        }, _callee2, this);
      }));
      function register(_x4) {
        return _register.apply(this, arguments);
      }
      return register;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(loginDto) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              return _context3.a(2, this.proxyRequest('user', 'POST', '/api/auth/login', loginDto));
          }
        }, _callee3, this);
      }));
      function login(_x5) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "verifyEmail",
    value: function () {
      var _verifyEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(data) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              return _context4.a(2, this.proxyRequest('user', 'POST', '/api/auth/verify-email', data));
          }
        }, _callee4, this);
      }));
      function verifyEmail(_x6) {
        return _verifyEmail.apply(this, arguments);
      }
      return verifyEmail;
    }()
  }, {
    key: "verifyToken",
    value: function () {
      var _verifyToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(token) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              return _context5.a(2, this.proxyRequest('user', 'POST', '/api/auth/verify-token', null, {
                Authorization: "Bearer ".concat(token)
              }));
          }
        }, _callee5, this);
      }));
      function verifyToken(_x7) {
        return _verifyToken.apply(this, arguments);
      }
      return verifyToken;
    }() // --- HÀM MỚI CHO PROFILE ---
  }, {
    key: "getProfileByToken",
    value: function () {
      var _getProfileByToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(token) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              return _context6.a(2, this.proxyRequest('user', 'GET', '/api/auth/profile', null, {
                Authorization: "Bearer ".concat(token)
              }));
          }
        }, _callee6, this);
      }));
      function getProfileByToken(_x8) {
        return _getProfileByToken.apply(this, arguments);
      }
      return getProfileByToken;
    }()
  }, {
    key: "getProfile",
    value: function () {
      var _getProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(userId) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              return _context7.a(2, this.proxyRequest('user', 'GET', "/api/auth/profile/".concat(userId)));
          }
        }, _callee7, this);
      }));
      function getProfile(_x9) {
        return _getProfile.apply(this, arguments);
      }
      return getProfile;
    }()
  }, {
    key: "updateProfile",
    value: function () {
      var _updateProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(userId, updateDto) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              return _context8.a(2, this.proxyRequest('user', 'PATCH', "/api/auth/profile/".concat(userId), updateDto));
          }
        }, _callee8, this);
      }));
      function updateProfile(_x0, _x1) {
        return _updateProfile.apply(this, arguments);
      }
      return updateProfile;
    }()
  }, {
    key: "getRestaurants",
    value: function () {
      var _getRestaurants = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              return _context9.a(2, this.proxyRequest('restaurant', 'GET', '/api/restaurants'));
          }
        }, _callee9, this);
      }));
      function getRestaurants() {
        return _getRestaurants.apply(this, arguments);
      }
      return getRestaurants;
    }()
  }, {
    key: "getRestaurantById",
    value: function () {
      var _getRestaurantById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(id) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              return _context0.a(2, this.proxyRequest('restaurant', 'GET', "/api/restaurants/".concat(id)));
          }
        }, _callee0, this);
      }));
      function getRestaurantById(_x10) {
        return _getRestaurantById.apply(this, arguments);
      }
      return getRestaurantById;
    }()
  }, {
    key: "searchRestaurants",
    value: function () {
      var _searchRestaurants = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(keyword) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              return _context1.a(2, this.proxyRequest('restaurant', 'GET', "/api/restaurants/search/keyword?q=".concat(keyword)));
          }
        }, _callee1, this);
      }));
      function searchRestaurants(_x11) {
        return _searchRestaurants.apply(this, arguments);
      }
      return searchRestaurants;
    }()
  }, {
    key: "getRestaurantMenu",
    value: function () {
      var _getRestaurantMenu = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(restaurantId) {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              return _context10.a(2, this.proxyRequest('restaurant', 'GET', "/api/restaurants/".concat(restaurantId, "/menu")));
          }
        }, _callee10, this);
      }));
      function getRestaurantMenu(_x12) {
        return _getRestaurantMenu.apply(this, arguments);
      }
      return getRestaurantMenu;
    }()
  }, {
    key: "getAllMenuItems",
    value: function () {
      var _getAllMenuItems = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var keyword,
          q,
          suffix,
          _args11 = arguments;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              keyword = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : '';
              q = String(keyword || '').trim();
              suffix = q ? "?q=".concat(encodeURIComponent(q)) : '';
              return _context11.a(2, this.proxyRequest('restaurant', 'GET', "/api/restaurants/menu".concat(suffix)));
          }
        }, _callee11, this);
      }));
      function getAllMenuItems() {
        return _getAllMenuItems.apply(this, arguments);
      }
      return getAllMenuItems;
    }()
  }, {
    key: "addMenuItem",
    value: function () {
      var _addMenuItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(restaurantId, menuItemDto) {
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              return _context12.a(2, this.proxyRequest('restaurant', 'POST', "/api/restaurants/".concat(restaurantId, "/menu"), menuItemDto));
          }
        }, _callee12, this);
      }));
      function addMenuItem(_x13, _x14) {
        return _addMenuItem.apply(this, arguments);
      }
      return addMenuItem;
    }()
  }, {
    key: "deleteMenuItem",
    value: function () {
      var _deleteMenuItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(menuItemId) {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              return _context13.a(2, this.proxyRequest('restaurant', 'DELETE', "/api/restaurants/menu/".concat(menuItemId)));
          }
        }, _callee13, this);
      }));
      function deleteMenuItem(_x15) {
        return _deleteMenuItem.apply(this, arguments);
      }
      return deleteMenuItem;
    }() // Tạo nhà hàng mới qua restaurant-service
  }, {
    key: "createRestaurant",
    value: function () {
      var _createRestaurant = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(restaurantDto) {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              return _context14.a(2, this.proxyRequest('restaurant', 'POST', '/api/restaurants', restaurantDto));
          }
        }, _callee14, this);
      }));
      function createRestaurant(_x16) {
        return _createRestaurant.apply(this, arguments);
      }
      return createRestaurant;
    }() // Dùng cho tab Admin -> Nhà hàng: lấy tất cả nhà hàng
  }, {
    key: "getRestaurantsAdmin",
    value: function () {
      var _getRestaurantsAdmin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              return _context15.a(2, this.proxyRequest('restaurant', 'GET', '/api/restaurants?admin=true'));
          }
        }, _callee15, this);
      }));
      function getRestaurantsAdmin() {
        return _getRestaurantsAdmin.apply(this, arguments);
      }
      return getRestaurantsAdmin;
    }() // Dùng cho Admin toggle trạng thái active của nhà hàng
  }, {
    key: "toggleRestaurantStatus",
    value: function () {
      var _toggleRestaurantStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(restaurantId, isActive) {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              return _context16.a(2, this.proxyRequest('restaurant', 'PATCH', "/api/restaurants/".concat(restaurantId, "/status"), {
                isActive: isActive
              }));
          }
        }, _callee16, this);
      }));
      function toggleRestaurantStatus(_x17, _x18) {
        return _toggleRestaurantStatus.apply(this, arguments);
      }
      return toggleRestaurantStatus;
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(orderDto) {
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              return _context17.a(2, this.proxyRequest('order', 'POST', '/api/orders', orderDto));
          }
        }, _callee17, this);
      }));
      function createOrder(_x19) {
        return _createOrder.apply(this, arguments);
      }
      return createOrder;
    }()
  }, {
    key: "getOrder",
    value: function () {
      var _getOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(orderId) {
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              return _context18.a(2, this.proxyRequest('order', 'GET', "/api/orders/".concat(orderId)));
          }
        }, _callee18, this);
      }));
      function getOrder(_x20) {
        return _getOrder.apply(this, arguments);
      }
      return getOrder;
    }()
  }, {
    key: "getCustomerOrders",
    value: function () {
      var _getCustomerOrders = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(customerId) {
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              return _context19.a(2, this.proxyRequest('order', 'GET', "/api/orders/customer/".concat(customerId)));
          }
        }, _callee19, this);
      }));
      function getCustomerOrders(_x21) {
        return _getCustomerOrders.apply(this, arguments);
      }
      return getCustomerOrders;
    }()
  }, {
    key: "confirmOrder",
    value: function () {
      var _confirmOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(orderId) {
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              return _context20.a(2, this.proxyRequest('order', 'PATCH', "/api/orders/".concat(orderId, "/confirm"), {}));
          }
        }, _callee20, this);
      }));
      function confirmOrder(_x22) {
        return _confirmOrder.apply(this, arguments);
      }
      return confirmOrder;
    }()
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(orderId, reason) {
        var delivery, cancelled, _t2, _t3;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              // Check if a delivery exists for this order and whether a driver is already assigned.
              delivery = null;
              _context21.p = 1;
              _context21.n = 2;
              return this.getDeliveryByOrder(orderId);
            case 2:
              delivery = _context21.v;
              _context21.n = 4;
              break;
            case 3:
              _context21.p = 3;
              _t2 = _context21.v;
              // If delivery-service returns 404 or there is no delivery, proceed to cancel the order.
              delivery = null;
            case 4:
              if (!(delivery && delivery.driverId)) {
                _context21.n = 5;
                break;
              }
              throw {
                status: 400,
                message: 'Cannot cancel order: a driver has already been assigned.'
              };
            case 5:
              _context21.n = 6;
              return this.proxyRequest('order', 'PATCH', "/api/orders/".concat(orderId, "/cancel"), {
                reason: reason
              });
            case 6:
              cancelled = _context21.v;
              if (!delivery) {
                _context21.n = 10;
                break;
              }
              _context21.p = 7;
              _context21.n = 8;
              return this.proxyRequest('delivery', 'PATCH', "/api/deliveries/".concat(delivery._id, "/status"), {
                status: 'CANCELLED'
              });
            case 8:
              _context21.n = 10;
              break;
            case 9:
              _context21.p = 9;
              _t3 = _context21.v;
            case 10:
              return _context21.a(2, cancelled);
          }
        }, _callee21, this, [[7, 9], [1, 3]]);
      }));
      function cancelOrder(_x23, _x24) {
        return _cancelOrder.apply(this, arguments);
      }
      return cancelOrder;
    }()
  }, {
    key: "initiatePayment",
    value: function () {
      var _initiatePayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(paymentDto) {
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              return _context22.a(2, this.proxyRequest('payment', 'POST', '/api/payments/initiate', paymentDto));
          }
        }, _callee22, this);
      }));
      function initiatePayment(_x25) {
        return _initiatePayment.apply(this, arguments);
      }
      return initiatePayment;
    }()
  }, {
    key: "getPayment",
    value: function () {
      var _getPayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(paymentId) {
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              return _context23.a(2, this.proxyRequest('payment', 'GET', "/api/payments/".concat(paymentId)));
          }
        }, _callee23, this);
      }));
      function getPayment(_x26) {
        return _getPayment.apply(this, arguments);
      }
      return getPayment;
    }()
  }, {
    key: "getPaymentByOrderId",
    value: function () {
      var _getPaymentByOrderId = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(orderId) {
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              return _context24.a(2, this.proxyRequest('payment', 'GET', "/api/payments/order/".concat(orderId)));
          }
        }, _callee24, this);
      }));
      function getPaymentByOrderId(_x27) {
        return _getPaymentByOrderId.apply(this, arguments);
      }
      return getPaymentByOrderId;
    }()
  }, {
    key: "handlePaymentCallback",
    value: function () {
      var _handlePaymentCallback = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(paymentId, callbackData) {
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              return _context25.a(2, this.proxyRequest('payment', 'POST', "/api/payments/".concat(paymentId, "/callback"), callbackData));
          }
        }, _callee25, this);
      }));
      function handlePaymentCallback(_x28, _x29) {
        return _handlePaymentCallback.apply(this, arguments);
      }
      return handlePaymentCallback;
    }()
  }, {
    key: "handleSepayWebhook",
    value: function () {
      var _handleSepayWebhook = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(callbackData, authorization) {
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              return _context26.a(2, this.proxyRequest('payment', 'POST', "/api/payments/callback", callbackData, _objectSpread({}, authorization ? {
                Authorization: authorization
              } : {})));
          }
        }, _callee26, this);
      }));
      function handleSepayWebhook(_x30, _x31) {
        return _handleSepayWebhook.apply(this, arguments);
      }
      return handleSepayWebhook;
    }()
  }, {
    key: "retryPayment",
    value: function () {
      var _retryPayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(paymentId) {
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              return _context27.a(2, this.proxyRequest('payment', 'PATCH', "/api/payments/".concat(paymentId, "/retry"), {}));
          }
        }, _callee27, this);
      }));
      function retryPayment(_x32) {
        return _retryPayment.apply(this, arguments);
      }
      return retryPayment;
    }()
  }, {
    key: "refundPayment",
    value: function () {
      var _refundPayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(paymentId, reason) {
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.n) {
            case 0:
              return _context28.a(2, this.proxyRequest('payment', 'POST', "/api/payments/".concat(paymentId, "/refund"), {
                reason: reason
              }));
          }
        }, _callee28, this);
      }));
      function refundPayment(_x33, _x34) {
        return _refundPayment.apply(this, arguments);
      }
      return refundPayment;
    }()
  }, {
    key: "getDelivery",
    value: function () {
      var _getDelivery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(deliveryId) {
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              return _context29.a(2, this.proxyRequest('delivery', 'GET', "/api/deliveries/".concat(deliveryId)));
          }
        }, _callee29, this);
      }));
      function getDelivery(_x35) {
        return _getDelivery.apply(this, arguments);
      }
      return getDelivery;
    }()
  }, {
    key: "getDeliveryByOrder",
    value: function () {
      var _getDeliveryByOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(orderId) {
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.n) {
            case 0:
              return _context30.a(2, this.proxyRequest('delivery', 'GET', "/api/deliveries/order/".concat(orderId)));
          }
        }, _callee30, this);
      }));
      function getDeliveryByOrder(_x36) {
        return _getDeliveryByOrder.apply(this, arguments);
      }
      return getDeliveryByOrder;
    }()
  }, {
    key: "createDelivery",
    value: function () {
      var _createDelivery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(orderData) {
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              return _context31.a(2, this.proxyRequest('delivery', 'POST', '/api/deliveries', orderData));
          }
        }, _callee31, this);
      }));
      function createDelivery(_x37) {
        return _createDelivery.apply(this, arguments);
      }
      return createDelivery;
    }()
  }, {
    key: "startDelivery",
    value: function () {
      var _startDelivery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(deliveryId, data) {
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.n) {
            case 0:
              return _context32.a(2, this.proxyRequest('delivery', 'POST', "/api/deliveries/".concat(deliveryId, "/start"), data));
          }
        }, _callee32, this);
      }));
      function startDelivery(_x38, _x39) {
        return _startDelivery.apply(this, arguments);
      }
      return startDelivery;
    }() // Driver-related proxies
  }, {
    key: "getAvailableDeliveries",
    value: function () {
      var _getAvailableDeliveries = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33() {
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.n) {
            case 0:
              return _context33.a(2, this.proxyRequest('delivery', 'GET', '/api/deliveries/available'));
          }
        }, _callee33, this);
      }));
      function getAvailableDeliveries() {
        return _getAvailableDeliveries.apply(this, arguments);
      }
      return getAvailableDeliveries;
    }()
  }, {
    key: "getDriverHistory",
    value: function () {
      var _getDriverHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(driverId) {
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.n) {
            case 0:
              return _context34.a(2, this.proxyRequest('delivery', 'GET', "/api/deliveries/driver/".concat(driverId, "/history")));
          }
        }, _callee34, this);
      }));
      function getDriverHistory(_x40) {
        return _getDriverHistory.apply(this, arguments);
      }
      return getDriverHistory;
    }()
  }, {
    key: "assignDelivery",
    value: function () {
      var _assignDelivery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(deliveryId, driverId) {
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.n) {
            case 0:
              return _context35.a(2, this.proxyRequest('delivery', 'PATCH', "/api/deliveries/".concat(deliveryId, "/assign"), {
                driverId: driverId
              }));
          }
        }, _callee35, this);
      }));
      function assignDelivery(_x41, _x42) {
        return _assignDelivery.apply(this, arguments);
      }
      return assignDelivery;
    }()
  }, {
    key: "markArrived",
    value: function () {
      var _markArrived = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(deliveryId) {
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.n) {
            case 0:
              return _context36.a(2, this.proxyRequest('delivery', 'PATCH', "/api/deliveries/".concat(deliveryId, "/arrived"), {}));
          }
        }, _callee36, this);
      }));
      function markArrived(_x43) {
        return _markArrived.apply(this, arguments);
      }
      return markArrived;
    }()
  }, {
    key: "markPicked",
    value: function () {
      var _markPicked = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37(deliveryId) {
        return _regenerator().w(function (_context37) {
          while (1) switch (_context37.n) {
            case 0:
              return _context37.a(2, this.proxyRequest('delivery', 'PATCH', "/api/deliveries/".concat(deliveryId, "/picked"), {}));
          }
        }, _callee37, this);
      }));
      function markPicked(_x44) {
        return _markPicked.apply(this, arguments);
      }
      return markPicked;
    }()
  }, {
    key: "completeDeliveryRequest",
    value: function () {
      var _completeDeliveryRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38(deliveryId) {
        return _regenerator().w(function (_context38) {
          while (1) switch (_context38.n) {
            case 0:
              return _context38.a(2, this.proxyRequest('delivery', 'PATCH', "/api/deliveries/".concat(deliveryId, "/complete"), {}));
          }
        }, _callee38, this);
      }));
      function completeDeliveryRequest(_x45) {
        return _completeDeliveryRequest.apply(this, arguments);
      }
      return completeDeliveryRequest;
    }()
  }]);
}()) || _class) || _class) || _class);
module.exports = {
  GatewayService: GatewayService
};
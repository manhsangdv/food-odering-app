"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _dec115, _dec116, _dec117, _dec118, _dec119, _dec120, _dec121, _dec122, _dec123, _dec124, _dec125, _dec126, _dec127, _dec128, _dec129, _dec130, _dec131, _dec132, _dec133, _dec134, _dec135, _dec136, _dec137, _dec138, _dec139, _dec140, _dec141, _dec142, _dec143, _dec144, _dec145, _dec146, _dec147, _dec148, _dec149, _dec150, _dec151, _dec152, _dec153, _dec154, _dec155, _dec156, _dec157, _dec158, _dec159, _dec160, _dec161, _dec162, _dec163, _dec164, _dec165, _dec166, _dec167, _dec168, _dec169, _dec170, _dec171, _dec172, _dec173, _dec174, _class, _class2;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var _require = require('@nestjs/common'),
  Controller = _require.Controller,
  Get = _require.Get,
  Post = _require.Post,
  Patch = _require.Patch,
  Body = _require.Body,
  Param = _require.Param,
  Headers = _require.Headers,
  HttpException = _require.HttpException,
  HttpStatus = _require.HttpStatus,
  Inject = _require.Inject,
  Query = _require.Query;
var _require2 = require('./gateway.service'),
  GatewayService = _require2.GatewayService;
var wsBroadcast = require('./ws-broadcast');
var GatewayController = (_dec = Controller('api'), _dec2 = function _dec2(target, key) {
  return Inject(GatewayService)(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [void 0]), _dec5 = Post('auth/register'), _dec6 = function _dec6(target, key) {
  return Body()(target, key, 0);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [void 0]), _dec9 = Post('auth/login'), _dec0 = function _dec0(target, key) {
  return Body()(target, key, 0);
}, _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [void 0]), _dec11 = Post('auth/verify-email'), _dec12 = function _dec12(target, key) {
  return Body()(target, key, 0);
}, _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [void 0]), _dec15 = Post('auth/verify-token'), _dec16 = function _dec16(target, key) {
  return Headers('authorization')(target, key, 0);
}, _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [void 0]), _dec19 = Get('auth/profile'), _dec20 = function _dec20(target, key) {
  return Headers('authorization')(target, key, 0);
}, _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [void 0]), _dec23 = Get('auth/profile/:id'), _dec24 = function _dec24(target, key) {
  return Param('id')(target, key, 0);
}, _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [void 0]), _dec27 = Patch('auth/profile/:id'), _dec28 = function _dec28(target, key) {
  return Param('id')(target, key, 0);
}, _dec29 = function _dec29(target, key) {
  return Body()(target, key, 1);
}, _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec32 = Get('restaurants'), _dec33 = Reflect.metadata("design:type", Function), _dec34 = Reflect.metadata("design:paramtypes", []), _dec35 = Get('restaurants/menu'), _dec36 = function _dec36(target, key) {
  return Query('q')(target, key, 0);
}, _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", [void 0]), _dec39 = Get('restaurants/:id'), _dec40 = function _dec40(target, key) {
  return Param('id')(target, key, 0);
}, _dec41 = Reflect.metadata("design:type", Function), _dec42 = Reflect.metadata("design:paramtypes", [void 0]), _dec43 = Get('restaurants/search'), _dec44 = function _dec44(target, key) {
  return Query('q')(target, key, 0);
}, _dec45 = Reflect.metadata("design:type", Function), _dec46 = Reflect.metadata("design:paramtypes", [void 0]), _dec47 = Get('restaurants/:id/menu'), _dec48 = function _dec48(target, key) {
  return Param('id')(target, key, 0);
}, _dec49 = Reflect.metadata("design:type", Function), _dec50 = Reflect.metadata("design:paramtypes", [void 0]), _dec51 = Post('restaurants/:restaurantId/menu'), _dec52 = function _dec52(target, key) {
  return Param('restaurantId')(target, key, 0);
}, _dec53 = function _dec53(target, key) {
  return Body()(target, key, 1);
}, _dec54 = Reflect.metadata("design:type", Function), _dec55 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec56 = Post('restaurants'), _dec57 = function _dec57(target, key) {
  return Body()(target, key, 0);
}, _dec58 = Reflect.metadata("design:type", Function), _dec59 = Reflect.metadata("design:paramtypes", [void 0]), _dec60 = Get('admin/restaurants'), _dec61 = Reflect.metadata("design:type", Function), _dec62 = Reflect.metadata("design:paramtypes", []), _dec63 = Patch('admin/restaurants/:id'), _dec64 = function _dec64(target, key) {
  return Param('id')(target, key, 0);
}, _dec65 = function _dec65(target, key) {
  return Body()(target, key, 1);
}, _dec66 = Reflect.metadata("design:type", Function), _dec67 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec68 = Post('orders'), _dec69 = function _dec69(target, key) {
  return Body()(target, key, 0);
}, _dec70 = Reflect.metadata("design:type", Function), _dec71 = Reflect.metadata("design:paramtypes", [void 0]), _dec72 = Get('orders/customer'), _dec73 = function _dec73(target, key) {
  return Headers('authorization')(target, key, 0);
}, _dec74 = Reflect.metadata("design:type", Function), _dec75 = Reflect.metadata("design:paramtypes", [void 0]), _dec76 = Get('orders/:id'), _dec77 = function _dec77(target, key) {
  return Param('id')(target, key, 0);
}, _dec78 = Reflect.metadata("design:type", Function), _dec79 = Reflect.metadata("design:paramtypes", [void 0]), _dec80 = Get('customers/:customerId/orders'), _dec81 = function _dec81(target, key) {
  return Param('customerId')(target, key, 0);
}, _dec82 = Reflect.metadata("design:type", Function), _dec83 = Reflect.metadata("design:paramtypes", [void 0]), _dec84 = Patch('orders/:id/confirm'), _dec85 = function _dec85(target, key) {
  return Param('id')(target, key, 0);
}, _dec86 = Reflect.metadata("design:type", Function), _dec87 = Reflect.metadata("design:paramtypes", [void 0]), _dec88 = Get('orders/customer'), _dec89 = function _dec89(target, key) {
  return Headers('authorization')(target, key, 0);
}, _dec90 = Reflect.metadata("design:type", Function), _dec91 = Reflect.metadata("design:paramtypes", [void 0]), _dec92 = Patch('orders/:id/cancel'), _dec93 = function _dec93(target, key) {
  return Param('id')(target, key, 0);
}, _dec94 = function _dec94(target, key) {
  return Body()(target, key, 1);
}, _dec95 = Reflect.metadata("design:type", Function), _dec96 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec97 = Post('internal/events'), _dec98 = function _dec98(target, key) {
  return Body()(target, key, 0);
}, _dec99 = Reflect.metadata("design:type", Function), _dec100 = Reflect.metadata("design:paramtypes", [void 0]), _dec101 = Post('payments/initiate'), _dec102 = function _dec102(target, key) {
  return Body()(target, key, 0);
}, _dec103 = Reflect.metadata("design:type", Function), _dec104 = Reflect.metadata("design:paramtypes", [void 0]), _dec105 = Get('payments/callback'), _dec106 = Reflect.metadata("design:type", Function), _dec107 = Reflect.metadata("design:paramtypes", []), _dec108 = Get('payments/:id'), _dec109 = function _dec109(target, key) {
  return Param('id')(target, key, 0);
}, _dec110 = Reflect.metadata("design:type", Function), _dec111 = Reflect.metadata("design:paramtypes", [void 0]), _dec112 = Get('payments/order/:orderId'), _dec113 = function _dec113(target, key) {
  return Param('orderId')(target, key, 0);
}, _dec114 = Reflect.metadata("design:type", Function), _dec115 = Reflect.metadata("design:paramtypes", [void 0]), _dec116 = Post('payments/:id/callback'), _dec117 = function _dec117(target, key) {
  return Param('id')(target, key, 0);
}, _dec118 = function _dec118(target, key) {
  return Body()(target, key, 1);
}, _dec119 = Reflect.metadata("design:type", Function), _dec120 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec121 = Post('payments/callback'), _dec122 = function _dec122(target, key) {
  return Body()(target, key, 0);
}, _dec123 = function _dec123(target, key) {
  return Headers('authorization')(target, key, 1);
}, _dec124 = Reflect.metadata("design:type", Function), _dec125 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec126 = Post('payments/:id/retry'), _dec127 = function _dec127(target, key) {
  return Param('id')(target, key, 0);
}, _dec128 = Reflect.metadata("design:type", Function), _dec129 = Reflect.metadata("design:paramtypes", [void 0]), _dec130 = Post('payments/:id/refund'), _dec131 = function _dec131(target, key) {
  return Param('id')(target, key, 0);
}, _dec132 = function _dec132(target, key) {
  return Body()(target, key, 1);
}, _dec133 = Reflect.metadata("design:type", Function), _dec134 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec135 = Get('deliveries/:id'), _dec136 = function _dec136(target, key) {
  return Param('id')(target, key, 0);
}, _dec137 = Reflect.metadata("design:type", Function), _dec138 = Reflect.metadata("design:paramtypes", [void 0]), _dec139 = Get('deliveries/order/:orderId'), _dec140 = function _dec140(target, key) {
  return Param('orderId')(target, key, 0);
}, _dec141 = Reflect.metadata("design:type", Function), _dec142 = Reflect.metadata("design:paramtypes", [void 0]), _dec143 = Get('deliveries/available'), _dec144 = Reflect.metadata("design:type", Function), _dec145 = Reflect.metadata("design:paramtypes", []), _dec146 = Get('deliveries/driver/history'), _dec147 = function _dec147(target, key) {
  return Headers('authorization')(target, key, 0);
}, _dec148 = Reflect.metadata("design:type", Function), _dec149 = Reflect.metadata("design:paramtypes", [void 0]), _dec150 = Patch('deliveries/:id/accept'), _dec151 = function _dec151(target, key) {
  return Param('id')(target, key, 0);
}, _dec152 = function _dec152(target, key) {
  return Headers('authorization')(target, key, 1);
}, _dec153 = Reflect.metadata("design:type", Function), _dec154 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec155 = Patch('deliveries/:id/arrived'), _dec156 = function _dec156(target, key) {
  return Param('id')(target, key, 0);
}, _dec157 = function _dec157(target, key) {
  return Headers('authorization')(target, key, 1);
}, _dec158 = Reflect.metadata("design:type", Function), _dec159 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec160 = Patch('deliveries/:id/picked'), _dec161 = function _dec161(target, key) {
  return Param('id')(target, key, 0);
}, _dec162 = function _dec162(target, key) {
  return Headers('authorization')(target, key, 1);
}, _dec163 = Reflect.metadata("design:type", Function), _dec164 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec165 = Patch('deliveries/:id/complete'), _dec166 = function _dec166(target, key) {
  return Param('id')(target, key, 0);
}, _dec167 = function _dec167(target, key) {
  return Headers('authorization')(target, key, 1);
}, _dec168 = Reflect.metadata("design:type", Function), _dec169 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec170 = Post('deliveries/:id/start'), _dec171 = function _dec171(target, key) {
  return Param('id')(target, key, 0);
}, _dec172 = function _dec172(target, key) {
  return Body()(target, key, 1);
}, _dec173 = Reflect.metadata("design:type", Function), _dec174 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function () {
  function GatewayController(gatewayService) {
    _classCallCheck(this, GatewayController);
    this.gatewayService = gatewayService;
  }

  // ==================== AUTH ENDPOINTS ====================
  return _createClass(GatewayController, [{
    key: "register",
    value: function () {
      var _register = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(registerDto) {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return this.gatewayService.register(registerDto);
            case 1:
              return _context.a(2, _context.v);
            case 2:
              _context.p = 2;
              _t = _context.v;
              throw new HttpException(_t.message, _t.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context.a(2);
          }
        }, _callee, this, [[0, 2]]);
      }));
      function register(_x) {
        return _register.apply(this, arguments);
      }
      return register;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(loginDto) {
        var _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return this.gatewayService.login(loginDto);
            case 1:
              return _context2.a(2, _context2.v);
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              throw new HttpException(_t2.message, _t2.status || HttpStatus.UNAUTHORIZED);
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 2]]);
      }));
      function login(_x2) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "verifyEmail",
    value: function () {
      var _verifyEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(body) {
        var _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return this.gatewayService.verifyEmail(body);
            case 1:
              return _context3.a(2, _context3.v);
            case 2:
              _context3.p = 2;
              _t3 = _context3.v;
              throw new HttpException(_t3.message, _t3.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 2]]);
      }));
      function verifyEmail(_x3) {
        return _verifyEmail.apply(this, arguments);
      }
      return verifyEmail;
    }()
  }, {
    key: "verifyToken",
    value: function () {
      var _verifyToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(authHeader) {
        var token, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              // SỬA: Dùng cách viết an toàn (&&) thay vì (?.) để tránh lỗi format
              token = authHeader && authHeader.replace('Bearer ', '');
              _context4.p = 1;
              _context4.n = 2;
              return this.gatewayService.verifyToken(token);
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new HttpException(_t4.message, HttpStatus.UNAUTHORIZED);
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function verifyToken(_x4) {
        return _verifyToken.apply(this, arguments);
      }
      return verifyToken;
    }() // 👇 ROUTE MỚI CHO PROFILE (Đặt TRƯỚC route :id) 👇
  }, {
    key: "getProfileByToken",
    value: function () {
      var _getProfileByToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(authHeader) {
        var token, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              token = authHeader && authHeader.replace('Bearer ', '');
              if (token) {
                _context5.n = 1;
                break;
              }
              throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
            case 1:
              _context5.p = 1;
              _context5.n = 2;
              return this.gatewayService.getProfileByToken(token);
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new HttpException(_t5.message || 'Invalid Token', _t5.status || HttpStatus.UNAUTHORIZED);
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function getProfileByToken(_x5) {
        return _getProfileByToken.apply(this, arguments);
      }
      return getProfileByToken;
    }() // 👆 HẾT ROUTE MỚI 👆
  }, {
    key: "getProfile",
    value: function () {
      var _getProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(id) {
        var _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this.gatewayService.getProfile(id);
            case 1:
              return _context6.a(2, _context6.v);
            case 2:
              _context6.p = 2;
              _t6 = _context6.v;
              throw new HttpException(_t6.message, _t6.status || HttpStatus.NOT_FOUND);
            case 3:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 2]]);
      }));
      function getProfile(_x6) {
        return _getProfile.apply(this, arguments);
      }
      return getProfile;
    }()
  }, {
    key: "updateProfile",
    value: function () {
      var _updateProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(id, updateDto) {
        var _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return this.gatewayService.updateProfile(id, updateDto);
            case 1:
              return _context7.a(2, _context7.v);
            case 2:
              _context7.p = 2;
              _t7 = _context7.v;
              throw new HttpException(_t7.message, _t7.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 2]]);
      }));
      function updateProfile(_x7, _x8) {
        return _updateProfile.apply(this, arguments);
      }
      return updateProfile;
    }() // ==================== RESTAURANT ENDPOINTS ====================
  }, {
    key: "getRestaurants",
    value: function () {
      var _getRestaurants = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return this.gatewayService.getRestaurants();
            case 1:
              return _context8.a(2, _context8.v);
            case 2:
              _context8.p = 2;
              _t8 = _context8.v;
              throw new HttpException(_t8.message, _t8.status || HttpStatus.INTERNAL_SERVER_ERROR);
            case 3:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 2]]);
      }));
      function getRestaurants() {
        return _getRestaurants.apply(this, arguments);
      }
      return getRestaurants;
    }()
  }, {
    key: "getAllMenuItems",
    value: function () {
      var _getAllMenuItems = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(keyword) {
        var _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              _context9.n = 1;
              return this.gatewayService.getAllMenuItems(keyword);
            case 1:
              return _context9.a(2, _context9.v);
            case 2:
              _context9.p = 2;
              _t9 = _context9.v;
              throw new HttpException(_t9.message, _t9.status || HttpStatus.INTERNAL_SERVER_ERROR);
            case 3:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 2]]);
      }));
      function getAllMenuItems(_x9) {
        return _getAllMenuItems.apply(this, arguments);
      }
      return getAllMenuItems;
    }()
  }, {
    key: "getRestaurantById",
    value: function () {
      var _getRestaurantById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(id) {
        var _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _context0.n = 1;
              return this.gatewayService.getRestaurantById(id);
            case 1:
              return _context0.a(2, _context0.v);
            case 2:
              _context0.p = 2;
              _t0 = _context0.v;
              throw new HttpException(_t0.message, _t0.status || HttpStatus.NOT_FOUND);
            case 3:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 2]]);
      }));
      function getRestaurantById(_x0) {
        return _getRestaurantById.apply(this, arguments);
      }
      return getRestaurantById;
    }()
  }, {
    key: "searchRestaurants",
    value: function () {
      var _searchRestaurants = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(keyword) {
        var _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              _context1.n = 1;
              return this.gatewayService.searchRestaurants(keyword);
            case 1:
              return _context1.a(2, _context1.v);
            case 2:
              _context1.p = 2;
              _t1 = _context1.v;
              throw new HttpException(_t1.message, _t1.status || HttpStatus.INTERNAL_SERVER_ERROR);
            case 3:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 2]]);
      }));
      function searchRestaurants(_x1) {
        return _searchRestaurants.apply(this, arguments);
      }
      return searchRestaurants;
    }()
  }, {
    key: "getRestaurantMenu",
    value: function () {
      var _getRestaurantMenu = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(id) {
        var _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              _context10.n = 1;
              return this.gatewayService.getRestaurantMenu(id);
            case 1:
              return _context10.a(2, _context10.v);
            case 2:
              _context10.p = 2;
              _t10 = _context10.v;
              throw new HttpException(_t10.message, _t10.status || HttpStatus.NOT_FOUND);
            case 3:
              return _context10.a(2);
          }
        }, _callee10, this, [[0, 2]]);
      }));
      function getRestaurantMenu(_x10) {
        return _getRestaurantMenu.apply(this, arguments);
      }
      return getRestaurantMenu;
    }()
  }, {
    key: "addMenuItem",
    value: function () {
      var _addMenuItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(restaurantId, menuItemDto) {
        var _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              _context11.n = 1;
              return this.gatewayService.addMenuItem(restaurantId, menuItemDto);
            case 1:
              return _context11.a(2, _context11.v);
            case 2:
              _context11.p = 2;
              _t11 = _context11.v;
              throw new HttpException(_t11.message, _t11.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context11.a(2);
          }
        }, _callee11, this, [[0, 2]]);
      }));
      function addMenuItem(_x11, _x12) {
        return _addMenuItem.apply(this, arguments);
      }
      return addMenuItem;
    }()
  }, {
    key: "createRestaurant",
    value: function () {
      var _createRestaurant = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(restaurantDto) {
        var _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              _context12.n = 1;
              return this.gatewayService.createRestaurant(restaurantDto);
            case 1:
              return _context12.a(2, _context12.v);
            case 2:
              _context12.p = 2;
              _t12 = _context12.v;
              throw new HttpException(_t12.message, _t12.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 2]]);
      }));
      function createRestaurant(_x13) {
        return _createRestaurant.apply(this, arguments);
      }
      return createRestaurant;
    }() // ==================== ADMIN - RESTAURANTS ====================
  }, {
    key: "getRestaurantsAdmin",
    value: function () {
      var _getRestaurantsAdmin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        var _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              _context13.n = 1;
              return this.gatewayService.getRestaurantsAdmin();
            case 1:
              return _context13.a(2, _context13.v);
            case 2:
              _context13.p = 2;
              _t13 = _context13.v;
              throw new HttpException(_t13.message, _t13.status || HttpStatus.INTERNAL_SERVER_ERROR);
            case 3:
              return _context13.a(2);
          }
        }, _callee13, this, [[0, 2]]);
      }));
      function getRestaurantsAdmin() {
        return _getRestaurantsAdmin.apply(this, arguments);
      }
      return getRestaurantsAdmin;
    }()
  }, {
    key: "toggleRestaurantStatus",
    value: function () {
      var _toggleRestaurantStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(id, body) {
        var active, _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              // Frontend đang gửi { active: !currentStatus }
              active = body.active;
              if (!(typeof active !== 'boolean')) {
                _context14.n = 1;
                break;
              }
              throw new HttpException('active field must be boolean', HttpStatus.BAD_REQUEST);
            case 1:
              _context14.p = 1;
              _context14.n = 2;
              return this.gatewayService.toggleRestaurantStatus(id, active);
            case 2:
              return _context14.a(2, _context14.v);
            case 3:
              _context14.p = 3;
              _t14 = _context14.v;
              throw new HttpException(_t14.message, _t14.status || HttpStatus.BAD_REQUEST);
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 3]]);
      }));
      function toggleRestaurantStatus(_x14, _x15) {
        return _toggleRestaurantStatus.apply(this, arguments);
      }
      return toggleRestaurantStatus;
    }() // ==================== ORDER ENDPOINTS ====================
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(orderDto) {
        var created, _t15, _t16;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              _context15.n = 1;
              return this.gatewayService.createOrder(orderDto);
            case 1:
              created = _context15.v;
              _context15.p = 2;
              if (!(created && created.status === 'CREATED')) {
                _context15.n = 3;
                break;
              }
              _context15.n = 3;
              return this.gatewayService.createDelivery(created);
            case 3:
              _context15.n = 5;
              break;
            case 4:
              _context15.p = 4;
              _t15 = _context15.v;
              // don't fail order creation if delivery creation fails
              console.warn('Failed to create delivery for order (fallback):', _t15.message || _t15);
            case 5:
              return _context15.a(2, created);
            case 6:
              _context15.p = 6;
              _t16 = _context15.v;
              throw new HttpException(_t16.message, _t16.status || HttpStatus.BAD_REQUEST);
            case 7:
              return _context15.a(2);
          }
        }, _callee15, this, [[2, 4], [0, 6]]);
      }));
      function createOrder(_x16) {
        return _createOrder.apply(this, arguments);
      }
      return createOrder;
    }() // New: get orders for the authenticated customer (uses token)
    // NOTE: placed before the ':id' route to avoid accidental route matching of the literal 'customer' value.
  }, {
    key: "getCustomerOrdersByToken",
    value: // New: get orders for the authenticated customer (uses token)
    function () {
      var _getCustomerOrdersByToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(authHeader) {
        var token, profile, customerId, _t17;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              token = authHeader && authHeader.replace('Bearer ', '');
              if (token) {
                _context16.n = 1;
                break;
              }
              throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
            case 1:
              _context16.p = 1;
              _context16.n = 2;
              return this.gatewayService.getProfileByToken(token);
            case 2:
              profile = _context16.v;
              customerId = profile && (profile._id || profile.id);
              if (customerId) {
                _context16.n = 3;
                break;
              }
              throw new HttpException('Invalid token/profile', HttpStatus.UNAUTHORIZED);
            case 3:
              _context16.n = 4;
              return this.gatewayService.getCustomerOrders(customerId);
            case 4:
              return _context16.a(2, _context16.v);
            case 5:
              _context16.p = 5;
              _t17 = _context16.v;
              throw new HttpException(_t17.message || 'Failed to fetch customer orders', _t17.status || HttpStatus.BAD_REQUEST);
            case 6:
              return _context16.a(2);
          }
        }, _callee16, this, [[1, 5]]);
      }));
      function getCustomerOrdersByToken(_x17) {
        return _getCustomerOrdersByToken.apply(this, arguments);
      }
      return getCustomerOrdersByToken;
    }()
  }, {
    key: "getOrder",
    value: function () {
      var _getOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(id) {
        var _t18;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _context17.n = 1;
              return this.gatewayService.getOrder(id);
            case 1:
              return _context17.a(2, _context17.v);
            case 2:
              _context17.p = 2;
              _t18 = _context17.v;
              throw new HttpException(_t18.message, _t18.status || HttpStatus.NOT_FOUND);
            case 3:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 2]]);
      }));
      function getOrder(_x18) {
        return _getOrder.apply(this, arguments);
      }
      return getOrder;
    }()
  }, {
    key: "getCustomerOrders",
    value: function () {
      var _getCustomerOrders = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(customerId) {
        var _t19;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              _context18.n = 1;
              return this.gatewayService.getCustomerOrders(customerId);
            case 1:
              return _context18.a(2, _context18.v);
            case 2:
              _context18.p = 2;
              _t19 = _context18.v;
              throw new HttpException(_t19.message, _t19.status || HttpStatus.NOT_FOUND);
            case 3:
              return _context18.a(2);
          }
        }, _callee18, this, [[0, 2]]);
      }));
      function getCustomerOrders(_x19) {
        return _getCustomerOrders.apply(this, arguments);
      }
      return getCustomerOrders;
    }()
  }, {
    key: "confirmOrder",
    value: function () {
      var _confirmOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(id) {
        var _t20;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              _context19.p = 0;
              _context19.n = 1;
              return this.gatewayService.confirmOrder(id);
            case 1:
              return _context19.a(2, _context19.v);
            case 2:
              _context19.p = 2;
              _t20 = _context19.v;
              throw new HttpException(_t20.message, _t20.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context19.a(2);
          }
        }, _callee19, this, [[0, 2]]);
      }));
      function confirmOrder(_x20) {
        return _confirmOrder.apply(this, arguments);
      }
      return confirmOrder;
    }()
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(id, body) {
        var _t21;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              _context20.p = 0;
              _context20.n = 1;
              return this.gatewayService.cancelOrder(id, body.reason);
            case 1:
              return _context20.a(2, _context20.v);
            case 2:
              _context20.p = 2;
              _t21 = _context20.v;
              throw new HttpException(_t21.message, _t21.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context20.a(2);
          }
        }, _callee20, this, [[0, 2]]);
      }));
      function cancelOrder(_x21, _x22) {
        return _cancelOrder.apply(this, arguments);
      }
      return cancelOrder;
    }() // Internal endpoint used by other services to broadcast events to websocket clients
  }, {
    key: "internalEvent",
    value: function () {
      var _internalEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(body) {
        var _t22;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              if (!(!body || !body.type)) {
                _context21.n = 1;
                break;
              }
              throw new HttpException('Invalid event', HttpStatus.BAD_REQUEST);
            case 1:
              // Broadcast to all websocket clients
              try {
                wsBroadcast.broadcast(body);
              } catch (e) {
                console.warn('WS broadcast failed', e.message || e);
              }
              return _context21.a(2, {
                ok: true
              });
            case 2:
              _context21.p = 2;
              _t22 = _context21.v;
              throw new HttpException(_t22.message || 'Failed', _t22.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context21.a(2);
          }
        }, _callee21, null, [[0, 2]]);
      }));
      function internalEvent(_x23) {
        return _internalEvent.apply(this, arguments);
      }
      return internalEvent;
    }() // ==================== PAYMENT ENDPOINTS ====================
  }, {
    key: "initiatePayment",
    value: function () {
      var _initiatePayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(paymentDto) {
        var _t23;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              _context22.n = 1;
              return this.gatewayService.initiatePayment(paymentDto);
            case 1:
              return _context22.a(2, _context22.v);
            case 2:
              _context22.p = 2;
              _t23 = _context22.v;
              throw new HttpException(_t23.message, _t23.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 2]]);
      }));
      function initiatePayment(_x24) {
        return _initiatePayment.apply(this, arguments);
      }
      return initiatePayment;
    }()
  }, {
    key: "sepayWebhookHealthCheck",
    value: function () {
      var _sepayWebhookHealthCheck = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              return _context23.a(2, {
                success: true,
                message: 'OK'
              });
          }
        }, _callee23);
      }));
      function sepayWebhookHealthCheck() {
        return _sepayWebhookHealthCheck.apply(this, arguments);
      }
      return sepayWebhookHealthCheck;
    }()
  }, {
    key: "getPayment",
    value: function () {
      var _getPayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(id) {
        var _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              _context24.p = 0;
              _context24.n = 1;
              return this.gatewayService.getPayment(id);
            case 1:
              return _context24.a(2, _context24.v);
            case 2:
              _context24.p = 2;
              _t24 = _context24.v;
              throw new HttpException(_t24.message, _t24.status || HttpStatus.NOT_FOUND);
            case 3:
              return _context24.a(2);
          }
        }, _callee24, this, [[0, 2]]);
      }));
      function getPayment(_x25) {
        return _getPayment.apply(this, arguments);
      }
      return getPayment;
    }()
  }, {
    key: "getPaymentByOrder",
    value: function () {
      var _getPaymentByOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(orderId) {
        var _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              _context25.p = 0;
              _context25.n = 1;
              return this.gatewayService.getPaymentByOrderId(orderId);
            case 1:
              return _context25.a(2, _context25.v);
            case 2:
              _context25.p = 2;
              _t25 = _context25.v;
              throw new HttpException(_t25.message, _t25.status || HttpStatus.NOT_FOUND);
            case 3:
              return _context25.a(2);
          }
        }, _callee25, this, [[0, 2]]);
      }));
      function getPaymentByOrder(_x26) {
        return _getPaymentByOrder.apply(this, arguments);
      }
      return getPaymentByOrder;
    }()
  }, {
    key: "handlePaymentCallback",
    value: function () {
      var _handlePaymentCallback = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(id, callbackData) {
        var _t26;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              _context26.p = 0;
              _context26.n = 1;
              return this.gatewayService.handlePaymentCallback(id, callbackData);
            case 1:
              return _context26.a(2, _context26.v);
            case 2:
              _context26.p = 2;
              _t26 = _context26.v;
              throw new HttpException(_t26.message, _t26.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context26.a(2);
          }
        }, _callee26, this, [[0, 2]]);
      }));
      function handlePaymentCallback(_x27, _x28) {
        return _handlePaymentCallback.apply(this, arguments);
      }
      return handlePaymentCallback;
    }()
  }, {
    key: "handleSepayWebhook",
    value: function () {
      var _handleSepayWebhook = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(callbackData, authorization) {
        var _t27;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.p = _context27.n) {
            case 0:
              _context27.p = 0;
              _context27.n = 1;
              return this.gatewayService.handleSepayWebhook(callbackData, authorization);
            case 1:
              return _context27.a(2, _context27.v);
            case 2:
              _context27.p = 2;
              _t27 = _context27.v;
              throw new HttpException(_t27.message, _t27.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context27.a(2);
          }
        }, _callee27, this, [[0, 2]]);
      }));
      function handleSepayWebhook(_x29, _x30) {
        return _handleSepayWebhook.apply(this, arguments);
      }
      return handleSepayWebhook;
    }()
  }, {
    key: "retryPayment",
    value: function () {
      var _retryPayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(id) {
        var _t28;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.p = _context28.n) {
            case 0:
              _context28.p = 0;
              _context28.n = 1;
              return this.gatewayService.retryPayment(id);
            case 1:
              return _context28.a(2, _context28.v);
            case 2:
              _context28.p = 2;
              _t28 = _context28.v;
              throw new HttpException(_t28.message, _t28.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context28.a(2);
          }
        }, _callee28, this, [[0, 2]]);
      }));
      function retryPayment(_x31) {
        return _retryPayment.apply(this, arguments);
      }
      return retryPayment;
    }()
  }, {
    key: "refundPayment",
    value: function () {
      var _refundPayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(id, body) {
        var _t29;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.p = _context29.n) {
            case 0:
              _context29.p = 0;
              _context29.n = 1;
              return this.gatewayService.refundPayment(id, body.reason);
            case 1:
              return _context29.a(2, _context29.v);
            case 2:
              _context29.p = 2;
              _t29 = _context29.v;
              throw new HttpException(_t29.message, _t29.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context29.a(2);
          }
        }, _callee29, this, [[0, 2]]);
      }));
      function refundPayment(_x32, _x33) {
        return _refundPayment.apply(this, arguments);
      }
      return refundPayment;
    }() // ==================== DELIVERY ENDPOINTS ====================
  }, {
    key: "getDelivery",
    value: function () {
      var _getDelivery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(id) {
        var _t30;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.p = _context30.n) {
            case 0:
              _context30.p = 0;
              _context30.n = 1;
              return this.gatewayService.getDelivery(id);
            case 1:
              return _context30.a(2, _context30.v);
            case 2:
              _context30.p = 2;
              _t30 = _context30.v;
              throw new HttpException(_t30.message, _t30.status || HttpStatus.NOT_FOUND);
            case 3:
              return _context30.a(2);
          }
        }, _callee30, this, [[0, 2]]);
      }));
      function getDelivery(_x34) {
        return _getDelivery.apply(this, arguments);
      }
      return getDelivery;
    }()
  }, {
    key: "getDeliveryByOrder",
    value: function () {
      var _getDeliveryByOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(orderId) {
        var _t31;
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.p = _context31.n) {
            case 0:
              _context31.p = 0;
              _context31.n = 1;
              return this.gatewayService.getDeliveryByOrder(orderId);
            case 1:
              return _context31.a(2, _context31.v);
            case 2:
              _context31.p = 2;
              _t31 = _context31.v;
              throw new HttpException(_t31.message, _t31.status || HttpStatus.NOT_FOUND);
            case 3:
              return _context31.a(2);
          }
        }, _callee31, this, [[0, 2]]);
      }));
      function getDeliveryByOrder(_x35) {
        return _getDeliveryByOrder.apply(this, arguments);
      }
      return getDeliveryByOrder;
    }() // Driver: list available deliveries
  }, {
    key: "getAvailableDeliveries",
    value: function () {
      var _getAvailableDeliveries = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32() {
        var _t32;
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.p = _context32.n) {
            case 0:
              _context32.p = 0;
              _context32.n = 1;
              return this.gatewayService.getAvailableDeliveries();
            case 1:
              return _context32.a(2, _context32.v);
            case 2:
              _context32.p = 2;
              _t32 = _context32.v;
              throw new HttpException(_t32.message, _t32.status || HttpStatus.INTERNAL_SERVER_ERROR);
            case 3:
              return _context32.a(2);
          }
        }, _callee32, this, [[0, 2]]);
      }));
      function getAvailableDeliveries() {
        return _getAvailableDeliveries.apply(this, arguments);
      }
      return getAvailableDeliveries;
    }() // Driver: get own history by token -> resolve profile then forward
  }, {
    key: "getDriverHistoryByToken",
    value: function () {
      var _getDriverHistoryByToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(authHeader) {
        var token, profile, driverId, _t33;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.p = _context33.n) {
            case 0:
              token = authHeader && authHeader.replace('Bearer ', '');
              if (token) {
                _context33.n = 1;
                break;
              }
              throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
            case 1:
              _context33.p = 1;
              _context33.n = 2;
              return this.gatewayService.getProfileByToken(token);
            case 2:
              profile = _context33.v;
              driverId = profile && (profile._id || profile.id);
              if (!(!driverId || profile.userType !== 'DRIVER')) {
                _context33.n = 3;
                break;
              }
              throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            case 3:
              _context33.n = 4;
              return this.gatewayService.getDriverHistory(driverId);
            case 4:
              return _context33.a(2, _context33.v);
            case 5:
              _context33.p = 5;
              _t33 = _context33.v;
              throw new HttpException(_t33.message || 'Failed', _t33.status || HttpStatus.BAD_REQUEST);
            case 6:
              return _context33.a(2);
          }
        }, _callee33, this, [[1, 5]]);
      }));
      function getDriverHistoryByToken(_x36) {
        return _getDriverHistoryByToken.apply(this, arguments);
      }
      return getDriverHistoryByToken;
    }() // Driver actions (token-based): accept/arrive/pick/complete
  }, {
    key: "acceptDelivery",
    value: function () {
      var _acceptDelivery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(id, authHeader) {
        var token, profile, driverId, _t34;
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.p = _context34.n) {
            case 0:
              token = authHeader && authHeader.replace('Bearer ', '');
              if (token) {
                _context34.n = 1;
                break;
              }
              throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
            case 1:
              _context34.p = 1;
              _context34.n = 2;
              return this.gatewayService.getProfileByToken(token);
            case 2:
              profile = _context34.v;
              driverId = profile && (profile._id || profile.id);
              if (!(!driverId || profile.userType !== 'DRIVER')) {
                _context34.n = 3;
                break;
              }
              throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            case 3:
              _context34.n = 4;
              return this.gatewayService.assignDelivery(id, driverId);
            case 4:
              return _context34.a(2, _context34.v);
            case 5:
              _context34.p = 5;
              _t34 = _context34.v;
              throw new HttpException(_t34.message || 'Failed to accept', _t34.status || HttpStatus.BAD_REQUEST);
            case 6:
              return _context34.a(2);
          }
        }, _callee34, this, [[1, 5]]);
      }));
      function acceptDelivery(_x37, _x38) {
        return _acceptDelivery.apply(this, arguments);
      }
      return acceptDelivery;
    }()
  }, {
    key: "arrivedDelivery",
    value: function () {
      var _arrivedDelivery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(id, authHeader) {
        var token, profile, _t35;
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.p = _context35.n) {
            case 0:
              token = authHeader && authHeader.replace('Bearer ', '');
              if (token) {
                _context35.n = 1;
                break;
              }
              throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
            case 1:
              _context35.p = 1;
              _context35.n = 2;
              return this.gatewayService.getProfileByToken(token);
            case 2:
              profile = _context35.v;
              if (!(!profile || profile.userType !== 'DRIVER')) {
                _context35.n = 3;
                break;
              }
              throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            case 3:
              _context35.n = 4;
              return this.gatewayService.markArrived(id);
            case 4:
              return _context35.a(2, _context35.v);
            case 5:
              _context35.p = 5;
              _t35 = _context35.v;
              throw new HttpException(_t35.message || 'Failed', _t35.status || HttpStatus.BAD_REQUEST);
            case 6:
              return _context35.a(2);
          }
        }, _callee35, this, [[1, 5]]);
      }));
      function arrivedDelivery(_x39, _x40) {
        return _arrivedDelivery.apply(this, arguments);
      }
      return arrivedDelivery;
    }()
  }, {
    key: "pickedDelivery",
    value: function () {
      var _pickedDelivery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(id, authHeader) {
        var token, profile, _t36;
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.p = _context36.n) {
            case 0:
              token = authHeader && authHeader.replace('Bearer ', '');
              if (token) {
                _context36.n = 1;
                break;
              }
              throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
            case 1:
              _context36.p = 1;
              _context36.n = 2;
              return this.gatewayService.getProfileByToken(token);
            case 2:
              profile = _context36.v;
              if (!(!profile || profile.userType !== 'DRIVER')) {
                _context36.n = 3;
                break;
              }
              throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            case 3:
              _context36.n = 4;
              return this.gatewayService.markPicked(id);
            case 4:
              return _context36.a(2, _context36.v);
            case 5:
              _context36.p = 5;
              _t36 = _context36.v;
              throw new HttpException(_t36.message || 'Failed', _t36.status || HttpStatus.BAD_REQUEST);
            case 6:
              return _context36.a(2);
          }
        }, _callee36, this, [[1, 5]]);
      }));
      function pickedDelivery(_x41, _x42) {
        return _pickedDelivery.apply(this, arguments);
      }
      return pickedDelivery;
    }()
  }, {
    key: "completeDelivery",
    value: function () {
      var _completeDelivery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37(id, authHeader) {
        var token, profile, _t37;
        return _regenerator().w(function (_context37) {
          while (1) switch (_context37.p = _context37.n) {
            case 0:
              token = authHeader && authHeader.replace('Bearer ', '');
              if (token) {
                _context37.n = 1;
                break;
              }
              throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
            case 1:
              _context37.p = 1;
              _context37.n = 2;
              return this.gatewayService.getProfileByToken(token);
            case 2:
              profile = _context37.v;
              if (!(!profile || profile.userType !== 'DRIVER')) {
                _context37.n = 3;
                break;
              }
              throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            case 3:
              _context37.n = 4;
              return this.gatewayService.completeDeliveryRequest(id);
            case 4:
              return _context37.a(2, _context37.v);
            case 5:
              _context37.p = 5;
              _t37 = _context37.v;
              throw new HttpException(_t37.message || 'Failed', _t37.status || HttpStatus.BAD_REQUEST);
            case 6:
              return _context37.a(2);
          }
        }, _callee37, this, [[1, 5]]);
      }));
      function completeDelivery(_x43, _x44) {
        return _completeDelivery.apply(this, arguments);
      }
      return completeDelivery;
    }()
  }, {
    key: "startDelivery",
    value: function () {
      var _startDelivery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38(id, data) {
        var _t38;
        return _regenerator().w(function (_context38) {
          while (1) switch (_context38.p = _context38.n) {
            case 0:
              _context38.p = 0;
              _context38.n = 1;
              return this.gatewayService.startDelivery(id, data);
            case 1:
              return _context38.a(2, _context38.v);
            case 2:
              _context38.p = 2;
              _t38 = _context38.v;
              throw new HttpException(_t38.message, _t38.status || HttpStatus.BAD_REQUEST);
            case 3:
              return _context38.a(2);
          }
        }, _callee38, this, [[0, 2]]);
      }));
      function startDelivery(_x45, _x46) {
        return _startDelivery.apply(this, arguments);
      }
      return startDelivery;
    }()
  }]);
}(), _applyDecoratedDescriptor(_class2.prototype, "register", [_dec5, _dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "register"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "login", [_dec9, _dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "login"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "verifyEmail", [_dec11, _dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "verifyEmail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "verifyToken", [_dec15, _dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "verifyToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getProfileByToken", [_dec19, _dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileByToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getProfile", [_dec23, _dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfile"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateProfile", [_dec27, _dec28, _dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "updateProfile"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRestaurants", [_dec32, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "getRestaurants"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getAllMenuItems", [_dec35, _dec36, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "getAllMenuItems"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRestaurantById", [_dec39, _dec40, _dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "getRestaurantById"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchRestaurants", [_dec43, _dec44, _dec45, _dec46], Object.getOwnPropertyDescriptor(_class2.prototype, "searchRestaurants"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRestaurantMenu", [_dec47, _dec48, _dec49, _dec50], Object.getOwnPropertyDescriptor(_class2.prototype, "getRestaurantMenu"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addMenuItem", [_dec51, _dec52, _dec53, _dec54, _dec55], Object.getOwnPropertyDescriptor(_class2.prototype, "addMenuItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createRestaurant", [_dec56, _dec57, _dec58, _dec59], Object.getOwnPropertyDescriptor(_class2.prototype, "createRestaurant"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRestaurantsAdmin", [_dec60, _dec61, _dec62], Object.getOwnPropertyDescriptor(_class2.prototype, "getRestaurantsAdmin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleRestaurantStatus", [_dec63, _dec64, _dec65, _dec66, _dec67], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleRestaurantStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createOrder", [_dec68, _dec69, _dec70, _dec71], Object.getOwnPropertyDescriptor(_class2.prototype, "createOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getCustomerOrdersByToken", [_dec72, _dec73, _dec74, _dec75], Object.getOwnPropertyDescriptor(_class2.prototype, "getCustomerOrdersByToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getOrder", [_dec76, _dec77, _dec78, _dec79], Object.getOwnPropertyDescriptor(_class2.prototype, "getOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getCustomerOrders", [_dec80, _dec81, _dec82, _dec83], Object.getOwnPropertyDescriptor(_class2.prototype, "getCustomerOrders"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "confirmOrder", [_dec84, _dec85, _dec86, _dec87], Object.getOwnPropertyDescriptor(_class2.prototype, "confirmOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getCustomerOrdersByToken", [_dec88, _dec89, _dec90, _dec91], Object.getOwnPropertyDescriptor(_class2.prototype, "getCustomerOrdersByToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cancelOrder", [_dec92, _dec93, _dec94, _dec95, _dec96], Object.getOwnPropertyDescriptor(_class2.prototype, "cancelOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "internalEvent", [_dec97, _dec98, _dec99, _dec100], Object.getOwnPropertyDescriptor(_class2.prototype, "internalEvent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initiatePayment", [_dec101, _dec102, _dec103, _dec104], Object.getOwnPropertyDescriptor(_class2.prototype, "initiatePayment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sepayWebhookHealthCheck", [_dec105, _dec106, _dec107], Object.getOwnPropertyDescriptor(_class2.prototype, "sepayWebhookHealthCheck"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPayment", [_dec108, _dec109, _dec110, _dec111], Object.getOwnPropertyDescriptor(_class2.prototype, "getPayment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPaymentByOrder", [_dec112, _dec113, _dec114, _dec115], Object.getOwnPropertyDescriptor(_class2.prototype, "getPaymentByOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handlePaymentCallback", [_dec116, _dec117, _dec118, _dec119, _dec120], Object.getOwnPropertyDescriptor(_class2.prototype, "handlePaymentCallback"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleSepayWebhook", [_dec121, _dec122, _dec123, _dec124, _dec125], Object.getOwnPropertyDescriptor(_class2.prototype, "handleSepayWebhook"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "retryPayment", [_dec126, _dec127, _dec128, _dec129], Object.getOwnPropertyDescriptor(_class2.prototype, "retryPayment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refundPayment", [_dec130, _dec131, _dec132, _dec133, _dec134], Object.getOwnPropertyDescriptor(_class2.prototype, "refundPayment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getDelivery", [_dec135, _dec136, _dec137, _dec138], Object.getOwnPropertyDescriptor(_class2.prototype, "getDelivery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getDeliveryByOrder", [_dec139, _dec140, _dec141, _dec142], Object.getOwnPropertyDescriptor(_class2.prototype, "getDeliveryByOrder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getAvailableDeliveries", [_dec143, _dec144, _dec145], Object.getOwnPropertyDescriptor(_class2.prototype, "getAvailableDeliveries"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getDriverHistoryByToken", [_dec146, _dec147, _dec148, _dec149], Object.getOwnPropertyDescriptor(_class2.prototype, "getDriverHistoryByToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "acceptDelivery", [_dec150, _dec151, _dec152, _dec153, _dec154], Object.getOwnPropertyDescriptor(_class2.prototype, "acceptDelivery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "arrivedDelivery", [_dec155, _dec156, _dec157, _dec158, _dec159], Object.getOwnPropertyDescriptor(_class2.prototype, "arrivedDelivery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pickedDelivery", [_dec160, _dec161, _dec162, _dec163, _dec164], Object.getOwnPropertyDescriptor(_class2.prototype, "pickedDelivery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completeDelivery", [_dec165, _dec166, _dec167, _dec168, _dec169], Object.getOwnPropertyDescriptor(_class2.prototype, "completeDelivery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startDelivery", [_dec170, _dec171, _dec172, _dec173, _dec174], Object.getOwnPropertyDescriptor(_class2.prototype, "startDelivery"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
module.exports = {
  GatewayController: GatewayController
};
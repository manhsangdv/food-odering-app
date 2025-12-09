"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _class, _class2;
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
  Post = _require.Post,
  Get = _require.Get,
  Patch = _require.Patch,
  Body = _require.Body,
  Param = _require.Param,
  Headers = _require.Headers,
  HttpException = _require.HttpException,
  HttpStatus = _require.HttpStatus,
  Inject = _require.Inject;
var _require2 = require('./user.service'),
  UserService = _require2.UserService;
var UserController = (_dec = Controller('api/auth'), _dec2 = function _dec2(target, key) {
  return Inject(UserService)(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [void 0]), _dec5 = Post('register'), _dec6 = function _dec6(target, key) {
  return Body()(target, key, 0);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [void 0]), _dec9 = Post('login'), _dec0 = function _dec0(target, key) {
  return Body()(target, key, 0);
}, _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [void 0]), _dec11 = Get('profile'), _dec12 = function _dec12(target, key) {
  return Headers('authorization')(target, key, 0);
}, _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [void 0]), _dec15 = Post('verify-email'), _dec16 = function _dec16(target, key) {
  return Body()(target, key, 0);
}, _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [void 0]), _dec19 = Post('verify-token'), _dec20 = function _dec20(target, key) {
  return Headers('authorization')(target, key, 0);
}, _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [void 0]), _dec23 = Get('profile/:id'), _dec24 = function _dec24(target, key) {
  return Param('id')(target, key, 0);
}, _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [void 0]), _dec27 = Patch('profile/:id'), _dec28 = function _dec28(target, key) {
  return Param('id')(target, key, 0);
}, _dec29 = function _dec29(target, key) {
  return Body()(target, key, 1);
}, _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec32 = Patch('change-password/:id'), _dec33 = function _dec33(target, key) {
  return Param('id')(target, key, 0);
}, _dec34 = function _dec34(target, key) {
  return Body()(target, key, 1);
}, _dec35 = Reflect.metadata("design:type", Function), _dec36 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function () {
  function UserController(userService) {
    _classCallCheck(this, UserController);
    this.userService = userService;
  }

  // --- 1. Đăng ký ---
  return _createClass(UserController, [{
    key: "register",
    value: function () {
      var _register = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(registerDto) {
        var user, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!(!registerDto.email || !registerDto.password)) {
                _context.n = 1;
                break;
              }
              throw new HttpException('Email and password required', HttpStatus.BAD_REQUEST);
            case 1:
              _context.p = 1;
              _context.n = 2;
              return this.userService.register(registerDto);
            case 2:
              user = _context.v;
              return _context.a(2, {
                message: 'Registration successful. Please verify your email.',
                userId: user._id
              });
            case 3:
              _context.p = 3;
              _t = _context.v;
              throw new HttpException(_t.message, HttpStatus.BAD_REQUEST);
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function register(_x) {
        return _register.apply(this, arguments);
      }
      return register;
    }() // --- 2. Đăng nhập ---
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(loginDto) {
        var email, password, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              email = loginDto.email, password = loginDto.password;
              if (!(!email || !password)) {
                _context2.n = 1;
                break;
              }
              throw new HttpException('Email and password required', HttpStatus.BAD_REQUEST);
            case 1:
              _context2.p = 1;
              _context2.n = 2;
              return this.userService.login(email, password);
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new HttpException(_t2.message, HttpStatus.UNAUTHORIZED);
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function login(_x2) {
        return _login.apply(this, arguments);
      }
      return login;
    }() // --- 3. [MỚI] Lấy thông tin Profile từ Token (Fix lỗi Reload) ---
  }, {
    key: "getProfileViaToken",
    value: function () {
      var _getProfileViaToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(authHeader) {
        var token, decoded, user, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (authHeader) {
                _context3.n = 1;
                break;
              }
              throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
            case 1:
              // 2. Lấy token (Bỏ chữ 'Bearer ')
              token = authHeader.replace('Bearer ', '');
              _context3.p = 2;
              _context3.n = 3;
              return this.userService.verifyToken(token);
            case 3:
              decoded = _context3.v;
              _context3.n = 4;
              return this.userService.getUserById(decoded.id);
            case 4:
              user = _context3.v;
              if (user) {
                _context3.n = 5;
                break;
              }
              throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            case 5:
              return _context3.a(2, user);
            case 6:
              _context3.p = 6;
              _t3 = _context3.v;
              throw new HttpException('Invalid or Expired Token', HttpStatus.UNAUTHORIZED);
            case 7:
              return _context3.a(2);
          }
        }, _callee3, this, [[2, 6]]);
      }));
      function getProfileViaToken(_x3) {
        return _getProfileViaToken.apply(this, arguments);
      }
      return getProfileViaToken;
    }() // --- Các hàm cũ giữ nguyên ---
  }, {
    key: "verifyEmail",
    value: function () {
      var _verifyEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(body) {
        var email, token, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              email = body.email, token = body.token;
              if (!(!email || !token)) {
                _context4.n = 1;
                break;
              }
              throw new HttpException('Email and token required', HttpStatus.BAD_REQUEST);
            case 1:
              _context4.p = 1;
              _context4.n = 2;
              return this.userService.verifyEmail(email, token);
            case 2:
              return _context4.a(2, {
                message: 'Email verified successfully'
              });
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new HttpException(_t4.message, HttpStatus.BAD_REQUEST);
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function verifyEmail(_x4) {
        return _verifyEmail.apply(this, arguments);
      }
      return verifyEmail;
    }()
  }, {
    key: "verifyToken",
    value: function () {
      var _verifyToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(authHeader) {
        var token, decoded, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.replace('Bearer ', '');
              if (token) {
                _context5.n = 1;
                break;
              }
              throw new HttpException('Token required', HttpStatus.BAD_REQUEST);
            case 1:
              _context5.p = 1;
              _context5.n = 2;
              return this.userService.verifyToken(token);
            case 2:
              decoded = _context5.v;
              return _context5.a(2, {
                valid: true,
                user: decoded
              });
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function verifyToken(_x5) {
        return _verifyToken.apply(this, arguments);
      }
      return verifyToken;
    }() // Hàm cũ (lấy theo ID trên URL) - Có thể giữ lại hoặc không
  }, {
    key: "getProfileById",
    value: function () {
      var _getProfileById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(id) {
        var user;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this.userService.getUserById(id);
            case 1:
              user = _context6.v;
              if (user) {
                _context6.n = 2;
                break;
              }
              throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            case 2:
              return _context6.a(2, user);
          }
        }, _callee6, this);
      }));
      function getProfileById(_x6) {
        return _getProfileById.apply(this, arguments);
      }
      return getProfileById;
    }()
  }, {
    key: "updateProfile",
    value: function () {
      var _updateProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(id, updateDto) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              return _context7.a(2, this.userService.updateProfile(id, updateDto));
          }
        }, _callee7, this);
      }));
      function updateProfile(_x7, _x8) {
        return _updateProfile.apply(this, arguments);
      }
      return updateProfile;
    }()
  }, {
    key: "changePassword",
    value: function () {
      var _changePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(id, body) {
        var oldPassword, newPassword, _t6;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              oldPassword = body.oldPassword, newPassword = body.newPassword;
              if (!(!oldPassword || !newPassword)) {
                _context8.n = 1;
                break;
              }
              throw new HttpException('Old and new passwords required', HttpStatus.BAD_REQUEST);
            case 1:
              _context8.p = 1;
              _context8.n = 2;
              return this.userService.changePassword(id, oldPassword, newPassword);
            case 2:
              return _context8.a(2, {
                message: 'Password changed successfully'
              });
            case 3:
              _context8.p = 3;
              _t6 = _context8.v;
              throw new HttpException(_t6.message, HttpStatus.BAD_REQUEST);
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function changePassword(_x9, _x0) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }()
  }]);
}(), _applyDecoratedDescriptor(_class2.prototype, "register", [_dec5, _dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "register"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "login", [_dec9, _dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "login"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getProfileViaToken", [_dec11, _dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileViaToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "verifyEmail", [_dec15, _dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "verifyEmail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "verifyToken", [_dec19, _dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "verifyToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getProfileById", [_dec23, _dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileById"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateProfile", [_dec27, _dec28, _dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "updateProfile"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changePassword", [_dec32, _dec33, _dec34, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "changePassword"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
module.exports = {
  UserController: UserController
};
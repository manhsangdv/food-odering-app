"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('@nestjs/common'),
  Injectable = _require.Injectable,
  Inject = _require.Inject;
var _require2 = require('@nestjs/jwt'),
  JwtService = _require2.JwtService;
var _require3 = require('@nestjs/mongoose'),
  InjectModel = _require3.InjectModel;
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var UserService = (_dec = Injectable(), _dec2 = function _dec2(target, key) {
  return InjectModel('User')(target, undefined, 0);
}, _dec3 = function _dec3(target, key) {
  return Inject(JwtService)(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [void 0, void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = /*#__PURE__*/function () {
  function UserService(userModel, jwtService) {
    _classCallCheck(this, UserService);
    this.UserModel = userModel;
    this.jwtService = jwtService;
  }
  return _createClass(UserService, [{
    key: "hashPassword",
    value: function () {
      var _hashPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(password) {
        var salt;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return bcrypt.genSalt(10);
            case 1:
              salt = _context.v;
              return _context.a(2, bcrypt.hash(password, salt));
          }
        }, _callee);
      }));
      function hashPassword(_x) {
        return _hashPassword.apply(this, arguments);
      }
      return hashPassword;
    }()
  }, {
    key: "verifyPassword",
    value: function () {
      var _verifyPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(password, hashedPassword) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2, bcrypt.compare(password, hashedPassword));
          }
        }, _callee2);
      }));
      function verifyPassword(_x2, _x3) {
        return _verifyPassword.apply(this, arguments);
      }
      return verifyPassword;
    }()
  }, {
    key: "register",
    value: function () {
      var _register = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(registerDto) {
        var email, password, firstName, lastName, userType, existingUser, hashedPassword, verificationToken, user;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              email = registerDto.email, password = registerDto.password, firstName = registerDto.firstName, lastName = registerDto.lastName, userType = registerDto.userType; // Check if user exists
              _context3.n = 1;
              return this.UserModel.findOne({
                email: email
              }).exec();
            case 1:
              existingUser = _context3.v;
              if (!existingUser) {
                _context3.n = 2;
                break;
              }
              throw new Error('Email already registered');
            case 2:
              _context3.n = 3;
              return this.hashPassword(password);
            case 3:
              hashedPassword = _context3.v;
              verificationToken = crypto.randomBytes(32).toString('hex');
              user = new this.UserModel({
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                userType: userType || 'CUSTOMER',
                verificationToken: verificationToken,
                isActive: true
              });
              return _context3.a(2, user.save());
          }
        }, _callee3, this);
      }));
      function register(_x4) {
        return _register.apply(this, arguments);
      }
      return register;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(email, password) {
        var user, isPasswordValid, token;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.UserModel.findOne({
                email: email
              }).exec();
            case 1:
              user = _context4.v;
              if (user) {
                _context4.n = 2;
                break;
              }
              throw new Error('User not found');
            case 2:
              _context4.n = 3;
              return this.verifyPassword(password, user.password);
            case 3:
              isPasswordValid = _context4.v;
              if (isPasswordValid) {
                _context4.n = 4;
                break;
              }
              throw new Error('Invalid password');
            case 4:
              if (user.isActive) {
                _context4.n = 5;
                break;
              }
              throw new Error('User account is inactive');
            case 5:
              // Generate JWT token
              token = this.jwtService.sign({
                id: user._id,
                email: user.email,
                userType: user.userType
              }); // Update last login
              _context4.n = 6;
              return this.UserModel.findByIdAndUpdate(user._id, {
                lastLoginAt: new Date()
              }).exec();
            case 6:
              return _context4.a(2, {
                token: token,
                user: {
                  id: user._id,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  userType: user.userType,
                  restaurantId: user.restaurantId
                }
              });
          }
        }, _callee4, this);
      }));
      function login(_x5, _x6) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "verifyEmail",
    value: function () {
      var _verifyEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(email, token) {
        var user;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this.UserModel.findOne({
                email: email,
                verificationToken: token
              }).exec();
            case 1:
              user = _context5.v;
              if (user) {
                _context5.n = 2;
                break;
              }
              throw new Error('Invalid verification token');
            case 2:
              user.isVerified = true;
              user.verificationToken = null;
              return _context5.a(2, user.save());
          }
        }, _callee5, this);
      }));
      function verifyEmail(_x7, _x8) {
        return _verifyEmail.apply(this, arguments);
      }
      return verifyEmail;
    }()
  }, {
    key: "getUserById",
    value: function () {
      var _getUserById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(id) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              return _context6.a(2, this.UserModel.findById(id).select('-password').exec());
          }
        }, _callee6, this);
      }));
      function getUserById(_x9) {
        return _getUserById.apply(this, arguments);
      }
      return getUserById;
    }()
  }, {
    key: "updateProfile",
    value: function () {
      var _updateProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(id, updateDto) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              return _context7.a(2, this.UserModel.findByIdAndUpdate(id, _objectSpread(_objectSpread({}, updateDto), {}, {
                updatedAt: new Date()
              }), {
                "new": true
              }).select('-password').exec());
          }
        }, _callee7, this);
      }));
      function updateProfile(_x0, _x1) {
        return _updateProfile.apply(this, arguments);
      }
      return updateProfile;
    }()
  }, {
    key: "changePassword",
    value: function () {
      var _changePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(id, oldPassword, newPassword) {
        var user, isPasswordValid;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _context8.n = 1;
              return this.UserModel.findById(id).exec();
            case 1:
              user = _context8.v;
              if (user) {
                _context8.n = 2;
                break;
              }
              throw new Error('User not found');
            case 2:
              _context8.n = 3;
              return this.verifyPassword(oldPassword, user.password);
            case 3:
              isPasswordValid = _context8.v;
              if (isPasswordValid) {
                _context8.n = 4;
                break;
              }
              throw new Error('Old password is incorrect');
            case 4:
              _context8.n = 5;
              return this.hashPassword(newPassword);
            case 5:
              user.password = _context8.v;
              return _context8.a(2, user.save());
          }
        }, _callee8, this);
      }));
      function changePassword(_x10, _x11, _x12) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }()
  }, {
    key: "verifyToken",
    value: function () {
      var _verifyToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(token) {
        var _t;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              return _context9.a(2, this.jwtService.verify(token));
            case 1:
              _context9.p = 1;
              _t = _context9.v;
              throw new Error('Invalid token');
            case 2:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 1]]);
      }));
      function verifyToken(_x13) {
        return _verifyToken.apply(this, arguments);
      }
      return verifyToken;
    }()
  }, {
    key: "getUsersByType",
    value: function () {
      var _getUsersByType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(userType) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              return _context0.a(2, this.UserModel.find({
                userType: userType
              }).select('-password').exec());
          }
        }, _callee0, this);
      }));
      function getUsersByType(_x14) {
        return _getUsersByType.apply(this, arguments);
      }
      return getUsersByType;
    }()
  }, {
    key: "toggleUserStatus",
    value: function () {
      var _toggleUserStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(id, isActive) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              return _context1.a(2, this.UserModel.findByIdAndUpdate(id, {
                isActive: isActive,
                updatedAt: new Date()
              }, {
                "new": true
              }).select('-password').exec());
          }
        }, _callee1, this);
      }));
      function toggleUserStatus(_x15, _x16) {
        return _toggleUserStatus.apply(this, arguments);
      }
      return toggleUserStatus;
    }()
  }]);
}()) || _class) || _class) || _class) || _class) || _class);
module.exports = {
  UserService: UserService
};
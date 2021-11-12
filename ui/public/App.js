"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function DisplayHomePage() {
  return /*#__PURE__*/React.createElement("div", null, "Welcome to the waitlist tracker.");
}

function DisplayFreeSlots(props) {
  var length = props.waitlist.length;

  if (length < 25) {
    return /*#__PURE__*/React.createElement("div", null, "Current slots filled: ", length, " / 25");
  }

  return /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'red'
    }
  }, "Current slots filled: ", length, " / 25. Fully filled. Remove some customers. ");
}

function WaitRow(props) {
  var entry = props.entry;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, entry.id), /*#__PURE__*/React.createElement("td", null, entry.name), /*#__PURE__*/React.createElement("td", null, entry.number), /*#__PURE__*/React.createElement("td", null, entry.created.toDateString()));
}

function DisplayCustomers(props) {
  var waitRows = props.waitlist.map(function (entry) {
    return /*#__PURE__*/React.createElement(WaitRow, {
      key: entry.id,
      entry: entry
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Mobile Number"), /*#__PURE__*/React.createElement("th", null, "Date"))), /*#__PURE__*/React.createElement("tbody", null, waitRows));
}

var AddingCustomer = /*#__PURE__*/function (_React$Component) {
  _inherits(AddingCustomer, _React$Component);

  var _super = _createSuper(AddingCustomer);

  function AddingCustomer() {
    var _this;

    _classCallCheck(this, AddingCustomer);

    _this = _super.call(this);
    _this.handleAddCust = _this.handleAddCust.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddingCustomer, [{
    key: "handleAddCust",
    value: function handleAddCust(e) {
      e.preventDefault();
      var form = document.forms.addCustomer;
      var customer = {
        name: form.name.value,
        number: form.number.value
      };
      this.props.addCustomer(customer);
      form.name.value = '';
      form.number.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "addCustomer",
        onSubmit: this.handleAddCust
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Name"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "number",
        placeholder: "Mobile Number"
      }), /*#__PURE__*/React.createElement("button", null, "Add"));
    }
  }]);

  return AddingCustomer;
}(React.Component);

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            variables = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            _context4.prev = 1;
            _context4.next = 4;
            return fetch('http://localhost:5000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context4.sent;
            _context4.next = 7;
            return response.text();

          case 7:
            body = _context4.sent;
            result = JSON.parse(body, jsonDateReviver);

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code == 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n ');
                alert("".concat(error.message, ":\n ").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context4.abrupt("return", result.data);

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](1);
            alert("Error in sending data to server: ".concat(_context4.t0.message));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var DeleteCustomer = /*#__PURE__*/function (_React$Component2) {
  _inherits(DeleteCustomer, _React$Component2);

  var _super2 = _createSuper(DeleteCustomer);

  function DeleteCustomer() {
    var _this2;

    _classCallCheck(this, DeleteCustomer);

    _this2 = _super2.call(this);
    _this2.handleRmCust = _this2.handleRmCust.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(DeleteCustomer, [{
    key: "handleRmCust",
    value: function handleRmCust(e) {
      e.preventDefault();
      var form = document.forms.removeCustomer;
      var id = form.id.value;
      this.props.deleteCustomer(id);
      form.id.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "removeCustomer",
        onSubmit: this.handleRmCust
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "id",
        placeholder: "ID"
      }), /*#__PURE__*/React.createElement("button", null, "Remove"));
    }
  }]);

  return DeleteCustomer;
}(React.Component);

var HotelWaitlist = /*#__PURE__*/function (_React$Component3) {
  _inherits(HotelWaitlist, _React$Component3);

  var _super3 = _createSuper(HotelWaitlist);

  function HotelWaitlist() {
    var _this3;

    _classCallCheck(this, HotelWaitlist);

    _this3 = _super3.call(this);
    _this3.state = {
      waitlist: []
    };
    _this3.addCustomer = _this3.addCustomer.bind(_assertThisInitialized(_this3));
    _this3.deleteCustomer = _this3.deleteCustomer.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(HotelWaitlist, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n        custList {\n          id name number created\n        }\n      }";
                _context.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context.sent;

                if (data) {
                  this.setState({
                    waitlist: data.custList
                  });
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "addCustomer",
    value: function () {
      var _addCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(customer) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "mutation {\n        custAdd(cust:{\n          name: \"".concat(customer.name, "\",\n          number: \"").concat(customer.number, "\"\n        }) {\n          id\n        }\n      }");
                _context2.next = 3;
                return graphQLFetch(query, {
                  customer: customer
                });

              case 3:
                data = _context2.sent;

                if (data) {
                  this.loadData();
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addCustomer(_x2) {
        return _addCustomer.apply(this, arguments);
      }

      return addCustomer;
    }()
  }, {
    key: "deleteCustomer",
    value: function () {
      var _deleteCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "mutation{\n        custDel(id: \"".concat(id, "\"){\n          id\n        }\n      }");
                _context3.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context3.sent;

                if (data) {
                  this.loadData();
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteCustomer(_x3) {
        return _deleteCustomer.apply(this, arguments);
      }

      return deleteCustomer;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Hotel Waitlist"), /*#__PURE__*/React.createElement(DisplayHomePage, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(DisplayFreeSlots, {
        waitlist: this.state.waitlist
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(DisplayCustomers, {
        waitlist: this.state.waitlist
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(AddingCustomer, {
        addCustomer: this.addCustomer
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(DeleteCustomer, {
        deleteCustomer: this.deleteCustomer
      }));
    }
  }]);

  return HotelWaitlist;
}(React.Component);

var element = /*#__PURE__*/React.createElement(HotelWaitlist, null);
ReactDOM.render(element, document.getElementById('contents'));
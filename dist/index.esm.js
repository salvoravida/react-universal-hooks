import React from 'react';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dist = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopDefault(ex) {
    return ex && _typeof(ex) === 'object' && 'default' in ex ? ex['default'] : ex;
  }

  var React$1 = _interopDefault(React);

  function _typeof$1(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$1 = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$1 = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$1(obj);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var isProduction = process.env.NODE_ENV === 'production';
  var prefix = 'Invariant failed';

  function invariant(condition, message) {
    if (condition) {
      return;
    }

    if (isProduction) {
      throw new Error(prefix);
    } else {
      throw new Error(prefix + ": " + (message || ''));
    }
  }

  React$1.PureComponent.prototype.componentDidMount = function () {};

  React$1.Component.prototype.componentDidMount = function () {}; //TODO - polyfill


  invariant(typeof Symbol === 'function' && Symbol["for"], 'react-class-hooks needs Symbols!'); // Separate objects for better debugging.

  var MAGIC_STATES = Symbol["for"]('magicStates');
  var MAGIC_EFFECTS = Symbol["for"]('magicEffects');
  var MAGIC_MEMOS = Symbol["for"]('magicMemos');
  var MAGIC_REFS = Symbol["for"]('magicRefs'); //React 15.3.2 support + Polyfill

  var instanceKey = React$1.version.indexOf('16') === 0 ? 'stateNode' : '_instance';

  if (React$1.version.indexOf('15') === 0) {
    invariant(React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, 'Please for React ^15.3.2 - 15.6.2 import "react-class-hooks/poly15" in your root index.js!');
  }

  function getMagicSelf() {
    invariant(React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current, 'You are using Hooks outside of "render" React.Component Method!');
    return React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current[instanceKey];
  }

  var getMagicDispatcher = function getMagicDispatcher() {
    var s = React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    return s.ReactCurrentDispatcher.current;
  };

  function checkSymbol(name, keySymbol) {
    invariant(_typeof$1(keySymbol) === 'symbol', "".concat(name, " - Expected a Symbol for key!"));
  }
  /**
   *  https://github.com/salvoravida/react-class-hooks
   */


  function useClassRefKey(keySymbol, initialValue) {
    checkSymbol('useClassRefKey', keySymbol);
    var self = getMagicSelf(); //first time Render && first Hook

    if (!self[MAGIC_REFS]) self[MAGIC_REFS] = {}; //first time Render -> assign initial Value

    if (!self[MAGIC_REFS].hasOwnProperty(keySymbol)) {
      var ref = {
        current: initialValue
      };
      Object.seal(ref);
      self[MAGIC_REFS][keySymbol] = ref;
    }

    return self[MAGIC_REFS][keySymbol];
  }

  function inputsArrayEqual(inputs, prevInputs) {
    invariant(inputs.length === prevInputs.length, 'Hooks inputs array length should be constant between renders!'); //Object.is polyfill

    for (var i = 0; i < inputs.length; i += 1) {
      var val1 = inputs[i];
      var val2 = prevInputs[i];

      if (!(val1 === val2 && (val1 !== 0 || 1 / val1 === 1 / val2) || val1 !== val1 && val2 !== val2)) {
        // eslint-disable-line
        return false;
      }
    }

    return true;
  }
  /**
   *  https://github.com/salvoravida/react-class-hooks
   */


  var useClassEffectKey = function useClassEffectKey(keySymbol, creator, inputs) {
    var onlyDidUpdate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    checkSymbol('useClassEffect', keySymbol);
    invariant(typeof creator === 'function', 'Creator should be a function!');
    invariant(!inputs || Array.isArray(inputs), 'inputs should be an array!');
    var self = getMagicSelf(); //create MAGIC_EFFECTS if not exists

    if (!self[MAGIC_EFFECTS]) self[MAGIC_EFFECTS] = {}; //First Render -> Assign creator, inputs and inject methods
    //TODO didCatch

    if (!self[MAGIC_EFFECTS].hasOwnProperty(keySymbol)) {
      self[MAGIC_EFFECTS][keySymbol] = {
        creator: creator,
        inputs: inputs
      };

      if (!onlyDidUpdate) {
        //inject componentDidMount
        var didMount = typeof self.componentDidMount === 'function' ? self.componentDidMount.bind(self) : undefined;

        self.componentDidMount = function () {
          if (didMount) didMount();
          self[MAGIC_EFFECTS][keySymbol].cleaner = self[MAGIC_EFFECTS][keySymbol].creator();
          invariant(!self[MAGIC_EFFECTS][keySymbol].cleaner || typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function', 'useClassEffect return (Effect Cleaner) should be Function or Void !');
        };
      } //inject componentDidUpdate


      var didUpdate = typeof self.componentDidUpdate === 'function' ? self.componentDidUpdate.bind(self) : undefined;

      self.componentDidUpdate = function () {
        if (didUpdate) didUpdate.apply(void 0, arguments); //execute if no inputs || inputs array has values and values changed

        var execute = !self[MAGIC_EFFECTS][keySymbol].inputs || !inputsArrayEqual(self[MAGIC_EFFECTS][keySymbol].inputs, self[MAGIC_EFFECTS][keySymbol].prevInputs);

        if (execute) {
          if (typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function') self[MAGIC_EFFECTS][keySymbol].cleaner();
          self[MAGIC_EFFECTS][keySymbol].cleaner = self[MAGIC_EFFECTS][keySymbol].creator();
          invariant(!self[MAGIC_EFFECTS][keySymbol].cleaner || typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function', 'useClassEffect return (Effect Cleaner) should be Function or Void !');
        }
      }; //inject componentWillUnmount


      var unmount = typeof self.componentWillUnmount === 'function' ? self.componentWillUnmount.bind(self) : undefined;

      self.componentWillUnmount = function () {
        if (unmount) unmount();
        if (typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function') self[MAGIC_EFFECTS][keySymbol].cleaner();
      };
    } else {
      //next renders
      self[MAGIC_EFFECTS][keySymbol] = {
        prevInputs: self[MAGIC_EFFECTS][keySymbol].inputs,
        cleaner: self[MAGIC_EFFECTS][keySymbol].cleaner,
        creator: creator,
        inputs: inputs
      };
    }
  };

  function useClassEffectExist(keySymbol) {
    var self = getMagicSelf();
    return !!self[MAGIC_EFFECTS] && !!self[MAGIC_EFFECTS].hasOwnProperty(keySymbol);
  }

  function MagicStack(StackName) {
    var _this = this;

    this.name = StackName;
    this.symbol = Symbol("".concat(this.name, ".Stack"));
    this.cleanSymbol = Symbol("".concat(this.name, ".Stack.Cleaner"));
    this.keys = [];

    this.getKey = function (stackIndex) {
      var len = _this.keys.length; //create if not exist

      if (stackIndex > len) {
        for (var i = len; i < stackIndex; i += 1) {
          _this.keys.push(Symbol("".concat(_this.name, "-").concat(i)));
        }
      }

      return _this.keys[stackIndex - 1];
    };
  }

  function useMagicStack(magicStack, hook, _ref) {
    var _ref2 = _toArray(_ref),
        args = _ref2.slice(0);

    var stack = useClassRefKey(magicStack.symbol, 0); //optimization after first call in the same rendering phase

    if (!useClassEffectExist(magicStack.cleanSymbol)) {
      //clean stack after render
      useClassEffectKey(magicStack.cleanSymbol, function () {
        stack.current = 0;
      });
    } //update stack counter


    stack.current += 1;
    return hook.apply(void 0, [magicStack.getKey(stack.current)].concat(_toConsumableArray(args)));
  }

  function createHook(stackName, hook) {
    var stack = new MagicStack(stackName);
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args && args.length && _typeof$1(args[0]) === 'symbol') return hook.apply(void 0, args);
      return useMagicStack(stack, hook, [].concat(args));
    };
  }

  function createNamedHook(name, hook) {
    var keySymbol = Symbol(name);
    return hook.bind(null, keySymbol);
  }
  /**
   *  https://github.com/salvoravida/react-class-hooks
   */


  function useClassStateKey(keySymbol, initialValue) {
    checkSymbol('useClassStateKey', keySymbol);
    var self = getMagicSelf(); //first time Render && first Hook

    if (!self[MAGIC_STATES]) self[MAGIC_STATES] = {}; //first time Render -> assign initial Value and create Setter

    if (!self[MAGIC_STATES].hasOwnProperty(keySymbol)) {
      self[MAGIC_STATES][keySymbol] = {
        value: typeof initialValue === 'function' ? initialValue() : initialValue,
        setValue: function setValue(value, callback) {
          self[MAGIC_STATES][keySymbol].value = typeof value === 'function' ? value(self[MAGIC_STATES][keySymbol].value) : value; //check if mounted yet

          invariant(!callback || typeof callback === 'function', 'setState callback must be a function!');
          if (self.updater.isMounted(self)) self.forceUpdate(callback);
        }
      };
    }

    var _self$MAGIC_STATES$ke = self[MAGIC_STATES][keySymbol],
        value = _self$MAGIC_STATES$ke.value,
        setValue = _self$MAGIC_STATES$ke.setValue;
    return [value, setValue];
  }
  /**
   *  https://github.com/salvoravida/react-class-hooks
   */


  var useClassState = createHook('States', useClassStateKey);

  useClassState.create = function (name) {
    return createNamedHook(name, useClassStateKey);
  };

  useClassState.createStack = function (stackName) {
    return createHook(stackName, useClassStateKey);
  };

  var useClassEffect = createHook('Effects', useClassEffectKey);

  useClassEffect.create = function (name) {
    return createNamedHook(name, useClassEffectKey);
  };

  useClassEffect.createStack = function (stackName) {
    return createHook(stackName, useClassEffectKey);
  };
  /**
   *  https://github.com/salvoravida/react-class-hooks
   */


  var useClassMemoKey = function useClassMemoKey(keySymbol, creator, inputs) {
    checkSymbol('useClassMemo', keySymbol);
    invariant(typeof creator === 'function', 'Creator should be a function!');
    invariant(!inputs || Array.isArray(inputs), 'inputs should be an array!');
    var self = getMagicSelf(); //create magic Memos if not exists

    if (!self[MAGIC_MEMOS]) self[MAGIC_MEMOS] = {}; //First Render -> assign creator, inputs, value

    if (!self[MAGIC_MEMOS].hasOwnProperty(keySymbol)) {
      self[MAGIC_MEMOS][keySymbol] = {
        creator: creator,
        inputs: inputs,
        value: creator()
      };
    } else {
      //next renders
      var execute = false;

      if (!inputs) {
        if (creator !== self[MAGIC_MEMOS][keySymbol].creator) {
          execute = true;
        }
      } else {
        execute = !inputsArrayEqual(inputs, self[MAGIC_MEMOS][keySymbol].inputs);
      }

      if (execute) {
        self[MAGIC_MEMOS][keySymbol] = {
          creator: creator,
          inputs: inputs,
          value: creator()
        };
      }
    }

    return self[MAGIC_MEMOS][keySymbol].value;
  };

  var useClassMemo = createHook('Memos', useClassMemoKey);

  useClassMemo.create = function (name) {
    return createNamedHook(name, useClassMemoKey);
  };

  useClassMemo.createStack = function (stackName) {
    return createHook(stackName, useClassMemoKey);
  };
  /**
   *  https://github.com/salvoravida/react-class-hooks
   */


  function useClassCallbackKey(keySymbol, callback, inputs) {
    return useClassMemoKey(keySymbol, function () {
      return callback;
    }, inputs);
  }

  var useClassCallback = createHook('Callbacks', useClassCallbackKey);

  useClassCallback.create = function (name) {
    return createNamedHook(name, useClassCallbackKey);
  };

  useClassCallback.createStack = function (stackName) {
    return createHook(stackName, useClassCallbackKey);
  };

  var useClassReducerKey = function useClassReducerKey(keySymbol, reducer, initialState) {
    var _useClassStateKey = useClassStateKey(keySymbol, initialState),
        _useClassStateKey2 = _slicedToArray(_useClassStateKey, 2),
        state = _useClassStateKey2[0],
        setState = _useClassStateKey2[1];

    function dispatch(action) {
      var nextState = reducer(state, action);
      setState(nextState);
    }

    return [state, dispatch];
  };

  var useClassReducer = createHook('Reducers', useClassReducerKey);

  useClassReducer.create = function (name) {
    return createNamedHook(name, useClassReducerKey);
  };
  /**
   *  https://github.com/salvoravida/react-class-hooks
   */


  var useClassRef = createHook('Refs', useClassRefKey);

  useClassRef.create = function (name) {
    return createNamedHook(name, useClassRefKey);
  };

  useClassRef.createStack = function (stackName) {
    return createHook(stackName, useClassRefKey);
  }; //poly 15 ref


  var refCallback = function refCallback(refObject) {
    return function (ref) {
      refObject.current = ref;
    };
  };
  /**
   *  https://github.com/salvoravida/react-class-hooks
   */


  var useClassContextKey = function useClassContextKey(keySymbol, Context) {
    checkSymbol('useClassContext', keySymbol);
    invariant(Context && Context.Provider && Context.Consumer, 'Context should be React.createContext object!');
    return getMagicDispatcher().readContext(Context);
  };

  var useClassContext = createHook('Contexts', useClassContextKey);

  useClassContext.create = function (name) {
    return createNamedHook(name, useClassContextKey);
  };
  /**
   *  https://github.com/salvoravida/react-class-hooks
   */


  var useClassLayoutEffect = useClassEffect;
  exports.refCallback = refCallback;
  exports.useClassCallback = useClassCallback;
  exports.useClassContext = useClassContext;
  exports.useClassEffect = useClassEffect;
  exports.useClassLayoutEffect = useClassLayoutEffect;
  exports.useClassMemo = useClassMemo;
  exports.useClassReducer = useClassReducer;
  exports.useClassRef = useClassRef;
  exports.useClassState = useClassState;
});
unwrapExports(dist);
var dist_1 = dist.refCallback;
var dist_2 = dist.useClassCallback;
var dist_3 = dist.useClassContext;
var dist_4 = dist.useClassEffect;
var dist_5 = dist.useClassLayoutEffect;
var dist_6 = dist.useClassMemo;
var dist_7 = dist.useClassReducer;
var dist_8 = dist.useClassRef;
var dist_9 = dist.useClassState;

var R = _objectSpread2({}, React);

var magicKey = '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';

function isFunctional() {
  var c = R[magicKey].ReactCurrentOwner.current;
  return !c || !c.stateNode;
}

function useState() {
  return isFunctional() ? R.useState.apply(R, arguments) : dist_9.apply(void 0, arguments);
}

function useReducer() {
  return isFunctional() ? R.useReducer.apply(R, arguments) : dist_7.apply(void 0, arguments);
}

function useEffect() {
  return isFunctional() ? R.useEffect.apply(R, arguments) : dist_4.apply(void 0, arguments);
}

function useLayoutEffect() {
  return isFunctional() ? R.useLayoutEffect.apply(R, arguments) : dist_5.apply(void 0, arguments);
}

function useCallback() {
  return isFunctional() ? R.useCallback.apply(R, arguments) : dist_2.apply(void 0, arguments);
}

function useMemo() {
  return isFunctional() ? R.useMemo.apply(R, arguments) : dist_6.apply(void 0, arguments);
}

function useRef() {
  return isFunctional() ? R.useRef.apply(R, arguments) : dist_8.apply(void 0, arguments);
}

function useContext() {
  return isFunctional() ? R.useContext.apply(R, arguments) : dist_3.apply(void 0, arguments);
}

React.useState = useState;
React.useReducer = useReducer;
React.useEffect = useEffect;
React.useLayoutEffect = useLayoutEffect;
React.useCallback = useCallback;
React.useMemo = useMemo;
React.useRef = useRef;
React.useContext = useContext;

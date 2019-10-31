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

React.PureComponent.prototype.componentDidMount = function () {};

React.Component.prototype.componentDidMount = function () {};

invariant(typeof Symbol === 'function' && Symbol["for"], 'react-class-hooks needs Symbols!'); // Separate objects for better debugging.

var MAGIC_STATES = Symbol["for"]('magicStates');
var MAGIC_EFFECTS = Symbol["for"]('magicEffects');
var MAGIC_MEMOS = Symbol["for"]('magicMemos');
var MAGIC_REFS = Symbol["for"]('magicRefs');
var MAGIC_STACKS = Symbol["for"]('magicStacks');
var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED; // React 15.3.2 support + Polyfill

var instanceKey = React.version.indexOf('16') === 0 ? 'stateNode' : '_instance';

if (React.version.indexOf('15') === 0) {
  invariant(ReactInternals, 'Please for React ^15.3.2 - 15.6.2 import "react-class-hooks/poly15" in your root index.js!');
}

function getMagicSelf() {
  invariant(ReactInternals.ReactCurrentOwner.current, 'You are using Hooks outside of "render" React.Component Method!');
  return ReactInternals.ReactCurrentOwner.current[instanceKey];
}
var getMagicDispatcher = function getMagicDispatcher() {
  return ReactInternals.ReactCurrentDispatcher.current;
};
function checkSymbol(name, keySymbol) {
  invariant(_typeof(keySymbol) === 'symbol', "".concat(name, " - Expected a Symbol for key!"));
}

/**
 *  https://github.com/salvoravida/react-class-hooks
 */
function MagicStack(StackName) {
  var _this = this;

  this.name = StackName;
  this.symbol = Symbol("".concat(this.name, ".Stack")); // this.cleanSymbol = Symbol(`${this.name}.Stack.Cleaner`);

  this.keys = [];

  this.getKey = function (stackIndex) {
    var len = _this.keys.length; // create if not exist

    if (stackIndex > len) {
      for (var i = len; i < stackIndex; i += 1) {
        _this.keys.push(Symbol("".concat(_this.name, "-").concat(i)));
      }
    }

    return _this.keys[stackIndex - 1];
  };
}
function useMagicStack(magicStack, hook) {
  // inject next renders stack counter cleaner
  var self = getMagicSelf();

  if (!self[MAGIC_STACKS]) {
    self[MAGIC_STACKS] = {};
    var renderFunc = self.render.bind(self);

    self.render = function () {
      Object.getOwnPropertySymbols(self[MAGIC_STACKS]).forEach(function (k) {
        self[MAGIC_STACKS][k] = 0;
      });
      return renderFunc.apply(void 0, arguments);
    };
  } // stack counter init


  if (!self[MAGIC_STACKS][magicStack.symbol]) {
    self[MAGIC_STACKS][magicStack.symbol] = 0;
  } // stack counter update


  self[MAGIC_STACKS][magicStack.symbol] += 1;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return hook.apply(void 0, [magicStack.getKey(self[MAGIC_STACKS][magicStack.symbol])].concat(args));
}

function createHook(stackName, hook) {
  var stack = new MagicStack(stackName);
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args && args.length && _typeof(args[0]) === 'symbol') return hook.apply(void 0, args);
    return useMagicStack.apply(void 0, [stack, hook].concat(args));
  };
}
function createNamedHook(name, hook) {
  var keySymbol = Symbol(name);
  return hook.bind(null, keySymbol);
}

var devToolConfig = {
  active: false,
  stateKey: '__UNIVERSAL_HOOKS__',
  show: 'object' // object, array, map

};
function supportReactDevTools(_ref) {
  var active = _ref.active,
      stateKey = _ref.stateKey,
      show = _ref.show;
  if (stateKey) devToolConfig.stateKey = stateKey;
  if (show) devToolConfig.show = show;
  devToolConfig.active = !!active;
}
function setDevToolsHookState(name, state) {
  if (devToolConfig.active) {
    var self = getMagicSelf();
    var stateKey = devToolConfig.stateKey,
        show = devToolConfig.show;
    if (!self.state) self.state = {};
    if (!self.state[stateKey]) self.state[stateKey] = show === 'map' ? new Map() : show === 'array' ? [] : {};

    if (show === 'map') {
      self.state[stateKey].set(name, state);
    } else if (show === 'array') {
      var hookState = self.state[stateKey].find(function (h) {
        return h.hasOwnProperty(name);
      });

      if (hookState) {
        hookState[name] = state;
      } else {
        self.state[stateKey].push(_defineProperty({}, name, state));
      }
    } else {
      var hookNames = Object.keys(self.state[stateKey]);
      var hookName = hookNames.find(function (s) {
        return s.split(':')[1] === name;
      });
      self.state[stateKey][hookName || "".concat(hookNames.length.toString().padStart(2, '0'), ":").concat(name)] = state;
    }
  }
}

/**
 *  https://github.com/salvoravida/react-class-hooks
 */
function useClassStateKey(keySymbol, initialValue) {
  checkSymbol('useClassStateKey', keySymbol);
  var self = getMagicSelf(); // first time Render && first Hook

  if (!self[MAGIC_STATES]) self[MAGIC_STATES] = {}; // first time Render -> assign initial Value and create Setter

  if (!self[MAGIC_STATES].hasOwnProperty(keySymbol)) {
    self[MAGIC_STATES][keySymbol] = {
      value: typeof initialValue === 'function' ? initialValue() : initialValue,
      setValue: function setValue(value, callback) {
        var newState = typeof value === 'function' ? value(self[MAGIC_STATES][keySymbol].value) : value;

        if (self[MAGIC_STATES][keySymbol].value !== newState) {
          self[MAGIC_STATES][keySymbol].value = newState;

          if (self.updater.isMounted(self)) {
            self.updater.enqueueForceUpdate(self, callback);
          }
        }
      }
    };
  }

  var _self$MAGIC_STATES$ke = self[MAGIC_STATES][keySymbol],
      value = _self$MAGIC_STATES$ke.value,
      setValue = _self$MAGIC_STATES$ke.setValue;
  setDevToolsHookState(keySymbol.description, value);
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

function inputsArrayEqual(inputs, prevInputs) {
  invariant(inputs.length === prevInputs.length, 'Hooks inputs array length should be constant between renders!'); // Object.is polyfill

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
  var self = getMagicSelf(); // create MAGIC_EFFECTS if not exists

  if (!self[MAGIC_EFFECTS]) self[MAGIC_EFFECTS] = {}; // First Render -> Assign creator, inputs and inject methods
  // TODO didCatch

  if (!self[MAGIC_EFFECTS].hasOwnProperty(keySymbol)) {
    self[MAGIC_EFFECTS][keySymbol] = {
      creator: creator,
      inputs: inputs
    };

    if (!onlyDidUpdate) {
      // inject componentDidMount
      var didMount = typeof self.componentDidMount === 'function' ? self.componentDidMount.bind(self) : undefined;

      self.componentDidMount = function () {
        if (didMount) didMount();
        self[MAGIC_EFFECTS][keySymbol].cleaner = self[MAGIC_EFFECTS][keySymbol].creator(); // save last executed inputs

        self[MAGIC_EFFECTS][keySymbol].prevInputs = self[MAGIC_EFFECTS][keySymbol].inputs;
        invariant(!self[MAGIC_EFFECTS][keySymbol].cleaner || typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function', 'useClassEffect return (Effect Cleaner) should be Function or Void !');
      };
    } // inject componentDidUpdate


    var didUpdate = typeof self.componentDidUpdate === 'function' ? self.componentDidUpdate.bind(self) : undefined;

    self.componentDidUpdate = function () {
      if (didUpdate) didUpdate.apply(void 0, arguments); // execute if no inputs || inputs array has values and values changed

      var execute = !self[MAGIC_EFFECTS][keySymbol].inputs || !inputsArrayEqual(self[MAGIC_EFFECTS][keySymbol].inputs, self[MAGIC_EFFECTS][keySymbol].prevInputs);

      if (execute) {
        if (typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function') self[MAGIC_EFFECTS][keySymbol].cleaner();
        self[MAGIC_EFFECTS][keySymbol].cleaner = self[MAGIC_EFFECTS][keySymbol].creator(); // save last executed inputs!

        self[MAGIC_EFFECTS][keySymbol].prevInputs = self[MAGIC_EFFECTS][keySymbol].inputs;
        invariant(!self[MAGIC_EFFECTS][keySymbol].cleaner || typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function', 'useClassEffect return (Effect Cleaner) should be Function or Void !');
      }
    }; // inject componentWillUnmount


    var unmount = typeof self.componentWillUnmount === 'function' ? self.componentWillUnmount.bind(self) : undefined;

    self.componentWillUnmount = function () {
      if (unmount) unmount();
      if (typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function') self[MAGIC_EFFECTS][keySymbol].cleaner();
    };
  } else {
    // next renders
    self[MAGIC_EFFECTS][keySymbol].creator = creator;
    self[MAGIC_EFFECTS][keySymbol].inputs = inputs;
  }
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
  var self = getMagicSelf(); // create magic Memos if not exists

  if (!self[MAGIC_MEMOS]) self[MAGIC_MEMOS] = {}; // First Render -> assign creator, inputs, value

  if (!self[MAGIC_MEMOS].hasOwnProperty(keySymbol)) {
    self[MAGIC_MEMOS][keySymbol] = {
      creator: creator,
      inputs: inputs,
      value: creator()
    };
  } else {
    // next renders
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

  var returnValue = self[MAGIC_MEMOS][keySymbol].value;
  setDevToolsHookState(keySymbol.description, returnValue);
  return returnValue;
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

/**
 *  https://github.com/salvoravida/react-class-hooks
 */
var useClassReducerKey = function useClassReducerKey(keySymbol, reducer, initialState) {
  var stateSetState = useClassStateKey(keySymbol, initialState);
  var state = stateSetState[0];
  var setState = stateSetState[1];

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
function useClassRefKey(keySymbol, initialValue) {
  checkSymbol('useClassRefKey', keySymbol);
  var self = getMagicSelf(); // first time Render && first Hook

  if (!self[MAGIC_REFS]) self[MAGIC_REFS] = {}; // first time Render -> assign initial Value

  if (!self[MAGIC_REFS].hasOwnProperty(keySymbol)) {
    var ref = {
      current: initialValue
    };
    Object.seal(ref);
    self[MAGIC_REFS][keySymbol] = ref;
  }

  var returnValue = self[MAGIC_REFS][keySymbol];
  setDevToolsHookState(keySymbol.description, returnValue);
  return returnValue;
}

/**
 *  https://github.com/salvoravida/react-class-hooks
 */
var useClassRef = createHook('Refs', useClassRefKey);

useClassRef.create = function (name) {
  return createNamedHook(name, useClassRefKey);
};

useClassRef.createStack = function (stackName) {
  return createHook(stackName, useClassRefKey);
}; // poly 15 ref

/**
 *  https://github.com/salvoravida/react-class-hooks
 */
function useClassContextKey(keySymbol, context, observedBits) {
  checkSymbol('useClassContext', keySymbol);
  getMagicSelf(); // invariant hook outside render method

  invariant(context && context.Provider && context.Consumer, 'Context should be React.createContext object!');
  var contextValue = getMagicDispatcher().readContext(context, observedBits);
  setDevToolsHookState(keySymbol.description, contextValue);
  return contextValue;
}
var useClassContext = createHook('Contexts', useClassContextKey);

function useClassImperativeHandle(ref, create, deps) {
  invariant(typeof create === 'function', "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: ".concat(create !== null ? _typeof(create) : 'null'));
  invariant(deps === null || deps === undefined || Array.isArray(deps), 'Hook received a final argument that is not an array!');
  var effectDeps = deps !== null && deps !== undefined ? deps.concat([ref]) : null; // eslint-disable-next-line consistent-return

  useClassEffect(function () {
    if (typeof ref === 'function') {
      var refCallback = ref;
      refCallback(create()); // eslint-disable-next-line func-names

      return function () {
        refCallback(null);
      };
    }

    if (ref !== null && ref !== undefined) {
      var refObject = ref;
      invariant(refObject.hasOwnProperty('current'), "Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: an object with keys {".concat(Object.keys(refObject).join(', '), "}"));
      refObject.current = create(); // eslint-disable-next-line func-names

      return function () {
        refObject.current = null;
      };
    }
  }, effectDeps);
}

/**
 *  https://github.com/salvoravida/react-class-hooks
 */
function useClassDebugValueKey(keySymbol, value, formatter) {
  checkSymbol('useDebugValueKey', keySymbol);
  var viewValue = typeof formatter === "function" ? formatter(value) : value;
  setDevToolsHookState(keySymbol.description, viewValue);
}
var useClassDebugValue = createHook('DebugValue', useClassDebugValueKey);

/**
 *  https://github.com/salvoravida/react-class-hooks
 */
var useClassLayoutEffect = useClassEffect;

/**
 *  https://github.com/salvoravida/react-universal-hooks
 */
var _useState = React.useState;
var _useReducer = React.useReducer;
var _useEffect = React.useEffect;
var _useLayoutEffect = React.useLayoutEffect;
var _useCallback = React.useCallback;
var _useMemo = React.useMemo;
var _useRef = React.useRef;
var _useContext = React.useContext;
var _useImperativeHandle = React.useImperativeHandle;
var _useDebugValue = React.useDebugValue;
var ReactInternals$1 = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function isFunctional() {
  var c = ReactInternals$1.ReactCurrentOwner.current;
  return !c || !c.stateNode;
}

function useState() {
  return isFunctional() ? _useState.apply(void 0, arguments) : useClassState.apply(void 0, arguments);
}

function useReducer() {
  return isFunctional() ? _useReducer.apply(void 0, arguments) : useClassReducer.apply(void 0, arguments);
}

function useEffect() {
  return isFunctional() ? _useEffect.apply(void 0, arguments) : useClassEffect.apply(void 0, arguments);
}

function useLayoutEffect() {
  return isFunctional() ? _useLayoutEffect.apply(void 0, arguments) : useClassLayoutEffect.apply(void 0, arguments);
}

function useCallback() {
  return isFunctional() ? _useCallback.apply(void 0, arguments) : useClassCallback.apply(void 0, arguments);
}

function useMemo() {
  return isFunctional() ? _useMemo.apply(void 0, arguments) : useClassMemo.apply(void 0, arguments);
}

function useRef() {
  return isFunctional() ? _useRef.apply(void 0, arguments) : useClassRef.apply(void 0, arguments);
}

function useContext() {
  return isFunctional() ? _useContext.apply(void 0, arguments) : useClassContext.apply(void 0, arguments);
}

function useImperativeHandle() {
  return isFunctional() ? _useImperativeHandle.apply(void 0, arguments) : useClassImperativeHandle.apply(void 0, arguments);
}

function useDebugValue() {
  return isFunctional() ? _useDebugValue.apply(void 0, arguments) : useClassDebugValue.apply(void 0, arguments);
}

React.useState = useState;
React.useReducer = useReducer;
React.useEffect = useEffect;
React.useLayoutEffect = useLayoutEffect;
React.useCallback = useCallback;
React.useMemo = useMemo;
React.useRef = useRef;
React.useContext = useContext;
React.useImperativeHandle = useImperativeHandle;
React.useDebugValue = useDebugValue;

export { supportReactDevTools };

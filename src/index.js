/**
 *  https://github.com/salvoravida/react-universal-hooks
 */

import React from 'react';
import {
  useClassState,
  useClassReducer,
  useClassEffect,
  useClassLayoutEffect,
  useClassCallback,
  useClassMemo,
  useClassRef,
  useClassContext,
  useClassImperativeHandle,
  useClassDebugValue
} from 'react-class-hooks';

// eslint-disable-next-line import/prefer-default-export
export { supportReactDevTools } from 'react-class-hooks';

const _useState = React.useState;
const _useReducer = React.useReducer;
const _useEffect = React.useEffect;
const _useLayoutEffect = React.useLayoutEffect;
const _useCallback = React.useCallback;
const _useMemo = React.useMemo;
const _useRef = React.useRef;
const _useContext = React.useContext;
const _useImperativeHandle = React.useImperativeHandle;
const _useDebugValue = React.useDebugValue;

const ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function isFunctional() {
  const c = ReactInternals.ReactCurrentOwner.current;
  return !c || !c.stateNode;
}

function useState(...args) {
  return isFunctional() ? _useState(...args) : useClassState(...args);
}

function useReducer(...args) {
  return isFunctional() ? _useReducer(...args) : useClassReducer(...args);
}

function useEffect(...args) {
  return isFunctional() ? _useEffect(...args) : useClassEffect(...args);
}

function useLayoutEffect(...args) {
  return isFunctional() ? _useLayoutEffect(...args) : useClassLayoutEffect(...args);
}

function useCallback(...args) {
  return isFunctional() ? _useCallback(...args) : useClassCallback(...args);
}

function useMemo(...args) {
  return isFunctional() ? _useMemo(...args) : useClassMemo(...args);
}

function useRef(...args) {
  return isFunctional() ? _useRef(...args) : useClassRef(...args);
}

function useContext(...args) {
  return isFunctional() ? _useContext(...args) : useClassContext(...args);
}

function useImperativeHandle(...args) {
  return isFunctional() ? _useImperativeHandle(...args) : useClassImperativeHandle(...args);
}
function useDebugValue(...args) {
  return isFunctional() ? _useDebugValue(...args) : useClassDebugValue(...args);
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

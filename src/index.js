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
} from 'react-class-hooks';

const R = { ...React };

const magicKey = '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';

function isFunctional() {
    const c = R[magicKey].ReactCurrentOwner.current;
    return !c || !c.stateNode;
}

function useState(...args) {
    return isFunctional() ? R.useState(...args) : useClassState(...args);
}

function useReducer(...args) {
    return isFunctional() ? R.useReducer(...args) : useClassReducer(...args);
}

function useEffect(...args) {
    return isFunctional() ? R.useEffect(...args) : useClassEffect(...args);
}

function useLayoutEffect(...args) {
    return isFunctional() ? R.useLayoutEffect(...args) : useClassLayoutEffect(...args);
}

function useCallback(...args) {
    return isFunctional() ? R.useCallback(...args) : useClassCallback(...args);
}

function useMemo(...args) {
    return isFunctional() ? R.useMemo(...args) : useClassMemo(...args);
}

function useRef(...args) {
    return isFunctional() ? R.useRef(...args) : useClassRef(...args);
}

function useContext(...args) {
    return isFunctional() ? R.useContext(...args) : useClassContext(...args);
}

React.useState = useState;
React.useReducer = useReducer;
React.useEffect = useEffect;
React.useLayoutEffect = useLayoutEffect;
React.useCallback = useCallback;
React.useMemo = useMemo;
React.useRef = useRef;
React.useContext = useContext;

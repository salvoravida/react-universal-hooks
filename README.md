
# react-universal-hooks [![npm version](https://img.shields.io/npm/v/react-universal-hooks.svg?style=flat)](https://www.npmjs.org/package/react-universal-hooks) 

React Universal Hooks : just use****** everywhere. Support React >= 16.8.0

Installation
-----------
Using [npm](https://www.npmjs.com/):

    $ npm install --save react-universal-hooks

Or [yarn](https://yarnpkg.com/):

    $ yarn add react-universal-hooks

Usage
-----    
just add one line import!

index.js
```javascript
import "react-universal-hooks";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

  ReactDOM.render(
      <App />,
    document.getElementById('root'),
  );
```

Demo
---
https://codesandbox.io/s/jnnnw158j5

```javascript
import "react-universal-hooks";
import React, { useState, useContext } from "react";
import { useWindowSize } from "./useWindowSize";

const MyContext = React.createContext({ myLabel: "MyContextLabel" });

const Functional = () => {
  const [count, setCount] = useState(0);
  const { width, height } = useWindowSize();
  const { myLabel } = useContext(MyContext);
  return (
    <React.Fragment>
      <p>{myLabel}</p>
      <p>{"Functional windowSize : " + width + "x" + height}</p>
      <p>{"Functional Counter " + count}</p>
      <button onClick={() => setCount(c => c + 1)}>Functional Counter</button>
    </React.Fragment>
  );
};

class Component extends React.PureComponent {
   constructor(props) {
      super(props);
      this.state = { /* your already existing business logic here */ };
    }
    componentDidMount (){ /* your already existing business logic here */}
    componentDidUpdate (){ /* your already existing business logic here */}
    componentUnmount (){ /* your already existing business logic here */} 
  render() {
    const [count, setCount] = useState(0);
    const { width, height } = useWindowSize();
    const { myLabel } = useContext(MyContext);
    return (
      <React.Fragment>
        <p>{myLabel}</p>
        <p>{"Component windowSize : " + width + "x" + height}</p>
        <p>{"Component Counter " + count}</p>
        <button onClick={() => setCount(c => c + 1)}>Component Counter</button>
      </React.Fragment>
    );
  }
}

```

useWindowSize.js  (custom Hook example)
```javascript
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handle = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("resize", handle);
    };
  }, []);

  return size;
};
```

## Why Universal Hooks?
* use a customHook in your Component/Functional, without refactor. 
* useMemo & useCallback make PureComponents 100% pure! (max performance!)

## Use Case : Make PureComponent 100% Pure
```javascript
import { useCallback } from 'react';

class MyComponent extends React.PureComponent {
  render (){
    //....
  }
}

class Container extends React.PureComponent {
  render (){
    {this.props.arrayProp.map(el=>
      <MyComponent key={el.id} onClick={useCallback( ()=> someAction(el.id) , [el.id])} /> 
    )}
  }
}
```

## Api Reference
Api Reference are the same as official ones, so you can see api reference @ https://reactjs.org/docs/hooks-reference.html
<br/>
Currently supported api on Classes Component:

* useState
* useEffect
* useLayoutEffect
* useMemo
* useCallback
* useReducer
* useRef
* useContext
* useImperativeHandle

# Feedback
Let me know what do you think about! <br>
*Do you like it? Give a star to this project!* :D

Contributors
------------
See [Contributors](https://github.com/salvoravida/react-universal-hooks/graphs/contributors).

License
-------
[MIT License](https://github.com/salvoravida/react-universal-hooks/blob/master/LICENSE.md).

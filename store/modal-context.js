import { createContext, useEffect, useState } from 'react';

const ModalContext = createContext({
  path: null,
  setPath: function (pathName) {},
});

export function ModalContextProvider(props) {
  const [getPath, setGetPath] = useState();

  function setPath(pathName) {
    if (pathName === '/') {
      setGetPath(pathName);
    } else if (pathName === '/events') {
      setGetPath(pathName);
    }
  }

  const context = {
    path: getPath,
    setPath,
  };

  return (
    <ModalContext.Provider value={context}>
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalContext;

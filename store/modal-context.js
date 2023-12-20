import { createContext, useEffect, useState } from 'react';

const ModalContext = createContext({
  path: null,
  setPath: function (pathName) {},
});

export function ModalContextProvider(props) {
  const [getPath, setGetPath] = useState();

  function setPath(pathName) {
    setGetPath(pathName);
  }

  const context = {
    path: getPath,
    setPath,
  };

  console.log('Path: ', context.path);

  return (
    <ModalContext.Provider value={context}>
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalContext;

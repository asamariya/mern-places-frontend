import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.scss';

const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.querySelector('#backdrop-hook')
  );
};

export default Backdrop;

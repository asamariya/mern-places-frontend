import React from 'react';
import ReactDOM from 'react-dom';

import './SideDrawer.scss';

const SideDrawer = ({ children }) => {
  const content = <aside className="side-drawer">{children}</aside>;

  return ReactDOM.createPortal(content, document.querySelector('#drawer-hook'));
};

export default SideDrawer;

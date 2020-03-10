import React from 'react';

import './LoadingSpinner.scss';

const LoadingSpinner = ({ asOverlay }) => {
  return (
    <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;

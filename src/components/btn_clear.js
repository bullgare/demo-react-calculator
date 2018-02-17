import React from 'react';

export default (props) => {
  return (
    <div className="btn btn-warning" onClick={() => props.onClick()}>C</div>
  );
};
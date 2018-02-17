import React from 'react';

const operation = {
  cb: (a, b) => a * b,
  label: '*'
};

export default (props) => {
  return (
    <div className="btn btn-outline-dark" onClick={() => props.onClick(operation)}>{operation.label}</div>
  );
};
import React from 'react';

export default (props) => {
  return (
    <ul className="list-group">{render(props.inputs, props.operations)}</ul>
  );
};

function render(inputs, operations) {
  const output = [];
  for (let i = 0; i < inputs.length; i++) {
    output.push(<li key={`input-${i}`} className="list-group-item list-group-item-dark">{inputs[i]}</li>);
    output.push(<li key={`operation-${i}`} className="list-group-item list-group-item-secondary">{operations[i].label}</li>);
  }
  return output;
}
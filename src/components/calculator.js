import React, {Component} from 'react';

import History from './history';
import BtnEquals from './btn_equals';
import BtnClear from './btn_clear';
import BtnAdd from './btn_add';
import BtnSubtract from './btn_subtract';
import BtnMultiply from './btn_multiply'
import BtnDivide from './btn_divide'

const keys = {
  enter: 13,
  del: 46,
  backspace: 8,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57
};

const initialState = {
  total: null,
  prevOperations: [],
  prevInputs: [],
  input: '0'
};

export default class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleKeypress = this.handleKeypress.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.calculate = this.calculate.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleKeypress(e) {
    const key = e.which;
    let input = null;
    if (key >= keys[0] && key <= keys[9]) {
      input = this.state.input + e.key;
    } else if ((key === keys.backspace || key === keys.del) && this.state.input.length) {
      input = this.state.input.slice(0, -1);
    } else if (key === keys.enter) {
      this.calculate();
    }

    if (input !== null) {
      this.setState({ input: this.fixInput(input) });
    }
  }

  fixInput(value) {
    if (!value.length) {
      return 0;
    }
    if (value.length > 1 && value[0] === '0') {
      return value.slice(1);
    }
    return value;
  }

  setOperation(operation) {
    if (!operation.cb || !operation.label) {
      return alert('wrong operation');
    }

    this.setState({
      prevInputs: [...this.state.prevInputs, parseInt(this.state.input, 10)],
      prevOperations: [...this.state.prevOperations, operation],
      input: '0',
      total: null
    });
  }

  calculate() {
    const inputs = this.state.prevInputs;
    const operations = this.state.prevOperations;

    if (!inputs.length) {
      return this.setState({ total: 0 });
    }

    let total = inputs[0];

    try {
      for (let i = 1; i < inputs.length; i++) {
        total = operations[i - 1].cb(total, inputs[i]);
      }
      total = operations.slice(-1)[0].cb(total, parseInt(this.state.input, 10));
    } catch(e) {}

    this.setState({ total });
  }

  clear() {
    this.setState(initialState);
  }

  render() {
    return (
        <div>
          <History inputs={this.state.prevInputs} operations={this.state.prevOperations}/>
          <div className="list-group">
            <div className="list-group-item list-group-item-primary">{this.state.input}</div>
          </div>
          <div className="list-group">

              {
                this.state.total === null ?
                    '' :
                    <div className="list-group-item list-group-item-success">= {this.state.total}</div>
              }
          </div>

          <div className="btn-group mr-2 mt-5">
            <BtnAdd onClick={this.setOperation}/>
            <BtnSubtract onClick={this.setOperation}/>
            <BtnMultiply onClick={this.setOperation}/>
            <BtnDivide onClick={this.setOperation}/>
          </div>

          <div className="btn-group mt-5">
            <BtnEquals onClick={this.calculate}/>
            <BtnClear onClick={this.clear}/>
          </div>
        </div>
    );
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeypress);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeypress);
  }
}
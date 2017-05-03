import React from 'react';
import Moment from 'moment';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }

  

  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker disabledDate={disabledDate} onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
      </div>
    );
  }
}

function disabledDate(current) {
  // can not select days before today and today
  return current && (current.valueOf() < Date.now() || current.valueOf() > Date.parse('2017-09-01'));
}

ReactDOM.render(<App />, document.getElementById('root'));

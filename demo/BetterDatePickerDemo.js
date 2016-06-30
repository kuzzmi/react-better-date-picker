import React, { Component } from 'react';

import BetterDatePicker from '../src/react-better-date-picker';

require('./better-date-picker-demo.css');

class BetterDatePickerDemo extends Component {
    render() {
        return (
            <div className="demo">
                <BetterDatePicker />
            </div>
        );
    }
};

export default BetterDatePickerDemo;

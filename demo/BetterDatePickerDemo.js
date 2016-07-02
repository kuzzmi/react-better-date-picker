import React, { Component } from 'react';

import BetterDatePicker from '../src/react-better-date-picker';

require('./better-date-picker-demo.scss');

class BetterDatePickerDemo extends Component {
    state = {
        date: new Date(),
        format: 'dddd, LL'
    }

    render() {
        const { date, format } = this.state;
        return (
            <div className="demo">
                <BetterDatePicker
                    date={ date }
                    format={ format }
                    />
            </div>
        );
    }
};

export default BetterDatePickerDemo;

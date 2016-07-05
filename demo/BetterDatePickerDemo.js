import React, { Component } from 'react';

import BetterDatePicker from '../src/react-better-date-picker';

require('./better-date-picker-demo.scss');

class BetterDatePickerDemo extends Component {
    state = {
        date: new Date(),
        format: 'LL'
    }

    handleOnDateChange(date) {
        this.setState({ date });
    }

    render() {
        const { date, format } = this.state;
        return (
            <div className="demo">
                <BetterDatePicker
                    date={ date }
                    format={ format }
                    onChange={ this.handleOnDateChange.bind(this) }
                    />
            </div>
        );
    }
}

export default BetterDatePickerDemo;

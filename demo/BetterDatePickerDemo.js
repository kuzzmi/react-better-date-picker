import React, { Component } from 'react';

import BetterDatePicker from '../src/react-better-date-picker';

require('./better-date-picker-demo.scss');

class BetterDatePickerDemo extends Component {
    state = {
        date: '2010-12-01',
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
                    placeholder="pick a date"
                    onChange={ this.handleOnDateChange.bind(this) }
                    />
            </div>
        );
    }
}

export default BetterDatePickerDemo;

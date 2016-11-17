import React, { Component } from 'react';

import BetterDatePicker from '../src/react-better-date-picker';

import './better-date-picker-demo.scss';

class BetterDatePickerDemo extends Component {
    state = {
        date: new Date(),
        format: 'LL'
    }

    handleOnDateChange(date) {
        this.setState({ date });
    }

    render() {
        const { date } = this.state;
        return (
            <div className="demo">
                <div className="wrapper">
                    <BetterDatePicker
                        date={ date }
                        placeholder="pick a date"
                        firstDayOfWeek={ 1 }
                        onChange={ this.handleOnDateChange.bind(this) }
                        />
                </div>
            </div>
        );
    }
}

export default BetterDatePickerDemo;

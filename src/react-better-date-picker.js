import React, { Component, PropTypes } from 'react';
import moment from 'moment';

// List of classes used in the module.
// Will allow to easily swap "themes" as well
// as providing a bare component with no styling
const classes = {
    container: 'better-date-picker-container',
    input: 'better-date-picker-input',
    calendar: 'better-date-picker-calendar',
};

const defaults = {
    // USA format
    format: 'DD-MMM-YYYY'
}

const getMomentOrNull = (date, format = defaults.format) => {
    if (moment.isMoment(date)) {
        return date;
    }

    if (moment.isDate(date)) {
        return moment(date);
    }

    if (typeof date === 'string' && date.length) {
        return moment(date, format);
    }

    return null;
}

class BetterDatePicker extends Component {
    static propTypes = {
        date: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date)
        ])
    };

    constructor(props) {
        super(props);

        this.state = {
            input: props.date || ''
        };

        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(e) {

    }

    render() {
        const {
            format = defaults.format,
            input = defaults.input
        } = this.props;

        let value = getMomentOrNull(this.state.input, format);
        if (value) {
            value = value.format(format);
        } else {
            value = '';
        }

        return (
            <div className={ classes.container }>
                <input type="text"
                    className={ classes.input }
                    value={ value }
                    onChange={ this.onTextChange }
                    placeholder={ format }
                    />
                <div className={ classes.calendar }>
                    <div className={ classes.controls }>
                        <div className={ classes.leftArrow }>
                        </div>
                        <div className={ classes.title }>
                            September 2016
                        </div>
                        <div className={ classes.rightArrow }>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default BetterDatePicker;

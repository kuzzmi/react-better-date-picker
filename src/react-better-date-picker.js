import React, { Component, PropTypes } from 'react';
import moment from 'moment';

// List of classes used in the module.
// Will allow to easily swap "themes" as well
// as providing a bare component with no styling
const classes = {
    container: 'better-date-picker-container'
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
    }

    onTextChange(e) {

    }

    render() {
        const {
            format = defaults.format
        } = this.props;

        let value = getMomentOrNull(this.state.input, format);
        if (value) {
            value = value.format(format);
        } else {
            value = '';
        }

        return (
            <div className={ classes.container }>
                <div>
                    <input type="text"
                        value={ value }
                        placeholder={ format }
                        />
                </div>
            </div>
        );
    }
};

export default BetterDatePicker;

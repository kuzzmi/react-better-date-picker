import React, { Component, PropTypes } from 'react';
import MomentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

import { WeeksView, MonthsView, YearsView } from './views.js';
import { getMomentOrNull, getYearsInterval } from './utils.js';

import config from './config.js';
import classes from './classes.js';
import defaults from './defaults.js';

const removeProtector = () => {
    const oldProtector = document.querySelector(`.${classes.protector}`);

    if (oldProtector) {
        oldProtector.parentNode.removeChild(oldProtector);
    }
};

class BetterDatePicker extends Component {

    static propTypes = {
        date: PropTypes.oneOfType([
            MomentPropTypes.momentObj,
            MomentPropTypes.momentString,
            PropTypes.instanceOf(Date)
        ]),
        onChange: PropTypes.func.isRequired,
        view: PropTypes.oneOf(['weeks', 'months', 'years'])
    };

    constructor(props) {
        super(props);

        let date = getMomentOrNull(props.date, props.format);

        this.state = {
            date: date || new Date(),
            input: date ? date.format(props.format) : '',
            expanded: false,
            view: props.view || defaults.view
        };

        this.onInputChange          = this.onInputChange.bind(this);

        // Open/close
        this.handleOnOutsideClick   = this.handleOnOutsideClick.bind(this);
        this.handleOnInputClick     = this.handleOnInputClick.bind(this);

        // Rendering parts
        this.renderViewTitle        = this.renderViewTitle.bind(this);
        this.renderCalendarView     = this.renderCalendarView.bind(this);

        // Clicks inside of calendar
        this.handleOnDayClick       = this.handleOnDayClick.bind(this);
        this.handleOnYearClick      = this.handleOnYearClick.bind(this);
        this.handleOnMonthClick     = this.handleOnMonthClick.bind(this);
        this.handleOnDateClick      = this.handleOnDateClick.bind(this);
        this.handleOnTitleClick     = this.handleOnTitleClick.bind(this);

        // Left/Right arrows
        this.handleOnMoveClick      = this.handleOnMoveClick.bind(this);
        this.handleOnNextClick      = this.handleOnNextClick.bind(this);
        this.handleOnPrevClick      = this.handleOnPrevClick.bind(this);

        // Bottom buttons
        this.handleOnTodayClick     = this.handleOnTodayClick.bind(this);
        this.handleOnTomorrowClick  = this.handleOnTomorrowClick.bind(this);
        this.handleOnNextWeekClick  = this.handleOnNextWeekClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let input = getMomentOrNull(nextProps.date, nextProps.format);
        if (input) input = input.format(nextProps.format);
        else input = '';

        this.setState({ date: nextProps.date, input });
    }

    onInputChange(e) {
        const input = e.target.value;
        const momentOrNull = getMomentOrNull(input, this.props.format);
        if (momentOrNull) {
            this.props.onChange(momentOrNull.toDate());
        }
        this.setState({ input });
    }

    handleOnInputClick() {
        this.setState({ expanded: true, closing: false });

        removeProtector();

        const style = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }

        const protector = document.createElement('div');
        protector.classList.add(classes.protector);
        protector.style.position = style.position;
        protector.style.top = style.top;
        protector.style.left = style.left;
        protector.style.right = style.right;
        protector.style.bottom = style.bottom;
        protector.addEventListener('click', this.handleOnOutsideClick);

        document.querySelector('body').appendChild(protector);
    }

    handleOnOutsideClick() {
        this.setState({ closing: true });

        setTimeout(() => {
            this.setState({ expanded: false });
        }, 300);

        removeProtector();
    }

    renderCalendarView() {
        const { date = new Date(), view } = this.state;

        switch(view) {
            case 'weeks':
                return <WeeksView date={ date } onDateClick={ this.handleOnDayClick }/>
            case 'months':
                return <MonthsView date={ date } onDateClick={ this.handleOnMonthClick }/>
            case 'years':
                return <YearsView date={ date } onDateClick={ this.handleOnYearClick }/>
            default:
                return <p>Error</p>
        }
    }

    renderViewTitle() {
        const { date = new Date(), view } = this.state;

        switch(view) {
            case 'weeks':
                return moment(date).format('MMMM YYYY')
            case 'months':
                return moment(date).format('YYYY')
            case 'years':
                const { yearsFrom, yearsTo } = getYearsInterval(date, config.yearsInterval);
                const year = 'YYYY';
                return yearsFrom.format(year) + ' — ' + yearsTo.format(year);
            default:
                return <p>Error</p>
        }
    }

    handleOnTitleClick() {
        const { view } = this.state;

        switch(view) {
            case 'weeks':
                this.setState({ view: 'months' });
                break;
            case 'months':
                this.setState({ view: 'years' });
                break;
            case 'years':
                this.setState({ view: 'weeks' });
                break;
            default:
                return
        }
    }

    handleOnTodayClick() {
        this.handleOnDayClick(moment());
    }

    handleOnTomorrowClick() {
        this.handleOnDayClick(moment().add(1, 'day'));
    }

    handleOnNextWeekClick() {
        this.handleOnDayClick(moment().weekday(7));
    }

    handleOnDayClick(date) {
        this.handleOnDateClick(date);
        this.props.onChange(moment( date ).toDate());
    }

    handleOnMonthClick(date) {
        this.setState({ view: 'weeks' });
        this.handleOnDateClick(date);
    }

    handleOnYearClick(date) {
        this.setState({ view: 'months' });
        this.handleOnDateClick(date);
    }

    handleOnDateClick(date) {
        this.setState({ date });
    }

    handleOnMoveClick(direction = 1) {
        const { date, view } = this.state;

        switch(view) {
            case 'weeks':
                this.setState({ date: moment(date).add(1 * direction, 'month') });
                break;
            case 'months':
                this.setState({ date: moment(date).add(1 * direction, 'year') });
                break;
            case 'years':
                const years = config.yearsInterval * 2 + 1;
                this.setState({ date: moment(date).add(years * direction, 'year') });
                break;
            default:
                return;
        }
    }

    handleOnNextClick() {
        this.handleOnMoveClick();
    }

    handleOnPrevClick() {
        this.handleOnMoveClick(-1);
    }

    render() {
        const {
            format = defaults.format,
            input = defaults.input,
            leftArrow = defaults.leftArrow,
            rightArrow = defaults.rightArrow,
            styles = {}
        } = this.props;

        return (
            <div className={ classes.container + ( this.state.closing ? ` ${classes.containerClosing}` : '' ) }
                style={{ zIndex: 1001 }}>

                <input type="text"
                    className={ styles.input || classes.input }
                    value={ this.state.input }
                    onChange={ this.onInputChange }
                    onClick={ this.handleOnInputClick }
                    placeholder={ format }
                    />

                {
                    this.state.expanded &&
                    <div className={ classes.calendarContainer }>
                        <div className={ classes.controls }>
                            <div className={ classes.leftArrow }
                                 onClick={ this.handleOnPrevClick }>
                                { leftArrow }
                            </div>
                            <div className={ classes.title }
                                 onClick={ this.handleOnTitleClick }>
                                { this.renderViewTitle() }
                            </div>
                            <div className={ classes.rightArrow }
                                 onClick={ this.handleOnNextClick }>
                                { rightArrow }
                            </div>
                        </div>

                        <div className={ classes.calendar }>
                            { this.renderCalendarView() }
                        </div>

                        <div className={ classes.toolbox }>
                            <button type="button" onClick={ this.handleOnTodayClick }>
                                Today
                            </button>
                            <button type="button" onClick={ this.handleOnTomorrowClick }>
                                Tomorrow
                            </button>
                            <button type="button" onClick={ this.handleOnNextWeekClick }>
                                Next week
                            </button>
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default BetterDatePicker;

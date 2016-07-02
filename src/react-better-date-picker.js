import React, { Component, PropTypes } from 'react';
import moment from 'moment';

const config = {
    classPrefix: 'better-date-picker',
    yearsInterval: 4,
    yearsCols: 3,
    monthsCols: 4,
    weeksCols: 7
};

// List of classes used in the module.
// Will allow to easily swap "themes" as well
// as providing a bare component with no styling
const classes = {
    container:         `${config.classPrefix}-container`,
    input:             `${config.classPrefix}-input`,
    calendarContainer: `${config.classPrefix}-calendar-container`,
    calendar:          `${config.classPrefix}-calendar`,
    controls:          `${config.classPrefix}-controls`,
    title:             `${config.classPrefix}-title`,
    leftArrow:         `${config.classPrefix}-left-arrow`,
    rightArrow:        `${config.classPrefix}-right-arrow`,
    current:           `${config.classPrefix}-current`,

    // WeeksView
    weeksView:    `${config.classPrefix}-weeks-view`,
    weekdayName:  `${config.classPrefix}-weeks-name`,
    weekdayNames: `${config.classPrefix}-weeks-names`,
    weeksRow:     `${config.classPrefix}-weeks-row`,
    weeksCell:    `${config.classPrefix}-weeks-cell`,

    // MonthsView
    monthsView: `${config.classPrefix}-years-view`,
    monthsRow:  `${config.classPrefix}-years-row`,
    monthsCell: `${config.classPrefix}-years-cell`,

    // YearsView
    yearsView: `${config.classPrefix}-years-view`,
    yearsRow:  `${config.classPrefix}-years-row`,
    yearsCell: `${config.classPrefix}-years-cell`,
};

const defaults = {
    leftArrow: <span>‹</span>,
    rightArrow: <span>›</span>,

    // USA format
    format: 'DD-MMM-YYYY'
};

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
};

const makeInterval = length => Array.apply(null, Array(length));

const getYearsInterval = date => {
    const dist = config.yearsInterval;
    const yearsFrom = moment(date).add(-1 * dist, 'year');
    const yearsTo = moment(date).add(dist, 'year');
    return { yearsFrom, yearsTo };
}

const getTotalWeeksInMonth = date =>
    moment.duration(
        moment(date).endOf('month') - moment(date).startOf('month')
    ).weeks() + 1;

class WeeksView extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnDateClick = this.handleOnDateClick.bind(this);
    }

    handleOnDateClick(date) {
        this.props.onDateClick(date);
    }

    render() {
        const { date } = this.props;
        const monthFrom = moment(date).month(0);
        const format = 'MMM';
        const rows = getTotalWeeksInMonth(date);
        const now = moment();
        const weekdays = makeInterval(config.weeksCols).map((_, i) =>
                moment().weekday(i).format('dd'));

        return (
            <div className={ classes.weeksView }>
                <div className={ classes.weekdayNames }>
                    { weekdays.map((weekday, i) =>
                        <div key={ i } className={ classes.weekdayName }>
                            { weekday }
                        </div>
                    ) }
                </div>
                { makeInterval(rows).map(
                    (_, index) =>
                    <div key={ index } className={ classes.weeksRow }>
                    { weekdays.map((_, i) =>
                        <div key={ i } className={ classes.weeksCell }>
                        { i }
                        </div>
                    ) }
                    </div>
                ) }
            </div>
        );
    }
};

class MonthsView extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnDateClick = this.handleOnDateClick.bind(this);
    }

    handleOnDateClick(date) {
        this.props.onDateClick(date);
    }

    render() {
        const { date } = this.props;
        const monthFrom = moment(date).month(0);
        const format = 'MMM';
        const rows = 12 / config.monthsCols;
        const now = moment();

        return (
            <div className={ classes.yearsView }>
            { makeInterval(rows).map((_, i) =>
                <div key={ i }
                    className={ classes.monthsRow }>
                    { makeInterval(config.monthsCols).map( (_, j) => {
                        const next = moment( monthFrom ).add(i + j + ( config.monthsCols - 1 ) * i, 'month');
                        return (
                            <div key={ j }
                                onClick={ () => this.handleOnDateClick(moment( next )) }
                                className={
                                    classes.monthsCell +
                                    ( next.isSame(now, 'month') ? ` ${ classes.current }` : '' )
                                }
                                >
                                { next.format(format) }
                            </div>
                        )
                    }) }
                </div>
            ) }
            </div>
        );
    }
};

class YearsView extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnDateClick = this.handleOnDateClick.bind(this);
    }

    handleOnDateClick(date) {
        this.props.onDateClick(date);
    }

    render() {
        const { date } = this.props;
        const { yearsFrom } = getYearsInterval(date);
        const format = 'YYYY';
        const rows = ( config.yearsInterval * 2 + 1 ) / config.yearsCols;
        const now = moment();

        return (
            <div className={ classes.yearsView }>
            { makeInterval(rows).map((_, i) =>
                <div key={ i }
                    className={ classes.yearsRow }>
                    { makeInterval(config.yearsCols).map( (_, j) => {
                        const next = moment( yearsFrom ).add(i + j + ( config.yearsCols - 1 ) * i, 'year');
                        return (
                            <div key={ j }
                                onClick={ () => this.handleOnDateClick(moment( next )) }
                                className={
                                    classes.yearsCell +
                                    ( next.isSame(now, 'year') ? ` ${ classes.current }` : '' )
                                }
                                >
                                { next.format(format) }
                            </div>
                        )
                    }) }
                </div>
            ) }
            </div>
        );
    }
};

class BetterDatePicker extends Component {
    static propTypes = {
        date: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date)
        ]),
        view: PropTypes.oneOf(['weeks', 'months', 'years'])
    };

    constructor(props) {
        super(props);

        this.state = {
            date: props.date || '',
            expanded: false,

            // view by default
            view:  props.view || 'years'
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
        this.renderCalendarView = this.renderCalendarView.bind(this);
        this.renderViewTitle = this.renderViewTitle.bind(this);
        this.handleOnYearClick = this.handleOnYearClick.bind(this);
        this.handleOnMonthClick = this.handleOnMonthClick.bind(this);
        this.handleOnDateClick = this.handleOnDateClick.bind(this);
        this.handleOnTitleClick = this.handleOnTitleClick.bind(this);
        this.handleOnMoveClick = this.handleOnMoveClick.bind(this);
        this.handleOnNextClick = this.handleOnNextClick.bind(this);
        this.handleOnPrevClick = this.handleOnPrevClick.bind(this);
    }

    onInputChange(e) {

    }

    onInputClick(e) {
        this.setState({ expanded: true });
    }

    renderCalendarView() {
        const { date, view } = this.state;

        switch(view) {
            case 'weeks':
                return <WeeksView date={ date } />
            case 'months':
                return <MonthsView date={ date } onDateClick={ this.handleOnMonthClick }/>
            case 'years':
                return <YearsView date={ date } onDateClick={ this.handleOnYearClick }/>
            default:
                return <p>Error</p>
        }
    }

    renderViewTitle() {
        const { date, view } = this.state;

        switch(view) {
            case 'weeks':
                return moment(date).format('MMMM YYYY')
            case 'months':
                return moment(date).format('YYYY')
            case 'years':
                const { yearsFrom, yearsTo } = getYearsInterval(date);
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

    handleOnDateClick(date) {
        this.setState({ date });
    }

    handleOnMonthClick(date) {
        this.setState({ view: 'weeks' });
        this.handleOnDateClick(date);
    }

    handleOnYearClick(date) {
        this.setState({ view: 'months' });
        this.handleOnDateClick(date);
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
        } = this.props;

        let value = getMomentOrNull(this.state.date, format);
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
                    onChange={ this.onInputChange }
                    onClick={ this.onInputClick }
                    placeholder={ format }
                    />

                {
                    this.state.expanded &&
                    <div className={ classes.calendarContainer }>
                        <div className={ classes.controls }>
                            <div className={ classes.leftArrow } onClick={ this.handleOnPrevClick }>
                            { leftArrow }
                            </div>
                            <div className={ classes.title } onClick={ this.handleOnTitleClick }>
                                { this.renderViewTitle() }
                            </div>
                            <div className={ classes.rightArrow } onClick={ this.handleOnNextClick }>
                            { rightArrow }
                            </div>
                        </div>

                        <div className={ classes.calendar }>
                            { this.renderCalendarView() }
                        </div>
                    </div>
                }

            </div>
        );
    }
};

export default BetterDatePicker;

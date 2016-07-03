import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import config from './config.js';
import classes from './classes.js';

import {
    makeInterval,
    getTotalWeeksInMonth,
    getFirstDayOfFirstWeek
} from './utils.js';

import {
    getYearsInterval
} from './utils.js';

export class WeeksView extends React.Component {
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
        const selected = moment(date);
        const weekdays = makeInterval(config.weeksCols).map((_, i) =>
                moment().weekday(i).format('dd'));

        const fdow = getFirstDayOfFirstWeek(date);

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
                    (_, i) =>
                    <div key={ i } className={ classes.weeksRow }>
                    { weekdays.map((_, j) => {
                        const next = moment( fdow ).add(i + j + 6 * i, 'day');
                        return (
                            <div key={ j }
                                onClick={ () => this.handleOnDateClick(moment( next )) }
                                className={
                                    classes.weeksCell +
                                    ( next.isSame(now, 'day') ? ` ${ classes.current }` : '' ) +
                                    ( next.isSame(selected, 'day') ? ` ${ classes.selected }` : '' ) +
                                    ( next.isSame(date, 'month') ? '' : ` ${ classes.weeksCellNotCurMonth }` )
                                }>
                                { next.format('D') }
                            </div>
                        );
                    }
                    ) }
                    </div>
                ) }
            </div>
        );
    }
};

export class MonthsView extends React.Component {
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
        const selected = moment(date);

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
                                    ( next.isSame(selected, 'day') ? ` ${ classes.selected }` : '' ) +
                                    ( next.isSame(now, 'day') ? ` ${ classes.current }` : '' )
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

export class YearsView extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnDateClick = this.handleOnDateClick.bind(this);
    }

    handleOnDateClick(date) {
        this.props.onDateClick(date);
    }

    render() {
        const { date } = this.props;
        const { yearsFrom } = getYearsInterval(date, config.yearsInterval);
        const format = 'YYYY';
        const rows = ( config.yearsInterval * 2 + 1 ) / config.yearsCols;
        const now = moment();
        const selected = moment(date);

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
                                    ( next.isSame(selected, 'day') ? ` ${ classes.selected }` : '' ) +
                                    ( next.isSame(now, 'day') ? ` ${ classes.current }` : '' )
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

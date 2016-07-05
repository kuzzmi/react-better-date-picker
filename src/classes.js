import config from './config.js';

// List of classes used in the module.
// Will allow to easily swap "themes" as well
// as providing a bare component with no styling
export default {
    container:            `${config.classPrefix}-container`,
    containerClosing:     `${config.classPrefix}-container-closing`,
    protector:            `${config.classPrefix}-protector`,
    input:                `${config.classPrefix}-input`,
    calendarContainer:    `${config.classPrefix}-calendar-container`,
    calendar:             `${config.classPrefix}-calendar`,
    toolbox:              `${config.classPrefix}-toolbox`,
    controls:             `${config.classPrefix}-controls`,
    title:                `${config.classPrefix}-title`,
    leftArrow:            `${config.classPrefix}-left-arrow`,
    rightArrow:           `${config.classPrefix}-right-arrow`,

    current:              `${config.classPrefix}-current`,
    selected:             `${config.classPrefix}-selected`,

    // WeeksView
    weeksView:            `${config.classPrefix}-weeks-view`,
    weekdayName:          `${config.classPrefix}-weeks-name`,
    weekdayNames:         `${config.classPrefix}-weeks-names`,
    weeksRow:             `${config.classPrefix}-weeks-row`,
    weeksCell:            `${config.classPrefix}-weeks-cell`,
    weeksCellNotCurMonth: `${config.classPrefix}-weeks-cell-not-current-month`,

    // MonthsView
    monthsView:           `${config.classPrefix}-years-view`,
    monthsRow:            `${config.classPrefix}-years-row`,
    monthsCell:           `${config.classPrefix}-years-cell`,

    // YearsView
    yearsView:            `${config.classPrefix}-years-view`,
    yearsRow:             `${config.classPrefix}-years-row`,
    yearsCell:            `${config.classPrefix}-years-cell`
};


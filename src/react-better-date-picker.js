import React from 'react';

const classes = {
    container: 'better-date-picker-container'
};

class BetterDatePicker extends React.Component {
    render() {
        return (
            <div className={ classes.container }>
                <p>
                    Hello, I'm container!
                </p>
            </div>
        );
    }
};

export default BetterDatePicker;

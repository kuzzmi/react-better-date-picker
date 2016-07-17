import React from 'react';
import { shallow, mount } from 'enzyme';
import BetterDatePicker from '../src/react-better-date-picker';
// , mount, render

describe('react-better-date-picker', function() {
    it('should have one input', function() {
        expect(shallow(<BetterDatePicker />).find('input[type="text"]').length).toBe(1);
    });

    it('should have an input with no value if date is not provided', function() {
        expect(shallow(<BetterDatePicker />).find('input[type="text"]').props().value).toBe('');
    });

    it('should have an input with no value if date is incorrect', function() {
        expect(mount(<BetterDatePicker date={ null }/>).find('input[type="text"]').props().value).toBe('');
        expect(mount(<BetterDatePicker date={ 'foobar' }/>).find('input[type="text"]').props().value).toBe('');
        expect(mount(<BetterDatePicker date={ 0 }/>).find('input[type="text"]').props().value).toBe('');
        expect(mount(<BetterDatePicker date={ NaN }/>).find('input[type="text"]').props().value).toBe('');
        expect(mount(<BetterDatePicker date={ undefined }/>).find('input[type="text"]').props().value).toBe('');
        expect(mount(<BetterDatePicker date={ {} }/>).find('input[type="text"]').props().value).toBe('');
        expect(mount(<BetterDatePicker date={ [] }/>).find('input[type="text"]').props().value).toBe('');
    });

    it('should output date in a text input field with no formatting', function() {
        const date = new Date('2016-01-01T00:00:00Z');
        const input = mount(<BetterDatePicker date={ date }/>).find('input[type="text"]');
        const expectedPartial = '2016-01-01';

        expect(input.props().value.indexOf(expectedPartial)).toBe(0);
    });

    it('should output date in a text input field with no formatting', function() {
        const date = new Date('2016-01-01T00:00:00Z');
        const format = 'LL';
        const input = mount(<BetterDatePicker date={ date } format={ format }/>).find('input[type="text"]');

        expect(input.props().value).toEqual('January 1, 2016');
    });

    it('should show datepicker on input field click', () => {
        const wrapper = shallow(<BetterDatePicker />);
        const input = wrapper.find('input[type="text"]');
        input.simulate('click');
        expect(wrapper.find('.better-date-picker-calendar-container').length).toBe(1);
        expect(wrapper.find('.better-date-picker-toolbox').length).toBe(1);
        expect(wrapper.find('.better-date-picker-calendar').length).toBe(1);
        expect(wrapper.find('.better-date-picker-title').length).toBe(1);
        expect(wrapper.find('.better-date-picker-left-arrow').length).toBe(1);
        expect(wrapper.find('.better-date-picker-right-arrow').length).toBe(1);
    });

    it('should show calendar on weeks view by default', () => {
        const wrapper = mount(<BetterDatePicker />);
        const input = wrapper.find('input[type="text"]');
        input.simulate('click');
        expect(wrapper.find('.better-date-picker-weeks-view').length).toBe(1);
    });

    it('should set a date even if provided date is null', () => {
        const wrapper = mount(<BetterDatePicker date={ null } />);
        const input = wrapper.find('input[type="text"]');
        input.simulate('click');
        expect(wrapper.find('.better-date-picker-title').text().indexOf('2016')).not.toEqual(-1);
    });

    // it('contains spec with an expectation', function() {
    //     expect(shallow(<BetterDatePicker />).is('.foo')).toBe(true);
    // });
    //
    // it('contains spec with an expectation', function() {
    //     expect(mount(<BetterDatePicker />).find('.foo').length).toBe(1);
    // });
    //
    // it('can run an expectation with render', function() {
    //     expect(render(<BetterDatePicker />).find('.foo').length).toBe(1);
    // });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import BetterDatePicker from '../src/react-better-date-picker';

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
        const date = '2016-01-01';
        const input = mount(<BetterDatePicker date={ date } />).find('input[type="text"]');
        const expectedPartial = '2016-01-01';

        expect(input.props().value.indexOf(expectedPartial)).toBe(0);
    });

    it('should output date in a text input field with formatting', function() {
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

    it('should display proper years range', () => {
        const date = new Date('2016-01-01T00:00:00Z');
        const wrapper = mount(<BetterDatePicker date={ date } />);
        const input = wrapper.find('input[type="text"]');
        input.simulate('click');

        const title = wrapper.find('.better-date-picker-title');
        title.simulate('click');
        title.simulate('click');

        expect(title.text().indexOf('2012')).not.toEqual(-1);
        expect(title.text().indexOf('2020')).not.toEqual(-1);
    });

    it('should restrict available views to one view if the only view is set as available', () => {
        const wrapper = mount(<BetterDatePicker date={ null } views={[ 'weeks' ]} />);
        const input = wrapper.find('input[type="text"]');
        input.simulate('click');
        const title = wrapper.find('.better-date-picker-title');
        title.simulate('click');
        expect(wrapper.find('.better-date-picker-weeks-view').length).toBe(1);
    });

    it('should restrict available views to two views if only two view are set as available', () => {
        const wrapper = mount(<BetterDatePicker date={ null } views={[ 'weeks', 'years' ]} />);
        const input = wrapper.find('input[type="text"]');
        input.simulate('click');
        const title = wrapper.find('.better-date-picker-title');
        title.simulate('click');
        expect(wrapper.find('.better-date-picker-years-view').length).toBe(1);
        title.simulate('click');
        expect(wrapper.find('.better-date-picker-weeks-view').length).toBe(1);
    });

});

import React from 'react';
import {shallow, mount} from 'enzyme';

import App from './app';

describe('<App />', () => {
    it('Should renderer without crashing', () => {
        shallow(<App />);
    });

    it('Should render the items in the todo list', () => {
        const items = ['Test 1', 'Test 2', 'Test 3'];
        const wrapper = shallow(<App />);
        wrapper.setState({
            items
        });

        const lis = wrapper.find('.todo-item');
        expect(lis.length).toEqual(items.length);
        items.forEach((item, index) => {
            expect(lis.at(index).text()).toEqual(items[index]);
        });
    });

    it('Should add an item when the form is submitted', () => {
        const items = ['Test 1', 'Test 2', 'Test 3'];
        const toAdd = 'Test 4';
        const wrapper = mount(<App />);
        wrapper.setState({
            items
        });

        const input = wrapper.find('#textInput');
        input.instance().value = toAdd;

        const form = wrapper.find('.add-form');
        const preventDefault = jest.fn();
        form.simulate('submit', {
            preventDefault
        });

        expect(wrapper.state('items')).toEqual([...items, toAdd]);
        expect(preventDefault).toHaveBeenCalled();
    });
});

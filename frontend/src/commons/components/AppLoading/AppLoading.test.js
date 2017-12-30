import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';

import {mountWithIntl} from '../../i18n/intl-enzyme-test-helper';

import {Provider} from 'react-redux';

import ConnectedAppLoading, {AppLoading} from './AppLoading';


it('renders without crashing', () => {
    const wrapper = shallow(<AppLoading/>);

    expect(wrapper).toMatchSnapshot();
});

it('Should render AppLoading', () => {
    const wrapper = shallow(<AppLoading show={true}/>);

    expect(wrapper).toMatchSnapshot();
});

it('The rendered component must have the classes', () => {
    const test = mountWithIntl(<AppLoading show={true}/>);

    expect(test.find('.app-loading').length).toBeTruthy();
    expect(test.find('.app-loading__message').length).toBeTruthy();
});

it('Test the AppLoading with connect() from react-redux', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        loading: true
    });

    const wrapper = shallow(
        <Provider store={store}>
            <ConnectedAppLoading/>
        </Provider>
    );

    expect(wrapper).toMatchSnapshot();
});
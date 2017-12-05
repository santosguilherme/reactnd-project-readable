import React, {Component} from 'react';

import {Switch, Route} from 'react-router-dom';

import {IntlProvider} from 'react-intl';
import {getIntlProviderConfig} from './intl';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import AllPosts from '../Posts/All/AllPosts';
import PostDetails from '../Posts/Details/PostDetails';

//TODO: remove
const theme = createMuiTheme({
    palette: {}
});


class App extends Component {
    render() {
        const intlProviderProps = getIntlProviderConfig();


        return (
            <MuiThemeProvider theme={theme}>
                <IntlProvider {...intlProviderProps}>
                    <Switch>
                        <Route exact path="/" component={AllPosts}/>
                        <Route path="/:category/posts/:post" component={PostDetails}/>
                    </Switch>
                </IntlProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;

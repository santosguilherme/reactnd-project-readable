import React, {Component} from 'react';

import {Switch, Route} from 'react-router-dom';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import {IntlProvider} from 'react-intl';
import {getIntlProviderConfig} from './intl';

import AllPosts from '../Posts/All/AllPosts';
import PostDetails from '../Posts/Details/PostDetails';
import CategoryPosts from '../Posts/Category/CategoryPosts';


const theme = createMuiTheme();

class App extends Component {
    render() {
        const intlProviderProps = getIntlProviderConfig();

        return (
            <MuiThemeProvider theme={theme}>
                <IntlProvider {...intlProviderProps}>
                    <Switch>
                        <Route exact path="/" component={AllPosts}/>
                        <Route exact path="/:category" component={CategoryPosts}/>
                        <Route path="/:category/posts/:post" component={PostDetails}/>
                    </Switch>
                </IntlProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;

/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import TopRedditPosts from 'containers/TopRedditPosts';

import './app.css';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});
export default function App() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/reddit" component={TopRedditPosts}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </ ThemeProvider>
    </div>
  );
}

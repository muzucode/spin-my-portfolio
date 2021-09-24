import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Portfolio from '../Portfolio';
import SignInView from '../Views/SignInView';
import SignUpView from '../Views/SignUpView';
import LeaderboardsView from '../Views/LeaderboardsView';
import SpinAssetView from "../Views/SpinAssetView";

export default class AppRouterView extends React.Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path= "/" render={() => (
            <Redirect to="/my-portfolio"/>
          )}/>
          <Route exact path='/my-portfolio' component={Portfolio} />
          <Route exact path='/signin' component={SignInView} />
          <Route exact path='/signup' component={SignUpView} />
          <Route exact path='/leaderboards' component={LeaderboardsView} />
          <Route exact path='/spin' component={SpinAssetView} />
        </Switch>
      </Router>
    )
  } 
}
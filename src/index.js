import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import ChangesQueryView from "./components/changes/ChangesQueryView";
import AboutView from "./components/AboutView";
import SnapshotQueryView from "./components/snapshots/SnapshotQueryView";
import SnapshotsOnAnyObjectView from "./components/snapshots/SnapshotsOnAnyObjectView";
import SnapshotsOnEntityView from "./components/snapshots/SnapshotsOnEntityView";
import SnapshotsOnClassView from "./components/snapshots/SnapshotsOnClassView";
import ChangesOnAnyObjectView from "./components/changes/ChangesOnAnyObjectView";
import ChangesOnClassView from "./components/changes/ChangesOnClassView";
import ChangesOnEntityView from "./components/changes/ChangesOnEntityView";
import ShadowsQueryView from "./components/shadows/ShadowsQueryView";
import ShadowsOnAnyObjectView from "./components/shadows/ShadowsOnAnyObjectView";
import ShadowsOnClassView from "./components/shadows/ShadowsOnClassView";
import ShadowsOnEntityView from "./components/shadows/ShadowsOnEntityView";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Switch>
          <Route exact path="/">
            <Redirect to={"/snapshots"} />
          </Route>
          <Route exact path="/snapshots" component={SnapshotQueryView} />
          <Route
            exact
            path="/snapshots/onAnyObject"
            component={SnapshotsOnAnyObjectView}
          />
          <Route
            exact
            path="/snapshots/onClass/:cls"
            render={(props) => (
              <SnapshotsOnClassView cls={props.match.params.cls} />
            )}
          />
          <Route
            exact
            path="/snapshots/onEntity/:entity/:id"
            render={(props) => (
              <SnapshotsOnEntityView
                entity={props.match.params.entity}
                id={props.match.params.id}
              />
            )}
          />
          <Route exact path="/shadows" component={ShadowsQueryView} />
          <Route
            exact
            path="/shadows/onAnyObject"
            component={ShadowsOnAnyObjectView}
          />
          <Route
            exact
            path="/shadows/onClass/:cls"
            render={(props) => (
              <ShadowsOnClassView cls={props.match.params.cls} />
            )}
          />
          <Route
            exact
            path="/shadows/onEntity/:entity/:id"
            render={(props) => (
              <ShadowsOnEntityView
                entity={props.match.params.entity}
                id={props.match.params.id}
              />
            )}
          />

          <Route exact path="/changes" component={ChangesQueryView} />
          <Route
            exact
            path="/changes/onAnyObject"
            component={ChangesOnAnyObjectView}
          />
          <Route
            exact
            path="/changes/onClass/:cls"
            render={(props) => (
              <ChangesOnClassView cls={props.match.params.cls} />
            )}
          />
          <Route
            exact
            path="/changes/onEntity/:entity/:id"
            render={(props) => (
              <ChangesOnEntityView
                entity={props.match.params.entity}
                id={props.match.params.id}
              />
            )}
          />
          <Route exact path="/about" component={AboutView} />
        </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

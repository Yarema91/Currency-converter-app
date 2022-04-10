import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from './Navbar';
import HistoryPage from "../pages/HistoryPage";
import GraphPage from "../pages/GraphPage";
import ComparisonPage from "../pages/ComparisonPage";
import ConversionPage from "../pages/ConversionPage";

function AppRouter() {
    return (
        <HashRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={ConversionPage} />
                <Route path="/history" component={HistoryPage} />
                <Route path="/comparison" component={ComparisonPage} />
                <Route path="/graph" component={GraphPage} />
            </Switch>
        </HashRouter>
    );
}
export default AppRouter;

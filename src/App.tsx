import React from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import Header from "./pages/Navbar";
import HistoryPage from "./pages/HistoryPage";
import GraphPage from "./pages/GraphPage";
import ComparisonPage from "./pages/ComparisonPage";
import ConversionPage from "./pages/ConversionPage";
// import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { selectorSlice } from "./store/SelectedCurencySlice";



const App = () => {

    return (
        <HashRouter>
            <Header />
            <Switch>
                <Route exact
                    path="/" component={ConversionPage}
                />
                 <Route path="/history"
                    component={HistoryPage}
                />
                 <Route 
                    path="/comparison" component={ComparisonPage}
                />
                <Route path="/graph"
                    component={GraphPage}
                />
            </Switch>
            {/* <Footer /> */}
        </HashRouter>
    )
}

export default App

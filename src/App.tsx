import React from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
// import CardPage from "./pages/CardPage";
import Header from "./pages/Navbar";
// import Footer from "./components/project/Footer";
import HistoryPage from "./pages/HistoryPage";
import GraphPage from "./pages/GraphPage";
import ComparisonPage from "./pages/ComparisonPage";
import ConversionPage from "./pages/ConversionPage";
// import { useAppSelector } from "./hooks/redux";


const App = () => {
    // const {} = useAppSelector(state => state.productReducer.products);

    return (
        <HashRouter>
            <Header />
            <Switch>
                <Route exact
                    path="/" component={ConversionPage}
                />
                {/* <Route path="/card/:id"
                    component={CardPage}
                /> */}
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

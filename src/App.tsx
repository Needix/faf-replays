import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import LOG from "./utils/Logger.ts";
import appConfig from "./AppConfig.ts";
import ReplayPage from "./pages/ReplayPage.tsx";
import PlayersPage from "./pages/PlayersPage.tsx";
import RequestReplayPage from "./pages/RequestReplayPage.tsx";

function App() {

    LOG.info("App started: " + appConfig.appName);
    LOG.info("App-Version: " + appConfig.version);
    LOG.info("App-Environment: " + appConfig.environment);
    LOG.info("App-LogLevel: " + appConfig.logLevel);

    return (
        <Router>
            <Routes>
                <Route path="*" element={<HomePage/>}/>
                <Route path="/replays" element={<ReplayPage/>}/>
                <Route path="/players" element={<PlayersPage/>}/>
                <Route path="/request" element={<RequestReplayPage/>}/>
            </Routes>
        </Router>
    )
}

export default App

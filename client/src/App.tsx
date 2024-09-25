import "./App.css";
import { Route, Routes } from "react-router-dom";
import Hompage from "./pages/homepage/homepage.component";
import HistorySideBar from "./components/history-sidebar/history-sidebar.component";
import "./assets/styles/main.scss"
import "./App.css"
import SearchResults from "./components/search-results/search-results.component";

function App() {
	return (
		<>
			<div className="appContainer">
				<div>
        <HistorySideBar />
        </div>
				<div  className="content">
					<Routes>
						<Route path='/' element={<Hompage />} />
            <Route path='/searchResults' element={<SearchResults />} />
						<Route path='*' element={<h1>Page Not Found</h1>} />
					</Routes>
				</div>
			</div>
		</>
	);
}

export default App;

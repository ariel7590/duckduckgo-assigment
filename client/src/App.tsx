import "./App.css";
import Hompage from "./pages/homepage/homepage.component";
import HistorySideBar from "./components/history-sidebar/history-sidebar.component";
import "./assets/styles/main.scss"
import "./App.css"

function App() {
	return (
		<>
			<div className="appContainer">
			<HistorySideBar />
			<div  className="content">
			<Hompage />
			</div>
			</div>
		</>
	);
}

export default App;

import './reset.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/Shop';
import CartPage from './pages/Cart';
import HistoryPage from './pages/History';
import Header from './components/Header';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<ShopPage />}></Route>
					<Route path="/cart" element={<CartPage />}></Route>
					<Route path="/history" element={<HistoryPage />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;

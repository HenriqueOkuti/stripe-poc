import axios from 'axios';
import Header from '../components/Header';

export default function HistoryPage() {
	verifyLocalStorage();

	return (
		<>
			<Header />
			<div>HistoryPage</div>
		</>
	);
}

function verifyLocalStorage() {
	const SERVER_URL = 'http://localhost:4000/verify';
	const idToVerify = localStorage.getItem('transaction id: ');
	const body = {
		params: {
			paymentId: idToVerify,
		},
	};

	console.log(body);

	axios.get(SERVER_URL, body);
}

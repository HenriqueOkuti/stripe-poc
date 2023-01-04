import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

export default function HistoryPage() {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		verifyLocalStorage();
		getHistoryOfPurchases(setHistory);
	}, []);

	console.log(history);

	return (
		<>
			<Header />
			<div>
				{history.map((purchase) =>
					purchase.valid ? RenderPurchase(purchase) : ''
				)}
			</div>
		</>
	);
}

function RenderPurchase(purchase) {
	return <PurchaseContainer>PurchaseId: {purchase.id}</PurchaseContainer>;
}

const PurchaseContainer = styled.div``;

function verifyLocalStorage() {
	const SERVER_URL = 'http://localhost:4000/verify';
	const idToVerify = localStorage.getItem('transaction id: ');
	const body = {
		params: {
			paymentId: idToVerify,
		},
	};
	axios.get(SERVER_URL, body);
}

async function getHistoryOfPurchases(setHistory) {
	const SERVER_URL = 'http://localhost:4000/history';
	await axios.get(SERVER_URL).then((res) => setHistory(res.data));
}

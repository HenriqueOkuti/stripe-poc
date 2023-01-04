import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { userCart } from '../userCart/userCart';
import axios from 'axios';

export default function ShopPage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchItems(setProducts);
	}, []);

	return (
		<>
			<Header />
			<ProductsContainer>
				{products.map((product) => RenderProduct(product))}
			</ProductsContainer>
		</>
	);
}

async function fetchItems(setProducts) {
	const SERVER_URL = 'http://localhost:4000';
	axios.get(`${SERVER_URL}/items`).then((res) => setProducts(res.data));
}

function RenderProduct(product) {
	return (
		<ItemContainer
			onClick={() => {
				userCart.push({ ...product, quantity: 1 });
			}}
		>
			<ImageContainer color={product.hex}></ImageContainer>
			<div>{`${product.name}`}</div>
			<div>{`R$ ${product.price.toFixed(2)}`}</div>
		</ItemContainer>
	);
}

const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	text-align: center;

	height: 225px;
	width: 150px;

	padding: 5px 5px 5px 5px;
	border: solid 1px #50514f;
	border-radius: 5px;
`;

const ImageContainer = styled.div`
	height: 100%;
	width: 100%;
	background-color: #${(props) => props.color};
`;

const ProductsContainer = styled.div`
	display: grid;
	grid-template-areas: 'a a a';
	grid-auto-columns: 40%;
	gap: 30px;

	margin: 0 10% 0 10%;

	div {
		display: flex;
		align-items: center;
		justify-content: center;

		margin: 20px 0 0 0;
	}
`;

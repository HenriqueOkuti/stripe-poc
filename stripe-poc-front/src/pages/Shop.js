import styled from 'styled-components';
import Header from '../components/Header';
import { userCart } from '../userCart/userCart';

const products = [
	{ id: 1, name: 'Maroon X 11', hex: 'B8336A', price: parseInt('B833', 16) },
	{ id: 2, name: 'Wisteria', hex: 'C490D1', price: parseInt('C490', 16) },
	{
		id: 3,
		name: 'Maximum Blue Purple',
		hex: 'ACACDE',
		price: parseInt('ACAC', 16),
	},
	{ id: 4, name: 'Uranian Blue', hex: 'ABDAFC', price: parseInt('ABDA', 16) },
	{
		id: 5,
		name: 'Azure X 11 Web Color',
		hex: 'E5FCFF',
		price: parseInt('E5FC', 16),
	},
	{ id: 6, name: 'Phtalo Green', hex: '14281D', price: parseInt('1428', 16) },
	{ id: 7, name: 'Hunter Green', hex: '355834', price: parseInt('3558', 16) },
	{ id: 8, name: 'Antique Bronze', hex: '6E633D', price: parseInt('6E63', 16) },
	{
		id: 9,
		name: 'Light French Beige',
		hex: 'C2A878',
		price: parseInt('C2A8', 16),
	},
	{ id: 10, name: 'Baby Powder', hex: 'F1F5F2', price: parseInt('F1F5', 16) },
];

export default function ShopPage() {
	return (
		<>
			<Header />
			<ProductsContainer>
				{products.map((product) => RenderProduct(product))}
			</ProductsContainer>
		</>
	);
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

import styled from 'styled-components';
import Header from '../components/Header';
import { userCart } from '../userCart/userCart';

export default function CartPage() {
	let auxCart = [];
	if (userCart.length > 1) {
		auxCart = adjustQuantitiesCart(userCart);
	}

	console.log(auxCart);

	return (
		<>
			<Header />
			<CartContainer>
				<CartHeader>Cart</CartHeader>
				{auxCart.map((item) => RenderCartItem(item))}
				<BuyContainer>
					<div>
						Total: R${' '}
						{auxCart.reduce((p, c) => p + c.price * c.quantity, 0).toFixed(2)}
					</div>
					<div>Click here to Buy!</div>
				</BuyContainer>
			</CartContainer>
		</>
	);
}

function RenderCartItem(item) {
	return (
		<ItemContainer>
			<ImageContainer color={item.hex}></ImageContainer>
			<InfoContainer>
				<div>Item: {item.name}</div>
				<div>Quantity: {item.quantity}</div>
				<div>Price: R$ {(item.quantity * item.price).toFixed(2)}</div>
			</InfoContainer>
		</ItemContainer>
	);
}

function adjustQuantitiesCart(cart) {
	let hashTable = {};
	for (let i = 0; i < cart.length; i++) {
		const item = cart[i];
		if (!hashTable[item.id]) {
			hashTable[item.id] = { ...item };
		} else {
			hashTable[item.id].quantity++;
		}
	}
	const fixedCart = [];
	for (const key of Object.keys(hashTable)) {
		fixedCart.push(hashTable[key]);
	}

	return fixedCart;
}

const CartContainer = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	height: 100%;
`;

const CartHeader = styled.div`
	font-size: 26px;
	text-align: center;
`;

const ItemContainer = styled.div`
	height: 250px;

	margin: 25px 0 0 0;
	padding: 15px 0 15px 0;

	display: flex;
	justify-content: flex-start;

	background-color: #dedee0;
`;

const ImageContainer = styled.div`
	height: 100%;
	width: 40%;

	margin: 0 30px 0 30px;

	background-color: #${(props) => props.color};

	border-radius: 15px;
`;

const InfoContainer = styled.div`
	height: 100%;
	width: 40%;

	font-size: 22px;
	margin: 0 30px 0 30px;

	div {
		margin: 20px 0 0 0;
	}
`;

const BuyContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;

	width: 50%;
	height: 110px;

	margin: 55px 0 50px 25%;

	border: 1px solid black;
	border-radius: 5px;

	background-color: #f7a278;

	div {
		font-size: 26px;
		margin: 10px 0 0 0;
	}
`;

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
	const navigate = useNavigate();

	return (
		<>
			<HeaderContainer>
				<CustomHeader>Header</CustomHeader>
				<CustomMenu>
					<div onClick={() => navigate('/cart')}>Cart</div>
					<div onClick={() => navigate('/')}>Items</div>
					<div onClick={() => navigate('/history')}>History</div>
				</CustomMenu>
			</HeaderContainer>
		</>
	);
}

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	height: auto;
	width: 100%;

	font-size: 40px;
	margin: 0 0 40px 0;
`;

const CustomHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	height: 60px;
	width: 100%;

	padding: 0 0 20px 0;
	background-color: #e9e9e9;
`;

const CustomMenu = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;

	height: 60px;
	width: 100%;

	background-color: #e9e9e9;

	font-size: 26px;
	margin: 0 0 20px 0;

	div {
		text-decoration: none;
	}
`;

import styled from 'styled-components';

const Display = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 10rem;
	width: 10rem;
	border: 0.25rem solid ${({theme})=>theme.colors.textPrimary};
	h2{
		display: flex;
		color: ${({theme})=>theme.colors.textPrimary};
		font-size: 6rem;
		font-weight: 400;
	}
`

export default Display;
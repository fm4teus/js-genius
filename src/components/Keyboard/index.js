import styled from 'styled-components';

const Keyboard = styled.table`
	text-align: center;
	height: 20rem;
	width: 20rem;
	border: 0.25rem solid ${({theme})=>theme.colors.primary};
	border-collapse: collapse;
`

export default Keyboard;
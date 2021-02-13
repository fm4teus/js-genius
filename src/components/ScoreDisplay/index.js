import styled from 'styled-components';

const ScoreDisplay = styled.div`
	text-align: center;
	h3{
		margin: 0;
		font-size: 1.1rem;
		font-weight: 400;
		color: ${({theme})=>theme.colors.textPrimary};
	}
	h2{
		margin: 0;
		font-size: 6rem;
		line-height: 6rem;
		font-weight: 400;
		color: ${({theme})=>theme.colors.textPrimary};
	}
`
import styled from 'styled-components';
import Link from '../Link';
import Header from '../Header';
import ScoreDisplay from '../ScoreDisplay';
import ScoreForm from '../ScoreForm';
import Container from '../Container';

const HeaderResult = styled(Header)`
justify-content: flex-end;
`

const ResultContainer = styled.div`
	display: grid;
	grid-template-rows: 1.75fr 1fr;
	height: 60%;
`

function ResultScreen( {score} ){
	
	const Title = styled.h1`
		margin: 0;
		font-size: 3rem;
		font-weight: 400;
		color: ${({theme})=>theme.colors.textPrimary};
	`

	return(
		<>
			<Container>
				<HeaderResult>
					<Link href="/">
					<img src="../assets/fechar.svg" alt="fechar" />
					</Link>
				</HeaderResult>
				<ResultContainer>
					<Title> Fim de jogo </Title>
					<ScoreDisplay>
						<h3>score</h3>
						<h2>{score}</h2>
					</ScoreDisplay>
				</ResultContainer>
				<ScoreForm score={score} />
			</Container>
		</>
	);
}

export default ResultScreen;
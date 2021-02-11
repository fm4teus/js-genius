import styled from 'styled-components';
import Background from '../src/components/Background';
import Container from '../src/components/Container';
import Header from '../src/components/Header';
import Link from '../src/components/Link';
import Button from '../src/components/Button';

const HeaderRanking = styled(Header)`
  justify-content: flex-start;
`
const TitleRanking = styled.h2`
  color: ${({theme})=>theme.colors.textPrimary};
  margin-left: auto;
  margin-right: auto;
  font-size: 1.5rem;
`

export default function Ranking(){
    return (
        <Background>
          <Container>
            <HeaderRanking> 
              <Link href="/">
                <img src="../assets/voltar.svg" alt="voltar" />
              </Link>
              <TitleRanking>Ranking</TitleRanking>
            </HeaderRanking>
            
            <Link href="/game">
              <Button>Iniciar Jogo</Button>
            </Link>
          </Container>
        </Background>
      );
}
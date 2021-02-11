import styled from 'styled-components';
import Background from '../src/components/Background';
import Container from '../src/components/Container';
import Header from '../src/components/Header';
import Link from '../src/components/Link';
import Button from '../src/components/Button';

const HeaderResult = styled(Header)`
  justify-content: flex-end;
`

export default function Result(){
    return (
        <Background>
          <Container>
            <HeaderResult>
              <Link href="/">
                <img src="../assets/fechar.svg" alt="fechar" />
              </Link>
            </HeaderResult>
            
            <Link href="/game">
              <Button>Iniciar Jogo</Button>
            </Link>
          </Container>
        </Background>
      );
}
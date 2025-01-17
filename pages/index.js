import styled from 'styled-components';
import Button from '../src/components/Button';
import Link from '../src/components/Link';
import Background from '../src/components/Background';
import Container from '../src/components/Container';
import Header from '../src/components/Header';
import { useRouter } from 'next/router';


const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
`

const HeaderIndex = styled(Header)`
  justify-content: flex-end;
`

export default function Home() {
  const router = useRouter();
  return (
    <Background>
      <Container>
        <HeaderIndex>
          <Link href="/ranking">
            <img src="../assets/ranking.svg" alt="ranking" />
          </Link>
        </HeaderIndex>
        <LogoContainer>
          <img src="../assets/logo.svg" alt="logo" />
        </LogoContainer>
        
        <Button style={{width:'89%'}} onClick={()=>{router.push('/game')}} >Iniciar Jogo</Button>
        
      </Container>
    </Background>
  );
}

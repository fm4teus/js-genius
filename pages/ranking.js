import styled from 'styled-components';
import Background from '../src/components/Background';
import Container from '../src/components/Container';
import Header from '../src/components/Header';
import Link from '../src/components/Link';
import { useState, useEffect } from 'react';

const url = 'https://us-central1-prova-front-letras.cloudfunctions.net/ranking';

const HeaderRanking = styled(Header)`
  justify-content: flex-start;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
const TitleRanking = styled.h2`
  position: relative;
  color: ${({theme})=>theme.colors.textPrimary};
  margin-left: auto;
  margin-right: auto;
  font-size: 1.5rem;
  font-weight: 400;
`
const ScoreList = styled.div`
  margin-top: 2rem;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  div:nth-child(-n+3) p{
    color: ${({ theme })=> theme.colors.textSecondary};
  }
`
const RankingContainer = styled(Container)`
  justify-content: flex-start;
`

const ScoreBase = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  p{
    margin: 0;
    line-height: 3rem;
    display: flex;
    font-size: 1.5rem;
    color: ${({ theme })=> theme.colors.primary};
  }
  p:nth-child(2){
    width: 60%;
  }
`

function Score( { index, name, score } ){
  return(
    <ScoreBase>
      <p> {index} </p>
      <p> {name} </p>
      <p> {score} </p>
    </ScoreBase>
  );
}

function compare(a, b) {
  const scoreA = a.score;
  const scoreB = b.score;

  let comparison = 0;
  if (scoreA < scoreB) {
    comparison = 1;
  } else if (scoreA > scoreB) {
    comparison = -1;
  }
  return comparison;
}



export default function Ranking(){

  const [ranking, setRanking] = useState([]);

  useEffect(()=>{
    fetch(url)
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      setRanking(data);
    }).catch(function(error) {
      alert("Ocorreu um erro :(");
      console.log(error);
    });
  },[]);
  
  const rankingSorted = ranking;

  rankingSorted.sort(compare);

  return (
    <Background>
      <RankingContainer>
        <HeaderRanking> 
          <Link href="/">
            <img src="../assets/voltar.svg" alt="voltar" />
          </Link>
          <TitleRanking>Ranking</TitleRanking>
        </HeaderRanking>
        <ScoreList>
          {rankingSorted.map(( element, index )=>{
            return <Score 
                      key={`score__${index+1}`} 
                      index={ index+1 } 
                      name={element.name} 
                      score={element.score} />
          })}
        </ScoreList>
      </RankingContainer>
    </Background>
  );
}
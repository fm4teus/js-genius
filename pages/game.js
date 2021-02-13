import styled from 'styled-components';
import Background from '../src/components/Background';
import Container from '../src/components/Container';
import Keyboard from '../src/components/Keyboard';
import Key from '../src/components/Key';
import Display from '../src/components/Display';
import Header from '../src/components/Header';
import Link from '../src/components/Link';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const url = "https://us-central1-prova-front-letras.cloudfunctions.net/save";


const GameContainer = styled(Container)`
	justify-content: space-evenly;
`



const ResultContainer = styled.div`
	display: grid;
	grid-template-rows: 1.75fr 1fr;
	height: 60%;
`

const keys = [[1,2,3],[4,5,6],[7,8,9]];

function getRandomDigit(){
	return Math.floor(Math.random()*9)+1;
}
const HeaderResult = styled(Header)`
	justify-content: flex-end;
`

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

function ScoreForm( {score} ){
	const [name, setName] = useState('');
	
	const router = useRouter();
	
	return(
		<form
			style={{ width: "89%" }} 
			onSubmit={(event) => {
              	event.preventDefault();
				  fetch(url, {
					method: 'POST',
					body: JSON.stringify({ name: name, score: score }),
					headers: {
						'content-type': 'application/json'
					}
				})
				.then(function (data) { 
					return data.json()	
				})
				.then(function (newScore) { 
					console.log(newScore)
					router.push("/ranking");
				}).catch(function(error) {
					console.log(error);
				  });
            	}}
            >
			<Input
				name="nomeDoUsuario"
				onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
				placeholder="Digite seu nome"
				value={name}
			/>
			<Button type="submit" disabled={name.length === 0}>
				Salvar Ranking
			</Button>
        </form>

	);
}


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

export default function Game(){
	const screenStates = {
		DISPLAY: 'DISPLAY',
		GAME: 'GAME',
		RESULT: 'RESULT',
	  };
	
	const [screenState, setScreenState] = useState( screenStates.DISPLAY );   
	const firstDigit = getRandomDigit(); 
	const [ solution, setSolution ] = useState([ firstDigit ]);
	const [ index, setIndex ] = useState(0);
	const [ answerIndex, setAnswerIndex ] = useState(0);
	
	const [ animate, setAnimate ] = useState(true);
	
	const [ keyPressed, setKeyPressed ] = useState( undefined );

	useEffect(() => {
		setAnimate(true);
		const timer = setTimeout(() => {
			if(index < solution.length){
				setIndex( index+1 )
			}else{
				setScreenState(screenStates.GAME);
				setAnimate(false);
			}
			console.log("indice: ", index, "digito: ", solution[index])
		}, 300);
		return () => clearTimeout(timer);
	}, [index]);

	function nextLevel(){
		setSolution([...solution, getRandomDigit() ]);
		setAnswerIndex(0);
		setScreenState(screenStates.DISPLAY);
		setIndex(0);
	}

	function keyClicked(e){
		e.preventDefault();
		const key = e.target.dataset.key
		setKeyPressed(key);
		
		if(key == solution[answerIndex]){ 
			if( answerIndex === index-1 ){
				setTimeout(()=>{ setKeyPressed( undefined ) }, 1000)
				setTimeout(()=>{ nextLevel() }, 2000)
			}
		}else{
			setScreenState(screenStates.RESULT)
		}
		setAnswerIndex(answerIndex+1);
		
		console.log("key: ", key, "solution_ans_index: ", solution[answerIndex], "index_answer: ", answerIndex, "INDEX: ", index);
	}

	const digit = solution[index];

	return (
		<Background>
			{ screenState != screenStates.RESULT && <>
				<GameContainer>
						<Display>
							<motion.div
								transition={{ delay: 0, duration: 0.3 }}
								variants={{
								show: { opacity: [0,1,1,1,1,0] },
								static: { opacity: 1 },
								}}
								initial="static"
								animate={animate ? "show" : "static" }>
								<h2> { screenState === screenStates.GAME ? keyPressed : digit } </h2>
							</motion.div>
						</Display>
						<Keyboard>
							{keys.map((row)=>{
								return(
									<tr key={ `row__${row[2]/3}` }>
										{row.map((key) => <Key 
															key={`cell__${key}`} 
															data-key={key} 
															onClick={keyClicked} 
															disabled={screenState == screenStates.DISPLAY}
															> {key} </Key>)}
									</tr>
								)
							})}
						</Keyboard>
				</GameContainer>
			</>}
			{ screenState === screenStates.RESULT && <ResultScreen score={Number(solution.length-1)}/> }
		</Background>
	);
}

import styled from 'styled-components';
import Background from '../src/components/Background';
import Container from '../src/components/Container';
import Keyboard from '../src/components/Keyboard';
import Key from '../src/components/Key';
import Display from '../src/components/Display';
import Header from '../src/components/Header';
import Link from '../src/components/Link';
import Button from '../src/components/Button';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const GameContainer = styled(Container)`
	justify-content: space-evenly;
`

const keys = [[1,2,3],[4,5,6],[7,8,9]];

function getRandomDigit(){
	return Math.floor(Math.random()*9)+1;
}
const HeaderResult = styled(Header)`
	justify-content: flex-end;
`

const Score = styled.div`
	h2{
		font-size: 6rem;
		color: ${({theme})=>theme.colors.textPrimary};
	}
`

function ResultScreen( {score} ){
	
	return(
		<>
			<Container>
				<HeaderResult>
					<Link href="/">
					<img src="../assets/fechar.svg" alt="fechar" />
					</Link>
				</HeaderResult>
				<Score>
					<h2>{score}</h2>
				</Score>
				<Link href="/game">
					<Button>Iniciar Jogo</Button>
				</Link>
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
									<tr>
										{row.map((key) => <Key key={key} data-key={key} onClick={keyClicked}> {key} </Key>)}
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

import styled from 'styled-components';
import Background from '../src/components/Background';
import Container from '../src/components/Container';
import Keyboard from '../src/components/Keyboard';
import Key from '../src/components/Key';
import Display from '../src/components/Display';
import ResultScreen from '../src/components/ResultScreen';


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Tone from 'tone'




const GameContainer = styled(Container)`
	justify-content: space-evenly;
`

const keys = [[1,2,3],[4,5,6],[7,8,9]];

function getRandomDigit(){
	return Math.floor(Math.random()*9)+1;
}

export default function Game(){
	const screenStates = {
		DISPLAY: 'DISPLAY',
		GAME: 'GAME',
		RESULT: 'RESULT',
	  };
	const notes = {
		1: 'C4',
		2: 'D4',
		3: 'E4',
		4: 'F4',
		5: 'G4',
		6: 'A4',
		7: 'B4',
		8: 'C5',
		9: 'D5'
	  };
	
	const firstDigit = getRandomDigit(); 
	const [screenState, setScreenState] = useState( screenStates.DISPLAY );   
	const [ solution, setSolution ] = useState([ firstDigit ]);
	const [ index, setIndex ] = useState(0);
	const [ answerIndex, setAnswerIndex ] = useState(0);
	const [ animate, setAnimate ] = useState(true);
	const [ keyPressed, setKeyPressed ] = useState( undefined );
	const synth = new Tone.Synth().toDestination();

	useEffect(() => {
		setAnimate(true);
		// som 
		synth.triggerAttackRelease( notes[solution[index]] , "8n");

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
		//som
		
		synth.triggerAttackRelease( notes[key] , "8n");

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
		
	}

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
								<h2> { screenState === screenStates.GAME ? keyPressed : solution[index] } </h2>
							</motion.div>
						</Display>
						<Keyboard>
							{keys.map((row)=>{
								return(
									<tr key={ `row__${row[2]/3}` }>
										{row.map((key) => <Key 
															key={`cell__${key}`} 
															data-key={key} 
															onClick={(screenState != screenStates.DISPLAY) ? keyClicked : undefined}
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

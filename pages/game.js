import styled from 'styled-components';
import Background from '../src/components/Background';
import Container from '../src/components/Container';
import Keyboard from '../src/components/Keyboard';
import Key from '../src/components/Key';
import Display from '../src/components/Display';
import { useState, useEffect } from 'react';


const GameContainer = styled(Container)`
	justify-content: space-evenly;
`

const keys = [[1,2,3],[4,5,6],[7,8,9]];

function getRandomDigit(){
	return Math.floor(Math.random()*9)+1;
}


export default function Result(){
	
	const firstDigit = getRandomDigit(); 
	const [ solution, setSolution ] = useState([ firstDigit, 4,2,4,2,4,2 ]);
	const [ index, setIndex ] = useState( 0 );

	useEffect(() => {
		const timer = setTimeout(() => {
			setIndex( index+1 );
		}, 300);
		return () => clearTimeout(timer);
	}, );

	function keyClicked(e){
		const keyPressed = e.target.dataset.key;
		e.preventDefault();
	}

	return (
		<Background>
			<GameContainer>
				<Display>
					<h2> { solution[index] } </h2>
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
		</Background>
	);
}

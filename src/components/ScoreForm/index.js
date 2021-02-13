import Button from '../Button';
import Input from '../Input';
import { useRouter } from 'next/router';
import { useState } from 'react';


function ScoreForm( {score} ){
	const [name, setName] = useState('');
	const router = useRouter();
    const url = "https://us-central1-prova-front-letras.cloudfunctions.net/save";
	
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
					alert("Ocorreu um erro :(");
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

export default ScoreForm;
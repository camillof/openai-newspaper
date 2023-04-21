import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import './cover.scss';
import NewsItem from './NewsItem';

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const CoverGenerator = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(process.env.REACT_APP_OPENAI_API_KEY)
      },
      body: JSON.stringify({
        'prompt': `
        Let's say you are newspaper in Uruguay. I need you to generate news items, each of them having a title, and a short summary, to put them in the cover.
        The news topics are politics, sports and gossip.
        The answer should be in an plain array, in JSON format, with each element being a hash with the "title" and "short_summary" keys.
        Avoid using Uruguayan or Uruguay's on the text, we already know where the notices are from.
        Try to use real names.
        The text must be in spanish.
        The total amount of news items must be 6.
        `,
        'temperature': 0.8,
        'max_tokens': 1024,
        'n': 1,
        'presence_penalty': 0.9,
        'stop': ["\"\"\""],
      })
    };

    // fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
    //   .then(response => response.json())
    //   .then(data => {
    //     setResponse(JSON.parse(data.choices[0].text));
    // }).catch(err => {
    //   console.log('Ran out of tokens for today! Try tomorrow!');
    // }).finally(() => setLoading(false));

    setLoading(false);
    setResponse([
        {
            'title': 'Gobierno anuncia nuevas medidas para mejorar la economía',
            'short_summary': 'El gobierno ha anunciado una serie de medidas para mejorar la economía del país, entre ellas una reducción de impuestos y una mayor inversión en infraestructura.'
        },
        {
            'title': 'Lionel Messi gana el Balón de Oro por sexta vez',
            'short_summary': 'El futbolista argentino Lionel Messi ha sido galardonado con el Balón de Oro por sexta vez, convirtiéndose en el jugador con más premios de la historia.'
        },
        {
            'title': 'Cantante local se une a la lucha contra el cambio climático',
            'short_summary': 'La cantante local María Paz ha anunciado su apoyo a la lucha contra el cambio climático, prometiendo donar parte de sus ingresos a organizaciones ambientales.'
        },
        {
            'title': 'Selección uruguaya clasifica para los Juegos Olímpicos',
            'short_summary': 'La selección uruguaya de fútbol ha logrado clasificar para los Juegos Olímpicos de Tokio 2020 tras vencer a Paraguay en la última ronda de eliminatorias.'
        },
        {
            'title': 'Ex presidente acusado de corrupción',
            'short_summary': 'El ex presidente de Uruguay, Juan Carlos Varela, ha sido acusado de corrupción por el Ministerio Público por supuestamente haber recibido sobornos durante su mandato.'
        },
        {
            'title': 'Famoso actor se casa con su novia',
            'short_summary': 'El actor uruguayo Pablo Rodríguez se ha casado con su novia, la actriz argentina María Soledad, en una ceremonia privada celebrada en Montevideo.'
        }
    ]);

  }, []);

  if (loading) {
    return (
      <Loading/>
    )
  }

  // Split the response array into two columns
  const half = Math.ceil(response.length / 2);
  const leftColumn = response.slice(0, half);
  const rightColumn = response.slice(half);

  return (
    <>
      <h1 className='title-header'>EL CONSERVADOR</h1>
      <div className='newspaper-cover'>
        <div>
          <NewsItem item={leftColumn[0]} className='main' />

          {leftColumn.slice(1).map((item, index) => (
            <NewsItem item={item} key={index}/>
          ))}
        </div>
        <div>
          {rightColumn.map((item, index) => (
            <NewsItem item={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );


};

export default CoverGenerator;

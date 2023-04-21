import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import './cover.scss';
import NewsItem from './NewsItem';


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

    fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
      .then(response => response.json())
      .then(data => {
        setResponse(JSON.parse(data.choices[0].text));
    }).catch(err => {
      console.log('Ran out of tokens for today! Try tomorrow!');
    }).finally(() => setLoading(false));
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

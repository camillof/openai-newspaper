import React, { useEffect, useState } from 'react';
import { SquareLoader } from 'react-spinners';

const NewsItem = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(process.env.REACT_APP_OPENAI_API_KEY)
      },
      body: JSON.stringify({
        'prompt': props.item.title,
        'n': 1,
        'size': '256x256'
      })
    }

    fetch('https://api.openai.com/v1/images/generations', requestOptions)
      .then(response => response.json())
      .then(data => {
        setImage(data.data[0].url);
    }).catch(err => {
      console.log('Ran out of tokens for today! Try tomorrow!');
    });

  }, []);

  return(
    <div className={`news-item ${props.className ? props.className : ''}`} key={props.item.title}>
      {image ? (
        <img src={image} alt={props.item.title} />
      ) : (
        <div className='image-placeholder'>
          <SquareLoader />
        </div>
      )}
      <div>
        <h1 className='title'>{props.item.title}</h1>
        <p className='description'>{props.item.short_summary}</p>
      </div>
    </div>
  )
}

export default NewsItem;

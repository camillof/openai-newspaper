import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.scss';

const Landing = () => {
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate('/view');
  };

  return (
    <div className='landing'>
      <div className='header'>
        <h1>Newspaper Cover Generator</h1>
        <p>
          Welcome to my side project! I want to take a moment to let you know
          that this is purely for fun and was created in my free time.
          My main goal was to test out the functionality of the <a href='https://platform.openai.com/'>Open AI API</a> and
          explore the potential of using artificial intelligence to generate
          various elements and styles.
        </p>

        <p>
          It's worth noting that some of the elements and styles that you see on
          this site were generated using AI. From the text you're reading now,
          to the layout of the page, and even some of the images,
          I wanted to showcase the incredible capabilities of modern AI
          technology.
        </p>

        <p>
          I hope you enjoy exploring this project and perhaps even gain some
          inspiration for your own projects. Don't hesitate to reach out to me
          with any questions or feedback. Thanks for visiting!
        </p>
      </div>
      <div className='generate-button'>
        <button onClick={handleGenerate}>Generate</button>
      </div>
    </div>
  );
};

export default Landing;

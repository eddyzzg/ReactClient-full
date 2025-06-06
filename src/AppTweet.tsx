import React from 'react';
import Tweet from './Tweet';
import YouTubeFeed from './YouTubeFeed';

interface TweetData {
  author: string;
  text: string;
  date?: Date;
}

const tweetsData = [
  { author: "Bartosz Bossy", text: "tekst tweeta 1..." },
  { author: "Anna Kowalska", text: "drugi tweet..." },
  { author: "Jan Nowak", text: "kolejny tweet..." },
];

const App = () => {
  return (
    <div className='main-container'>
      <h1>Ostatnie tweety:</h1>
      {tweetsData.map((tweet, index) => (
        <Tweet author={tweet.author} text={tweet.text} />
      ))}

      <h1>Ostatnie wideo:</h1>
      <YouTubeFeed/>
    </div>
  );
};

export default App;
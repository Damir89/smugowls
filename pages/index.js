import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

const card1Options = ["Who", "What"];
const card2and4Options = ["eats", "can be drunk", "follows a path", "is good", "binds", "crashes", "runs", "messes up", "shrinks", "tries hard", "surprises", "makes music", "sleeps", "connects", "is balanced", "dies", "is successful", "falls apart", "is rich", "opens", "gets lighter", "flies", "is fragile", "captures", "grows", "can be worn", "hurts", "bites", "makes plans", "burns", "climbs", "ages", "is catastrophic", "can be held", "is quick", "holds water", "is strong", "twists", "rises", "is complicated", "is silent", "lies", "can be lost", "is left behind", "can be read", "loses its top", "rolls", "fails", "shelters", "is broken", "has a hole", "is edible", "is big", "has a boundary", "is free", "closes", "explodes", "locks", "stops", "is sharp", "gets dark", "moves", "is slow", "has a heart", "is clear", "floats", "is cheap", "is thirsty", "is loud", "is expensive", "falls", "is hot", "is scary", "feels wrong", "flows", "starts", "sits", "glows", "is cool", "is late", "walks", "is creepy", "is green", "shatters", "needs power", "freezes", "is wet", "looks small", "rings"];
const card3Options = ["when it", "then", "while it", "as long as it", "if it", "and never", "and hopefully", "and sadly", "and sometimes", "before it", "after it", "and always", "and", "unless it", "as soon as it", "because it", "but"];

export default function Home() {
  const [flippedCards, setFlippedCards] = useState([false, false, false, false]);
  const [cardImages, setCardImages] = useState([null, null, null, null]);
  const [questionParts, setQuestionParts] = useState(['', '', '', '']);
  const [userAnswer, setUserAnswer] = useState('');
  const [submittedAnswers, setSubmittedAnswers] = useState([]);

  useEffect(() => {
    fetchRandomImages();
    generateQuestion();
  }, []);

  const fetchRandomImages = async () => {
    const newImages = await Promise.all(
      Array(4).fill().map(() => 
        fetch('/api/random-image')
          .then(res => res.json())
          .then(data => data.image)
      )
    );
    setCardImages(newImages);
  };

  const generateQuestion = () => {
    const newQuestionParts = [
      card1Options[Math.floor(Math.random() * card1Options.length)],
      card2and4Options[Math.floor(Math.random() * card2and4Options.length)],
      card3Options[Math.floor(Math.random() * card3Options.length)],
      card2and4Options[Math.floor(Math.random() * card2and4Options.length)]
    ];
    while (newQuestionParts[1] === newQuestionParts[3]) {
      newQuestionParts[3] = card2and4Options[Math.floor(Math.random() * card2and4Options.length)];
    }
    setQuestionParts(newQuestionParts);
  };

  const flipCard = useCallback((index) => {
    if (!flippedCards[index]) {
      const newFlippedCards = [...flippedCards];
      newFlippedCards[index] = true;
      setFlippedCards(newFlippedCards);
      playFlipSound();
    }
  }, [flippedCards]);

  const playFlipSound = () => {
    const audio = new Audio('/sounds/card-flip.mp3');
    audio.play().catch(error => console.error('Error playing sound:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedAnswers([...submittedAnswers, { text: userAnswer, votes: 0 }]);
    setUserAnswer('');
  };

  const handleVote = (index) => {
    const newAnswers = [...submittedAnswers];
    newAnswers[index].votes += 1;
    setSubmittedAnswers(newAnswers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x p-8">
      <Head>
        <title>Daily Question Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">Daily Question Game</h1>

        <div className="flex space-x-4 mb-8">
          {flippedCards.map((flipped, index) => (
            <div
              key={index}
              className={`card-container ${flipped ? 'flipped' : ''}`}
              onClick={() => flipCard(index)}
            >
              <div className="card">
                <div className="card-front bg-yellow-200 flex items-center justify-center text-black text-4xl font-bold">
                  ?
                </div>
                <div 
                  className="card-back bg-cover bg-center flex items-center justify-center"
                  style={{backgroundImage: `url(${cardImages[index]})`}}
                >
                  <div className="bg-yellow-200 bg-opacity-75 p-4 rounded">
                    <span className="text-black text-2xl font-bold">{questionParts[index]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <span className="text-white text-6xl font-bold">?</span>
          </div>
        </div>

        {flippedCards.every(Boolean) && (
          <div className="mt-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Answer:</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Your answer"
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
              >
                Submit Answer
              </button>
            </form>
          </div>
        )}

        {submittedAnswers.length > 0 && (
          <div className="mt-8 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-white">Submitted Answers:</h3>
            <ul>
              {submittedAnswers.map((answer, index) => (
                <li key={index} className="flex items-center justify-between mb-2 bg-white bg-opacity-50 p-2 rounded">
                  <span>{answer.text}</span>
                  <div>
                    <span className="mr-2">Votes: {answer.votes}</span>
                    <button
                      onClick={() => handleVote(index)}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Vote
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
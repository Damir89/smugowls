import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

const cardOptions = {
  english: {
    card1: ["Who", "What"],
    card2and4: ["eats", "drinks", "follows", "is good", "binds", "crashes", "runs", "messes up", "shrinks", "tries hard", "surprises", "makes music", "sleeps", "connects", "is balanced", "dies", "succeeds", "falls apart", "is rich", "opens", "lightens", "flies", "is fragile", "captures", "grows", "wears", "hurts", "bites", "plans", "burns", "climbs", "ages", "is catastrophic", "holds", "is quick", "contains water", "is strong", "twists", "rises", "is complicated", "is silent", "lies", "loses", "is left behind", "reads", "loses its top", "rolls", "fails", "shelters", "breaks", "has a hole", "is edible", "is big", "has a boundary", "is free", "closes", "explodes", "locks", "stops", "is sharp", "darkens", "moves", "is slow", "has a heart", "is clear", "floats", "is cheap", "is thirsty", "is loud", "is expensive", "falls", "is hot", "is scary", "feels wrong", "flows", "starts", "sits", "glows", "is cool", "is late", "walks", "is creepy", "is green", "shatters", "needs power", "freezes", "is wet", "looks small", "rings"],
    card3: ["when it", "then", "while it", "as long as it", "if it", "and never", "and hopefully", "and sadly", "and sometimes", "before it", "after it", "and always", "and", "unless it", "as soon as it", "because it", "but"],
  },
  french: {
    card1: ["Qui", "Quoi"],
    card2and4: ["mange", "boit", "suit", "est bon", "lie", "s'écrase", "court", "gâche", "rétrécit", "essaie fort", "surprend", "fait de la musique", "dort", "connecte", "est équilibré", "meurt", "réussit", "s'effondre", "est riche", "ouvre", "s'allège", "vole", "est fragile", "capture", "grandit", "porte", "blesse", "mord", "planifie", "brûle", "grimpe", "vieillit", "est catastrophique", "tient", "est rapide", "contient de l'eau", "est fort", "tord", "s'élève", "est compliqué", "est silencieux", "ment", "perd", "est laissé derrière", "lit", "perd son sommet", "roule", "échoue", "abrite", "se casse", "a un trou", "est comestible", "est grand", "a une limite", "est libre", "ferme", "explose", "verrouille", "s'arrête", "est tranchant", "s'assombrit", "bouge", "est lent", "a un cœur", "est clair", "flotte", "est bon marché", "a soif", "est bruyant", "est cher", "tombe", "est chaud", "fait peur", "semble faux", "coule", "commence", "s'assoit", "brille", "est cool", "est en retard", "marche", "est effrayant", "est vert", "se brise", "a besoin d'énergie", "gèle", "est mouillé", "paraît petit", "sonne"],
    card3: ["quand il", "alors", "pendant qu'il", "tant qu'il", "s'il", "et jamais", "et avec espoir", "et tristement", "et parfois", "avant qu'il", "après qu'il", "et toujours", "et", "sauf s'il", "dès qu'il", "parce qu'il", "mais"],
  },
  german: {
    card1: ["Wer", "Was"],
    card2and4: ["isst", "trinkt", "folgt", "ist gut", "bindet", "stürzt ab", "läuft", "vermasselt", "schrumpft", "versucht hart", "überrascht", "macht Musik", "schläft", "verbindet", "ist ausgeglichen", "stirbt", "hat Erfolg", "zerfällt", "ist reich", "öffnet", "wird leichter", "fliegt", "ist zerbrechlich", "fängt", "wächst", "trägt", "verletzt", "beißt", "plant", "brennt", "klettert", "altert", "ist katastrophal", "hält", "ist schnell", "enthält Wasser", "ist stark", "verdreht", "steigt", "ist kompliziert", "ist still", "lügt", "verliert", "wird zurückgelassen", "liest", "verliert seine Spitze", "rollt", "scheitert", "schützt", "bricht", "hat ein Loch", "ist essbar", "ist groß", "hat eine Grenze", "ist frei", "schließt", "explodiert", "sperrt", "stoppt", "ist scharf", "wird dunkel", "bewegt sich", "ist langsam", "hat ein Herz", "ist klar", "schwebt", "ist billig", "ist durstig", "ist laut", "ist teuer", "fällt", "ist heiß", "ist gruselig", "fühlt sich falsch an", "fließt", "beginnt", "sitzt", "leuchtet", "ist cool", "ist spät", "geht", "ist unheimlich", "ist grün", "zerschmettert", "braucht Strom", "friert", "ist nass", "sieht klein aus", "klingelt"],
    card3: ["wenn es", "dann", "während es", "solange es", "falls es", "und nie", "und hoffentlich", "und traurigerweise", "und manchmal", "bevor es", "nachdem es", "und immer", "und", "es sei denn, es", "sobald es", "weil es", "aber"],
  },
  serbian: {
    card1: ["Ko", "Šta"],
    card2and4: ["jede", "pije", "prati", "je dobro", "vezuje", "ruši se", "trči", "upropašćuje", "smanjuje se", "jako pokušava", "iznenađuje", "pravi muziku", "spava", "povezuje", "je uravnoteženo", "umire", "uspeva", "raspada se", "je bogato", "otvara", "postaje lakše", "leti", "je krhko", "hvata", "raste", "nosi", "povređuje", "ujeda", "planira", "gori", "penje se", "stari", "je katastrofalno", "drži", "je brzo", "sadrži vodu", "je jako", "uvija", "diže se", "je komplikovano", "je tiho", "laže", "gubi", "je ostavljeno", "čita", "gubi vrh", "kotrlja se", "ne uspeva", "štiti", "lomi se", "ima rupu", "je jestivo", "je veliko", "ima granicu", "je slobodno", "zatvara", "eksplodira", "zaključava", "zaustavlja", "je oštro", "postaje tamno", "kreće se", "je sporo", "ima srce", "je jasno", "pluta", "je jeftino", "je žedno", "je glasno", "je skupo", "pada", "je vruće", "je strašno", "oseća se pogrešno", "teče", "počinje", "sedi", "sija", "je kul", "kasni", "hoda", "je jezivo", "je zeleno", "razbija se", "treba struju", "mrzne", "je mokro", "izgleda malo", "zvoni"],
    card3: ["kada", "onda", "dok", "sve dok", "ako", "i nikad", "i nadajmo se", "i nažalost", "i ponekad", "pre nego što", "nakon što", "i uvek", "i", "osim ako", "čim", "zato što", "ali"],
  }
};

export default function Home() {
  const [flippedCards, setFlippedCards] = useState([false, false, false, false]);
  const [cardImages, setCardImages] = useState([null, null, null, null]);
  const [questionParts, setQuestionParts] = useState(['', '', '', '']);
  const [userAnswer, setUserAnswer] = useState('');
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('english');

  useEffect(() => {
    fetchRandomImages();
    generateQuestion();
  }, [currentLanguage]);

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
    const options = cardOptions[currentLanguage];
    const newQuestionParts = [
      options.card1[Math.floor(Math.random() * options.card1.length)],
      options.card2and4[Math.floor(Math.random() * options.card2and4.length)],
      options.card3[Math.floor(Math.random() * options.card3.length)],
      options.card2and4[Math.floor(Math.random() * options.card2and4.length)]
    ];
    while (newQuestionParts[1] === newQuestionParts[3]) {
      newQuestionParts[3] = options.card2and4[Math.floor(Math.random() * options.card2and4.length)];
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

  const handleRefresh = () => {
    setFlippedCards([false, false, false, false]);
    fetchRandomImages();
    generateQuestion();
    setSubmittedAnswers([]);
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    handleRefresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x p-8">
      <Head>
        <title>Daily Question Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">Daily Question Game</h1>

        <div className="mb-4 space-x-2">
          <button onClick={() => changeLanguage('english')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">English</button>
          <button onClick={() => changeLanguage('french')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Français</button>
          <button onClick={() => changeLanguage('german')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Deutsch</button>
          <button onClick={() => changeLanguage('serbian')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Српски</button>
        </div>

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

        <button
          onClick={handleRefresh}
          className="mb-8 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Refresh Cards
        </button>

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
                <li key={index} className="flex justify-between items-center mb-2 p-2 bg-white rounded shadow">
                  <span>{answer.text}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">{answer.votes}</span>
                    <button
                      onClick={() => handleVote(index)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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

      <footer className="mt-8 text-white text-center">
        <p>Powered by Daily Question Game</p>
      </footer>
    </div>
  );
}

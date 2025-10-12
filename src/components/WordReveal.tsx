import React, { useState, useEffect } from 'react';
import { Player, GameConfig } from '../App';

interface WordRevealProps {
  players: Player[];
  gameConfig: GameConfig;
  currentPlayerIndex: number;
  onNextPlayer: (index: number) => void;
  onBack: () => void;
  onStartVoting?: () => void;
  onPlayerRevealed?: (playerIndex: number) => void;
  gameWord: string;
  gameHint: string;
}

// Words with individual hints organized by category
const WORDS_BY_CATEGORY: { [key: string]: { word: string; hint: string }[] } = {
  'Bollywood Movies': [
    { word: 'Dilwale Dulhania Le Jayenge', hint: 'King of Romance' },
    { word: 'Sholay', hint: 'Gabbar Singh' },
    { word: 'Lagaan', hint: 'Cricket in British India' },
    { word: '3 Idiots', hint: 'Engineering College' },
    { word: 'Dangal', hint: 'Wrestling Sisters' },
    { word: 'PK', hint: 'Alien in India' },
    { word: 'Bahubali', hint: 'Epic War Movie' },
    { word: 'Queen', hint: 'Solo Honeymoon' },
    { word: 'Zindagi Na Milegi Dobara', hint: 'Road Trip Spain' },
    { word: 'Yeh Jawaani Hai Deewani', hint: 'Mountain Adventure' }
  ],
  'Food': [
    { word: 'Biryani', hint: 'Rice with Meat' },
    { word: 'Samosa', hint: 'Triangular Snack' },
    { word: 'Butter Chicken', hint: 'Creamy Tomato Curry' },
    { word: 'Masala Dosa', hint: 'South Indian Crepe' },
    { word: 'Rajma Chawal', hint: 'Red Beans Rice' },
    { word: 'Chole Bhature', hint: 'Chickpeas with Fried Bread' },
    { word: 'Pizza', hint: 'Italian Flatbread' },
    { word: 'Pasta', hint: 'Italian Noodles' },
    { word: 'Burger', hint: 'Meat in Bun' },
    { word: 'Sandwich', hint: 'Filling between Bread' }
  ],
  'Cricket': [
    { word: 'Sachin Tendulkar', hint: 'Master Blaster' },
    { word: 'Virat Kohli', hint: 'Run Machine' },
    { word: 'MS Dhoni', hint: 'Captain Cool' },
    { word: 'IPL', hint: 'T20 League' },
    { word: 'Test Match', hint: '5 Day Game' },
    { word: 'Sixer', hint: 'Boundary Over Rope' },
    { word: 'Wicket', hint: 'Stumps Fall' },
    { word: 'Bowler', hint: 'Throws the Ball' },
    { word: 'Batsman', hint: 'Hits the Ball' },
    { word: 'Umpire', hint: 'Game Judge' }
  ],
  'Cities': [
    { word: 'Mumbai', hint: 'City of Dreams' },
    { word: 'Delhi', hint: 'Capital of India' },
    { word: 'Bangalore', hint: 'Silicon Valley' },
    { word: 'Chennai', hint: 'Auto Capital' },
    { word: 'Kolkata', hint: 'City of Joy' },
    { word: 'Pune', hint: 'Oxford of East' },
    { word: 'Hyderabad', hint: 'City of Pearls' },
    { word: 'Ahmedabad', hint: 'Manchester of India' },
    { word: 'Jaipur', hint: 'Pink City' },
    { word: 'Kochi', hint: 'Queen of Arabian Sea' }
  ],
  'Festivals': [
    { word: 'Diwali', hint: 'Festival of Lights' },
    { word: 'Holi', hint: 'Festival of Colors' },
    { word: 'Dussehra', hint: 'Victory of Good' },
    { word: 'Eid', hint: 'Muslim Festival' },
    { word: 'Christmas', hint: 'Birth of Jesus' },
    { word: 'Ganesh Chaturthi', hint: 'Elephant God' },
    { word: 'Navratri', hint: 'Nine Nights' },
    { word: 'Karva Chauth', hint: 'Wife Fasts for Husband' },
    { word: 'Raksha Bandhan', hint: 'Brother Sister Bond' },
    { word: 'Janmashtami', hint: 'Birth of Krishna' }
  ],
  'Sweets': [
    { word: 'Gulab Jamun', hint: 'Milk Balls in Syrup' },
    { word: 'Jalebi', hint: 'Orange Swirls' },
    { word: 'Rasgulla', hint: 'White Spongy Balls' },
    { word: 'Laddu', hint: 'Round Sweet Balls' },
    { word: 'Barfi', hint: 'Milk Fudge' },
    { word: 'Kheer', hint: 'Rice Pudding' },
    { word: 'Halwa', hint: 'Semolina Sweet' },
    { word: 'Pedha', hint: 'Milk Sweet' },
    { word: 'Kulfi', hint: 'Indian Ice Cream' },
    { word: 'Ras Malai', hint: 'Cottage Cheese in Milk' }
  ],
  'Bollywood Actors': [
    { word: 'Amitabh Bachchan', hint: 'Big B' },
    { word: 'Shah Rukh Khan', hint: 'King Khan' },
    { word: 'Aamir Khan', hint: 'Perfectionist' },
    { word: 'Salman Khan', hint: 'Bhai' },
    { word: 'Deepika Padukone', hint: 'Piku Star' },
    { word: 'Priyanka Chopra', hint: 'Global Icon' },
    { word: 'Ranbir Kapoor', hint: 'Animal Star' },
    { word: 'Alia Bhatt', hint: 'Student of Year' },
    { word: 'Ranveer Singh', hint: 'Bajirao Star' },
    { word: 'Kareena Kapoor', hint: 'Poo' }
  ],
  'States': [
    { word: 'Maharashtra', hint: 'Mumbai State' },
    { word: 'Tamil Nadu', hint: 'Chennai State' },
    { word: 'Gujarat', hint: 'Modi State' },
    { word: 'Rajasthan', hint: 'Desert State' },
    { word: 'Kerala', hint: 'God Own Country' },
    { word: 'Punjab', hint: 'Golden Temple State' },
    { word: 'Karnataka', hint: 'Bangalore State' },
    { word: 'West Bengal', hint: 'Kolkata State' },
    { word: 'Andhra Pradesh', hint: 'Hyderabad State' },
    { word: 'Uttar Pradesh', hint: 'Largest State' }
  ],
  'Street Food': [
    { word: 'Vada Pav', hint: 'Mumbai Burger' },
    { word: 'Pani Puri', hint: 'Water Balls' },
    { word: 'Chaat', hint: 'Tangy Snack' },
    { word: 'Bhel Puri', hint: 'Puffed Rice Mix' },
    { word: 'Dahi Puri', hint: 'Yogurt Balls' },
    { word: 'Aloo Tikki', hint: 'Potato Patty' },
    { word: 'Samosa Chaat', hint: 'Crushed Samosa' },
    { word: 'Raj Kachori', hint: 'Big Puri' },
    { word: 'Papdi Chaat', hint: 'Crispy Discs' },
    { word: 'Golgappa', hint: 'Crispy Shells' }
  ],
  'Traditions': [
    { word: 'Namaste', hint: 'Hands Together Greeting' },
    { word: 'Tilak', hint: 'Forehead Mark' },
    { word: 'Mehendi', hint: 'Henna Design' },
    { word: 'Sindoor', hint: 'Red Powder' },
    { word: 'Mangalsutra', hint: 'Marriage Necklace' },
    { word: 'Karva Chauth', hint: 'Wife Fasting' },
    { word: 'Turban', hint: 'Head Wrap' },
    { word: 'Bindi', hint: 'Forehead Dot' },
    { word: 'Toe Rings', hint: 'Married Woman Symbol' },
    { word: 'Kalash', hint: 'Holy Pot' }
  ],
  'Songs': [
    { word: 'Mere Sapno Ki Rani', hint: 'Aradhana Song' },
    { word: 'Chaiyya Chaiyya', hint: 'Dil Se Train' },
    { word: 'Tum Hi Ho', hint: 'Aashiqui 2' },
    { word: 'Gerua', hint: 'Dilwale Song' },
    { word: 'Ae Watan', hint: 'Raazi Song' },
    { word: 'Despacito Hindi', hint: 'Remix Version' },
    { word: 'Senorita', hint: 'Zindagi Na Milegi' },
    { word: 'Tum Se Hi', hint: 'Jab We Met' },
    { word: 'Kabira', hint: 'Yeh Jawaani Hai Deewani' },
    { word: 'Balam Pichkari', hint: 'Yeh Jawaani Hai Deewani' }
  ],
  'Monuments': [
    { word: 'Taj Mahal', hint: 'White Marble Tomb' },
    { word: 'Red Fort', hint: 'Delhi Fortress' },
    { word: 'Qutub Minar', hint: 'Tall Tower' },
    { word: 'Gateway of India', hint: 'Mumbai Arch' },
    { word: 'Hawa Mahal', hint: 'Palace of Winds' },
    { word: 'Charminar', hint: 'Four Minarets' },
    { word: 'Lotus Temple', hint: 'Bahai House' },
    { word: 'Golden Temple', hint: 'Sikh Shrine' },
    { word: 'Ajanta Ellora', hint: 'Cave Temples' },
    { word: 'Konark Temple', hint: 'Sun Temple' }
  ],
  'Games': [
    { word: 'Kabaddi', hint: 'Contact Sport' },
    { word: 'Gilli Danda', hint: 'Stick and Peg' },
    { word: 'Kho Kho', hint: 'Tag Game' },
    { word: 'Cricket', hint: 'Bat and Ball' },
    { word: 'Chess', hint: 'Strategy Board' },
    { word: 'Carrom', hint: 'Striker Game' },
    { word: 'Ludo', hint: 'Dice Board Game' },
    { word: 'Snakes and Ladders', hint: 'Climb and Slide' },
    { word: 'Badminton', hint: 'Shuttlecock Sport' },
    { word: 'Football', hint: 'Soccer' }
  ],
  'Clothing': [
    { word: 'Sari', hint: '6 Yard Drape' },
    { word: 'Kurta', hint: 'Long Shirt' },
    { word: 'Sherwani', hint: 'Wedding Outfit' },
    { word: 'Lehenga', hint: 'Skirt and Top' },
    { word: 'Dhoti', hint: 'Wrap Around' },
    { word: 'Salwar Kameez', hint: 'Pants and Top' },
    { word: 'Pajama', hint: 'Loose Trousers' },
    { word: 'Dupatta', hint: 'Scarf' },
    { word: 'Churidar', hint: 'Tight Pants' },
    { word: 'Angarkha', hint: 'Overcoat Style' }
  ],
  'Brands': [
    { word: 'Tata', hint: 'Salt to Steel' },
    { word: 'Reliance', hint: 'Mukesh Ambani' },
    { word: 'Mahindra', hint: 'Auto Company' },
    { word: 'Infosys', hint: 'IT Giant' },
    { word: 'Wipro', hint: 'Tech Company' },
    { word: 'TCS', hint: 'Largest IT' },
    { word: 'HDFC', hint: 'Banking' },
    { word: 'ICICI', hint: 'Private Bank' },
    { word: 'Bajaj', hint: 'Two Wheeler' },
    { word: 'Hero', hint: 'Motorcycle' }
  ],
  'TV Shows': [
    { word: 'Ramayan', hint: 'Lord Rama Story' },
    { word: 'Mahabharat', hint: 'Epic War' },
    { word: 'Taarak Mehta', hint: 'Gokuldham Society' },
    { word: 'Bhabhi Ji Ghar Par', hint: 'Comedy Show' },
    { word: 'Kumkum Bhagya', hint: 'Daily Soap' },
    { word: 'Yeh Rishta', hint: 'Family Drama' },
    { word: 'Bigg Boss', hint: 'Reality Show' },
    { word: 'Kaun Banega Crorepati', hint: 'Quiz Show' },
    { word: 'The Kapil Sharma Show', hint: 'Comedy Night' },
    { word: 'Dance India Dance', hint: 'Dance Reality' }
  ],
  'Mythology': [
    { word: 'Ram', hint: 'Maryada Purushottam' },
    { word: 'Krishna', hint: 'Blue God' },
    { word: 'Ganesha', hint: 'Elephant God' },
    { word: 'Durga', hint: 'Goddess of Power' },
    { word: 'Hanuman', hint: 'Monkey God' },
    { word: 'Shiva', hint: 'Destroyer' },
    { word: 'Vishnu', hint: 'Preserver' },
    { word: 'Brahma', hint: 'Creator' },
    { word: 'Lakshmi', hint: 'Goddess of Wealth' },
    { word: 'Saraswati', hint: 'Goddess of Knowledge' }
  ],
  'Languages': [
    { word: 'Hindi', hint: 'National Language' },
    { word: 'Tamil', hint: 'Chennai Language' },
    { word: 'Telugu', hint: 'Hyderabad Language' },
    { word: 'Bengali', hint: 'Kolkata Language' },
    { word: 'Marathi', hint: 'Mumbai Language' },
    { word: 'Gujarati', hint: 'Gujarat Language' },
    { word: 'Punjabi', hint: 'Punjab Language' },
    { word: 'Malayalam', hint: 'Kerala Language' },
    { word: 'Kannada', hint: 'Karnataka Language' },
    { word: 'Odia', hint: 'Odisha Language' }
  ],
  'Dance Forms': [
    { word: 'Bharatanatyam', hint: 'Classical South' },
    { word: 'Kathak', hint: 'North Indian Classical' },
    { word: 'Odissi', hint: 'Odisha Classical' },
    { word: 'Bhangra', hint: 'Punjabi Folk' },
    { word: 'Garba', hint: 'Gujarati Folk' },
    { word: 'Kuchipudi', hint: 'Andhra Classical' },
    { word: 'Kathakali', hint: 'Kerala Classical' },
    { word: 'Manipuri', hint: 'Manipur Classical' },
    { word: 'Mohiniyattam', hint: 'Kerala Classical' },
    { word: 'Sattriya', hint: 'Assam Classical' }
  ],
  'Spices': [
    { word: 'Turmeric', hint: 'Golden Powder' },
    { word: 'Cumin', hint: 'Jeera' },
    { word: 'Coriander', hint: 'Dhaniya' },
    { word: 'Cardamom', hint: 'Elaichi' },
    { word: 'Cinnamon', hint: 'Dalchini' },
    { word: 'Cloves', hint: 'Laung' },
    { word: 'Bay Leaves', hint: 'Tej Patta' },
    { word: 'Fenugreek', hint: 'Methi' },
    { word: 'Mustard Seeds', hint: 'Rai' },
    { word: 'Fennel', hint: 'Saunf' }
  ]
};

const WordReveal: React.FC<WordRevealProps> = ({
  players,
  gameConfig,
  currentPlayerIndex,
  onNextPlayer,
  onBack,
  onStartVoting,
  onPlayerRevealed,
  gameWord,
  gameHint,
}) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [showWord, setShowWord] = useState(false);

  useEffect(() => {
    if (players.length > 0 && currentPlayerIndex < players.length) {
      setCurrentPlayer(players[currentPlayerIndex]);
      setShowWord(false); // Reset reveal state when player changes
    }
  }, [players, currentPlayerIndex]);

  const handleRevealWord = () => {
    setShowWord(true);
    // Mark this player as revealed
    if (onPlayerRevealed) {
      onPlayerRevealed(currentPlayerIndex);
    }
  };

  const handleNext = () => {
    setShowWord(false); // Reset reveal state for next player
    if (currentPlayerIndex < players.length - 1) {
      // Go to next player
      onNextPlayer(currentPlayerIndex + 1);
    } else {
      // All players have seen their words, start voting
      if (onStartVoting) {
        onStartVoting();
      } else {
        onNextPlayer(currentPlayerIndex + 1); // Fallback to old behavior
      }
    }
  };

  if (!currentPlayer) {
    return (
      <div className="min-h-screen bg-dark-purple flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-purple flex flex-col">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-2 text-sm">
        <span>2:51</span>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white rounded-full opacity-80"></div>
          <div className="w-4 h-4 bg-white rounded-full opacity-60"></div>
          <div className="w-4 h-4 bg-white rounded-full opacity-40"></div>
          <div className="w-4 h-4 bg-white rounded-full opacity-20"></div>
          <div className="w-6 h-3 bg-white rounded-sm opacity-80"></div>
          <div className="w-8 h-4 bg-yellow-400 rounded-md flex items-center justify-center">
            <span className="text-xs text-black font-bold">94</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 mt-12">
        <button onClick={onBack} className="text-white text-2xl">
          ←
        </button>
        <div></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Player Name */}
        <div className="text-center mb-8">
          <p className="text-gray-300 text-lg mb-2">The word for</p>
          <p className="text-light-purple text-2xl font-bold">{currentPlayer.name}</p>
        </div>

        {/* Word Display */}
        {!showWord ? (
          <div className="w-full max-w-sm mb-8">
            <button
              onClick={handleRevealWord}
              className="w-full bg-black bg-opacity-50 rounded-3xl p-8 text-center relative hover:bg-opacity-70 transition-all duration-300"
            >
              {/* Dotted pattern overlay */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.3) 2px, transparent 2px),
                                  radial-gradient(circle at 75% 25%, rgba(139, 92, 246, 0.3) 2px, transparent 2px),
                                  radial-gradient(circle at 25% 75%, rgba(124, 58, 237, 0.3) 2px, transparent 2px),
                                  radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.3) 2px, transparent 2px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              <div className="relative z-10">
                <p className="text-light-blue text-lg mb-4">Tap the box to reveal</p>
                <div className="w-8 h-8 mx-auto text-light-blue">👆</div>
              </div>
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm mb-8">
            {currentPlayer.isImposter ? (
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-center border-4 border-red-500 shadow-red-500 shadow-lg">
                <div className="text-red-200 text-lg font-bold mb-2">Imposter</div>
                <div className="text-red-100 text-sm">You don't know the word!</div>
              </div>
            ) : (
              <div className="bg-card-bg rounded-3xl p-8 text-center border border-purple-glow shadow-card-glow">
                <div className="text-cyan-400 text-2xl font-bold">{currentPlayer.word}</div>
              </div>
            )}

            {/* Hint for Imposter */}
            {currentPlayer.isImposter && gameConfig.showHintToImposter && (
              <div className="bg-card-bg rounded-2xl p-6 mt-6 border border-purple-glow">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-yellow-400 text-xl">💡</span>
                  <span className="text-white font-medium">Your Clue</span>
                </div>
                <div className="text-white text-xl font-bold mb-2">{gameHint}</div>
                <div className="text-gray-300 text-sm">Use this hint to blend in!</div>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="w-full max-w-sm">
          {!showWord ? (
            <button
              onClick={handleRevealWord}
              className="w-full bg-gradient-to-r from-accent-purple to-light-purple rounded-2xl py-4 text-white font-bold text-lg shadow-lg hover:shadow-purple-glow transition-all duration-300 transform hover:scale-105"
            >
              Reveal Word
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={true}
              className="w-full bg-gray-600 rounded-2xl py-4 text-gray-400 font-bold text-lg cursor-not-allowed"
            >
              Word Revealed
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-2 mb-2">
            {players.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < currentPlayerIndex ? 'bg-purple-glow' : 
                  index === currentPlayerIndex ? 'bg-white' : 'bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            Player {currentPlayerIndex + 1} of {players.length}
          </p>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="w-32 h-1 bg-white bg-opacity-30 rounded-full mb-4 mx-auto"></div>
    </div>
  );
};

export default WordReveal;


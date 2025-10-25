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

// Words data is now imported from shared data file

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
                <div className="text-cyan-400 text-2xl font-bold">{gameWord}</div>
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


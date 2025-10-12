import React from 'react';

interface CategoryResultsProps {
  scores: { [playerName: string]: number };
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const CategoryResults: React.FC<CategoryResultsProps> = ({
  scores,
  onPlayAgain,
  onBackToMenu
}) => {
  const sortedPlayers = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const winner = sortedPlayers[0];
  const maxScore = winner[1];
  const winners = sortedPlayers.filter(([, score]) => score === maxScore);
  const isTie = winners.length > 1;

  return (
    <div className="min-h-screen bg-dark-purple px-6 py-8">
      <div className="text-center mb-8 mt-12">
        <div className="w-24 h-24 bg-gradient-to-br from-pink-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-purple-glow">
          <span className="text-5xl">🏆</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">
          {isTie ? "It's a Tie!" : "We Have a Winner!"}
        </h1>
        <p className="text-gray-300">Game Over</p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        {isTie ? (
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl p-6 mb-6 shadow-2xl">
            <h2 className="text-white text-2xl font-bold text-center mb-4">Multiple Winners!</h2>
            <div className="space-y-3">
              {winners.map(([playerName, score], index) => (
                <div key={index} className="bg-white bg-opacity-20 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-orange-500">{playerName.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="text-white text-xl font-bold">{playerName}</span>
                    </div>
                    <span className="text-white text-2xl font-bold">{score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl p-8 mb-6 shadow-2xl">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl font-bold text-orange-500">{winner[0].charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="text-white text-3xl font-bold mb-2">{winner[0]}</h2>
              <p className="text-white text-xl opacity-90">Champion</p>
              <div className="mt-4 bg-white bg-opacity-20 rounded-2xl p-4">
                <p className="text-white text-4xl font-bold">{winner[1]} points</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-card-bg rounded-3xl p-6 border border-purple-glow">
          <h3 className="text-white text-xl font-bold mb-4 text-center">Final Scores</h3>
          <div className="space-y-3">
            {sortedPlayers.map(([playerName, score], index) => (
              <div key={index} className={`rounded-2xl p-4 ${index === 0 && !isTie ? 'bg-gradient-to-r from-yellow-600 to-orange-600' : 'bg-gray-700'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 && !isTie ? 'bg-yellow-400 text-gray-900' : 'bg-gray-600 text-white'}`}>
                      {index + 1}
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{playerName.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="text-white font-semibold">{playerName}</span>
                  </div>
                  <span className="text-white text-xl font-bold">{score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <button onClick={onPlayAgain} className="w-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl py-4 text-white font-bold text-xl shadow-lg hover:shadow-purple-glow transition-all duration-300 transform hover:scale-105">
          Play Again
        </button>
        <button onClick={onBackToMenu} className="w-full bg-card-bg border border-purple-glow rounded-2xl py-4 text-white font-semibold hover:shadow-card-glow transition-all duration-300">
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default CategoryResults;


import React from 'react';
import { Player } from '../App';

interface ResultsScreenProps {
  results: {
    winner: 'crew' | 'imposter';
    imposterRevealed: boolean;
    imposters: Player[];
  };
  players: Player[];
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  results,
  players,
  onPlayAgain,
  onBackToMenu,
}) => {
  const crewMembers = players.filter(p => !p.isImposter);

  return (
    <div className="min-h-screen bg-dark-purple px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 mt-12">
        <button onClick={onBackToMenu} className="text-white text-2xl">
          ←
        </button>
        <h1 className="text-white text-2xl font-bold">Game Results</h1>
        <div></div>
      </div>

      {/* Main Results */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Winner Announcement */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">
            {results.winner === 'crew' ? '🎉' : '👹'}
          </div>
          <h2 className={`text-4xl font-bold mb-4 ${
            results.winner === 'crew' ? 'text-green-400' : 'text-red-400'
          }`}>
            {results.winner === 'crew' ? 'Crew Wins!' : 'Imposters Win!'}
          </h2>
          {results.imposterRevealed ? (
            <p className="text-white text-lg">
              The imposter was caught! 🕵️
            </p>
          ) : (
            <p className="text-white text-lg">
              The imposters escaped! 🏃‍♂️
            </p>
          )}
        </div>

        {/* Player Roles Reveal */}
        <div className="w-full max-w-md space-y-6 mb-12">
          {/* Imposters */}
          <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-2xl p-6">
            <h3 className="text-red-400 text-xl font-bold mb-4 text-center">👹 The Imposters</h3>
            <div className="space-y-3">
              {results.imposters.map((imposter) => (
                <div key={imposter.id} className="flex items-center space-x-3 bg-red-800 bg-opacity-50 rounded-xl p-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {imposter.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{imposter.name}</div>
                    <div className="text-red-200 text-sm">Imposter</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crew Members */}
          <div className="bg-green-900 bg-opacity-30 border border-green-500 rounded-2xl p-6">
            <h3 className="text-green-400 text-xl font-bold mb-4 text-center">👥 The Crew</h3>
            <div className="space-y-3">
              {crewMembers.map((crewMember) => (
                <div key={crewMember.id} className="flex items-center space-x-3 bg-green-800 bg-opacity-50 rounded-xl p-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {crewMember.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{crewMember.name}</div>
                    <div className="text-green-200 text-sm">Crew Member</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-accent-purple to-light-purple rounded-2xl py-4 text-white font-bold text-xl shadow-lg hover:shadow-purple-glow transition-all duration-300 transform hover:scale-105"
          >
            Play Again
          </button>
          <button
            onClick={onBackToMenu}
            className="w-full bg-card-bg border border-gray-600 rounded-2xl py-4 text-white font-semibold text-lg hover:border-purple-glow transition-all duration-300"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;


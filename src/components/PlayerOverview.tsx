import React from 'react';

interface PlayerOverviewProps {
  players: Array<{
    id: string;
    name: string;
    isImposter?: boolean;
    votes?: number;
  }>;
  onPlayerClick: (playerIndex: number) => void;
  onBack: () => void;
  revealedPlayers: Set<number>;
}

const PlayerOverview: React.FC<PlayerOverviewProps> = ({
  players,
  onPlayerClick,
  onBack,
  revealedPlayers,
}) => {
  return (
    <div className="min-h-screen bg-dark-purple flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-white text-3xl font-bold mb-2">Players Ready</h1>
        <p className="text-gray-300 text-lg">Tap on a player to reveal their word</p>
      </div>

      {/* Players List */}
      <div className="w-full max-w-md space-y-4 mb-8">
        {players.map((player, index) => {
          const isRevealed = revealedPlayers.has(index);
          return (
            <div
              key={player.id}
              onClick={() => !isRevealed && onPlayerClick(index)}
              className={`rounded-2xl p-4 border transition-all duration-300 ${
                isRevealed
                  ? 'bg-gray-700 border-gray-600 opacity-50 cursor-not-allowed'
                  : 'bg-card-bg border-purple-glow hover:shadow-card-glow cursor-pointer transform hover:scale-105'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isRevealed
                    ? 'bg-gray-600'
                    : 'bg-gradient-to-br from-accent-purple to-light-purple'
                }`}>
                  <span className="text-white text-lg font-bold">
                    {player.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${
                    isRevealed ? 'text-gray-400' : 'text-white'
                  }`}>
                    {player.name}
                  </h3>
                  <p className={`text-sm ${
                    isRevealed ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    Player {index + 1}
                  </p>
                </div>
                <div className={`text-2xl ${isRevealed ? 'text-gray-500' : 'text-white'}`}>
                  👤
                </div>
                <div className={`text-xl ${
                  isRevealed ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {isRevealed ? '✓' : '→'}
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* Back Button */}
      <button
        onClick={onBack}
        className="mt-6 text-gray-400 hover:text-white transition-colors duration-300"
      >
        ← Back to Setup
      </button>
    </div>
  );
};

export default PlayerOverview;

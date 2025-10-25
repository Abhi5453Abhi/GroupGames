import React from 'react';

interface VotingPhaseProps {
  players: Player[];
  onStartVoting: () => void;
  onBack: () => void;
}

interface Player {
  id: string;
  name: string;
  isImposter: boolean;
  word?: string;
  votes: number;
}

const VotingPhase: React.FC<VotingPhaseProps> = ({
  players,
  onStartVoting,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-dark-purple px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 mt-12">
        <button onClick={onBack} className="text-white text-2xl">
          ←
        </button>
        <div className="text-white text-lg font-semibold">3:04</div>
      </div>

      {/* Main Title */}
      <div className="text-center mb-8">
        <h1 className="text-white text-3xl font-bold mb-2">Voting Phase</h1>
        <p className="text-gray-300 text-lg">
          Time to discuss and vote for the imposter!
        </p>
      </div>

      {/* How to Vote Section */}
      <div className="mb-8">
        <h2 className="text-white text-xl font-bold mb-6">How to Vote</h2>
        
        <div className="space-y-4">
          {/* Card 1: Starting Player */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 border border-blue-400">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Starting Player</h3>
                <p className="text-blue-100 text-sm">{players[0]?.name || 'Player'} starts the round</p>
              </div>
            </div>
          </div>

          {/* Card 2: Group Discussion */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 border border-purple-400">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-6 h-8 bg-purple-200 rounded-full"></div>
                    <div className="w-6 h-8 bg-purple-200 rounded-full"></div>
                    <div className="w-6 h-8 bg-purple-200 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm font-bold">2</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Group Discussion</h3>
                <p className="text-purple-100 text-sm">Go clockwise</p>
              </div>
            </div>
          </div>

          {/* Card 3: Vote Time */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 border border-yellow-400">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-4 h-6 bg-yellow-200 rounded border border-yellow-100"></div>
                    <div className="w-4 h-6 bg-yellow-200 rounded border border-yellow-100"></div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm font-bold">3</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Vote Time</h3>
                <p className="text-yellow-100 text-sm">
                  Each player says a word related to the secret. Go around two or three times.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Reveal Phase */}
          <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-6 border border-red-400">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-red-300 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-100 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-sm font-bold">4</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Reveal Phase</h3>
                <p className="text-red-100 text-sm">
                  Vote for the player you think is the imposter, then tap to reveal the results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Voting Button */}
      <div className="mt-8">
        <button
          onClick={onStartVoting}
          className="w-full bg-gradient-to-r from-red-600 to-red-800 rounded-2xl py-4 text-white font-bold text-xl shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
        >
          Start Voting
        </button>
      </div>
    </div>
  );
};

export default VotingPhase;

import React, { useState } from 'react';
import { Player } from '../App';

interface VotingScreenProps {
  players: Player[];
  onVoteComplete: (results: {
    winner: 'crew' | 'imposter';
    imposterRevealed: boolean;
    imposters: Player[];
  }) => void;
  onBack: () => void;
}

const VotingScreen: React.FC<VotingScreenProps> = ({
  players,
  onVoteComplete,
  onBack,
}) => {
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votes, setVotes] = useState<{ [voterId: string]: string }>({});
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [votingComplete, setVotingComplete] = useState(false);

  const currentVoter = players[currentVoterIndex];
  const availableTargets = players.filter(p => p.id !== currentVoter.id);

  const handleVote = (targetId: string) => {
    setSelectedPlayer(targetId);
  };

  const handleSubmitVote = () => {
    if (!selectedPlayer || !currentVoter) return;

    const newVotes = { ...votes, [currentVoter.id]: selectedPlayer };
    setVotes(newVotes);

    if (currentVoterIndex < players.length - 1) {
      setCurrentVoterIndex(currentVoterIndex + 1);
      setSelectedPlayer(null);
    } else {
      // Voting complete, calculate results
      const voteCounts: { [playerId: string]: number } = {};
      Object.values(newVotes).forEach(targetId => {
        voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
      });

      // Find player with most votes
      const mostVotedPlayerId = Object.keys(voteCounts).reduce((a, b) => 
        voteCounts[a] > voteCounts[b] ? a : b
      );

      const mostVotedPlayer = players.find(p => p.id === mostVotedPlayerId)!;
      const isImposterVotedOut = mostVotedPlayer.isImposter;

      // Determine winner
      const remainingImposters = players.filter(p => p.id !== mostVotedPlayerId && p.isImposter);
      const winner = remainingImposters.length === 0 ? 'crew' : 'imposter';

      setVotingComplete(true);
      
      setTimeout(() => {
        onVoteComplete({
          winner,
          imposterRevealed: isImposterVotedOut,
          imposters: players.filter(p => p.isImposter),
        });
      }, 2000);
    }
  };

  if (votingComplete) {
    return (
      <div className="min-h-screen bg-dark-purple flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗳️</div>
          <div className="text-white text-2xl font-bold mb-2">Voting Complete!</div>
          <div className="text-gray-300">Calculating results...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-purple px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 mt-12">
        <button onClick={onBack} className="text-white text-2xl">
          ←
        </button>
        <div></div>
      </div>

      {/* Voting Instructions */}
      <div className="text-center mb-8">
        <h1 className="text-white text-2xl font-bold mb-2">Time to Vote!</h1>
        <p className="text-gray-300 text-lg">
          Who do you think is the imposter?
        </p>
      </div>

      {/* Current Voter */}
      <div className="text-center mb-8">
        <div className="bg-card-bg rounded-2xl p-6 border border-purple-glow">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-light-purple rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {currentVoter.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-left">
              <h2 className="text-white text-xl font-bold">{currentVoter.name}</h2>
              <p className="text-gray-300">Cast your vote</p>
            </div>
          </div>
        </div>
      </div>

      {/* Voting Options */}
      <div className="mb-8">
        <h3 className="text-white text-lg font-semibold mb-4 text-center">
          Who do you suspect?
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {availableTargets.map((player) => (
            <button
              key={player.id}
              onClick={() => handleVote(player.id)}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                selectedPlayer === player.id
                  ? 'bg-gradient-to-r from-accent-purple to-light-purple border-purple-glow shadow-purple-glow'
                  : 'bg-card-bg border-gray-600 hover:border-purple-glow'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-light-purple rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">
                    {player.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">{player.name}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Vote Button */}
      {selectedPlayer && (
        <button
          onClick={handleSubmitVote}
          className="w-full bg-gradient-to-r from-accent-purple to-light-purple rounded-2xl py-4 text-white font-bold text-xl shadow-lg hover:shadow-purple-glow transition-all duration-300 transform hover:scale-105"
        >
          {currentVoterIndex < players.length - 1 ? 'Submit Vote' : 'Complete Voting'}
        </button>
      )}

      {/* Progress Indicator */}
      <div className="mt-8 text-center">
        <div className="flex justify-center space-x-2 mb-2">
          {players.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index < currentVoterIndex ? 'bg-purple-glow' : 
                index === currentVoterIndex ? 'bg-white' : 'bg-gray-600'
              }`}
            ></div>
          ))}
        </div>
        <p className="text-gray-400 text-sm">
          Vote {currentVoterIndex + 1} of {players.length}
        </p>
      </div>
    </div>
  );
};

export default VotingScreen;





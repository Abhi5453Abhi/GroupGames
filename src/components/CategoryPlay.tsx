import React, { useState, useEffect } from 'react';

interface CategoryPlayProps {
  prompts: string[];
  players: string[];
  roundsToPlay: number;
  timePerRound: number;
  isTeamMode?: boolean;
  team1?: string[];
  team2?: string[];
  onGameComplete: (scores: { [playerName: string]: number }, teamScores?: { team1: number; team2: number }) => void;
  onBack: () => void;
}

const CategoryPlay: React.FC<CategoryPlayProps> = ({
  prompts,
  players,
  roundsToPlay,
  timePerRound,
  isTeamMode = false,
  team1 = [],
  team2 = [],
  onGameComplete,
  onBack
}) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [timeLeft, setTimeLeft] = useState(timePerRound);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [usedPrompts, setUsedPrompts] = useState<string[]>([]);
  const [scores, setScores] = useState<{ [playerName: string]: number }>(() => {
    const initialScores: { [playerName: string]: number } = {};
    players.forEach(player => {
      initialScores[player] = 0;
    });
    return initialScores;
  });
  const [teamScores, setTeamScores] = useState({ team1: 0, team2: 0 });
  const [showVoting, setShowVoting] = useState(false);

  const selectRandomPrompt = () => {
    const availablePrompts = prompts.filter(p => !usedPrompts.includes(p));
    if (availablePrompts.length === 0) {
      setUsedPrompts([]);
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      setCurrentPrompt(randomPrompt);
      setUsedPrompts([randomPrompt]);
    } else {
      const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
      setCurrentPrompt(randomPrompt);
      setUsedPrompts([...usedPrompts, randomPrompt]);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    selectRandomPrompt();
  }, [currentRound]);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setShowVoting(true);
    }
  }, [isTimerRunning, timeLeft]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const handleVote = (playerName: string) => {
    const newScores = { ...scores, [playerName]: scores[playerName] + 1 };
    setScores(newScores);

    if (isTeamMode) {
      let newTeamScores = { ...teamScores };
      if (team1.includes(playerName)) {
        newTeamScores.team1 += 1;
      } else if (team2.includes(playerName)) {
        newTeamScores.team2 += 1;
      }
      setTeamScores(newTeamScores);
    }

    if (currentRound >= roundsToPlay) {
      onGameComplete(newScores, isTeamMode ? teamScores : undefined);
    } else {
      setCurrentRound(currentRound + 1);
      setTimeLeft(timePerRound);
      setIsTimerRunning(false);
      setShowVoting(false);
    }
  };

  const handleTeamVote = (teamNumber: 1 | 2) => {
    let newTeamScores = { ...teamScores };
    if (teamNumber === 1) {
      newTeamScores.team1 += 1;
    } else {
      newTeamScores.team2 += 1;
    }
    setTeamScores(newTeamScores);

    if (currentRound >= roundsToPlay) {
      onGameComplete(scores, newTeamScores);
    } else {
      setCurrentRound(currentRound + 1);
      setTimeLeft(timePerRound);
      setIsTimerRunning(false);
      setShowVoting(false);
    }
  };

  const skipVoting = () => {
    if (currentRound >= roundsToPlay) {
      onGameComplete(scores, isTeamMode ? teamScores : undefined);
    } else {
      setCurrentRound(currentRound + 1);
      setTimeLeft(timePerRound);
      setIsTimerRunning(false);
      setShowVoting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showVoting) {
    return (
      <div className="min-h-screen bg-dark-purple px-6 py-8">
        <div className="flex items-center justify-between mb-8 mt-12">
          <button onClick={onBack} className="text-white text-2xl">←</button>
          <div className="text-white font-semibold">Round {currentRound} / {roundsToPlay}</div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Vote for the Best!</h2>
            <p className="text-gray-300">{isTeamMode ? 'Which team had the funniest answer?' : 'Who had the funniest answer?'}</p>
          </div>

          {isTeamMode ? (
            <div className="space-y-4 mb-6">
              <button onClick={() => handleTeamVote(1)} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 border-2 border-blue-500 hover:shadow-blue-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold mb-2">Team 1</h3>
                  <p className="text-blue-200 text-sm mb-3">{team1.join(', ')}</p>
                  <div className="text-white text-3xl font-bold">{teamScores.team1} points</div>
                </div>
              </button>

              <button onClick={() => handleTeamVote(2)} className="w-full bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 border-2 border-red-500 hover:shadow-red-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold mb-2">Team 2</h3>
                  <p className="text-red-200 text-sm mb-3">{team2.join(', ')}</p>
                  <div className="text-white text-3xl font-bold">{teamScores.team2} points</div>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {players.map((playerName, index) => (
                <button key={index} onClick={() => handleVote(playerName)} className="w-full bg-card-bg rounded-2xl p-5 border border-purple-glow hover:shadow-card-glow transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-bold">{playerName.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold text-lg">{playerName}</h3>
                        <p className="text-gray-400 text-sm">{scores[playerName]} points</p>
                      </div>
                    </div>
                    <div className="text-white text-2xl">👍</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <button onClick={skipVoting} className="w-full bg-gray-600 rounded-2xl py-3 text-white font-semibold hover:bg-gray-700 transition-colors">
            Skip / No Winner
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-purple px-6 py-8 flex flex-col">
      <div className="flex items-center justify-between mb-8 mt-12">
        <button onClick={onBack} className="text-white text-2xl">←</button>
        <div className="text-white font-semibold">Round {currentRound} / {roundsToPlay}</div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
            timeLeft <= 10 ? 'bg-red-600' : 'bg-gradient-to-br from-pink-600 to-purple-600'
          } shadow-purple-glow`}>
            <span className={`text-4xl font-bold text-white ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center mb-8">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-3xl p-8 shadow-2xl">
            <div className="text-center">
              <span className="text-6xl mb-6 block">🎯</span>
              <h2 className="text-2xl font-bold text-white leading-relaxed">{currentPrompt}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card-bg rounded-2xl p-4 mb-6">
        <h3 className="text-white font-semibold mb-3 text-center">Current Scores</h3>
        {isTeamMode ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-900 bg-opacity-30 rounded-xl p-3 border border-blue-500">
              <h4 className="text-blue-300 font-bold text-center mb-2">Team 1</h4>
              <p className="text-white text-2xl font-bold text-center">{teamScores.team1}</p>
              <p className="text-blue-200 text-xs text-center mt-1">{team1.length} players</p>
            </div>
            <div className="bg-red-900 bg-opacity-30 rounded-xl p-3 border border-red-500">
              <h4 className="text-red-300 font-bold text-center mb-2">Team 2</h4>
              <p className="text-white text-2xl font-bold text-center">{teamScores.team2}</p>
              <p className="text-red-200 text-xs text-center mt-1">{team2.length} players</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {players.map((playerName, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-white text-sm font-bold">{playerName.charAt(0).toUpperCase()}</span>
                </div>
                <p className="text-white text-xs truncate">{playerName}</p>
                <p className="text-purple-300 text-sm font-bold">{scores[playerName]}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isTimerRunning ? (
        <button onClick={startTimer} className="w-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl py-4 text-white font-bold text-xl shadow-lg hover:shadow-purple-glow transition-all duration-300 transform hover:scale-105">
          Start Round!
        </button>
      ) : (
        <button onClick={() => setShowVoting(true)} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl py-4 text-white font-bold text-xl shadow-lg hover:shadow-purple-glow transition-all duration-300 transform hover:scale-105">
          Vote Now!
        </button>
      )}
    </div>
  );
};

export default CategoryPlay;


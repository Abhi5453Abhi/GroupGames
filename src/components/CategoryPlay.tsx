import React, { useState, useEffect, useCallback } from 'react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { GPT5Service } from '../services/gpt5Service';

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
  const [, setUsedPrompts] = useState<string[]>([]);
  const [scores, setScores] = useState<{ [playerName: string]: number }>(() => {
    const initialScores: { [playerName: string]: number } = {};
    players.forEach(player => {
      initialScores[player] = 0;
    });
    return initialScores;
  });
  const [teamScores, setTeamScores] = useState({ team1: 0, team2: 0 });
  const [showVoting, setShowVoting] = useState(false);
  
  // Audio recording state
  const [isScoring, setIsScoring] = useState(false);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [showScoreResult, setShowScoreResult] = useState(false);
  const [scoreDetails, setScoreDetails] = useState<string>('');
  const [detectedAnswers, setDetectedAnswers] = useState<string[]>([]);
  
  // Audio recorder hook
  const { 
    isRecording, 
    audioBlob, 
    recordingTime, 
    error: recordingError, 
    startRecording, 
    stopRecording, 
    resetRecording 
  } = useAudioRecorder();

  const selectRandomPrompt = useCallback(() => {
    setUsedPrompts(prevUsedPrompts => {
      const availablePrompts = prompts.filter(p => !prevUsedPrompts.includes(p));
      if (availablePrompts.length === 0) {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setCurrentPrompt(randomPrompt);
        return [randomPrompt];
      } else {
        const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
        setCurrentPrompt(randomPrompt);
        return [...prevUsedPrompts, randomPrompt];
      }
    });
  }, [prompts]);

  useEffect(() => {
    selectRandomPrompt();
  }, [currentRound, selectRandomPrompt]);

  const startTimer = async () => {
    console.log('🎬 Starting timer and recording...');
    setIsTimerRunning(true);
    try {
      await startRecording();
      console.log('✅ Recording started successfully');
    } catch (error) {
      console.error('❌ Failed to start recording:', error);
    }
  };

  const scoreRound = useCallback(async () => {
    console.log('🎯 scoreRound called');
    console.log('   Audio blob exists:', !!audioBlob);
    console.log('   Current prompt:', currentPrompt);
    console.log('   Audio blob size:', audioBlob?.size || 'N/A');
    console.log('   Audio blob type:', audioBlob?.type || 'N/A');
    
    if (!audioBlob || !currentPrompt) {
      console.error('❌ No audio or prompt available for scoring');
      console.log('   Audio blob size:', audioBlob?.size || 'N/A');
      console.log('   Current prompt:', currentPrompt || 'N/A');
      
      // Show fallback data for testing
      console.log('🔄 Using fallback data...');
      const mockAnswers = ["Pizza", "Burger", "Tacos", "Sushi"];
      setLastScore(4);
      setScoreDetails("Fallback data - no audio recorded");
      setDetectedAnswers(mockAnswers);
      setShowScoreResult(true);
      
      setTimeout(() => {
        setShowScoreResult(false);
        setShowVoting(true);
      }, 3000);
      return;
    }

    console.log('🤖 Starting AI scoring...');
    setIsScoring(true);
    try {
      const result = await GPT5Service.scoreRound(audioBlob, currentPrompt);
      console.log('✅ AI scoring completed:', result);
      setLastScore(result.score);
      setScoreDetails(result.details);
      setDetectedAnswers(result.detectedAnswers);
      setShowScoreResult(true);
      
      // Auto-advance after showing result for 3 seconds
      setTimeout(() => {
        setShowScoreResult(false);
        setShowVoting(true);
      }, 3000);
    } catch (error) {
      console.error('Scoring failed:', error);
      
      // Fallback: Show mock data for testing when AI fails
      const mockAnswers = [
        "Sample Answer 1",
        "Sample Answer 2", 
        "Sample Answer 3",
        "Sample Answer 4"
      ];
      
      setLastScore(4);
      setScoreDetails("AI scoring unavailable - showing sample data");
      setDetectedAnswers(mockAnswers);
      setShowScoreResult(true);
      
      // Auto-advance after showing result for 3 seconds
      setTimeout(() => {
        setShowScoreResult(false);
        setShowVoting(true);
      }, 3000);
    } finally {
      setIsScoring(false);
    }
  }, [audioBlob, currentPrompt, setLastScore, setScoreDetails, setDetectedAnswers, setShowScoreResult, setShowVoting, setIsScoring]);

  // Track when recording should stop and be scored
  const [shouldScore, setShouldScore] = useState(false);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerRunning) {
      console.log('⏰ Timer ended! Stopping recording...');
      setIsTimerRunning(false);
      stopRecording();
      setShouldScore(true);
    }
  }, [isTimerRunning, timeLeft, stopRecording]);

  // Wait for audioBlob to be ready, then score
  useEffect(() => {
    if (shouldScore && !isRecording && audioBlob) {
      console.log('⏰ Audio blob ready! Starting scoring process...');
      setShouldScore(false);
      scoreRound();
    }
  }, [shouldScore, isRecording, audioBlob, scoreRound]);

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
      // Reset audio recording state for next round
      setLastScore(null);
      setDetectedAnswers([]);
      setScoreDetails('');
      resetRecording();
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
      // Reset audio recording state for next round
      setLastScore(null);
      setDetectedAnswers([]);
      setScoreDetails('');
      resetRecording();
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
      // Reset audio recording state for next round
      setLastScore(null);
      setDetectedAnswers([]);
      setScoreDetails('');
      resetRecording();
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

          {/* AI Detected Answers */}
          {lastScore !== null && detectedAnswers.length > 0 && (
            <div className="mb-8 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 border-2 border-purple-500 shadow-lg">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-3">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Detected Answers</h3>
                <div className="inline-block bg-green-500 bg-opacity-20 rounded-full px-4 py-2 border border-green-400">
                  <span className="text-green-300 font-bold text-lg">{lastScore} Correct Answer{lastScore !== 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className="bg-black bg-opacity-30 rounded-xl p-4 mb-3">
                <h4 className="text-purple-300 font-semibold text-sm mb-3 text-center">Relevant Words/Phrases:</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {detectedAnswers.map((answer, index) => (
                    <div 
                      key={index}
                      className="bg-purple-600 bg-opacity-50 rounded-lg px-3 py-2 border border-purple-400"
                    >
                      <span className="text-white font-medium text-sm">
                        {index + 1}. {answer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-purple-200 text-xs italic">
                  💡 Now vote for who said it best!
                </p>
              </div>
            </div>
          )}

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
          
          {/* Recording indicator */}
          {isRecording && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Recording status */}
      {isRecording && (
        <div className="text-center mb-6">
          <div className="bg-red-900 bg-opacity-30 rounded-xl p-4 border border-red-500">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-300 font-semibold">Recording... {recordingTime.toFixed(1)}s</span>
            </div>
            <p className="text-red-200 text-sm mt-2">AI is listening for answers!</p>
          </div>
        </div>
      )}

      {/* Scoring status */}
      {isScoring && (
        <div className="text-center mb-6">
          <div className="bg-blue-900 bg-opacity-30 rounded-xl p-4 border border-blue-500">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-300 font-semibold">AI is scoring your answers...</span>
            </div>
          </div>
        </div>
      )}

      {/* Score result */}
      {showScoreResult && lastScore !== null && (
        <div className="text-center mb-6">
          <div className="bg-green-900 bg-opacity-30 rounded-xl p-6 border border-green-500">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-green-300 font-bold text-xl mb-2">Round Complete!</h3>
            <div className="text-white text-3xl font-bold mb-2">{lastScore} correct answers</div>
            <p className="text-green-200 text-sm">{scoreDetails}</p>
          </div>
        </div>
      )}

      {/* Recording error */}
      {recordingError && (
        <div className="text-center mb-6">
          <div className="bg-red-900 bg-opacity-30 rounded-xl p-4 border border-red-500">
            <p className="text-red-300 font-semibold">Recording Error: {recordingError}</p>
            <p className="text-red-200 text-sm mt-2">Manual voting will be available</p>
          </div>
        </div>
      )}

      {/* Test buttons for debugging (remove in production) */}
      {!isTimerRunning && !showVoting && (
        <div className="text-center mb-6 space-x-2">
          <button 
            onClick={() => {
              console.log('🧪 Manual test triggered');
              const mockAnswers = ["Pizza", "Burger", "Tacos", "Sushi", "Pasta"];
              setLastScore(5);
              setScoreDetails("Test data - AI detected these answers");
              setDetectedAnswers(mockAnswers);
              setShowScoreResult(true);
              setTimeout(() => {
                setShowScoreResult(false);
                setShowVoting(true);
              }, 3000);
            }}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            🧪 Test Display
          </button>
          
          <button 
            onClick={() => {
              console.log('🎯 Manual scoreRound triggered');
              scoreRound();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            🎯 Test Scoring
          </button>
        </div>
      )}

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


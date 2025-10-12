import React, { useState, useEffect } from 'react';

interface MainMenuProps {
  onStartImposter: () => void;
  onStartCategory: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartImposter, onStartCategory }) => {
  // Load player names from localStorage
  const [playerNames, setPlayerNames] = useState<string[]>(() => {
    const saved = localStorage.getItem('imposter-player-names');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved player names:', e);
      }
    }
    return ['Player 1', 'Player 2', 'Player 3'];
  });

  const [showPlayerNamesModal, setShowPlayerNamesModal] = useState(false);

  // Save player names to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('imposter-player-names', JSON.stringify(playerNames));
  }, [playerNames]);

  const addPlayer = () => {
    const newPlayerName = `Player ${playerNames.length + 1}`;
    setPlayerNames([...playerNames, newPlayerName]);
  };

  const removePlayer = () => {
    if (playerNames.length > 2) {
      setPlayerNames(playerNames.slice(0, -1));
    }
  };

  const updatePlayerName = (index: number, newName: string) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = newName;
    setPlayerNames(updatedNames);
  };

  return (
    <div className="min-h-screen bg-dark-purple flex flex-col items-center justify-center px-6">
      {/* Status Bar Simulation */}
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

      {/* Back Button */}
      <div className="absolute top-12 left-6">
        <button className="text-white text-2xl">
          ←
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 max-w-md w-full">
        {/* Game Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-accent-purple to-light-purple rounded-3xl flex items-center justify-center shadow-purple-glow">
            <span className="text-5xl">🎮</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl font-bold text-white mb-3">Group Games</h1>
        
        {/* Subtitle */}
        <p className="text-gray-300 text-center mb-8 leading-relaxed px-4">
          Choose a game to play with your friends
        </p>

        {/* Players Card */}
        <button
          onClick={() => setShowPlayerNamesModal(true)}
          className="w-full bg-card-bg rounded-2xl p-5 border border-purple-glow hover:shadow-card-glow transition-all duration-300 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-light-purple rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold text-lg">Players</h3>
                <p className="text-gray-400 text-sm">{playerNames.length} players ready</p>
              </div>
            </div>
            <div className="text-white text-xl">→</div>
          </div>
        </button>

        {/* Game Cards */}
        <div className="w-full space-y-4 mb-8">
          {/* Imposter Game Card */}
          <button
            onClick={onStartImposter}
            className="w-full bg-gradient-to-r from-accent-purple to-light-purple rounded-2xl p-6 text-left hover:shadow-purple-glow transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <span className="text-4xl">🕵️</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">Imposter</h3>
                <p className="text-purple-100 text-sm">Find who doesn't know the secret word</p>
              </div>
              <div className="text-white text-2xl">→</div>
            </div>
          </button>

          {/* Category Game Card */}
          <button
            onClick={onStartCategory}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-6 text-left hover:shadow-card-glow transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">Category</h3>
                <p className="text-purple-100 text-sm">Answer funny prompts and vote for the best</p>
              </div>
              <div className="text-white text-2xl">→</div>
            </div>
          </button>
        </div>

        {/* Coming Soon Badge */}
        <div className="text-gray-400 text-sm">
          More games coming soon! 🎲
        </div>
      </div>

      {/* Home Indicator */}
      <div className="w-32 h-1 bg-white bg-opacity-30 rounded-full mb-4"></div>

      {/* Player Names Modal */}
      {showPlayerNamesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-dark-purple rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl font-bold">Player Names</h2>
              <button
                onClick={() => setShowPlayerNamesModal(false)}
                className="text-white text-2xl hover:text-gray-300"
              >
                ×
              </button>
            </div>

            {/* Player Count Display */}
            <div className="bg-card-bg rounded-2xl p-4 mb-6 border border-purple-glow">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">👥</span>
                </div>
                <span className="text-white text-lg font-semibold">
                  {playerNames.length} Players
                </span>
                <span className="text-gray-400 text-sm ml-auto">2-100</span>
              </div>
            </div>

            {/* Player List */}
            <div className="space-y-3 mb-6">
              {playerNames.map((name, index) => (
                <div key={index} className="bg-card-bg rounded-2xl p-4 border border-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-light-purple rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-bold">
                        {name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      className="flex-1 bg-transparent text-white text-lg font-medium border-none outline-none"
                      placeholder={`Player ${index + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-4">
              <button
                onClick={removePlayer}
                disabled={playerNames.length <= 2}
                className="flex-1 bg-card-bg border border-gray-600 rounded-2xl py-3 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-glow transition-colors flex items-center justify-center space-x-2"
              >
                <span className="text-lg">👤➖</span>
                <span>Remove</span>
              </button>
              <button
                onClick={addPlayer}
                disabled={playerNames.length >= 100}
                className="flex-1 bg-gradient-to-r from-accent-purple to-light-purple rounded-2xl py-3 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-purple-glow transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span className="text-lg">👤➕</span>
                <span>Add</span>
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={() => setShowPlayerNamesModal(false)}
              className="w-full bg-gradient-to-r from-accent-purple to-light-purple rounded-2xl py-4 text-white font-bold text-lg shadow-lg hover:shadow-purple-glow transition-all duration-300"
            >
              Save ({playerNames.length} players)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;


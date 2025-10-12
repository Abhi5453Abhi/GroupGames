import React, { useState, useEffect } from 'react';
import { GameConfig } from '../App';

interface GameSetupProps {
  gameConfig: GameConfig;
  onConfigChange: (config: GameConfig) => void;
  onStartGame: () => void;
  onBack: () => void;
}

const ALL_CATEGORIES = [
  'Bollywood Movies', 'Food', 'Cricket', 'Cities', 'Festivals',
  'Sweets', 'Bollywood Actors', 'States', 'Street Food', 'Traditions',
  'Songs', 'Monuments', 'Games', 'Clothing', 'Brands',
  'TV Shows', 'Mythology', 'Languages', 'Dance Forms', 'Spices'
];

const GameSetup: React.FC<GameSetupProps> = ({
  gameConfig,
  onConfigChange,
  onStartGame,
  onBack,
}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  // Load selected categories from localStorage or use defaults
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('imposter-selected-categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved categories:', e);
      }
    }
    return ['Bollywood Movies', 'Food', 'Cricket', 'Cities', 'Festivals'];
  });
  
  // Save selected categories to localStorage whenever they change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    localStorage.setItem('imposter-selected-categories', JSON.stringify(selectedCategories));
    // Also update the game config
    updateConfig({ selectedCategories });
  }, [selectedCategories]);

  const updateConfig = (updates: Partial<GameConfig>) => {
    onConfigChange({ ...gameConfig, ...updates });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleCategorySelection = () => {
    updateConfig({ selectedCategories });
    setShowCategoryModal(false);
  };

  return (
    <div className="min-h-screen bg-dark-purple px-6 py-8">
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
      <div className="flex items-center justify-between mb-8 mt-12">
        <button onClick={onBack} className="text-white text-2xl">
          ←
        </button>
        <button className="text-white text-2xl">
          ⚙️
        </button>
      </div>

      {/* Imposter Count Section */}
      <div className="mb-8">
        {/* Imposter Count Card */}
        <div className="bg-card-bg rounded-2xl p-6 border border-purple-glow">
          <div className="text-center mb-4">
            <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-lg">🔍</span>
            </div>
            <h3 className="text-white font-medium">How many imposters</h3>
          </div>
          <div className="text-4xl font-bold text-white text-center">
            {gameConfig.imposterCount}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => updateConfig({ imposterCount: Math.max(1, gameConfig.imposterCount - 1) })}
              className="w-10 h-10 bg-accent-purple rounded-lg flex items-center justify-center text-white font-bold"
            >
              -
            </button>
            <button
              onClick={() => updateConfig({ imposterCount: Math.min(Math.floor(gameConfig.playerCount / 2), gameConfig.imposterCount + 1) })}
              className="w-10 h-10 bg-accent-purple rounded-lg flex items-center justify-center text-white font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Game Mode Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">⚙️</span>
          </div>
          <h2 className="text-white text-xl font-semibold">Game Mode</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Word Game Card (Selected) */}
          <div className="bg-gradient-to-r from-accent-purple to-light-purple rounded-2xl p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-white">Tt</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Word Game</h3>
              <p className="text-purple-200 text-sm">Find who doesn't know the secret word</p>
            </div>
          </div>

          {/* Question Game Card */}
          <div className="bg-card-bg rounded-2xl p-6 border border-gray-600">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-white">?</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Question Game</h3>
              <p className="text-gray-300 text-sm">Find who got a different question</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">📋</span>
          </div>
          <h2 className="text-white text-xl font-semibold">Categories</h2>
        </div>
        
        <div className="bg-card-bg rounded-2xl p-6 border border-purple-glow">
          <div className="text-white mb-4">
            {selectedCategories.slice(0, 5).join(', ')}
            {selectedCategories.length > 5 && ` +${selectedCategories.length - 5} more`}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">
              {selectedCategories.length} categories selected
            </span>
            <button 
              onClick={() => setShowCategoryModal(true)}
              className="w-8 h-8 bg-purple-glow rounded-lg flex items-center justify-center hover:bg-light-purple transition-colors"
            >
              <span className="text-white font-bold">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Imposter Settings */}
      <div className="mb-8">
        <div className="space-y-4">
          {/* Show Category to Imposter */}
          <div className="flex items-center justify-between bg-card-bg rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center">
                <span className="text-white">👁️</span>
              </div>
              <span className="text-white font-medium">Show Category to Imposter</span>
            </div>
            <button
              onClick={() => updateConfig({ showCategoryToImposter: !gameConfig.showCategoryToImposter })}
              className={`w-12 h-6 rounded-full transition-colors ${
                gameConfig.showCategoryToImposter ? 'bg-accent-purple' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                gameConfig.showCategoryToImposter ? 'transform translate-x-6' : 'transform translate-x-0.5'
              }`}></div>
            </button>
          </div>

          {/* Show Hint to Imposter */}
          <div className="flex items-center justify-between bg-card-bg rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center">
                <span className="text-white">💡</span>
              </div>
              <span className="text-white font-medium">Show Hint to Imposter</span>
            </div>
            <button
              onClick={() => updateConfig({ showHintToImposter: !gameConfig.showHintToImposter })}
              className={`w-12 h-6 rounded-full transition-colors ${
                gameConfig.showHintToImposter ? 'bg-accent-purple' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                gameConfig.showHintToImposter ? 'transform translate-x-6' : 'transform translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Start Game Button */}
      <button
        onClick={onStartGame}
        className="w-full bg-gradient-to-r from-accent-purple to-light-purple rounded-2xl py-4 text-white font-bold text-xl shadow-lg hover:shadow-purple-glow transition-all duration-300 transform hover:scale-105"
      >
        Start Game
      </button>

      {/* Category Selection Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-dark-purple rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl font-bold">Select Categories</h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-white text-2xl hover:text-gray-300"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
              {ALL_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                    selectedCategories.includes(category)
                      ? 'bg-gradient-to-r from-accent-purple to-light-purple border-purple-glow text-white'
                      : 'bg-card-bg border-gray-600 text-gray-300 hover:border-purple-glow'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category}</span>
                    {selectedCategories.includes(category) && (
                      <span className="text-white">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="flex-1 bg-card-bg border border-gray-600 rounded-2xl py-3 text-white font-semibold hover:border-purple-glow transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCategorySelection}
                disabled={selectedCategories.length === 0}
                className="flex-1 bg-gradient-to-r from-accent-purple to-light-purple rounded-2xl py-3 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-purple-glow transition-all duration-300"
              >
                Apply ({selectedCategories.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GameSetup;


import React, { useState, useEffect, useCallback } from 'react';
import MainMenu from './components/MainMenu';
import GameSetup from './components/GameSetup';
import PlayerOverview from './components/PlayerOverview';
import WordReveal from './components/WordReveal';
import VotingScreen from './components/VotingScreen';
import ResultsScreen from './components/ResultsScreen';
import CategoryGameSetup from './components/CategoryGameSetup';
import CategoryPlay from './components/CategoryPlay';
import CategoryResults from './components/CategoryResults';
import { getRandomWordFromCategory, getHintForDifficulty, HintDifficulty } from './data/wordsByCategory';

export type GameState = 
  | 'main-menu'
  | 'game-setup'
  | 'player-overview'
  | 'word-reveal'
  | 'voting'
  | 'results'
  | 'category-setup'
  | 'category-play'
  | 'category-voting'
  | 'category-results';

export interface Player {
  id: string;
  name: string;
  isImposter: boolean;
  word?: string;
  votes: number;
}

export interface GameConfig {
  playerCount: number;
  imposterCount: number;
  showCategoryToImposter: boolean;
  showHintToImposter: boolean;
  hintDifficulty: HintDifficulty;
  selectedCategories?: string[];
  playerNames?: string[];
}

function App() {
  const [gameState, setGameState] = useState<GameState>('main-menu');
  const [players, setPlayers] = useState<Player[]>([]);
  
  // Load game config from localStorage or use defaults
  const [gameConfig, setGameConfig] = useState<GameConfig>(() => {
    const saved = localStorage.getItem('imposter-game-config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved game config:', e);
      }
    }
    return {
      playerCount: 3,
      imposterCount: 1,
      showCategoryToImposter: false,
      showHintToImposter: true,
      hintDifficulty: 'medium',
    };
  });
  
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [, setSecretWord] = useState('');
  const [gameResults, setGameResults] = useState<{
    winner: 'crew' | 'imposter';
    imposterRevealed: boolean;
    imposters: Player[];
  } | null>(null);

  // Category game state
  const [categoryGameConfig, setCategoryGameConfig] = useState<any>(null);
  const [categoryScores, setCategoryScores] = useState<{ [playerName: string]: number }>({});
  
  // Track which players have revealed their words
  const [revealedPlayers, setRevealedPlayers] = useState<Set<number>>(new Set());
  
  // Store the selected word and hint for the current game
  const [gameWord, setGameWord] = useState<string>('');
  const [gameHint, setGameHint] = useState<string>('');

  // Save game config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('imposter-game-config', JSON.stringify(gameConfig));
  }, [gameConfig]);

  const resetGame = () => {
    setGameState('main-menu');
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setSecretWord('');
    setGameResults(null);
    setRevealedPlayers(new Set());
    setGameWord('');
    setGameHint('');
  };

  const initializePlayersFromConfig = (): Player[] => {
    // Always read fresh player names from localStorage
    const saved = localStorage.getItem('imposter-player-names');
    let playerNamesFromStorage: string[] = [];
    
    if (saved) {
      try {
        playerNamesFromStorage = JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing player names:', e);
        playerNamesFromStorage = ['Player 1', 'Player 2', 'Player 3'];
      }
    } else {
      playerNamesFromStorage = ['Player 1', 'Player 2', 'Player 3'];
    }

    const initialPlayers: Player[] = playerNamesFromStorage.map((name, index) => ({
      id: `player-${index}`,
      name: name,
      isImposter: false,
      votes: 0,
    }));
    setPlayers(initialPlayers);
    return initialPlayers;
  };

  const startImposterGame = () => {
    setGameState('game-setup');
  };

  const startWordReveal = (playerIndex: number = 0) => {
    setCurrentPlayerIndex(playerIndex);
    setGameState('word-reveal');
  };

  const initializeGameWords = useCallback((playersToUse?: Player[]) => {
    const currentPlayers = playersToUse || players;
    
    // Check if we have players
    if (currentPlayers.length === 0) {
      console.error('No players available for game initialization');
      return;
    }
    
    console.log('Initializing game words with', currentPlayers.length, 'players');
    
    // Get words from selected categories only
    const selectedCategories = gameConfig.selectedCategories || [
      'Bollywood Movies', 'Food', 'Cricket', 'Cities', 'Festivals'
    ];
    
    // Select a random category first
    const shuffledCategories = [...selectedCategories].sort(() => Math.random() - 0.5);
    const selectedCategory = shuffledCategories[0];
    
    // Get a random word from the selected category using the shared data
    const selectedWordData = getRandomWordFromCategory(selectedCategory);
    
    if (!selectedWordData) {
      console.error('No words found for category:', selectedCategory);
      // Fallback to a default category
      const fallbackData = getRandomWordFromCategory('Bollywood Movies');
      if (!fallbackData) {
        throw new Error('No words available in any category');
      }
      const selectedWord = fallbackData.word;
      const selectedHint = getHintForDifficulty(fallbackData, gameConfig.hintDifficulty);
      
      // Assign imposters randomly
      const shuffledPlayers = [...currentPlayers].sort(() => Math.random() - 0.5);
      console.log('FALLBACK - Players:', currentPlayers.length);
      console.log('FALLBACK - Imposter count:', gameConfig.imposterCount);
      console.log('FALLBACK - Shuffled players:', shuffledPlayers.map(p => p.name));
      
      currentPlayers.forEach(player => {
        const isImposter = shuffledPlayers.slice(0, gameConfig.imposterCount).some(p => p.id === player.id);
        player.isImposter = isImposter;
        player.word = isImposter ? (gameConfig.showCategoryToImposter ? 'Bollywood Movies' : 'IMPOSTER') : selectedWord;
        console.log(`FALLBACK - Player ${player.name}: isImposter=${isImposter}, word=${player.word}`);
      });
      
      // Store the selected word and hint for the game
      setSecretWord(selectedWord);
      setGameWord(selectedWord);
      setGameHint(selectedHint);
      
      return { selectedWord, selectedHint, selectedCategory: 'Bollywood Movies' };
    }
    
    const selectedWord = selectedWordData.word;
    const selectedHint = getHintForDifficulty(selectedWordData, gameConfig.hintDifficulty);
    
    // Assign imposters randomly
    const shuffledPlayers = [...currentPlayers].sort(() => Math.random() - 0.5);
    console.log('Players:', currentPlayers.length);
    console.log('Imposter count:', gameConfig.imposterCount);
    console.log('Shuffled players:', shuffledPlayers.map(p => p.name));
    
    currentPlayers.forEach(player => {
      const isImposter = shuffledPlayers.slice(0, gameConfig.imposterCount).some(p => p.id === player.id);
      player.isImposter = isImposter;
      player.word = isImposter ? (gameConfig.showCategoryToImposter ? selectedCategory : 'IMPOSTER') : selectedWord;
      console.log(`Player ${player.name}: isImposter=${isImposter}, word=${player.word}`);
    });
    
    // Store the selected word and hint for the game
    setSecretWord(selectedWord);
    setGameWord(selectedWord);
    setGameHint(selectedHint);
    
    return { selectedWord, selectedHint, selectedCategory };
  }, [players, gameConfig]);

  const startCategoryGame = () => {
    setGameState('category-setup');
  };

  const renderCurrentScreen = () => {
    switch (gameState) {
      case 'main-menu':
        return (
          <MainMenu
            onStartImposter={startImposterGame}
            onStartCategory={startCategoryGame}
          />
        );
      case 'game-setup':
        return (
          <GameSetup
            gameConfig={gameConfig}
            onConfigChange={setGameConfig}
            onStartGame={() => {
              // Initialize players from config
              const playersArray = initializePlayersFromConfig();
              // Initialize game words (select word and assign imposters)
              initializeGameWords(playersArray);
              setGameState('player-overview');
            }}
            onBack={() => setGameState('main-menu')}
          />
        );
      case 'player-overview':
        return (
          <PlayerOverview
            players={players}
            onPlayerClick={startWordReveal}
            onBack={() => setGameState('game-setup')}
            revealedPlayers={revealedPlayers}
          />
        );
      case 'word-reveal':
        return (
          <WordReveal
            key={players.length > 0 ? players[currentPlayerIndex]?.id : 'word-reveal'}
            players={players}
            gameConfig={gameConfig}
            currentPlayerIndex={currentPlayerIndex}
            onNextPlayer={(index) => {
              if (index >= players.length) {
                setGameState('voting');
              } else {
                setCurrentPlayerIndex(index);
              }
            }}
            onBack={() => {
              // Go back to player overview
              setGameState('player-overview');
            }}
            onStartVoting={() => {
              setGameState('voting');
            }}
            onPlayerRevealed={(playerIndex) => {
              setRevealedPlayers(prev => new Set(prev).add(playerIndex));
            }}
            gameWord={gameWord}
            gameHint={gameHint}
          />
        );
      case 'voting':
        return (
          <VotingScreen
            players={players}
            onVoteComplete={(results) => {
              setGameResults(results);
              setGameState('results');
            }}
            onBack={() => {
              // Reset game state and go back to setup
              setPlayers([]);
              setCurrentPlayerIndex(0);
              setGameState('game-setup');
            }}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            results={gameResults!}
            players={players}
            onPlayAgain={resetGame}
            onBackToMenu={resetGame}
          />
        );
      case 'category-setup':
        return (
          <CategoryGameSetup
            onStartGame={(config) => {
              setCategoryGameConfig(config);
              setGameState('category-play');
            }}
            onBack={() => setGameState('main-menu')}
          />
        );
      case 'category-play':
        return (
          <CategoryPlay
            prompts={categoryGameConfig?.selectedCategories || []}
            players={categoryGameConfig?.playerNames || []}
            roundsToPlay={categoryGameConfig?.roundsToPlay || 5}
            timePerRound={categoryGameConfig?.timePerRound || 60}
            isTeamMode={categoryGameConfig?.isTeamMode || false}
            team1={categoryGameConfig?.team1 || []}
            team2={categoryGameConfig?.team2 || []}
            onGameComplete={(scores, teamScores) => {
              setCategoryScores(scores);
              if (teamScores) {
                // Store team scores for results screen
                (setCategoryScores as any).teamScores = teamScores;
              }
              setGameState('category-results');
            }}
            onBack={() => setGameState('category-setup')}
          />
        );
      case 'category-results':
        return (
          <CategoryResults
            scores={categoryScores}
            onPlayAgain={() => {
              setCategoryScores({});
              setGameState('category-setup');
            }}
            onBackToMenu={() => {
              setCategoryScores({});
              setCategoryGameConfig(null);
              setGameState('main-menu');
            }}
          />
        );
      default:
        return <MainMenu onStartImposter={startImposterGame} onStartCategory={startCategoryGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-purple text-white">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;

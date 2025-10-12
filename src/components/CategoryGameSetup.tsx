import React, { useState } from 'react';

interface CategoryGameConfig {
  playerCount: number;
  roundsToPlay: number;
  timePerRound: number;
  selectedCategories: string[];
  playerNames?: string[];
  isTeamMode: boolean;
  team1?: string[];
  team2?: string[];
}

interface CategoryGameSetupProps {
  onStartGame: (config: CategoryGameConfig) => void;
  onBack: () => void;
}

const ALL_CATEGORY_PROMPTS = [
  // Situational - Double Meaning
  'Things you can say at the gym AND in bed',
  'Things you can say to a barista AND to your date',
  'Things you can say to your pet AND to your partner',
  'Things you can say during yoga AND during foreplay',
  'Things you can say to a mechanic AND to a lover',
  'Things you can say at a buffet AND under the sheets',
  'Things you can say on an airplane AND on a first date',
  'Things you can say to your boss AND to your ex',
  'Things you can say about a haircut AND about a hookup',
  'Things you can say during a massage AND during a make-out',
  
  // Taboo but funny
  'Things you can\'t use as lube',
  'Safe words that would actually make it worse',
  'Places that are definitely not romantic',
  'Texts that should never be sent after midnight',
  'Excuses for why you\'re suddenly "busy"',
  'Roommate rules that should be crimes',
  'Search histories you\'d clear first',
  'Items you don\'t want your parents finding',
  'Kinks you\'d invent (name only)',
  'Pickup lines that would get you banned',
  
  // Red flags & choices
  'Icks that kill the vibe instantly',
  'Green flags you pretend to have',
  'Red flags you ignore anyway',
  'Hobbies that sound hotter than they are',
  'Phases you swear you\'re "over"',
  'Dating app prompts that should be illegal',
  'First-date questions you should never ask',
  'Second-date tests you secretly run',
  'Third-date expectations you\'ll never admit',
  'Breakup lines no one should use',
  
  // Party life chaos
  'Shots you\'ll never touch again',
  'Karaoke songs that ruin the mood',
  'Hangover cures that definitely don\'t work',
  'Bar bathroom confessions',
  'Pre-game rituals you\'re oddly proud of',
  'Drunk food orders you defend with honor',
  'Party fouls (no bodily stuff)',
  'Things you say when you want to Irish-exit',
  'Lies to leave the after-party',
  'Group chat messages that start a war',
  
  // Role-play & improv
  'Safe-for-work code words for NSFW topics',
  'Fake celeb couple names that shouldn\'t exist',
  'Reality-show confessionals about last night',
  'Villain origin stories that begin on a dating app',
  'Clickbait headlines about your weekend',
  'Florida-Man style headlines about your group',
  'Dumb laws you\'d pass for dating apps',
  'New emojis we desperately need (describe)',
  'Tinder bios written by an enemy',
  'Hinge prompts answered by your mom (nightmare version)',
  
  // Objects & "nope" lists
  'Household items that sound dirty but aren\'t',
  'Foods that should never be involved (name only)',
  'Outfits that turn a 10 into a 2',
  'Fragrances that would empty a room',
  'Gifts that guarantee a breakup',
  'Playlist songs that kill the mood',
  'Pet names that are instant turn-offs',
  'Decor that screams "run"',
  'Tattoo ideas you\'d regret forever',
  'Things you should never say mid-kiss',
  
  // 18+ Explicit
  'Sex positions you\'d never try',
  'Sex positions with funny names',
  'Worst places to get caught',
  'Things to never say during sex',
  'Excuses for weird noises in bed',
  'Things that sound sexy but aren\'t',
  'Worst bedroom surprises',
  'Failed sexy moves',
  'Embarrassing turn-ons',
  'Things you\'d never admit you\'re into',
  
  // Hindi/Indian Slang (Gaaliya - Offensive)
  'Creative Hindi gaali combinations',
  'Situations that deserve a gaali',
  'Gaali that sounds like a compliment',
  'English words that sound like gaali',
  'Funniest way to insult someone in Hindi',
  'Bollywood dialogues that are basically gaali',
  'Things your mom says instead of gaali',
  'Passive-aggressive Indian insults',
  'Desi ways to tell someone off',
  'Hindi phrases foreigners should never say'
];

const CategoryGameSetup: React.FC<CategoryGameSetupProps> = ({ onStartGame, onBack }) => {
  // Load player names from localStorage (shared with Imposter game)
  const [playerNames] = useState<string[]>(() => {
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

  const [roundsToPlay, setRoundsToPlay] = useState(5);
  const [timePerRound, setTimePerRound] = useState(60);
  const [isTeamMode, setIsTeamMode] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [team1, setTeam1] = useState<string[]>([]);
  const [team2, setTeam2] = useState<string[]>([]);

  const handleStartGame = () => {
    if (isTeamMode && (team1.length === 0 || team2.length === 0)) {
      alert('Please divide players into teams first!');
      setShowTeamModal(true);
      return;
    }

    onStartGame({
      playerCount: playerNames.length,
      roundsToPlay,
      timePerRound,
      selectedCategories: ALL_CATEGORY_PROMPTS,
      playerNames,
      isTeamMode,
      team1: isTeamMode ? team1 : undefined,
      team2: isTeamMode ? team2 : undefined
    });
  };

  const moveToTeam1 = (playerName: string) => {
    setTeam2(team2.filter(p => p !== playerName));
    if (!team1.includes(playerName)) {
      setTeam1([...team1, playerName]);
    }
  };

  const moveToTeam2 = (playerName: string) => {
    setTeam1(team1.filter(p => p !== playerName));
    if (!team2.includes(playerName)) {
      setTeam2([...team2, playerName]);
    }
  };

  const autoAssignTeams = () => {
    const shuffled = [...playerNames].sort(() => Math.random() - 0.5);
    const mid = Math.ceil(shuffled.length / 2);
    setTeam1(shuffled.slice(0, mid));
    setTeam2(shuffled.slice(mid));
  };

  return (
    <div className="min-h-screen bg-dark-purple px-6 py-8">
      {/* Header */}
      <div className="absolute top-12 left-6">
        <button onClick={onBack} className="text-white text-2xl hover:text-purple-300 transition-colors">
          ←
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-8 mt-16">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-purple-glow">
          <span className="text-4xl">🎯</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Category Game</h1>
        <p className="text-gray-300">Setup your game</p>
      </div>

      {/* Configuration Cards */}
      <div className="max-w-md mx-auto space-y-4">
        {/* Game Mode Card */}
        <div className="bg-card-bg rounded-2xl p-6 border border-purple-glow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🎮</span>
              </div>
              <h3 className="text-white font-medium">Game Mode</h3>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setIsTeamMode(false);
                setTeam1([]);
                setTeam2([]);
              }}
              className={`flex-1 rounded-xl p-4 border-2 transition-all ${
                !isTeamMode
                  ? 'border-purple-500 bg-purple-500 bg-opacity-20'
                  : 'border-gray-600 bg-gray-700'
              }`}
            >
              <div className="text-center">
                <span className="text-2xl block mb-2">👤</span>
                <p className="text-white font-semibold">Individual</p>
                <p className="text-gray-400 text-xs mt-1">Every player for themselves</p>
              </div>
            </button>
            <button
              onClick={() => {
                setIsTeamMode(true);
                if (team1.length === 0 && team2.length === 0) {
                  autoAssignTeams();
                }
              }}
              className={`flex-1 rounded-xl p-4 border-2 transition-all ${
                isTeamMode
                  ? 'border-purple-500 bg-purple-500 bg-opacity-20'
                  : 'border-gray-600 bg-gray-700'
              }`}
            >
              <div className="text-center">
                <span className="text-2xl block mb-2">👥</span>
                <p className="text-white font-semibold">Team Mode</p>
                <p className="text-gray-400 text-xs mt-1">2 teams compete</p>
              </div>
            </button>
          </div>
          {isTeamMode && (
            <button
              onClick={() => setShowTeamModal(true)}
              className="w-full mt-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl py-3 text-white font-semibold hover:shadow-purple-glow transition-all"
            >
              Configure Teams →
            </button>
          )}
        </div>

        {/* Rounds Card */}
        <div className="bg-card-bg rounded-2xl p-6 border border-purple-glow">
          <div className="text-center mb-4">
            <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-lg">🔄</span>
            </div>
            <h3 className="text-white font-medium">Number of rounds</h3>
          </div>
          <div className="text-4xl font-bold text-white text-center">
            {roundsToPlay}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setRoundsToPlay(Math.max(1, roundsToPlay - 1))}
              className="w-10 h-10 bg-accent-purple rounded-lg flex items-center justify-center text-white font-bold hover:bg-light-purple transition-colors"
            >
              -
            </button>
            <button
              onClick={() => setRoundsToPlay(Math.min(20, roundsToPlay + 1))}
              className="w-10 h-10 bg-accent-purple rounded-lg flex items-center justify-center text-white font-bold hover:bg-light-purple transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Timer Card */}
        <div className="bg-card-bg rounded-2xl p-6 border border-purple-glow">
          <div className="text-center mb-4">
            <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-lg">⏱️</span>
            </div>
            <h3 className="text-white font-medium">Time per round</h3>
          </div>
          <div className="text-4xl font-bold text-white text-center">
            {timePerRound}s
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setTimePerRound(Math.max(15, timePerRound - 15))}
              className="w-10 h-10 bg-accent-purple rounded-lg flex items-center justify-center text-white font-bold hover:bg-light-purple transition-colors"
            >
              -
            </button>
            <button
              onClick={() => setTimePerRound(Math.min(300, timePerRound + 15))}
              className="w-10 h-10 bg-accent-purple rounded-lg flex items-center justify-center text-white font-bold hover:bg-light-purple transition-colors"
            >
              +
            </button>
          </div>
          <p className="text-gray-400 text-sm text-center mt-2">15s - 5min</p>
        </div>

        {/* Categories Info */}
        <div className="bg-card-bg rounded-2xl p-6 border border-purple-glow">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">📝</span>
            <h3 className="text-white font-medium">Category Prompts</h3>
          </div>
          <p className="text-gray-300 text-sm">
            {ALL_CATEGORY_PROMPTS.length} funny & offensive prompts included
          </p>
          <p className="text-yellow-400 text-xs mt-2">⚠️ Contains 18+ content</p>
        </div>

        {/* Start Game Button */}
        <button
          onClick={handleStartGame}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl py-4 text-white font-bold text-xl shadow-lg hover:shadow-purple-glow transition-all duration-300 transform hover:scale-105 mt-8"
        >
          Start Game
        </button>
      </div>

      {/* Team Configuration Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-dark-purple rounded-3xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl font-bold">Configure Teams</h2>
              <button onClick={() => setShowTeamModal(false)} className="text-white text-2xl hover:text-gray-300">×</button>
            </div>

            <button onClick={autoAssignTeams} className="w-full bg-gradient-to-r from-accent-purple to-light-purple rounded-2xl py-3 text-white font-semibold mb-6 hover:shadow-purple-glow transition-all">
              🎲 Auto Assign Teams
            </button>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-card-bg rounded-2xl p-4 border-2 border-blue-500">
                <h3 className="text-white font-bold text-lg mb-3 text-center">Team 1 <span className="text-blue-400">({team1.length})</span></h3>
                <div className="space-y-2">
                  {team1.map((playerName, index) => (
                    <div key={index} className="bg-blue-900 bg-opacity-30 rounded-xl p-3 border border-blue-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{playerName.charAt(0).toUpperCase()}</span>
                          </div>
                          <span className="text-white font-medium text-sm">{playerName}</span>
                        </div>
                        <button onClick={() => moveToTeam2(playerName)} className="text-white hover:text-red-400 text-xl">→</button>
                      </div>
                    </div>
                  ))}
                  {team1.length === 0 && <p className="text-gray-400 text-center py-4 text-sm">No players yet</p>}
                </div>
              </div>

              <div className="bg-card-bg rounded-2xl p-4 border-2 border-red-500">
                <h3 className="text-white font-bold text-lg mb-3 text-center">Team 2 <span className="text-red-400">({team2.length})</span></h3>
                <div className="space-y-2">
                  {team2.map((playerName, index) => (
                    <div key={index} className="bg-red-900 bg-opacity-30 rounded-xl p-3 border border-red-500">
                      <div className="flex items-center justify-between">
                        <button onClick={() => moveToTeam1(playerName)} className="text-white hover:text-blue-400 text-xl">←</button>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium text-sm">{playerName}</span>
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{playerName.charAt(0).toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {team2.length === 0 && <p className="text-gray-400 text-center py-4 text-sm">No players yet</p>}
                </div>
              </div>
            </div>

            {playerNames.filter(p => !team1.includes(p) && !team2.includes(p)).length > 0 && (
              <div className="bg-gray-700 rounded-2xl p-4 mb-6">
                <h3 className="text-white font-semibold mb-3">Unassigned Players</h3>
                <div className="space-y-2">
                  {playerNames.filter(p => !team1.includes(p) && !team2.includes(p)).map((playerName, index) => (
                    <div key={index} className="bg-gray-600 rounded-xl p-3 flex items-center justify-between">
                      <span className="text-white font-medium">{playerName}</span>
                      <div className="flex space-x-2">
                        <button onClick={() => moveToTeam1(playerName)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600">Team 1</button>
                        <button onClick={() => moveToTeam2(playerName)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600">Team 2</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowTeamModal(false)}
              disabled={team1.length === 0 || team2.length === 0}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl py-4 text-white font-bold text-lg shadow-lg hover:shadow-purple-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Teams
            </button>
            {(team1.length === 0 || team2.length === 0) && (
              <p className="text-yellow-400 text-sm text-center mt-2">Both teams must have at least one player</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryGameSetup;


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
  // Desi Double Meaning (Hindi/Punjabi)
  'Things you can say to a dhaba owner AND to your girlfriend',
  'Things you can say at a wedding AND in bed',
  'Things you can say to your mom AND to your crush',
  'Things you can say during cricket match AND during foreplay',
  'Things you can say to an auto driver AND to your date',
  'Things you can say at a temple AND under the sheets',
  'Things you can say during Diwali AND during a make-out',
  'Things you can say to your boss AND to your ex',
  'Things you can say about biryani AND about a hookup',
  'Things you can say during Holi AND during foreplay',
  
  // Desi Taboo (Hindi/Punjabi)
  'Things you can\'t use as lube (desi edition)',
  'Safe words that would make it worse (Hindi)',
  'Places that are definitely not romantic (India)',
  'Texts that should never be sent after midnight (Hinglish)',
  'Excuses for why you\'re suddenly "busy" (desi style)',
  'Roommate rules that should be crimes (PG/boys hostel)',
  'Search histories you\'d clear first (Indian context)',
  'Items you don\'t want your parents finding (desi edition)',
  'Kinks you\'d invent (Hindi names only)',
  'Pickup lines that would get you banned (Punjabi style)',
  
  // Desi Red Flags & Dating
  'Icks that kill the vibe instantly (Indian dating)',
  'Green flags you pretend to have (desi style)',
  'Red flags you ignore anyway (Hinglish)',
  'Hobbies that sound hotter than they are (India)',
  'Phases you swear you\'re "over" (desi edition)',
  'Dating app prompts that should be illegal (India)',
  'First-date questions you should never ask (Hindi)',
  'Second-date tests you secretly run (desi style)',
  'Third-date expectations you\'ll never admit (Indian)',
  'Breakup lines no one should use (Hinglish)',
  
  // Desi Party Life
  'Shots you\'ll never touch again (Indian parties)',
  'Karaoke songs that ruin the mood (Bollywood)',
  'Hangover cures that definitely don\'t work (desi)',
  'Bar bathroom confessions (India)',
  'Pre-game rituals you\'re oddly proud of (desi)',
  'Drunk food orders you defend with honor (Indian)',
  'Party fouls (no bodily stuff) (desi edition)',
  'Things you say when you want to Irish-exit (Hindi)',
  'Lies to leave the after-party (Indian style)',
  'Group chat messages that start a war (desi)',
  
  // Bollywood & Desi Culture
  'Safe-for-work code words for NSFW topics (Hindi)',
  'Fake Bollywood couple names that shouldn\'t exist',
  'Reality-show confessionals about last night (Indian)',
  'Villain origin stories that begin on a dating app (desi)',
  'Clickbait headlines about your weekend (Hindi)',
  'Desi-Man style headlines about your group',
  'Dumb laws you\'d pass for dating apps (India)',
  'New emojis we desperately need (describe in Hindi)',
  'Tinder bios written by an enemy (desi style)',
  'Hinge prompts answered by your mom (nightmare version)',
  
  // Desi Objects & "Nope" Lists
  'Household items that sound dirty but aren\'t (Hindi)',
  'Foods that should never be involved (name only) (desi)',
  'Outfits that turn a 10 into a 2 (Indian context)',
  'Fragrances that would empty a room (desi)',
  'Gifts that guarantee a breakup (Indian)',
  'Playlist songs that kill the mood (Bollywood)',
  'Pet names that are instant turn-offs (Hindi)',
  'Decor that screams "run" (desi edition)',
  'Tattoo ideas you\'d regret forever (Indian)',
  'Things you should never say mid-kiss (Hinglish)',
  
  // 18+ Explicit (Desi)
  'Sex positions you\'d never try (Hindi names)',
  'Sex positions with funny names (Punjabi)',
  'Worst places to get caught (India)',
  'Things to never say during sex (Hindi)',
  'Excuses for weird noises in bed (desi)',
  'Things that sound sexy but aren\'t (Hinglish)',
  'Worst bedroom surprises (Indian)',
  'Failed sexy moves (desi edition)',
  'Embarrassing turn-ons (Hindi)',
  'Things you\'d never admit you\'re into (Punjabi)',
  
  // Hindi/Punjabi Slang & Gaaliya
  'Creative Hindi gaali combinations',
  'Situations that deserve a gaali (Hindi)',
  'Gaali that sounds like a compliment',
  'English words that sound like gaali',
  'Funniest way to insult someone in Hindi',
  'Bollywood dialogues that are basically gaali',
  'Things your mom says instead of gaali',
  'Passive-aggressive Indian insults',
  'Desi ways to tell someone off',
  'Hindi phrases foreigners should never say',
  
  // Punjabi Special
  'Punjabi pickup lines that would get you slapped',
  'Things you can say to a Sardar AND to your crush',
  'Punjabi gaaliya that sound like compliments',
  'Things your Punjabi mom says instead of swearing',
  'Punjabi wedding traditions that are basically foreplay',
  'Things you can say at a Punjabi wedding AND in bed',
  'Punjabi food items that sound dirty',
  'Punjabi dance moves that are basically mating calls',
  'Things you can say to a Punjabi uncle AND to your date',
  'Punjabi phrases that foreigners should never say',
  
  // South Indian Special
  'Tamil pickup lines that would get you banned',
  'Things you can say to a South Indian AND to your crush',
  'Malayalam phrases that sound like gaali',
  'Telugu words that foreigners should never say',
  'Kannada expressions that are basically insults',
  'South Indian wedding traditions that are foreplay',
  'Things you can say at a South Indian wedding AND in bed',
  'South Indian food items that sound dirty',
  'South Indian dance moves that are mating calls',
  'Things you can say to a South Indian uncle AND to your date',
  
  // Mumbai Special
  'Mumbai pickup lines that would get you slapped',
  'Things you can say to a Mumbaikar AND to your crush',
  'Mumbai slang that sounds like gaali',
  'Things your Mumbai mom says instead of swearing',
  'Mumbai local train experiences that are foreplay',
  'Things you can say on Mumbai local AND in bed',
  'Mumbai street food that sounds dirty',
  'Mumbai dance moves that are mating calls',
  'Things you can say to a Mumbai uncle AND to your date',
  'Mumbai phrases that foreigners should never say',
  
  // Delhi Special
  'Delhi pickup lines that would get you banned',
  'Things you can say to a Delhiite AND to your crush',
  'Delhi slang that sounds like gaali',
  'Things your Delhi mom says instead of swearing',
  'Delhi metro experiences that are foreplay',
  'Things you can say on Delhi metro AND in bed',
  'Delhi street food that sounds dirty',
  'Delhi dance moves that are mating calls',
  'Things you can say to a Delhi uncle AND to your date',
  'Delhi phrases that foreigners should never say',
  
  // Bengali Special
  'Bengali pickup lines that would get you slapped',
  'Things you can say to a Bengali AND to your crush',
  'Bengali phrases that sound like gaali',
  'Things your Bengali mom says instead of swearing',
  'Bengali wedding traditions that are foreplay',
  'Things you can say at a Bengali wedding AND in bed',
  'Bengali food items that sound dirty',
  'Bengali dance moves that are mating calls',
  'Things you can say to a Bengali uncle AND to your date',
  'Bengali phrases that foreigners should never say',
  
  // Gujarati Special
  'Gujarati pickup lines that would get you banned',
  'Things you can say to a Gujarati AND to your crush',
  'Gujarati slang that sounds like gaali',
  'Things your Gujarati mom says instead of swearing',
  'Gujarati wedding traditions that are foreplay',
  'Things you can say at a Gujarati wedding AND in bed',
  'Gujarati food items that sound dirty',
  'Gujarati dance moves that are mating calls',
  'Things you can say to a Gujarati uncle AND to your date',
  'Gujarati phrases that foreigners should never say'
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





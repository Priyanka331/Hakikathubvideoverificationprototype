import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  Trophy, 
  Target, 
  Zap, 
  CheckCircle, 
  XCircle,
  Play,
  Award,
  Users,
  Sparkles,
  Star,
  Clock
} from 'lucide-react';

interface GameScreenProps {
  onBack: () => void;
}

const challenges = [
  {
    id: 1,
    title: "Deepfake Detection Master",
    description: "Can you spot the AI-generated face in this video?",
    difficulty: "Easy",
    points: 15,
    thumbnail: "deepfake-challenge.jpg",
    color: "from-green-500/20 to-green-600/20"
  },
  {
    id: 2,
    title: "Context Detective Pro",
    description: "Find the missing context in this news clip",
    difficulty: "Medium", 
    points: 30,
    thumbnail: "context-challenge.jpg",
    color: "from-amber-500/20 to-amber-600/20"
  },
  {
    id: 3,
    title: "Expert Manipulation Hunter",
    description: "Advanced manipulation detection challenge",
    difficulty: "Hard",
    points: 60,
    thumbnail: "expert-challenge.jpg",
    color: "from-red-500/20 to-red-600/20"
  }
];

const badges = [
  { name: "Truth Seeker", description: "Completed first challenge", icon: Target, earned: true, rarity: "common" },
  { name: "Fake Hunter", description: "Detected 10 deepfakes", icon: Zap, earned: true, rarity: "common" },
  { name: "Context Guardian", description: "Found 5 missing contexts", icon: CheckCircle, earned: false, rarity: "rare" },
  { name: "Master Detective", description: "100% accuracy on expert level", icon: Award, earned: false, rarity: "legendary" }
];

const leaderboard = [
  { rank: 1, name: "Sarah Chen", score: 2450, badges: 8, avatar: "👩‍💻" },
  { rank: 2, name: "Mike Rodriguez", score: 2380, badges: 7, avatar: "👨‍🔬" },
  { rank: 3, name: "Alex Kim", score: 2210, badges: 6, avatar: "👨‍💼" },
  { rank: 4, name: "You", score: 1850, badges: 2, isCurrentUser: true, avatar: "🧑‍💻" },
  { rank: 5, name: "Emma Johnson", score: 1720, badges: 5, avatar: "👩‍🎓" }
];

export function GameScreen({ onBack }: GameScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'challenges' | 'badges' | 'leaderboard'>('challenges');
  const [currentChallenge, setCurrentChallenge] = useState<number | null>(null);
  const [score, setScore] = useState(1850);
  const [streak, setStreak] = useState(7);

  const handleChallengeStart = (challengeId: number) => {
    setCurrentChallenge(challengeId);
    // Mock challenge start
    setTimeout(() => {
      setCurrentChallenge(null);
      setScore(prev => prev + challenges.find(c => c.id === challengeId)?.points || 0);
      setStreak(prev => prev + 1);
    }, 3000);
  };

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
      case 'Medium': return { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
      case 'Hard': return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
      default: return { color: 'text-muted-foreground', bg: 'bg-muted/10', border: 'border-muted/30' };
    }
  };

  const getBadgeRarityConfig = (rarity: string) => {
    switch (rarity) {
      case 'common': return { color: 'text-gray-400', glow: 'glow-primary' };
      case 'rare': return { color: 'text-blue-400', glow: 'glow-secondary' };
      case 'legendary': return { color: 'text-yellow-400', glow: 'glow-amber' };
      default: return { color: 'text-muted-foreground', glow: '' };
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="p-3 rounded-xl bg-card/50 border border-border/50 hover:bg-card glow-primary transition-all duration-300"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Spot the Fake
              </h1>
              <p className="text-lg text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Train your eye to detect misinformation
              </p>
            </div>
          </div>
          
          <div className="flex gap-6 text-center">
            <div className="px-6 py-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="text-3xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {score.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Points
              </div>
            </div>
            <div className="px-6 py-4 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
              <div className="text-3xl font-bold text-secondary mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {streak}
              </div>
              <div className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Day Streak
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 glow-primary">
                <Trophy className="text-white" size={24} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Rank #4
              </div>
              <div className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                This week
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="text-green-400" size={24} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                87%
              </div>
              <div className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Accuracy
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-2 border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="text-amber-400" size={24} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                23
              </div>
              <div className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Challenges Won
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex space-x-2 bg-card/30 p-2 rounded-2xl border border-border/30 backdrop-blur-sm"
        >
          {(['challenges', 'badges', 'leaderboard'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 px-6 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                selectedTab === tab
                  ? 'gradient-primary text-white glow-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Content based on selected tab */}
        {selectedTab === 'challenges' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Daily Challenges
              </h2>
              <Badge 
                variant="secondary"
                className="bg-secondary/10 text-secondary border border-secondary/30 text-base px-4 py-2"
              >
                <Clock className="mr-2" size={16} />
                Resets in 16h 42m
              </Badge>
            </div>
            
            {/* Challenge Modal */}
            {currentChallenge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              >
                <Card className="w-full max-w-lg bg-card/90 backdrop-blur-sm border border-border/50 card-glow">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 glow-primary"
                    >
                      <Sparkles className="text-white" size={32} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      Loading Challenge...
                    </h3>
                    <p className="text-muted-foreground mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                      Preparing your video analysis challenge
                    </p>
                    <Progress value={66} className="h-3 bg-muted/30" />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="grid gap-6">
              {challenges.map((challenge, index) => {
                const difficultyConfig = getDifficultyConfig(challenge.difficulty);
                return (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                  >
                    <Card className="hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 card-glow">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className={`w-20 h-20 bg-gradient-to-br ${challenge.color} rounded-2xl border-2 border-border/30 flex items-center justify-center`}>
                              <Play className="text-foreground" size={28} />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                {challenge.title}
                              </h3>
                              <p className="text-muted-foreground mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                                {challenge.description}
                              </p>
                              <div className="flex items-center gap-3">
                                <Badge className={`${difficultyConfig.bg} ${difficultyConfig.border} ${difficultyConfig.color} border font-medium`}>
                                  {challenge.difficulty}
                                </Badge>
                                <span className="text-primary font-semibold flex items-center gap-1" style={{ fontFamily: 'var(--font-body)' }}>
                                  <Star size={16} />
                                  +{challenge.points} points
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleChallengeStart(challenge.id)}
                            disabled={currentChallenge !== null}
                            className="px-8 py-3 gradient-primary hover:scale-105 glow-primary transition-all duration-300 border-0 rounded-xl font-semibold disabled:opacity-50 disabled:hover:scale-100"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            Start Challenge
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {selectedTab === 'badges' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
              Achievement Badges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {badges.map((badge, index) => {
                const Icon = badge.icon;
                const rarityConfig = getBadgeRarityConfig(badge.rarity);
                return (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className={`${badge.earned ? `bg-card/70 border-border/50 ${rarityConfig.glow}` : 'bg-card/30 border-border/30 opacity-60'} backdrop-blur-sm transition-all duration-300 hover:scale-105`}>
                      <CardContent className="p-8 text-center">
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 ${
                          badge.earned ? 'gradient-primary glow-primary' : 'bg-muted/30'
                        }`}>
                          <Icon 
                            className={`${badge.earned ? 'text-white' : 'text-muted-foreground'}`} 
                            size={32}
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                          {badge.name}
                        </h3>
                        <p className="text-muted-foreground mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                          {badge.description}
                        </p>
                        {badge.earned ? (
                          <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 font-medium">
                            <CheckCircle size={14} className="mr-1" />
                            Earned
                          </Badge>
                        ) : (
                          <Badge className="bg-muted/10 text-muted-foreground border border-muted/30 font-medium">
                            Not Earned
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {selectedTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Weekly Leaderboard
              </h2>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary border border-secondary/30 text-base px-4 py-2">
                <Users size={16} className="mr-2" />
                2,847 players
              </Badge>
            </div>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow">
              <CardContent className="p-0">
                {leaderboard.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className={`p-6 border-b border-border/30 last:border-b-0 flex items-center justify-between transition-all duration-300 hover:bg-card/50 ${
                      player.isCurrentUser ? 'bg-primary/5 border-primary/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                        player.rank === 1 ? 'gradient-primary text-white glow-primary' :
                        player.rank === 2 ? 'bg-gradient-to-br from-gray-300/20 to-gray-400/20 border-2 border-gray-400/30 text-gray-300' :
                        player.rank === 3 ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-2 border-amber-500/30 text-amber-400' :
                        'bg-muted/30 text-muted-foreground'
                      }`} style={{ fontFamily: 'var(--font-heading)' }}>
                        {player.rank === 1 ? <Trophy size={20} /> : player.rank}
                      </div>
                      <div className="text-2xl">{player.avatar}</div>
                      <div>
                        <div className="font-semibold text-foreground text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                          {player.name}
                          {player.isCurrentUser && (
                            <Badge className="ml-2 bg-primary/10 text-primary border border-primary/30">You</Badge>
                          )}
                        </div>
                        <div className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                          {player.badges} badges earned
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                        {player.score.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        points
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
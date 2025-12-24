import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  TrendingUp, 
  Shield, 
  Eye, 
  Clock,
  Download,
  Trash2,
  ExternalLink,
  Calendar,
  Award,
  Target,
  Sparkles,
  Star,
  Zap,
  Trophy,
  Play
} from 'lucide-react';

interface DashboardScreenProps {
  onBack: () => void;
}

const recentAnalyses = [
  {
    id: 1,
    source: "YouTube: Tech CEO Interview Clip",
    date: "2024-08-22",
    authenticity: 75,
    status: "Context Missing",
    saved: true,
    platform: "YouTube"
  },
  {
    id: 2,
    source: "TikTok: Viral Dance Challenge",
    date: "2024-08-21",
    authenticity: 95,
    status: "Authentic",
    saved: false,
    platform: "TikTok"
  },
  {
    id: 3,
    source: "Twitter: Political Statement Clip",
    date: "2024-08-20",
    authenticity: 45,
    status: "Likely Manipulated",
    saved: true,
    platform: "Twitter"
  },
  {
    id: 4,
    source: "Instagram: Celebrity Interview",
    date: "2024-08-19",
    authenticity: 88,
    status: "Authentic",
    saved: false,
    platform: "Instagram"
  }
];

const weeklyStats = [
  { day: 'Mon', clips: 3, misinformation: 1 },
  { day: 'Tue', clips: 5, misinformation: 2 },
  { day: 'Wed', clips: 2, misinformation: 0 },
  { day: 'Thu', clips: 7, misinformation: 3 },
  { day: 'Fri', clips: 4, misinformation: 1 },
  { day: 'Sat', clips: 6, misinformation: 2 },
  { day: 'Sun', clips: 8, misinformation: 1 }
];

const achievements = [
  { name: "Truth Seeker", icon: Target, earned: true },
  { name: "Fake Hunter", icon: Zap, earned: true },
  { name: "Context Master", icon: Eye, earned: false },
  { name: "Weekly Champion", icon: Trophy, earned: false }
];

export function DashboardScreen({ onBack }: DashboardScreenProps) {
  const totalClips = 156;
  const misinformationPrevented = 34;
  const accuracyRate = 92;
  const currentStreak = 12;

  const getStatusConfig = (authenticity: number) => {
    if (authenticity >= 80) return {
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    };
    if (authenticity >= 60) return {
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30'
    };
    return {
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30'
    };
  };

  return (
    <div className="min-h-screen bg-background p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
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
                Your Dashboard
              </h1>
              <p className="text-lg text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Track your verification activity and impact
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-border/50 bg-card/50 hover:bg-card text-foreground glow-primary transition-all duration-300"
            >
              <Download size={16} className="mr-2" />
              Export Data
            </Button>
          </div>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 glow-primary">
                <Shield className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {totalClips}
              </div>
              <div className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Clips Verified
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="text-red-400" size={24} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {misinformationPrevented}
              </div>
              <div className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Misinformation Caught
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="text-green-400" size={24} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {accuracyRate}%
              </div>
              <div className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Accuracy Rate
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-2 border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="text-amber-400" size={24} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {currentStreak}
              </div>
              <div className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Day Streak
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Activity & Impact Message */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  <TrendingUp size={20} className="text-primary" />
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyStats.map((day, index) => (
                    <motion.div 
                      key={day.day}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 text-sm text-muted-foreground font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                        {day.day}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                            Clips: {day.clips}
                          </span>
                          <span className="text-red-400 font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                            Fake: {day.misinformation}
                          </span>
                        </div>
                        <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((day.clips / 10) * 100, 100)}%` }}
                            transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                            className="h-full gradient-primary rounded-full glow-primary"
                          />
                          {day.misinformation > 0 && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((day.misinformation / 10) * 100, 100)}%` }}
                              transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                              className="absolute top-0 h-full bg-red-500/80 rounded-full"
                              style={{ width: `${Math.min((day.misinformation / day.clips) * 100, 100)}%` }}
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Impact Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 card-glow h-full">
              <CardHeader>
                <CardTitle className="text-primary text-xl flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  <Sparkles size={20} />
                  Your Impact This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    15
                  </div>
                  <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                    Potential misinformation shares prevented
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="text-muted-foreground">Week Progress</span>
                    <span className="text-foreground font-medium">12/15 days active</span>
                  </div>
                  <div className="relative">
                    <Progress value={80} className="h-3 bg-muted/30" />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      transition={{ delay: 1, duration: 1.5 }}
                      className="absolute inset-0 h-3 gradient-primary rounded-full glow-primary"
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>

                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                    🎉 You're on track to be a <span className="text-primary font-semibold">Truth Champion</span> this month!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow h-full">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  <Award size={20} className="text-secondary" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div 
                        key={achievement.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          achievement.earned 
                            ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20' 
                            : 'bg-muted/10 border border-muted/20 opacity-60'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          achievement.earned 
                            ? 'gradient-primary glow-primary' 
                            : 'bg-muted/30'
                        }`}>
                          <Icon 
                            size={18} 
                            className={achievement.earned ? 'text-white' : 'text-muted-foreground'} 
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                            {achievement.name}
                          </p>
                          {achievement.earned && (
                            <p className="text-xs text-primary" style={{ fontFamily: 'var(--font-body)' }}>
                              Just earned!
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Analyses */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-3 text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  <Clock size={20} className="text-secondary" />
                  Recent Analyses
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-border/50 bg-card/50 hover:bg-card text-foreground glow-secondary transition-all duration-300"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnalyses.map((analysis, index) => {
                  const statusConfig = getStatusConfig(analysis.authenticity);
                  return (
                    <motion.div
                      key={analysis.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                      className="flex items-center justify-between p-4 border border-border/30 rounded-xl hover:bg-card/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex-1 flex items-center gap-4">
                        <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center glow-primary">
                          <Play size={16} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-medium text-foreground truncate max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                              {analysis.source.length > 50 
                                ? analysis.source.substring(0, 50) + '...' 
                                : analysis.source}
                            </p>
                            <Badge className="bg-muted/20 text-muted-foreground border border-muted/30 text-xs">
                              {analysis.platform}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color} border text-xs font-medium`}>
                              {analysis.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1" style={{ fontFamily: 'var(--font-body)' }}>
                              <Calendar size={10} />
                              {analysis.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-foreground text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                            {analysis.authenticity}%
                          </div>
                          <div className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                            Authentic
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="p-2 hover:bg-card/50">
                            <ExternalLink size={14} />
                          </Button>
                          {analysis.saved && (
                            <Button variant="ghost" size="sm" className="p-2 hover:bg-card/50">
                              <Download size={14} />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="p-2 hover:bg-card/50 text-red-400 hover:text-red-300">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
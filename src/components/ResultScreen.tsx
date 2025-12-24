import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Clock,
  Share,
  Bookmark,
  Play,
  XCircle,
  Sparkles
} from 'lucide-react';

interface ResultScreenProps {
  source: string;
  onBack: () => void;
  onNewAnalysis: () => void;
}

export function ResultScreen({ source, onBack, onNewAnalysis }: ResultScreenProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  // Mock analysis results
  const result = {
    authenticity: 75,
    status: 'Context Missing',
    confidence: 92,
    findings: [
      'Video appears to be authentic with no signs of deepfake manipulation',
      'Content was extracted from a longer video',
      'Missing context changes the intended meaning',
      'Original source found and verified'
    ],
    originalSource: {
      title: 'Full Interview: Tech CEO Discusses Company Culture',
      duration: '1:24:30',
      platform: 'YouTube',
      date: '2024-08-15'
    },
    clippedFrom: {
      start: '00:45:12',
      end: '00:45:44',
      missingBefore: '2 minutes of context',
      missingAfter: '45 minutes of context'
    }
  };

  const getStatusConfig = (authenticity: number) => {
    if (authenticity >= 80) return {
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      icon: CheckCircle,
      glowClass: 'glow-green'
    };
    if (authenticity >= 60) return {
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10', 
      borderColor: 'border-amber-500/30',
      icon: AlertTriangle,
      glowClass: 'glow-amber'
    };
    return {
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30', 
      icon: XCircle,
      glowClass: 'glow-red'
    };
  };

  const statusConfig = getStatusConfig(result.authenticity);
  const StatusIcon = statusConfig.icon;

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
              <h1 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Analysis Results
              </h1>
              <p className="text-muted-foreground max-w-2xl truncate" style={{ fontFamily: 'var(--font-body)' }}>
                {source.length > 80 ? source.substring(0, 80) + '...' : source}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-border/50 bg-card/50 hover:bg-card text-foreground glow-primary transition-all duration-300"
            >
              <Share size={16} className="mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-border/50 bg-card/50 hover:bg-card text-foreground glow-secondary transition-all duration-300"
            >
              <Bookmark size={16} className="mr-2" />
              Save
            </Button>
          </div>
        </motion.div>

        {/* Authenticity Score */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className={`relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 ${statusConfig.glowClass}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="flex items-center gap-4 text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                <StatusIcon className={`w-8 h-8 ${statusConfig.color}`} />
                Authenticity Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <div>
                    <div className="text-5xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      {result.authenticity}%
                    </div>
                    <Badge className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color} border text-base px-4 py-2 font-medium`}>
                      {result.status}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="font-semibold">Confidence:</span> {result.confidence}% • Analysis completed in 7.2 seconds
                  </div>
                </div>
                
                {/* Circular Progress */}
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      className="text-muted/30"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="35"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 35}`}
                      strokeDashoffset={`${2 * Math.PI * 35 * (1 - result.authenticity / 100)}`}
                      className={statusConfig.color.replace('text-', 'text-')}
                      initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 35 * (1 - result.authenticity / 100) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                      {result.authenticity}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Video Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                <Eye size={24} className="text-primary" />
                Context Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-80 bg-gradient-to-r from-muted/30 to-accent/30 rounded-2xl overflow-hidden border border-border/50">
                {/* Mock video preview with slider */}
                <div className="flex h-full">
                  <div 
                    className="bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center relative transition-all duration-300"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 glow-primary">
                        <Play className="text-white" size={24} />
                      </div>
                      <p className="font-semibold text-foreground text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                        Edited Clip
                      </p>
                      <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                        32 seconds
                      </p>
                    </div>
                  </div>
                  <div 
                    className="bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center transition-all duration-300"
                    style={{ width: `${100 - sliderPosition}%` }}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 gradient-card rounded-2xl border-2 border-secondary/30 flex items-center justify-center mx-auto mb-4 glow-secondary">
                        <Play className="text-foreground" size={24} />
                      </div>
                      <p className="font-semibold text-foreground text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                        Full Context
                      </p>
                      <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                        1:24:30
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Slider handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white/80 shadow-2xl cursor-col-resize z-10 transition-all duration-200 hover:w-2"
                  style={{ left: `${sliderPosition}%` }}
                  onMouseDown={(e) => {
                    const handleMouseMove = (e: MouseEvent) => {
                      const rect = e.currentTarget?.parentElement?.getBoundingClientRect();
                      if (rect) {
                        const x = e.clientX - rect.left;
                        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                        setSliderPosition(percentage);
                      }
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-primary glow-primary" />
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                  <span>Clipped from {result.clippedFrom.start} - {result.clippedFrom.end}</span>
                  <span>Missing: {result.clippedFrom.missingBefore} + {result.clippedFrom.missingAfter}</span>
                </div>
                <Button 
                  className="w-full h-12 gradient-primary hover:scale-105 glow-primary transition-all duration-300 border-0 rounded-xl font-semibold"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <ExternalLink size={18} className="mr-2" />
                  Watch Full Context
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analysis Details */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Findings */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow h-full">
              <CardHeader>
                <CardTitle className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  Key Findings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.findings.map((finding, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 p-3 rounded-xl bg-background/30 border border-border/30"
                  >
                    <div className="w-3 h-3 gradient-primary rounded-full mt-2 glow-primary flex-shrink-0" />
                    <p className="text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                      {finding}
                    </p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Source Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 card-glow h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  <Clock size={20} className="text-secondary" />
                  Original Source
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="font-semibold text-foreground text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {result.originalSource.title}
                  </p>
                  <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                    {result.originalSource.platform} • {result.originalSource.date}
                  </p>
                </div>
                <Separator className="bg-border/50" />
                <div className="space-y-3">
                  <div className="flex justify-between" style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-foreground font-medium">{result.originalSource.duration}</span>
                  </div>
                  <div className="flex justify-between" style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="text-muted-foreground">Clip represents:</span>
                    <span className="text-foreground font-medium">0.4% of full video</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-2 border-secondary/50 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 rounded-xl font-semibold"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <ExternalLink size={18} className="mr-2" />
                  View Original Source
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <Button 
            onClick={onNewAnalysis} 
            size="lg"
            className="text-lg px-10 py-6 gradient-primary hover:scale-105 glow-primary transition-all duration-300 border-0 rounded-xl font-semibold"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <Sparkles className="mr-2" size={20} />
            Analyze Another Clip
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-10 py-6 border-2 border-border/50 bg-card/50 hover:bg-card text-foreground glow-secondary transition-all duration-300 rounded-xl font-semibold"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Download Report
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
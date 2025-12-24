import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';
import { Eye, Search, Shield, Zap, CheckCircle, Sparkles } from 'lucide-react';

interface ProcessingScreenProps {
  source: string;
  onComplete: () => void;
}

const processingSteps = [
  { id: 'upload', label: 'Processing upload', icon: Zap, duration: 1200 },
  { id: 'deepfake', label: 'Analyzing authenticity', icon: Shield, duration: 2200 },
  { id: 'context', label: 'Searching for full context', icon: Search, duration: 2800 },
  { id: 'verify', label: 'Cross-referencing sources', icon: Eye, duration: 1800 },
  { id: 'complete', label: 'Analysis complete', icon: CheckCircle, duration: 600 }
];

export function ProcessingScreen({ source, onComplete }: ProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentDuration = 0;
    const totalDuration = processingSteps.reduce((sum, step) => sum + step.duration, 0);

    const processSteps = async () => {
      for (let i = 0; i < processingSteps.length; i++) {
        setCurrentStep(i);
        const stepDuration = processingSteps[i].duration;
        
        // Animate progress for this step
        const startProgress = (currentDuration / totalDuration) * 100;
        const endProgress = ((currentDuration + stepDuration) / totalDuration) * 100;
        
        const animateProgress = () => {
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progressRatio = Math.min(elapsed / stepDuration, 1);
            const currentProgress = startProgress + (endProgress - startProgress) * progressRatio;
            setProgress(currentProgress);
            
            if (progressRatio < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        };
        
        animateProgress();
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        currentDuration += stepDuration;
      }
      
      setTimeout(onComplete, 800);
    };

    processSteps();
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-2xl w-full space-y-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <div className="relative mx-auto w-24 h-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-full h-full gradient-primary rounded-3xl flex items-center justify-center glow-primary"
            >
              <Sparkles className="text-white" size={32} />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-primary/30 rounded-3xl"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              AI Analysis in Progress
            </h1>
            <div className="max-w-lg mx-auto">
              <p className="text-lg text-muted-foreground mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                Analyzing:
              </p>
              <p className="text-base text-foreground font-medium truncate bg-card/30 px-4 py-2 rounded-xl border border-border/50" style={{ fontFamily: 'var(--font-body)' }}>
                {source.length > 60 ? source.substring(0, 60) + '...' : source}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4"
        >
          <div className="relative">
            <Progress 
              value={progress} 
              className="h-3 bg-muted/30 border border-border/50 rounded-xl overflow-hidden"
            />
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background: `linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.3) ${progress - 10}%, rgba(16, 185, 129, 0.6) ${progress}%, transparent ${progress + 10}%)`
              }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
              Processing...
            </span>
            <span className="text-foreground font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>

        {/* Processing Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 card-glow">
            <CardContent className="p-8">
              <div className="space-y-6">
                {processingSteps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  const Icon = step.icon;
                  
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0.4, x: -20 }}
                      animate={{ 
                        opacity: isActive ? 1 : isCompleted ? 0.8 : 0.4,
                        x: isActive ? 0 : isCompleted ? 0 : -20,
                        scale: isActive ? 1.02 : 1
                      }}
                      transition={{ duration: 0.5 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
                        isActive ? 'bg-primary/10 border-2 border-primary/30 glow-primary' : 
                        isCompleted ? 'bg-card/50 border border-border/30' : 
                        'border border-transparent'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isCompleted ? 'bg-green-500 text-white glow-secondary' :
                        isActive ? 'gradient-primary text-white glow-primary' : 
                        'bg-muted/50 text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle size={20} />
                          </motion.div>
                        ) : (
                          <motion.div
                            animate={isActive ? { rotate: 360 } : {}}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Icon size={20} />
                          </motion.div>
                        )}
                      </div>
                      
                      <span className={`font-medium text-base transition-colors duration-500 ${
                        isActive ? 'text-foreground' : 
                        isCompleted ? 'text-muted-foreground' : 
                        'text-muted-foreground/60'
                      }`} style={{ fontFamily: 'var(--font-body)' }}>
                        {step.label}
                      </span>
                      
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="ml-auto flex items-center gap-2"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse glow-primary" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150 glow-primary" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300 glow-primary" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-border/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center glow-primary">
                  <Sparkles className="text-white" size={16} />
                </div>
                <p className="text-sm text-muted-foreground max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="text-foreground font-semibold">Did you know?</span> Our AI can detect subtle inconsistencies in lighting, shadows, and facial expressions that human eyes often miss.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
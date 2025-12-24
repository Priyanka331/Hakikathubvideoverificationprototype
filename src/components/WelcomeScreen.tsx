import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Play, Scissors, Eye, Shield, Search, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        {/* Animated Logo/Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative mb-12"
        >
          <div className="flex items-center justify-center gap-12 mb-8">
            {/* Original Clip */}
            <motion.div
              initial={{ x: 0, scale: 0.8 }}
              animate={{ x: -30, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="relative"
            >
              <div className="w-32 h-20 bg-gradient-to-br from-muted to-accent rounded-2xl flex items-center justify-center card-glow">
                <Play className="text-foreground" size={28} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-muted-foreground"
              >
                Edited Clip
              </motion.div>
            </motion.div>

            {/* Scissors Animation */}
            <motion.div
              initial={{ rotate: 0, scale: 0, opacity: 0 }}
              animate={{ rotate: 45, scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="relative"
            >
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center glow-primary">
                <Scissors className="text-white" size={28} />
              </div>
            </motion.div>

            {/* Full Context */}
            <motion.div
              initial={{ x: 0, scale: 0.8 }}
              animate={{ x: 30, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="relative"
            >
              <div className="w-40 h-20 gradient-card rounded-2xl flex items-center justify-center border-2 border-primary/30 glow-secondary">
                <Eye className="text-foreground" size={28} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-muted-foreground"
              >
                Full Context
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-4"
        >
          <h1 className="text-7xl font-bold text-gradient mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            HakikatHub
          </h1>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full glow-primary"></div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="space-y-4"
        >
          <p className="text-2xl text-foreground font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
            Don't just see the clip. See the truth.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Verify video authenticity and discover missing context with AI-powered analysis
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <Button 
            onClick={onStart}
            size="lg"
            className="text-lg px-12 py-8 gradient-primary hover:scale-105 glow-primary shadow-2xl transition-all duration-300 border-0 rounded-2xl font-semibold"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Start Verifying
          </Button>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 card-glow"
          >
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto glow-primary">
              <Shield size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>Deepfake Detection</h3>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>AI-powered analysis detects sophisticated manipulations</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 card-glow"
          >
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto glow-primary">
              <Search size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>Context Analysis</h3>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>Discover missing context that changes meaning</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 card-glow"
          >
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto glow-primary">
              <Zap size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>Source Verification</h3>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>Trace content back to original sources</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
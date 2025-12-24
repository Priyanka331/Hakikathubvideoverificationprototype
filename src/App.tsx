import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { UploadScreen } from './components/UploadScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultScreen } from './components/ResultScreen';
import { GameScreen } from './components/GameScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { Button } from './components/ui/button';
import { Trophy, User, Home } from 'lucide-react';

type Screen = 'welcome' | 'upload' | 'processing' | 'result' | 'game' | 'dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [analysisSource, setAnalysisSource] = useState<string>('');

  const handleGameNavigation = () => {
    console.log('Play button clicked - navigating to game');
    setCurrentScreen('game');
  };

  const handleDashboardNavigation = () => {
    console.log('Profile button clicked - navigating to dashboard');
    setCurrentScreen('dashboard');
  };

  const handleStart = () => {
    setCurrentScreen('upload');
  };

  const handleUpload = (source: string, type: 'link' | 'file') => {
    setAnalysisSource(source);
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentScreen('result');
  };

  const handleNewAnalysis = () => {
    setCurrentScreen('upload');
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'upload':
        setCurrentScreen('welcome');
        break;
      case 'game':
      case 'dashboard':
        setCurrentScreen('welcome');
        break;
      default:
        setCurrentScreen('welcome');
    }
  };

  // Navigation bar for certain screens
  const showNavigation = ['welcome'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-background dark">
      {/* Debug indicator */}
      <div className="absolute top-6 left-6 z-50 bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm font-mono">
        Current: {currentScreen}
      </div>
      
      {/* Navigation */}
      {showNavigation && (
        <nav className="absolute top-6 right-6 z-50">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGameNavigation}
              className="bg-card/90 backdrop-blur-sm border-border/50 text-foreground hover:bg-card glow-primary transition-all duration-300 cursor-pointer"
            >
              <Trophy size={16} className="mr-2" />
              Play
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDashboardNavigation}
              className="bg-card/90 backdrop-blur-sm border-border/50 text-foreground hover:bg-card glow-secondary transition-all duration-300 cursor-pointer"
            >
              <User size={16} className="mr-2" />
              Profile
            </Button>
          </div>
        </nav>
      )}

      {/* Main Content */}
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === 'upload' && (
        <UploadScreen onBack={handleBack} onUpload={handleUpload} />
      )}
      {currentScreen === 'processing' && (
        <ProcessingScreen source={analysisSource} onComplete={handleProcessingComplete} />
      )}
      {currentScreen === 'result' && (
        <ResultScreen 
          source={analysisSource} 
          onBack={handleBack} 
          onNewAnalysis={handleNewAnalysis}
        />
      )}
      {currentScreen === 'game' && <GameScreen onBack={handleBack} />}
      {currentScreen === 'dashboard' && <DashboardScreen onBack={handleBack} />}
    </div>
  );
}
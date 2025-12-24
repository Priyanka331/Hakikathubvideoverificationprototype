import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Upload, Link, ArrowLeft, Sparkles } from 'lucide-react';

interface UploadScreenProps {
  onBack: () => void;
  onUpload: (source: string, type: 'link' | 'file') => void;
}

export function UploadScreen({ onBack, onUpload }: UploadScreenProps) {
  const [url, setUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUpload(url, 'link');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    if (videoFile) {
      onUpload(videoFile.name, 'file');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file.name, 'file');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-secondary/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-12"
        >
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
              Upload or Paste Clip
            </h1>
            <p className="text-lg text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
              Drop any clip, we'll check if it's real or out of context
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Paste Link Option */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm card-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center glow-primary">
                    <Link className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      Paste Video Link
                    </h3>
                    <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                      YouTube, Instagram, TikTok, Twitter, or any video URL
                    </p>
                  </div>
                </div>
                
                <form onSubmit={handleLinkSubmit} className="space-y-6">
                  <div className="relative">
                    <Input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="h-14 px-6 text-base bg-background/50 border-2 border-border/50 focus:border-primary/50 rounded-xl transition-all duration-300 placeholder:text-muted-foreground/60"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      {url && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-primary rounded-full animate-pulse glow-primary"
                        />
                      )}
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={!url.trim()}
                    className="w-full h-14 text-base font-semibold gradient-primary hover:scale-105 glow-primary transition-all duration-300 border-0 rounded-xl disabled:opacity-50 disabled:hover:scale-100"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <Sparkles className="mr-2" size={20} />
                    Analyze Link
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30" />
            </div>
            <div className="relative flex justify-center text-base">
              <span className="bg-background px-6 py-2 text-muted-foreground rounded-xl border border-border/50" style={{ fontFamily: 'var(--font-body)' }}>
                or
              </span>
            </div>
          </div>

          {/* Upload File Option */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Card 
              className={`relative overflow-hidden border-2 border-dashed transition-all duration-300 cursor-pointer ${
                isDragging 
                  ? 'border-primary bg-primary/10 scale-105 glow-primary' 
                  : 'border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <CardContent className="p-12 text-center relative z-10">
                <motion.div
                  animate={{
                    scale: isDragging ? 1.1 : 1,
                    rotate: isDragging ? 5 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="mb-8"
                >
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto transition-all duration-300 ${
                    isDragging ? 'gradient-primary glow-primary' : 'bg-muted/50'
                  }`}>
                    <Upload className={`${isDragging ? 'text-white' : 'text-foreground'}`} size={32} />
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-semibold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Upload Video File
                </h3>
                <p className="text-muted-foreground mb-8 text-base max-w-md mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
                  Drag and drop a video file here, or click to browse your files
                </p>
                
                <div className="space-y-4">
                  <label htmlFor="file-upload">
                    <Button 
                      variant="outline" 
                      className="cursor-pointer h-12 px-8 text-base font-semibold border-2 border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Choose File
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                  
                  <p className="text-xs text-muted-foreground/80" style={{ fontFamily: 'var(--font-body)' }}>
                    Supports MP4, MOV, AVI, WebM up to 100MB
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Popular Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              Supported platforms:
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {['YouTube', 'TikTok', 'Instagram', 'Twitter', 'Facebook'].map((platform, index) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  className="px-4 py-2 bg-card/50 border border-border/50 rounded-xl text-sm text-muted-foreground font-medium hover:border-primary/30 hover:text-foreground transition-all duration-300"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {platform}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
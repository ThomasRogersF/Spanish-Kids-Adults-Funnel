import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecommendationCard } from './RecommendationCard';
import { recommendationContent, RecommendationState } from '@/lib/recommendationEngine';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { VideoPlayer } from '@/components/ui/video-player';
import { Users, GraduationCap, Gamepad2, Star, ArrowRight } from 'lucide-react';

interface RecommendationResultsProps {
  recommendationState: RecommendationState;
  answers: any[];
  onSelectTrack: (track: 'group' | 'private' | 'kids') => void;
}

export const RecommendationResults = ({ 
  recommendationState, 
  answers, 
  onSelectTrack 
}: RecommendationResultsProps) => {
  const [isKidsOverride, setIsKidsOverride] = useState(recommendationState.isKidsOverride);
  const [selectedTrack, setSelectedTrack] = useState<'group' | 'private' | 'kids' | null>(null);
  
  const { recommendedTrack, groupScore, privateScore } = recommendationState;
  const maxScore = Math.max(groupScore, privateScore);
  const groupPercentage = maxScore > 0 ? (groupScore / maxScore) * 100 : 50;
  const privatePercentage = maxScore > 0 ? (privateScore / maxScore) * 100 : 50;
  
  const getScoreColor = (score: number, isMax: boolean) => {
    if (isMax) return 'bg-green-500';
    if (score > 0) return 'bg-blue-500';
    return 'bg-gray-300';
  };
  
  const handleKidsToggle = (checked: boolean) => {
    setIsKidsOverride(checked);
    if (checked) {
      setSelectedTrack('kids');
    } else {
      setSelectedTrack(recommendedTrack);
    }
  };
  
  const handleTrackSelect = (track: 'group' | 'private' | 'kids') => {
    setSelectedTrack(track);
    onSelectTrack(track);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Personalized Spanish Learning Path
        </h1>
        <p className="text-gray-600">
          Based on your answers, we've found the perfect learning approach for you
        </p>
      </motion.div>
      
      {/* Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6"
      >
        <VideoPlayer
          src="/videos/Spanish-Private-Tutoring.mp4"
          autoplay={true}
          showControls={true}
          ambientMode={false}
          rounded={true}
          className="w-full max-w-3xl mx-auto shadow-2xl"
        />
      </motion.div>
      
      {/* Kids Override Toggle */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Gamepad2 className="w-5 h-5 text-purple-600" />
                <div>
                  <Label htmlFor="kids-toggle" className="font-medium text-gray-900">
                    Learning for a child (4-17 years)?
                  </Label>
                  <p className="text-sm text-gray-600">
                    Get age-appropriate content and activities
                  </p>
                </div>
              </div>
              <Switch
                id="kids-toggle"
                checked={isKidsOverride}
                onCheckedChange={handleKidsToggle}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Score Breakdown */}
      {!isKidsOverride && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                How We Made This Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Group Classes</span>
                    <Badge variant="outline">{groupScore} points</Badge>
                  </div>
                  <span className="text-sm text-gray-600">{groupPercentage.toFixed(0)}%</span>
                </div>
                <Progress 
                  value={groupPercentage} 
                  className="h-2"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">Private Tutoring</span>
                    <Badge variant="outline">{privateScore} points</Badge>
                  </div>
                  <span className="text-sm text-gray-600">{privatePercentage.toFixed(0)}%</span>
                </div>
                <Progress 
                  value={privatePercentage} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Recommendation Cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <AnimatePresence mode="wait">
          {/* Primary Recommendation */}
          <motion.div
            key={isKidsOverride ? 'kids' : recommendedTrack}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2"
          >
            <RecommendationCard
              content={recommendationContent[isKidsOverride ? 'kids' : recommendedTrack]}
              type={isKidsOverride ? 'kids' : recommendedTrack}
              isPrimary={true}
              onSelect={() => handleTrackSelect(isKidsOverride ? 'kids' : recommendedTrack)}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Alternative Options */}
        {!isKidsOverride && (
          <>
            {recommendedTrack !== 'group' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <RecommendationCard
                  content={recommendationContent.group}
                  type="group"
                  onSelect={() => handleTrackSelect('group')}
                />
              </motion.div>
            )}
            
            {recommendedTrack !== 'private' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <RecommendationCard
                  content={recommendationContent.private}
                  type="private"
                  onSelect={() => handleTrackSelect('private')}
                />
              </motion.div>
            )}
          </>
        )}
      </div>
      
      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 text-sm text-gray-600">
          <span>Ready to start your Spanish journey?</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.div>
    </div>
  );
};
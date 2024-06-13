import React, { CSSProperties } from 'react';

interface SpriteAnimationProps {
  animationDuration: number;
  frameCount: number;
  spriteSheetUrl: string;
  rotation: number;
  isFlipped: boolean; // Add the isFlipped prop
}

const ProjectileAnimation: React.FC<SpriteAnimationProps> = ({
  animationDuration,
  frameCount,
  spriteSheetUrl,
  rotation,
  isFlipped, // Add the isFlipped prop
}) => {
  const spriteAnimationStyle: CSSProperties & {
    ['--sprite-sheet-url']: string;
    transform: string;
  } = {
    animationDuration: `${animationDuration}s`,
    animationTimingFunction: `steps(${frameCount})`,
    animationIterationCount: 'infinite',
    animationName: 'projectile-animation',
    '--sprite-sheet-url': `url(${spriteSheetUrl})`,
    transform: `${isFlipped ? 'scaleX(-1)' : ''} rotate(${rotation}deg)`, // Apply the scaleX(-1) transform conditionally
  };

  return <div className="projectile-animation" style={spriteAnimationStyle} />;
};

export default ProjectileAnimation;
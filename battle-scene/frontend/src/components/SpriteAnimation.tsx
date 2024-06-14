import React, { CSSProperties } from 'react';

interface SpriteAnimationProps {
  animationDuration: number;
  frameCount: number;
  spriteSheetUrl: string;
}

const SpriteAnimation: React.FC<SpriteAnimationProps> = ({
  animationDuration,
  frameCount,
  spriteSheetUrl,
}) => {
  const spriteAnimationStyle: CSSProperties & { ['--sprite-sheet-url']: string } = {
    animationDuration: `${animationDuration}s`,
    animationTimingFunction: `steps(${frameCount})`,
    animationIterationCount: 'infinite',
    animationName: 'sprite-animation',
    '--sprite-sheet-url': `url(${spriteSheetUrl})`,
  };

  return <div className="sprite-animation" style={spriteAnimationStyle} />;
};

export default SpriteAnimation;
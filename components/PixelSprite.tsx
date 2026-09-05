import type { CSSProperties } from 'react';
import { PIXEL_SPRITES, spriteSize, spriteToRects } from '@/lib/pixelSprites';
import type { PixelSpriteKey } from '@/lib/pixelSprites';

interface PixelSpriteProps {
  sprite: PixelSpriteKey;
  /** Logical pixel → screen pixel multiplier. */
  scale?: number;
  /** Mirror horizontally (e.g. enemies walking left). */
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

/**
 * Renders a pixel-art sprite as crisp, resolution-independent SVG.
 * One <rect> per horizontal run of color keeps the DOM small.
 */
export default function PixelSprite({
  sprite,
  scale = 4,
  flip = false,
  className,
  style,
  title,
}: PixelSpriteProps) {
  const data = PIXEL_SPRITES[sprite];
  const { width, height } = spriteSize(data.rows);
  const rects = spriteToRects(data.rows);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      role="img"
      aria-label={title ?? data.name}
      className={className}
      style={{
        imageRendering: 'pixelated',
        display: 'block',
        transform: flip ? 'scaleX(-1)' : undefined,
        ...style,
      }}
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}

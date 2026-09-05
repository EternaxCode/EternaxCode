// ─── Pixel-art sprites for 빵어전 (Bbang-eonjeon) ───
//
// Each sprite is a grid of palette keys. `.` is transparent.
// Sprites are rendered as crisp SVG rects by <PixelSprite />.

export const PIXEL_PALETTE = {
  k: '#1b1226', // outline
  c: '#d4813f', // crust
  d: '#8f4c1f', // dark crust
  b: '#fff0c8', // bread cream
  y: '#f6c743', // butter yellow
  o: '#c9931f', // dark yellow
  w: '#ffffff', // white
  r: '#e5484d', // red
  p: '#f6a5a5', // pink cheeks
  g: '#7ee787', // green
  m: '#8b5cf6', // mold purple
  M: '#4c2a85', // mold dark
  s: '#c7d2e0', // steel
  f: '#f8d3a7', // skin
  a: '#b5532a', // ant rust-brown (readable on the night sky)
} as const;

export type PixelPaletteKey = keyof typeof PIXEL_PALETTE;

export interface PixelSpriteData {
  /** Human-readable name used for accessibility labels. */
  name: string;
  rows: string[];
}

export const PIXEL_SPRITES = {
  /** 식빵 기사 — Toast Knight (16×16) */
  toastKnight: {
    name: 'Toast Knight',
    rows: [
      '..kkkk..kkkk..ws',
      '.kccccckccccckws',
      '.kccccccccccckws',
      '.kcbbbbbbbbbckws',
      '.kcbbbbbbbbbckws',
      '.kcbkbbbbbkbckws',
      '.kcbkbbbbbkbckyy',
      '.kcbbbbbbbbbckd.',
      '.kcbpbbbbbpbckd.',
      '.kcbbbkkkbbbck..',
      '.kcbbbbbbbbbck..',
      '.kccccccccccck..',
      '.kkkkkkkkkkkkk..',
      '...dd....dd.....',
      '...kk....kk.....',
      '................',
    ],
  },

  /** 바게트 창병 — Baguette Lancer (16×16) */
  baguetteLancer: {
    name: 'Baguette Lancer',
    rows: [
      '......kkkk......',
      '.....kccccck....',
      '....kccdccck....',
      '....kcdcccck....',
      '....kbbbbbbk....',
      '....kbkbbkbk....',
      '....kbkbbkbk....',
      '....kbbkkbbk....',
      '....kcccccck....',
      '....kcccdcck....',
      '....kccdccck....',
      '....kcccccck....',
      '.....kccccck....',
      '......kkkk......',
      '.......dd.......',
      '.......kk.......',
    ],
  },

  /** 멜론빵 수호자 — Melon Bread Guardian (16×16) */
  melonGuardian: {
    name: 'Melon Bread Guardian',
    rows: [
      '....kkkkkkkk....',
      '...kccccccccck..',
      '..kcccccccccck..',
      '.kccdcccdcccdck.',
      '.kccdcccdcccdck.',
      '.kddddddddddddk.',
      '.kcccccccccccck.',
      '.kccckcccckccck.',
      '.kccckcccckccck.',
      '.kccpccccccpcck.',
      '.kccccckkccccck.',
      '..kcccccccccck..',
      '...kcccccccck...',
      '....kkkkkkkk....',
      '................',
      '................',
    ],
  },

  /** 곰팡이 — Mold Blob enemy (16×16) */
  moldBlob: {
    name: 'Mold Blob',
    rows: [
      '......kk.....g..',
      '.....kmmk..kk...',
      '....kmmmmkkmmk.g',
      '...kmmmmmmmmmmk.',
      '..kmmmmmmmmmmmk.',
      '..kmmwkmmmmwkmk.',
      '.kmmmwkmmmmwkmmk',
      '.kmmmmmmmmmmmmmk',
      '.kmmmkkkkkkkmmmk',
      '.kmmmkwkwkwkmmmk',
      '.kMmmmmmmmmmmmMk',
      '..kMMmmmmmmmMMk.',
      '..kMMMMMMMMMMMk.',
      '...kkMMkkkMMkk..',
      '.....kk...kk....',
      '................',
    ],
  },

  /** 개미 — Crumb Ant enemy (16×16) */
  crumbAnt: {
    name: 'Crumb Ant',
    rows: [
      '................',
      '................',
      '............a.a.',
      '.............a..',
      '....aaa....aaaa.',
      '...aaaaa..aakaa.',
      '..aaaaaaaaaaaaa.',
      '..aaaaaaaaaaaa..',
      '...aaaaa.aaaa...',
      '..a.a.a.a.a.a...',
      '.a..a..a..a..a..',
      '................',
      '................',
      '................',
      '................',
      '................',
    ],
  },

  /** 제빵사 — Baker NPC (16×16) */
  baker: {
    name: 'Baker',
    rows: [
      '....kkkkkkkk....',
      '...kwwwwwwwwk...',
      '..kwwwwwwwwwwk..',
      '..kwwwwwwwwwwk..',
      '...kkkkkkkkkk...',
      '...kffffffffk...',
      '...kfkffffkfk...',
      '...kffffffffk...',
      '...kfpffffpfk...',
      '...kfffkkfffk...',
      '....kkkkkkkk....',
      '..kkwwwwwwwwkk..',
      '.kykwwwwwwwwkyk.',
      '.kykwwwwwwwwkyk.',
      '..kkwwwwwwwwkk..',
      '...kkkkkkkkkk...',
    ],
  },

  /** 빵집 — Bakery base (24×18) */
  bakery: {
    name: 'Bakery',
    rows: [
      '..........kk.....kkkk...',
      '..........krrk...kddk...',
      '.........krrrrk..kddk...',
      '........krrrrrrk.kddk...',
      '.......krrrrrrrrkkddk...',
      '......krrrrrrrrrrkddk...',
      '.....krrrrrrrrrrrrk.....',
      '....krrrrrrrrrrrrrrk....',
      '...krrrrrrrrrrrrrrrrk...',
      '..kkkkkkkkkkkkkkkkkkkk..',
      '..kbbbbbbbbbbbbbbbbbbk..',
      '..kbbkyykbbbbbbkyykbbk..',
      '..kbbkyykbbbbbbkyykbbk..',
      '..kbbkkkkbbbbbbkkkkbbk..',
      '..kbbbbbbbkddkbbbbbbbk..',
      '..kbbbbbbbkddkbbbbbbbk..',
      '..kbbbbbbbkddkbbbbbbbk..',
      '..kkkkkkkkkkkkkkkkkkkk..',
    ],
  },

  /** 하트 — Heart (8×8) */
  heart: {
    name: 'Heart',
    rows: [
      '.kk..kk.',
      'krrkkrrk',
      'krwrrrrk',
      'krrrrrrk',
      '.krrrrk.',
      '..krrk..',
      '...kk...',
      '........',
    ],
  },

  /** 코인 — Coin (8×8) */
  coin: {
    name: 'Coin',
    rows: [
      '..kkkk..',
      '.kyyyyk.',
      'kyykkyyk',
      'kykyyyok',
      'kykyyyok',
      'kyykkyok',
      '.kyyook.',
      '..kkkk..',
    ],
  },
} as const satisfies Record<string, PixelSpriteData>;

export type PixelSpriteKey = keyof typeof PIXEL_SPRITES;

export interface PixelRect {
  x: number;
  y: number;
  w: number;
  fill: string;
}

/**
 * Converts a sprite grid into horizontal runs of same-colored pixels.
 * Merging runs keeps the SVG small (one <rect> per run instead of per pixel).
 */
export function spriteToRects(rows: readonly string[]): PixelRect[] {
  const rects: PixelRect[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x] as PixelPaletteKey | '.';
      if (ch === '.') {
        x += 1;
        continue;
      }
      let run = 1;
      while (x + run < row.length && row[x + run] === ch) run += 1;
      rects.push({ x, y, w: run, fill: PIXEL_PALETTE[ch] });
      x += run;
    }
  });
  return rects;
}

export function spriteSize(rows: readonly string[]): { width: number; height: number } {
  return { width: rows[0]?.length ?? 0, height: rows.length };
}

// ─── Pixel-art sprites for 빵어전 (Bbang-eojeon) ───
//
// Each sprite is a grid of palette keys. `.` is transparent.
// Sprites are rendered as crisp SVG rects by <PixelSprite />.
//
// The four bread defenders (뚜신, 크로와, 바게트 경, 도나) are converted 1:1 from
// the official character SVGs published on https://bbangeojeon.eternaxcode.com.
// The remaining sprites (bakery, baker, heart, coin) are drawn for this site.

export const PIXEL_PALETTE = {
  // Site sprites
  k: '#1b1226', // outline
  c: '#d4813f', // crust
  d: '#8f4c1f', // dark crust
  b: '#fff0c8', // bread cream
  y: '#f6c743', // butter yellow
  o: '#c9931f', // dark yellow
  w: '#ffffff', // white
  r: '#e5484d', // red
  p: '#f6a5a5', // pink cheeks
  f: '#f8d3a7', // skin
  // Official 빵어전 character colors (from the game's own sprite SVGs)
  F: '#3b2820', // outline brown
  E: '#f9ebc6', // bread cream
  H: '#d9975b', // crust
  I: '#ae6547', // dark crust
  G: '#261812', // eyes & mouth
  J: '#5f4133', // deep shadow
  B: '#f2a950', // ember orange
  C: '#e8823a', // ember core
  L: '#ffdda6', // ember highlight
  D: '#fff9ea', // near-white highlight
} as const;

export type PixelPaletteKey = keyof typeof PIXEL_PALETTE;

export interface PixelSpriteData {
  /** Human-readable name used for accessibility labels. */
  name: string;
  rows: string[];
}

export const PIXEL_SPRITES = {
  /** 뚜신 — the village's small ember (official, 28×27) */
  tussin: {
    name: '뚜신 (Tussin)',
    rows: [
      '.............BB.............',
      '............BCCB............',
      '...........BCLLCB...........',
      '..........BCLLLLCB..........',
      '..........BCLDDLCB..........',
      '...........BCLLCB...........',
      '............BCCB............',
      '.............BB.............',
      '..........FFFFFFFF..........',
      '........FFEEEEEEEEFF........',
      '......FFEEEEEEEEEEEEFF......',
      '.....FEEEEEEEEEEEEEEEEF.....',
      '....FEEEDEEEEEEEEEEEEEEF....',
      '...FEEEEEEEEEEEEEEEEEEEEF...',
      '..FEEEEEEEEEEEEEEEEEEEEEEF..',
      '.FEEEEEGEEEEEEEEGEEEEEEEEEF.',
      '.FEEEEEEEEEEEEEEEEEEEEEEEEF.',
      'FEEEEEEEEEEFFFFEEEEEEEEEEEEF',
      'FEEEEEEEEEFHHHHFEEEEEEEEEEEF',
      'FEEEEEEEEEEEEEEEEEEEEEEEEEEF',
      '.FEEEEEEEEEEEEEEEEEEEEEEEEF.',
      '..FEEEEEEEEEEEEEEEEEEEEEEF..',
      '...FEEEEEEEEEEEEEEEEEEEEF...',
      '....FHHHEEEEEEEEEEEEHHHF....',
      '......FFHHHHHHHHHHHHFF......',
      '........FFFFFFFFFFFF........',
      '.........FFFF..FFFF.........',
    ],
  },

  /** 크로와 — crispy crescent (official, 26×20) */
  croissant: {
    name: '크로와 (Croissant)',
    rows: [
      '...FF................FF...',
      '..FHHF..............FHHF..',
      '.FHHIHF............FHIHHF.',
      'FHHIHHF....FFFF....FHHIHHF',
      'FHHIHHF..FFHHHHFF..FHHIHHF',
      'FHHIHHFFFHHEEEEHHFFFHHIHHF',
      '.FHHIHHHHEEEEEEEEHHHHIHHF.',
      '.FHHHHEEDEEEEEEEEDEEHHHHF.',
      '..FHHEEEEEHHHHEEEEEHHHF...',
      '..FHHEEEFFHHHHFFEEEHHF....',
      '...FHHEFHHHGGHHHFEEHHF....',
      '...FHHEFHHHHHHHHFEEHHF....',
      '....FHHEFHHHHHHFEHHHF.....',
      '....FHHHEFHHHHFEHHHF......',
      '.....FHHHEFFFFEHHHF.......',
      '......FHHHHHHHHHHF........',
      '.......FFHIIIIHFF.........',
      '.........FFFFFF...........',
      '..........FF..FF..........',
      '..........FF..FF..........',
    ],
  },

  /** 바게트 경 — Sir Baguette (official, 18×17) */
  baguette: {
    name: '바게트 경 (Sir Baguette)',
    rows: [
      '..............FFF.',
      '............FFHIIF',
      '...........FEEEIIF',
      '..........FHIIIIIF',
      '.........FHHHHIIF.',
      '........FHHHHIIF..',
      '.......FEEEHIIF...',
      '......FHIIIIIF....',
      '.....FHHHHIIF.....',
      '....FHHHHIIF......',
      '...FEEEHIIF.......',
      '..FHIIIIIF........',
      '.FHHHHIIF.........',
      'FHHHHIIF..........',
      'FIIIIGF...........',
      'FIIIFF............',
      '.FFF..............',
    ],
  },

  /** 도나 — Dona the donut (official, 24×21) */
  dona: {
    name: '도나 (Dona)',
    rows: [
      '........FFFFFFFF........',
      '......FFHHHHHHHHFF......',
      '.....FHHEEEEEEEEHHF.....',
      '....FHHEEDDEEEEEEHHF....',
      '...FHHEEDEEEEEEEEEHHF...',
      '..FHHHEEEEFFFFEEEEEHHF..',
      '.FHHHEEEEFF..FFEEEEEHHF.',
      '.FHHEEEEFF....FFEEEEEHF.',
      'FHHEEEEFF......FFEEEHHHF',
      'FHHEEDFF........FFEEEHHF',
      'FHHEEEJF........FJEEEHHF',
      'FHHHEEFF........FFEEHHHF',
      '.FHHHEEFF......FFEEHHHF.',
      '.FHHHEEEFF....FFEEEHHHF.',
      '..FHHHEEEEFFFFEEEEEHHF..',
      '...FHHHEEEGGEEEEEHHHF...',
      '....FHHHHEEFFEEHHHHF....',
      '.....FIIIIHHHHIIIIF.....',
      '.......FFIIIIIIFF.......',
      '.........FF..FF.........',
      '.........FF..FF.........',
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

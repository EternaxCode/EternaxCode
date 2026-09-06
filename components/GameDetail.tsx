'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import StaggerContainer, { StaggerItem } from '@/components/StaggerContainer';
import PixelSprite from '@/components/PixelSprite';
import { getProjectStatus, statusLabels } from '@/lib/worksData';
import type { GameProject, GameUnit } from '@/lib/worksData';
import { PIXEL_SPRITES, spriteSize } from '@/lib/pixelSprites';
import type { PixelSpriteKey } from '@/lib/pixelSprites';
import px from '@/styles/pixelGame.module.css';

interface Props {
  project: GameProject;
}

/* Deterministic star field so server and client render identical markup. */
const STARS = Array.from({ length: 40 }, (_, i) => ({
  x: ((i * 37) % 97) + 1.5,
  y: ((i * 53) % 58) + 3,
  delay: ((i * 7) % 10) / 5,
  size: i % 7 === 0 ? 4 : i % 3 === 0 ? 2 : 3,
}));

/** Scale factor that fits a sprite into a square box of `box` px (rounded to 0.5). */
function fitScale(sprite: PixelSpriteKey, box: number): number {
  const { width, height } = spriteSize(PIXEL_SPRITES[sprite].rows);
  return Math.max(1, Math.floor(Math.min(box / width, box / height) * 2) / 2);
}

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <StaggerItem>
        <div className="flex items-center gap-3 sm:gap-4 mb-8">
          <span className={`${px.pixelFont} text-[10px] text-[#f6c743] shrink-0`}>{index}</span>
          <span className={`${px.divider} w-6 sm:w-10 shrink-0`} aria-hidden />
          <h2 className={`${px.pixelFont} ${px.hardShadow} text-xs sm:text-base text-[#fff0c8] shrink-0`}>
            {title.toUpperCase()}
          </h2>
          <span className={`${px.divider} flex-1`} aria-hidden />
        </div>
      </StaggerItem>
      {children}
    </section>
  );
}

function StatBar({ label, value, danger }: { label: string; value: number; danger?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`${px.label} w-8 text-[#fff0c8]/60`}>{label}</span>
      <div className={px.statBar} role="meter" aria-valuemin={0} aria-valuemax={5} aria-valuenow={value} aria-label={label}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`${px.statSeg} ${i < value ? (danger ? px.statSegOnRed : px.statSegOn) : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

function UnitCard({ unit, enemy = false }: { unit: GameUnit; enemy?: boolean }) {
  return (
    <div className={`${px.box} ${enemy ? px.boxMold : px.boxAccent} h-full p-5 flex flex-col`}>
      <div className={`${px.gridBg} border-4 border-[#1b1226] h-28 flex items-end justify-center p-2`}>
        <span className={enemy ? px.wobble : px.bob} style={{ display: 'block' }}>
          <PixelSprite sprite={unit.sprite} scale={fitScale(unit.sprite, 88)} flip={enemy} title={unit.nameEn} />
        </span>
      </div>
      <div className="mt-4">
        <p className={`${px.galmuri} text-xl font-bold leading-tight`}>{unit.name}</p>
        <p className={`${px.pixelFont} text-[9px] mt-2 ${enemy ? 'text-[#c4b5fd]' : 'text-[#f6c743]'}`}>
          {unit.nameEn.toUpperCase()}
        </p>
        <span className={`${px.tag} mt-3`}>{unit.role}</span>
      </div>
      <p className={`${px.galmuri} text-base text-[#fff0c8]/75 leading-relaxed mt-4 flex-1`}>
        {unit.description}
      </p>
      <div className="mt-5 space-y-2">
        <StatBar label="ATK" value={unit.stats.atk} danger={enemy} />
        <StatBar label="DEF" value={unit.stats.def} danger={enemy} />
        <StatBar label="SPD" value={unit.stats.spd} danger={enemy} />
      </div>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className={`${px.box} p-4 h-full`}>
      <p className={`${px.label} text-[#fff0c8]/50 mb-2`}>{label}</p>
      <p className={`${px.galmuri} text-base leading-snug`}>{value}</p>
    </div>
  );
}

export default function GameDetail({ project }: Props) {
  const { game, caseStudy } = project;
  const status = getProjectStatus(project);
  const doneCount = game.roadmap.filter((r) => r.done).length;
  const progress = Math.round((doneCount / Math.max(game.roadmap.length, 1)) * 100);
  const currentIndex = game.roadmap.findIndex((r) => !r.done);
  const stores = game.stores ?? [];
  const enemies = game.enemies ?? [];

  // Defenders walk out of the bakery in a loop; the list is doubled for a seamless track.
  const parade = [0, 1, 2].flatMap(() => game.units);
  const track = [...parade, ...parade];

  const blinkLine = stores.length
    ? `NOW LIVE ON ${game.platforms.join(' & ').toUpperCase()}`
    : game.playUrl
      ? 'INSERT COIN TO PLAY'
      : 'COMING SOON — INSERT COIN LATER';

  let stageNo = 0;
  const stage = () => `STAGE ${String(++stageNo).padStart(2, '0')}`;

  return (
    <>
      <Head>
        <title>{`${project.title} - Game - EternaxCode`}</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} - EternaxCode`} />
        <meta property="og:description" content={caseStudy.tagline} />
        {project.image && <meta property="og:image" content={project.image} />}
      </Head>

      <div className={`${px.root} min-h-screen w-full flex flex-col items-center px-4 sm:px-8 pt-24 pb-24`}>
        <div className="w-full max-w-5xl">
          <StaggerContainer className="space-y-16 sm:space-y-20">
            {/* ── Back ── */}
            <StaggerItem>
              <Link
                href="/works"
                className={`${px.pixelFont} inline-flex items-center gap-3 text-[10px] text-[#fff0c8]/60 hover:text-[#f6c743] transition-colors`}
              >
                <span aria-hidden>◀</span>
                BACK TO WORKS
              </Link>
            </StaggerItem>

            {/* ── Title screen ── */}
            <StaggerItem>
              <section className={`${px.screen} ${px.flicker}`} aria-label={`${project.title} title screen`}>
                {STARS.map((s, i) => (
                  <span
                    key={i}
                    className={px.star}
                    style={{
                      left: `${s.x}%`,
                      top: `${s.y}%`,
                      width: s.size,
                      height: s.size,
                      animationDelay: `${s.delay}s`,
                    }}
                    aria-hidden
                  />
                ))}

                {/* HUD */}
                <div className="relative z-[1] flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-4 border-[#1b1226]/60">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className={`${px.hud} text-[#fff0c8]/70`}>1UP</span>
                    <span className={`${px.hud} text-[#f6c743]`}>000000</span>
                  </div>
                  <div className="flex items-center gap-1" aria-label="3 lives">
                    <PixelSprite sprite="heart" scale={2} />
                    <PixelSprite sprite="heart" scale={2} />
                    <PixelSprite sprite="heart" scale={2} />
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <PixelSprite sprite="coin" scale={2} />
                    <span className={`${px.hud} text-[#f6c743]`}>×00</span>
                    <span className={`${px.hud} hidden sm:inline text-[#fff0c8]/70`}>{game.buildLabel}</span>
                  </div>
                </div>

                {/* Title */}
                <div className="relative z-[1] text-center px-4 pt-12 sm:pt-16 pb-4">
                  <p className={`${px.pixelFont} text-[9px] sm:text-[11px] tracking-[0.3em] text-[#4cc9f0] mb-8`}>
                    ETERNAXCODE PRESENTS
                  </p>
                  <h1 className={`${px.title} text-[64px] sm:text-[104px] md:text-[136px]`}>
                    {project.title}
                  </h1>
                  <p className={`${px.pixelFont} ${px.hardShadow} text-xs sm:text-lg text-[#f6c743] mt-8 tracking-[0.15em]`}>
                    {game.genre.toUpperCase()}
                  </p>
                  <p className={`${px.galmuri} text-base sm:text-xl text-[#fff0c8]/85 mt-4 max-w-xl mx-auto`}>
                    {project.subtitle}
                  </p>

                  {game.stats && game.stats.length > 0 && (
                    <div className="mt-8 flex justify-center gap-8 sm:gap-14">
                      {game.stats.map((s) => (
                        <div key={s.label} className="text-center">
                          <p className={`${px.pixelFont} ${px.hardShadow} text-xl sm:text-3xl text-[#f6c743]`}>{s.value}</p>
                          <p className={`${px.galmuri} text-sm sm:text-base text-[#fff0c8]/70 mt-2`}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-10 flex flex-col items-center gap-5">
                    <div className="flex flex-wrap justify-center gap-4">
                      {game.playUrl ? (
                        <a href={game.playUrl} target="_blank" rel="noopener noreferrer" className={px.btn}>
                          <span aria-hidden>▶</span> PRESS START
                        </a>
                      ) : (
                        <span className={`${px.btn} ${px.btnDisabled}`} aria-disabled>
                          <span aria-hidden>▶</span> PRESS START
                        </span>
                      )}
                      {stores.map((store) => (
                        <a
                          key={store.url}
                          href={store.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${px.btn} ${px.btnGhost}`}
                        >
                          {store.label.toUpperCase()}
                        </a>
                      ))}
                    </div>
                    <span className={`${px.pixelFont} ${px.blink} text-[9px] sm:text-[10px] text-[#fff0c8]/80`}>
                      {blinkLine}
                    </span>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    <span className={`${px.tag} text-[#7ee787]`}>● {statusLabels[status]}</span>
                    <span className={px.tag}>{game.buildLabel}</span>
                    <span className={px.tag}>{game.platforms.join(' · ')}</span>
                  </div>
                </div>

                {/* Village at night: defenders set out from the bakery */}
                <div className="relative z-[1] mt-8">
                  <div className="relative h-28 sm:h-32">
                    <div className="absolute left-3 sm:left-8 bottom-0 hidden sm:block">
                      <PixelSprite sprite="bakery" scale={3} />
                    </div>
                    <div className="absolute left-0 sm:left-[130px] right-0 bottom-0 overflow-hidden" aria-hidden>
                      <div className={px.walkTrack}>
                        {track.map((unit, i) => (
                          <span
                            key={i}
                            className={`${px.bob} mr-8 sm:mr-12`}
                            style={{ display: 'block', animationDelay: `${(i % 4) * 0.2}s` }}
                          >
                            <PixelSprite sprite={unit.sprite} scale={2.5} />
                          </span>
                        ))}
                      </div>
                    </div>
                    <div
                      className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
                      style={{ background: 'linear-gradient(to left, rgba(13,11,30,0.95), rgba(13,11,30,0))' }}
                      aria-hidden
                    />
                  </div>
                  <div className={px.grass} />
                  <div className={`${px.ground} h-8`} />
                </div>
              </section>
            </StaggerItem>

            {/* ── Briefing ── */}
            <Section index={stage()} title="Mission Briefing">
              <div className="space-y-6">
                <StaggerItem>
                  <div className={`${px.dialog} p-5 sm:p-7 flex items-start gap-5 sm:gap-7`}>
                    <div className="shrink-0 hidden sm:block">
                      <PixelSprite sprite="baker" scale={5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`${px.pixelFont} text-[10px] text-[#f6c743] mb-4`}>BAKER</p>
                      <p className={`${px.galmuri} text-lg sm:text-2xl leading-relaxed`}>“{game.pitch}”</p>
                      <p className={`${px.galmuri} text-base sm:text-lg text-[#fff0c8]/75 leading-relaxed mt-5`}>
                        {project.heroDescription}
                      </p>
                      <p className={`${px.cursor} text-right text-[#f6c743] mt-3`} aria-hidden>
                        ▼
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pt-2">
                  <StaggerItem>
                    <InfoTile label="Genre" value={game.genre} />
                  </StaggerItem>
                  <StaggerItem>
                    <InfoTile label="Platforms" value={game.platforms.join(' · ')} />
                  </StaggerItem>
                  <StaggerItem>
                    <InfoTile label="Players" value={game.players} />
                  </StaggerItem>
                  <StaggerItem>
                    <InfoTile label="Operated by" value="EternaxCode (in-house)" />
                  </StaggerItem>
                </div>
              </div>
            </Section>

            {/* ── Key art ── */}
            {game.keyArt && (
              <Section index={stage()} title="The Village">
                <StaggerItem>
                  <figure className={`${px.box} ${px.boxAccent} p-2 sm:p-3`}>
                    <div className="relative aspect-[3/2] w-full overflow-hidden border-4 border-[#1b1226]">
                      <Image src={game.keyArt.src} alt={game.keyArt.alt} fill className="object-cover" unoptimized />
                    </div>
                    <figcaption className={`${px.galmuri} text-sm sm:text-base text-[#fff0c8]/65 mt-3 px-1 pb-1`}>
                      {game.keyArt.caption}
                    </figcaption>
                  </figure>
                </StaggerItem>
              </Section>
            )}

            {/* ── Features ── */}
            <Section index={stage()} title="Features">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {game.features.map((feature) => (
                  <StaggerItem key={feature.title}>
                    <div className={`${px.box} ${px.gridBg} h-full p-5`}>
                      <div className="h-16 flex items-end mb-4">
                        <PixelSprite sprite={feature.sprite} scale={fitScale(feature.sprite, 60)} />
                      </div>
                      <h3 className={`${px.pixelFont} text-[10px] sm:text-[11px] leading-relaxed text-[#f6c743] mb-3`}>
                        {feature.title.toUpperCase()}
                      </h3>
                      <p className={`${px.galmuri} text-base text-[#fff0c8]/75 leading-relaxed`}>
                        {feature.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </Section>

            {/* ── Roster ── */}
            <Section index={stage()} title="Roster">
              <div className="space-y-10">
                <div>
                  <StaggerItem>
                    <p className={`${px.label} text-[#7ee787] mb-5`}>▶ BREAD DEFENDERS</p>
                  </StaggerItem>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
                    {game.units.map((unit) => (
                      <StaggerItem key={unit.nameEn}>
                        <UnitCard unit={unit} />
                      </StaggerItem>
                    ))}
                  </div>
                  {game.playUrl && (
                    <StaggerItem>
                      <a
                        href={game.playUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${px.pixelFont} mt-6 inline-flex items-center gap-3 text-[10px] text-[#fff0c8]/60 hover:text-[#f6c743] transition-colors`}
                      >
                        <span aria-hidden>▶</span>
                        ALL 64 BREADS IN THE OFFICIAL FIELD GUIDE
                        <span aria-hidden>↗</span>
                      </a>
                    </StaggerItem>
                  )}
                </div>
                {enemies.length > 0 && (
                  <div>
                    <StaggerItem>
                      <p className={`${px.label} text-[#e5484d] mb-5`}>▶ ENEMIES</p>
                    </StaggerItem>
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-7">
                      {enemies.map((enemy) => (
                        <StaggerItem key={enemy.nameEn}>
                          <UnitCard unit={enemy} enemy />
                        </StaggerItem>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Section>

            {/* ── Live Ops ── */}
            <Section index={stage()} title="Live Operations">
              <div className="space-y-6">
                <StaggerItem>
                  <p className={`${px.galmuri} text-base sm:text-lg text-[#fff0c8]/80 leading-relaxed max-w-3xl`}>
                    {project.title} is not a one-time release. EternaxCode designs, builds, and operates it as a live
                    service — the same way we run our other products — so the game keeps improving after launch.
                  </p>
                </StaggerItem>
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-7">
                  {game.operations.map((op, i) => (
                    <StaggerItem key={op.title}>
                      <div className={`${px.box} h-full p-5 flex gap-4`}>
                        <span className={`${px.pixelFont} text-[10px] text-[#4cc9f0] mt-1 shrink-0`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className={`${px.galmuri} text-lg font-bold mb-2`}>{op.title}</h3>
                          <p className={`${px.galmuri} text-base text-[#fff0c8]/70 leading-relaxed`}>
                            {op.description}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </div>
            </Section>

            {/* ── Quest log ── */}
            <Section index={stage()} title="Quest Log">
              <StaggerItem>
                <div className={`${px.box} p-5 sm:p-7`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`${px.hud} text-[#fff0c8]/70`}>PROGRESS</span>
                    <span className={`${px.hud} text-[#f6c743]`}>
                      {doneCount}/{game.roadmap.length}
                    </span>
                  </div>
                  <div className={px.progress} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                    <div className={px.progressFill} style={{ width: `${progress}%` }} />
                  </div>

                  <ol className="mt-8 space-y-6">
                    {game.roadmap.map((item, i) => {
                      const isCurrent = i === currentIndex;
                      return (
                        <li key={item.phase} className="flex items-start gap-4">
                          <span className={px.checkbox} aria-label={item.done ? 'Completed' : 'Not yet'}>
                            {item.done ? '■' : ''}
                          </span>
                          <div className="min-w-0">
                            <p className={`${px.pixelFont} text-[9px] sm:text-[10px] flex items-center gap-3 ${item.done ? 'text-[#7ee787]' : 'text-[#fff0c8]/50'}`}>
                              {item.phase}
                              {isCurrent && (
                                <span className={`${px.blink} text-[#f6c743]`}>◀ NOW</span>
                              )}
                            </p>
                            <p className={`${px.galmuri} text-lg font-bold mt-1 ${item.done ? 'line-through text-[#fff0c8]/60' : ''}`}>
                              {item.title}
                            </p>
                            <p className={`${px.galmuri} text-base text-[#fff0c8]/65 leading-relaxed`}>
                              {item.description}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </StaggerItem>
            </Section>

            {/* ── Palette & Type ── */}
            <Section index={stage()} title="Palette & Type">
              <div className="space-y-8">
                <StaggerItem>
                  <p className={`${px.galmuri} text-base sm:text-lg text-[#fff0c8]/80 leading-relaxed max-w-3xl`}>
                    {caseStudy.designSystem.concept}
                  </p>
                </StaggerItem>

                <StaggerItem>
                  <p className={`${px.label} text-[#fff0c8]/50 mb-4`}>COLOR PALETTE</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
                    {caseStudy.designSystem.colors.map((color) => (
                      <div key={color.name} className={`${px.box} p-3`}>
                        <div className={px.swatch} style={{ backgroundColor: color.hex }} />
                        <p className={`${px.galmuri} font-bold mt-3`}>{color.name}</p>
                        <p className={`${px.pixelFont} ${px.selectable} text-[9px] text-[#f6c743] mt-2`}>{color.hex}</p>
                        <p className={`${px.galmuri} text-sm text-[#fff0c8]/60 mt-2 leading-relaxed`}>{color.role}</p>
                      </div>
                    ))}
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <p className={`${px.label} text-[#fff0c8]/50 mb-4`}>TYPOGRAPHY</p>
                  <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                    {caseStudy.designSystem.typography.map((type) => (
                      <div key={type.family} className={`${px.box} ${px.boxLight} p-5`}>
                        <p
                          className="text-2xl leading-none mb-3"
                          style={{
                            fontFamily: type.family === 'Galmuri' ? "'Galmuri11', monospace" : "'Press Start 2P', monospace",
                          }}
                        >
                          {type.family === 'Galmuri' ? '가나다 Aa 123' : 'Aa 123'}
                        </p>
                        <p className={`${px.galmuri} font-bold text-lg`}>{type.family}</p>
                        <p className={`${px.galmuri} text-base text-[#fff0c8]/65 mt-1 leading-relaxed`}>{type.usage}</p>
                      </div>
                    ))}
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <p className={`${px.label} text-[#fff0c8]/50 mb-4`}>DESIGN RULES</p>
                  <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
                    {caseStudy.designSystem.principles.map((principle, i) => (
                      <div key={principle.title} className={`${px.box} p-5`}>
                        <span className={`${px.pixelFont} text-[10px] text-[#4cc9f0]`}>RULE {String(i + 1).padStart(2, '0')}</span>
                        <h4 className={`${px.galmuri} font-bold text-lg mt-3 mb-2`}>{principle.title}</h4>
                        <p className={`${px.galmuri} text-base text-[#fff0c8]/65 leading-relaxed`}>{principle.description}</p>
                      </div>
                    ))}
                  </div>
                </StaggerItem>
              </div>
            </Section>

            {/* ── Stack & Credits ── */}
            <Section index={stage()} title="Stack & Credits">
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-7">
                <StaggerItem>
                  <div className={`${px.box} h-full p-5`}>
                    <p className={`${px.label} text-[#fff0c8]/50 mb-4`}>TECH STACK</p>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.techStack.map((tech) => (
                        <span key={tech} className={px.tag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className={`${px.box} h-full p-5`}>
                    <p className={`${px.label} text-[#fff0c8]/50 mb-4`}>CREDITS — ALL IN-HOUSE</p>
                    <ul className="space-y-2">
                      {caseStudy.deliverables.map((item) => (
                        <li key={item} className={`${px.galmuri} flex items-center gap-3 text-base`}>
                          <span className="text-[#f6c743] text-xs" aria-hidden>▶</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              </div>

              {caseStudy.links.length > 0 && (
                <div className="grid sm:grid-cols-3 gap-6 sm:gap-7 mt-6 sm:mt-7">
                  {caseStudy.links.map((link) => (
                    <StaggerItem key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${px.box} ${px.boxLight} block h-full p-5 hover:bg-[#2a2350] transition-colors`}
                      >
                        <p className={`${px.pixelFont} text-[10px] text-[#f6c743]`}>{link.label.toUpperCase()} ↗</p>
                        <p className={`${px.galmuri} text-base text-[#fff0c8]/70 mt-3 leading-relaxed`}>{link.description}</p>
                      </a>
                    </StaggerItem>
                  ))}
                </div>
              )}
            </Section>

            {/* ── Continue? ── */}
            <StaggerItem>
              <div className={`${px.box} ${px.boxAccent} ${px.gridBg} p-8 sm:p-12 text-center`}>
                <p className={`${px.pixelFont} ${px.hardShadow} text-xl sm:text-3xl text-[#fff0c8]`}>CONTINUE?</p>
                <p className={`${px.galmuri} text-base sm:text-lg text-[#fff0c8]/75 mt-5 max-w-lg mx-auto leading-relaxed`}>
                  {project.statusNote ?? 'Want to build a game — or any product — with us?'}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5">
                  <Link href="/contact" className={px.btn}>
                    <span aria-hidden>▶</span> YES — CONTACT US
                  </Link>
                  <Link href="/works" className={`${px.btn} ${px.btnGhost}`}>
                    NO — BACK TO WORKS
                  </Link>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </>
  );
}

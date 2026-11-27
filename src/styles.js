// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

export const BASE_STYLE = `
  :host { --aq-accent: #0288d1; --aq-ok: var(--success-color, #43a047); --aq-warn: var(--warning-color, #ffa600);
          --aq-crit: var(--error-color, #db4437); --aq-idle: var(--secondary-text-color, #9e9e9e); --aq-heat: #f59e0b;
          --aq-flow: #2f80ed; --aq-cold: #00acc1; --aq-moon: #7e57c2;
          --aq-ok-z: color-mix(in srgb, var(--aq-ok) 55%, transparent); --aq-warn-z: color-mix(in srgb, var(--aq-warn) 45%, transparent);
          --aq-crit-z: color-mix(in srgb, var(--aq-crit) 32%, transparent);
          /* Text in a state or accent color is mixed with the text color so that it reads at 4.5:1 at least. */
          --aq-accent-text: color-mix(in srgb, var(--aq-accent) 55%, var(--primary-text-color)); }
  ha-card { overflow: hidden; position: relative; container-type: inline-size; }
  /* A size container has no width of its own content: in a parent sized by its content the card would fall to a
     few pixels. This empty grid gives it a natural width without any minimum. */
  :host { display: block; min-width: 0; --aq-natural-width: 400px; }
  :host::before { content: ""; display: grid; grid-template-columns: minmax(0, var(--aq-natural-width)); height: 0; }
  .icon { width: 18px; height: 18px; fill: currentColor; flex: none; }
  .muted { color: var(--secondary-text-color); }
  .clickable { cursor: pointer; }
  [role="button"]:focus-visible, button:focus-visible { outline: 2px solid var(--primary-color, var(--aq-accent)); outline-offset: 2px; }
  .ok { --c: var(--aq-ok); } .warn { --c: var(--aq-warn); } .crit { --c: var(--aq-crit); } .idle { --c: var(--aq-idle); }
  .heat { --c: var(--aq-heat); } .flow { --c: var(--aq-flow); } .cold { --c: var(--aq-cold); } .moon { --c: var(--aq-moon); }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c, var(--aq-ok)); flex: none; display: inline-block; }
  .chip { display: inline-flex; align-items: center; gap: 4px; padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; white-space: nowrap;
          background: color-mix(in srgb, var(--c, var(--aq-ok)) 15%, transparent); color: color-mix(in srgb, var(--c, var(--aq-ok)) 50%, var(--primary-text-color));
          flex: 0 1 auto; min-width: 0; max-width: 50%; overflow: hidden; box-sizing: border-box; line-height: 16px; }
  .chip-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .warning { padding: 16px; color: color-mix(in srgb, var(--aq-warn) 50%, var(--primary-text-color)); }
  /* Buttons as on the other ha-* cards: never filled, a light tint; the icon takes the accent color when on. */
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: none; cursor: pointer; font: inherit; font-size: 13px;
         font-weight: 500; padding: 6px 12px; border-radius: 18px; min-width: 0; color: var(--primary-text-color);
         background: var(--secondary-background-color, rgba(127,127,127,.12)); }
  .btn span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .btn .icon { color: var(--secondary-text-color); }
  .btn.on { background: color-mix(in srgb, var(--aq-accent) 16%, transparent); color: var(--aq-accent-text); }
  .btn.on .icon { color: var(--aq-accent); }
  .btn:not(:disabled):hover { background: color-mix(in srgb, var(--aq-accent) 12%, var(--secondary-background-color, rgba(127,127,127,.12))); }
  .btn.on:not(:disabled):hover { background: color-mix(in srgb, var(--aq-accent) 24%, transparent); }
  .btn:disabled { opacity: .45; cursor: default; }
  .btn.round { width: 36px; height: 36px; padding: 0; border-radius: 50%; flex: none; }

  /* ── Illustrated header: the tank ── */
  .banner { position: relative; height: var(--banner-h, 90px); overflow: hidden; --ground-h: 10px;
            --aq-w1: #8ccdee; --aq-w2: #4ea2da; --aq-w3: #2f7fc0; --aq-text: #0d2a45; --aq-muted: #24506e;
            background: linear-gradient(180deg, var(--aq-w1) 0%, var(--aq-w2) 58%, var(--aq-w3) 100%); }
  .banner.fresh { --aq-w1: #a8dccf; --aq-w2: #6cb6a8; --aq-w3: #4a978d; --aq-text: #0f3a35; --aq-muted: #24564f; }
  .banner.dark { --aq-w1: #0f3a6e; --aq-w2: #0b2b55; --aq-w3: #071d3c; --aq-text: #ffffff; --aq-muted: rgba(255,255,255,.78); }
  .banner.fresh.dark { --aq-w1: #143e4c; --aq-w2: #0e3040; --aq-w3: #0a2331; }
  .banner.ink { --aq-text: #ffffff; --aq-muted: rgba(255,255,255,.78); }
  .banner .scene { position: absolute; right: 0; bottom: var(--ground-h); width: 400px; height: calc(100% - var(--ground-h)); overflow: visible; }
  /* The substrate strip: the same height as the runway of the flight board, sand (reef) or gravel (freshwater). */
  .ground { position: absolute; left: 0; right: 0; bottom: 0; height: var(--ground-h); background: #e2c28a;
            box-shadow: inset 0 1px 0 #cfab6d, inset 0 -1px 0 #c39d5f;
            background-image: radial-gradient(circle, #c9a468 0 .9px, transparent 1.3px), radial-gradient(circle, #f3dcae 0 .8px, transparent 1.2px);
            background-size: 11px 10px, 17px 10px; background-position: 2px 3px, 7px 6px; }
  .fresh .ground { background-color: #6f5d4b; box-shadow: inset 0 1px 0 #5c4c3c, inset 0 -1px 0 #4f4133;
                   background-image: radial-gradient(circle, #8d7a63 0 1.3px, transparent 1.7px), radial-gradient(circle, #4f4133 0 1px, transparent 1.4px); }
  .dark .ground { background-color: #2b3756; box-shadow: inset 0 1px 0 #222c46, inset 0 -1px 0 #1c253c;
                  background-image: radial-gradient(circle, #3a4768 0 .9px, transparent 1.3px), radial-gradient(circle, #1f2943 0 .8px, transparent 1.2px); }
  .fresh.dark .ground { background-color: #2c2a28; box-shadow: inset 0 1px 0 #24221f, inset 0 -1px 0 #1d1b19; }
  /* The texts keep to the left: the fish swim in the right part of the tank, under the status pill. */
  .head { position: absolute; z-index: 1; left: 0; top: 0; right: min(42%, 170px); bottom: var(--ground-h); box-sizing: border-box;
          display: flex; align-items: center; gap: 10px; padding: 8px 4px 8px 14px; min-width: 0; color: var(--aq-text); }
  /* The detail button: the top right corner, as on the other ha-* cards. */
  .corner { position: absolute; z-index: 2; top: 6px; right: 6px; display: flex; align-items: center; gap: 6px; }
  .badge { width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center; position: relative;
           --tint: var(--c, var(--aq-accent)); color: color-mix(in srgb, var(--tint) 75%, #0d2a45);
           background: rgba(255,255,255,.66); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--tint) 30%, transparent); transition: color .3s ease; }
  .dark .badge, .ink .badge { background: rgba(255,255,255,.14); color: color-mix(in srgb, var(--tint) 60%, #ffffff); box-shadow: inset 0 0 0 1px rgba(255,255,255,.18); }
  .badge .icon { width: 24px; height: 24px; }
  .titles { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; }
  /* The status pill sits on the title's line, right after the title, with its whole label (placed by _fitPill). */
  .title-row { display: flex; align-items: center; gap: 8px; min-width: 0; }
  .title-row > .chip { flex: none; max-width: none; }
  .name { flex: 0 1000 auto; min-width: 0; font-size: 16px; font-weight: 500; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  :host([hide-title]) .name { visibility: hidden; }
  :host([hide-subtitle]) .sub { display: none; }
  /* The subtitle on two lines at most. */
  .sub { font-size: 12px; line-height: 16px; color: var(--aq-muted, var(--secondary-text-color)); display: -webkit-box; -webkit-line-clamp: 2;
         -webkit-box-orient: vertical; overflow: hidden; }
  /* The whole title and the whole pill do not fit side by side (measured, see _fitPill): the pill goes to its own
     line, under the subtitle kept to one line; if that does not fit above the substrate either, its dot alone. */
  .titles.below > .title-row { display: contents; }
  .titles.below > .title-row > .chip { order: 3; align-self: flex-start; max-width: 100%; margin-top: 3px; }
  .titles.below > .sub { order: 2; -webkit-line-clamp: 1; }
  .titles.dot-only > .title-row { display: flex; }
  .titles.dot-only > .title-row > .chip { order: 0; align-self: center; margin-top: 0; padding: 4px; }
  .titles.dot-only .chip-text { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  /* On the water, the pill gets a frosted base so that it reads over the fish. */
  .banner .chip { background: color-mix(in srgb, var(--c) 18%, rgba(255,255,255,.86)); color: color-mix(in srgb, var(--c) 55%, #0d2a45); }
  .banner.dark .chip, .banner.ink .chip { background: color-mix(in srgb, var(--c) 30%, rgba(10,24,48,.72)); color: color-mix(in srgb, var(--c) 35%, #ffffff); }
  .zoom { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; border-radius: 50%;
          display: grid; place-items: center; color: #0d2a45; background: rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(13,42,69,.12); }
  .zoom .icon { width: 16px; height: 16px; }
  .dark .zoom, .ink .zoom { color: #ffffff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }
  .zoom:hover { background: rgba(255,255,255,.78); }
  .dark .zoom:hover, .ink .zoom:hover { background: rgba(255,255,255,.22); }
  .zoom.plain { position: absolute; color: var(--secondary-text-color); background: none; box-shadow: inset 0 0 0 1px var(--divider-color, rgba(127,127,127,.3)); top: 14px; right: 12px; }
  /* Classic header (illustration: false). */
  .header { display: flex; align-items: center; gap: 10px; padding: 12px 12px 0 14px; position: relative; }
  .zoomable.header { padding-right: 44px; }
  .header .badge { background: color-mix(in srgb, var(--tint) 16%, transparent); box-shadow: none; color: color-mix(in srgb, var(--tint) 70%, var(--primary-text-color)); }
  .header .sub { color: var(--secondary-text-color); }

  /* ── Scene colours (reef, freshwater; day, night) ── */
  .scene .lamp { fill: #ffe7a0; } .dark .scene .lamp { fill: #3b3f8f; } .moonlit .scene .lamp { fill: #6c63ff; }
  .scene .rays path { fill: #ffffff; opacity: .3; } .scene .rays.tinted path { fill: inherit; opacity: .28; }
  .scene .caustics path { fill: none; stroke: #ffffff; stroke-width: 1.2; opacity: .5; }
  .scene .moon .halo { fill: #e8e6ff; opacity: .12; } .scene .moon .disc { fill: #efedff; }
  .scene .rk { fill: #9a8f82; } .scene .rk2 { fill: #7c7166; }
  .scene .sd { fill: #f2d6a2; } .scene .sd2 { fill: #d9b677; }
  .scene .fan { fill: none; stroke: #e0503c; stroke-width: 1.6; stroke-linecap: round; } .scene .fan.thin { stroke-width: .6; opacity: .7; }
  .scene .acro { fill: none; stroke: #b565d9; stroke-width: 4; stroke-linecap: round; } .scene .acro-tip { fill: #f0c8fa; }
  .scene .brain { fill: #9cc85a; } .scene .brain-l { fill: none; stroke: #5e8f2a; stroke-width: 1.3; }
  .scene .leather { fill: #e8c07a; } .scene .leather-p { fill: #f6e2b3; }
  .scene .zoa { fill: #2bb3a3; } .scene .zoa-c { fill: #f5a623; }
  .scene .anem { fill: none; stroke: #f7b3c9; stroke-width: 2.6; stroke-linecap: round; } .scene .anem-tip { fill: #f06a9b; }
  .scene .star { fill: #f0703c; } .scene .shell { fill: #f7e7ce; }
  .fresh .scene .sd { fill: #8a7560; } .fresh .scene .sd2 { fill: #5f4e3e; } .fresh .scene .rk { fill: #8e8e8a; } .fresh .scene .rk2 { fill: #6f6f6b; }
  .scene .val { fill: none; stroke: #4f9a3a; stroke-width: 2.4; stroke-linecap: round; }
  .scene .wood { fill: none; stroke: #7a5236; stroke-width: 6; stroke-linecap: round; } .scene .wood2 { fill: none; stroke: #9b6d4a; stroke-width: 1.6; stroke-linecap: round; }
  .scene .fern { fill: #3e7d32; } .scene .sword { fill: #5fae3e; } .scene .sword-v { fill: none; stroke: #3f8a2a; stroke-width: .7; }
  .scene .lud { fill: none; stroke: #9a4a2a; stroke-width: 1.4; } .scene .lud-l { fill: #e0603a; }
  .scene .anubias { fill: #2f6f2a; } .scene .moss { fill: none; stroke: #6fbf3e; stroke-width: 2.4; stroke-linecap: round; }
  .scene .bubbles circle { fill: #ffffff; fill-opacity: .55; stroke: #ffffff; stroke-opacity: .9; stroke-width: .5; }
  .scene .co2 .glass { fill: rgba(255,255,255,.35); stroke: rgba(255,255,255,.7); stroke-width: .5; } .scene .co2 circle { fill: #ffffff; opacity: .9; }
  .scene .drift circle { fill: #ffffff; opacity: .7; }
  .scene .flakes rect { fill: #f2a34a; } .scene .flakes rect:nth-child(3n) { fill: #e85d3a; } .scene .flakes rect:nth-child(3n+1) { fill: #f6d26a; }
  .scene .heater .tube { fill: rgba(255,255,255,.35); stroke: rgba(255,255,255,.75); stroke-width: .6; } .scene .heater .cap { fill: #78909c; }
  .scene .heater .coil { fill: #b0bec5; } .heating .scene .heater .coil { fill: #ff7043; }
  .scene .murk { fill: #6f8f5a; opacity: .28; } .scene .murk.crit { fill: #8a8466; opacity: .4; }
  /* Night: deep blue water; a reef's corals fluoresce under the actinic light. */
  .dark .scene .rk { fill: #33415e; } .dark .scene .rk2 { fill: #26314a; } .dark .scene .sd { fill: #2b3756; } .dark .scene .sd2 { fill: #1f2943; }
  .dark .scene .fan { stroke: #ff4f86; } .dark .scene .acro { stroke: #6e5cf0; } .dark .scene .acro-tip { fill: #8df3ff; }
  .dark .scene .brain { fill: #33d69a; } .dark .scene .brain-l { stroke: #14805a; } .dark .scene .leather { fill: #8d9bff; } .dark .scene .leather-p { fill: #c9d2ff; }
  .dark .scene .zoa { fill: #3bffb8; } .dark .scene .zoa-c { fill: #ffe45c; } .dark .scene .anem { stroke: #b66cff; } .dark .scene .anem-tip { fill: #ff8ceb; }
  .dark .scene .star { fill: #a0503a; } .dark .scene .shell { fill: #5a6680; }
  .fresh.dark .scene .val { stroke: #24502a; } .fresh.dark .scene .wood { stroke: #3a2a20; } .fresh.dark .scene .wood2 { stroke: #4a3628; }
  .fresh.dark .scene .fern, .fresh.dark .scene .anubias { fill: #1d3d22; } .fresh.dark .scene .sword { fill: #2c5a26; }
  .fresh.dark .scene .lud-l { fill: #7a3a28; } .fresh.dark .scene .moss { stroke: #2f5a2a; }
  .fresh.dark .scene .sd { fill: #3a342e; } .fresh.dark .scene .sd2 { fill: #2a2622; } .fresh.dark .scene .rk { fill: #474744; } .fresh.dark .scene .rk2 { fill: #383836; }
  .dark .scene .swimmers { opacity: .82; }

  /* ── Animations (each one a divisor of 8 s) ── */
  .scene .fish { transform-box: fill-box; transform-origin: center; }
  .scene .pace-a { animation: aq-pace-a 8s ease-in-out infinite; }
  .scene .pace-b { animation: aq-pace-b 8s ease-in-out infinite; }
  .scene .pace-c { animation: aq-pace-c 8s ease-in-out infinite; }
  .scene .pace-d { animation: aq-pace-d 8s ease-in-out infinite; }
  .scene .pace-e { animation: aq-pace-e 8s ease-in-out infinite; }
  .scene .bob { animation: aq-bob 2s ease-in-out infinite; } .scene .bob.slow { animation-duration: 4s; } .scene .bob.quick { animation-duration: 1s; }
  .scene .sway { transform-box: fill-box; transform-origin: 50% 100%; animation: aq-sway 4s ease-in-out infinite; }
  .scene .sway.slow { animation-duration: 8s; }
  .waves .scene .sway { animation-duration: 2s; } .waves .scene .sway.slow { animation-duration: 4s; }
  .scene .rays { animation: aq-rays 4s ease-in-out infinite; }
  .scene .caustics path { animation: aq-caustics 2s linear infinite; }
  .scene .bubbles circle { animation: aq-up 2s ease-in infinite; }
  .scene .co2 circle { animation: aq-co2 2s linear infinite; }
  .scene .drift circle { animation: aq-drift 8s linear infinite; }
  .scene .flakes rect { transform-box: fill-box; transform-origin: center; animation: aq-fall 4s linear infinite; }
  .heating .scene .heater .coil { animation: aq-glow 2s ease-in-out infinite; }
  .dark.reef .scene .glow { animation: aq-glow 4s ease-in-out infinite; }
  .scene .moon .halo { animation: aq-glow 4s ease-in-out infinite; }
  /* A tank in trouble: the fish stand still. */
  .still .scene .fish, .still .scene .bob { animation-play-state: paused; }
  @keyframes aq-pace-a { 0% { transform: translateX(0) scaleX(1); } 47% { transform: translateX(118px) scaleX(1); } 50% { transform: translateX(118px) scaleX(-1); } 97% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-pace-b { 0% { transform: translateX(0) scaleX(-1); } 47% { transform: translateX(-118px) scaleX(-1); } 50% { transform: translateX(-118px) scaleX(1); } 97% { transform: translateX(0) scaleX(1); } 100% { transform: translateX(0) scaleX(-1); } }
  @keyframes aq-pace-c { 0% { transform: translateX(0) scaleX(1); } 45% { transform: translateX(80px) scaleX(1); } 50% { transform: translateX(80px) scaleX(-1); } 95% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-pace-d { 0% { transform: translateX(0) scaleX(1); } 45% { transform: translateX(70px) scaleX(1); } 50% { transform: translateX(70px) scaleX(-1); } 95% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-pace-e { 0% { transform: translateX(0) scaleX(1); } 45% { transform: translateX(40px) scaleX(1); } 50% { transform: translateX(40px) scaleX(-1); } 95% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-bob { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(2px, -3px); } }
  @keyframes aq-sway { 0%, 100% { transform: skewX(-4deg); } 50% { transform: skewX(5deg); } }
  @keyframes aq-rays { 0%, 100% { opacity: .7; } 50% { opacity: 1; } }
  @keyframes aq-caustics { from { transform: translateX(0); } to { transform: translateX(-40px); } }
  @keyframes aq-up { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(-68px); opacity: 0; } }
  @keyframes aq-co2 { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(-58px) translateX(3px); opacity: 0; } }
  @keyframes aq-drift { from { transform: translateX(0); opacity: 0; } 10% { opacity: .8; } 90% { opacity: .8; } to { transform: translateX(-260px); opacity: 0; } }
  @keyframes aq-fall { 0% { transform: translate(0, 0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translate(6px, 70px) rotate(220deg); opacity: 0; } }
  @keyframes aq-glow { 0%, 100% { opacity: .65; } 50% { opacity: 1; } }
  /* ── Themed tanks: their animals, plants and particles ── */
  .scene .t-pa { animation: aq-t-pa 8s ease-in-out infinite; }
  .scene .t-pb { animation: aq-t-pb 8s ease-in-out infinite; }
  .scene .t-pc { animation: aq-t-pc 8s ease-in-out infinite; }
  .scene .hang { transform-box: fill-box; transform-origin: 50% 0; animation: aq-sway 8s ease-in-out infinite; }
  .scene .pulse { transform-box: fill-box; transform-origin: 50% 0; animation: aq-pulse 2s ease-in-out infinite; }
  .scene .rise { animation: aq-rise 8s ease-in-out infinite; }
  .scene .gl { animation: aq-gl 2s ease-in-out infinite; }
  .scene .part circle { animation: aq-part 8s ease-in-out infinite; }
  .scene .bub circle { animation: aq-up 2s ease-in infinite; }
  .scene .snow circle { animation: aq-snow 8s linear infinite; }
  .scene .veil { fill: #061026; }
  .scene .gl.slow { animation-duration: 4s; }
  .scene .fixture .bulb { fill: #78909c; } .scene .fixture.on .bulb { fill: #ffe082; }
  .scene .uvb { animation: aq-glow 4s ease-in-out infinite; }
  .scene .mist ellipse { animation: aq-mist 8s ease-in-out infinite; }
  .scene .drip circle { animation: aq-drip 2s ease-in infinite; }
  .scene .hop { animation: aq-hop 4s ease-in-out infinite; }
  .scene .cham { animation: aq-cham 8s ease-in-out infinite; }
  .scene .eyeroll { animation: aq-eye 4s ease-in-out infinite; }
  .scene .tongue { animation: aq-tongue 2s steps(1) infinite; }
  /* The heat mat warms the substrate from below. */
  .mat .ground::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(255,112,67,.6), rgba(255,112,67,0)); animation: aq-glow 4s ease-in-out infinite; }
  .still .scene .hop, .still .scene .eyeroll { animation-play-state: paused; }
  /* Terrarium animals: a lizard or a spider walks a little way and turns, a chameleon creeps, a gecko climbs the
     glass, a snake or a basking turtle breathes, a bearded dragon bobs its head, stick insects rock. */
  .scene .t-pd { animation: aq-t-pd 8s ease-in-out infinite; }
  .scene .t-pe { animation: aq-t-pe 8s ease-in-out infinite; }
  .scene .climb { animation: aq-climb 8s ease-in-out infinite; }
  .scene .breathe { transform-box: fill-box; transform-origin: 50% 100%; animation: aq-breathe 4s ease-in-out infinite; }
  .scene .nod { transform-box: fill-box; transform-origin: 100% 100%; animation: aq-nod 2s ease-in-out infinite; }
  .scene .rock { transform-box: fill-box; transform-origin: 50% 50%; animation: aq-rock 4s ease-in-out infinite; }
  .scene .rock.slow { animation-duration: 8s; }
  .still .scene .climb, .still .scene .nod, .still .scene .breathe { animation-play-state: paused; }
  @keyframes aq-t-pd { 0%, 10% { transform: translateX(0) scaleX(1); } 45% { transform: translateX(28px) scaleX(1); } 50%, 60% { transform: translateX(28px) scaleX(-1); } 95% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-t-pe { 0%, 15% { transform: translateX(0) scaleX(1); } 45% { transform: translateX(12px) scaleX(1); } 50%, 65% { transform: translateX(12px) scaleX(-1); } 95% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-climb { 0%, 100% { transform: translateY(0); } 40%, 55% { transform: translateY(-16px); } }
  @keyframes aq-breathe { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.03, 1.06); } }
  @keyframes aq-nod { 0%, 30%, 100% { transform: translateY(0) rotate(0deg); } 45% { transform: translateY(1.5px) rotate(2deg); } 60% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(1.5px) rotate(2deg); } }
  @keyframes aq-rock { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
  /* Their limbs: walking (or paddling) legs while the animal moves, a swaying tail, an axolotl's gills, a frog's throat. */
  .scene .lg-a, .scene .lg-b { transform-box: fill-box; transform-origin: 50% 0; }
  .scene [class*="t-p"] .lg-a { animation: aq-step 1s ease-in-out infinite; }
  .scene [class*="t-p"] .lg-b { animation: aq-step 1s ease-in-out -.5s infinite; }
  .scene .tail { transform-box: fill-box; transform-origin: 100% 50%; animation: aq-tail 2s ease-in-out infinite; }
  .scene .gills { transform-box: fill-box; transform-origin: 100% 100%; animation: aq-gills 2s ease-in-out infinite; }
  .scene .throat { transform-box: fill-box; transform-origin: 50% 0; animation: aq-throat 1s ease-in-out infinite; }
  .still .scene .lg-a, .still .scene .lg-b, .still .scene .tail { animation-play-state: paused; }
  @keyframes aq-step { 0%, 100% { transform: rotate(-16deg); } 50% { transform: rotate(16deg); } }
  @keyframes aq-tail { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
  @keyframes aq-gills { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(5deg); } }
  @keyframes aq-throat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.25, 1.5); } }
  /* Fish: the tail beats and the pectoral fin flutters. */
  .scene .tf { transform-box: fill-box; transform-origin: 100% 50%; animation: aq-tf .5s ease-in-out infinite alternate; }
  .scene .pf { transform-box: fill-box; transform-origin: 100% 0; animation: aq-pf 1s ease-in-out infinite; }
  .still .scene .tf, .still .scene .pf { animation-play-state: paused; }
  @keyframes aq-tf { from { transform: scaleX(1) skewY(-6deg); } to { transform: scaleX(.86) skewY(6deg); } }
  @keyframes aq-pf { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-18deg); } }
  @keyframes aq-mist { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-18px); } }
  @keyframes aq-drip { 0% { transform: translateY(0); opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(24px); opacity: 0; } }
  @keyframes aq-hop { 0%, 60%, 100% { transform: translate(0, 0); } 70% { transform: translate(6px, -8px); } 80% { transform: translate(12px, 0); } 90% { transform: translate(6px, -4px); } }
  @keyframes aq-cham { 0%, 100% { fill: #4caf50; } 50% { fill: #26a69a; } }
  @keyframes aq-eye { 0%, 100% { transform: translate(0, 0); } 40% { transform: translate(-1px, -.6px); } 70% { transform: translate(.6px, .6px); } }
  @keyframes aq-tongue { 0% { opacity: 0; } 80% { opacity: 1; } }
  .still .scene .hang, .still .scene .pulse, .still .scene .rise { animation-play-state: paused; }
  @keyframes aq-t-pa { 0% { transform: translateX(0) scaleX(1); } 47% { transform: translateX(90px) scaleX(1); } 50% { transform: translateX(90px) scaleX(-1); } 97% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-t-pb { 0% { transform: translateX(0) scaleX(1); } 47% { transform: translateX(-100px) scaleX(1); } 50% { transform: translateX(-100px) scaleX(-1); } 97% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-t-pc { 0% { transform: translateX(0) scaleX(1); } 47% { transform: translateX(45px) scaleX(1); } 50% { transform: translateX(45px) scaleX(-1); } 97% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes aq-pulse { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.12, .86); } }
  @keyframes aq-rise { 0%, 100% { transform: translateY(8px); } 50% { transform: translateY(-8px); } }
  @keyframes aq-gl { 0%, 100% { opacity: .45; } 50% { opacity: 1; } }
  @keyframes aq-part { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-6px, 3px); } }
  @keyframes aq-snow { 0% { transform: translateY(-6px); opacity: 0; } 10% { opacity: .8; } 100% { transform: translateY(78px); opacity: 0; } }
  @keyframes aq-blink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
  @media (prefers-reduced-motion: reduce) { .scene *, .dot { animation: none !important; } }
  /* The status dot blinks while something is wrong, as on the other ha-* cards. */
  .chip.crit .dot { animation: aq-blink 1.6s ease-in-out infinite; }

  /* ── Tiles (look "B" of the ha-* cards: neutral tile, tinted round icon, bold name, colored state, a badge) ── */
  .tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .tile { display: flex; gap: 8px; align-items: center; padding: 8px 18px 8px 8px; border-radius: 10px; min-width: 0; position: relative;
          background: var(--secondary-background-color, rgba(127,127,127,.08)); cursor: pointer; }
  .tile:hover { background: color-mix(in srgb, var(--c, var(--aq-idle)) 8%, var(--secondary-background-color, rgba(127,127,127,.08))); }
  .pi { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; flex: none;
        background: color-mix(in srgb, var(--c, var(--aq-idle)) 16%, transparent); color: color-mix(in srgb, var(--c, var(--aq-idle)) 70%, var(--primary-text-color)); }
  .pi .icon { width: 18px; height: 18px; }
  .tile .tx { min-width: 0; display: flex; flex-direction: column; }
  .tile .tn { font-size: 13px; font-weight: 500; line-height: 17px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--primary-text-color); }
  .tile .ts { font-size: 12px; line-height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
              color: color-mix(in srgb, var(--c, var(--aq-idle)) 60%, var(--primary-text-color)); }
  .tile.idle .ts { color: var(--secondary-text-color); }
  .tile .tb { position: absolute; top: 8px; right: 8px; width: 7px; height: 7px; border-radius: 50%; background: var(--c, var(--aq-idle)); }

  /* ── Gauges ── */
  .gauges { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
  .gauge { display: flex; flex-direction: column; gap: 5px; padding: 8px 10px; border-radius: 10px; min-width: 0;
           background: var(--secondary-background-color, rgba(127,127,127,.08)); }
  .g-head { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--secondary-text-color); min-width: 0; }
  .g-head .icon { width: 16px; height: 16px; color: var(--c, var(--secondary-text-color)); }
  .g-label { flex: 1 1 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .g-value { font-size: 15px; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; }
  .g-value small { font-size: 11px; font-weight: 400; margin-left: 2px; color: var(--secondary-text-color); }
  .gauge:is(.warn, .crit) .g-value { color: color-mix(in srgb, var(--c) 55%, var(--primary-text-color)); }
  .g-track { position: relative; height: 6px; border-radius: 3px; }
  .g-mark { position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%; transform: translate(-50%, -50%); box-sizing: border-box;
            background: var(--card-background-color, #fff); border: 3px solid color-mix(in srgb, var(--c, var(--aq-idle)) 75%, var(--primary-text-color));
            transition: left .6s ease; }
  .g-range { font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* ── In-card confirmation popup at the top of the card (not centered) ── */
  ha-card.dialog-open { min-height: 160px; }
  .backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.45); display: flex; align-items: flex-start; justify-content: center;
              padding-top: 12px; box-sizing: border-box; z-index: 9; border-radius: inherit; }
  .modal { background: var(--card-background-color, #1c1c1c); color: var(--primary-text-color); width: min(92%, 340px); box-sizing: border-box;
           border-radius: 14px; padding: 16px; box-shadow: 0 8px 30px rgba(0,0,0,.4); display: flex; flex-direction: column; gap: 12px; }
  .modal .msg { font-size: 14px; line-height: 1.4; }
  .modal-actions { display: flex; justify-content: flex-end; gap: 8px; }
  /* A narrow card keeps the water, the light and the substrate for its texts: no scenery, as on the flight board. */
  @container (max-width: 300px) {
    .banner .scene .decor { display: none; }
    .head { right: 64px; }
  }
  @container (max-width: 240px) {
    .chip { padding: 4px; flex: none; }
    .chip-text { display: none; }
    .head { gap: 8px; padding-left: 10px; }
  }
`;

export const FULL_STYLE = `
  .content { padding: 12px; display: flex; flex-direction: column; gap: 12px; }
  .controls { display: flex; flex-wrap: wrap; gap: 6px; }
  .controls .btn { flex: 1 1 auto; }
  .section-title { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; text-transform: uppercase;
                   letter-spacing: .04em; color: var(--secondary-text-color); margin-bottom: 6px; cursor: pointer; user-select: none; }
  .section-title .icon { width: 16px; height: 16px; }
  .section-title span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .section-title[aria-expanded="false"] { margin-bottom: 0; }
  /* Chevron to the right when folded, down when unfolded. */
  .section-title .chevron { margin-left: auto; width: 16px; height: 16px; transition: transform .2s ease; }
  .section-title[aria-expanded="false"] .chevron { transform: rotate(-90deg); }
  .section-title .count { font-size: 11px; padding: 0 6px; border-radius: 8px; text-transform: none; letter-spacing: 0;
                          background: color-mix(in srgb, var(--c, var(--aq-idle)) 18%, transparent); color: color-mix(in srgb, var(--c, var(--aq-idle)) 55%, var(--primary-text-color)); }
  .advice { display: flex; flex-direction: column; gap: 6px; }
  .tip { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; line-height: 1.35; padding: 6px 10px; border-radius: 10px;
         background: color-mix(in srgb, var(--c, var(--aq-ok)) 10%, transparent); }
  .tip .icon { width: 18px; height: 18px; color: var(--c, var(--aq-ok)); }
  @container (max-width: 300px) {
    .gauges, .tiles { grid-template-columns: minmax(0, 1fr); }
  }
`;

export const MINI_STYLE = `
  :host { --aq-natural-width: 320px; }
  .content { padding: 10px 12px 12px; display: flex; align-items: center; gap: 10px; }
  .info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
  .pills { display: flex; flex-wrap: wrap; gap: 4px; }
  .pill { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; padding: 2px 8px; border-radius: 10px; white-space: nowrap;
          background: var(--secondary-background-color, rgba(127,127,127,.1)); }
  .pill .k { color: var(--secondary-text-color); }
  .pill .v { font-weight: 500; }
  .pill:is(.warn, .crit) .v { color: color-mix(in srgb, var(--c) 55%, var(--primary-text-color)); }
  .line { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--secondary-text-color); min-width: 0; }
  .line .icon { width: 14px; height: 14px; color: var(--c, var(--secondary-text-color)); }
  .line span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line.tip-line { color: color-mix(in srgb, var(--c) 55%, var(--primary-text-color)); }
  .controls { display: flex; gap: 6px; flex: none; }
  @container (max-width: 260px) {
    .content { flex-wrap: wrap; row-gap: 8px; }
    .controls { flex-basis: 100%; justify-content: flex-end; }
  }
`;

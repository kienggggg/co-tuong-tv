(function(){var e=document.createElement(`style`);e.textContent=`:root{--bg-space:#07090e;--bg-surface:#0f131d;--bg-elevated:#181d2c;--border-subtle:rgba(255,255,255,.08);--border-active:rgba(245,158,11,.6);--gold-glow:#f59e0b;--gold-accent:#d97706;--emerald-accent:#10b981;--crimson-accent:#ef4444;--blue-accent:#3b82f6;--ease-spring:cubic-bezier(.34, 1.56, .64, 1);--ease-fluid:cubic-bezier(.16, 1, .3, 1);--font-main:"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;--font-piece:"Noto Serif SC", "KaiTi", "STKaiti", "Songti SC", "SimSun", "Microsoft YaHei", serif;--font-title:"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif}*{box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin:0;padding:0}html,body{background-color:var(--bg-space);color:#f1f5f9;width:100vw;height:100vh;font-family:var(--font-main);background-image:radial-gradient(circle at 50% 0,rgba(217,119,6,.08) 0%,transparent 60%),radial-gradient(circle at 10% 90%,rgba(16,185,129,.04) 0%,transparent 40%),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px);background-size:100% 100%,100% 100%,48px 48px,48px 48px;overflow:hidden}.glass-panel{border:1px solid var(--border-subtle);background:rgba(15,19,29,.94);border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,.5)}.tv-app-layout{flex-direction:column;gap:1.5vh;width:100vw;height:100vh;padding:1.5vh 2vw;display:flex}.tv-main-stage{flex:1;justify-content:center;align-items:center;width:100%;min-height:0;display:flex;overflow:hidden}.board-section{flex-shrink:0;justify-content:center;align-items:center;height:100%;max-height:92vh;display:flex}.board-outer-layout{justify-content:center;align-items:center;height:90vh;max-height:940px;display:flex}.board-canvas-container{cursor:pointer;pointer-events:auto;border-radius:20px;flex-shrink:0;width:89vh;min-width:480px;max-width:930px;height:89vh;min-height:480px;max-height:930px;margin:0 10px;position:relative}.board-svg{border-radius:20px;width:100%;height:100%;display:block;overflow:visible}.svg-piece-group{transform-box:fill-box;transform-origin:50%;transition:transform .18s cubic-bezier(.34,1.56,.64,1)}.svg-piece-group:hover{-webkit-filter:drop-shadow(0 0 10px rgba(251,191,36,.85));filter:drop-shadow(0 0 10px rgba(251,191,36,.85))}@keyframes svgSpin{0%{stroke-dashoffset:0}to{stroke-dashoffset:60px}}.svg-check-pulse{animation:.9s ease-in-out infinite alternate svgCheckPulse}@keyframes svgCheckPulse{0%{stroke-opacity:.6;fill-opacity:.2;transform:scale(.98)}to{stroke-opacity:1;fill-opacity:.45;transform:scale(1.02)}}.sidebar-section{flex-direction:column;flex-shrink:0;width:max(270px,min(19vw,320px));height:90vh;max-height:940px;margin-left:8px;display:flex}.tv-panel{flex-direction:column;gap:6px;height:100%;padding:10px;display:flex;overflow:hidden}.panel-header{justify-content:space-between;align-items:center;display:flex}.app-title-group{align-items:center;gap:8px;display:flex}.app-title{font-family:var(--font-title);letter-spacing:1.2px;background:linear-gradient(135deg,#fef08a 0%,#f59e0b 50%,#d97706 100%);-webkit-text-fill-color:transparent;-webkit-background-clip:text;font-size:max(18px,min(2.2vh,23px));font-weight:900}.app-badge{color:#fbbf24;background:rgba(245,158,11,.18);border:1.2px solid rgba(245,158,11,.4);border-radius:6px;padding:2px 7px;font-size:11px;font-weight:800}.header-fs-btn{color:#fbbf24;cursor:pointer;background:rgba(245,158,11,.15);border:1.5px solid rgba(245,158,11,.4);border-radius:8px;flex-shrink:0;justify-content:center;align-items:center;width:32px;height:32px;font-size:16px;transition:all .2s;display:flex}.header-fs-btn:hover{color:#000;background:#fbbf24;transform:scale(1.08)}.match-status-card{background:var(--bg-elevated);border:1.5px solid var(--border-subtle);border-radius:10px;flex-direction:column;gap:4px;padding:6px 8px;display:flex}.turn-indicator{align-items:center;gap:8px;display:flex}.turn-disc{width:30px;height:30px;font-family:var(--font-piece);border-radius:50%;flex-shrink:0;justify-content:center;align-items:center;font-size:16px;font-weight:700;display:flex;box-shadow:0 4px 10px rgba(0,0,0,.5)}.turn-info{flex-direction:column;display:flex}.turn-label{color:#94a3b8;letter-spacing:1px;font-size:10px;font-weight:800}.turn-name{color:#f8fafc;font-size:max(14px,min(1.6vh,16px));font-weight:900}.ai-status-badge{color:#38bdf8;background:rgba(56,189,248,.1);border:1px solid rgba(56,189,248,.2);border-radius:6px;align-items:center;gap:6px;padding:2px 6px;font-size:11.5px;font-weight:600;display:flex}.spinner-dot{background-color:#38bdf8;border-radius:50%;width:6px;height:6px;animation:1s infinite alternate spinnerPulse}@keyframes spinnerPulse{0%{opacity:.3;transform:scale(.8)}to{opacity:1;transform:scale(1.4)}}.check-alert-banner{color:#ef4444;text-align:center;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);border-radius:6px;padding:3px 6px;font-size:12px;font-weight:800;animation:1s infinite alternate alertPulse}@keyframes alertPulse{0%{background:rgba(239,68,68,.15)}to{background:rgba(239,68,68,.3)}}.menu-actions{flex-direction:column;flex:1;padding-right:2px;display:flex;overflow-y:auto}.menu-actions .tv-btn{box-sizing:border-box;flex-shrink:0;width:100%;padding:7px 10px;margin-bottom:6px!important}.menu-actions::-webkit-scrollbar{width:4px}.menu-actions::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:4px}.tv-btn{background:var(--bg-surface);color:#e2e8f0;border:1px solid var(--border-subtle);font-family:var(--font-main);cursor:pointer;transition:transform .2s var(--ease-spring), border-color .2s ease, background .2s ease, box-shadow .2s ease;border-radius:10px;outline:none;align-items:center;gap:9px;padding:7px 10px;font-size:max(13px,min(1.5vh,15px));font-weight:700;display:flex;position:relative}.tv-btn .btn-icon{flex-shrink:0;justify-content:center;align-items:center;font-size:17px;display:flex}.tv-btn .btn-text{text-align:left;flex:1}.tv-btn-primary{color:#fef08a;background:linear-gradient(135deg,rgba(245,158,11,.25) 0%,rgba(217,119,6,.15) 100%);border-color:rgba(245,158,11,.4)}.tv-btn:hover,.tv-btn.tv-focused{color:#fff;background:rgba(245,158,11,.22);border-color:#fbbf24;transform:translate(6px)scale(1.02);box-shadow:0 0 20px rgba(245,158,11,.35),0 4px 12px rgba(0,0,0,.5)}.tv-btn:active{transform:translate(4px)scale(.99)}.btn-color-tag{color:#fff;border-radius:6px;justify-content:center;align-items:center;width:22px;height:22px;font-size:13px;font-weight:900;display:flex}.btn-color-tag.red{background-color:#dc2626}.btn-color-tag.green{background-color:#16a34a}.btn-color-tag.yellow{background-color:#ca8a04}.btn-color-tag.blue{background-color:#2563eb}.move-history-card{border:1px solid var(--border-subtle);background:rgba(10,13,20,.6);border-radius:8px;flex-direction:column;flex-shrink:0;gap:3px;padding:5px 8px;display:flex}.history-title{color:#94a3b8;text-transform:uppercase;letter-spacing:.6px;font-size:10.5px;font-weight:800}.history-list{color:#cbd5e1;flex-wrap:wrap;gap:4px;font-size:12px;display:flex}.history-placeholder{color:#64748b;font-size:11.5px;font-style:italic}.history-badge{background:var(--bg-elevated);border:1px solid rgba(255,255,255,.08);border-radius:4px;padding:2px 6px;font-size:12px}.history-badge .h-num{color:#f59e0b;font-weight:700}.tv-bottom-bar-wrapper{height:6vh;min-height:46px}.tv-bottom-bar{justify-content:center;align-items:center;gap:1.5vw;height:100%;padding:0 1.5vw;font-size:max(14px,min(1.7vh,17px));display:flex}.legend-item{align-items:center;gap:10px;display:flex}.legend-separator{color:#475569;font-size:15px}.key-badge{background:var(--bg-elevated);color:#e2e8f0;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:4px 10px;font-size:14px;font-weight:800}.key-badge.dpad{letter-spacing:2.5px;color:#fbbf24}.key-badge.ok{color:#fef08a;background:rgba(245,158,11,.25);border-color:#fbbf24}.color-badge{color:#fff;border-radius:8px;padding:4px 10px;font-size:13px;font-weight:800}.color-badge.red{background-color:#dc2626}.color-badge.green{background-color:#16a34a}.color-badge.yellow{background-color:#ca8a04}.color-badge.blue{background-color:#2563eb}.modal-root{z-index:100;justify-content:center;align-items:center;width:100vw;height:100vh;display:flex;position:fixed;top:0;left:0}.modal-backdrop{background:rgba(0,0,0,.85);justify-content:center;align-items:center;width:100%;height:100%;display:flex;position:absolute;top:0;left:0}.tv-modal{text-align:center;border:2px solid var(--border-active);width:max(400px,min(35vw,550px));animation:modalPop .3s var(--ease-spring);border-radius:20px;flex-direction:column;align-items:center;gap:2vh;padding:3.5vh 2.5vw;display:flex;box-shadow:0 20px 60px rgba(0,0,0,.8),0 0 40px rgba(245,158,11,.3)}@keyframes modalPop{0%{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}.modal-emblem{width:80px;height:80px;font-family:var(--font-piece);color:#dc2626;background:radial-gradient(circle,#fffbeb 0%,#fef3c7 60%,#f59e0b 100%);border:3px solid #b45309;border-radius:50%;justify-content:center;align-items:center;font-size:46px;font-weight:900;display:flex;box-shadow:0 8px 24px rgba(245,158,11,.6)}.tv-modal.win-black .modal-emblem{color:#fef08a;background:radial-gradient(circle,#3f3f46 0%,#27272a 60%,#18181b 100%);border:3px solid #ca8a04;box-shadow:0 8px 24px rgba(202,138,4,.6)}.modal-title{font-family:var(--font-title);color:#fbbf24;letter-spacing:2px;font-size:max(24px,min(3vh,32px));font-weight:900}.modal-desc{color:#cbd5e1;font-size:max(15px,min(1.8vh,18px));line-height:1.5}.modal-actions{gap:1.2vw;width:100%;margin-top:1vh;display:flex}.modal-actions .tv-btn{flex:1;justify-content:center}.virtual-remote-widget{z-index:90;-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);background:rgba(18,22,33,.95);border:2px solid rgba(245,158,11,.5);border-radius:24px;flex-direction:column;align-items:center;gap:14px;width:170px;padding:16px 12px;display:flex;position:fixed;bottom:8vh;right:2vw;box-shadow:0 16px 40px rgba(0,0,0,.8),0 0 20px rgba(245,158,11,.25)}.v-remote-header{justify-content:space-between;align-items:center;width:100%;padding:0 4px;display:flex}.v-remote-title{letter-spacing:1.5px;color:#fbbf24;font-size:11px;font-weight:800}.v-remote-close{color:#94a3b8;cursor:pointer;background:0 0;border:none;font-size:14px}.v-dpad{flex-direction:column;align-items:center;gap:4px;width:100%;display:flex}.v-dpad-middle{align-items:center;gap:4px;display:flex}.v-dpad-btn{color:#fff;cursor:pointer;background:#272f45;border:1px solid rgba(255,255,255,.1);border-radius:8px;justify-content:center;align-items:center;font-size:13px;font-weight:700;transition:all .15s;display:flex}.v-dpad-btn.up,.v-dpad-btn.down{width:44px;height:32px}.v-dpad-btn.left,.v-dpad-btn.right{width:32px;height:44px}.v-dpad-btn.ok{background:#d97706;border-radius:50%;width:44px;height:44px;box-shadow:0 0 10px rgba(245,158,11,.4)}.v-dpad-btn:hover{color:#000;background:#fbbf24}.v-remote-actions{gap:8px;width:100%;display:flex}.v-action-btn{color:#94a3b8;cursor:pointer;background:#1e293b;border:1px solid rgba(255,255,255,.08);border-radius:6px;flex:1;padding:6px 0;font-size:10px;font-weight:700}.v-action-btn:hover{color:#fff;background:#334155}.v-color-buttons{justify-content:space-between;width:100%;padding:0 4px;display:flex}.v-color-btn{cursor:pointer;background:0 0;border:none;font-size:18px;transition:transform .15s}.v-color-btn:hover{transform:scale(1.25)}.eval-bar-wrapper{border-radius:10px;flex-direction:column;flex-shrink:0;align-items:center;gap:6px;width:24px;height:88vh;max-height:920px;margin-right:6px;padding:8px 2px;display:flex}.eval-bar-label{letter-spacing:.5px;font-size:10px;font-weight:800}.eval-bar-label.black{color:#6ee7b7}.eval-bar-label.red{color:#f87171}.eval-track{background:#18181b;border:1px solid rgba(255,255,255,.12);border-radius:8px;flex-direction:column;flex:1;justify-content:flex-end;width:14px;display:flex;position:relative;overflow:hidden}.eval-fill{width:100%;transition:height .4s var(--ease-spring);background:linear-gradient(#ef4444 0%,#dc2626 100%);border-radius:0 0 8px 8px}.eval-marker{background:#fbbf24;width:100%;height:2px;position:absolute;top:50%;left:0;box-shadow:0 0 6px #fbbf24}.eval-score{color:#cbd5e1;font-size:11px;font-weight:800}.vertical-captured-dock{border:1px solid var(--border-subtle);scrollbar-width:none;background:rgba(15,19,29,.65);border-radius:12px;flex-direction:column;flex-shrink:0;align-items:center;gap:6px;width:36px;height:88vh;max-height:920px;margin-right:6px;padding:10px 2px;display:flex;overflow-x:hidden;overflow-y:auto;box-shadow:inset 0 2px 10px rgba(0,0,0,.6)}.vertical-captured-dock::-webkit-scrollbar{display:none}.vertical-captured-dock.black-dock{border-color:rgba(202,138,4,.25)}.vertical-captured-dock.red-dock{border-color:rgba(180,83,9,.35);margin-left:6px;margin-right:0}.mini-piece{width:28px;height:28px;font-family:var(--font-piece);animation:miniPieceDrop .22s var(--ease-spring);border-radius:50%;flex-shrink:0;justify-content:center;align-items:center;font-size:15px;font-weight:900;display:inline-flex;box-shadow:0 3px 8px rgba(0,0,0,.65)}@keyframes miniPieceDrop{0%{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}.mini-piece.piece-red{color:#991b1b;background:radial-gradient(circle at 35% 30%,#fffbeb 0%,#fef3c7 60%,#f59e0b 100%);border:1.5px solid #b45309}.mini-piece.piece-black{color:#fef08a;background:radial-gradient(circle at 35% 30%,#3f3f46 0%,#27272a 60%,#18181b 100%);border:1.5px solid #ca8a04}.board-canvas-container.shake-light{animation:shakeLight .25s var(--ease-spring)}.board-canvas-container.shake-medium{animation:shakeMedium .35s var(--ease-spring)}.board-canvas-container.shake-heavy{animation:shakeHeavy .45s var(--ease-spring)}@keyframes shakeLight{0%,to{transform:translate(0)}25%{transform:translate(-2px,3px)}50%{transform:translate(3px,-2px)}75%{transform:translate(-1px,2px)}}@keyframes shakeMedium{0%,to{transform:translate(0)}20%{transform:translate(-4px,5px)rotate(-.4deg)}40%{transform:translate(5px,-4px)rotate(.4deg)}60%{transform:translate(-3px,3px)rotate(-.2deg)}80%{transform:translate(2px,-2px)}}@keyframes shakeHeavy{0%,to{transform:translate(0)}15%{transform:translate(-7px,8px)scale(1.02)rotate(-.8deg)}30%{transform:translate(8px,-6px)rotate(.8deg)}50%{transform:translate(-5px,5px)rotate(-.4deg)}70%{transform:translate(4px,-3px)rotate(.2deg)}85%{transform:translate(-2px,2px)}}.grand-check-splash{pointer-events:none;z-index:50;justify-content:center;align-items:center;animation:.8s cubic-bezier(.175,.885,.32,1.275) splashZoom;display:flex;position:absolute;top:48%;left:50%;transform:translate(-50%,-50%)}.splash-inner{-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);background:rgba(185,28,28,.92);border:3px solid #fbbf24;border-radius:20px;flex-direction:column;justify-content:center;align-items:center;padding:12px 36px;display:flex;box-shadow:0 0 50px rgba(239,68,68,.9),0 0 20px rgba(251,191,36,.8)}.splash-hanzi{font-family:var(--font-piece);color:#fef08a;text-shadow:0 0 20px rgba(251,191,36,.9);font-size:52px;font-weight:900;line-height:1.1}.splash-text{font-family:var(--font-title);letter-spacing:3px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.8);font-size:22px;font-weight:900}@keyframes splashZoom{0%{opacity:0;transform:translate(-50%,-50%)scale(.3)}60%{opacity:1;transform:translate(-50%,-50%)scale(1.15)}to{opacity:1;transform:translate(-50%,-50%)scale(1)}}.home-screen-root{z-index:85;background-color:var(--bg-space);background-image:radial-gradient(circle at 50% 20%,rgba(217,119,6,.15) 0%,transparent 60%),radial-gradient(circle at 80% 80%,rgba(16,185,129,.08) 0%,transparent 50%),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px);background-size:100% 100%,100% 100%,48px 48px,48px 48px;justify-content:center;align-items:center;width:100vw;height:100vh;display:flex;position:fixed;top:0;left:0;overflow:hidden}.home-screen-layout{box-sizing:border-box;flex-direction:column;justify-content:space-between;align-items:center;width:100%;height:100%;padding:3vh 3vw 2.5vh;display:flex}.home-header{text-align:center;flex-direction:column;align-items:center;gap:12px;display:flex}.home-badge{letter-spacing:2.5px;color:#fbbf24;background:rgba(245,158,11,.18);border:1.5px solid rgba(245,158,11,.45);border-radius:24px;padding:6px 22px;font-size:14px;font-weight:800}.home-title{font-family:var(--font-title);letter-spacing:4px;background:linear-gradient(135deg,#fffbeb 0%,#fef08a 30%,#f59e0b 70%,#b45309 100%);-webkit-text-fill-color:transparent;-webkit-filter:drop-shadow(0 6px 20px rgba(245,158,11,.35));filter:drop-shadow(0 6px 20px rgba(245,158,11,.35));-webkit-background-clip:text;font-size:max(42px,min(6.5vh,66px));font-weight:900}.home-subtitle{color:#94a3b8;letter-spacing:2.5px;font-size:max(16px,min(2.2vh,22px));font-weight:700}.home-cards-track{box-sizing:border-box;flex-direction:row;justify-content:center;align-items:stretch;width:96vw;max-width:1560px;margin:0 auto;padding:10px 0;display:flex}.tv-card{box-sizing:border-box;cursor:pointer;width:22.5%;max-width:22.5%;height:max(380px,min(48vh,480px));transition:transform .25s var(--ease-spring), border-color .25s ease, box-shadow .25s ease, background .25s ease;border-radius:20px;outline:none;flex-direction:column;flex:0 0 22.5%;justify-content:space-between;margin:0 1.25%;padding:24px 18px;display:flex;position:relative}.tv-card .card-icon-emblem{margin-bottom:14px;font-size:64px}.tv-card .card-badge{color:#f59e0b;letter-spacing:1.5px;margin-bottom:6px;font-size:13px;font-weight:800;display:block}.tv-card .card-title{font-family:var(--font-title);color:#fff;margin-bottom:10px;font-size:max(24px,min(3.2vh,32px));font-weight:900;line-height:1.25}.tv-card .card-desc{color:#cbd5e1;margin-bottom:16px;font-size:max(14px,min(1.8vh,17px));line-height:1.55}.tv-card .card-tags{flex-wrap:wrap;gap:8px;display:flex}.tv-card .tag{color:#e2e8f0;background:rgba(255,255,255,.08);border-radius:8px;padding:4px 10px;font-size:13px;font-weight:600}.tv-card .tag.highlight{color:#fef08a;background:rgba(245,158,11,.25);border:1px solid rgba(245,158,11,.5);font-weight:800}.tv-card .card-cta{margin-top:16px}.tv-card .cta-badge{letter-spacing:1.5px;color:#fbbf24;opacity:.95;font-size:14px;font-weight:800}.tv-card:hover,.tv-card.tv-focused{background:rgba(24,30,48,.98);border-color:#fbbf24;transform:translateY(-14px)scale(1.04);box-shadow:0 28px 60px rgba(0,0,0,.85),0 0 45px rgba(245,158,11,.6),0 0 0 3px #fbbf24}.home-bottom-legend{color:#e2e8f0;align-items:center;gap:20px;padding:12px 32px;font-size:16px;display:flex}.legend-pill{align-items:center;gap:10px;font-weight:600;display:flex}.pill-key{background:var(--bg-elevated);color:#fbbf24;border:1.5px solid rgba(255,255,255,.2);border-radius:8px;padding:4px 12px;font-size:14px;font-weight:800}.pill-key.ok{color:#fef08a;background:rgba(245,158,11,.25);border-color:#fbbf24}.home-submodal-root{z-index:100;justify-content:center;align-items:center;width:100vw;height:100vh;display:flex;position:fixed;top:0;left:0}.home-modal-backdrop{-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);background:rgba(0,0,0,.8);justify-content:center;align-items:center;width:100%;height:100%;display:flex;position:absolute;top:0;left:0}.home-modal-box{border:2px solid var(--border-active);width:max(440px,min(40vw,620px));animation:modalPop .3s var(--ease-spring);border-radius:20px;flex-direction:column;gap:18px;padding:32px 28px;display:flex;box-shadow:0 24px 60px rgba(0,0,0,.9),0 0 30px rgba(245,158,11,.3)}.h-modal-title{font-family:var(--font-title);color:#fbbf24;letter-spacing:2px;text-align:center;font-size:max(26px,min(3.2vh,32px));font-weight:900}.h-modal-desc{color:#cbd5e1;text-align:center;font-size:16px}.h-config-group{flex-direction:column;gap:10px;display:flex}.h-config-label{color:#e2e8f0;font-size:15px;font-weight:700}.h-pill-selector{gap:10px;display:flex}.h-pill-btn{background:var(--bg-surface);border:1.5px solid var(--border-subtle);color:#cbd5e1;font-family:var(--font-main);cursor:pointer;border-radius:12px;flex:1;padding:12px 14px;font-size:15px;font-weight:700;transition:all .2s}.h-pill-btn.active{color:#fff;background:rgba(245,158,11,.25);border-color:#fbbf24;box-shadow:0 0 14px rgba(245,158,11,.4)}.h-pill-btn.highlight-gold.active{color:#fef08a;background:linear-gradient(135deg,rgba(245,158,11,.4) 0%,rgba(217,119,6,.3) 100%);border-color:#fbbf24}.h-modal-actions{gap:14px;margin-top:8px;display:flex}.h-modal-actions .tv-btn{flex:1;justify-content:center}.puzzle-list-items{flex-direction:column;gap:10px;max-height:320px;display:flex;overflow-y:auto}.puzzle-item{cursor:pointer;border-radius:12px;padding:14px 18px;transition:all .2s}.puzzle-item:hover{background:rgba(245,158,11,.18);border-color:#fbbf24;transform:translate(4px)}.p-header{justify-content:space-between;align-items:center;margin-bottom:4px;display:flex}.p-title{color:#fbbf24;font-size:15px;font-weight:800}.p-diff{color:#fbbf24;background:rgba(245,158,11,.15);border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700}.p-desc{color:#cbd5e1;margin-bottom:6px;font-size:12px;line-height:1.4}.p-hint{color:#6ee7b7;font-size:11px;font-style:italic}.help-grid{text-align:left;gap:16px;display:flex}.help-section{background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:12px;flex-direction:column;flex:1;gap:6px;padding:14px;display:flex}.help-section h3{color:#fbbf24;margin-bottom:4px;font-size:14px}.help-section p{color:#cbd5e1;font-size:12px;line-height:1.5}.chess-clocks-wrapper{background:rgba(15,23,42,.75);border:1px solid rgba(245,158,11,.25);border-radius:12px;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;padding:8px 10px;display:flex}.clock-display-card{background:rgba(24,24,27,.88);border:1.5px solid rgba(255,255,255,.1);border-radius:8px;flex-direction:column;flex:1;align-items:center;min-width:0;padding:4px 6px;transition:all .25s cubic-bezier(.34,1.56,.64,1);display:flex}.clock-display-card.clock-red{border-color:rgba(239,68,68,.25)}.clock-display-card.clock-black{border-color:rgba(148,163,184,.25)}.clock-badge{align-items:center;gap:5px;margin-bottom:2px;display:flex}.clock-disc-mini{width:20px;height:20px;font-size:12px;font-weight:900;font-family:var(--font-piece);border-radius:50%;justify-content:center;align-items:center;display:flex}.clock-name{letter-spacing:1px;color:#cbd5e1;font-size:11px;font-weight:800}.clock-time{font-family:var(--font-main);letter-spacing:1px;font-size:max(20px,min(2.4vh,23px));font-weight:900;line-height:1.1}.clock-red .clock-time{color:#f87171;text-shadow:0 0 12px rgba(239,68,68,.5)}.clock-black .clock-time{color:#f1f5f9;text-shadow:0 0 12px rgba(226,232,240,.5)}.clock-vs-pill{color:#ca8a04;background:rgba(202,138,4,.15);border:1px solid rgba(202,138,4,.3);border-radius:6px;padding:4px 8px;font-size:13px;font-weight:900}.clock-display-card.clock-active{background:rgba(39,39,42,.96);border-color:#fbbf24;transform:scale(1.03);box-shadow:0 0 16px rgba(251,191,36,.5)}.clock-display-card.clock-active .clock-name{color:#fbbf24}.clock-display-card.clock-warning{animation:.8s infinite alternate clockUrgentPulse;background:rgba(153,27,27,.45)!important;border-color:#ef4444!important}@keyframes clockUrgentPulse{0%{transform:scale(1.02);box-shadow:0 0 8px rgba(239,68,68,.5)}to{transform:scale(1.07);box-shadow:0 0 22px rgba(239,68,68,.95)}}.svg-piece-group{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.svg-piece-lifted{-webkit-filter:url(#pieceLiftedShadow)!important;filter:url(#pieceLiftedShadow)!important}.svg-human-arm-group{pointer-events:none;transition:opacity .2s}.svg-selected-spin{transform-origin:50%;animation:10s linear infinite spinSelected}@keyframes spinSelected{to{stroke-dashoffset:60px}}.svg-beacon-expand{animation:1.6s ease-out infinite beaconPulse}@keyframes beaconPulse{0%{r:34px;opacity:.8}to{r:52px;opacity:0}}.svg-muzzle-flash{animation:.15s ease-out forwards muzzleFlashFade}@keyframes muzzleFlashFade{0%{opacity:1;transform:scale(.6)}to{opacity:0;transform:scale(2.4)}}.tv-toast-popup{color:#fef08a;opacity:0;pointer-events:none;z-index:99999;background:rgba(15,23,42,.96);border:2px solid #f59e0b;border-radius:40px;padding:12px 32px;font-size:22px;font-weight:800;transition:all .22s cubic-bezier(.16,1,.3,1);position:fixed;top:36px;left:50%;transform:translate(-50%)translateY(-24px);box-shadow:0 10px 30px rgba(0,0,0,.85),0 0 20px rgba(245,158,11,.45)}.tv-toast-popup.show{opacity:1;transform:translate(-50%)translateY(0)}
/*$vite$:1*/`,document.head.appendChild(e);function t(e){"@babel/helpers - typeof";return t=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},t(e)}function n(e,n){if(t(e)!=`object`||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var i=r.call(e,n||`default`);if(t(i)!=`object`)return i;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(n===`string`?String:Number)(e)}function r(e){var r=n(e,`string`);return t(r)==`symbol`?r:r+``}function i(e,t,n){return(t=r(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?a(Object(n),!0).forEach(function(t){i(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var s={RED:`r`,BLACK:`b`},c={K:{hanzi:`帥`,name:`Tướng`,role:`king`,side:`r`},A:{hanzi:`仕`,name:`Sĩ`,role:`advisor`,side:`r`},E:{hanzi:`相`,name:`Tượng`,role:`elephant`,side:`r`},H:{hanzi:`傌`,name:`Mã`,role:`horse`,side:`r`},R:{hanzi:`俥`,name:`Xe`,role:`chariot`,side:`r`},C:{hanzi:`炮`,name:`Pháo`,role:`cannon`,side:`r`},P:{hanzi:`兵`,name:`Binh`,role:`pawn`,side:`r`},k:{hanzi:`將`,name:`Tướng`,role:`king`,side:`b`},a:{hanzi:`士`,name:`Sĩ`,role:`advisor`,side:`b`},e:{hanzi:`象`,name:`Tượng`,role:`elephant`,side:`b`},h:{hanzi:`馬`,name:`Mã`,role:`horse`,side:`b`},r:{hanzi:`車`,name:`Xe`,role:`chariot`,side:`b`},c:{hanzi:`砲`,name:`Pháo`,role:`cannon`,side:`b`},p:{hanzi:`卒`,name:`Tốt`,role:`pawn`,side:`b`}},l=`rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RHEAKAEHR w - - 0 1`,u=class{constructor(e=l){this.board=Array(10).fill(null).map(()=>Array(9).fill(null)),this.turn=s.RED,this.history=[],this.moveLog=[],this.isGameOver=!1,this.winner=null,this.winReason=``,this.loadFromFen(e)}reset(){this.board=Array(10).fill(null).map(()=>Array(9).fill(null)),this.turn=s.RED,this.history=[],this.moveLog=[],this.isGameOver=!1,this.winner=null,this.winReason=``,this.loadFromFen(l)}endGameByTimeout(e){this.isGameOver=!0,this.winner=e===s.RED?s.BLACK:s.RED;let t=e===s.RED?`Bên Đỏ`:`Bên Đen`,n=this.winner===s.RED?`Bên Đỏ`:`Bên Đen`;this.winReason=`${t} hết thời gian thi đấu! ${n} chiến thắng!`}loadFromFen(e){let t=e.trim().split(/\s+/),n=t[0].split(`/`);this.board=Array(10).fill(null).map(()=>Array(9).fill(null));for(let e=0;e<10;e++){let t=n[e],r=0;for(let n=0;n<t.length;n++){let i=t[n];if(i>=`1`&&i<=`9`)r+=parseInt(i,10);else{let t=i;i===`B`?t=`E`:i===`b`?t=`e`:i===`N`?t=`H`:i===`n`&&(t=`h`),this.board[e][r]=t,r++}}}t[1]&&(this.turn=t[1]===`w`||t[1]===`r`?s.RED:s.BLACK)}toFen(){let e=``;for(let t=0;t<10;t++){let n=0;for(let r=0;r<9;r++){let i=this.board[t][r];i?(n>0&&(e+=n,n=0),e+=i):n++}n>0&&(e+=n),t<9&&(e+=`/`)}return e+=` ${this.turn===s.RED?`r`:`b`} - - 0 1`,e}getPiece(e,t){return e<0||e>9||t<0||t>8?null:this.board[e][t]}getPieceSide(e){return e?e===e.toUpperCase()?s.RED:s.BLACK:null}isInPalace(e,t,n){return t<3||t>5?!1:n===s.RED?e>=7&&e<=9:e>=0&&e<=2}hasCrossedRiver(e,t){return t===s.RED?e<=4:e>=5}findKing(e){let t=e===s.RED?`K`:`k`,n=e===s.RED?7:0,r=e===s.RED?9:2;for(let e=n;e<=r;e++)for(let n=3;n<=5;n++)if(this.board[e][n]===t)return{r:e,c:n};for(let e=0;e<10;e++)for(let n=0;n<9;n++)if(this.board[e][n]===t)return{r:e,c:n};return null}isFlyingGeneral(){let e=this.findKing(s.RED),t=this.findKing(s.BLACK);if(!e||!t||e.c!==t.c)return!1;let n=e.c,r=Math.min(e.r,t.r)+1,i=Math.max(e.r,t.r);for(let e=r;e<i;e++)if(this.board[e][n])return!1;return!0}generateMovesForPiece(e,t){let n=this.board[e][t];if(!n)return[];let r=this.getPieceSide(n),i=n.toLowerCase(),a=[],o=(i,o)=>{if(i<0||i>9||o<0||o>8)return!1;let s=this.board[i][o];return s?(this.getPieceSide(s)!==r&&a.push({from:{r:e,c:t},to:{r:i,c:o},piece:n,captured:s}),!1):(a.push({from:{r:e,c:t},to:{r:i,c:o},piece:n,captured:null}),!0)};switch(i){case`k`:for(let[n,i]of[[-1,0],[1,0],[0,-1],[0,1]]){let a=e+n,s=t+i;this.isInPalace(a,s,r)&&o(a,s)}break;case`a`:for(let[n,i]of[[-1,-1],[-1,1],[1,-1],[1,1]]){let a=e+n,s=t+i;this.isInPalace(a,s,r)&&o(a,s)}break;case`e`:{let n=[{dr:-2,dc:-2,eyeR:e-1,eyeC:t-1},{dr:-2,dc:2,eyeR:e-1,eyeC:t+1},{dr:2,dc:-2,eyeR:e+1,eyeC:t-1},{dr:2,dc:2,eyeR:e+1,eyeC:t+1}];for(let i of n){let n=e+i.dr,a=t+i.dc;n<0||n>9||a<0||a>8||r===s.RED&&n<5||r===s.BLACK&&n>4||i.eyeR<0||i.eyeR>9||i.eyeC<0||i.eyeC>8||this.board[i.eyeR][i.eyeC]===null&&o(n,a)}break}case`h`:{let n=[{legR:e-1,legC:t,targets:[[e-2,t-1],[e-2,t+1]]},{legR:e+1,legC:t,targets:[[e+2,t-1],[e+2,t+1]]},{legR:e,legC:t-1,targets:[[e-1,t-2],[e+1,t-2]]},{legR:e,legC:t+1,targets:[[e-1,t+2],[e+1,t+2]]}];for(let e of n)if(e.legR>=0&&e.legR<=9&&e.legC>=0&&e.legC<=8&&this.board[e.legR][e.legC]===null)for(let[t,n]of e.targets)o(t,n);break}case`r`:for(let[i,o]of[[-1,0],[1,0],[0,-1],[0,1]]){let s=e+i,c=t+o;for(;s>=0&&s<=9&&c>=0&&c<=8;){let l=this.board[s][c];if(!l)a.push({from:{r:e,c:t},to:{r:s,c},piece:n,captured:null});else{this.getPieceSide(l)!==r&&a.push({from:{r:e,c:t},to:{r:s,c},piece:n,captured:l});break}s+=i,c+=o}}break;case`c`:for(let[i,o]of[[-1,0],[1,0],[0,-1],[0,1]]){let s=e+i,c=t+o,l=!1;for(;s>=0&&s<=9&&c>=0&&c<=8;){let u=this.board[s][c];if(!l)u?l=!0:a.push({from:{r:e,c:t},to:{r:s,c},piece:n,captured:null});else if(u){this.getPieceSide(u)!==r&&a.push({from:{r:e,c:t},to:{r:s,c},piece:n,captured:u});break}s+=i,c+=o}}break;case`p`:o(e+(r===s.RED?-1:1),t),this.hasCrossedRiver(e,r)&&(o(e,t-1),o(e,t+1))}return a}isCheck(e){let t=this.findKing(e);if(!t)return!0;let n=t.r,r=t.c,i=e===s.RED,a=i?`p`:`P`,o=i?`h`:`H`,c=i?`r`:`R`,l=i?`c`:`C`,u=i?`k`:`K`,d=i?n-1:n+1;if(d>=0&&d<=9&&this.board[d][r]===a||r>0&&this.board[n][r-1]===a||r<8&&this.board[n][r+1]===a||n>0&&r>0&&this.board[n-1][r-1]===null&&(n>=2&&this.board[n-2][r-1]===o||r>=2&&this.board[n-1][r-2]===o)||n>0&&r<8&&this.board[n-1][r+1]===null&&(n>=2&&this.board[n-2][r+1]===o||r<=6&&this.board[n-1][r+2]===o)||n<9&&r>0&&this.board[n+1][r-1]===null&&(n<=7&&this.board[n+2][r-1]===o||r>=2&&this.board[n+1][r-2]===o)||n<9&&r<8&&this.board[n+1][r+1]===null&&(n<=7&&this.board[n+2][r+1]===o||r<=6&&this.board[n+1][r+2]===o))return!0;let f=[[-1,0],[1,0],[0,-1],[0,1]];for(let e=0;e<4;e++){let t=f[e][0],i=f[e][1],a=n+t,o=r+i,s=0;for(;a>=0&&a<=9&&o>=0&&o<=8;){let e=this.board[a][o];if(e){if(s===0){if(e===c||e===u)return!0;s=1}else if(s===1){if(e===l)return!0;break}}a+=t,o+=i}}return!1}getLegalMoves(e=this.turn){let t=[];for(let n=0;n<10;n++)for(let r=0;r<9;r++){let i=this.board[n][r];if(i&&this.getPieceSide(i)===e){let i=this.generateMovesForPiece(n,r);for(let n of i){this.makeMoveInternal(n);let r=this.isCheck(e),i=this.isFlyingGeneral();this.undoMoveInternal(n),!r&&!i&&t.push(n)}}}return t}getLegalMovesForPiece(e,t){let n=this.board[e][t];if(!n||this.getPieceSide(n)!==this.turn)return[];let r=this.generateMovesForPiece(e,t),i=[];for(let e of r){this.makeMoveInternal(e);let t=this.isCheck(this.turn),n=this.isFlyingGeneral();this.undoMoveInternal(e),!t&&!n&&i.push(e)}return i}makeMoveInternal(e){this.board[e.to.r][e.to.c]=e.piece,this.board[e.from.r][e.from.c]=null}undoMoveInternal(e){this.board[e.from.r][e.from.c]=e.piece,this.board[e.to.r][e.to.c]=e.captured}getNotation(e){let t=c[e.piece];if(!t)return``;let n=t.side,r=n===s.RED?9-e.from.c:e.from.c+1,i=n===s.RED?9-e.to.c:e.to.c+1,a=t.name,o=e.to.r-e.from.r;if(e.from.r===e.to.r)return`${a} ${r} bình ${i}`;let l=(n===s.RED?o<0:o>0)?`tiến`:`thoái`;return[`Mã`,`Tượng`,`Sĩ`].includes(a)?`${a} ${r} ${l} ${i}`:`${a} ${r} ${l} ${Math.abs(o)}`}makeMove(e){if(this.isGameOver)return!1;let t=this.getLegalMovesForPiece(e.from.r,e.from.c).find(t=>t.to.r===e.to.r&&t.to.c===e.to.c);if(!t)return!1;let n=this.getNotation(t);if(this.history.push(o(o({},t),{},{notation:n,turn:this.turn,fenBefore:this.toFen()})),this.moveLog.push(n),this.makeMoveInternal(t),this.turn=this.turn===s.RED?s.BLACK:s.RED,this.getLegalMoves(this.turn).length===0){this.isGameOver=!0;let e=this.isCheck(this.turn);this.winner=this.turn===s.RED?s.BLACK:s.RED;let t=this.winner===s.RED?`Bên Đỏ`:`Bên Đen`;this.winReason=e?`Chiếu bí! ${t} giành chiến thắng!`:`Hết nước đi (Vây khốn)! ${t} giành chiến thắng!`}return!0}undo(){if(this.history.length===0)return null;let e=this.history.pop();return this.moveLog.pop(),this.undoMoveInternal(e),this.turn=e.turn,this.isGameOver=!1,this.winner=null,this.winReason=``,e}getLastMove(){return this.history.length>0?this.history[this.history.length-1]:null}},d=[{name:`Trung Pháo (Pháo Đầu)`,moves:[{from:{r:7,c:1},to:{r:7,c:4}},{from:{r:7,c:7},to:{r:7,c:4}}]},{name:`Khởi Mã Cuộc`,moves:[{from:{r:9,c:1},to:{r:7,c:2}},{from:{r:9,c:7},to:{r:7,c:6}}]},{name:`Tiên Nhân Chỉ Lộ`,moves:[{from:{r:6,c:2},to:{r:5,c:2}},{from:{r:6,c:6},to:{r:5,c:6}}]},{name:`Phi Tượng Cuộc`,moves:[{from:{r:9,c:2},to:{r:7,c:4}},{from:{r:9,c:6},to:{r:7,c:4}}]}],f=[{from:{r:0,c:1},to:{r:2,c:2}},{from:{r:0,c:7},to:{r:2,c:6}},{from:{r:2,c:1},to:{r:2,c:4}},{from:{r:2,c:7},to:{r:2,c:4}}],p=[{id:`puzzle-1`,title:`Đơn Mã Ẩm Tuyền (Ngựa uống nước suối)`,description:`Thế cờ tàn nghệ thuật: Đỏ đi trước, dùng Xe và Mã phối hợp khóa chặt cung cấm của Đen.`,difficulty:`Kỳ thủ`,fen:`3k5/4a4/4b4/9/9/9/9/4H4/4R4/4K4 w - - 0 1`,solutionHint:`Xe 5 tiến 1 ép Tướng Đen lộ diện, sau đó Mã nhảy ngọa tào chiếu bí!`},{id:`puzzle-2`,title:`Khổng Minh Mượn Tên`,description:`Thế cờ Pháo ngòi liên hoàn: Đỏ đi trước chiếu bí trong 3 nước.`,difficulty:`Cao thủ`,fen:`3ak4/4a4/9/9/9/9/9/1C5C1/4R4/4K4 w - - 0 1`,solutionHint:`Dùng Xe làm ngòi cho Pháo sau lộn vào giữa cung cấm!`},{id:`puzzle-3`,title:`Thất Tinh Tụ Hội (Tuyệt phẩm Cờ Thế)`,description:`Ván cờ giang hồ lừng danh: Bên Đỏ quân ít hơn nhưng có thế liên hoàn kích sát.`,difficulty:`Thần cơ`,fen:`2ba1k3/4a4/4b4/p7p/9/9/P7P/4B4/4A4/2BAK4 w - - 0 1`,solutionHint:`Đẩy Binh áp sát bờ sông, tạo thế gọng kìm triệt hạ phòng tuyến.`}];function m(e,t,n,r,i,a,o){try{var s=e[a](o),c=s.value}catch(e){n(e);return}s.done?t(c):Promise.resolve(c).then(r,i)}function h(e){return function(){var t=this,n=arguments;return new Promise(function(r,i){var a=e.apply(t,n);function o(e){m(a,r,i,o,s,`next`,e)}function s(e){m(a,r,i,o,s,`throw`,e)}o(void 0)})}}var g=class extends Error{constructor(){super(`Search timeout`),this.name=`SearchTimeoutException`}},_=class extends Error{constructor(){super(`Search cancelled`),this.name=`SearchCancelledException`}},v={k:1e4,r:900,c:480,h:420,e:220,a:220,p:100},y=[[0,3,6,9,12,9,6,3,0],[20,40,60,90,130,90,60,40,20],[16,30,48,70,90,70,48,30,16],[12,22,34,40,48,40,34,22,12],[8,14,20,22,26,22,20,14,8],[0,0,0,0,0,0,0,0,0],[0,0,-2,0,4,0,-2,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],b=[[4,8,16,12,4,12,16,8,4],[4,12,32,18,10,18,32,12,4],[12,16,20,24,22,24,20,16,12],[10,26,22,28,24,28,22,26,10],[8,18,16,22,20,22,16,18,8],[6,14,18,16,14,16,18,14,6],[4,8,10,8,12,8,10,8,4],[4,4,8,8,6,8,8,4,4],[0,2,4,4,-2,4,4,2,0],[0,-4,0,0,0,0,0,-4,0]],x=[[6,4,0,-10,-12,-10,0,4,6],[2,2,0,-4,-14,-4,0,2,2],[2,2,2,-10,-8,-10,2,2,2],[0,2,-2,6,14,6,-2,2,0],[0,2,2,4,10,4,2,2,0],[-2,2,6,4,8,4,6,2,-2],[0,0,0,4,6,4,0,0,0],[4,0,4,0,2,0,4,0,4],[0,2,0,0,0,0,0,2,0],[0,0,0,2,-4,2,0,0,0]],S=[[16,16,14,20,18,20,14,16,16],[18,22,20,26,28,26,20,22,18],[14,14,14,20,20,20,14,14,14],[14,20,18,24,24,24,18,20,14],[14,16,14,20,20,20,14,16,14],[14,18,16,20,22,20,16,18,14],[8,12,10,16,16,16,10,12,8],[6,10,8,16,14,16,8,10,6],[10,6,10,18,10,18,10,6,10],[0,12,8,16,14,16,8,12,0]],C=class{constructor(e=`medium`){this.difficulty=e,this.cancelled=!1}setDifficulty(e){this.difficulty=e}getOpeningMove(e){if(e.history.length===0){let t=d[Math.floor(Math.random()*d.length)],n=t.moves[Math.floor(Math.random()*t.moves.length)];return e.getLegalMoves().find(e=>e.from.r===n.from.r&&e.from.c===n.from.c&&e.to.r===n.to.r&&e.to.c===n.to.c)||null}if(e.history.length===1&&e.turn===s.BLACK){let t=e.getLastMove();if(t.to.r===7&&t.to.c===4){let t=f[Math.floor(Math.random()*f.length)];return e.getLegalMoves().find(e=>e.from.r===t.from.r&&e.from.c===t.from.c&&e.to.r===t.to.r&&e.to.c===t.to.c)||null}}return null}evaluate(e){let t=0,n=e.board,r=0,i=0,a=0,o=0;for(let e=0;e<10;e++)for(let s=0;s<9;s++){let c=n[e][s];if(!c)continue;let l=c===c.toUpperCase(),u=c.toLowerCase(),d=v[u]||0;u===`a`?l?r++:a++:u===`e`&&(l?i++:o++);let f=0,p=l?e:9-e;u===`p`?(f=y[p][s],l&&e<=2&&(f+=35),!l&&e>=7&&(f+=35)):u===`h`?f=b[p][s]:u===`c`?(f=x[p][s],s===4&&(f+=20)):u===`r`&&(f=S[p][s],l&&e<=3&&(f+=15),!l&&e>=6&&(f+=15));let m=d+f;t+=l?m:-m}let s=r*25+i*20,c=a*25+o*20;return t+=s-c,t}getEvaluationScore(e){let t=this.evaluate(e);return Math.max(-100,Math.min(100,Math.round(t/800*100)))}scoreMove(e){if(e.captured){let t=v[e.captured.toLowerCase()]||0,n=v[e.piece.toLowerCase()]||0;return 1e4+t*10-n}return 0}quiescence(e,t,n,r,i=2){if(this.nodeCount++,!(this.nodeCount&63)){if(this.cancelled)throw new _;if(performance.now()>=this.deadline)throw new g}let a=this.evaluate(e);if(i<=0)return a;if(r){if(a>=n)return n;a>t&&(t=a);let r=e.getLegalMoves(s.RED).filter(e=>e.captured);if(r.length===0)return a;r.sort((e,t)=>this.scoreMove(t)-this.scoreMove(e));for(let a=0;a<r.length;a++){let o=r[a];e.makeMoveInternal(o);let s=this.quiescence(e,t,n,!1,i-1);if(e.undoMoveInternal(o),s>=n)return n;s>t&&(t=s)}return t}{if(a<=t)return t;a<n&&(n=a);let r=e.getLegalMoves(s.BLACK).filter(e=>e.captured);if(r.length===0)return a;r.sort((e,t)=>this.scoreMove(t)-this.scoreMove(e));for(let a=0;a<r.length;a++){let o=r[a];e.makeMoveInternal(o);let s=this.quiescence(e,t,n,!0,i-1);if(e.undoMoveInternal(o),s<=t)return t;s<n&&(n=s)}return n}}alphaBeta(e,t,n,r,i){if(this.nodeCount++,!(this.nodeCount&63)){if(this.cancelled)throw new _;if(performance.now()>=this.deadline)throw new g}if(t<=0||e.isGameOver){let t=this.difficulty===`easy`?1:2;return this.quiescence(e,n,r,i,t)}let a=i?s.RED:s.BLACK,o=e.getLegalMoves(a);if(o.length===0)return e.isCheck(a),i?-25e3-t:25e3+t;if(o.sort((e,t)=>this.scoreMove(t)-this.scoreMove(e)),i){let i=-1/0;for(let a=0;a<o.length;a++){let s=o[a];e.makeMoveInternal(s);let c=this.alphaBeta(e,t-1,n,r,!1);if(e.undoMoveInternal(s),c>i&&(i=c),i>n&&(n=i),r<=n)break}return i}{let i=1/0;for(let a=0;a<o.length;a++){let s=o[a];e.makeMoveInternal(s);let c=this.alphaBeta(e,t-1,n,r,!0);if(e.undoMoveInternal(s),c<i&&(i=c),i<r&&(r=i),r<=n)break}return i}}rootSearch(e,t,n,r){let i=n?s.RED:s.BLACK,a=e.getLegalMoves(i);if(a.length===0)return{score:0,move:null};a.sort((e,t)=>{let n=r&&e.from.r===r.from.r&&e.from.c===r.from.c&&e.to.r===r.to.r&&e.to.c===r.to.c,i=r&&t.from.r===r.from.r&&t.from.c===r.from.c&&t.to.r===r.to.r&&t.to.c===r.to.c;return n?-1:i?1:this.scoreMove(t)-this.scoreMove(e)});let o=a[0],c=-1/0,l=1/0;if(n){let n=-1/0;for(let r=0;r<a.length;r++){let i=a[r];if(this.nodeCount++,!(this.nodeCount&63)){if(this.cancelled)throw new _;if(performance.now()>=this.deadline)throw new g}e.makeMoveInternal(i);let s=this.alphaBeta(e,t-1,c,l,!1);if(e.undoMoveInternal(i),s>n&&(n=s,o=i),n>c&&(c=n),l<=c)break}return{score:n,move:o}}{let n=1/0;for(let r=0;r<a.length;r++){let i=a[r];if(this.nodeCount++,!(this.nodeCount&63)){if(this.cancelled)throw new _;if(performance.now()>=this.deadline)throw new g}e.makeMoveInternal(i);let s=this.alphaBeta(e,t-1,c,l,!0);if(e.undoMoveInternal(i),s<n&&(n=s,o=i),n<l&&(l=n),l<=c)break}return{score:n,move:o}}}getBestMove(e){var t=this;return h(function*(){let n=e.turn,r=n===s.RED,i=e.getLegalMoves(n);if(i.length===0)return null;let a=t.getOpeningMove(e);if(a)return yield new Promise(e=>setTimeout(e,200)),a;let o={easy:600,medium:1600,hard:2400,master:3e3}[t.difficulty]||1800;t.deadline=performance.now()+o,t.nodeCount=0;let c={easy:1,medium:3,hard:4,master:5}[t.difficulty]||3;if(t.difficulty===`easy`&&Math.random()<.25)return yield new Promise(e=>setTimeout(e,200)),i[Math.floor(Math.random()*i.length)];let l=i[0],u=r?-1/0:1/0;for(let n=1;n<=c&&!(t.cancelled||performance.now()>=t.deadline);n++)try{if(yield new Promise(e=>setTimeout(e,4)),t.cancelled)return null;let i=t.rootSearch(e,n,r,l);if(t.cancelled)return null;if(i&&i.move&&(l=i.move,u=i.score),Math.abs(u)>2e4)break}catch(e){if(e instanceof _)return null;if(e instanceof g)break;throw e}return l})()}},w=new class{constructor(){this.ctx=null,this.isMuted=!1,this.volume=.85,this.speechEnabled=!0,this.onShakeScreen=null}init(){if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e)}this.ctx&&this.ctx.state===`suspended`&&this.ctx.resume()}setShakeCallback(e){this.onShakeScreen=e}toggleMute(){return this.isMuted=!this.isMuted,this.isMuted}setVolume(e){this.volume=Math.max(0,Math.min(1,e))}triggerScreenShake(e=`medium`){this.onShakeScreen&&this.onShakeScreen(e)}speakVoice(e){if(!this.isMuted&&this.speechEnabled&&window.speechSynthesis)try{window.speechSynthesis.cancel();let t=new SpeechSynthesisUtterance(e);t.lang=`vi-VN`,t.rate=1.1,t.pitch=1,t.volume=this.volume;let n=window.speechSynthesis.getVoices().find(e=>e.lang&&e.lang.startsWith(`vi`));n&&(t.voice=n),window.speechSynthesis.speak(t)}catch(e){}}playNavigate(){if(this.isMuted)return;let e=performance.now();if(!(this._lastNavTime&&e-this._lastNavTime<50)&&(this._lastNavTime=e,this.init(),this.ctx))try{let e=this.ctx.createOscillator(),t=this.ctx.createGain(),n=this.ctx.currentTime;e.type=`sine`,e.frequency.setValueAtTime(440,n),e.frequency.exponentialRampToValueAtTime(220,n+.025),t.gain.setValueAtTime(.06*this.volume,n),t.gain.exponentialRampToValueAtTime(.001,n+.025),e.connect(t),t.connect(this.ctx.destination),e.start(n),e.stop(n+.025)}catch(e){}}playSelect(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.createOscillator(),t=this.ctx.createGain(),n=this.ctx.currentTime;e.type=`triangle`,e.frequency.setValueAtTime(540,n),e.frequency.exponentialRampToValueAtTime(720,n+.04),t.gain.setValueAtTime(.12*this.volume,n),t.gain.exponentialRampToValueAtTime(.001,n+.05),e.connect(t),t.connect(this.ctx.destination),e.start(n),e.stop(n+.05)}catch(e){}}playMove(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.setValueAtTime(140,e),t.frequency.exponentialRampToValueAtTime(45,e+.09),n.gain.setValueAtTime(.65*this.volume,e),n.gain.exponentialRampToValueAtTime(.001,e+.09),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.09);let r=this.ctx.sampleRate*.045,i=this.ctx.createBuffer(1,r,this.ctx.sampleRate),a=i.getChannelData(0);for(let e=0;e<r;e++)a[e]=(Math.random()*2-1)*Math.exp(-e/(this.ctx.sampleRate*.007));let o=this.ctx.createBufferSource();o.buffer=i;let s=this.ctx.createBiquadFilter();s.type=`bandpass`,s.frequency.setValueAtTime(1500,e),s.Q.setValueAtTime(3.5,e);let c=this.ctx.createGain();c.gain.setValueAtTime(.75*this.volume,e),c.gain.exponentialRampToValueAtTime(.001,e+.045),o.connect(s),s.connect(c),c.connect(this.ctx.destination),o.start(e);let l=this.ctx.createOscillator(),u=this.ctx.createGain();l.type=`triangle`,l.frequency.setValueAtTime(260,e),l.frequency.exponentialRampToValueAtTime(180,e+.08),u.gain.setValueAtTime(.25*this.volume,e),u.gain.exponentialRampToValueAtTime(.001,e+.08),l.connect(u),u.connect(this.ctx.destination),l.start(e),l.stop(e+.08),this.triggerScreenShake(`light`)}catch(e){}}playCapture(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.setValueAtTime(180,e),t.frequency.exponentialRampToValueAtTime(30,e+.16),n.gain.setValueAtTime(1*this.volume,e),n.gain.exponentialRampToValueAtTime(.001,e+.16),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.16);let r=this.ctx.sampleRate*.08,i=this.ctx.createBuffer(1,r,this.ctx.sampleRate),a=i.getChannelData(0);for(let e=0;e<r;e++)a[e]=(Math.random()*2-1)*Math.exp(-e/(this.ctx.sampleRate*.014));let o=this.ctx.createBufferSource();o.buffer=i;let s=this.ctx.createBiquadFilter();s.type=`bandpass`,s.frequency.setValueAtTime(1100,e),s.Q.setValueAtTime(2.2,e);let c=this.ctx.createGain();c.gain.setValueAtTime(.95*this.volume,e),c.gain.exponentialRampToValueAtTime(.001,e+.08),o.connect(s),s.connect(c),c.connect(this.ctx.destination),o.start(e);let l=this.ctx.createOscillator(),u=this.ctx.createGain();l.type=`triangle`,l.frequency.setValueAtTime(320,e),l.frequency.exponentialRampToValueAtTime(90,e+.12),u.gain.setValueAtTime(.45*this.volume,e),u.gain.exponentialRampToValueAtTime(.001,e+.12),l.connect(u),u.connect(this.ctx.destination),l.start(e),l.stop(e+.12),this.triggerScreenShake(`heavy`)}catch(e){}}playCheck(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime;[220,329.63,440,554.37].forEach((t,n)=>{let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(t,e+n*.03);let a=e+n*.03;i.gain.setValueAtTime(.3*this.volume,a),i.gain.exponentialRampToValueAtTime(.001,a+1.2),r.connect(i),i.connect(this.ctx.destination),r.start(a),r.stop(a+1.25)}),this.triggerScreenShake(`medium`),setTimeout(()=>{this.speakVoice(`Chiếu tướng!`)},150)}catch(e){}}playVictory(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=[523.25,587.33,659.25,783.99,880,1046.5],n=[.16,.16,.16,.22,.22,.7],r=0;t.forEach((t,i)=>{let a=this.ctx.createOscillator(),o=this.ctx.createGain();a.type=`triangle`,a.frequency.setValueAtTime(t,e+r);let s=n[i];o.gain.setValueAtTime(.25*this.volume,e+r),o.gain.exponentialRampToValueAtTime(.001,e+r+s),a.connect(o),o.connect(this.ctx.destination),a.start(e+r),a.stop(e+r+s+.05),r+=s*.85}),setTimeout(()=>{this.speakVoice(`Chiếu bí! Chiến thắng vang dội!`)},600)}catch(e){}}playDefeat(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=[440,392,349.23,293.66],n=0;t.forEach((t,r)=>{let i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=`sine`,i.frequency.setValueAtTime(t,e+n);let o=.35;a.gain.setValueAtTime(.2*this.volume,e+n),a.gain.exponentialRampToValueAtTime(.001,e+n+o),i.connect(a),a.connect(this.ctx.destination),i.start(e+n),i.stop(e+n+o+.05),n+=o*.75}),setTimeout(()=>{this.speakVoice(`Ván cờ kết thúc!`)},700)}catch(e){}}playError(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(140,e),t.frequency.setValueAtTime(110,e+.08),n.gain.setValueAtTime(.18*this.volume,e),n.gain.exponentialRampToValueAtTime(.001,e+.16),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.16)}catch(e){}}playCannonBlast(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(320,e),t.frequency.exponentialRampToValueAtTime(80,e+.12),n.gain.setValueAtTime(.4*this.volume,e),n.gain.exponentialRampToValueAtTime(.001,e+.12),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.12);let r=this.ctx.sampleRate*.28,i=this.ctx.createBuffer(1,r,this.ctx.sampleRate),a=i.getChannelData(0);for(let e=0;e<r;e++)a[e]=(Math.random()*2-1)*Math.exp(-e/(this.ctx.sampleRate*.05));let o=this.ctx.createBufferSource();o.buffer=i;let s=this.ctx.createBiquadFilter();s.type=`lowpass`,s.frequency.setValueAtTime(800,e+.04),s.frequency.exponentialRampToValueAtTime(120,e+.28);let c=this.ctx.createGain();c.gain.setValueAtTime(1*this.volume,e+.04),c.gain.exponentialRampToValueAtTime(.001,e+.28),o.connect(s),s.connect(c),c.connect(this.ctx.destination),o.start(e+.04);let l=this.ctx.createOscillator(),u=this.ctx.createGain();l.type=`sine`,l.frequency.setValueAtTime(120,e+.04),l.frequency.exponentialRampToValueAtTime(25,e+.35),u.gain.setValueAtTime(1*this.volume,e+.04),u.gain.exponentialRampToValueAtTime(.001,e+.35),l.connect(u),u.connect(this.ctx.destination),l.start(e+.04),l.stop(e+.35),this.triggerScreenShake(`heavy`)}catch(e){}}playChariotCharge(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(600,e),t.frequency.exponentialRampToValueAtTime(180,e+.12),n.gain.setValueAtTime(.35*this.volume,e),n.gain.exponentialRampToValueAtTime(.001,e+.14),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.14),setTimeout(()=>this.playCapture(),40),this.triggerScreenShake(`heavy`)}catch(e){}}playHorseKick(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(650,e),t.frequency.exponentialRampToValueAtTime(850,e+.05),t.frequency.exponentialRampToValueAtTime(520,e+.12),n.gain.setValueAtTime(.22*this.volume,e),n.gain.exponentialRampToValueAtTime(.001,e+.12),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.12),setTimeout(()=>{let e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type=`triangle`,e.frequency.setValueAtTime(320,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(70,this.ctx.currentTime+.08),t.gain.setValueAtTime(.6*this.volume,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.08),e.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.08),setTimeout(()=>{this.playCapture(),this.triggerScreenShake(`heavy`)},50)},30)}catch(e){}}playElephantTuskGore(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(240,e),t.frequency.exponentialRampToValueAtTime(460,e+.08),t.frequency.exponentialRampToValueAtTime(180,e+.18),n.gain.setValueAtTime(.35*this.volume,e),n.gain.exponentialRampToValueAtTime(.001,e+.18),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.18),setTimeout(()=>{let e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type=`sine`,e.frequency.setValueAtTime(160,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(30,this.ctx.currentTime+.22),t.gain.setValueAtTime(1*this.volume,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.22),e.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.22),this.playCapture(),this.triggerScreenShake(`heavy`)},40)}catch(e){}}playAdvisorSlash(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(1400,e),t.frequency.exponentialRampToValueAtTime(350,e+.07),n.gain.setValueAtTime(.35*this.volume,e),n.gain.exponentialRampToValueAtTime(.001,e+.07),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.07);let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sawtooth`,r.frequency.setValueAtTime(1600,e+.06),r.frequency.exponentialRampToValueAtTime(400,e+.14),i.gain.setValueAtTime(.4*this.volume,e+.06),i.gain.exponentialRampToValueAtTime(.001,e+.14),r.connect(i),i.connect(this.ctx.destination),r.start(e+.06),r.stop(e+.14),setTimeout(()=>this.triggerScreenShake(`medium`),60)}catch(e){}}playKingRoar(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime;[130.81,196,261.63,392,523.25].forEach((t,n)=>{let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(t,e+n*.02),i.gain.setValueAtTime(.35*this.volume,e+n*.02),i.gain.exponentialRampToValueAtTime(.001,e+n*.02+.9),r.connect(i),i.connect(this.ctx.destination),r.start(e+n*.02),r.stop(e+n*.02+.95)}),this.triggerScreenShake(`heavy`)}catch(e){}}playSoldierThrust(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`triangle`,t.frequency.setValueAtTime(750,e),t.frequency.exponentialRampToValueAtTime(140,e+.09),n.gain.setValueAtTime(.5*this.volume,e),n.gain.exponentialRampToValueAtTime(.001,e+.09),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.09),this.playMove(),this.triggerScreenShake(`light`)}catch(e){}}playPieceCapture(e){if(!e){this.playCapture();return}switch(e.toUpperCase()){case`C`:this.playCannonBlast();break;case`R`:this.playChariotCharge();break;case`H`:this.playHorseKick();break;case`E`:this.playElephantTuskGore();break;case`A`:this.playAdvisorSlash();break;case`K`:this.playKingRoar();break;case`P`:this.playSoldierThrust();break;default:this.playCapture()}}playClockTick(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`triangle`,t.frequency.setValueAtTime(880,e),t.frequency.exponentialRampToValueAtTime(440,e+.02),n.gain.setValueAtTime(.08*this.volume,e),n.gain.exponentialRampToValueAtTime(.001,e+.02),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.02)}catch(e){}}playTimeOut(){if(!this.isMuted&&(this.init(),this.ctx))try{let e=this.ctx.currentTime;[350,280,200].forEach((t,n)=>{let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sawtooth`,r.frequency.setValueAtTime(t,e+n*.12),i.gain.setValueAtTime(.25*this.volume,e+n*.12),i.gain.exponentialRampToValueAtTime(.001,e+n*.12+.16),r.connect(i),i.connect(this.ctx.destination),r.start(e+n*.12),r.stop(e+n*.12+.17)}),setTimeout(()=>{this.speakVoice(`Hết giờ thi đấu!`)},500)}catch(e){}}};function T(e,t){if(e){if(!t){for(;e.firstChild;)e.removeChild(e.firstChild);return}try{if(e.innerHTML=t,e.firstChild)return}catch(e){}for(;e.firstChild;)e.removeChild(e.firstChild);try{let n=document.createElement(`div`);n.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`+t+`</svg>`;let r=n.firstChild;for(;r&&r.firstChild;)e.appendChild(r.firstChild);if(e.firstChild)return}catch(e){}try{let n=new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${t}</svg>`,`image/svg+xml`).documentElement;for(;n&&n.firstChild;)e.appendChild(document.importNode?document.importNode(n.firstChild,!0):n.firstChild)}catch(e){console.error(`SVG fallback error:`,e)}}}var E=class{constructor(e,t={}){var n;this.container=e,this.showVietnameseLabels=(n=t.showVietnameseLabels)!=null&&n,this.onCellClick=t.onCellClick||(()=>{}),this.onCellHover=t.onCellHover||(()=>{}),this.selectedSquare=null,this.legalMoves=[],this.lastMove=null,this.cursor={r:9,c:4},this.isCheck=!1,this.checkedKing=null,this.boardWidth=780,this.boardHeight=780,this.paddingX=66,this.paddingY=66,this.cellWidth=(this.boardWidth-2*this.paddingX)/8,this.cellHeight=(this.boardHeight-2*this.paddingY)/9,this.pieceRadius=34,this.initDOM()}getPointCoords(e,t){return{x:this.paddingX+t*this.cellWidth,y:this.paddingY+e*this.cellHeight}}generateGridLinesSVG(){let e=``;for(let t=0;t<10;t++){let n=this.paddingY+t*this.cellHeight,r=this.paddingX,i=this.paddingX+8*this.cellWidth;e+=`<line x1="${r}" y1="${n}" x2="${i}" y2="${n}" />`}for(let t=0;t<9;t++){let n=this.paddingX+t*this.cellWidth;t===0||t===8?e+=`<line x1="${n}" y1="${this.paddingY}" x2="${n}" y2="${this.paddingY+9*this.cellHeight}" />`:(e+=`<line x1="${n}" y1="${this.paddingY}" x2="${n}" y2="${this.paddingY+4*this.cellHeight}" />`,e+=`<line x1="${n}" y1="${this.paddingY+5*this.cellHeight}" x2="${n}" y2="${this.paddingY+9*this.cellHeight}" />`)}let t=this.getPointCoords(0,3),n=this.getPointCoords(2,5),r=this.getPointCoords(0,5),i=this.getPointCoords(2,3);e+=`<line x1="${t.x}" y1="${t.y}" x2="${n.x}" y2="${n.y}" />`,e+=`<line x1="${r.x}" y1="${r.y}" x2="${i.x}" y2="${i.y}" />`;let a=this.getPointCoords(7,3),o=this.getPointCoords(9,5),s=this.getPointCoords(7,5),c=this.getPointCoords(9,3);return e+=`<line x1="${a.x}" y1="${a.y}" x2="${o.x}" y2="${o.y}" />`,e+=`<line x1="${s.x}" y1="${s.y}" x2="${c.x}" y2="${c.y}" />`,e}generateCrossMarkersSVG(){let e=``,t=[{r:2,c:1},{r:2,c:7},{r:7,c:1},{r:7,c:7},{r:3,c:0,rightOnly:!0},{r:3,c:2},{r:3,c:4},{r:3,c:6},{r:3,c:8,leftOnly:!0},{r:6,c:0,rightOnly:!0},{r:6,c:2},{r:6,c:4},{r:6,c:6},{r:6,c:8,leftOnly:!0}],n=4.5,r=6.5;for(let i of t){let{x:t,y:a}=this.getPointCoords(i.r,i.c);i.rightOnly||(e+=`<path d="M ${t-n-r} ${a-n} L ${t-n} ${a-n} L ${t-n} ${a-n-r}" fill="none" />`),i.leftOnly||(e+=`<path d="M ${t+n+r} ${a-n} L ${t+n} ${a-n} L ${t+n} ${a-n-r}" fill="none" />`),i.rightOnly||(e+=`<path d="M ${t-n-r} ${a+n} L ${t-n} ${a+n} L ${t-n} ${a+n+r}" fill="none" />`),i.leftOnly||(e+=`<path d="M ${t+n+r} ${a+n} L ${t+n} ${a+n} L ${t+n} ${a+n+r}" fill="none" />`)}return e}initDOM(){let e=this.generateGridLinesSVG(),t=this.generateCrossMarkersSVG();this.container.innerHTML=`
      <div class="board-outer-layout" id="board-outer-layout">
        <!-- Vertical Evaluation Bar -->
        <div class="eval-bar-wrapper glass-panel" id="eval-bar-wrapper" title="Thanh đo thế trận">
          <div class="eval-bar-label black">ĐEN</div>
          <div class="eval-track">
            <div class="eval-fill" id="eval-fill" style="height: 50%;"></div>
            <div class="eval-marker"></div>
          </div>
          <div class="eval-bar-label red">ĐỎ</div>
          <div class="eval-score" id="eval-score">0.0</div>
        </div>

        <!-- Left Vertical Dock: Black Pieces Captured -->
        <div class="vertical-captured-dock black-dock glass-panel" id="dock-pieces-black" title="Khay quân Đen bị bắt"></div>

        <!-- Main Board Canvas Container -->
        <div class="board-canvas-container" id="board-canvas-container" style="width: 89vh; height: 89vh; min-width: 480px; min-height: 480px; max-width: 930px; max-height: 930px; flex-shrink: 0;">
            <svg class="board-svg" id="main-board-svg" viewBox="0 0 ${this.boardWidth} ${this.boardHeight}" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <!-- Wood Grain Textures & Filters -->
                <radialGradient id="boardWoodGrad" cx="50%" cy="45%" r="70%">
                  <stop offset="0%" stop-color="#4a2a16" />
                  <stop offset="40%" stop-color="#3b1f0e" />
                  <stop offset="80%" stop-color="#2a1407" />
                  <stop offset="100%" stop-color="#1c0b03" />
                </radialGradient>

                <!-- Gold Calligraphy Foil Gradient -->
                <linearGradient id="goldFoilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fffbeb" />
                  <stop offset="30%" stop-color="#fef08a" />
                  <stop offset="70%" stop-color="#eab308" />
                  <stop offset="100%" stop-color="#92400e" />
                </linearGradient>

                <!-- Red Piece Natural Boxwood (Gỗ hoàng dương vàng ngà) -->
                <radialGradient id="redPieceWood" cx="35%" cy="32%" r="68%">
                  <stop offset="0%" stop-color="#fffef0" />
                  <stop offset="30%" stop-color="#fef3c7" />
                  <stop offset="70%" stop-color="#f59e0b" />
                  <stop offset="95%" stop-color="#b45309" />
                  <stop offset="100%" stop-color="#78350f" />
                </radialGradient>

                <!-- Black Piece Antique Ebony (Gỗ mun sừng đen tuyền ánh than) -->
                <radialGradient id="blackPieceWood" cx="35%" cy="32%" r="68%">
                  <stop offset="0%" stop-color="#3f3f46" />
                  <stop offset="30%" stop-color="#27272a" />
                  <stop offset="75%" stop-color="#18181b" />
                  <stop offset="95%" stop-color="#09090b" />
                  <stop offset="100%" stop-color="#000000" />
                </radialGradient>

                <!-- Realistic Piece Drop Shadow Filter -->
                <filter id="pieceElevationShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#000000" flood-opacity="0.75" />
                </filter>
                <filter id="pieceLiftedShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#000000" flood-opacity="0.85" />
                </filter>

                <!-- Board Frame Bevel Shadow -->
                <filter id="boardPlateShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="14" stdDeviation="24" flood-color="#000000" flood-opacity="0.9" />
                </filter>

                <!-- Human Hand Natural Skin Tone -->
                <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fff1e6" />
                  <stop offset="40%" stop-color="#f8cba6" />
                  <stop offset="85%" stop-color="#e2a37f" />
                  <stop offset="100%" stop-color="#c47e56" />
                </linearGradient>

                <!-- Imperial Crimson Silk Robe (Bên Đỏ) -->
                <linearGradient id="redSleeveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#b91c1c" />
                  <stop offset="35%" stop-color="#881337" />
                  <stop offset="80%" stop-color="#4c0519" />
                  <stop offset="100%" stop-color="#2a030d" />
                </linearGradient>

                <!-- Midnight Obsidian Silk Robe (Bên Đen / AI) -->
                <linearGradient id="blackSleeveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#334155" />
                  <stop offset="35%" stop-color="#1e293b" />
                  <stop offset="80%" stop-color="#0f172a" />
                  <stop offset="100%" stop-color="#020617" />
                </linearGradient>

                <!-- Cannon Fiery Projectile Grad -->
                <radialGradient id="fireballGrad" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stop-color="#ffffff" />
                  <stop offset="25%" stop-color="#fef08a" />
                  <stop offset="60%" stop-color="#f97316" />
                  <stop offset="90%" stop-color="#dc2626" />
                  <stop offset="100%" stop-color="#7f1d1d" />
                </radialGradient>

                <!-- Imperial Dragon Gold Aura Grad -->
                <radialGradient id="dragonAuraGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
                  <stop offset="35%" stop-color="#fde047" stop-opacity="0.85" />
                  <stop offset="70%" stop-color="#ea580c" stop-opacity="0.5" />
                  <stop offset="100%" stop-color="#ca8a04" stop-opacity="0" />
                </radialGradient>

                <!-- Ivory Tusks Gradient for Elephant Tusk Gore -->
                <linearGradient id="ivoryTuskGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stop-color="#b45309" />
                  <stop offset="25%" stop-color="#fef3c7" />
                  <stop offset="70%" stop-color="#ffffff" />
                  <stop offset="100%" stop-color="#fffbeb" />
                </linearGradient>

                <!-- Steel Horse Hoof Gradient -->
                <linearGradient id="steelHoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#f8fafc" />
                  <stop offset="35%" stop-color="#94a3b8" />
                  <stop offset="75%" stop-color="#475569" />
                  <stop offset="100%" stop-color="#1e293b" />
                </linearGradient>
              </defs>

              <!-- Board Solid Hardwood Plate (Hardware-accelerated rendering) -->
              <rect x="0" y="0" width="${this.boardWidth}" height="${this.boardHeight}" rx="20" fill="url(#boardWoodGrad)" stroke="#78350f" stroke-width="3.5" />
              <rect x="10" y="10" width="${this.boardWidth-20}" height="${this.boardHeight-20}" rx="15" fill="none" stroke="#ca8a04" stroke-opacity="0.35" stroke-width="1.8" />

              <!-- Board Outer Inlay Gold Border -->
              <rect x="${this.paddingX-12}" y="${this.paddingY-12}" width="${8*this.cellWidth+24}" height="${9*this.cellHeight+24}" fill="none" stroke="#ca8a04" stroke-width="3.5" rx="6" />
              <rect x="${this.paddingX-5}" y="${this.paddingY-5}" width="${8*this.cellWidth+10}" height="${9*this.cellHeight+10}" fill="none" stroke="#ca8a04" stroke-width="1.2" stroke-opacity="0.7" />

              <!-- Grid Lines Layer -->
              <g id="grid-lines" stroke="#ca8a04" stroke-width="1.8" stroke-opacity="0.85">${e}</g>

              <!-- River Calligraphy (Sở Hà - Hán Giới) -->
              <g class="river-text" fill="url(#goldFoilGrad)" font-family="'Noto Serif SC', 'Songti SC', 'SimSun', serif" font-weight="900" font-size="28" letter-spacing="14">
                <text x="${this.paddingX+1.7*this.cellWidth}" y="${this.paddingY+4.58*this.cellHeight}" text-anchor="middle">楚 河</text>
                <text x="${this.paddingX+6.3*this.cellWidth}" y="${this.paddingY+4.58*this.cellHeight}" text-anchor="middle">漢 界</text>
              </g>

              <!-- River Vietnamese Subtitles -->
              <g class="river-sub" fill="#ca8a04" fill-opacity="0.55" font-family="'Be Vietnam Pro', sans-serif" font-size="11" font-weight="800" letter-spacing="3">
                <text x="${this.paddingX+1.7*this.cellWidth}" y="${this.paddingY+4.88*this.cellHeight}" text-anchor="middle">SỞ HÀ</text>
                <text x="${this.paddingX+6.3*this.cellWidth}" y="${this.paddingY+4.88*this.cellHeight}" text-anchor="middle">HÁN GIỚI</text>
              </g>

              <!-- Traditional Cross Markings -->
              <g id="cross-markers" stroke="#ca8a04" stroke-width="1.5" stroke-opacity="0.8">${t}</g>

              <!-- Move Highlights & Markers Layer -->
              <g id="svg-highlights-layer"></g>

              <!-- Unified SVG Pieces Layer -->
              <g id="svg-pieces-layer"></g>

              <!-- Flying Elevated Piece Layer (during motion) -->
              <g id="svg-flying-piece-layer"></g>

              <!-- Real Human Arm & Hand Layer (gắp và di chuyển quân) -->
              <g id="svg-arm-layer"></g>

              <!-- Dynamic Particle & Capture FX Layer -->
              <g id="svg-fx-layer"></g>

              <!-- TV Remote Reticle (Cursor) - Pre-rendered for 0ms transform latency -->
              <g id="svg-tv-cursor" class="svg-reticle-group" transform="translate(-100, -100)">
                <path d="M -35 -24 L -35 -35 L -24 -35" fill="none" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" />
                <path d="M 24 -35 L 35 -35 L 35 -24" fill="none" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" />
                <path d="M -35 24 L -35 35 L -24 35" fill="none" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" />
                <path d="M 24 35 L 35 35 L 35 24" fill="none" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" />
                <circle cx="0" cy="0" r="3" fill="#fbbf24" opacity="0.9" />
              </g>

              <!-- Grand Check Splash Calligraphy -->
              <g id="svg-check-splash" style="display: none;"></g>
            </svg>
          </div>

          <!-- Right Vertical Dock: Red Pieces Captured -->
          <div class="vertical-captured-dock red-dock glass-panel" id="dock-pieces-red" title="Khay quân Đỏ bị bắt"></div>
        </div>
    `,this.svgEl=this.container.querySelector(`#main-board-svg`),this.canvasContainer=this.container.querySelector(`#board-canvas-container`),this.highlightsLayer=this.container.querySelector(`#svg-highlights-layer`),this.piecesLayer=this.container.querySelector(`#svg-pieces-layer`),this.flyingPieceLayer=this.container.querySelector(`#svg-flying-piece-layer`),this.armLayer=this.container.querySelector(`#svg-arm-layer`),this.fxLayer=this.container.querySelector(`#svg-fx-layer`),this.tvCursorEl=this.container.querySelector(`#svg-tv-cursor`),this.checkSplashEl=this.container.querySelector(`#svg-check-splash`),this.isAnimating=!1,this.setupMouseEvents(),this.updateTVCursor(this.cursor.r,this.cursor.c),this.adjustBoardDimensions(),window.addEventListener(`resize`,()=>{this.adjustBoardDimensions()})}adjustBoardDimensions(){if(!this.canvasContainer)return;let e=document.getElementById(`main-stage`),t=e?e.clientHeight*.96:window.innerHeight*.9,n=e?(e.clientWidth-310)*.98:window.innerWidth*.62,r=Math.round(Math.max(540,Math.min(880,Math.min(t,n))));this.canvasContainer.style.width=r+`px`,this.canvasContainer.style.height=r+`px`}triggerScreenShake(e=`medium`){this.canvasContainer&&(this.canvasContainer.classList.remove(`shake-light`,`shake-medium`,`shake-heavy`),this.canvasContainer.offsetWidth,this.canvasContainer.classList.add(`shake-${e}`),setTimeout(()=>{this.canvasContainer&&this.canvasContainer.classList.remove(`shake-${e}`)},450))}getBoardCellFromEvent(e){if(!this.svgEl)return null;let t=this.svgEl.getBoundingClientRect();if(t.width===0||t.height===0)return null;let n=this.boardWidth/t.width,r=this.boardHeight/t.height,i=(e.clientX-t.left)*n,a=(e.clientY-t.top)*r,o=Math.round((i-this.paddingX)/this.cellWidth),s=Math.round((a-this.paddingY)/this.cellHeight);if(s>=0&&s<=9&&o>=0&&o<=8){let{x:e,y:t}=this.getPointCoords(s,o);if(Math.hypot(i-e,a-t)<=this.cellWidth*.65)return{r:s,c:o}}return null}setupMouseEvents(){if(!this.canvasContainer)return;let e=-1,t=-1;this.canvasContainer.addEventListener(`mousemove`,n=>{let r=this.getBoardCellFromEvent(n);r&&(r.r!==e||r.c!==t)&&(e=r.r,t=r.c,this.onCellHover(r.r,r.c))},{passive:!0}),this.canvasContainer.addEventListener(`click`,e=>{if(this.isAnimating)return;let t=this.getBoardCellFromEvent(e);t&&this.onCellClick(t.r,t.c)}),this.canvasContainer.addEventListener(`touchstart`,e=>{if(!this.isAnimating&&e.touches&&e.touches.length>0){let t=e.touches[0],n=this.getBoardCellFromEvent(t);n&&(this.onCellHover(n.r,n.c),this.onCellClick(n.r,n.c))}},{passive:!0})}updateTVCursor(e,t){if(this.cursor={r:e,c:t},!this.tvCursorEl)return;if(e<0||t<0){this.tvCursorEl.style.display=`none`;return}let{x:n,y:r}=this.getPointCoords(e,t);this.tvCursorEl.setAttribute(`transform`,`translate(${n}, ${r})`),this.tvCursorEl.style.display=``}toggleVietnameseLabels(e){return this.showVietnameseLabels=e===void 0?!this.showVietnameseLabels:e,this.showVietnameseLabels}updateEvalBar(e){let t=this.container.querySelector(`#eval-fill`),n=this.container.querySelector(`#eval-score`);if(!t||!n)return;let r=50+e/2;t.style.height=`${Math.max(5,Math.min(95,r))}%`;let i=(e/20).toFixed(1);n.textContent=e>0?`+${i}`:i,n.style.color=e>0?`#f87171`:e<0?`#e2e8f0`:`#cbd5e1`}updateCapturedPieces(e){let t=this.container.querySelector(`#dock-pieces-black`),n=this.container.querySelector(`#dock-pieces-red`);if(!t||!n)return;let r={K:1,A:2,E:2,H:2,R:2,C:2,P:5,k:1,a:2,e:2,h:2,r:2,c:2,p:5},i={};for(let t=0;t<10;t++)for(let n=0;n<9;n++){let r=e.board[t][n];r&&(i[r]=(i[r]||0)+1)}let a=[],o=[];for(let[e,t]of Object.entries(r)){let n=i[e]||0,r=Math.max(0,t-n);for(let t=0;t<r;t++)e===e.toUpperCase()?o.push(e):a.push(e)}t.innerHTML=a.map(e=>{let t=c[e];return`<span class="mini-piece piece-black" title="${t.name}">${t.hanzi}</span>`}).join(``),n.innerHTML=o.map(e=>{let t=c[e];return`<span class="mini-piece piece-red" title="${t.name}">${t.hanzi}</span>`}).join(``)}render(e,t={}){let n=e.board;this.selectedSquare=t.selectedSquare||null,this.legalMoves=t.legalMoves||[],this.lastMove=t.lastMove||e.getLastMove(),this.isCheck=e.isCheck(e.turn),this.checkedKing=this.isCheck?e.findKing(e.turn):null,t.evalScore!==void 0&&this.updateEvalBar(t.evalScore),this.updateCapturedPieces(e),this.checkSplashEl&&(this.isCheck?(this.checkSplashEl.style.display=`block`,T(this.checkSplashEl,`
          <g transform="translate(${this.boardWidth/2}, ${this.boardHeight/2})">
            <!-- Backdrop Glow -->
            <rect x="-160" y="-55" width="320" height="110" rx="20" fill="#991b1b" fill-opacity="0.95" stroke="#fbbf24" stroke-width="3" filter="url(#pieceElevationShadow)" />
            <text x="0" y="-4" text-anchor="middle" font-family="'Noto Serif SC', serif" font-size="44" font-weight="900" fill="#fef08a">將 軍</text>
            <text x="0" y="34" text-anchor="middle" font-family="'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" fill="#ffffff" letter-spacing="3">CHIẾU TƯỚNG!</text>
          </g>
        `)):(this.checkSplashEl.style.display=`none`,T(this.checkSplashEl,``))),this.renderHighlights(),this.renderPieces(n)}renderHighlights(){let e=``;if(this.lastMove){let t=this.getPointCoords(this.lastMove.from.r,this.lastMove.from.c),n=this.getPointCoords(this.lastMove.to.r,this.lastMove.to.c);e+=`
        <!-- Origin -->
        <circle cx="${t.x}" cy="${t.y}" r="${this.pieceRadius+2}" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="4 3" />
        <!-- Destination -->
        <circle cx="${n.x}" cy="${n.y}" r="${this.pieceRadius+3}" fill="#f59e0b" fill-opacity="0.35" stroke="#fbbf24" stroke-width="2.5" />
      `}if(this.selectedSquare){let t=this.getPointCoords(this.selectedSquare.r,this.selectedSquare.c);e+=`
        <circle cx="${t.x}" cy="${t.y}" r="${this.pieceRadius+5}" fill="none" stroke="#fbbf24" stroke-width="3" stroke-dasharray="6 4" class="svg-selected-spin" />
        <circle cx="${t.x}" cy="${t.y}" r="${this.pieceRadius+2}" fill="#f59e0b" fill-opacity="0.25" />
      `}for(let t of this.legalMoves){let{x:n,y:r}=this.getPointCoords(t.to.r,t.to.c);if(t.captured){let t=this.pieceRadius+4;e+=`
          <g transform="translate(${n}, ${r})">
            <path d="M ${-t} ${-t+10} L ${-t} ${-t} L ${-t+10} ${-t}" fill="none" stroke="#ef4444" stroke-width="3" />
            <path d="M ${t-10} ${-t} L ${t} ${-t} L ${t} ${-t+10}" fill="none" stroke="#ef4444" stroke-width="3" />
            <path d="M ${-t} ${t-10} L ${-t} ${t} L ${-t+10} ${t}" fill="none" stroke="#ef4444" stroke-width="3" />
            <path d="M ${t-10} ${t} L ${t} ${t} L ${t} ${t-10}" fill="none" stroke="#ef4444" stroke-width="3" />
            <circle cx="0" cy="0" r="${this.pieceRadius+1}" fill="#ef4444" fill-opacity="0.2" />
          </g>
        `}else e+=`
          <circle cx="${n}" cy="${r}" r="6" fill="#fbbf24" />
          <circle cx="${n}" cy="${r}" r="14" fill="none" stroke="#fbbf24" stroke-width="1.6" opacity="0.75" />
        `}if(this.checkedKing){let{x:t,y:n}=this.getPointCoords(this.checkedKing.r,this.checkedKing.c);e+=`
        <circle cx="${t}" cy="${n}" r="${this.pieceRadius+8}" fill="#ef4444" fill-opacity="0.3" stroke="#dc2626" stroke-width="3.5" class="svg-check-pulse" />
      `}T(this.highlightsLayer,e)}renderPieces(e,t=null){this.currentBoard=e;let n=``;for(let r=0;r<10;r++)for(let i=0;i<9;i++){if(t&&t.r===r&&t.c===i)continue;let a=e[r][i];if(!a)continue;let o=c[a];if(!o)continue;let l=o.side===s.RED,u=this.selectedSquare&&this.selectedSquare.r===r&&this.selectedSquare.c===i;this.legalMoves.some(e=>e.to.r===r&&e.to.c===i&&e.captured);let{x:d,y:f}=this.getPointCoords(r,i),p=l?`url(#redPieceWood)`:`url(#blackPieceWood)`,m=l?`#78350f`:`#09090b`,h=l?`#b91c1c`:`#ca8a04`,g=l?`#b91c1c`:`#fef08a`,_=l?`#991b1b`:`#fef08a`,v=u?f-4:f,y=u?6:2.5,b=u?.45:.28,x=``;if(!this.showVietnameseLabels)x=`
            <text x="0" y="1"
                  text-anchor="middle"
                  dominant-baseline="central"
                  alignment-baseline="central"
                  font-family="'Noto Serif SC', 'KaiTi', 'STKaiti', 'Songti SC', 'SimSun', 'Microsoft YaHei', serif"
                  font-size="46"
                  font-weight="900"
                  fill="${g}"
                  style="text-shadow: 1px 1px 2px rgba(0,0,0,0.65);">
              ${o.hanzi}
            </text>
          `;else{let e=o.name.toUpperCase();x=`
            <text x="0" y="1"
                  text-anchor="middle"
                  dominant-baseline="central"
                  alignment-baseline="central"
                  font-family="'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif"
                  font-size="${e.length<=2?28:e.length<=4?22:19}"
                  font-weight="900"
                  fill="${_}"
                  letter-spacing="0.5"
                  style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
              ${e}
            </text>
          `}n+=`
          <g class="svg-piece-group ${l?`red`:`black`} ${u?`selected`:``}"
             transform="translate(${d}, ${v})"
             style="cursor: pointer; transition: transform 0.2s ease-out;">

            <!-- 0. Zero-Overhead Hardware-Accelerated Vector Shadow -->
            <circle cx="0" cy="${y}" r="${this.pieceRadius}" fill="#000000" opacity="${b}" />

            <!-- 1. Turned Solid Wood Disc (Thân cờ gỗ tiện tròn vát mép chuẩn xác) -->
            <circle cx="0" cy="0" r="${this.pieceRadius}" fill="${p}" stroke="${m}" stroke-width="2.2" />

            <!-- 2. Lathe-turned Chamfer Highlight Ring (Viền vát 3D bóng) -->
            <circle cx="0" cy="0" r="${this.pieceRadius-3.5}" fill="none" stroke="${l?`#fef08a`:`#52525b`}" stroke-width="0.8" opacity="0.6" />

            <!-- 3. Recessed Circular Well (Lòng cờ khoét chìm tinh xảo) -->
            <circle cx="0" cy="0" r="${this.pieceRadius-6}" fill="${l?`rgba(254, 243, 199, 0.3)`:`rgba(0, 0, 0, 0.4)`}" stroke="${h}" stroke-width="1.6" opacity="0.85" />

            <!-- 4. Face Typography (Mặt cờ to rõ, tương phản cao, siêu nét từ 3 mét) -->
            ${x}
          </g>
        `}T(this.piecesLayer,n)}renderSinglePieceSVG(e,t,n,r=1,i=!0){if(!e)return``;let a=c[e];if(!a)return``;let o=a.side===s.RED,l=o?`url(#redPieceWood)`:`url(#blackPieceWood)`,u=o?`#78350f`:`#09090b`,d=o?`#b91c1c`:`#ca8a04`,f=o?`#b91c1c`:`#fef08a`,p=o?`#991b1b`:`#fef08a`,m=``;if(!this.showVietnameseLabels)m=`
        <text x="0" y="1"
              text-anchor="middle"
              dominant-baseline="central"
              alignment-baseline="central"
              font-family="'Noto Serif SC', 'KaiTi', 'STKaiti', 'Songti SC', 'SimSun', 'Microsoft YaHei', serif"
              font-size="46"
              font-weight="900"
              fill="${f}"
              style="text-shadow: 1px 1px 2px rgba(0,0,0,0.65);">
          ${a.hanzi}
        </text>
      `;else{let e=a.name.toUpperCase();m=`
        <text x="0" y="1"
              text-anchor="middle"
              dominant-baseline="central"
              alignment-baseline="central"
              font-family="'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif"
              font-size="${e.length<=2?28:e.length<=4?22:19}"
              font-weight="900"
              fill="${p}"
              letter-spacing="0.5"
              style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
          ${e}
        </text>
      `}return`
      <g class="svg-piece-group ${o?`red`:`black`}"
         transform="translate(${t}, ${n}) scale(${r})"
         style="cursor: pointer;">
        <!-- Vector shadow -->
        <circle cx="0" cy="${i?6:2.5}" r="${this.pieceRadius}" fill="#000000" opacity="${i?.45:.28}" />
        <circle cx="0" cy="0" r="${this.pieceRadius}" fill="${l}" stroke="${u}" stroke-width="2.2" />
        <circle cx="0" cy="0" r="${this.pieceRadius-3.5}" fill="none" stroke="${o?`#fef08a`:`#52525b`}" stroke-width="0.8" opacity="0.6" />
        <circle cx="0" cy="0" r="${this.pieceRadius-6}" fill="${o?`rgba(254, 243, 199, 0.3)`:`rgba(0, 0, 0, 0.4)`}" stroke="${d}" stroke-width="1.6" opacity="0.85" />
        ${m}
      </g>
    `}renderArmAndHandSVG({x:e,y:t,side:n,isElevated:r=!0}){let i=n===s.RED,a=Math.min(650,Math.max(130,e)),o=i?870:-90,c=a-e,l=o-t,u=Math.max(140,Math.hypot(c,l)),d=Math.atan2(l,c)*180/Math.PI,f=i?`url(#redSleeveGrad)`:`url(#blackSleeveGrad)`,p=i?`#ca8a04`:`#64748b`,m=i?`#450a0a`:`#090d16`,h=i?`#fef08a`:`#cbd5e1`,g=Math.max(95,Math.min(225,52+u*.38)),_=Math.max(38,Math.min(76,22+u*.14)),v=Math.max(16,Math.min(42,_*.52)),y=Math.max(56,Math.min(96,38+u*.12));return`
      <g class="svg-human-arm-group ${i?`arm-red`:`arm-black`}"
         transform="translate(${e}, ${t}) rotate(${d-90})"
         filter="url(#pieceLiftedShadow)">

        <!-- 1. DRAPED SILK ROBE SLEEVE WITH ARTICULATED ELBOW (Áo gấm thụng có khuỷu tay) -->
        
        <!-- Layer 1A: Outer Silhouette of Sleeve (Forearm -> Elbow -> Upper Arm -> Shoulder) -->
        <path d="M 22 62 
                 C 28 74, ${_*.6} ${g-26}, ${_+16} ${g-8}
                 C ${_+24} ${g+4}, ${_+22} ${g+20}, ${_+12} ${g+32}
                 C ${_+2} ${g+48}, ${v+y*.48} ${u*.76}, ${v+y*.5} ${u}
                 L ${v-y*.5} ${u}
                 C ${v-y*.72} ${u*.75}, -56 ${g+36}, -48 ${g}
                 C -42 ${g-28}, -32 76, -22 62
                 Z" 
              fill="${f}" 
              stroke="${p}" 
              stroke-width="1.6" />

        <!-- Layer 1B: Hanging Sleeve Drape Shadow (Độ rủ bóng đổ vạt áo thụng dưới khuỷu tay) -->
        <path d="M -48 ${g} 
                 C -54 ${g+45}, ${v-y*.6} ${u*.8}, ${v-y*.4} ${u}
                 C -25 ${u*.82}, -20 ${g+60}, -15 ${g+20}
                 Z"
              fill="rgba(0,0,0,0.22)" />

        <!-- Layer 1C: Elbow Creases & Radiating Folds (Nếp gập vải tại khuỷu tay) -->
        <!-- Main inner crook crease (Nếp gấp chính tại hõm khuỷu) -->
        <path d="M -22 ${g-4} C 2 ${g-2}, ${_*.45} ${g-6}, ${_+8} ${g-2}" 
              fill="none" stroke="rgba(0,0,0,0.42)" stroke-width="2.6" stroke-linecap="round" />
        <path d="M -20 ${g-3} C 4 ${g-1}, ${_*.46} ${g-5}, ${_+7} ${g-1}" 
              fill="none" stroke="${h}" stroke-width="0.8" opacity="0.38" />

        <!-- Diagonal drapery fold 1 (Nếp gấp chéo xuống vạt dưới) -->
        <path d="M -16 ${g+12} C 8 ${g+20}, ${_*.5} ${g+18}, ${_+11} ${g+22}" 
              fill="none" stroke="rgba(0,0,0,0.36)" stroke-width="2.2" stroke-linecap="round" />

        <!-- Forearm drapery fold (Nếp gấp dọc cẳng tay) -->
        <path d="M -12 70 C 6 80, 20 86, ${_-2} ${g-18}" 
              fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1.8" stroke-linecap="round" />

        <!-- Upper arm fold towards shoulder (Nếp gấp bắp tay về vai) -->
        <path d="M -28 ${g+36} C 0 ${g+46}, ${_*.4} ${g+50}, ${v+12} ${u*.8}" 
              fill="none" stroke="rgba(0,0,0,0.28)" stroke-width="2" stroke-linecap="round" />

        <!-- Layer 1D: Elbow Outer Apex Highlight & Seam (Đường gân chỉ vàng vắt qua đầu khuỷu tay) -->
        <path d="M 22 62 
                 C 28 74, ${_*.65} ${g-22}, ${_+16} ${g-6}
                 C ${_+22} ${g+6}, ${_+18} ${g+22}, ${_+8} ${g+32}
                 C ${_} ${g+46}, ${v+y*.42} ${u*.82}, ${v+y*.45} ${u}" 
              fill="none" stroke="${h}" stroke-width="1.2" opacity="0.55" stroke-dasharray="5 3" />

        <!-- Outer elbow bone curve highlight (Ánh sáng phản chiếu trên đầu khuỷu tay) -->
        <path d="M ${_+10} ${g-10} 
                 C ${_+20} ${g+4}, ${_+18} ${g+18}, ${_+7} ${g+28}" 
              fill="none" stroke="#ffffff" stroke-width="1.4" opacity="0.45" />

        <!-- Layer 1E: Sleeve Opening Inner Depth (Lớp lót nhung miệng ống tay) -->
        <ellipse cx="0" cy="62" rx="26" ry="7" fill="${m}" stroke="${p}" stroke-width="1" />

        <!-- Layer 1F: Imperial Embroidered Golden Cuff Band (Bác tay áo thếp vàng uốn lượn) -->
        <path d="M -26 64 C -12 70, 12 70, 26 64 C 24 55, 18 52, 16 51 C 8 55, -8 55, -16 51 C -18 52, -24 55, -26 64 Z" 
              fill="#ca8a04" stroke="#fef08a" stroke-width="1.2" />
        <path d="M -22 62 C -10 67, 10 67, 22 62" 
              fill="none" stroke="${h}" stroke-width="1.5" stroke-dasharray="3 2" />

        <!-- 2. FOREARM & SLENDER WRIST (Cổ tay thư sinh thon dài thanh tú) -->
        <!-- Emerges smoothly from inside the sleeve cuff -->
        <path d="M -13 58 
                 C -13 46, -11 36, -10 28 
                 C -3 26, 3 26, 10 28 
                 C 11 36, 13 46, 13 58 
                 Z" 
              fill="url(#skinGrad)" 
              stroke="#b86b40" 
              stroke-width="0.8" />

        <!-- Delicate wrist styloid contour & tendon highlight -->
        <path d="M -8 38 C -4 31, -2 26, -1 20" fill="none" stroke="#fff4eb" stroke-width="1.2" opacity="0.55" />
        <path d="M 8 36 C 5 30, 4 25, 4 20" fill="none" stroke="#c0784d" stroke-width="0.7" opacity="0.6" />

        <!-- 3. PALM DORSUM (Mu bàn tay thanh nhã, thon dài) -->
        <path d="M -10 28 
                 C -14 18, -12 8, -9 0 
                 C -4 -4, 4 -4, 9 0 
                 C 12 8, 14 18, 10 28 
                 Z" 
              fill="url(#skinGrad)" 
              stroke="#b86b40" 
              stroke-width="0.9" />

        <!-- 4. FINGERS ("SONG CHỈ KẸP CỜ" - KỲ THỦ ĐÍCH THỰC) -->

        <!-- A. Ring & Little Fingers (Ngón áp út & ngón út co nhẹ duyên dáng phía sau) -->
        <g class="hand-finger-curled">
          <!-- Ring finger -->
          <path d="M 9 14 C 16 16, 22 21, 20 27 C 18 31, 12 30, 8 24 Z" 
                fill="#deb291" stroke="#b86b40" stroke-width="0.8" />
          <!-- Little finger -->
          <path d="M 7 24 C 13 26, 17 31, 15 36 C 13 39, 9 37, 6 31 Z" 
                fill="#caa081" stroke="#b86b40" stroke-width="0.7" />
        </g>

        <!-- B. Piece Contact Shadows (Bóng đổ ngón tay lên vành gỗ quân cờ) -->
        <ellipse cx="14" cy="-22" rx="4" ry="2.5" fill="rgba(0,0,0,0.3)" />
        <ellipse cx="21" cy="-20" rx="3.5" ry="2" fill="rgba(0,0,0,0.25)" />
        <ellipse cx="-18" cy="-1" rx="3.5" ry="4" fill="rgba(0,0,0,0.3)" />

        <!-- C. Thumb (Ngón Cái - Uốn cong tự nhiên ghì vành dưới bên trái) -->
        <g class="hand-finger-thumb">
          <!-- Thenar base & shaft -->
          <path d="M -9 18 
                   C -16 16, -24 9, -23 -1 
                   C -22 -8, -15 -8, -14 -1 
                   C -13 4, -9 10, -7 16 
                   Z" 
                fill="url(#skinGrad)" 
                stroke="#b86b40" 
                stroke-width="0.9" />
          <!-- Knuckle creases -->
          <path d="M -19 4 C -16 5, -14 7, -13 8" fill="none" stroke="#b46e45" stroke-width="0.8" />
          <!-- Thumb fingernail & highlight -->
          <path d="M -21 -3 C -20 -7, -16 -7, -15 -3 C -16 -1, -20 -1, -21 -3 Z" fill="#fff5ec" stroke="#d59972" stroke-width="0.5" />
          <ellipse cx="-18" cy="-4" rx="1.5" ry="2.2" fill="#ffffff" opacity="0.85" />
        </g>

        <!-- D. Middle Finger (Ngón Giữa - Ngón dài nhất, đặt vững chãi trên mặt cờ) -->
        <g class="hand-finger-middle">
          <!-- 3 Phalanges contoured gracefully -->
          <path d="M 4 2 
                   C 7 -8, 12 -18, 15 -27 
                   C 19 -28, 22 -24, 20 -16 
                   C 17 -8, 12 3, 9 10 
                   Z" 
                fill="url(#skinGrad)" 
                stroke="#b86b40" 
                stroke-width="0.9" />
          <!-- Interphalangeal creases -->
          <line x1="8" y1="-8" x2="15" y2="-7" stroke="#b46e45" stroke-width="0.7" />
          <line x1="12" y1="-18" x2="18" y2="-17" stroke="#b46e45" stroke-width="0.7" />
          <!-- Fingernail & reflection -->
          <path d="M 16 -26 C 18 -29, 21 -27, 20 -24 C 19 -22, 16 -23, 16 -26 Z" fill="#fff5ec" stroke="#d59972" stroke-width="0.5" />
          <ellipse cx="18" cy="-25" rx="1.4" ry="2" fill="#ffffff" opacity="0.9" />
        </g>

        <!-- E. Index Finger (Ngón Trỏ - Thon dài, kẹp chặt vành cờ cạnh ngón giữa) -->
        <g class="hand-finger-index">
          <path d="M -2 0 
                   C 2 -9, 7 -19, 10 -26 
                   C 14 -27, 16 -23, 14 -16 
                   C 11 -8, 6 2, 4 9 
                   Z" 
                fill="url(#skinGrad)" 
                stroke="#b86b40" 
                stroke-width="0.9" />
          <!-- Knuckle lines -->
          <line x1="3" y1="-9" x2="9" y2="-8" stroke="#b46e45" stroke-width="0.7" />
          <line x1="6" y1="-19" x2="12" y2="-18" stroke="#b46e45" stroke-width="0.7" />
          <!-- Fingernail & gloss -->
          <path d="M 10 -25 C 12 -28, 15 -26, 14 -23 C 13 -21, 10 -22, 10 -25 Z" fill="#fff5ec" stroke="#d59972" stroke-width="0.5" />
          <ellipse cx="12" cy="-24" rx="1.3" ry="1.8" fill="#ffffff" opacity="0.9" />
        </g>

      </g>
    `}triggerPieceCaptureFX(e,t,n,r,i){let a=(e||``).toUpperCase();if(!this.fxLayer){r&&r(),i&&i();return}switch(a){case`C`:this.animateCannonBlastFX(t,n,r,i);break;case`R`:this.animateChariotChargeFX(t,n,r,i);break;case`H`:this.animateHorseTrampleFX(t,n,r,i);break;case`E`:this.animateElephantShatterFX(t,n,r,i);break;case`A`:this.animateAdvisorSlashFX(t,n,r,i);break;case`K`:this.animateKingDragonFX(t,n,r,i);break;case`P`:this.animateSoldierSpearFX(t,n,r,i);break;default:this.animateGenericCaptureFX(t,n,r,i)}}animateCannonBlastFX(e,t,n,r){let i=this.fxLayer,a=performance.now();T(i,`
      <circle cx="${e.x}" cy="${e.y}" r="26" fill="#f59e0b" opacity="0.9" class="svg-muzzle-flash" />
      <g id="flying-cannonball"></g>
    `);let o=i.querySelector(`#flying-cannonball`),s=c=>{let l=c-a,u=Math.min(1,l/280),d=e.x+(t.x-e.x)*u,f=e.y+(t.y-e.y)*u-Math.sin(u*Math.PI)*48;if(o&&T(o,`
          <!-- Smoke tail -->
          <circle cx="${d-(t.x-e.x)*.05}" cy="${f+5}" r="7" fill="#78350f" opacity="0.6" />
          <!-- Fiery projectile core -->
          <circle cx="${d}" cy="${f}" r="11" fill="url(#fireballGrad)" filter="url(#pieceLiftedShadow)" />
          <circle cx="${d}" cy="${f}" r="15" fill="none" stroke="#fef08a" stroke-width="2" opacity="0.85" />
        `),u<1)requestAnimationFrame(s);else{n&&n();let e=[];for(let t=0;t<20;t++){let n=Math.PI*2*t/20+(Math.random()-.5)*.4,r=40+Math.random()*55,i=[`#fef08a`,`#f59e0b`,`#ef4444`,`#b45309`,`#78350f`];e.push({vx:Math.cos(n)*r,vy:Math.sin(n)*r,color:i[t%i.length],size:3+Math.random()*4.5})}let a=performance.now(),o=n=>{let s=n-a,c=Math.min(1,s/400),l=10+c*75,u=Math.max(0,1-c),d=`
            <!-- Shockwave Fiery Blast Ring -->
            <circle cx="${t.x}" cy="${t.y}" r="${l}" fill="none" stroke="#f97316" stroke-width="${Math.max(1,6*(1-c))}" opacity="${u}" />
            <circle cx="${t.x}" cy="${t.y}" r="${l*.7}" fill="#ef4444" fill-opacity="${u*.45}" />
          `;e.forEach(e=>{let n=t.x+e.vx*c,r=t.y+e.vy*c+c*c*25;d+=`<rect x="${n}" y="${r}" width="${e.size}" height="${e.size}" rx="1" fill="${e.color}" opacity="${u}" transform="rotate(${c*360}, ${n}, ${r})" />`}),T(i,d),c<1?requestAnimationFrame(o):(T(i,``),r&&r())};requestAnimationFrame(o)}};requestAnimationFrame(s)}animateChariotChargeFX(e,t,n,r){let i=this.fxLayer;n&&n();let a=performance.now(),o=n=>{let s=Math.min(1,(n-a)/380),c=1-s;T(i,`
        <!-- High-speed Chariot Lightning Rush Beam -->
        <line x1="${e.x}" y1="${e.y}" x2="${t.x}" y2="${t.y}" stroke="#ca8a04" stroke-width="${14*(1-s)}" stroke-linecap="round" opacity="${c*.8}" />
        <line x1="${e.x}" y1="${e.y}" x2="${t.x}" y2="${t.y}" stroke="#fef08a" stroke-width="${5*(1-s)}" stroke-linecap="round" opacity="${c}" />
        <!-- Crushing Shockwave Rings -->
        <circle cx="${t.x}" cy="${t.y}" r="${12+s*65}" fill="none" stroke="#fbbf24" stroke-width="${4*(1-s)}" opacity="${c}" />
        <circle cx="${t.x}" cy="${t.y}" r="${6+s*45}" fill="#ca8a04" fill-opacity="${c*.35}" />
      `),s<1?requestAnimationFrame(o):(T(i,``),r&&r())};requestAnimationFrame(o)}animateHorseTrampleFX(e,t,n,r){let i=this.fxLayer,a=performance.now(),o=t.x-e.x,s=t.y-e.y,c=Math.atan2(s,o)*180/Math.PI,l=[];for(let e=0;e<14;e++){let t=Math.PI*2*e/14+(Math.random()-.5)*.5,n=35+Math.random()*50;l.push({vx:Math.cos(t)*n,vy:Math.sin(t)*n,color:e%2==0?`#fef08a`:`#f59e0b`,size:2.5+Math.random()*2.5})}let u=!1,d=e=>{let o=Math.min(1,(e-a)/400),s=0,f=1,p=1;if(o<.35){let e=o/.35;s=-24*Math.sin(e*Math.PI*.5),f=.9+.2*e}else if(o<.55){let e=(o-.35)/.2;s=-24+42*(1-Math.pow(1-e,3)),f=1.1+.15*Math.sin(e*Math.PI),e>=.5&&!u&&(u=!0,n&&n(),w.playHorseKick())}else{let e=(o-.55)/.45;s=18-14*e,f=1.1-.2*e,p=Math.max(0,1-e*1.3)}let m=Math.max(0,(o-.45)/.55),h=12+m*62,g=Math.max(0,(1-m)*.9),_=`
        <g transform="translate(${t.x}, ${t.y})">
      `;m>0&&(_+=`
          <!-- Golden shockwave ripple -->
          <circle cx="0" cy="0" r="${h}" fill="none" stroke="#fbbf24" stroke-width="${Math.max(1,4.5*(1-m))}" opacity="${g}" />
          <circle cx="0" cy="0" r="${h*.7}" fill="none" stroke="#f59e0b" stroke-width="${Math.max(1,2.5*(1-m))}" opacity="${g*.7}" />

          <!-- Horseshoe Ground Crater Imprints (2 vết móng ngựa lún vào gỗ) -->
          <g transform="rotate(${c})" opacity="${g}">
            <!-- Left Hoofprint -->
            <path d="M -18 -12 C -24 -6, -24 6, -18 12 L -14 10 C -19 5, -19 -5, -14 -10 Z" fill="#78350f" opacity="0.65" />
            <!-- Right Hoofprint -->
            <path d="M 6 -12 C 0 -6, 0 6, 6 12 L 10 10 C 5 5, 5 -5, 10 -10 Z" fill="#78350f" opacity="0.65" />
          </g>
        `,l.forEach(e=>{let t=e.vx*m,n=e.vy*m+m*m*18;_+=`<rect x="${t}" y="${n}" width="${e.size}" height="${e.size}" rx="0.8" fill="${e.color}" opacity="${g}" transform="rotate(${m*280}, ${t}, ${n})" />`})),p>0&&(_+=`
          <g transform="rotate(${c}) translate(${s}, 0) scale(${f})" opacity="${p}">
            <!-- Battle Speed Dust Lines -->
            <line x1="-50" y1="-12" x2="-20" y2="-12" stroke="#fef08a" stroke-width="2" opacity="0.6" stroke-dasharray="8 4" />
            <line x1="-50" y1="12" x2="-20" y2="12" stroke="#fef08a" stroke-width="2" opacity="0.6" stroke-dasharray="8 4" />

            <!-- === LEFT HOOF (VÓ NGỰA TRÁI) === -->
            <g transform="translate(0, -13)">
              <!-- Leg Fetlock (Cổ chân ngựa cơ bắp) -->
              <path d="M -42 7 L -22 6 L -10 5 L -10 -5 L -22 -6 L -42 -7 Z" fill="#1e1b18" stroke="#ca8a04" stroke-width="0.8" />
              <!-- Golden Leg Armor Greave (Giáp chân ngựa mạ vàng) -->
              <rect x="-34" y="-5.5" width="12" height="11" rx="2" fill="#ca8a04" stroke="#fef08a" stroke-width="0.8" />
              <!-- Fetlock feather hair (Lông cọc cổ chân) -->
              <path d="M -22 6 C -28 11, -32 10, -36 8" fill="none" stroke="#78350f" stroke-width="2" />
              <!-- Hoof Horn (Sừng móng ngựa) -->
              <path d="M -10 6 C -4 7, 6 6, 8 0 C 6 -6, -4 -7, -10 -6 Z" fill="url(#steelHoofGrad)" stroke="#09090b" stroke-width="1.2" />
              <!-- Steel Horseshoe (Móng sắt bọc ngoài sáng chói) -->
              <path d="M -4 7 C 5 7, 10 5, 10 0 C 10 -5, 5 -7, -4 -7 L -2 -5 C 5 -5, 8 -3, 8 0 C 8 3, 5 5, -2 5 Z" 
                    fill="#f8fafc" stroke="#334155" stroke-width="0.8" />
              <!-- Horseshoe Nail Studs -->
              <circle cx="2" cy="-4" r="0.8" fill="#ca8a04" />
              <circle cx="6" cy="-2" r="0.8" fill="#ca8a04" />
              <circle cx="6" cy="2" r="0.8" fill="#ca8a04" />
              <circle cx="2" cy="4" r="0.8" fill="#ca8a04" />
            </g>

            <!-- === RIGHT HOOF (VÓ NGỰA PHẢI) === -->
            <g transform="translate(0, 13)">
              <!-- Leg Fetlock -->
              <path d="M -42 7 L -22 6 L -10 5 L -10 -5 L -22 -6 L -42 -7 Z" fill="#1e1b18" stroke="#ca8a04" stroke-width="0.8" />
              <!-- Golden Leg Armor Greave -->
              <rect x="-34" y="-5.5" width="12" height="11" rx="2" fill="#ca8a04" stroke="#fef08a" stroke-width="0.8" />
              <!-- Fetlock feather hair -->
              <path d="M -22 -6 C -28 -11, -32 -10, -36 -8" fill="none" stroke="#78350f" stroke-width="2" />
              <!-- Hoof Horn -->
              <path d="M -10 6 C -4 7, 6 6, 8 0 C 6 -6, -4 -7, -10 -6 Z" fill="url(#steelHoofGrad)" stroke="#09090b" stroke-width="1.2" />
              <!-- Steel Horseshoe -->
              <path d="M -4 7 C 5 7, 10 5, 10 0 C 10 -5, 5 -7, -4 -7 L -2 -5 C 5 -5, 8 -3, 8 0 C 8 3, 5 5, -2 5 Z" 
                    fill="#f8fafc" stroke="#334155" stroke-width="0.8" />
              <!-- Horseshoe Nail Studs -->
              <circle cx="2" cy="-4" r="0.8" fill="#ca8a04" />
              <circle cx="6" cy="-2" r="0.8" fill="#ca8a04" />
              <circle cx="6" cy="2" r="0.8" fill="#ca8a04" />
              <circle cx="2" cy="4" r="0.8" fill="#ca8a04" />
            </g>

          </g>
        `),_+=`</g>`,T(i,_),o<1?requestAnimationFrame(d):(T(i,``),r&&r())};requestAnimationFrame(d)}animateElephantShatterFX(e,t,n,r){let i=this.fxLayer,a=performance.now(),o=[];for(let e=0;e<16;e++){let t=-Math.PI*.5+(Math.random()-.5)*1.4,n=40+Math.random()*60;o.push({vx:Math.cos(t)*n,vy:Math.sin(t)*n,color:e%3==0?`#ffffff`:e%3==1?`#fef08a`:`#b45309`,size:3+Math.random()*3.5})}let s=!1,c=e=>{let l=Math.min(1,(e-a)/440),u=0,d=1,f=1;if(l<.28){let e=l/.28;u=48-8*e,d=.95+.1*e}else if(l<.52){let e=(l-.28)/.24;u=40-76*(1-Math.pow(1-e,3)),d=1.05+.15*Math.sin(e*Math.PI),e>=.45&&!s&&(s=!0,n&&n(),w.playElephantTuskGore())}else{let e=(l-.52)/.48;u=-36-12*e,d=1.2-.15*e,f=Math.max(0,1-e*1.3)}let p=Math.max(0,(l-.4)/.6),m=14+p*65,h=Math.max(0,(1-p)*.9),g=`
        <g transform="translate(${t.x}, ${t.y})">
      `;p>0&&(g+=`
          <!-- Upward Crescent Gore Shockwave Arc (Sóng khí húc ngược) -->
          <path d="M ${-m} ${-m*.3} 
                   C ${-m*.5} ${-m*1.2}, ${m*.5} ${-m*1.2}, ${m} ${-m*.3}" 
                fill="none" stroke="#fef08a" stroke-width="${Math.max(1,5*(1-p))}" stroke-linecap="round" opacity="${h}" />
          <path d="M ${-m*.8} ${-m*.1} 
                   C ${-m*.4} ${-m*.9}, ${m*.4} ${-m*.9}, ${m*.8} ${-m*.1}" 
                fill="none" stroke="#fbbf24" stroke-width="${Math.max(1,3*(1-p))}" stroke-linecap="round" opacity="${h*.8}" />

          <!-- Deep Tusk Gouge Trenches (2 rãnh ngà cày sâu trên mặt bàn) -->
          <line x1="-16" y1="28" x2="-8" y2="-22" stroke="#78350f" stroke-width="${4*(1-p)}" stroke-linecap="round" opacity="${h*.7}" />
          <line x1="16" y1="28" x2="8" y2="-22" stroke="#78350f" stroke-width="${4*(1-p)}" stroke-linecap="round" opacity="${h*.7}" />

          <!-- Seismic Ground Dust Circle -->
          <circle cx="0" cy="10" r="${m*.8}" fill="#78350f" fill-opacity="${h*.25}" stroke="#ca8a04" stroke-width="1.5" opacity="${h}" />
        `,o.forEach(e=>{let t=e.vx*p,n=e.vy*p+p*p*12;g+=`<circle cx="${t}" cy="${n}" r="${e.size*(1-p*.4)}" fill="${e.color}" opacity="${h}" />`})),f>0&&(g+=`
          <g transform="translate(0, ${u}) scale(${d})" opacity="${f}">

            <!-- Thrust Energy Aura -->
            <path d="M -24 35 C -15 -10, 0 -35, 0 -42 C 0 -35, 15 -10, 24 35 Z" 
                  fill="url(#dragonAuraGrad)" opacity="${.45*f}" />

            <!-- === LEFT TUSK (NGÀ TRÁI - CONG VÚT LÊN TRÊN VÀO TRONG) === -->
            <g class="tusk-left">
              <!-- Golden Armor Root Ferrule (Đai bọc chuôi ngà nạm vàng) -->
              <path d="M -28 32 L -20 35 L -16 26 L -24 23 Z" fill="#ca8a04" stroke="#fef08a" stroke-width="1" />
              <circle cx="-22" cy="29" r="1.8" fill="#ef4444" stroke="#fef08a" stroke-width="0.5" />
              <!-- Ivory Tusk Blade (Thân ngà voi khổng lồ) -->
              <path d="M -25 24 
                       C -23 10, -18 -6, -4 -32 
                       C -7 -22, -12 -5, -15 25 
                       Z" 
                    fill="url(#ivoryTuskGrad)" 
                    stroke="#ca8a04" 
                    stroke-width="1.4" />
              <!-- Ivory Ridge Specular Highlight (Sống ngà ánh bạc) -->
              <path d="M -22 18 C -19 6, -14 -6, -5 -28" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.95" />
            </g>

            <!-- === RIGHT TUSK (NGÀ PHẢI - CONG VÚT LÊN TRÊN VÀO TRONG) === -->
            <g class="tusk-right">
              <!-- Golden Armor Root Ferrule -->
              <path d="M 28 32 L 20 35 L 16 26 L 24 23 Z" fill="#ca8a04" stroke="#fef08a" stroke-width="1" />
              <circle cx="22" cy="29" r="1.8" fill="#ef4444" stroke="#fef08a" stroke-width="0.5" />
              <!-- Ivory Tusk Blade -->
              <path d="M 25 24 
                       C 23 10, 18 -6, 4 -32 
                       C 7 -22, 12 -5, 15 25 
                       Z" 
                    fill="url(#ivoryTuskGrad)" 
                    stroke="#ca8a04" 
                    stroke-width="1.4" />
              <!-- Ivory Ridge Specular Highlight -->
              <path d="M 22 18 C 19 6, 14 -6, 5 -28" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.95" />
            </g>

            <!-- Clashing Tip Gleam Spark at climax -->
            <circle cx="0" cy="-30" r="8" fill="#ffffff" opacity="${.8*f}" filter="url(#pieceLiftedShadow)" />
            <line x1="-12" y1="-30" x2="12" y2="-30" stroke="#fef08a" stroke-width="2.5" opacity="${f}" />
            <line x1="0" y1="-42" x2="0" y2="-18" stroke="#fef08a" stroke-width="2.5" opacity="${f}" />

          </g>
        `),g+=`</g>`,T(i,g),l<1?requestAnimationFrame(c):(T(i,``),r&&r())};requestAnimationFrame(c)}animateAdvisorSlashFX(e,t,n,r){let i=this.fxLayer;n&&n();let a=performance.now(),o=e=>{let n=Math.min(1,(e-a)/340),s=1-n,c=38*(.4+n*.8);T(i,`
        <g transform="translate(${t.x}, ${t.y})">
          <!-- Blade Slash 1 -->
          <line x1="${-c}" y1="${-c}" x2="${c}" y2="${c}" stroke="#ffffff" stroke-width="${4.5*(1-n)}" stroke-linecap="round" opacity="${s}" />
          <line x1="${-c}" y1="${-c}" x2="${c}" y2="${c}" stroke="#38bdf8" stroke-width="${8*(1-n)}" stroke-linecap="round" opacity="${s*.7}" />
          <!-- Blade Slash 2 -->
          <line x1="${c}" y1="${-c}" x2="${-c}" y2="${c}" stroke="#ffffff" stroke-width="${4.5*(1-n)}" stroke-linecap="round" opacity="${s}" />
          <line x1="${c}" y1="${-c}" x2="${-c}" y2="${c}" stroke="#38bdf8" stroke-width="${8*(1-n)}" stroke-linecap="round" opacity="${s*.7}" />
          <!-- Spark diamond center -->
          <circle cx="0" cy="0" r="${8+n*20}" fill="#fef08a" opacity="${s*.8}" />
        </g>
      `),n<1?requestAnimationFrame(o):(T(i,``),r&&r())};requestAnimationFrame(o)}animateKingDragonFX(e,t,n,r){let i=this.fxLayer;n&&n();let a=performance.now(),o=e=>{let n=Math.min(1,(e-a)/440),s=1-n,c=20+n*75,l=n*180;T(i,`
        <g transform="translate(${t.x}, ${t.y}) rotate(${l})">
          <!-- Imperial Golden Dragon Halo -->
          <circle cx="0" cy="0" r="${c}" fill="url(#dragonAuraGrad)" opacity="${s}" />
          <circle cx="0" cy="0" r="${c*.8}" fill="none" stroke="#fbbf24" stroke-width="${3*(1-n)}" stroke-dasharray="8 6" opacity="${s}" />
          <circle cx="0" cy="0" r="${c*.5}" fill="none" stroke="#fef08a" stroke-width="2" opacity="${s}" />
        </g>
      `),n<1?requestAnimationFrame(o):(T(i,``),r&&r())};requestAnimationFrame(o)}animateSoldierSpearFX(e,t,n,r){let i=this.fxLayer;n&&n();let a=performance.now(),o=t.x-e.x,s=t.y-e.y,c=Math.atan2(s,o)*180/Math.PI,l=e=>{let n=Math.min(1,(e-a)/320),o=1-n;T(i,`
        <g transform="translate(${t.x}, ${t.y}) rotate(${c})">
          <!-- Piercing Spear Thrust Shaft -->
          <line x1="-40" y1="0" x2="35" y2="0" stroke="#f59e0b" stroke-width="${6*(1-n)}" stroke-linecap="round" opacity="${o}" />
          <polygon points="35,0 15,-10 15,10" fill="#fef08a" opacity="${o}" />
          <!-- Forward Conical Sparks -->
          <circle cx="${25+n*25}" cy="${-10-n*15}" r="3" fill="#ef4444" opacity="${o}" />
          <circle cx="${30+n*30}" cy="0" r="3.5" fill="#fef08a" opacity="${o}" />
          <circle cx="${25+n*25}" cy="${10+n*15}" r="3" fill="#f59e0b" opacity="${o}" />
        </g>
      `),n<1?requestAnimationFrame(l):(T(i,``),r&&r())};requestAnimationFrame(l)}animateGenericCaptureFX(e,t,n,r){let i=this.fxLayer;n&&n();let a=performance.now(),o=e=>{let n=Math.min(1,(e-a)/320),s=1-n;T(i,`
        <circle cx="${t.x}" cy="${t.y}" r="${10+n*60}" fill="none" stroke="#ef4444" stroke-width="${4*(1-n)}" opacity="${s}" />
        <circle cx="${t.x}" cy="${t.y}" r="${5+n*35}" fill="#f59e0b" fill-opacity="${s*.4}" />
      `),n<1?requestAnimationFrame(o):(T(i,``),r&&r())};requestAnimationFrame(o)}animateMove({from:e,to:t,piece:n,isAI:r=!1,isCapture:i=!1,capturedPiece:a=null,onComplete:o}){this.isAnimating=!0;let s=this.getPointCoords(e.r,e.c),c=this.getPointCoords(t.r,t.c);this.hiddenCoord={r:e.r,c:e.c},this.currentBoard&&this.renderPieces(this.currentBoard,this.hiddenCoord);let l=performance.now(),u=r?250:180;this.flyingPieceLayer&&T(this.flyingPieceLayer,this.renderSinglePieceSVG(n,0,0,1.1,!0));let d=this.flyingPieceLayer?this.flyingPieceLayer.firstElementChild:null,f=e=>{let t=e-l,n=Math.min(1,t/u),r=1-(1-n)*(1-n),i=s.x+(c.x-s.x)*r,a=s.y+(c.y-s.y)*r-Math.sin(r*Math.PI)*14,p=1+.12*Math.sin(r*Math.PI);d&&d.setAttribute(`transform`,`translate(${i}, ${a}) scale(${p})`),n<1?requestAnimationFrame(f):(this.flyingPieceLayer&&T(this.flyingPieceLayer,``),this.hiddenCoord=null,this.isAnimating=!1,o&&o())};requestAnimationFrame(f)}},D=class{constructor(e={}){this.boardCols=9,this.boardRows=10,this.area=e.initialArea||`home`,this.cursor={r:9,c:4},this.sidebarIndex=0,this.modalIndex=0,this.onHomeKey=e.onHomeKey||null,this.onCursorMove=e.onCursorMove||(()=>{}),this.onSelectCell=e.onSelectCell||(()=>{}),this.onBack=e.onBack||(()=>{}),this.onColorKey=e.onColorKey||(()=>{}),this.onSidebarFocusChange=e.onSidebarFocusChange||(()=>{}),this.onSidebarSelect=e.onSidebarSelect||(()=>{}),this.getSidebarButtons=e.getSidebarButtons||(()=>[]),this.getModalButtons=e.getModalButtons||(()=>[]),this.bindKeyboard()}setArea(e){this.area=e,e===`board`?this.onCursorMove(this.cursor.r,this.cursor.c):e===`sidebar`&&this.onSidebarFocusChange(this.sidebarIndex)}setCursor(e,t){this.cursor.r=Math.max(0,Math.min(this.boardRows-1,e)),this.cursor.c=Math.max(0,Math.min(this.boardCols-1,t)),this.area=`board`,this.onCursorMove(this.cursor.r,this.cursor.c)}bindKeyboard(){window.addEventListener(`keydown`,e=>this.handleKeyDown(e))}handleKeyDown(e){let t=e.key,n=e.keyCode;if(!(this.area===`home`&&this.onHomeKey&&this.onHomeKey(e))){if(t===`ColorF0Red`||n===403||t===`1`||t===`r`||t===`F1`){e.preventDefault(),w.playSelect(),this.onColorKey(`red`);return}if(t===`ColorF1Green`||n===404||t===`2`||t===`g`||t===`F2`){e.preventDefault(),w.playSelect(),this.onColorKey(`green`);return}if(t===`ColorF2Yellow`||n===405||t===`3`||t===`y`||t===`F3`){e.preventDefault(),w.playSelect(),this.onColorKey(`yellow`);return}if(t===`ColorF3Blue`||n===406||t===`4`||t===`b`||t===`F4`){e.preventDefault(),w.playSelect(),this.onColorKey(`blue`);return}if(this.area===`modal`){this.handleModalKey(e);return}switch(t){case`ArrowUp`:case`Up`:case 19:e.preventDefault(),this.moveUp();break;case`ArrowDown`:case`Down`:case 20:e.preventDefault(),this.moveDown();break;case`ArrowLeft`:case`Left`:case 21:e.preventDefault(),this.moveLeft();break;case`ArrowRight`:case`Right`:case 22:e.preventDefault(),this.moveRight();break;case`Enter`:case` `:case`Select`:case 13:case 23:case 66:e.preventDefault(),this.confirmAction();break;case`Escape`:case`Backspace`:case`GoBack`:case 27:case 8:case 4:case 10009:case 461:e.preventDefault(),this.cancelAction();break;case`m`:case`M`:case`ContextMenu`:e.preventDefault(),this.onColorKey(`menu`)}}}moveUp(){if(this.area===`board`)this.cursor.r>0&&(this.cursor.r--,w.playNavigate(),this.onCursorMove(this.cursor.r,this.cursor.c));else if(this.area===`sidebar`){let e=this.getSidebarButtons();e.length>0&&(this.sidebarIndex=(this.sidebarIndex-1+e.length)%e.length,w.playNavigate(),this.onSidebarFocusChange(this.sidebarIndex))}}moveDown(){if(this.area===`board`)this.cursor.r<this.boardRows-1&&(this.cursor.r++,w.playNavigate(),this.onCursorMove(this.cursor.r,this.cursor.c));else if(this.area===`sidebar`){let e=this.getSidebarButtons();e.length>0&&(this.sidebarIndex=(this.sidebarIndex+1)%e.length,w.playNavigate(),this.onSidebarFocusChange(this.sidebarIndex))}}moveLeft(){this.area===`board`?this.cursor.c>0&&(this.cursor.c--,w.playNavigate(),this.onCursorMove(this.cursor.r,this.cursor.c)):this.area===`sidebar`&&(this.area=`board`,this.cursor.c=8,w.playNavigate(),this.onSidebarFocusChange(-1),this.onCursorMove(this.cursor.r,this.cursor.c))}moveRight(){if(this.area===`board`){if(this.cursor.c<this.boardCols-1)this.cursor.c++,w.playNavigate(),this.onCursorMove(this.cursor.r,this.cursor.c);else{let e=this.getSidebarButtons();e.length>0&&(this.area=`sidebar`,this.sidebarIndex=Math.min(e.length-1,Math.floor(this.cursor.r/10*e.length)),w.playNavigate(),this.onCursorMove(-1,-1),this.onSidebarFocusChange(this.sidebarIndex))}}}confirmAction(){this.area===`board`?this.onSelectCell(this.cursor.r,this.cursor.c):this.area===`sidebar`&&(w.playSelect(),this.onSidebarSelect(this.sidebarIndex))}cancelAction(){this.area===`sidebar`?(this.area=`board`,this.onSidebarFocusChange(-1),this.onCursorMove(this.cursor.r,this.cursor.c)):this.onBack()}handleModalKey(e){let t=this.getModalButtons();t.length!==0&&(e.key===`ArrowRight`||e.key===`ArrowDown`?(e.preventDefault(),this.modalIndex=(this.modalIndex+1)%t.length,w.playNavigate(),this.focusModalButton(this.modalIndex)):e.key===`ArrowLeft`||e.key===`ArrowUp`?(e.preventDefault(),this.modalIndex=(this.modalIndex-1+t.length)%t.length,w.playNavigate(),this.focusModalButton(this.modalIndex)):e.key===`Enter`||e.key===` `?(e.preventDefault(),w.playSelect(),t[this.modalIndex]&&t[this.modalIndex].click()):(e.key===`Escape`||e.key===`Backspace`)&&(e.preventDefault(),this.onBack()))}focusModalButton(e){this.getModalButtons().forEach((t,n)=>{n===e?(t.classList.add(`tv-focused`),t.focus()):t.classList.remove(`tv-focused`)})}},O=class{constructor(e,t={}){this.app=e,this.sidebarContainer=t.sidebarContainer,this.statusContainer=t.statusContainer,this.modalContainer=t.modalContainer,this.bottomBarContainer=t.bottomBarContainer,this.showVirtualRemote=!1,this.initHUD()}initHUD(){this.renderSidebar(),this.renderBottomLegend(),this.setupVirtualRemote()}renderSidebar(){this.sidebarContainer&&(this.sidebarContainer.innerHTML=`
      <div class="tv-panel glass-panel" id="tv-sidebar-panel">
        <div class="panel-header">
          <div class="app-title-group">
            <h1 class="app-title">CỜ TƯỚNG TV</h1>
            <span class="app-badge">SMART TV</span>
          </div>
          <button class="header-fs-btn tv-btn-action" data-action="fullscreen" id="btn-header-fs" title="Toàn màn hình TV">⛶</button>
        </div>

        <!-- Current Match Status & Chess Clock -->
        <div class="match-status-card" id="match-status-card">
          <!-- Dual Digital LED Chess Clocks -->
          <div class="chess-clocks-wrapper" id="chess-clocks-wrapper" title="Đồng hồ thi đấu">
            <!-- Red Clock -->
            <div class="clock-display-card clock-red clock-active" id="clock-card-red">
              <div class="clock-badge">
                <span class="clock-disc-mini piece-red">帥</span>
                <span class="clock-name">ĐỎ</span>
              </div>
              <div class="clock-time" id="clock-time-red">10:00</div>
            </div>

            <div class="clock-vs-pill">VS</div>

            <!-- Black Clock -->
            <div class="clock-display-card clock-black" id="clock-card-black">
              <div class="clock-badge">
                <span class="clock-disc-mini piece-black">將</span>
                <span class="clock-name">ĐEN</span>
              </div>
              <div class="clock-time" id="clock-time-black">10:00</div>
            </div>
          </div>

          <div class="turn-indicator" id="turn-indicator">
            <div class="turn-disc piece-red" id="turn-disc">帥</div>
            <div class="turn-info">
              <span class="turn-label">LƯỢT ĐI</span>
              <span class="turn-name" id="turn-name">BÊN ĐỎ</span>
            </div>
          </div>
          <div class="ai-status-badge" id="ai-status-badge" style="display: none;">
            <span class="spinner-dot"></span>
            <span>AI đang tính toán...</span>
          </div>
          <div class="check-alert-banner" id="check-alert-banner" style="display: none;">
            ⚠️ CHIẾU TƯỚNG!
          </div>
        </div>

        <!-- TV Navigation Menu Buttons (Spacious 7-action layout) -->
        <div class="menu-actions" id="menu-actions">
          <button class="tv-btn tv-btn-home" data-action="go-home" id="btn-go-home">
            <span class="btn-icon">🏠</span>
            <span class="btn-text">Về Trang Chủ</span>
          </button>

          <button class="tv-btn tv-btn-primary" data-action="new-game" id="btn-new-game">
            <span class="btn-color-tag yellow">3</span>
            <span class="btn-icon">🔄</span>
            <span class="btn-text">Ván cờ mới</span>
          </button>

          <button class="tv-btn" data-action="undo" id="btn-undo">
            <span class="btn-color-tag red">1</span>
            <span class="btn-icon">↩️</span>
            <span class="btn-text">Đi lại nước</span>
          </button>

          <button class="tv-btn" data-action="hint" id="btn-hint">
            <span class="btn-color-tag green">2</span>
            <span class="btn-icon">💡</span>
            <span class="btn-text">Gợi ý nước</span>
          </button>

          <button class="tv-btn" data-action="toggle-labels" id="btn-toggle-labels">
            <span class="btn-color-tag blue">4</span>
            <span class="btn-icon">🏷️</span>
            <span class="btn-text" id="text-labels">Mặt cờ: Chữ Hán</span>
          </button>

          <button class="tv-btn" data-action="open-settings" id="btn-open-settings">
            <span class="btn-icon">⚙️</span>
            <span class="btn-text">Cài đặt ván đấu</span>
          </button>

          <button class="tv-btn" data-action="fullscreen" id="btn-fullscreen">
            <span class="btn-icon">⛶</span>
            <span class="btn-text">Toàn màn hình</span>
          </button>
        </div>

        <!-- Recent Move History -->
        <div class="move-history-card">
          <div class="history-title">Nước cờ gần nhất</div>
          <div class="history-list" id="history-list">
            <span class="history-placeholder">Chưa có nước đi nào</span>
          </div>
        </div>
      </div>
    `,this.bindSidebarClicks())}renderBottomLegend(){this.bottomBarContainer&&(this.bottomBarContainer.innerHTML=`
      <div class="tv-bottom-bar glass-panel">
        <div class="legend-item">
          <span class="key-badge dpad">▲ ▼ ◀ ▶</span>
          <span class="legend-text">Di chuyển con trỏ</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="key-badge ok">OK / Enter</span>
          <span class="legend-text">Chọn / Đặt cờ</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="key-badge back">Back / Esc</span>
          <span class="legend-text">Hủy chọn</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="color-badge red">Đỏ [1]</span>
          <span class="legend-text">Đi lại</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="color-badge green">Xanh [2]</span>
          <span class="legend-text">Gợi ý</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="color-badge yellow">Vàng [3]</span>
          <span class="legend-text">Ván mới</span>
        </div>
        <div class="legend-separator">•</div>
        <div class="legend-item">
          <span class="color-badge blue">Lam [4]</span>
          <span class="legend-text">Đổi nhãn</span>
        </div>
      </div>
    `)}setupVirtualRemote(){let e=document.getElementById(`virtual-tv-remote`);e||(e=document.createElement(`div`),e.id=`virtual-tv-remote`,e.className=`virtual-remote-widget`,e.style.display=`none`,document.body.appendChild(e)),e.innerHTML=`
      <div class="v-remote-header">
        <span class="v-remote-title">TV REMOTE</span>
        <button class="v-remote-close" id="v-remote-close">✕</button>
      </div>

      <!-- D-Pad Directional Keys -->
      <div class="v-dpad">
        <button class="v-dpad-btn up" data-key="ArrowUp">▲</button>
        <div class="v-dpad-middle">
          <button class="v-dpad-btn left" data-key="ArrowLeft">◀</button>
          <button class="v-dpad-btn ok" data-key="Enter">OK</button>
          <button class="v-dpad-btn right" data-key="ArrowRight">▶</button>
        </div>
        <button class="v-dpad-btn down" data-key="ArrowDown">▼</button>
      </div>

      <!-- Functional Keys -->
      <div class="v-remote-actions">
        <button class="v-action-btn back" data-key="Escape">BACK</button>
        <button class="v-action-btn menu" data-key="m">MENU</button>
      </div>

      <!-- TV 4 Colored Keys -->
      <div class="v-color-buttons">
        <button class="v-color-btn red" data-key="1" title="Đi lại">🔴</button>
        <button class="v-color-btn green" data-key="2" title="Gợi ý">🟢</button>
        <button class="v-color-btn yellow" data-key="3" title="Ván mới">🟡</button>
        <button class="v-color-btn blue" data-key="4" title="Đổi nhãn">🔵</button>
      </div>
    `,e.querySelectorAll(`button[data-key]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.key;window.dispatchEvent(new KeyboardEvent(`keydown`,{key:n,bubbles:!0}))})}),e.querySelector(`#v-remote-close`).addEventListener(`click`,()=>{this.toggleVirtualRemote(!1)})}toggleVirtualRemote(e){this.showVirtualRemote=e===void 0?!this.showVirtualRemote:e;let t=document.getElementById(`virtual-tv-remote`);t&&(t.style.display=this.showVirtualRemote?`flex`:`none`);let n=document.querySelector(`#btn-virtual-remote .btn-text`);n&&(n.textContent=this.showVirtualRemote?`Ẩn Remote ảo`:`Hiện Remote ảo`)}bindSidebarClicks(){this.sidebarContainer.querySelectorAll(`[data-action]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.action;this.handleAction(t)})})}handleAction(e){switch(w.playSelect(),e){case`go-home`:this.app.returnToHomeScreen();break;case`new-game`:this.app.confirmNewGame();break;case`toggle-time-limit`:this.app.toggleTimeLimit();break;case`toggle-mode`:this.app.toggleGameMode();break;case`toggle-difficulty`:this.app.toggleDifficulty();break;case`toggle-side`:this.app.togglePlayerSide();break;case`undo`:this.app.undoMove();break;case`hint`:this.app.requestHint();break;case`toggle-labels`:this.app.toggleLabels();break;case`open-settings`:this.showSettingsModal();break;case`fullscreen`:this.toggleFullscreen();break;case`toggle-virtual-remote`:this.toggleVirtualRemote()}}getSidebarButtons(){return Array.from(this.sidebarContainer.querySelectorAll(`.tv-btn`))}updateSidebarFocus(e){this.getSidebarButtons().forEach((t,n)=>{n===e?(t.classList.add(`tv-focused`),t.focus()):t.classList.remove(`tv-focused`)})}updateStatus(e,t=!1){let n=document.getElementById(`turn-name`),r=document.getElementById(`turn-disc`),i=document.getElementById(`ai-status-badge`),a=document.getElementById(`check-alert-banner`),o=document.getElementById(`history-list`);if(!n||!r)return;let s=e.turn===`r`;if(n.textContent=s?`BÊN ĐỎ`:`BÊN ĐEN`,r.textContent=s?`帥`:`將`,r.className=`turn-disc ${s?`piece-red`:`piece-black`}`,i&&(i.style.display=t?`flex`:`none`),a){let t=e.isCheck(e.turn);a.style.display=t?`block`:`none`,t&&(a.textContent=`⚠️ CHIẾU TƯỚNG! (${s?`Đỏ`:`Đen`} bị chiếu)`)}if(o){let t=e.moveLog.slice(-6);o.innerHTML=t.length===0?`<span class="history-placeholder">Chưa có nước đi nào</span>`:t.map((n,r)=>`<span class="history-badge"><span class="h-num">${e.moveLog.length-t.length+r+1}.</span> ${n}</span>`).join(``)}}updateClocks(e,t,n,r){let i=document.getElementById(`clock-card-red`),a=document.getElementById(`clock-card-black`),o=document.getElementById(`clock-time-red`),s=document.getElementById(`clock-time-black`);if(!i||!a||!o||!s)return;if(!r||r===`none`||r===0){o.textContent=`∞`,s.textContent=`∞`,i.classList.remove(`clock-active`,`clock-warning`),a.classList.remove(`clock-active`,`clock-warning`);return}let c=e=>{let t=Math.floor(e/60),n=e%60;return`${t<10?`0`+t:``+t}:${n<10?`0`+n:``+n}`};o.textContent=c(e),s.textContent=c(t),n===`r`?(i.classList.add(`clock-active`),a.classList.remove(`clock-active`),e<=30?i.classList.add(`clock-warning`):i.classList.remove(`clock-warning`),a.classList.remove(`clock-warning`)):(a.classList.add(`clock-active`),i.classList.remove(`clock-active`),t<=30?a.classList.add(`clock-warning`):a.classList.remove(`clock-warning`),i.classList.remove(`clock-warning`))}toggleSound(){let e=w.toggleMute(),t=document.getElementById(`icon-sound`),n=document.getElementById(`text-sound`);t&&n&&(t.textContent=e?`🔇`:`🔊`,n.textContent=e?`Âm thanh: Tắt`:`Âm thanh: Bật`)}toggleFullscreen(){try{if(!document.fullscreenElement&&!document.webkitFullscreenElement){let e=document.documentElement;e.requestFullscreen?e.requestFullscreen().catch(()=>{}):e.webkitRequestFullscreen&&e.webkitRequestFullscreen()}else document.exitFullscreen?document.exitFullscreen().catch(()=>{}):document.webkitExitFullscreen&&document.webkitExitFullscreen()}catch(e){console.warn(`Fullscreen toggle err:`,e)}}showGameOverModal(e,t,n){if(!this.modalContainer)return;let r=e===`r`,i=r?`BÊN ĐỎ THẮNG CUỘC`:`BÊN ĐEN THẮNG CUỘC`,a=r?`帥`:`將`,o=r?`win-red`:`win-black`;this.modalContainer.innerHTML=`
      <div class="modal-backdrop">
        <div class="tv-modal glass-panel ${o}">
          <div class="modal-emblem">${a}</div>
          <h2 class="modal-title">${i}</h2>
          <p class="modal-desc">${t}</p>
          <div class="modal-actions" id="modal-actions">
            <button class="tv-btn tv-btn-primary tv-focused" id="modal-btn-restart">
              <span class="btn-icon">🔄</span>
              <span class="btn-text">Ván mới ngay</span>
            </button>
            <button class="tv-btn" id="modal-btn-close">
              <span class="btn-icon">👀</span>
              <span class="btn-text">Xem lại bàn cờ</span>
            </button>
          </div>
        </div>
      </div>
    `,this.modalContainer.style.display=`flex`,this.app.inputController.setArea(`modal`);let s=document.getElementById(`modal-btn-restart`),c=document.getElementById(`modal-btn-close`);s.addEventListener(`click`,()=>{this.closeModal(),n()}),c.addEventListener(`click`,()=>{this.closeModal()})}closeModal(){this.modalContainer&&(this.modalContainer.style.display=`none`,this.modalContainer.innerHTML=``),this.app.inputController.setArea(`board`)}showSettingsModal(){if(!this.modalContainer)return;let e={easy:`Dễ (Tập sự)`,medium:`Trung bình (Kỳ thủ)`,hard:`Khó (Cao thủ)`,master:`Thần cơ 👑`}[this.app.aiDifficulty]||`Trung bình`,t=this.app.playerSide===`r`?`Đỏ (Đi trước)`:`Đen (Đi sau)`,n=!this.app.timeControl||this.app.timeControl===`none`?`Vô hạn`:`${this.app.timeControl/60} phút`,r=w.isMuted?`Tắt`:`Bật`;this.modalContainer.innerHTML=`
      <div class="modal-backdrop">
        <div class="tv-modal glass-panel" style="width: min(90vw, 500px); padding: 26px 22px; text-align: left; gap: 12px;">
          <h2 class="modal-title" style="text-align: center; font-size: 24px; margin-bottom: 8px;">⚙️ CÀI ĐẶT VÁN ĐẤU</h2>
          
          <div style="display: flex; flex-direction: column; width: 100%;">
            <button class="tv-btn" id="m-btn-diff" style="margin-bottom: 9px !important;">
              <span class="btn-icon">⭐</span>
              <span class="btn-text">Độ khó Bot: <strong style="color: #fbbf24;" id="m-val-diff">${e}</strong></span>
            </button>

            <button class="tv-btn" id="m-btn-side" style="margin-bottom: 9px !important;">
              <span class="btn-icon">⚖️</span>
              <span class="btn-text">Phe bạn: <strong style="color: #fbbf24;" id="m-val-side">${t}</strong></span>
            </button>

            <button class="tv-btn" id="m-btn-time" style="margin-bottom: 9px !important;">
              <span class="btn-icon">⏱️</span>
              <span class="btn-text">Thời gian: <strong style="color: #fbbf24;" id="m-val-time">${n}</strong></span>
            </button>

            <button class="tv-btn" id="m-btn-sound" style="margin-bottom: 9px !important;">
              <span class="btn-icon" id="m-icon-sound">${w.isMuted?`🔇`:`🔊`}</span>
              <span class="btn-text">Âm thanh: <strong style="color: #fbbf24;" id="m-val-sound">${r}</strong></span>
            </button>

            <button class="tv-btn" id="m-btn-remote" style="margin-bottom: 9px !important;">
              <span class="btn-icon">📱</span>
              <span class="btn-text">Remote ảo: <strong style="color: #fbbf24;" id="m-val-remote">${this.showVirtualRemote?`Hiện`:`Ẩn`}</strong></span>
            </button>
          </div>

          <div style="margin-top: 10px; width: 100%; display: flex; justify-content: center;">
            <button class="tv-btn tv-btn-primary" id="m-btn-close" style="width: 100%; justify-content: center;">
              <span class="btn-icon">✕</span>
              <span class="btn-text">Đóng Cài Đặt</span>
            </button>
          </div>
        </div>
      </div>
    `,this.modalContainer.style.display=`flex`,this.app.inputController.setArea(`modal`);let i=document.getElementById(`m-btn-diff`);i&&i.addEventListener(`click`,()=>{this.app.toggleDifficulty();let e={easy:`Dễ (Tập sự)`,medium:`Trung bình (Kỳ thủ)`,hard:`Khó (Cao thủ)`,master:`Thần cơ 👑`};document.getElementById(`m-val-diff`).textContent=e[this.app.aiDifficulty]||`Trung bình`});let a=document.getElementById(`m-btn-side`);a&&a.addEventListener(`click`,()=>{this.app.togglePlayerSide(),document.getElementById(`m-val-side`).textContent=this.app.playerSide===`r`?`Đỏ (Đi trước)`:`Đen (Đi sau)`});let o=document.getElementById(`m-btn-time`);o&&o.addEventListener(`click`,()=>{this.app.toggleTimeLimit();let e=!this.app.timeControl||this.app.timeControl===`none`?`Vô hạn`:`${this.app.timeControl/60} phút`;document.getElementById(`m-val-time`).textContent=e});let s=document.getElementById(`m-btn-sound`);s&&s.addEventListener(`click`,()=>{this.toggleSound(),document.getElementById(`m-val-sound`).textContent=w.isMuted?`Tắt`:`Bật`,document.getElementById(`m-icon-sound`).textContent=w.isMuted?`🔇`:`🔊`});let c=document.getElementById(`m-btn-remote`);c&&c.addEventListener(`click`,()=>{this.toggleVirtualRemote(),document.getElementById(`m-val-remote`).textContent=this.showVirtualRemote?`Hiện`:`Ẩn`});let l=document.getElementById(`m-btn-close`);l&&l.addEventListener(`click`,()=>{this.closeModal()})}getModalButtons(){return!this.modalContainer||this.modalContainer.style.display===`none`?[]:Array.from(this.modalContainer.querySelectorAll(`.tv-btn`))}showToast(e){let t=document.getElementById(`tv-toast-popup`);t||(t=document.createElement(`div`),t.id=`tv-toast-popup`,t.className=`tv-toast-popup`,document.body.appendChild(t)),t.textContent=e,t.classList.add(`show`),clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>{t.classList.remove(`show`)},1800)}},k=class{constructor(e,t={}){this.container=e,this.onStartVsAi=t.onStartVsAi||(()=>{}),this.onStartTwoPlayer=t.onStartTwoPlayer||(()=>{}),this.onStartPuzzle=t.onStartPuzzle||(()=>{}),this.focusedCardIndex=0,this.cards=[],this.isVisible=!0,this.render()}show(){this.isVisible=!0,this.container.style.display=`flex`,this.updateCardFocus(this.focusedCardIndex)}hide(){this.isVisible=!1,this.container.style.display=`none`}render(){this.container.innerHTML=`
      <div class="home-screen-layout">
        <!-- Ambient Glowing Mist Background -->
        <div class="home-ambient-glow"></div>

        <!-- Majestic TV Header -->
        <header class="home-header">
          <div class="home-badge">SMART TV EDITION • CHUẨN 10-FOOT UI</div>
          <h1 class="home-title">KỲ THỦ ĐẠI CHIẾN</h1>
          <div class="home-subtitle">CỜ TƯỚNG HOÀNG GIA • ĐỈNH CAO TRÍ TUỆ PHÒNG KHÁCH</div>
        </header>

        <!-- Main TV Game Mode Cards -->
        <div class="home-cards-track" id="home-cards-track">
          <!-- Card 1: Đấu Với Máy -->
          <div class="tv-card glass-panel tv-focused" data-action="ai-mode" tabindex="0">
            <div class="card-icon-emblem ai-emblem">🤖</div>
            <div class="card-content">
              <span class="card-badge">TRÍ TUỆ NHÂN TẠO</span>
              <h2 class="card-title">Đấu Với Máy</h2>
              <p class="card-desc">Đối đầu cùng AI cao thủ tích hợp sách khai cuộc kinh điển và 4 cấp độ tư duy.</p>
              <div class="card-tags">
                <span class="tag">Tập sự</span>
                <span class="tag">Kỳ thủ</span>
                <span class="tag">Cao thủ</span>
                <span class="tag highlight">Thần cơ</span>
              </div>
            </div>
            <div class="card-cta">
              <span class="cta-badge">BẤM OK ĐỂ CHƠI</span>
            </div>
          </div>

          <!-- Card 2: Hai Người Chơi -->
          <div class="tv-card glass-panel" data-action="two-player" tabindex="0">
            <div class="card-icon-emblem pvp-emblem">⚔️</div>
            <div class="card-content">
              <span class="card-badge">ĐỐI KHÁNG TRỰC TIẾP</span>
              <h2 class="card-title">Hai Người Chơi</h2>
              <p class="card-desc">Giao lưu so tài cờ tướng cùng bạn bè và gia đình trên cùng màn hình TV.</p>
              <div class="card-tags">
                <span class="tag">Pass & Play</span>
                <span class="tag">Đồng hồ ván</span>
                <span class="tag">Phòng khách</span>
              </div>
            </div>
            <div class="card-cta">
              <span class="cta-badge">BẤM OK ĐỂ CHƠI</span>
            </div>
          </div>

          <!-- Card 3: Cờ Thế Giang Hồ -->
          <div class="tv-card glass-panel" data-action="puzzles" tabindex="0">
            <div class="card-icon-emblem puzzle-emblem">📜</div>
            <div class="card-content">
              <span class="card-badge">THỬ THÁCH TRÍ TUỆ</span>
              <h2 class="card-title">Cờ Thế Kinh Điển</h2>
              <p class="card-desc">Luyện nghệ thuật sát chiêu qua các tuyệt phẩm cờ tàn giang hồ lừng danh.</p>
              <div class="card-tags">
                <span class="tag">Đơn Mã Ẩm Tuyền</span>
                <span class="tag">Khổng Minh</span>
                <span class="tag">Thất Tinh</span>
              </div>
            </div>
            <div class="card-cta">
              <span class="cta-badge">BẤM OK ĐỂ GIẢI ĐỐ</span>
            </div>
          </div>

          <!-- Card 4: Hướng Dẫn & Cài Đặt -->
          <div class="tv-card glass-panel" data-action="settings" tabindex="0">
            <div class="card-icon-emblem setting-emblem">⚙️</div>
            <div class="card-content">
              <span class="card-badge">TÙY CHỈNH TRẢI NGHIỆM</span>
              <h2 class="card-title">Cài Đặt & Hướng Dẫn</h2>
              <p class="card-desc">Sơ đồ phím điều khiển Remote TV, âm thanh gỗ đa tầng và nhãn chữ Quốc ngữ.</p>
              <div class="card-tags">
                <span class="tag">Remote D-Pad</span>
                <span class="tag">Âm thanh gỗ</span>
                <span class="tag">Giọng nói</span>
              </div>
            </div>
            <div class="card-cta">
              <span class="cta-badge">XEM CHI TIẾT</span>
            </div>
          </div>
        </div>

        <!-- TV Bottom Navigation Legend -->
        <footer class="home-bottom-legend glass-panel">
          <div class="legend-pill"><span class="pill-key">◀ ▶</span> Chọn chế độ</div>
          <div class="legend-sep">•</div>
          <div class="legend-pill"><span class="pill-key ok">OK / Enter</span> Bắt đầu</div>
          <div class="legend-sep">•</div>
          <div class="legend-pill"><span class="pill-key">Chuột</span> Bấm trực tiếp</div>
          <div class="legend-sep">•</div>
          <button id="btn-fullscreen-home" class="tv-btn tv-btn-primary" style="padding: 6px 18px; font-size: 15px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
            <span class="btn-icon">⛶</span>
            <span class="btn-text">Toàn Màn Hình</span>
          </button>
        </footer>

        <!-- Sub-Modal Overlay (Config AI or Puzzles) -->
        <div class="home-submodal-root" id="home-submodal-root" style="display: none;"></div>
      </div>
    `,this.setupInteractions()}setupInteractions(){this.cards=Array.from(this.container.querySelectorAll(`.tv-card`)),this.cards.forEach((e,t)=>{e.addEventListener(`mouseenter`,()=>{this.updateCardFocus(t)}),e.addEventListener(`click`,()=>{w.playSelect(),this.handleCardAction(e.dataset.action)})});let e=this.container.querySelector(`#btn-fullscreen-home`);e&&e.addEventListener(`click`,e=>{e.stopPropagation(),w.playSelect(),this.toggleFullscreen()})}toggleFullscreen(){try{if(!document.fullscreenElement&&!document.webkitFullscreenElement){let e=document.documentElement;e.requestFullscreen?e.requestFullscreen().catch(()=>{}):e.webkitRequestFullscreen&&e.webkitRequestFullscreen()}else document.exitFullscreen?document.exitFullscreen().catch(()=>{}):document.webkitExitFullscreen&&document.webkitExitFullscreen()}catch(e){console.warn(`Fullscreen toggle err:`,e)}}updateCardFocus(e){this.focusedCardIndex=Math.max(0,Math.min(this.cards.length-1,e)),this.cards.forEach((e,t)=>{t===this.focusedCardIndex?e.classList.add(`tv-focused`):e.classList.remove(`tv-focused`)})}handleKeyDown(e){if(!this.isVisible)return!1;let t=this.container.querySelector(`#home-submodal-root`);if(t&&t.style.display!==`none`)return e.key===`Escape`||e.key===`Backspace`?(e.preventDefault(),w.playSelect(),t.style.display=`none`,!0):!1;if(e.key===`ArrowRight`||e.key===`Right`)return e.preventDefault(),w.playNavigate(),this.updateCardFocus(this.focusedCardIndex+1),!0;if(e.key===`ArrowLeft`||e.key===`Left`)return e.preventDefault(),w.playNavigate(),this.updateCardFocus(this.focusedCardIndex-1),!0;if(e.key===`Enter`||e.key===` `||e.key===`Select`){e.preventDefault(),w.playSelect();let t=this.cards[this.focusedCardIndex];return t&&this.handleCardAction(t.dataset.action),!0}return!1}handleCardAction(e){switch(e){case`ai-mode`:this.showAiSetupDialog();break;case`two-player`:this.hide(),this.onStartTwoPlayer();break;case`puzzles`:this.showPuzzleDialog();break;case`settings`:this.showSettingsHelpDialog()}}showAiSetupDialog(){let e=this.container.querySelector(`#home-submodal-root`);if(!e)return;e.innerHTML=`
      <div class="home-modal-backdrop">
        <div class="home-modal-box glass-panel">
          <h2 class="h-modal-title">CẤU HÌNH ĐẤU VỚI MÁY (AI)</h2>
          <p class="h-modal-desc">Tùy chọn độ thông minh của Bot và phe xuất trận của bạn</p>

          <!-- Difficulty Selector -->
          <div class="h-config-group">
            <span class="h-config-label">Cấp độ AI:</span>
            <div class="h-pill-selector" id="ai-diff-selector">
              <button class="h-pill-btn" data-val="easy">Tập sự</button>
              <button class="h-pill-btn active" data-val="medium">Kỳ thủ</button>
              <button class="h-pill-btn" data-val="hard">Cao thủ</button>
              <button class="h-pill-btn highlight-gold" data-val="master">Thần cơ 👑</button>
            </div>
          </div>

          <!-- Side Selector -->
          <div class="h-config-group">
            <span class="h-config-label">Phe của bạn:</span>
            <div class="h-pill-selector" id="ai-side-selector">
              <button class="h-pill-btn active" data-val="r">🔴 Bên Đỏ (Đi trước)</button>
              <button class="h-pill-btn" data-val="b">⚫ Bên Đen (Đi sau)</button>
            </div>
          </div>

          <!-- Time Limit Selector -->
          <div class="h-config-group">
            <span class="h-config-label">Giới hạn thời gian:</span>
            <div class="h-pill-selector" id="ai-time-selector">
              <button class="h-pill-btn" data-val="0">Vô hạn</button>
              <button class="h-pill-btn" data-val="180">3 phút</button>
              <button class="h-pill-btn" data-val="300">5 phút</button>
              <button class="h-pill-btn active" data-val="600">10 phút</button>
              <button class="h-pill-btn" data-val="900">15 phút</button>
            </div>
          </div>

          <!-- Actions -->
          <div class="h-modal-actions">
            <button class="tv-btn tv-btn-primary" id="btn-start-ai">
              <span class="btn-icon">⚔️</span>
              <span class="btn-text">Vào Trận Ngay</span>
            </button>
            <button class="tv-btn" id="btn-cancel-ai">
              <span class="btn-text">Quay lại</span>
            </button>
          </div>
        </div>
      </div>
    `,e.style.display=`flex`;let t=`medium`,n=`r`,r=600;e.querySelectorAll(`#ai-diff-selector .h-pill-btn`).forEach(n=>{n.addEventListener(`click`,()=>{w.playSelect(),e.querySelectorAll(`#ai-diff-selector .h-pill-btn`).forEach(e=>e.classList.remove(`active`)),n.classList.add(`active`),t=n.dataset.val})}),e.querySelectorAll(`#ai-side-selector .h-pill-btn`).forEach(t=>{t.addEventListener(`click`,()=>{w.playSelect(),e.querySelectorAll(`#ai-side-selector .h-pill-btn`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),n=t.dataset.val})}),e.querySelectorAll(`#ai-time-selector .h-pill-btn`).forEach(t=>{t.addEventListener(`click`,()=>{w.playSelect(),e.querySelectorAll(`#ai-time-selector .h-pill-btn`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),r=parseInt(t.dataset.val,10)})}),e.querySelector(`#btn-start-ai`).addEventListener(`click`,()=>{w.playMove(),e.style.display=`none`,this.hide(),this.onStartVsAi(t,n,r)}),e.querySelector(`#btn-cancel-ai`).addEventListener(`click`,()=>{w.playSelect(),e.style.display=`none`})}showPuzzleDialog(){let e=this.container.querySelector(`#home-submodal-root`);e&&(e.innerHTML=`
      <div class="home-modal-backdrop">
        <div class="home-modal-box glass-panel puzzle-modal">
          <h2 class="h-modal-title">CỜ THẾ KINH ĐIỂN</h2>
          <p class="h-modal-desc">Chọn một thế cờ để thử sức và rèn luyện sát chiêu</p>

          <div class="puzzle-list-items">
            ${p.map(e=>`
              <div class="puzzle-item glass-panel" data-id="${e.id}">
                <div class="p-header">
                  <span class="p-title">${e.title}</span>
                  <span class="p-diff">${e.difficulty}</span>
                </div>
                <p class="p-desc">${e.description}</p>
                <div class="p-hint">💡 Gợi ý: ${e.solutionHint}</div>
              </div>
            `).join(``)}
          </div>

          <div class="h-modal-actions">
            <button class="tv-btn" id="btn-close-puzzle">
              <span class="btn-text">Đóng</span>
            </button>
          </div>
        </div>
      </div>
    `,e.style.display=`flex`,e.querySelectorAll(`.puzzle-item`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.id,r=p.find(e=>e.id===n);r&&(w.playMove(),e.style.display=`none`,this.hide(),this.onStartPuzzle(r))})}),e.querySelector(`#btn-close-puzzle`).addEventListener(`click`,()=>{w.playSelect(),e.style.display=`none`}))}showSettingsHelpDialog(){let e=this.container.querySelector(`#home-submodal-root`);e&&(e.innerHTML=`
      <div class="home-modal-backdrop">
        <div class="home-modal-box glass-panel help-modal">
          <h2 class="h-modal-title">HƯỚNG DẪN ĐIỀU KHIỂN & TÍNH NĂNG</h2>

          <div class="help-grid">
            <div class="help-section">
              <h3>🎮 Điều khiển bằng Remote TV</h3>
              <p>• <b>▲ ▼ ◀ ▶</b>: Di chuyển khung ngắm mạ vàng qua 90 giao điểm.</p>
              <p>• <b>OK / Enter</b>: Chọn quân cờ / Đặt cờ vào ô chấm xanh.</p>
              <p>• <b>Back / Esc</b>: Hủy chọn / Mở bảng Menu bên phải.</p>
              <p>• <b>🔴 Phím Đỏ [1]</b>: Đi lại một nước (Undo).</p>
              <p>• <b>🟢 Phím Xanh [2]</b>: Gợi ý nước cờ tối ưu (AI Hint).</p>
              <p>• <b>🟡 Phím Vàng [3]</b>: Bắt đầu ván mới.</p>
              <p>• <b>🔵 Phím Lam [4]</b>: Bật / Tắt nhãn chữ Quốc ngữ.</p>
            </div>

            <div class="help-section">
              <h3>✨ Cảm giác chơi chân thực</h3>
              <p>• <b>Âm thanh gỗ đa tầng</b>: Tiếng "độp" ăn quân có sub-bass như gõ bàn lim thật.</p>
              <p>• <b>Rung chấn màn hình</b>: Bàn cờ nảy nhẹ khi ăn quân hoặc chiếu tướng.</p>
              <p>• <b>Giọng nói Việt</b>: Tự động hô "Chiếu tướng!" và "Chiến thắng!".</p>
              <p>• <b>Thanh Eval Bar</b>: Đo ưu thế thế trận theo thời gian thực.</p>
            </div>
          </div>

          <div class="h-modal-actions">
            <button class="tv-btn tv-btn-primary" id="btn-close-help">
              <span class="btn-text">Đã Hiểu</span>
            </button>
          </div>
        </div>
      </div>
    `,e.style.display=`flex`,e.querySelector(`#btn-close-help`).addEventListener(`click`,()=>{w.playSelect(),e.style.display=`none`}))}},A=class{constructor(){window.tvLog&&window.tvLog(`1. XiangqiTVApp constructor start`),this.game=new u,window.tvLog&&window.tvLog(`2. XiangqiGame created`),this.ai=new C(`medium`),window.tvLog&&window.tvLog(`3. XiangqiAI created`),this.gameMode=`vs-ai`,this.playerSide=s.RED,this.difficulty=`medium`,this.showLabels=!1,this.timeLimit=600,this.redTime=600,this.blackTime=600,this.clockInterval=null,this.selectedSquare=null,this.legalMoves=[],this.isAiThinking=!1,this.hintMove=null,window.tvLog&&window.tvLog(`4. Before calling this.init()`),this.init(),window.tvLog&&window.tvLog(`5. After calling this.init()`)}init(){let e=document.getElementById(`board-container`);window.tvLog&&window.tvLog(`init 1. boardContainer=`+!!e),this.boardView=new E(e,{showVietnameseLabels:this.showLabels,onCellClick:(e,t)=>this.handleCellClick(e,t),onCellHover:(e,t)=>this.handleCellHover(e,t)}),window.tvLog&&window.tvLog(`init 2. BoardView created`),w.setShakeCallback(e=>{this.boardView.triggerScreenShake(e)}),this.menuController=new O(this,{sidebarContainer:document.getElementById(`sidebar-container`),bottomBarContainer:document.getElementById(`bottom-bar-container`),modalContainer:document.getElementById(`modal-container`)}),window.tvLog&&window.tvLog(`init 3. TVMenuController created`);let t=document.getElementById(`home-screen-container`);window.tvLog&&window.tvLog(`init 4. homeContainer=`+!!t),this.homeScreen=new k(t,{onStartVsAi:(e,t,n)=>this.startVsAiGame(e,t,n),onStartTwoPlayer:e=>this.startTwoPlayerGame(e),onStartPuzzle:e=>this.startPuzzleGame(e)}),window.tvLog&&window.tvLog(`init 5. HomeScreen created`),this.inputController=new D({initialArea:`home`,onHomeKey:e=>this.homeScreen.handleKeyDown(e),onCursorMove:(e,t)=>this.boardView.updateTVCursor(e,t),onSelectCell:(e,t)=>this.handleCellClick(e,t),onBack:()=>this.handleBack(),onColorKey:e=>this.handleColorKey(e),onSidebarFocusChange:e=>this.menuController.updateSidebarFocus(e),onSidebarSelect:e=>{let t=this.menuController.getSidebarButtons();t[e]&&t[e].click()},getSidebarButtons:()=>this.menuController.getSidebarButtons(),getModalButtons:()=>this.menuController.getModalButtons()}),window.tvLog&&window.tvLog(`init 6. TVInputController created`),this.render(),window.tvLog&&window.tvLog(`init 7. Initial render done`)}returnToHomeScreen(){this.stopClock(),this.homeScreen.show(),this.inputController.setArea(`home`)}startVsAiGame(e,t,n=600){this.gameMode=`vs-ai`,this.difficulty=e,this.playerSide=t,this.timeLimit=n===void 0?600:n,this.ai.setDifficulty(e);let r=document.getElementById(`text-mode`);r&&(r.textContent=`Chế độ: Đấu với Máy`);let i={easy:`Dễ (Tập sự)`,medium:`Trung bình (Kỳ thủ)`,hard:`Khó (Cao thủ)`,master:`Thần cơ 👑`},a=document.getElementById(`text-difficulty`);a&&(a.textContent=`Độ khó: ${i[e]||e}`);let o=document.getElementById(`text-player-side`);o&&(o.textContent=t===s.RED?`Phe bạn: Đỏ (Đi trước)`:`Phe bạn: Đen (Đi sau)`),this.inputController.setArea(`board`),this.resetGame()}startTwoPlayerGame(e=600){this.gameMode=`2-player`,this.playerSide=s.RED,this.timeLimit=e===void 0?600:e;let t=document.getElementById(`text-mode`);t&&(t.textContent=`Chế độ: 2 Người chơi`),this.inputController.setArea(`board`),this.resetGame()}startPuzzleGame(e){this.gameMode=`vs-ai`,this.playerSide=s.RED,this.difficulty=`hard`,this.timeLimit=0,this.ai.setDifficulty(`hard`),this.game.loadFromFen(e.fen),this.selectedSquare=null,this.legalMoves=[],this.hintMove=null;let t=document.getElementById(`text-mode`);t&&(t.textContent=`Thế cờ: ${e.title}`),this.inputController.setArea(`board`),this.resetClocks(0),this.render(),w.speakVoice(e.title)}isHumanTurn(){return this.isAiThinking||this.game.isGameOver||this.boardView.isAnimating?!1:this.gameMode===`2-player`||this.game.turn===this.playerSide}handleCellHover(e,t){this.boardView.isAnimating||this.inputController.area!==`modal`&&this.inputController.area!==`home`&&(this.inputController.setCursor(e,t),this.menuController.updateSidebarFocus(-1))}handleCellClick(e,t){if(this.boardView.isAnimating||(this.inputController.area!==`modal`&&this.inputController.area!==`home`&&(this.inputController.setCursor(e,t),this.menuController.updateSidebarFocus(-1)),!this.isHumanTurn()))return;let n=this.game.getPiece(e,t),r=this.game.getPieceSide(n);if(!this.selectedSquare){n&&r===this.game.turn&&(this.selectedSquare={r:e,c:t},this.legalMoves=this.game.getLegalMovesForPiece(e,t),this.hintMove=null,w.playSelect(),this.render());return}let i=this.legalMoves.find(n=>n.to.r===e&&n.to.c===t);if(i){this.executeMove(i),this.selectedSquare=null,this.legalMoves=[],this.hintMove=null;return}if(n&&r===this.game.turn){this.selectedSquare={r:e,c:t},this.legalMoves=this.game.getLegalMovesForPiece(e,t),this.hintMove=null,w.playSelect(),this.render();return}this.selectedSquare=null,this.legalMoves=[],w.playSelect(),this.render()}executeMove(e){let t=!!e.captured,n=this.game.getPiece(e.from.r,e.from.c);this.boardView.animateMove({from:e.from,to:e.to,piece:n,isAI:!1,isCapture:t,capturedPiece:e.captured,onComplete:()=>{if(this.game.makeMove(e)){if(t?w.playPieceCapture(n):w.playMove(),this.game.isCheck(this.game.turn)&&setTimeout(()=>w.playCheck(),140),this.render(),this.game.isGameOver){this.stopClock(),this.handleGameOver();return}this.gameMode===`vs-ai`&&this.game.turn!==this.playerSide&&this.triggerAiTurn()}}})}triggerAiTurn(){var e=this;return h(function*(){e.isAiThinking=!0,e.ai.cancelled=!1,e.menuController.updateStatus(e.game,!0);try{let t=yield e.ai.getBestMove(e.game);if(e.ai.cancelled)return;if(t&&!e.game.isGameOver){if(e.boardView.selectedSquare={r:t.from.r,c:t.from.c},e.boardView.renderHighlights(),yield new Promise(e=>setTimeout(e,120)),e.ai.cancelled)return;let n=e.game.getPiece(t.from.r,t.from.c),r=!!t.captured;yield new Promise(i=>{e.boardView.animateMove({from:t.from,to:t.to,piece:n,isAI:!0,isCapture:r,capturedPiece:t.captured,onComplete:()=>{if(e.ai.cancelled){i();return}e.game.makeMove(t),e.boardView.selectedSquare=null,r?w.playPieceCapture(n):w.playMove(),e.game.isCheck(e.game.turn)&&setTimeout(()=>w.playCheck(),140),i()}})})}}catch(e){console.error(`AI error:`,e)}finally{e.isAiThinking=!1,e.render(),e.game.isGameOver&&(e.stopClock(),e.handleGameOver())}})()}handleGameOver(){let e=this.game.winner===this.playerSide;this.gameMode===`vs-ai`?e?w.playVictory():w.playDefeat():w.playVictory(),this.menuController.showGameOverModal(this.game.winner,this.game.winReason,()=>this.resetGame())}handleBack(){if(this.selectedSquare){this.selectedSquare=null,this.legalMoves=[],this.hintMove=null,w.playSelect(),this.render();return}if(this.inputController.area===`sidebar`){this.inputController.setArea(`board`);return}if(this.isAiThinking||this.game.history.length>0){this.undoMove();return}this.inputController.setArea(`sidebar`)}handleColorKey(e){switch(e){case`red`:this.undoMove();break;case`green`:this.requestHint();break;case`yellow`:this.confirmNewGame();break;case`blue`:this.toggleLabels();break;case`menu`:this.inputController.setArea(`sidebar`)}}undoMove(){if(this.isAiThinking){this.ai.cancelled=!0,this.isAiThinking=!1,this.game.undo(),this.selectedSquare=null,this.legalMoves=[],this.hintMove=null,w.playSelect(),this.render(),this.menuController.showToast(`↩️ Đã hủy nước đi nhầm (Đi lại)`);return}if(this.gameMode===`vs-ai`){if(this.game.history.length>=2)this.game.undo(),this.game.undo();else if(this.game.history.length===1)this.game.undo();else{w.playError();return}}else if(!this.game.undo()){w.playError();return}this.selectedSquare=null,this.legalMoves=[],this.hintMove=null,w.playSelect(),this.render(),this.menuController.showToast(`↩️ Đã đi lại nước cờ (Undo)`)}requestHint(){var e=this;return h(function*(){if(!e.isHumanTurn())return;let t=yield e.ai.getBestMove(e.game);t&&(e.selectedSquare={r:t.from.r,c:t.from.c},e.legalMoves=[t],e.hintMove=t,w.playSelect(),e.render())})()}resetClocks(e=this.timeLimit){this.timeLimit=e,this.redTime=e,this.blackTime=e,this.menuController.updateClocks(this.redTime,this.blackTime,this.game.turn,this.timeLimit)}startClock(){if(this.stopClock(),this.timeLimit===0){this.menuController.updateClocks(0,0,this.game.turn,0);return}this.clockInterval=setInterval(()=>{this.game.isGameOver||this.homeScreen&&this.homeScreen.isVisible||this.timeLimit!==0&&(this.game.turn===s.RED?(this.redTime=Math.max(0,this.redTime-1),this.redTime<=10&&this.redTime>0&&w.playClockTick(),this.redTime===0&&this.handleTimeOut(s.RED)):(this.blackTime=Math.max(0,this.blackTime-1),this.blackTime<=10&&this.blackTime>0&&w.playClockTick(),this.blackTime===0&&this.handleTimeOut(s.BLACK)),this.menuController.updateClocks(this.redTime,this.blackTime,this.game.turn,this.timeLimit))},1e3)}stopClock(){this.clockInterval&&(clearInterval(this.clockInterval),this.clockInterval=null)}handleTimeOut(e){this.stopClock(),w.playTimeOut(),this.game.endGameByTimeout(e),this.handleGameOver()}toggleTimeLimit(){let e=[0,180,300,600,900],t={0:`Thời gian: Vô hạn`,180:`Thời gian: 3 phút (Chớp)`,300:`Thời gian: 5 phút (Nhanh)`,600:`Thời gian: 10 phút`,900:`Thời gian: 15 phút`},n=(e.indexOf(this.timeLimit)+1)%e.length;this.timeLimit=e[n];let r=document.getElementById(`text-time-limit`);r&&(r.textContent=t[this.timeLimit]),this.resetClocks(this.timeLimit),this.startClock(),w.playSelect()}resetGame(){this.game.reset(),this.selectedSquare=null,this.legalMoves=[],this.hintMove=null,this.isAiThinking=!1,w.playSelect(),this.resetClocks(this.timeLimit),this.startClock();let e=this.game.findKing(this.playerSide);e&&this.inputController.setCursor(e.r,e.c),this.render(),this.gameMode===`vs-ai`&&this.playerSide===s.BLACK&&setTimeout(()=>this.triggerAiTurn(),400)}confirmNewGame(){this.resetGame()}toggleGameMode(){this.gameMode=this.gameMode===`vs-ai`?`2-player`:`vs-ai`;let e=document.getElementById(`text-mode`);e&&(e.textContent=this.gameMode===`vs-ai`?`Chế độ: Đấu với Máy`:`Chế độ: 2 Người chơi`),this.resetGame()}toggleDifficulty(){let e=[`easy`,`medium`,`hard`,`master`],t={easy:`Dễ (Tập sự)`,medium:`Trung bình (Kỳ thủ)`,hard:`Khó (Cao thủ)`,master:`Thần cơ 👑`},n=(e.indexOf(this.difficulty)+1)%e.length;this.difficulty=e[n],this.ai.setDifficulty(this.difficulty);let r=document.getElementById(`text-difficulty`);r&&(r.textContent=`Độ khó: ${t[this.difficulty]}`)}togglePlayerSide(){this.playerSide=this.playerSide===s.RED?s.BLACK:s.RED;let e=document.getElementById(`text-player-side`);e&&(e.textContent=this.playerSide===s.RED?`Phe bạn: Đỏ (Đi trước)`:`Phe bạn: Đen (Đi sau)`),this.resetGame()}toggleLabels(){this.showLabels=this.boardView.toggleVietnameseLabels();let e=document.getElementById(`text-labels`);e&&(e.textContent=`Mặt cờ: ${this.showLabels?`Quốc ngữ`:`Chữ Hán`}`),this.render()}render(){let e=this.ai.getEvaluationScore(this.game);this.boardView.render(this.game,{selectedSquare:this.selectedSquare,legalMoves:this.legalMoves,lastMove:this.game.getLastMove(),evalScore:e}),this.menuController.updateStatus(this.game,this.isAiThinking)}};function j(){if(typeof window<`u`&&window.tvLog&&window.tvLog(`startXiangqiApp() called, readyState=`+document.readyState),!window.xiangqiApp)try{window.tvLog&&window.tvLog(`Instantiating XiangqiTVApp...`),window.xiangqiApp=new A,window.app=window.xiangqiApp,typeof window<`u`&&window.tvLog&&window.tvLog(`XiangqiTVApp initialized successfully!`),console.log(`XiangqiTVApp initialized successfully`)}catch(e){typeof window<`u`&&window.tvLog&&window.tvLog(`XiangqiTVApp init ERROR: `+(e.stack||e.message||e)),console.error(`Failed to init XiangqiTVApp:`,e);let t=document.createElement(`div`);t.style=`position:fixed;top:20px;left:20px;right:20px;background:#991b1b;color:#fff;padding:20px;border-radius:12px;font-size:20px;z-index:99999;font-family:sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.8);`,t.innerHTML=`<h3>Lỗi khởi động cờ tướng:</h3><pre style="white-space:pre-wrap;font-size:16px;">${e.stack||e.message||e}</pre>`,document.body.appendChild(t)}}typeof window<`u`&&window.tvLog&&window.tvLog(`index.js script evaluated`),document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,j):j()})();
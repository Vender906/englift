/* Світлові ефекти: налаштування, класи на <html>, пресети, інтенсивність, збереження */
const { boot } = require('./_boot');
const { window, doc, errs, go, ok, click } = boot();
const $ = s => doc.querySelector(s), $$ = s => [...doc.querySelectorAll(s)];
const root = doc.documentElement;
const stored = () => JSON.parse(window.localStorage.getItem('fluentlab_v2') || '{}').settings || {};

(async () => {
  try {
    go('#/');
    ok(!!$('#fx-aura'), 'aura layer present');
    ok(root.classList.contains('fx-hover-glow') && root.classList.contains('fx-spotlight') && !root.classList.contains('fx-card-glow'), 'default effects applied');

    click($('#settings-btn'));
    ok(/Світлові ефекти/.test($('#modal-root').textContent) && !!$('#set-fx'), 'settings has light-effects row');
    click($('#set-fx'));
    ok($$('.fx-modal .fx-item').length === 8, 'fx panel lists 8 effects');

    const glow = $('[data-fx="cardGlow"]');
    glow.checked = true; glow.dispatchEvent(new window.Event('change', { bubbles: true }));
    ok(root.classList.contains('fx-card-glow') && stored().fx.cardGlow === true, 'card glow toggles on & saves');
    ok(glow.closest('.fx-item').classList.contains('on'), 'item highlighted when on');

    click($('[data-lvl="2"]'));
    ok(root.style.getPropertyValue('--fx-i') === '1.6' && stored().fxLevel === 2, 'intensity «Яскраво» sets --fx-i');

    click($('[data-preset="none"]'));
    ok(['fx-card-glow', 'fx-hover-glow', 'fx-spotlight', 'fx-rim', 'fx-aura', 'fx-shine', 'fx-neon', 'fx-sparks'].every(c => !root.classList.contains(c)), 'preset «вимкнути все»');
    click($('[data-preset="all"]'));
    ok(['fx-card-glow', 'fx-rim', 'fx-aura', 'fx-neon', 'fx-sparks'].every(c => root.classList.contains(c)) && $$('.fx-item.on').length === 8, 'preset «увімкнути все»');

    // іскри при кліку
    const before = $$('.fx-spark').length;
    const btn = $('.fx-quick button');
    btn.dispatchEvent(new window.MouseEvent('pointerdown', { bubbles: true, clientX: 50, clientY: 50 }));
    ok($$('.fx-spark').length > before, 'sparks spawn on click');

    click($('[data-preset="default"]'));
    ok(root.classList.contains('fx-shine') && !root.classList.contains('fx-rim'), 'preset «за замовчуванням»');

    click($('#fx-close'));
    ok(!!$('#set-fx'), '«Готово» returns to settings');
    click($('#modal-root .modal-backdrop'));

    // з галереї тем
    click($('#theme-toggle'));
    ok(!!$('#tm-fx'), 'theme gallery has effects button');
    click($('#tm-fx'));
    ok(!!$('.fx-modal'), 'effects panel opens from theme gallery');
    click($('#fx-close'));
  } catch (e) { errs.push('TEST THREW: ' + e.stack); }

  console.log(errs.length ? 'FAILURES: ' + errs.join(' | ') : 'EFFECTS OK ✓');
  process.exit(errs.length ? 1 : 0);
})();

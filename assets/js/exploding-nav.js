/* Exploding Head Nav (ported from /cv6)
   - Vanilla JS, self-contained.
   - Does NOT touch existing theme menu/search.
*/
(function () {
  const root = document.querySelector('[data-exploding-nav]');
  if (!root) return;

  const button = root.querySelector('.exploding-nav-button');
  const panel = root.querySelector('.home-page-nav');

  if (!button || !panel) return;

  const setExpanded = (isOpen) => {
    root.classList.toggle('active', isOpen);
    root.classList.remove('first-run');
    button.setAttribute('aria-expanded', String(isOpen));
  };

  const isOpen = () => root.classList.contains('active');

  const toggle = (e) => {
    if (e) e.preventDefault();
    setExpanded(!isOpen());
  };

  button.addEventListener('click', toggle);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setExpanded(false);
      button.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    if (root.contains(e.target)) return;
    setExpanded(false);
  });

  // If a link is clicked, close the menu (nice UX on mobile)
  panel.addEventListener('click', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (a) setExpanded(false);
  });
})();

// src/lib/accessibility/no-flash-script.ts

// Raw JS string executed in <body> before React hydrates, so saved settings
// apply before first paint (no flash of unstyled/animated content). Keep the
// attribute mapping in sync with applyAttributes() in storage.ts.
export const NO_FLASH_SCRIPT = `
(function () {
  try {
    var KEY = "heartloom:a11y";
    var raw = window.localStorage.getItem(KEY);
    var s = raw ? JSON.parse(raw) : {};
    var prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var el = document.documentElement;
    el.setAttribute("data-a11y-text", s.textScale || "normal");
    el.setAttribute("data-a11y-contrast", s.contrast || "normal");
    var reduce = s.reduceMotion != null ? s.reduceMotion : prefersReduced;
    el.setAttribute("data-a11y-motion", reduce ? "reduce" : "ok");
    el.setAttribute("data-a11y-cb", s.colorblindSafe ? "on" : "off");
  } catch (e) {}
})();
`;

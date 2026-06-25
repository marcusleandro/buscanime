/** Viewport coordinates used as the origin of the circular theme transition. */
export type ThemeToggleOrigin = {
  x: number;
  y: number;
};

function getRevealRadius({ x, y }: ThemeToggleOrigin): number {
  return Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
}

/**
 * Applies a theme change with a circular View Transition when supported.
 *
 * Falls back to an immediate {@link updateTheme} call when
 * `document.startViewTransition` is unavailable.
 *
 * @param origin - Pixel coordinates for the reveal circle center.
 * @param updateTheme - Callback that commits the new theme to React state/DOM.
 */
export function runCircularThemeTransition(
  origin: ThemeToggleOrigin,
  updateTheme: () => void
): void {
  if (!document.startViewTransition) {
    updateTheme();
    return;
  }

  const { x, y } = origin;
  const endRadius = getRevealRadius(origin);

  const transition = document.startViewTransition(updateTheme);

  transition.ready
    .then(() => {
      requestAnimationFrame(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    })
    .catch(() => {
      // Transition skipped or interrupted — theme already updated.
    });
}

/** Returns the center of the current viewport for keyboard-triggered toggles. */
export function getViewportCenter(): ThemeToggleOrigin {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

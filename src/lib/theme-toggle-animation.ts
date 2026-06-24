type ThemeToggleOrigin = {
  x: number
  y: number
}

function getRevealRadius({ x, y }: ThemeToggleOrigin) {
  return Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )
}

export function runCircularThemeTransition(
  origin: ThemeToggleOrigin,
  updateTheme: () => void
) {
  if (!document.startViewTransition) {
    updateTheme()
    return
  }

  const { x, y } = origin
  const endRadius = getRevealRadius(origin)

  const transition = document.startViewTransition(updateTheme)

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
        )
      })
    })
    .catch(() => {
      // Transition skipped or interrupted — theme already updated.
    })
}

export function getViewportCenter(): ThemeToggleOrigin {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }
}

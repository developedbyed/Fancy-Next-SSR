//Shake animation

export const shakeAnimation = {
  initial: {
    x: 0,
    transition: {
      duration: 0,
    },
  },
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
}

export function GradientBackground() {
  const gradientStyle = {
    background: `
      radial-gradient(circle at 75% 50%, #5E5CE6, #BF5AF2, #64D2FF, #0A84FF 1000%)
    `,
    width: '100vw',
    height: '100vh'
  }

  return <div style={gradientStyle}></div>
}

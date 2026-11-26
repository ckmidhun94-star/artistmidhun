import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [hiding, setHiding] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setHiding(true), 650)
    const removeTimer = window.setTimeout(() => setRemoved(true), 1300)
    return () => {
      window.clearTimeout(hideTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (removed) return null

  const radius = 34
  const circumference = 2 * Math.PI * radius

  return (
    <div className={`loading-screen${hiding ? ' is-hidden' : ''}`} aria-hidden="true">
      <div className="loading-ring">
        <svg viewBox="0 0 80 80">
          <circle className="lr-track" cx="40" cy="40" r={radius} />
          <circle
            className="lr-arc"
            cx="40"
            cy="40"
            r={radius}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
      </div>
    </div>
  )
}

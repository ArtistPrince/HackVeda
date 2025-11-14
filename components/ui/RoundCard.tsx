'use client'

import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import './ThemeCard.css'

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)'

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1600,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 260
}

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max)
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision))
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin))

interface RoundCardProps {
  title: string
  description: string
  date: string
  iconUrl?: string | null
  imageUrl?: string | null
  grainUrl?: string | null
  innerGradient?: string
  behindGlowEnabled?: boolean
  behindGlowColor?: string
  behindGlowSize?: string
  className?: string
  enableTilt?: boolean
  enableMobileTilt?: boolean
  mobileTiltSensitivity?: number
  buttonText?: string | null
  onButtonClick?: (title: string) => void
  onClick?: (title: string) => void
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void
  setTarget: (x: number, y: number) => void
  toCenter: () => void
  beginInitial: (durationMs: number) => void
  getCurrent: () => { x: number; y: number; tx: number; ty: number }
  cancel: () => void
}

const RoundCardComponent: React.FC<RoundCardProps> = ({
  title,
  description,
  date,
  iconUrl,
  imageUrl,
  grainUrl,
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  buttonText,
  onButtonClick,
  onClick
}) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)

  const enterTimerRef = useRef<number | null>(null)
  const leaveRafRef = useRef<number | null>(null)

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null

    let rafId: number | null = null
    let running = false
    let lastTs = 0

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const DEFAULT_TAU = 0.14
    const INITIAL_TAU = 0.6
    let initialUntil = 0

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current
      const wrap = wrapRef.current
      if (!shell || !wrap) return

      const width = shell.clientWidth || 1
      const height = shell.clientHeight || 1

      const percentX = clamp((100 / width) * x)
      const percentY = clamp((100 / height) * y)

      const centerX = percentX - 50
      const centerY = percentY - 50

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      }

      for (const [k, v] of Object.entries(properties)) {
        wrap.style.setProperty(k, v as string)
      }
    }

    const step = (ts: number) => {
      if (!running) return
      if (lastTs === 0) lastTs = ts
      const dt = (ts - lastTs) / 1000
      lastTs = ts

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU
      const k = 1 - Math.exp(-dt / tau)

      currentX += (targetX - currentX) * k
      currentY += (targetY - currentY) * k

      setVarsFromXY(currentX, currentY)

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step)
      } else {
        running = false
        lastTs = 0
        if (rafId) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
      }
    }

    const start = () => {
      if (running) return
      running = true
      lastTs = 0
      rafId = requestAnimationFrame(step)
    }

    return {
      setImmediate(x: number, y: number) {
        currentX = x
        currentY = y
        setVarsFromXY(currentX, currentY)
      },
      setTarget(x: number, y: number) {
        targetX = x
        targetY = y
        start()
      },
      toCenter() {
        const shell = shellRef.current
        if (!shell) return
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2)
      },
      beginInitial(durationMs: number) {
        initialUntil = performance.now() + durationMs
        start()
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY }
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = null
        running = false
        lastTs = 0
      }
    }
  }, [enableTilt])

  const getOffsets = (evt: PointerEvent | DeviceOrientationEvent, el: HTMLElement) => {
    if ('clientX' in evt) {
      const rect = el.getBoundingClientRect()
      return { x: evt.clientX - rect.left, y: evt.clientY - rect.top }
    }
    return { x: 0, y: 0 }
  }

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current
      if (!shell || !tiltEngine) return
      const { x, y } = getOffsets(event, shell)
      tiltEngine.setTarget(x, y)
    },
    [tiltEngine]
  )

  const handlePointerEnter = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current
      if (!shell || !tiltEngine) return

      shell.classList.add('active')
      shell.classList.add('entering')
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current)
      enterTimerRef.current = window.setTimeout(function(): void {
        shell.classList.remove('entering')
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS)

      const { x, y } = getOffsets(event, shell)
      tiltEngine.setTarget(x, y)
    },
    [tiltEngine]
  )

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current
    if (!shell || !tiltEngine) return

    tiltEngine.toCenter()

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent()
      const settled = Math.hypot(tx - x, ty - y) < 0.6
      if (settled) {
        shell.classList.remove('active')
        leaveRafRef.current = null
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle)
      }
    }
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current)
    leaveRafRef.current = requestAnimationFrame(checkSettle)
  }, [tiltEngine])

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const shell = shellRef.current
      if (!shell || !tiltEngine) return

      const { beta, gamma } = event
      if (beta == null || gamma == null) return

      const centerX = shell.clientWidth / 2
      const centerY = shell.clientHeight / 2
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth)
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight
      )

      tiltEngine.setTarget(x, y)
    },
    [tiltEngine, mobileTiltSensitivity]
  )

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return

    const shell = shellRef.current
    if (!shell) return

    const pointerMoveHandler = handlePointerMove as EventListener
    const pointerEnterHandler = handlePointerEnter as EventListener
    const pointerLeaveHandler = handlePointerLeave
    const deviceOrientationHandler = handleDeviceOrientation as EventListener

    shell.addEventListener('pointerenter', pointerEnterHandler)
    shell.addEventListener('pointermove', pointerMoveHandler)
    shell.addEventListener('pointerleave', pointerLeaveHandler)

    const handleClick = () => {
      if (!enableMobileTilt || typeof window === 'undefined' || window.location.protocol !== 'https:') return
      const anyMotion = (window as any).DeviceMotionEvent
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion
          .requestPermission()
          .then((state: string) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler)
            }
          })
          .catch(console.error)
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler)
      }
    }
    shell.addEventListener('click', handleClick)

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET
    tiltEngine.setImmediate(initialX, initialY)
    tiltEngine.toCenter()
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION)

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler)
      shell.removeEventListener('pointermove', pointerMoveHandler)
      shell.removeEventListener('pointerleave', pointerLeaveHandler)
      shell.removeEventListener('click', handleClick)
      window.removeEventListener('deviceorientation', deviceOrientationHandler)
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current)
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current)
      tiltEngine.cancel()
      shell.classList.remove('entering')
    }
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation
  ])

  const cardStyle = useMemo(
    () => ({
      '--icon': iconUrl ? `url(${iconUrl})` : 'none',
      '--grain': grainUrl ? `url(${grainUrl})` : 'none',
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
      '--behind-glow-color': behindGlowColor ?? 'rgba(125, 190, 255, 0.67)',
      '--behind-glow-size': behindGlowSize ?? '50%'
    }),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]
  )

  const handleCardClick = useCallback(() => {
    onClick?.(title)
  }, [onClick, title])

  const handleButtonClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation()
      }
      onButtonClick?.(title)
    },
    [onButtonClick, title]
  )

  return (
    <div
      ref={wrapRef}
      className={`theme-card-wrapper ${className}`.trim()}
      style={cardStyle as React.CSSProperties}
    >
      {behindGlowEnabled && <div className="pc-behind" />}
      <div ref={shellRef} className="theme-card-shell" onClick={handleCardClick}>
        <section className="theme-card">
          <div className="theme-card-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />
            <div className="theme-card-content">
              <div className="theme-card-header">
                {iconUrl && (
                  <div className="theme-icon">
                    <img src={iconUrl} alt={`${title} icon`} loading="lazy" />
                  </div>
                )}
                <h2 className="theme-title">{title}</h2>
              </div>
              {description && (
                <p className="theme-description">{description}</p>
              )}
              {date && (
                <div
                  style={{
                    color: '#E16D3C',
                    fontWeight: '700',
                    fontSize: '1.2rem',
                    marginTop: buttonText ? '1rem' : '-0.4rem',
                    marginBottom: buttonText ? '1.5rem' : '1rem',
                    textShadow: '0 0 12px rgba(225,109,60,0.5), 0 2px 8px rgba(225,109,60,0.3)',
                    letterSpacing: '0.5px',
                    textAlign: 'center'
                  }}
                >
                  {date}
                </div>
              )}
            </div>
            {imageUrl && (
              <div className="theme-card-image">
                <img src={imageUrl} alt={title} loading="lazy" />
              </div>
            )}
            {/* The duplicated date block was here. I have removed it. */}
            {buttonText && (
              <div className="round-card-button-wrapper">
                <LiquidButton
                  size="sm"
                  className="relative font-bold bg-gradient-to-r from-[#2C3E50] via-[#E16D3C] to-[#E8DDBF] text-white 
                    hover:from-[#E16D3C] hover:via-[#E8DDBF] hover:to-[#2C3E50]
                    transition-all duration-300
                    shadow-[0_0_20px_rgba(225,109,60,0.5),0_0_40px_rgba(232,221,191,0.3),0_0_60px_rgba(44,62,80,0.2)]
                    hover:shadow-[0_0_30px_rgba(225,109,60,0.7),0_0_60px_rgba(232,221,191,0.5),0_0_90px_rgba(44,62,80,0.3)]
                    hover:scale-105"
                  onClick={handleButtonClick}
                >
                  <span className="relative z-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    {buttonText}
                  </span>
                </LiquidButton>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

const RoundCard = React.memo(RoundCardComponent)

export default RoundCard
'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

import './AnimatedList.css'

interface AnimatedItemProps {
  children: React.ReactNode
  delay?: number
  index: number
  onMouseEnter?: () => void
  onClick?: () => void
}

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }: AnimatedItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedListProps {
  items?: any[]
  onItemSelect?: (item: any, index: number) => void
  showGradients?: boolean
  enableArrowNavigation?: boolean
  className?: string
  itemClassName?: string
  displayScrollbar?: boolean
  initialSelectedIndex?: number
  selectedIndex?: number
  onSelectionChange?: (index: number) => void
  children?: React.ReactNode
}

const AnimatedList = ({
  items = [],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1,
  selectedIndex: externalSelectedIndex,
  onSelectionChange,
  children
}: AnimatedListProps) => {
  const listRef = useRef<HTMLDivElement>(null)
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(initialSelectedIndex)
  const selectedIndex = externalSelectedIndex !== undefined ? externalSelectedIndex : internalSelectedIndex
  
  const setSelectedIndex = (index: number) => {
    if (externalSelectedIndex === undefined) {
      setInternalSelectedIndex(index)
    }
    if (onSelectionChange) {
      onSelectionChange(index)
    }
  }
  const [keyboardNav, setKeyboardNav] = useState(false)
  const [topGradientOpacity, setTopGradientOpacity] = useState(0)
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    setTopGradientOpacity(Math.min(scrollTop / 50, 1))
    const bottomDistance = scrollHeight - (scrollTop + clientHeight)
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1))
  }

  useEffect(() => {
    if (!enableArrowNavigation) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const itemCount = children ? React.Children.count(children) : items.length
      
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex((prev: number) => Math.min(prev + 1, itemCount - 1))
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex((prev: number) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < itemCount) {
          e.preventDefault()
          if (onItemSelect) {
            if (items.length > 0) {
              onItemSelect(items[selectedIndex], selectedIndex)
            } else if (children) {
              // For children, we can't get the item directly, so pass the index
              const childArray = React.Children.toArray(children)
              if (childArray[selectedIndex]) {
                onItemSelect(childArray[selectedIndex], selectedIndex)
              }
            }
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation, children])

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return

    const container = listRef.current
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`)
    
    if (selectedItem) {
      const extraMargin = 50
      const containerScrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      const itemTop = (selectedItem as HTMLElement).offsetTop
      const itemBottom = itemTop + (selectedItem as HTMLElement).offsetHeight

      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' })
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        })
      }
    }

    setKeyboardNav(false)
  }, [selectedIndex, keyboardNav])

  return (
    <div className={`scroll-list-container ${className}`}>
      <div 
        ref={listRef} 
        className={`scroll-list ${!displayScrollbar ? 'no-scrollbar' : ''}`} 
        onScroll={handleScroll}
      >
        {children || items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.1}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index)
              if (onItemSelect) {
                onItemSelect(item, index)
              }
            }}
          >
            <div className={`item ${selectedIndex === index ? 'selected' : ''} ${itemClassName}`}>
              <p className="item-text">{item}</p>
            </div>
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div className="top-gradient" style={{ opacity: topGradientOpacity }}></div>
          <div className="bottom-gradient" style={{ opacity: bottomGradientOpacity }}></div>
        </>
      )}
    </div>
  )
}

export default AnimatedList


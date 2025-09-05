'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useThemeStorage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    setTheme,
    mounted,
    toggleTheme,
  }
}
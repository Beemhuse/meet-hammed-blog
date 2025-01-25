import { ThemeProvider } from 'next-themes'
import React from 'react'

export default function ThemeProviderComp({children}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
        {children}
    </ThemeProvider>
  )
}

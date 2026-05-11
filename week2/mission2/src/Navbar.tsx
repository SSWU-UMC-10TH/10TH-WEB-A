import React from 'react'
import { useTheme, THEME } from './context/ThemeProvider' 
import ThemeToggleButton from './ThemeToggleButton'
import clsx from 'clsx'; 

const Navbar = () => {
    const { theme } = useTheme();
   
    const isLightMode = theme === THEME.LIGHT;

  return (
    <nav className={clsx(
        'p-4 w-full flex justify-end', 
        isLightMode ? 'bg-white text-black' : 'bg-gray-800'
    )}>
        <ThemeToggleButton />
    </nav>
  )
}

export default Navbar 
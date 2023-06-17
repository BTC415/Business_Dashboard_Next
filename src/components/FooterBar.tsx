import React, { ReactNode } from 'react'
import { containerMaxW } from '../config'
import JustboilLogo from './JustboilLogo'

type Props = {
  children: ReactNode
  className?: string
}

export default function FooterBar({ children, className }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className={`${className} py-2 px-6 z-30 relative bg-gray-50 text-gray-400 ${containerMaxW}`}>
      <div className="block md:flex items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <b>
            &copy;Copyright {year},{` Zbooni `}
          </b>
          {` `}
          {children}
        </div>
        <div className="md:py-2">
          <a href="https://justboil.me" rel="noreferrer" target="_blank">
          </a>
        </div>
      </div>
    </footer>
  )
}

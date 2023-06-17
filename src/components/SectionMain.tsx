import React, { ReactNode } from 'react'
import { containerMaxW } from '../config'

type Props = {
  children: ReactNode
}

export default function SectionMain({ children }: Props) {
  return <section className={`bg-gray-100 dark:bg-slate-800 z-30  min-h-screen relative p-6 ${containerMaxW}`}>{children}</section>
}

import React, { ReactNode } from 'react'
import { containerMaxW } from '../config'

type Props = {
  children: ReactNode
}

export default function SectionMain({ children }: Props) {
  return <section className={`bg-gray-50 dark:bg-slate-800 z-30 relative p-6 ${containerMaxW}`}>{children}</section>
}

import React, { useContext } from 'react'
import { MenuAsideItem } from '../interfaces'
import AsideMenuLayer from './AsideMenuLayer'
import OverlayLayer from './OverlayLayer'
import { sidePadding } from '../config'
import Store from '../store/store'

type Props = {
  menu: MenuAsideItem[]
  onAsideLgClose: () => void
}
export default function AsideMenu({
  ...props
}: Props) {

  const {state} = useContext(Store);
  return (
    <>
      <AsideMenuLayer
        menu={props.menu}
        className={` transition-all ease-in-out ${state.asideMobileExpanded ? '  lg:-left-0 left-0' : `-left-[250px] xl:left-0`} ${!state.asideLgActive ? 'lg:hidden xl:flex' : ''
          }`}
        onAsideLgCloseClick={props.onAsideLgClose}
      />
      {state.asideLgActive && <OverlayLayer zIndex="z-35" onClick={props.onAsideLgClose} />}
    </>
  )
}

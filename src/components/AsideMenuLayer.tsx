import React from 'react'
import BaseIcon from './BaseIcon'
import { mdiLogout, mdiClose, mdiPhoneInTalk } from '@mdi/js'
import AsideMenuItem from './AsideMenuItem'
import AsideMenuList from './AsideMenuList'
import { MenuAsideItem } from '../interfaces'
import { useAppSelector } from '../stores/hooks'
import { sidePadding } from '../config'
import Image from 'next/image'
import PillTag from './PillTag'
import BaseButton from './BaseButton'

type Props = {
  menu: MenuAsideItem[]
  className?: string
  onAsideLgCloseClick: () => void
}

export default function AsideMenuLayer({ menu, className = '', ...props }: Props) {
  const asideStyle = useAppSelector((state) => state.style.asideStyle)
  const asideBrandStyle = useAppSelector((state) => state.style.asideBrandStyle)
  const asideScrollbarsStyle = useAppSelector((state) => state.style.asideScrollbarsStyle)
  const darkMode = useAppSelector((state) => state.style.darkMode)

  const logoutItem: MenuAsideItem = {
    label: 'Logout',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
  }

  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault()
    props.onAsideLgCloseClick()
  }

  return (
    <aside
      className={`${className} zzz lg:py-0 lg:pl-0 w-${sidePadding} fixed flex z-40 xl:z-10 top-0 h-screen transition-position overflow-hidden`}
    >
      <div
        className={` flex-1 flex flex-col overflow-hidden dark:bg-slate-900 ${asideStyle}`}
      >
        <div
          className={`flex flex-row h-50 items-center justify-between dark:bg-slate-900 ${asideBrandStyle}`}
        >
          <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
            <b className="font-black mask-logo left-0 flex transition lg:overflow-hidden lg:transition-all">
              <Image className="ml-5 mt-5" alt="zbooni" src="https://zbooni.com/dashboard/_next/static/media/zbooni-logo-secondary.70f86621.svg" width="124" height="23" />
              <br />
            </b>
            <div className="text-left pl-5">Dashboard

              <PillTag className=' visible mt-1 block max-h-4 whitespace-pre text-xs font-thin text-black opacity-100 lg:transition-all' label="Beta" color="success" small={true} />
              
          <button
            className="hidden lg:inline-block xl:hidden p-3"
            onClick={handleAsideLgCloseClick}
          >
            <BaseIcon path={mdiClose} />
          </button>
            </div>
            <div className=" relative m-12 mb-0 h-18 w-36 overflow-hidden rounded-lg">
             <Image alt="abdula" src="https://www.zbooni.com/dashboard/_next/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fbusiness_logos%2FIMG_20221201_170154041.jpg&w=1080&q=75" width="200" height="180" />
              
            </div>
            <div>مستشار</div>
            <div className="text-sm mb-8">king abdullah, Riyadh, Saudi Arabia</div>
            <div className="m-5">
              <BaseButton className='font-bold'
            label="Create New Order"
            color="white"
            roundedFull
            /></div>
          </div>
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
            }`}
        >
          <AsideMenuList menu={menu} />
          <div className="m-1">
              <BaseButton className='font-bold text-xs border-white border-2'
            label="Chat with a Zbooni Agent"
            href="https://api.whatsapp.com/send?phone=971555928787&text=Hello%20Zbooni%2C%20I%20am%20on%20the%20dashboard%20and%20need%20assistance.%20My%20store%20ID%20is%2094728"
            color="contrast"
            icon={mdiPhoneInTalk}
            roundedFull
            /></div>
        </div>
        
        <ul>
          <AsideMenuItem item={logoutItem} />
        </ul>
      </div>
    </aside>
  )
}

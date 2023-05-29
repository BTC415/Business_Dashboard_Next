import React, { ReactNode, useEffect } from 'react'
import { useState } from 'react'
import { mdiForwardburger, mdiBackburger, mdiMenu, mdiLessThan, mdiGreaterThan } from '@mdi/js'
import menuAside from '../menuAside'
import menuNavBar from '../menuNavBar'
import BaseIcon from '../components/BaseIcon'
import NavBar from '../components/NavBar'
import NavBarItemPlain from '../components/NavBarItemPlain'
import AsideMenu from '../components/AsideMenu'
import FooterBar from '../components/FooterBar'
import { setUser } from '../stores/mainSlice'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import FormField from '../components/FormField'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import {sidePadding} from '../config'
import StatesContext from './StatesContext'
import Link from 'next/link'

type Props = {
  children: ReactNode
}

export default function LayoutAuthenticated({ children }: Props) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      setUser({
        name: 'addullah',
        email: 'addullah@zbooni.com',
        avatar:
          'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93',
      })
    )
  })

  const darkMode = useAppSelector((state) => state.style.darkMode)

  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(true)
  const [isAsideLgActive, setIsAsideLgActive] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAsideMobileExpanded(true)
      setIsAsideLgActive(false)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [router.events, dispatch])

  const layoutAsidePadding = isAsideMobileExpanded ? `xl:pl-[265px]`:`xl:pl-[100px]`

  return (
    <StatesContext.Provider value={[isAsideMobileExpanded, isAsideLgActive]}>
    <div className={`${darkMode ? 'dark' : ''} overflow-hidden lg:overflow-visible`}>
      <div
        className={`${layoutAsidePadding} ${
          isAsideMobileExpanded ? `ml-${sidePadding} lg:ml-0` : ''
        } pt-14 min-h-screen w-screen transition-position lg:w-auto bg-black dark:bg-slate-800 dark:text-slate-100`}
      >
        <NavBar
          menu={menuNavBar}
          className={`${isAsideMobileExpanded ? 'xl:ml-[260px] lg:ml-0':'xl:ml-[100px]'}  `}
        >
          <NavBarItemPlain
            display="flex lg:hidden"
            onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
          >
            <BaseIcon path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger} size="24" />
          </NavBarItemPlain>
          <NavBarItemPlain
            display="hidden xl:flex relative -left-[25px] top-[25px]"
            onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
          >
            <BaseIcon className='bg-white rounded-full  shadow-lg shadow-cyan-500/50' path={isAsideMobileExpanded ? mdiLessThan : mdiGreaterThan} size="12" />
          </NavBarItemPlain>
          <NavBarItemPlain
            display="hidden lg:flex xl:hidden"
            onClick={() => setIsAsideLgActive(true)}
          >
            <BaseIcon path={mdiMenu} size="24" />
          </NavBarItemPlain>
          <NavBarItemPlain useMargin>
            <Formik
              initialValues={{
                search: '',
              }}
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form>
                <FormField isBorderless isTransparent>
                  <Field name="search" placeholder="Search" />
                </FormField>
              </Form>
            </Formik>
          </NavBarItemPlain>
        </NavBar>
        <AsideMenu
          isAsideMobileExpanded={isAsideMobileExpanded}
          isAsideLgActive={isAsideLgActive}
          menu={menuAside}
          onAsideLgClose={() => setIsAsideLgActive(false)}
        />
        {children}
        <FooterBar>
        All Rights Reserved. <Link className=' text-blue-400' href="#">Terms & Conditions</Link> <span>|</span> 
        <Link className=' text-blue-400' href="#"> Privacy Policy </Link> 
        
        </FooterBar>
      </div>
    </div>
    </StatesContext.Provider>
  )
}

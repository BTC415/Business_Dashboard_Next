import React, { ReactNode, useEffect, useState, useContext, useReducer } from 'react'

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
import { sidePadding } from '../config'
import Store from '../store/store'
import Link from 'next/link'
import CircularProgress from "@mui/material/CircularProgress";
import reducer from '../store/reducer'
import { LG_ACTIVE, MOBILE_EXPAND } from '../store/actionType'
import ToastService from '../components/ToastService'


type Props = {
  children: ReactNode
}

export default function LayoutAuthenticated({ children }: Props) {
  const appDispatch = useAppDispatch()

  useEffect(() => {
    appDispatch(
      setUser({
        name: 'abdullah',
        email: 'abdullah@zbooni.com',
        avatar:
          'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93',
      })
    )
  })

  const darkMode = useAppSelector((state) => state.style.darkMode)


  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      dispatch({ type: MOBILE_EXPAND, payload: { value: true } });
      dispatch({ type: LG_ACTIVE, payload: { value: true } });
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [router.events, appDispatch])

  const layoutAsidePadding = state.asideMobileExpanded ? `xl:pl-[255px] pl-[255px] lg:pl-0` : `xl:pl-[100px]`

  return (
    <Store.Provider value={{state, dispatch}}>
      <div className={`${darkMode ? 'dark' : ''} overflow-hidden lg:overflow-visible`}>
        <div
          className={`${layoutAsidePadding} ${state.asideMobileExpanded ? `ml-${sidePadding} lg:ml-0` : ''
            } pt-14 min-h-screen w-screen transition-position lg:w-auto bg-black dark:bg-slate-800 dark:text-slate-100`}
        >
          <NavBar
            menu={menuNavBar}
            className={`${state.asideMobileExpanded ? 'xl:ml-[255px] ml-[255px] lg:ml-0 ' : 'xl:ml-[100px]'}  `}
          >
            <NavBarItemPlain
              display="flex lg:hidden"
              onClick={() => dispatch({type:MOBILE_EXPAND,payload:{value:!state.asideMobileExpanded}})}
            >
              <BaseIcon path={state.asideMobileExpanded ? mdiBackburger : mdiForwardburger} size="24" />
            </NavBarItemPlain>
            <NavBarItemPlain
              display="hidden xl:flex relative -left-[25px] top-[25px]"
              onClick={() => dispatch({type:MOBILE_EXPAND,payload:{value:!state.asideMobileExpanded}})}
            >
              <BaseIcon className='bg-white rounded-full dark:bg-gray-950  shadow-lg shadow-cyan-500/50' path={state.asideMobileExpanded ? mdiLessThan : mdiGreaterThan} size="12" />
            </NavBarItemPlain>
            <NavBarItemPlain
              display="hidden lg:flex xl:hidden"
              onClick={() => dispatch({type:LG_ACTIVE,payload:{value:true}})}
            >
              <BaseIcon path={mdiMenu} size="24" />
            </NavBarItemPlain>
            {/* <NavBarItemPlain useMargin>
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
          </NavBarItemPlain> */}
          </NavBar>
          <AsideMenu
            menu={menuAside}
            onAsideLgClose={() => dispatch({type:LG_ACTIVE,payload:{value:false}})}
          />
          {children}
          <FooterBar className='dark:bg-slate-900'>
            All Rights Reserved. <Link className=' text-blue-400' href="#">Terms & Conditions</Link> <span>|</span>
            <Link className=' text-blue-400' href="#"> Privacy Policy </Link>

          </FooterBar>
        </div>
        <div
          style={{
            display: "flex",
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: state.apiCallsInProgress ? "5080" : "-1",
            opacity: state.apiCallsInProgress ? 1 : 0,
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity .5s ease-in-out .2s",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
        <ToastService />
      </div>
    </Store.Provider>
  )
}

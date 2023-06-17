import {
    mdiMonitorDashboard,
    mdiAccount,
    mdiMail,
    mdiSearchWeb,
    mdiMagnify,
    mdiCog
  } from '@mdi/js'
  import Head from 'next/head'
  import Image from 'next/image'
  import React, { useState } from 'react'
  import BaseIcon from '../components/BaseIcon'
  import type { ReactElement } from 'react'
  import LayoutAuthenticated from '../layouts/Authenticated'
  import SectionMain from '../components/SectionMain'
  import CardBoxWidget from '../components/CardBoxWidget'
  import { Formik, Form,Field } from 'formik'
  import FormField from '../components/FormField'
  import CardBoxComponentBody from '../components/CardBoxComponentBody'
  import CardBoxComponentFooter from '../components/CardBoxComponentFooter'
  import BaseButtons from '../components/BaseButtons'
  import BaseButton from '../components/BaseButton'
  import { useSampleClients, useSampleTransactions } from '../hooks/sampleData'
  import CardBox from '../components/CardBox'
  import { sampleChartData } from '../components/ChartLineSample/config'
  import { getPageTitle } from '../config'
  import Link from 'next/link'
import TableCatalog from '../components/TableCatalog'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
  
  const Invoices = () => {
    const { clients } = useSampleClients()
    const { transactions } = useSampleTransactions()
  
    const clientsListed = clients.slice(0, 4)
  
    const [chartData, setChartData] = useState(sampleChartData())
  
    const fillChartData = (e: React.MouseEvent) => {
      e.preventDefault()
  
      setChartData(sampleChartData())
    }
  
    const userForm = {
      username:'abc',
      email:'d'
    }
    return (
      <>
        <Head>
          <title>{getPageTitle('Dashboard')}</title>
        </Head>
        <SectionMain>
  
       
        <SectionTitleLineWithButton icon={mdiCog} title=" Tax Invoice Summary forMay 2023" main />
            
        
        <TableCatalog/>
        </SectionMain>
      </>
    )
  }
  
  Invoices.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
  }
  
  export default Invoices
  
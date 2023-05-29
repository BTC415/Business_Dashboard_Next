import {
    mdiMonitorDashboard,
    mdiAccount,
    mdiMail,
    mdiSearchWeb,
    mdiMagnify
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
  import TableOrders from '../components/TableOrders'
import TableCustomers from '../components/TableCustomers'
import { UserForm } from '../interfaces'
  
  const Orders = () => {
    const { clients } = useSampleClients()
    const { transactions } = useSampleTransactions()
  
    const clientsListed = clients.slice(0, 4)
  
    const [chartData, setChartData] = useState(sampleChartData())
  
    const fillChartData = (e: React.MouseEvent) => {
      e.preventDefault()
  
      setChartData(sampleChartData())
    }
  
    const userFormVal = {
      username:'abc',
      email:'d'
    }
    return (
      <>
        <Head>
          <title>{getPageTitle('Dashboard')}</title>
        </Head>
        <SectionMain>
  
            Customers
            
            <CardBox className="flex-1" hasComponentLayout>
              <Formik
                initialValues={userFormVal}
                onSubmit={(values: UserForm) => alert(JSON.stringify(values, null, 2))}
              >
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <FormField
                      label="Name"
                      // help="Required. Your name"
                      labelFor="name"
                      icons={[mdiMagnify]}
                    >
                      <Field name="name" id="name" placeholder="Who are you looking for?" />
                    </FormField>
                  </CardBoxComponentBody>
                </Form>
              </Formik>
            </CardBox>
        
        <TableCustomers/>
        </SectionMain>
      </>
    )
  }
  
  Orders.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
  }
  
  export default Orders
  
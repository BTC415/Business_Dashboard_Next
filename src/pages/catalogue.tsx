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
import TableCatalogue from '../components/TableCataloue'
import { UserForm } from '../interfaces'

const Catalogue = () => {
  const { clients } = useSampleClients()
  const { transactions } = useSampleTransactions()

  const clientsListed = clients.slice(0, 4)

  const [chartData, setChartData] = useState(sampleChartData())

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }
const initVal={
  username:'abc',
  email:'a'
}
  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>

          Products
          
          <CardBox className="flex-1" hasComponentLayout>
            <Formik initialValues={initVal}
              onSubmit={(values: UserForm) => alert(JSON.stringify(values, null, 2))}
            >
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <FormField
                    // help="Required. Your name"
                    labelFor="name"
                    icons={[mdiMagnify]}
                  >
                    <Field name="name" id="name" placeholder="Which product do you want to find?" />
                  </FormField>
                </CardBoxComponentBody>
              </Form>
            </Formik>
          </CardBox>
      
      <TableCatalogue/>
      </SectionMain>
    </>
  )
}

Catalogue.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Catalogue

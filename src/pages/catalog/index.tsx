import {
  mdiMonitorDashboard,
  mdiAccount,
  mdiMail,
  mdiSearchWeb,
  mdiMagnify
} from '@mdi/js'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BaseIcon from '../../components/BaseIcon'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import CardBoxWidget from '../../components/CardBoxWidget'
import { Formik, Form, Field } from 'formik'
import FormField from '../../components/FormField'
import CardBoxComponentBody from '../../components/CardBoxComponentBody'
import CardBoxComponentFooter from '../../components/CardBoxComponentFooter'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import { useCatalog, useSampleClients, useSampleTransactions } from '../../hooks/sampleData'
import CardBox from '../../components/CardBox'
import { sampleChartData } from '../../components/ChartLineSample/config'
import { getPageTitle } from '../../config'
import Link from 'next/link'
import TableCatalog from '../../components/TableCatalog'
import { Catalog, UserForm } from '../../interfaces'

const Catalog = () => {
  const initVal = {
    username: 'abc',
    email: 'a'
  }
  const { catalog: custom }: { catalog: Catalog[] } = useCatalog()
  const [catalog, setCatalog] = useState(custom);
  useEffect(() => {
    setCatalog(custom);
  }, [custom])
  const handleChange = (e) => {
    const new_catalog = custom.filter(c => {
      const search = e.target.value.toLowerCase().trim().split(" ");
      return search.some((ser) => c.ProductName.toLowerCase().includes(ser))
    });
    setCatalog(new_catalog);
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
                  <Field name="name" onChange={handleChange} id="name" placeholder="Which product do you want to find?" />
                </FormField>
              </CardBoxComponentBody>
            </Form>
          </Formik>
        </CardBox>

        <TableCatalog catalog={catalog} setCatalog={setCatalog} />
      </SectionMain>
    </>
  )
}

Catalog.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Catalog

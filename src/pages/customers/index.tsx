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
import CardBox from '../../components/CardBox'
import { sampleChartData } from '../../components/ChartLineSample/config'
import { getPageTitle } from '../../config'
import Link from 'next/link'
import TableOrders from '../../components/TableOrders'
import TableCustomers from '../../components/TableCustomers'
import { useCustomers } from '../../hooks/sampleData'
import { Customer, UserForm } from '../../interfaces'

const Customers = () => {
  const { customers: custom }:{customers:Customer[]} = useCustomers()
  const [customers, setCustomers] = useState(custom);


  const handleChange = (e) => {
    const new_customers=custom.filter(c=>{
      const search = e.target.value.toLowerCase().trim().split(" ");
      return search.some((ser)=>c.FirstName.toLowerCase().includes(ser)|| c.LastName.toLowerCase().includes(ser))
    });
    setCustomers(new_customers);
  }
  useEffect(() => {
    setCustomers(custom);
  }, [custom])
  const userFormVal = {
    username: 'abc',
    email: 'd'
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
            onSubmit={(values: UserForm) => { values }}
          >
            <Form className="flex flex-col flex-1">
              <CardBoxComponentBody>
                <FormField
                  label="Name"
                  // help="Required. Your name"
                  labelFor="name"
                  icons={[mdiMagnify]}
                >
                  <Field onChange={handleChange} name="name" id="name" placeholder="Who are you looking for?" />
                </FormField>
              </CardBoxComponentBody>
            </Form>
          </Formik>
        </CardBox>

        <TableCustomers customers={customers} setCustomers={setCustomers} />
      </SectionMain>
    </>
  )
}

Customers.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Customers

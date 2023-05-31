import {
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
import { UserForm } from '../interfaces'
import TablePayouts from '../components/TablePayouts'
  
  const Payouts = () => {
    const { clients } = useSampleClients()
  
    const userFormVal = {
      username:'abc',
      email:'d'
    }
    return (
      <>
        <Head>
          <title>{getPageTitle('Payouts')}</title>
        </Head>
        <SectionMain>
  
            Payouts

            <CardBox className="m-6">


          <div className="w-1/2 border-r-2 float-left">
            <Image alt="img" className="float-left m-6" src="https://zbooni.com/dashboard/_next/static/media/icon-2.6fb94324.svg" width={70} height={100} />
            <div className="p-3 ">
              <p className="text-gray-500"> Account Balance </p>
              <p className="text-4xl"> SAR <b>403.09</b> </p>
              <p className=" text-blue-400 text-sm"> (1 Orders) </p>

            </div>
          </div>

          <div className="w-1/2 float-left">
            <Image alt="img" className="float-left m-6" src="https://zbooni.com/dashboard/_next/static/media/icon-1.1c5c2bce.svg" width={70} height={100} />
            <div className="p-3 ">
              <p className="text-gray-500"> Eligable for Payout </p>
              <p className="text-4xl"> SAR <b>403.09</b> </p>
              <p className=" text-blue-400 text-sm"> (1 Orders) </p>

            </div>
          </div>

        </CardBox>
            
            <CardBox className="flex-1" hasComponentLayout>
              <Formik
                initialValues={userFormVal}
                onSubmit={(values: UserForm) => alert(JSON.stringify(values, null, 2))}
              >
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <FormField
                      // help="Required. Your name"
                      labelFor="name"
                      icons={[mdiMagnify]}
                    >
                      <Field name="name" id="name" placeholder="Looking for a perticular payout ID?" />
                    </FormField>
                  </CardBoxComponentBody>
                </Form>
              </Formik>
            </CardBox>
        
        <TablePayouts/>
        </SectionMain>
      </>
    )
  }
  
  Payouts.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
  }
  
  export default Payouts
  
import {
  mdiMonitorDashboard
} from '@mdi/js'
import Head from 'next/head'
import React, { useState } from 'react'
import BaseIcon from '../../components/BaseIcon'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import CardBoxWidget from '../../components/CardBoxWidget'
import CardBox from '../../components/CardBox'
import { getPageTitle } from '../../config'
import Link from 'next/link'
import TableOrders from '../../components/TableOrders'

const Orders = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Orders')}</title>
      </Head>
      <SectionMain>

        Orders
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
          <CardBoxWidget
            className=' bg-green-100'
            trendLabel="Successfully Paid"
            trendType="success"
            trendColor="success"
            // icon={mdiAccountMultiple}
            iconColor="success"
            number={1}
            label=" "
          ><Link className=' text-blue-400' href={"#"}>(See all)</Link></CardBoxWidget>
          <CardBoxWidget
            className=' bg-red-100'
            trendLabel="Failed Payments"
            trendType="failed"
            trendColor="danger"
            // icon={mdiAccountMultiple}
            iconColor="success"
            number={0}
            label=" "
          ><Link className=' text-blue-400' href={"#"}>(See all)</Link></CardBoxWidget>
          <CardBoxWidget
            className=' bg-orange-100'
            trendLabel="Pending Payments"
            trendType="waiting"
            trendColor="warning"
            // icon={mdiAccountMultiple}
            iconColor="success"
            number={1}
            label=" "
          ><Link className=' text-blue-400' href={"#"}>(See all)</Link></CardBoxWidget>
          <CardBox className=''>
            <h1 className='float-right text-5xl m-3 font-bold'>50%</h1>
            <BaseIcon className=' align-middle m-3' size={24} path={mdiMonitorDashboard} />
            <b>Success Rate</b>
            <p className='text-xs text-gray-300'>Amount of orders successfully paid vs created and shared orders</p>
          </CardBox>
        </div>

        <TableOrders />
      </SectionMain>
    </>
  )
}

Orders.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Orders

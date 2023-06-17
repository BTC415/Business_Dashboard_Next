import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiGithub,
  mdiMonitorCellphone,
  mdiReload,
  mdiMinus,
  mdiCloseThick,
  mdiCog
} from '@mdi/js'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import BaseIcon from '../components/BaseIcon'
import type { ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import CardBoxWidget from '../components/CardBoxWidget'
import { useSampleClients, useSampleTransactions } from '../hooks/sampleData'
import CardBoxTransaction from '../components/CardBoxTransaction'
import { Client, Transaction } from '../interfaces'
import CardBoxClient from '../components/CardBoxClient'
import SectionBannerStarOnGitHub from '../components/SectionBannerStarOnGitHub'
import CardBox from '../components/CardBox'
import { sampleChartData } from '../components/ChartLineSample/config'
import ChartLineSample from '../components/ChartLineSample'
import NotificationBar from '../components/NotificationBar'
import TableSampleClients from '../components/TableSampleClients'
import { getPageTitle } from '../config'
import Link from 'next/link'

const Dashboard = () => {
  const { clients } = useSampleClients()
  const { transactions } = useSampleTransactions()
  const [welcomeState, setWelcomeState] = useState(true);

  const clientsListed = clients.slice(0, 4)

  const [chartData, setChartData] = useState(sampleChartData())

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>

        <hr className="border-dashed" />
        
        <CardBox className={`m-6 ${!welcomeState?"hidden":""}`}>

          <p className=" w-full">
            <BaseButton
              icon={mdiCloseThick}
              onClick={() => {setWelcomeState(false)}}
              className={`flex-none float-right dark:bg-slate-900 dark:text-white  `}
              // w="w-16"
            /> </p>
          <Image alt="img" className=" float-right" src="https://zbooni.com/dashboard/_next/image?url=%2Fdashboard%2F_next%2Fstatic%2Fmedia%2Fwelcome-graphic.a5b0eb20.png&w=1920&q=75" width={300} height={300} />
          <div className="w-2/4 p-8">
            <h1 className="text-md font-semibold md:mt-0 mb-4 lg:text-2xl lg:font-light">Hello! Welcome to your Business Dashboard</h1>
            <p >This is your portal to analytics and insights that will help you Track Everything and stay on top of your business. Use this dashboard to track you sales performance, customers, top selling products or services and keep a clear record of your receipts.</p>

          </div>


        </CardBox>

        <SectionTitleLineWithButton icon={mdiCog} title="Wallet" main />
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
        <SectionTitleLineWithButton icon={mdiCog} title="Sales Summary for May 2023" main />
        <div className="m-2 w-full grid grid-cols-4 gap-3 lg:grid-cols-6 mb-6">
          <CardBox className="col-span-4">


            <div className="float-left w-full">
            <div className="grid grid-cols-5 gap-3  ">
              <div>
              <p className="text-gray-500"> Sales </p>
              <p className="text-3xl"> SAR <b>0.00</b> </p>
              <p className=" text-blue-400 text-sm"> (0 Order) </p>
              </div>
              <div className=' text-5xl'>
                <BaseIcon size={80} path={mdiMinus} />
              </div>
              <div>
              <p className="text-gray-500"> Refunds </p>
              <p className="text-3xl"> SAR <b>0.00</b> </p>
              <p className=" text-blue-400 text-sm"> (0 Order) </p>
              </div>
              <div className=' text-5xl'>
                <BaseIcon size={80} path={mdiMinus} />
              </div>
              <div>
              <p className="text-gray-500"> Sales - Refunds </p>
              <p className="text-3xl"> SAR <b>0.00</b> </p>
              </div>
            </div>
            </div>

          </CardBox>
          <CardBox className="p-6">


            <div className=" w-full">
              <div className=" ">
                <p className="text-gray-500 text-sm"> Current Month Growth </p>
                <p className="text-4xl"> 0% </p>

              </div>
            </div>

          </CardBox>
          <CardBox className="p-6">


            <div className=" w-full">
              <div className="">
                <p className="text-gray-500 text-sm"> Avg Basket </p>
                <p className="text-4xl"> 0% </p>

              </div>
            </div>

          </CardBox>
        </div>



        <div className="m-2 w-full mb-6">
          <CardBox className="">


            <div className="float-left w-full">
              Orders <Link className=' text-blue-400' href={"#"}>(See all)</Link>
            <div className="grid grid-cols-6 gap-3  ">
              <div>
              <p className="text-gray-500"> Successful Payments </p>
              <p className=" text-green-600 text-4xl font-bold p-3"> 0 </p>
              <p className="text-gray-500"> Conversion Rate </p>
              <p className=" text-green-600 text-4xl font-bold p-3"> 0% </p>
              </div>
              <div>
              <p className="text-gray-500"> Pending Payments </p>
              <p className=" text-red-400 text-4xl font-bold p-3"> 1 </p>
              <p className="text-gray-500"> Failed Payments </p>
              <p className=" text-red-600 text-4xl font-bold p-3"> 0 </p>
              </div>
              <div className='col-span-4'>
                Weekly Order Value(SAR)

                <CardBox>{chartData && <ChartLineSample data={chartData} />}</CardBox>
              </div>
            </div>
            </div>

          </CardBox>
        </div>

        <div className="m-2 w-full mb-6">
          <CardBox className=" text-center text-gray-400">
            No Customer Data

          </CardBox>
        </div>
        <div className="m-2 w-full mb-6">
          <CardBox className=" text-center text-gray-400">
            No Selling Products

          </CardBox>
        </div>












        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trendLabel="12%"
            trendType="up"
            trendColor="success"
            icon={mdiAccountMultiple}
            iconColor="success"
            number={512}
            label="Clients"
          />
          <CardBoxWidget
            trendLabel="16%"
            trendType="down"
            trendColor="danger"
            icon={mdiCartOutline}
            iconColor="info"
            number={7770}
            numberPrefix="$"
            label="Sales"
          />
          <CardBoxWidget
            trendLabel="Overflow"
            trendType="warning"
            trendColor="warning"
            icon={mdiChartTimelineVariant}
            iconColor="danger"
            number={256}
            numberSuffix="%"
            label="Performance"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col justify-between">
            {transactions.map((transaction: Transaction) => (
              <CardBoxTransaction key={transaction.id} transaction={transaction} />
            ))}
          </div>
          <div className="flex flex-col justify-between">
            {clientsListed.map((client: Client) => (
              <CardBoxClient key={client.id} client={client} />
            ))}
          </div>
        </div>

        <div className="my-6">
          <SectionBannerStarOnGitHub />
        </div>

        <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
          <BaseButton icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6">{chartData && <ChartLineSample data={chartData} />}</CardBox>

        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Clients" />

        <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar>

        <CardBox hasTable>
          <TableSampleClients />
        </CardBox>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard

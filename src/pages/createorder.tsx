import {
  mdiCart,
  mdiClose,
  mdiLightbulbOn,
  mdiMagnify, mdiPlus
} from '@mdi/js'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BaseIcon from '../components/BaseIcon'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import { getPageTitle } from '../config'
import Link from 'next/link'
import { Catalog, Customer, UserForm } from '../interfaces'
import Button from '@mui/material/Button';

import CardBox from '../components/CardBox'
import AutoSelect from '../components/AutoSelect'
import AddCustomers from '../components/Dialog/AddCustomers'
import BaseButton from '../components/BaseButton'
import { Field, Form, Formik } from 'formik'
import CardBoxComponentBody from '../components/CardBoxComponentBody'
import FormField from '../components/FormField'
import TableCatalogNewOrder from '../components/TableCatalogNewOrder'
import TableRTCart from '../components/TableRTCart'

import Checkbox from '@mui/material/Checkbox';
import { useAppSelector } from '../stores/hooks'
import AddCatalogs from '../components/Dialog/AddCatalogs'
import { CatalogsStore } from '../store/store'
import { convSAR, useCatalog, useCustomers } from '../hooks/sampleData'

const Adver = () => {

  const [show, setShow] = useState(true);
  return (
    <div className={`w-full dark:text-white dark:bg-slate-800 py-1 rounded-lg bg-green-100 grid grid-cols-12 ${show ? "" : "hidden"}`}>
      <BaseIcon className='text-yellow-400 float-left my-auto ml-3' size={40} path={mdiLightbulbOn} />
      <div className='col-span-10'>
        <p className='text-xs'>What is a &quot;Real-time cart&quot;?</p>
        <p className='text-xs'>Any changes will be reflected in real-time on your customer&apos;s checkout page.</p>
      </div>
      <a className='my-auto' onClick={() => setShow(false)}><BaseIcon className=' cursor-pointer hover:bg-green-200 rounded-full' path={mdiClose} /></a>
    </div>
  )
}
const NewOrder = () => {
  const darkMode = useAppSelector((state) => state.style.darkMode)
  const { customers: custom, isLoading }: { customers: Customer[], isLoading: boolean } = useCustomers();
  const [customers, setCustomers] = useState(custom);
  const { catalog: cat }: { catalog: Catalog[] } = useCatalog()
  const [catalog, setCatalog] = useState([]);
  const [subTotals, setSubTotals] = useState({
    count: 0,
    price: 0,
  });
  useEffect(() => {
    setCatalog(cat.map((c) => ({
      ...c,
      isSelected: false,
      Qty: 1
    })))
  }, [cat])

  useEffect(() => {
    const selected = catalog.filter((cat) => cat.isSelected);
    const price = selected.reduce((total, cat) => (total + cat.ItemPrice * cat.Qty), 0);
    setSubTotals({
      count: selected.length,
      price: price
    })
  }, [catalog]);

  useEffect(() => {
    setCustomers(custom);
  }, [custom]);
  const [lockCart, setLockCart] = useState(true);
  const [customer, setCustomer] = useState<Customer>(null)

  //!important 
  const handleChange = (e) => {
    const new_catalog=cat.filter(c=>{
      const search = e.target.value.toLowerCase().trim().split(" ");
      return search.some((ser)=>c.ProductName.toLowerCase().includes(ser))
    });
    setCatalog(new_catalog);
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <CatalogsStore.Provider value={{ catalog, setCatalog }} >
        <SectionMain>
          <div className='grid grid-cols-2 xl:grid-cols-3' >
            <div className='col-span-2'>
              <CardBox className="flex-1 " hasComponentLayout>
                <div className='bg-gray-300 dark:text-gray-950 rounded-tl-2xl rounded-br-2xl w-fit px-8 py-2 mb-3'>
                  Select Customer
                </div>

                <div className='grid grid-cols-12 p-5'>
                  <div className='col-span-7 h-fit my-auto'><AutoSelect onCustomerSelected={setCustomer} customers={customers} isLoading={isLoading} /></div>
                  <div className='col-span-3 text-center my-auto overflow-hidden'><AddCustomers onChange={(customer) => {
                    const new_custom = [...customers];
                    new_custom.push(customer);
                    setCustomers(new_custom);
                  }} /></div>
                  {/* <BaseButton className='transition-all border-1 text-sm text-blue-700 my-auto dark:bg-slate-900/70 border-blue-400 w-full h-fit'
                  label="SKIP"
                  href='#'
                  color="white"

                /> */}
                  <div className='text-right col-span-2 my-auto'>
                    <Button variant='outlined' color='primary' className=' mx-0  px-0  text-xs md:text-sm w-full my-auto '> SKIP </Button>
                  </div>


                </div>

              </CardBox>

              <CardBox className="flex-1  mt-6" hasComponentLayout>
                <div className='bg-gray-300 dark:text-gray-950 rounded-tl-2xl rounded-br-2xl w-fit px-8 py-2 mb-3'>
                  Select Items(0)
                </div>

                <div className='grid grid-cols-12 p-5'>
                  <div className='col-span-10 '>
                    <Formik
                      initialValues={{ username: '', email: '' }}
                      onSubmit={(values: UserForm) => alert(JSON.stringify(values, null, 2))}
                    >
                      <Form className="flex flex-col flex-1 p-1 pr-4 pl-2">
                        <FormField
                          icons={[mdiMagnify]}
                        >
                          <Field name="name" id="name" placeholder="Search for an item in your catalog" />
                        </FormField>
                      </Form>
                    </Formik>
                  </div>
                  <div className='col-span-2 text-right my-auto'>
                    <AddCatalogs />
                  </div>

                </div>
                <TableCatalogNewOrder />
              </CardBox>
            </div>
            <CardBox className="flex-1 ml-0 xl:ml-5 col-span-2 xl:col-span-1 " hasComponentLayout>
              <div className='bg-black text-white  rounded-tl-2xl rounded-tr-2xl w-full px-2 py-2 mb-3'>
                <BaseIcon path={mdiCart} /> Real-Time Customer Cart
              </div>
              <div className='px-3'>
                <Adver />
                <div className='h-[200px]'>

                  <TableRTCart />
                </div>
                <p className='clear-both'></p>
                <div className={` mt-4 p-5 ${(customer && subTotals.count>0)?"":"blur-sm"}`} >
                  <ul id='ulist'>
                    <li className='grid grid-cols-12'>
                      <div className='col-span-11'>
                        <b>Lock Cart</b>
                        <p>Item quantity not editable by customer</p>
                      </div>
                      <Checkbox sx={
                        darkMode ? {
                          "& svg": { color: '#1976d2' }
                        } : []
                      } checked={lockCart} onClick={() => setLockCart(!lockCart)} name="lockCart" color="primary" />
                    </li>
                    <li>
                      <b>Chooose shipment type</b>
                      <p>Or leave empty to let customer decide</p>
                    </li>
                    <li className='grid grid-cols-12'>
                      <div className='col-span-10 font-bold'>
                        SubTotals ({subTotals.count} Items)
                      </div>
                      <b className='col-span-2 text-sm'>{convSAR([subTotals.price])} </b>
                    </li>
                  </ul>

                  <div className='w-full h-fit cursor-pointer rounded-full relative mt-4 bg-green-500 inline-block text-center'>

                    <p className='text-xl flex items-center justify-center h-14 text-white w-full'><b>WhatsApp</b></p>
                    <Image src="/whatsapp.png" alt="whatsapp" className='ml-4 inline-block absolute left-0 top-0  ' width={50} height={50} />
                  </div>
                  <div className='w-full h-fit cursor-pointer rounded-full relative bg-slate-300 text-black dark:text-black  inline-block text-center mt-4'>

                    <p className='text-xl flex items-center justify-center h-14 w-full'><b>Copy Link</b></p>
                    <Image src="/link.png" alt="whatsapp" className='ml-4 inline-block absolute left-0 top-0  ' width={50} height={50} />
                  </div>
                </div>

              </div>




            </CardBox>
          </div>

        </SectionMain>
      </CatalogsStore.Provider>
    </>
  )
}

NewOrder.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default NewOrder

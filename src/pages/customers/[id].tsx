import React, { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import { useRouter } from 'next/router';
import LayoutAuthenticated from '../../layouts/Authenticated';
import Avatar from 'react-avatar';
import Head from 'next/head';
import SectionMain from '../../components/SectionMain';
import { getPageTitle } from '../../config';
import CardBox from '../../components/CardBox';
import PhoneInput from 'react-phone-input-2';
import { useAppSelector } from '../../stores/hooks';
import GoogleMapReact from 'google-map-react';
import 'react-phone-input-2/lib/style.css'
import { Button, Input, Stack, TextField, TextareaAutosize } from '@mui/material';
import TableCustomerOrder from '../../components/TableCustomerOrder';
import { customerService } from '../../services/customerService';
import { Customer } from '../../interfaces';
import { useCustomHook } from '../../hooks/customHooks';

const CustomerID = () => {
    // Calling useRouter() hook

    const [isDisabled, setDisabled] = useState(true);
    const router = useRouter()
    const customerID = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
    const darkMode = useAppSelector((s) => s.style.darkMode)
    const [customer, setCustomer] = useState({
        FirstName: 'Nick',
        LastName: 'Loey',
        Phone: '+65416984',
        Email: 't.com',
        Notes: 'Notes'
    })

    const { state, dispatch, addToastMsg, startLoading, endLoading } = useCustomHook();
    useEffect(() => {
        (customerID && ((async () => {
            const { data, isOK } = await customerService.findById(customerID);
            setCustomer(data[0]);
        })()));

    }, [isDisabled])
    const [editCustomer, setEditCustomer] = useState({
        FirstName: '',
        LastName: '',
        Phone: '',
        Email: '',
        Notes: ''
    })
    const defaultProps = {
        center: {
            lat: 24.7136,
            lng: 46.6753
        },
        zoom: 11
    };
    return (
        <>
            <Head>
                <title>{getPageTitle('User information')}</title>
            </Head>
            <SectionMain>
                <div className='grid grid-cols-4 w-80'>
                    <Avatar name={`${customer.FirstName} ${customer.LastName}`} size="64" className='mr-3 text-lg ' round={true} />
                    <div className='col-span-3 my-auto'>
                        <p className='text-2xl font-bold'> {`${customer.FirstName} ${customer.LastName}`} </p>
                        <p> Customer since Dec 5, 2022 </p>
                    </div>

                </div>
                <div className='grid grid-cols-3 mt-6'>
                    <div>
                        <p className='text-2xl'>Customer Details</p>
                        <CardBox className="flex-1 grid grid-cols-2 text-center p-3 my-2" hasComponentLayout>
                            <div className='border-r-2'>
                                Total Orders
                                <p className='text-3xl'> 1 </p>
                            </div>
                            <div>
                                Total Spent
                                <p className='text-3xl'> SAR 420.00 </p>
                            </div>
                        </CardBox>
                        <CardBox className="flex-1  p-3 my-2" hasComponentLayout>
                            <style jsx>{`
                                p {margin:10px 0px;}
                            `}</style>
                            <div className='mb-4'>
                                <p className='float-right text-blue-700 cursor-pointer' onClick={() => {
                                    setEditCustomer({ ...customer });
                                    setDisabled(false)
                                }}>Edit</p>
                                <p>Personal Information</p>
                            </div>
                            <p>First Name</p>

                            <TextField disabled={isDisabled} onChange={(e) => setEditCustomer({ ...editCustomer, FirstName: e.target.value })}
                                type='text' value={(isDisabled ? customer : editCustomer).FirstName} size={50} className='rounded-lg' inputProps={{ className: 'dark:text-white dark:bg-slate-800 dark:disabled:bg-slate-700' }} placeholder="Enter the customer's first name" />

                            <p>Last Name</p>

                            <TextField disabled={isDisabled} inputProps={{ className: 'dark:text-white dark:bg-slate-800 dark:disabled:bg-slate-700' }} onChange={(e) => setEditCustomer({ ...editCustomer, LastName: e.target.value })}
                                value={(isDisabled ? customer : editCustomer).LastName} size={50} className='rounded-lg' placeholder="Enter the customer's last name" />


                            <p>Phone Number</p>

                            <PhoneInput
                                disabled={isDisabled}
                                isValid={(value, country) => {
                                    if (value.length <= 3) return 'Phone number is too short.'
                                    if (value.match(/12345/)) {
                                        return 'Invalid value: ' + value + ', ' + country.name;
                                    } else if (value.match(/1234/)) {
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }}
                                value={customer.Phone}
                                placeholder='(966) 123 456 7890'
                                // onChange={e => setCustomer(prev => ({ ...prev, Phone: e }))}
                                // value={customer.Phone}
                                inputStyle={{ width: "100%", backgroundColor: darkMode ? "rgb(15 23 42 )" : "white" }}
                                buttonStyle={{ backgroundColor: darkMode ? "rgb(15 23 42 )" : "white", }}
                                dropdownStyle={{ color: "black" }}
                                // dropdownStyle={{backgroundColor: darkMode ? "rgb(15 23 42 )" : "white",color: darkMode ? "white" : "black",}}
                                country={'sa'}

                            />

                            <p>Personal Email</p>

                            <TextField disabled={isDisabled} inputProps={{ className: 'dark:text-white dark:bg-slate-800 dark:disabled:bg-slate-700' }} onChange={(e) => setEditCustomer({ ...editCustomer, Email: e.target.value })}
                                value={(isDisabled ? customer : editCustomer).Email} size={50} className='rounded-lg' placeholder="Enter the customer's email address" />
                            {!isDisabled && <Stack direction="row" className='mt-4' spacing={2}>
                                <Button variant="outlined" onClick={() => {
                                    setEditCustomer(customer);
                                    setDisabled(true)
                                }}>Cancel</Button>
                                <Button variant="outlined" onClick={() => {
                                    customerService.update(editCustomer);
                                    setDisabled(true);
                                    addToastMsg("Data updated successfully.", "success");
                                }}>Save</Button>
                            </Stack>}
                        </CardBox>
                        <CardBox className="flex-1 p-3 my-2" hasComponentLayout>
                            <p>Customer Address</p>
                            <div style={{ height: '400px', width: '100%' }}>
                                <GoogleMapReact
                                    defaultCenter={defaultProps.center}
                                    defaultZoom={defaultProps.zoom}
                                >
                                    {/* <AnyReactComponent
                                        lat={59.955413}
                                        lng={30.337844}
                                        text="My Marker"
                                    /> */}
                                </GoogleMapReact>
                            </div>
                        </CardBox>
                    </div>
                    <div className='col-span-2 ml-10'>
                        <p className='text-2xl'>Your Customer Notes</p>
                        <CardBox className="flex-1 p-3 my-2" hasComponentLayout>
                            <TextareaAutosize disabled={isDisabled} value={(isDisabled ? customer : editCustomer).Notes} onChange={(e) => setEditCustomer({ ...editCustomer, Notes: e.target.value })} className='dark:bg-transparent' />
                        </CardBox>
                        <p className='text-2xl'>Orders</p>
                        <CardBox className="flex-1 p-3 my-2" hasComponentLayout>
                            <TableCustomerOrder />

                        </CardBox>
                    </div>

                </div>
            </SectionMain>
        </>
    )
}
CustomerID.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default CustomerID;
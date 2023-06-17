import React, { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import { useRouter } from 'next/router';
import LayoutAuthenticated from '../../layouts/Authenticated';
import Avatar from 'react-avatar';
import Head from 'next/head';
import SectionMain from '../../components/SectionMain';
import { getPageTitle } from '../../config';
import CardBox from '../../components/CardBox';
import GoogleMapReact from 'google-map-react';
import BaseIcon from '../../components/BaseIcon';
import { mdiEmail, mdiMail, mdiPhone } from '@mdi/js';
import TableCatalogOrder from '../../components/TableCatalogOrder';
import { Catalog } from '../../interfaces';
import { useCatalog } from '../../hooks/sampleData';

const OrdersID = () => {
    const { catalog: custom }: { catalog: Catalog[] } = useCatalog()
    const [catalog, setCatalog] = useState(custom);
    useEffect(() => {
        setCatalog(custom);
    }, [custom])
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
                <title>{getPageTitle('Product information')}</title>
            </Head>
            <SectionMain>
                <div>
                    <p className='text-2xl inline-block'>Order ID 697002</p>
                    <div className='bg-green-600 rounded-xl inline-block w-fit text-white px-2'>Eligable for payout</div>
                </div>
                <p>December 5, 2022</p>
                <div className='grid grid-cols-3'> <style jsx> {`p {margin:10px;}`} </style>
                    <div>
                        Summary
                        <CardBox className="p-3 m-3" hasComponentLayout>
                            <p>Order Amount<b className='float-right'>SAR 420.00</b></p>
                            <p>Order VAT<b className='float-right'>SAR 0.00</b></p>
                            <hr />
                            <p>
                                <b>Customer Order Total</b>
                                <b className='float-right'>SAR 420.00</b>
                            </p>
                        </CardBox>
                        <CardBox className="p-3 m-3" hasComponentLayout>
                            <p>Zbooni fee<b className='float-right'>SAR <strong className='text-red-500'>-14.70</strong></b></p>
                            <p>Zbooni fee VAT<b className='float-right'>SAR  <strong className='text-red-500'>-2.20</strong></b></p>
                            <hr />
                            <p>
                                <b>Customer Order Total</b>
                                <b className='float-right'>SAR 420.00</b>
                            </p>
                        </CardBox>
                    </div>
                    <div>
                        Customer
                        <CardBox className="p-3 m-3" hasComponentLayout>
                            <div><b className='text-xl font-bold'>NICK LOEY</b><b className='float-right text-sm font-normal cursor-pointer text-blue-500'>View</b></div>
                            <p>
                                <BaseIcon size={20} path={mdiEmail} />katherinaarellanof33@gmail.com
                            </p>
                            <p>
                                <BaseIcon size={20} path={mdiPhone} />6562255632
                            </p>
                            <hr />
                            <p>
                                Customer Notes
                                <div className='h-32'></div>
                            </p>
                        </CardBox>
                    </div>
                    <div>
                        Shipping
                        <CardBox className="p-3 m-3 h-80" hasComponentLayout>

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

                </div>
                <div>
                    Items(1)
                    <TableCatalogOrder catalog={catalog} setCatalog={setCatalog} />
                </div>
            </SectionMain>
        </>
    )
}
OrdersID.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default OrdersID;
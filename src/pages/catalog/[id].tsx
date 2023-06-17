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
import { Button, FormControlLabel, Input, Stack, TextField, TextareaAutosize } from '@mui/material';
import TableCustomerOrder from '../../components/TableCustomerOrder';
import { catalogService } from '../../services/catalogService';
import ImageReader from '../../components/ImageReader';
import Image from 'next/image';
import { IOSSwitch, QuantityItem } from '../../components/Dialog/AddCatalogs';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const CatalogID = () => {
    // Calling useRouter() hook

    const [isDisabled, setDisabled] = useState(true);
    const router = useRouter()
    const catalogID = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
    const darkMode = useAppSelector((s) => s.style.darkMode)
    const [catalog, setCatalog] = useState({
        _id: "",
        ProductName: "",
        cShopVisiblity: false,
        Delivery: false,
        ItemPrice: "",
        Quantity: "",
    })
    useEffect(() => {
        (catalogID && ((async () => {
            const { data, isOK } = await catalogService.findById(catalogID);
            setCatalog(data[0]);
        })()));

    }, [isDisabled])
    const [editCatalog, setEditCatalog] = useState({
        _id: '',
        ProductName: "",
        cShopVisiblity: false,
        Delivery: false,
        ItemPrice: "",
        Quantity: "",
    })
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    return (
        <>
            <Head>
                <title>{getPageTitle('Product information')}</title>
            </Head>
            <SectionMain>
                <div>
                    <div>
                        <p className='text-2xl font-bold'> {catalog.ProductName} </p>
                        <p> Created on Jun 14, 2023 | Last edited about 4 hours ago </p>
                    </div>

                </div>
                <div className='grid grid-cols-3 mt-6'>
                    <div className='col-span-2'>
                        <p className='text-2xl'>Photos</p>
                        <CardBox className="flex-1 grid grid-cols-4 text-center p-3 my-2" hasComponentLayout>
                        <Image loading="lazy" className='inline-block border rounded-lg overflow-hidden' alt="img" src={`/api/v1/catalog/image/${catalog._id}`} layout="responsive" width={300} height={500} />
                            <ImageReader />
                        </CardBox>
                        <CardBox className="flex-1  p-3 my-2" hasComponentLayout>
                            <style jsx>{`
                                p {margin:10px 0px;}
                            `}</style>
                            <div className='mb-4'>
                                <p className='float-right text-blue-700 cursor-pointer' onClick={() => {
                                    setEditCatalog(catalog);
                                    setDisabled(false)
                                }}>Edit</p>
                                <p>Product Information</p>
                            </div>

                            <div className='grid grid-cols-5'>
                                <div className='col-span-3 pr-2'>
                                    <p>Name of Product or service</p>

                                    <input disabled={isDisabled} onChange={(e) => setEditCatalog({ ...editCatalog, ProductName: e.target.value })}
                                type='text' value={(isDisabled ? catalog : editCatalog).ProductName} className='rounded-lg dark:bg-transparent w-full' placeholder="Name of Product or service" />
                                </div>
                                <div className='col-span-2 pl-2'>
                                    <p>Price (Inclusive of VAT)</p>
                                    <p className='rounded-lg border-2 grid grid-cols-8'>
                                        <div className=' flex text-center border-r col-span-2 align-middle h-full line-clamp-1 bg-slate-700/20'><b className='inline-block w-full self-center'>SAR</b></div>
                                        <input style={{ border: 0, marginTop: 0 }} disabled={isDisabled}
                                            onChange={(e) => setEditCatalog(prev => ({ ...prev, ItemPrice: e.target.value }))}
                                            required type='number' step={0.01} onBlur={(e) => { e.target.value = (Number(e.target.value)).toFixed(2) }} className='w-full dark:bg-transparent inline-block col-span-6' placeholder="0.00" />
                                    </p>

                                </div>
                            </div>

                        </CardBox>
                        <CardBox className="flex-1 p-3 my-2" hasComponentLayout>
                            {/* <TextareaAutosize disabled={isDisabled} value={catalog.Notes} onChange={(e) => setEditCatalog({ ...editCatalog, Notes: e.target.value })} className='dark:bg-transparent' /> */}
                            {/* {draftToHtml(convertToRaw(editorState.getCurrentContent()))} */}
                            <Editor disabled={isDisabled}
                                editorState={editorState}
                                toolbarClassName="toolbar-class"
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                onEditorStateChange={setEditorState}
                            />
                        </CardBox>
                    </div>
                    <div className='ml-10'>

                        <CardBox className="flex-1 grid grid-cols-2 text-center p-3 my-2" hasComponentLayout>
                            <div className='border-r-2'>
                                Total Orders
                                <p className='text-3xl'> 1 </p>
                            </div>
                            <div>
                                Total Sold
                                <p className='text-3xl'> SAR 420.00 </p>
                            </div>
                        </CardBox>

                        <CardBox className="flex-1 p-3 my-2 cursor-pointer" hasComponentLayout>
                            <p>View Item Page</p>
                            <p>https://mstshr.zbooni.com/products/6541/</p>
                        </CardBox>
                        <CardBox className="flex-1 p-3 my-2 cursor-pointer" hasComponentLayout>
                            <p><b>Share Item</b></p>
                            <p>Share this item customers, click on the whatsapp button to broadcast or simply copy paste the link to share.</p>
                        </CardBox>
                        <div className='w-full h-fit cursor-pointer rounded-full relative bg-green-500 inline-block text-center'>

                            <p className='text-xl flex items-center justify-center h-14 text-white w-full'><b>WhatsApp</b></p>
                            <Image src="/whatsapp.png" alt="whatsapp" className='ml-4 inline-block absolute left-0 top-0  ' width={50} height={50} />
                        </div>
                        <div className='w-full h-fit cursor-pointer rounded-full relative bg-slate-300 text-black dark:text-black  inline-block text-center mt-4'>

                            <p className='text-xl flex items-center justify-center h-14 w-full'><b>Copy Link</b></p>
                            <Image src="/link.png" alt="whatsapp" className='ml-4 inline-block absolute left-0 top-0  ' width={50} height={50} />
                        </div>

                        <CardBox className="flex-1 p-3 my-2 cursor-pointer" hasComponentLayout>
                            <p><b> Quantity </b></p>
                            <p> You have a limited stock. </p>

                            <QuantityItem onChange={(value) => setCatalog(prev => ({ ...prev, Quantity: value }))} className='w-full' />
                        </CardBox>
                        <CardBox>

                            <div className='grid grid-cols-3'>
                                <div className='col-span-2'>
                                    <p><b>Visible on my e-store</b></p>
                                    <p>Switching this on will allow the item to be visible in your cShop.</p>
                                </div>
                                <div className='flex self-center text-center w-full'>
                                    <div className='w-full'>
                                        <FormControlLabel className=''
                                            onChange={(e) => setCatalog(prev => ({ ...prev, cShopVisiblity: e.target.checked }))}
                                            style={{ color: darkMode ? 'white' : 'black' }}
                                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                            label=""
                                        />
                                    </div>

                                </div>
                            </div>
                            <hr />
                            <div className='grid grid-cols-3'>
                                <div className='col-span-2'>
                                    <p><b>Delivery</b></p>
                                    <p>Switching this on will prompt the customer to add delivery address during checkout.</p>
                                </div>
                                <div className='flex self-center text-center w-full'>
                                    <div className='w-full'>
                                        <FormControlLabel className=''
                                            onChange={(e) => setCatalog(prev => ({ ...prev, Delivery: e.target.checked }))}
                                            style={{ color: darkMode ? 'white' : 'black' }}
                                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                            label=""
                                        />
                                    </div>

                                </div>
                            </div>
                        </CardBox>
                    </div>

                </div>
            </SectionMain>
        </>
    )
}
CatalogID.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default CatalogID;
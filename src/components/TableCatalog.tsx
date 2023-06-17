import { mdiAllInclusive, mdiEye, mdiPhoneInTalk, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import { convSAR, useCatalog } from '../hooks/sampleData'
import { Catalog, } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import FormCheckRadio from './FormCheckRadio'
import { Field, Formik } from 'formik'
import BaseIcon from './BaseIcon'
import Image from 'next/image'
import { Checkbox } from '@mui/material'
import { useAppSelector } from '../stores/hooks'
import { IOSSwitch } from './Dialog/AddCatalogs'
import { TrWithOnClick } from './TableCustomers'
import { useRouter } from 'next/router'

const TableCatalog = ({ catalog, setCatalog }: { catalog: Catalog[], setCatalog: (_: Catalog[]) => void }) => {
    const perPage = 5

    const [sortNow, setSortNow] = useState({ fieldNo: -1, asc: true });
    // const [catalog, setCatalog] = useState(got);
    const darkMode = useAppSelector((state) => state.style.darkMode)
    const [currentPage, setCurrentPage] = useState(0)

    const cataloguePaginated = catalog.slice(perPage * currentPage, perPage * (currentPage + 1))

    const numPages = catalog.length / perPage
    const pagesList = []

    const { push } = useRouter();
    useEffect(() => {
        setCurrentPage(0)
    }, [catalog])
    const handleSort = (index) => {
        const new_cat = [...catalog];

        const keys = ['ProductName', 'cShopVisiblity', 'ItemPrice', 'Quantity', '', '', 'createdAt', ''];
        if (keys[index] === '') {
            setSortNow(prev => ({ ...prev, fieldNo: -1 }))
            return;
        }
        new_cat.sort((a, b) => {
            let res = a[keys[index]] > b[keys[index]] ? -1 : 1;
            // alert(a[keys[index]])
            const newSort = { fieldNo: index, asc: true }
            if (sortNow.fieldNo == index && sortNow.asc) {
                newSort.asc = false;
                res = -res;
            }
            setSortNow(newSort)
            return res;
        });
        setCatalog(new_cat)
    }
    for (let i = 0; i < numPages; i++) {
        pagesList.push(i)
    }
    return (
        <>

            <table className='cursor-pointer bg-white dark:bg-transparent'>
                <thead>
                    <TrWithOnClick sortNow={sortNow} onClick={handleSort}>
                        <th>Product Name</th>
                        <th>cShop Visibility</th>
                        <th>Item Price</th>
                        <th>Quantity</th>
                        <th>Total Sold</th>
                        <th>Qty Sold</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </TrWithOnClick>
                </thead>
                <tbody className='text-sm'>
                    {cataloguePaginated.map((catalog: Catalog, id: number) => (
                        <tr className='hover:bg-slate-200' onClick={() => {
                            push(`/catalog/${catalog._id}`)
                        }} key={id}>
                            <td className='w-64'>
                                <div className='w-1/3 inline-block p-2'>
                                    <Image loading="lazy" className='inline-block border rounded-lg overflow-hidden' alt="img" onError = {(e)=>e.target.src = "/no-avatar.png"} src={`/api/v1/catalog/image/${catalog._id}`} layout="responsive" width={300} height={500} />
                                </div>

                                {catalog.ProductName}
                            </td>
                            <td>
                                <IOSSwitch sx={
                                    darkMode ? {
                                        "& svg": { color: '#1976d2' }
                                    } : []
                                } checked={catalog.cShopVisiblity} name={`outline${id}`} color="primary" />
                            </td>
                            <td>{convSAR([catalog.ItemPrice])}</td>
                            <td>
                                <BaseIcon path={mdiAllInclusive} />
                            </td>
                            <td>{"catalogue.TotalSold"}</td>
                            <td>{"catalogue.QtySold"}</td>
                            <td>{catalog.createdAt}</td>
                            <td>

                                <BaseButton className='font-bold text-xs border-white border-2'
                                    href="https://api.whatsapp.com/send?phone=971555928787&text=Hello%20Zbooni%2C%20I%20am%20on%20the%20dashboard%20and%20need%20assistance.%20My%20store%20ID%20is%2094728"
                                    color="success"
                                    icon={mdiPhoneInTalk}
                                    roundedFull
                                />
                                <Image width={20} className='inline-block align-middle pb-2 pl-1' height={20} alt="img" src="https://www.zbooni.com/dashboard/_next/static/media/copy-link.3330d8ef.svg" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                    <small>Showing {(currentPage) * perPage + 1} to {(currentPage) * perPage + catalog.length} of {catalog.length} results</small>
                    <BaseButtons>
                        {pagesList.map((page) => (
                            <BaseButton
                                key={page}
                                active={page === currentPage}
                                label={page + 1}
                                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                                small
                                onClick={() => setCurrentPage(page)}
                            />
                        ))}
                    </BaseButtons>
                    <small className="mt-6 md:mt-0">
                        Page {currentPage + 1} of {Math.ceil(numPages)}
                    </small>
                </div>
            </div>
        </>
    )
}

export default TableCatalog

import { mdiAllInclusive, mdiEye, mdiPhoneInTalk, mdiTrashCan } from '@mdi/js'
import React, { useContext, useEffect, useState } from 'react'
import { convSAR, useCatalog } from '../hooks/sampleData'
import { Catalog, } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import FormCheckRadio from './FormCheckRadio'
import { Field, Formik } from 'formik'
import BaseIcon from './BaseIcon'
import Image from 'next/image'

import Checkbox from '@mui/material/Checkbox';
import { useAppSelector } from '../stores/hooks'
import { CatalogsStore } from '../store/store'


const ItemRow = ({ catalog, id, checked, onChange }) => {
    const darkMode = useAppSelector((state) => state.style.darkMode)

    return (
        <li onClick={() => onChange(catalog._id,!checked)} className='grid grid-cols-8 cursor-pointer dark:hover:bg-slate-800 hover:bg-gray-100'>
            <div className='p-6'>
                <Image loading="lazy" className='inline-block border rounded-lg overflow-hidden hover:border-2 transition-all hover:scale-150 active:scale-125 border-slate-500' alt="img" onError={(e) => e.target.src = "/no-avatar.png"} src={`/api/v1/catalog/image/${catalog._id}`} layout="responsive" width={100} height={100} />
            </div>

            <div className='col-span-6 my-auto'>
                <p className='text-md'><b>{catalog.ProductName}</b></p>
                <div>
                    Qty:Unlimited | Item Price: {convSAR([catalog.ItemPrice])} | Total Orders: {catalog.QtySold} (catalogue.TotalSold)
                </div>
            </div>


            <div className='text-right pr-10 my-auto'>
                <Checkbox sx={
                    darkMode ? {
                        "& svg": { color: '#1976d2' }
                    } : []
                } checked={checked} name={`outline${id}`} color="primary" />
            </div>


        </li>
    )
}
const TableCatalogNewOrder = () => {

    const perPage = 5

    const [currentPage, setCurrentPage] = useState(0)
    const { catalog, setCatalog } = useContext(CatalogsStore);

    type CatalogWithSelected = Catalog & { isSelected: boolean };
    const [catalogPaginated, setCatalogPaginated] = useState<CatalogWithSelected[]>(catalog)
    useEffect(() => {
        setCatalogPaginated(catalog.slice(perPage * currentPage, perPage * (currentPage + 1)));
    }, [catalog,currentPage]);

    const numPages = catalog.length / perPage
    const pagesList = []

    for (let i = 0; i < numPages; i++) {
        pagesList.push(i)
    }
    return (
        <>
            <ul>
                {catalogPaginated.map((catalog, id: number) => (
                    <ItemRow key={id} checked={catalog.isSelected} catalog={catalog} id={id} onChange={
                        (_id:string,val: boolean) => setCatalog(prev => prev.map(elem=>(elem._id===_id?({...elem,isSelected:val,Qty:1}):elem)))
                    } />
                ))}

            </ul>

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

export default TableCatalogNewOrder

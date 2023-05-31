import { mdiAllInclusive, mdiEye, mdiPhoneInTalk, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { useCatalogue } from '../hooks/sampleData'
import { Catalogue, } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import FormCheckRadio from './FormCheckRadio'
import { Field, Formik } from 'formik'
import BaseIcon from './BaseIcon'
import Image from 'next/image'

const TableCatalogue = () => {
    const { catalogue } = useCatalogue()


    const perPage = 5

    const [currentPage, setCurrentPage] = useState(0)

    const cataloguePaginated = catalogue.slice(perPage * currentPage, perPage * (currentPage + 1))

    const numPages = catalogue.length / perPage
    const convSAR = arr => arr.map(elem => ("SAR " + elem.toFixed(2)))
    const pagesList = []

    for (let i = 0; i < numPages; i++) {
        pagesList.push(i)
    }
    return (
        <>

            <Formik initialValues={{ outline: false }} onSubmit={() => null}>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>cShop Visibility</th>
                            <th>Item Price</th>
                            <th>Quantity</th>
                            <th>Total Sold</th>
                            <th>Qty Sold</th>
                            <th>Date Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {cataloguePaginated.map((catalogue: Catalogue, id: number) => (
                            <tr key={id}>
                                <td>
                                    <Image className='inline-block p-2' alt="img" src="https://www.zbooni.com/dashboard/_next/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F94728%2F548779_1.jpg&w=1920&q=75" width={50} height={40} />
                                    {catalogue.ProductName}
                                </td>
                                <td>
                                    <FormCheckRadio type="switch" label="">
                                        <Field checked={catalogue.cShopVisiblity} type="checkbox" name={`outline${id}`} />
                                    </FormCheckRadio>
                                </td>
                                <td>{convSAR([catalogue.ItemPrice])}</td>
                                <td>
                                    <BaseIcon path={mdiAllInclusive} />
                                </td>
                                <td>{convSAR([catalogue.TotalSold])}</td>
                                <td>{catalogue.QtySold}</td>
                                <td>{catalogue.DateCreated}</td>
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
            </Formik>
            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                    <small>Showing {(currentPage) * perPage + 1} to {(currentPage) * perPage + catalogue.length} of {catalogue.length} results</small>
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

export default TableCatalogue

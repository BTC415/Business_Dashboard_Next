import { mdiAllInclusive, mdiEye, mdiPhoneInTalk, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { usePayouts } from '../hooks/sampleData'
import { Catalog, Payout, } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import FormCheckRadio from './FormCheckRadio'
import { Field, Formik } from 'formik'
import BaseIcon from './BaseIcon'
import Image from 'next/image'

const TablePayouts = () => {
    const { payouts } = usePayouts()


    const perPage = 5

    const [currentPage, setCurrentPage] = useState(0)

    const payoutsPaginated = payouts.slice(perPage * currentPage, perPage * (currentPage + 1))

    const numPages = payouts.length / perPage
    
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
                            <th>Payout ID</th>
                            <th>Date Requested</th>
                            <th>Payout Status</th>
                            <th>Amount Requested</th>
                            <th>Payout Fees</th>
                            <th>Net Payable</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {payoutsPaginated.length>0 && payoutsPaginated.map((payout: Payout, id: number) => (
                            <tr key={id}>
                                <td>{payout.PayoutID}</td>
                                <td>{payout.DateRequested}</td>
                                <td>{payout.PayoutStatus}</td>
                                <td>{payout.AmountRequested}</td>
                                <td>{payout.PayoutFees}</td>
                                <td>{payout.NetPayable}</td>
                            </tr>
                        ))}
                        {payoutsPaginated.length==0 && (
                            <tr><td colSpan={6}><p className='w-full text-center'>No Records</p></td></tr>
                            
                        )}
                    </tbody>
                </table>
            </Formik>
            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                    <small>Showing {(currentPage) * perPage + 1} to {(currentPage) * perPage + payouts.length} of {payouts.length} results</small>
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

export default TablePayouts

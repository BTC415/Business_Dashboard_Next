import { mdiAllInclusive, mdiEye, mdiPhoneInTalk, mdiTrashCan } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import { convSAR, useOrders } from '../hooks/sampleData'
import { Order, } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import FormCheckRadio from './FormCheckRadio'
import { Field, Formik } from 'formik'
import BaseIcon from './BaseIcon'
import Image from 'next/image'

import Checkbox from '@mui/material/Checkbox';
import { useAppSelector } from '../stores/hooks'
import { Chip } from '@mui/material'
import { TrWithOnClick } from './TableCustomers'

type Props = {
    order: Order,
    id: number
}
const ItemRow = ({ order, id }: Props) => {


    const darkMode = useAppSelector((state) => state.style.darkMode)

    return (
        <tr>
            <style jsx>{`
                td {text-align:center;}
            `}</style>
            <td>{order.id}</td>
            <td>{(new Date(order.date)).toLocaleDateString("en-US", { /* weekday: 'long', */ year: 'numeric', month: 'long', day: 'numeric' })}</td>
            <td> <Chip className={`text-white ${order.payment === "Pending payment" ? "bg-red-500" : "bg-green-700"} w-full`} label={order.payment} /> </td>
            <td>{order.totalAmt}</td>
        </tr>

    )
}
const TableCustomerOrder = () => {
    const { orders:got } = useOrders()
    const [sortNow, setSortNow] = useState({ fieldNo: -1, asc: true });
    const [orders, setOrders] = useState(got);
    useEffect(()=>{
        setOrders(got)
    },[got])
    const handleSort = (index) => {
        const new_orders = [...orders];
        const keys = ['id', 'date', 'payment', 'totalAmt'];
        new_orders.sort((a, b) => {
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
        setOrders(new_orders)
    }
    const perPage = 5

    const [currentPage, setCurrentPage] = useState(0)

    const ordersPaginated = orders.slice(perPage * currentPage, perPage * (currentPage + 1))

    const numPages = orders.length / perPage
    const pagesList = []

    for (let i = 0; i < numPages; i++) {
        pagesList.push(i)
    }
    return (
        <>

            <table style={{ cursor: 'pointer' }}>
                <thead>
                    <TrWithOnClick sortNow={sortNow} onClick={handleSort}>
                        <th>Order ID</th>
                        <th>Date</th>

                        <th>Status</th>

                        <th>Total with VAT</th>
                    </TrWithOnClick>
                </thead>
                <tbody>
                    {ordersPaginated.map((order: Order, id: number) => (
                        <ItemRow key={id} order={order} id={id} />
                    ))}
                </tbody>
            </table >
            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                    <small>Showing {(currentPage) * perPage + 1} to {(currentPage) * perPage + ordersPaginated.length} of {orders.length} results</small>
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

export default TableCustomerOrder

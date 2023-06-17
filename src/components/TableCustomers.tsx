import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, Children, cloneElement, ReactElement, useEffect } from 'react'
import { Customer } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { useRouter } from 'next/router'

// type PropCellField = { data: Array<{ name: string, value: string }> }

export const TrWithOnClick = ({ sortNow, onClick, children }) => {

    const ths = Children.toArray(children);

    return (
        <tr>
            {
                Children.map(ths, (child: ReactElement, index) => {

                    return (
                        <>
                            {cloneElement(child, {
                                onClick: () => onClick(index),
                                style:{textAlign:'center'},
                                children: (
                                    <>
                                        {child.props.children}
                                        {index == sortNow.fieldNo && (sortNow.asc ? <FaSortUp className='float-right' /> : <FaSortDown className='float-right' />)}

                                    </>
                                )
                            })}
                        </>

                    )
                })
            }
        </tr>
    )
}
const TableCustomers = ({ customers, setCustomers }:{customers:Customer[],setCustomers:(_:Customer[])=>void}) => {


    const [sortNow, setSortNow] = useState({ fieldNo: -1, asc: true });
    const perPage = 5

    const [currentPage, setCurrentPage] = useState(0)

    const customersPaginated = customers.slice(perPage * currentPage, perPage * (currentPage + 1))

    const numPages = customers.length / perPage

    const pagesList = []

    for (let i = 0; i < numPages; i++) {
        pagesList.push(i)
    }
    useEffect(()=>{
        setCurrentPage(0)
    },[customers])

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)

    const handleModalAction = () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)
    }

    const fixDate = (date) => {
        const dateLocal = new Date(date);
        const newDate = new Date(
            dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
        );
        return newDate;
    };

    const { push } = useRouter();
    const handleSort = (index) => {
        const new_custom = [...customers];
        const keys = ['FirstName', 'LastName', 'Email', 'Phone'];
        new_custom.sort((a, b) => {
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
        setCustomers(new_custom)
    }
    return (
        <>
            <CardBoxModal
                title="Sample modal"
                buttonColor="info"
                buttonLabel="Done"
                isActive={isModalInfoActive}
                onConfirm={handleModalAction}
                onCancel={handleModalAction}
            >
                <p>
                    Lorem ipsum dolor sit amet <b>adipiscing elit</b>
                </p>
                <p>This is sample modal</p>
            </CardBoxModal>

            <CardBoxModal
                title="Please confirm"
                buttonColor="danger"
                buttonLabel="Confirm"
                isActive={isModalTrashActive}
                onConfirm={handleModalAction}
                onCancel={handleModalAction}
            >
                <p>
                    Lorem ipsum dolor sit amet <b>adipiscing elit</b>
                </p>
                <p>This is sample modal</p>
            </CardBoxModal>

            <table className='cursor-pointer bg-white dark:bg-transparent' >
                <thead>
                    <TrWithOnClick sortNow={sortNow} onClick={handleSort}>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Order Count</th>
                        <th>Date Created</th>
                        <th>Order Value</th>
                        <th />
                    </TrWithOnClick>
                </thead>
                <tbody className='text-sm'>
                    {customersPaginated.map((customer) => (
                        <tr className='hover:bg-slate-200' onClick={() => {
                            push(`/customers/${customer._id}`)
                        }} key={customer._id}>
                            <td>{customer.FirstName}</td>
                            <td>{customer.LastName}</td>
                            <td className='text-blue-500'>{customer.Email}</td>
                            <td className='text-blue-500'>{customer.Phone}</td>
                            <td>{customer.OrderCount}</td>
                            <td>{(new Date(customer.createdAt)).toLocaleDateString("en-US", { /* weekday: 'long', */ year: 'numeric', month: 'long', day: 'numeric' })}</td>
                            <td>{customer.OrderValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                    <small>Showing {(currentPage) * perPage + 1} to {(currentPage) * perPage + customersPaginated.length} of {customers.length} results</small>
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

export default TableCustomers

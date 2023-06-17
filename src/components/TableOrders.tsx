import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { convSAR, useOrders } from '../hooks/sampleData'
import { Order } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import { useRouter } from 'next/router'

type PropCellField = {data: Array<{ name: string, value: string }>}
const CellField = ({data}:PropCellField) => {
  return (
    <>
      {
        data.map(({ name, value }) => (
          <p key={name}>
            <b className='w-1/3 text-gray-400 font-normal text-sm inline-block'>{name}:</b> {value}
          </p>
        ))
      }
    </>
  )
}
type PropOrderDetail = {data: Array<string>,names: Array<string>}
const OrderDetail = ({data,names}:PropOrderDetail) => {
  const prop=names.map((name,i) => ({name:name,value:data[i]}));
  return (
    <>
    <CellField data={prop}/>
    </>
  )
}
const TableOrders = () => {
  const { orders } = useOrders()

  

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const ordersPaginated = orders.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = orders.length / perPage

  const { push } = useRouter();
  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
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

      <table className='cursor-pointer bg-white dark:bg-transparent'>
        <thead>
          <tr>
            <th>Order Details</th>
            <th>Order Value</th>
            <th>Zbooni Fees</th>
            <th>Net Amount for Release</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {ordersPaginated.map((order: Order) => (
            <tr key={order.id} onClick={() => {
              push(`/orders/${order.id}`)
          }}>
              <td data-label="Order Details">
                <OrderDetail names={["Order Id", "Customer", "Sales Agent", "Date", "Payment"]}
                data={[order.id,order.customer,order.salesAgent,order.date,order.payment]} />
              </td>
              <td data-label="Order Value">
              <OrderDetail names={["Order Amt", "Order Amt VAT", "Total Amt"]}
                data={convSAR([order.orderAmt,order.orderAmtVAT,order.totalAmt])} />
              </td>
              <td data-label="Zbooni Fees">
              <OrderDetail names={["Zbooni Fee", "Zbooni Fee VAT", "Total"]}
                data={convSAR([order.zbooniFee,order.zbooniFeeVAT,order.total])} />
              </td>
              <td data-label="Net Amount for Release">
                <b className='text-lg'>SAR {(order.totalAmt-order.total).toFixed(2)}</b>
                {order.eligable && (
                  <div className='bg-green-600 rounded-xl w-fit text-white px-2'>Eligable for payout</div>
                )}
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color="info"
                    icon={mdiEye}
                    onClick={() => setIsModalInfoActive(true)}
                    small
                  />
                  <BaseButton
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => setIsModalTrashActive(true)}
                    small
                  />
                </BaseButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
        <small>Showing {(currentPage)*perPage+1} to {(currentPage)*perPage+ordersPaginated.length} of {orders.length} results</small>
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

export default TableOrders

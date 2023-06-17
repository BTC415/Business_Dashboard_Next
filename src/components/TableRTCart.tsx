import { mdiAllInclusive, mdiEye, mdiPhoneInTalk, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import { convSAR, useCatalog } from '../hooks/sampleData'
import { Catalog, } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import FormCheckRadio from './FormCheckRadio'
import { Field, Formik } from 'formik'
import BaseIcon from './BaseIcon'
import Image from 'next/image'
import { CatalogsStore } from '../store/store'

export const NumberAdjuster = ({ qty, setQty, ...props }) => {

    const Increment = () => setQty(qty + 1)
    const Decrement = () => setQty(qty - 1)
    return (
        <div className={`w-20 text-lg rounded-lg text-center border-slate-700 border-[1px] grid grid-cols-4 ${props?.className ?? ""}`}>
            <a className='hover:bg-slate-400/25' onClick={Decrement}>-</a>
            <input type='text' className='p-0 text-center border-none col-span-2 dark:bg-transparent' value={qty} onChange={(e) => setQty(e.target.value)} />
            <a className='hover:bg-slate-400/25' onClick={Increment}>+</a>
        </div>
    )
}

const ItemRow = ({ catalog, id }) => {

    const [checked, setChecked] = useState(false);
    // const [qty, setQty] = useState(1);
    const ref = useRef(null);

    const { catalog: _, setCatalog } = useContext(CatalogsStore);
    const handleDelete = () => {
        setCatalog(prev => prev.map(elem => (elem._id === id ? ({ ...elem, isSelected: false, Qty:1 }) : elem)))
        // const node = ref.current;
        // if (node) {

        //     ReactDOM.unmountComponentAtNode(node);
        //     node.parentNode.removeChild(node);
        // }
    };
    useEffect(() => {
        if (catalog.Qty == 0) {
            handleDelete();
        }
    }, [catalog.Qty]);
    return (
        <li ref={ref} onClick={() => setChecked(!checked)} className=' h-24 p-3 cursor-pointer rounded-xl border-b-2 border-slate-700 dark:hover:bg-slate-800 hover:bg-gray-100'>

            <p>{catalog.ProductName}</p>
            <p>
                <NumberAdjuster className="float-left" qty={catalog.Qty} setQty={(qty) => {
                    setCatalog(prev => prev.map(elem => (elem._id === id ? ({ ...elem, Qty: qty }) : elem)))
                }} />
                <div className='float-left pt-1'>&times;{convSAR([catalog.ItemPrice])}</div>
                <div className='float-right pt-1'>{convSAR([catalog.ItemPrice*catalog.Qty])}</div>
            </p>
            <p className='clear-right float-right text-start text-blue-700'>Apply discount</p>



        </li>
    )
}
const TableRTCart = () => {

    const perPage = 5

    const [currentPage, setCurrentPage] = useState(0)

    const { catalog, setCatalog } = useContext(CatalogsStore);
    const [selectedCat, setSelectedCat] = useState([]);
    useEffect(() => {
        setSelectedCat(catalog.filter(cat => cat.isSelected))
    }, [catalog]);


    const numPages = catalog.length / perPage
    const pagesList = []

    for (let i = 0; i < numPages; i++) {
        pagesList.push(i)
    }
    return (
        <>

            <Formik initialValues={{ outline: false }} onSubmit={() => null}>
                <ul>
                    {selectedCat.map((catalog: Catalog) => (
                        <ItemRow key={catalog._id} catalog={catalog} id={catalog._id} />
                    ))}

                </ul>
            </Formik>
        </>
    )
}

export default TableRTCart

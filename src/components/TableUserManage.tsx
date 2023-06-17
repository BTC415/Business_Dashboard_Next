import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { useUsers } from '../hooks/sampleData'
import { User } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'

type PropCellField = { data: Array<{ name: string, value: string }> }
const TableUserManage = () => {
    const { users } = useUsers()


    const perPage = 5

    const [currentPage, setCurrentPage] = useState(0)

    const usersPaginated = users.slice(perPage * currentPage, perPage * (currentPage + 1))

    const numPages = users.length / perPage

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

            <table>
                <thead>
                    <tr>
                    <th>User ID</th>
                    <th>Sub-account name</th>
                    <th>Role type</th>
                    <th>Created on</th>
                    <th>Last login</th>
                    <th>Account status</th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                    {usersPaginated.map((user: User) => (
                        <tr key={user.UserID}>
                            <td>{user.UserID}</td>
                            <td>{user.SubAccountName}</td>
                            <td className='text-blue-500'>{user.RoleType}</td>
                            <td className='text-blue-500'>{user.CreatedOn}</td>
                            <td>{user.LastLogin}</td>
                            <td>{user.AccountStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                    <small>Showing {(currentPage)*perPage+1} to {(currentPage)*perPage+usersPaginated.length} of {users.length} results</small>
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

export default TableUserManage

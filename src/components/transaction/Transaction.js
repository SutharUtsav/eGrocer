import React, { useEffect, useState } from 'react'
import './transaction.css'
import api from '../../api/api'
import Cookies from 'universal-cookie';
import { FaRupeeSign } from "react-icons/fa";

const Transaction = () => {

    //initialize cookies
    const cookies = new Cookies();

    const fetchTransactions = () => {
        api.getTransactions(cookies.get('jwt_token'))
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    // console.log(result)
                    settransactions(result.data)
                }
            })
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    const [transactions, settransactions] = useState(null)

    return (
        <div className='transaction-list'>
            <div className='heading'>
                transaction
            </div>
            {transactions === null
                ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
                : (
                    <table className='transaction-list-table'>
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Payment method</th>
                                <th>Transaction Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.length === 0
                                ? <><tr><td><div className='d-flex align-items-center p-4'>No Transactions Found</div></td></tr></>
                                : <>
                                    {transactions.map((transaction, index) => (
                                        <tr key={index} className={index === transactions.length - 1 ? 'last-column' : ''}>
                                            <th>{transaction.id}</th>
                                            <th>{transaction.type}</th>
                                            <th>{`${new Date(transaction.created_at).getDate()}-${new Date(transaction.created_at).getMonth() + 1}-${new Date(transaction.created_at).getFullYear()}`}</th>
                                            <th className='amount'><FaRupeeSign fill='var(--secondary-color)' />{transaction.amount}</th>
                                            <th className={transaction.status === 'failed' ? 'failed' : 'success'}><p>{transaction.status}</p></th>
                                        </tr>
                                    ))}
                                </>
                            }
                        </tbody>
                    </table>
                )}
        </div>
    )
}

export default Transaction

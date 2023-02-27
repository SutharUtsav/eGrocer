import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie';
import api from '../../api/api';
import './address.css'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { GrAddCircle } from 'react-icons/gr'
import NewAddress from './NewAddress';
import { toast } from 'react-toastify';

const Address = (props) => {

    //initialize cookies
    const cookies = new Cookies();


    const fetchAddress = (token) => {
        api.getAddress(token)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setaddresses(result.data)
                    props.setselectedAddress(result.data[0]);
                }
                else if(result.status === 0 && result.message === 'Address Not Found'){
                    setaddresses([])
                }
            })
    }

    const user = useSelector(state => (state.user))

    useEffect(() => {
        if (cookies.get('jwt_token') !== undefined && user.user !== null) {
            fetchAddress(cookies.get('jwt_token'))
        }
    }, [user])

    const [addresses, setaddresses] = useState(null)
    const [selectedAddress, setselectedAddress] = useState(null);
    

    const deleteAddress = (address_id) => {
        api.deleteAddress(cookies.get('jwt_token'), address_id)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    toast.success('Succesfully Deleted Address!')
                    api.getAddress(cookies.get('jwt_token'))
                        .then(resp => resp.json())
                        .then(res => {
                            if (res.status === 1) {
                                setaddresses(res.data)
                            }
                        })
                        .catch(error => console.log(error))
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='address-wrapper'>
            {addresses === null
                ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
                : (
                    <>
                        {addresses.map((address, index) => (
                            <div key={index} className='address-component'>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex gap-2 align-items-center justify'>
                                        <input className="form-check-input" type="radio" name="AddressRadio" id={`AddressRadioId${index}`} defaultChecked={address.is_default === 1} onChange={()=>{
                                            props.setselectedAddress(address);
                                        }}/>
                                        <label className="form-check-label" htmlFor={`AddressRadioId${index}`}>
                                            <span>{address.name}</span>

                                            <span className='home mx-3'>{address.type}</span>
                                        </label>
                                    </div>

                                    <div className='d-flex gap-2'>
                                        <button type='button' className='edit' data-bs-toggle="modal" data-bs-target="#addressModal" onClick={() => {
                                            setselectedAddress(address);
                                        }}>
                                            <FiEdit fill='var(--secondary-color)' fontSize='1.555rem' />
                                        </button>

                                        <button type='button' className='remove' onClick={() => deleteAddress(address.id)}>
                                            <RiDeleteBinLine fill='red' fontSize='1.555rem' />
                                        </button>
                                    </div>
                                </div>

                                <div className='address'>
                                    {address.address}, {address.landmark}, {address.area}, {address.city}, {address.state}, {address.pincode}-{address.country}
                                </div>

                                <div className='mobile'>
                                    {address.mobile}
                                </div>
                            </div>
                        ))}

                        <div className='address-component new-address'>
                            <button type='button' data-bs-toggle="modal" data-bs-target="#addressModal" onClick={()=>{setselectedAddress(null)}}>
                                <GrAddCircle fontSize='3rem' /> Add New Address
                            </button>
                        </div>
                    </>
                )}

            <NewAddress setaddresses={setaddresses} selectedAddress={selectedAddress} setselectedAddress={setselectedAddress}/>
        </div>
    )
}

export default Address
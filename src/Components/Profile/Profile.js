import React, { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import api from '../../api';

export const Profile = () => {
    const closeModalRef = useRef()
    const user = JSON.parse(localStorage.getItem('User'));
    const [uname, setuname] = useState(user.name)
    const [email, setemail] = useState(user.email)
    const [profilePic, setprofilePic] = useState(user.profile)
    const [selectedFile, setselectedFile] = useState()

    function getUpdatedUser() {
        api.getUser()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1){
                    setuname(result.user.name)
                    setemail(result.user.email)
                    setprofilePic(result.user.profile)
                    localStorage.setItem('User', JSON.stringify(result.user))
                }
                else if (result.status === 0) {
                    toast.error(result.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
            .catch(error => console.log('error', error));
    }


    const handleEditProfile = (e) => {
        e.preventDefault()
        api.editProfile(uname,email,selectedFile)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    toast.success(result.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    getUpdatedUser();
                }
                else if (result.status === 0) {
                    toast.error(result.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                // closeModalRef.current.click()

            })
            .catch(error => console.log('error', error));


    }
    return (
        <div className="modal-body">
            <button id='closemodal' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeModalRef}></button>

            <section className="vh-50" >
                <div className="container py-5 h-100 ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="">
                                    <img src={profilePic} className="rounded-circle" style={{ width: "150px", height: "140px", marginTop: "1pc" }} alt="Avatar" />
                                </div>
                                <div className="col-md-6 col-lg-7 align-items-center w-auto">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleEditProfile}>
                                            <div className="mb-3">
                                                <input className="form-control" type="file" id="formFile" onChange={(e) => { setselectedFile(e.target.files[0]) }} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="uname-addon1"><i className="fa fa-user" aria-hidden="true"></i></span>
                                                <input type="text" className="form-control" placeholder="User Name" id="editName" value={uname} onChange={(e) => { setuname(e.target.value) }} aria-label="Username" aria-describedby="uname-addon1" />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="email-addon1"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                                                <input type="email" className="form-control" placeholder="Email" id="editEmail" value={email} onChange={(e) => { setemail(e.target.value) }} aria-label="Email" aria-describedby="email-addon1" />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="phone-addon1"><i className="fa fa-phone" aria-hidden="true"></i></span>
                                                <input type="tel" className="form-control" placeholder="Phone Number" id="editPhoneNum" value={user.mobile} aria-label="PhoneNum" aria-describedby="phone-addon1" readOnly />
                                            </div>

                                            <button type="submit" className="btn btn-dark btn-block">Update Profile</button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </section>


        </div>



    )
}

import React, { useState, useRef,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';


export const Profile = (props) => {
    const closeModalRef = useRef()

    const [uname, setuname] = useState(props.user.name)
    const [email, setemail] = useState(props.user.email)
    const [selectedFile, setselectedFile] = useState()
    const [profilePic, setprofilePic] = useState(props.user.profile)

useEffect(() => {
    return () => {
        console.log(props.user)
    };
}, [props.user])

    // function getUpdatedUser() {
    //     var myHeaders = new Headers();
    //     myHeaders.append("x-access-key", "903361");
    //     myHeaders.append("Authorization", "Bearer " + localStorage.getItem('access_token'));
    //     myHeaders.append("Cookie", "egrocer_session=ZGyZlEheLKDTFHnAsVnSpethgG5vROAwF2PeSUBz");

    //     //var formdata = new FormData();

    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         //body: formdata,
    //         redirect: 'follow'
    //     };

    //     fetch("http://egrocer.netsofters.net/customer/user_details", requestOptions)
    //         .then(response => response.json())
    //         .then(result => props.setuser(result.user))
    //         .catch(error => console.log('error', error));
    // }

   
    const handleEditProfile = (e) => {
        e.preventDefault();
        // console.log(uname)
        // console.log(email)

        var myHeaders = new Headers();
        myHeaders.append("x-access-key", "903361");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('access_token'));
        myHeaders.append("Cookie", "egrocer_session=ZGyZlEheLKDTFHnAsVnSpethgG5vROAwF2PeSUBz");

        var formdata = new FormData();
        formdata.append("name", uname);
        formdata.append("email", email);
        if(selectedFile!==null)
            formdata.append("profile", selectedFile);
        else
            formdata.append("profile", "http://egrocer.netsofters.net/imhtmlages/user_default_profile.png");
        // 


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://egrocer.netsofters.net/customer/edit_profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                // toast.success(result.message, {
                //     position: toast.POSITION.TOP_RIGHT
                // });
                
                 //getUpdatedUser();
                // closeModalRef.current.click()

            })
            .catch(error => console.log('error', error));


    }
    return (
        <div className="modal-body">
            <button id='closemodal' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ position: "absolute", color: "white", top: "12px", left: "29pc" }} ref={closeModalRef}></button>

            <section className="vh-50" >
                <div className="container py-5 h-100 ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="">
                                    <img src={profilePic} className="rounded-circle" style={{ width: "150px",height:"140px",marginTop:"1pc" }} alt="Avatar" />
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
                                                <input type="tel" className="form-control" placeholder="Phone Number" id="editPhoneNum" value={props.user.mobile} aria-label="PhoneNum" aria-describedby="phone-addon1" readOnly />
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

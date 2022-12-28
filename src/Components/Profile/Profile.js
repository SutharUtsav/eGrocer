import React, { useState } from 'react'
import { logout } from '../../Model/action/authAction';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../Model/action/userAction';


export const Profile = (props) => {
    const [uname, setuname] = useState(props.user.user.name)
    const [email, setemail] = useState(props.user.user.email)
    const [profilePic,] = useState(props.user.user.profile)
    const [selectedFile, setselectedFile] = useState()


    const dispatch = useDispatch();

    //Logout
    const handleLogout = () => {
        dispatch(logout());
    }

    const editUser = (e) => {
        e.preventDefault();
        dispatch(updateUser(uname, email, selectedFile))
    }


    return (
        <form className='login-form' onSubmit={editUser}>

            <h3>Profile</h3>
            <img src={profilePic} width={150} height={150} alt={uname} />
            {/* <i id="change-image-logo" className="bi bi-arrow-up-left-square-fill"></i> */}

            <h2>{props.user.user.name}</h2>

            {/* <input className="" type="file" id="formFile" onChange={(e) => { setselectedFile(e.target.files[0]) }} /> */}
            <span htmlFor="file">Update Profile Picture</span>
            <input type="file" id="file" onChange={(e) => { setselectedFile(e.target.files[0]) }} />
            {/* <span className="" id="uname-addon1"><i className="fa fa-user" aria-hidden="true"></i></span> */}

            <span htmlFor="name">Update User Name</span>
            <input type="text" id="name" className="" placeholder="User Name" value={uname} onChange={(e) => { setuname(e.target.value) }} aria-label="Username" aria-describedby="uname-addon1" />

            {/* <span className="input-group-text" id="email-addon1"><i className="fa fa-envelope" aria-hidden="true"></i></span> */}
            <span htmlFor="email">Update User Email</span>
            <input type="email" id="email" className="form-control" placeholder="Email" value={email} onChange={(e) => { setemail(e.target.value) }} aria-label="Email" aria-describedby="email-addon1" />

            {/* <span className="input-group-text" id="phone-addon1"><i className="fa fa-phone" aria-hidden="true"></i></span> */}
            <span htmlFor="mobile">Mobile number</span>
            <input type="tel" id="mobile" className="form-control" placeholder="Phone Number" value={props.user.user.mobile} aria-label="PhoneNum" aria-describedby="phone-addon1" readOnly />


            <div className='button-container'>
                <button type='submit' id="update-profile">Update profile</button>
                <button type='button' id="logout" onClick={handleLogout}>Logout</button>
            </div>
        </form>



    )
}

import React from 'react';
import './A_profile.css';
import Sidebar from "./Sidebar_A";


function A_profile() {
    return (
        <div className="profile-wrapper">
            <Sidebar />
            <div className='profile_A'>
                <div className="profile-container">
                    <div className="account-section">
                        <h3 className="section-title">Account</h3>


                         {/* Static Full Name Field */}
                         <label htmlFor="fullName" className='A_profile_lable'>Full Name</label>
                        <input  className="A_profile_intp" type="text" id="fullName" value="Ajay Shinde" readOnly />

                        {/* Static Username Field */}
                        <label htmlFor="username" className='A_profile_lable'>Username</label>
                        <input  className="A_profile_intp" type="text" id="username" value="admin123" readOnly />

                        {/* Static Email Field */}
                        <label htmlFor="email" className='A_profile_lable'>Email <span className="required">*</span></label>
                        <input  className="A_profile_intp" type="email" id="email" value="admin@tdtl.com" readOnly />

                        {/* Static Password Field (not recommended for actual passwords, just as a static example) */}
                        <label htmlFor="password" className='A_profile_lable'>Password</label>
                        <input  className="A_profile_intp" type="password" id="password" value="********" readOnly />

                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default A_profile;

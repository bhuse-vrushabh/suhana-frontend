import React, { useEffect,useState,useContext,useEffectffect } from 'react';
import './A_profile.css';
import Sidebar from "./Sidebar_A";
import { AuthContext } from "../Component/AuthContext";


function A_profile(data) {

    const { authData } = useContext(AuthContext);
    console.log("this is the data passed through context",authData)
    
    const [profileData, setprofileData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
        const fetchProfileData = async () => {
          try {
            const response = await fetch("http://127.0.0.1:8000/api/admin/update/", {
              method: "GET",
              headers: {
              'Authorization': `Bearer ${authData.accessToken}`, // Include the token in the request headers  
                "Content-Type": "application/json",
              },
            });
            console.log("ths is the responce data", response    )
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            console.log("This is the response data:", data)
            setprofileData(data[0]);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProfileData();
      }, []);

   if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
      
    
    return (
        <div className="profile-wrapper">
            <Sidebar />
            <div className='profile_A'>
                <div className="profile-container">
                    <div className="account-section">
                        <h3 className="section-title">Account</h3>


                        {/* Static Full Name Field */}
                        <label htmlFor="fullName" className='A_profile_lable'>Full Name</label>
                        <input className="A_profile_intp" type="text" id="fullName" value={profileData.full_name || ''} readOnly />

                        {/* Static Username Field */}
                        <label htmlFor="username" className='A_profile_lable'>Username</label>
                        <input className="A_profile_intp" type="text" id="username" value={profileData.full_name || ''} readOnly />

                        {/* Static Email Field */}
                        {/* <label htmlFor="email" className='A_profile_lable'>Email <span className="required">*</span></label>
                        <input className="A_profile_intp" type="email" id="email" value="admin@tdtl.com" readOnly /> */}
                        {/* Static Contact Number Field */}
                        <label htmlFor="contactNumber" className='A_profile_lable'>Contact Number <span className="required">*</span></label>
                        <input className="A_profile_intp" type="text" id="contactNumber" value={profileData.emergency_contact || ''} readOnly />

                        {/* Gender Field */}
                        <label className='A_profile_lable'>Gender <span className="required">*</span></label>
                        <div className="gender-options">
                            <label>
                                <input type="radio" name="gender"  checked={profileData.gender === 'male'} readOnly /> Male
                            </label>
                            <label>
                                <input type="radio" name="gender" checked={profileData.gender === 'female'} readOnly /> Female
                            </label>
                            <label>
                                <input type="radio" name="gender" checked={profileData.gender === 'other'} readOnly /> Other
                            </label>
                        </div>
                        {/* Static Password Field (not recommended for actual passwords, just as a static example) */}
                        {/* <label htmlFor="password" className='A_profile_lable'>Password</label>
                        <input  className="A_profile_intp" type="password" id="password" value="********" readOnly /> */}

                        <div>
                            <div className='A_profile_edit'>
                                <button className='A_profile_edit_btnn'>Edit profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default A_profile;


import React, { useEffect, useState, useContext, useEffectffect } from 'react';
import './A_profile.css';
import Sidebar from "./Sidebar_A";
import { AuthContext } from "../Component/AuthContext";
import Swal from 'sweetalert2';


function A_profile(data) {

  const { authData } = useContext(AuthContext);
  console.log("this is the data passed through context", authData)

  const [profileData, setprofileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode




  // 1. Move `fetchProfileData` function outside of useEffect
  const fetchProfileData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/update/", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${authData.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setprofileData(data[0]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Call fetchProfileData inside useEffect on initial load
  useEffect(() => {
    fetchProfileData();
  }, []);

  // 3. Call fetchProfileData inside handleSaveProfile to refresh data after saving
  const handleSaveProfile = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/update/", {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${authData.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      // Fetch updated data after saving
      await fetchProfileData();
      setIsEditing(false); // Exit edit mode
      // Display success message with SweetAlert2 after 1500ms delay
      Swal.fire({
        icon: 'success',
        title: 'Profile updated successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update profile!',
      });
    }
  };







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
            <input className="A_profile_intp" type="text" id="fullName" value={profileData?.full_name || ''} onChange={(e) => setprofileData({ ...profileData, full_name: e.target.value })}
              readOnly={!isEditing} />

            {/* Static Username Field */}
            {/* <label htmlFor="username" className='A_profile_lable'>Username</label>
            <input className="A_profile_intp" type="text" id="username" value={profileData.full_name || ''} onChange={(e) => setprofileData({ ...profileData, username: e.target.value })}
              readOnly={!isEditing} /> */}

            {/* Static Email Field */}
            {/* <label htmlFor="email" className='A_profile_lable'>Email <span className="required">*</span></label>
                        <input className="A_profile_intp" type="email" id="email" value="admin@tdtl.com" readOnly /> */}
            {/* Static Contact Number Field */}
            <label htmlFor="contactNumber" className='A_profile_lable'>Contact Number <span className="required">*</span></label>
            <input className="A_profile_intp" type="text" id="contactNumber" value={profileData?.emergency_contact || ''} onChange={(e) => setprofileData({ ...profileData, emergency_contact: e.target.value })}
              readOnly={!isEditing} />

            {/* Gender Field */}
            <label className='A_profile_lable'>Gender <span className="required">*</span></label>
            <div className="gender-options">
              <label>
                <input type="radio" name="gender" checked={profileData?.gender === 'male'} onChange={() => setprofileData({ ...profileData, gender: 'male' })}
                  disabled={!isEditing} /> Male
              </label>
              <label>
                <input type="radio" name="gender" checked={profileData?.gender === 'female'} onChange={() => setprofileData({ ...profileData, gender: 'female' })}
                  disabled={!isEditing} /> Female
              </label>
              <label>
                <input type="radio" name="gender" checked={profileData?.gender === 'other'} onChange={() => setprofileData({ ...profileData, gender: 'other' })}
                  disabled={!isEditing} /> Other
              </label>
            </div>
            {/* Static Password Field (not recommended for actual passwords, just as a static example) */}
            {/* <label htmlFor="password" className='A_profile_lable'>Password</label>
                        <input  className="A_profile_intp" type="password" id="password" value="********" readOnly /> */}

            <div>
              <div className='A_profile_edit'>
                {isEditing ? (
                  <button className='A_profile_edit_btnn' onClick={handleSaveProfile}>Save Profile</button>
                ) : (
                  <button className='A_profile_edit_btnn' onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default A_profile;


import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { AuthContext } from '../Contexts/AuthContext';


const UserProfile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    district: '',
    upazila: '',
    bloodGroup: '',
    avatar: ''
  });

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/user-data/${user.email}`).then((res) => {
        setProfileData(res.data);
      });
    }
  }, [user?.email, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const { _id, ...updatedData } = profileData;
      await axiosSecure.patch(`/update-user-data/${_id}`, updatedData)
        .then(res => {
          if (res.data.modifiedCount > 0) {
            toast.success('Profile updated successfully!');
            setIsEditing(false);
          } else {
            toast.info('No changes were made.');
          }
        })

    } catch (error) {
      toast.error('Failed to update profile.', error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">User Profile</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          {!isEditing ? (
            <button className="btn btn-outline btn-primary" onClick={handleEdit}>
              Edit
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="avatar mb-4">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={profileData.photoURL || '/default-avatar.png'} alt="User Avatar" />
              </div>
            </div>
            {isEditing && (
              <div className="w-full">
                <label className="label font-medium">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  className="input input-bordered w-full"
                  value={profileData.photoURL}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <div>
              <label className="label font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                value={profileData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label font-medium">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={profileData.email}
                disabled
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">District</label>
                <input
                  type="text"
                  name="district"
                  className="input input-bordered w-full"
                  value={profileData.district}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="label font-medium">Upazila</label>
                <input
                  type="text"
                  name="upazila"
                  className="input input-bordered w-full"
                  value={profileData.upazila}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <label className="label font-medium">Blood Group</label>
              <select name="bloodGroup"
                value={profileData.bloodGroup}
                onChange={handleChange}
                className="select select-bordered w-full" required>
                <option disabled={!isEditing} >Select group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                  <option key={group}>{group}</option>
                ))}
              </select>
              {/* <input
                type="text"
                name="bloodGroup"
                className="input input-bordered w-full"
                value={profileData.bloodGroup}
                onChange={handleChange}
                disabled={!isEditing}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;


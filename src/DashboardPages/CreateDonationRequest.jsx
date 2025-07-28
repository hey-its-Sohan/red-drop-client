import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import districts from '../District_Upazila_Data/district.json';
import upazilas from '../District_Upazila_Data/upazila.json';
import { toast } from 'react-toastify';
import useUserStatus from '../Hooks/useUserStatus';
import Loader from '../Components/Loader';

const CreateDonationRequest = () => {
  const { user } = use(AuthContext); // Assume userStatus is 'active' or 'blocked'
  const axiosSecure = useAxiosSecure();
  const { userStatus, isLoading } = useUserStatus();

  const isBlocked = userStatus !== 'active';

  const [formData, setFormData] = useState({
    recipientName: '',
    district: '',
    upazila: '',
    hospital: '',
    address: '',
    bloodGroup: '',
    donationDate: '',
    donationTime: '',
    message: ''
  });

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    if (formData.district) {
      const selectedDistrict = districts.find(d => d.name === formData.district);
      const upazilasByDistrict = upazilas.filter(u => u.district_id === selectedDistrict?.id);
      setFilteredUpazilas(upazilasByDistrict);
    } else {
      setFilteredUpazilas([]);
    }
  }, [formData.district]);

  if (isLoading || !user) return <Loader></Loader>;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (userStatus === 'blocked') {
      toast.error("Blocked users can't create donation requests.");
      return;
    }

    const requestData = {
      requesterName: user.displayName,
      requesterEmail: user.email,
      ...formData,
      status: 'Pending',
    };

    try {
      const res = await axiosSecure.post('/donation-requests', requestData);
      if (res.data.insertedId) {
        toast.success("Donation request submitted successfully!");
        setFormData({
          recipientName: '',
          district: '',
          upazila: '',
          hospital: '',
          address: '',
          bloodGroup: '',
          donationDate: '',
          donationTime: '',
          message: ''
        });
      }
    } catch (error) {
      toast.error("Failed to submit request.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-7 py-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Create Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium">Requester Name</label>
            <input type="text" value={user.displayName} readOnly className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label font-medium">Requester Email</label>
            <input type="email" value={user.email} readOnly className="input input-bordered w-full" />
          </div>
        </div>

        <div>
          <label className="label font-medium">Recipient Name</label>
          <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} className="input input-bordered w-full" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium">District</label>
            <select name="district" value={formData.district} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="" disabled>Select District</option>
              {districts.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label font-medium">Upazila</label>
            <select name="upazila" value={formData.upazila} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="" disabled>Select Upazila</option>
              {filteredUpazilas.map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label font-medium">Hospital Name</label>
          <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="label font-medium">Full Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="input input-bordered w-full" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium">Blood Group</label>
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label font-medium">Donation Date</label>
            <input type="date" name="donationDate" value={formData.donationDate} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label font-medium">Donation Time</label>
            <input type="time" name="donationTime" value={formData.donationTime} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
        </div>

        <div>
          <label className="label font-medium">Request Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} className="textarea textarea-bordered w-full" rows={4} required />
        </div>

        <button type="submit" className="btn text-white btn-primary w-full mt-4" disabled={userStatus === isBlocked}>
          Request Blood
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;

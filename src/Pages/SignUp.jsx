import React, { useState, useEffect, use } from 'react';
import loginImg from '../assets/mainLogo.png';
import { toast } from 'react-toastify';
import { AuthContext } from '../Contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import districts from '../District_Upazila_Data/district.json';
import upazilas from '../District_Upazila_Data/upazila.json';

const SignUp = () => {
  const { setUser, updateUser, createUser } = use(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = upazilas.filter(up => up.district_id === selectedDistrictId);
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId]);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { name, photoURL, email, password, confirmPassword, bloodGroup, district, upazila } =
      Object.fromEntries(formData.entries());

    setErrorMessage('');

    const passwordValidation = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordValidation.test(password)) {
      setErrorMessage('Password must contain at least one uppercase, one lowercase letter and be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        const userInfo = {
          name,
          email: user.email,
          role: 'donor',
          status: 'active',
          photoURL,
          bloodGroup,
          district,
          upazila,
          created_at: new Date().toISOString()
        };

        updateUser({ displayName: name, photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL });
            toast.success('Account Created Successfully');
            navigate(location?.state || '/');
          })
          .catch(() => {
            setErrorMessage('Profile update failed.');
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2">
        <img src={loginImg} alt="Login" className="object-cover w-full h-full" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-base-100 px-6 py-12">
        <div className="w-full bg-white p-5 shadow-md rounded-lg max-w-lg space-y-5">
          <h2 className="text-3xl font-bold text-center text-primary">Create an Account</h2>
          <form onSubmit={handleSignUp} className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="label font-medium">Name</label>
              <input type="text" name="name" className="input input-bordered w-full" required />
            </div>

            <div className="md:col-span-2">
              <label className="label font-medium">Email</label>
              <input type="email" name="email" className="input input-bordered w-full" required />
            </div>

            <div className="md:col-span-2">
              <label className="label font-medium">Photo URL</label>
              <input type="url" name="photoURL" className="input input-bordered w-full" />
            </div>

            <div className="md:col-span-2">
              <label className="label font-medium">Blood Group</label>
              <select name="bloodGroup" className="select select-bordered w-full" required>
                <option disabled selected>Select group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                  <option key={group}>{group}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label font-medium">District</label>
              <select
                name="district"
                className="select select-bordered w-full"
                required
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
              >
                <option disabled value="">Select district</option>
                {districts.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label font-medium">Upazila</label>
              <select name="upazila" className="select select-bordered w-full" required disabled={!filteredUpazilas.length}>
                <option disabled selected>Select upazila</option>
                {filteredUpazilas.map(u => (
                  <option key={u.id}>{u.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label font-medium">Password</label>
              <input type="password" name="password" className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label font-medium">Confirm Password</label>
              <input type="password" name="confirmPassword" className="input input-bordered w-full" required />
            </div>

            {errorMessage && (
              <div className="md:col-span-2 text-sm text-error">{errorMessage}</div>
            )}

            <div className="md:col-span-2">
              <button type="submit" className="btn btn-primary text-white w-full">
                Sign Up
              </button>
            </div>

            <div className="md:col-span-2 text-center text-sm">
              Already have an account?
              <a href="/login" className="link link-primary ml-1">Login here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

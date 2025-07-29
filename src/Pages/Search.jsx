import { useState, useEffect } from 'react';
import { Search as SearchIcon, MapPin, Droplet, LocateIcon, Clock, Calendar, MessageCircle, Mail } from 'lucide-react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import districts from '../District_Upazila_Data/district.json';
import upazilas from '../District_Upazila_Data/upazila.json';
import Loader from '../Components/Loader';
import donorPhoto from '../assets/userProfile.png'
import Lottie from 'lottie-react';
import search from '../assets/Animation/Searching.json'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Search = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedBlood, setSelectedBlood] = useState('');
  const [donors, setDonors] = useState([]);
  const [upazilaOptions, setUpazilaOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const districtObj = districts.find(d => d.name === selectedDistrict);
    if (districtObj) {
      const filteredUpazilas = upazilas
        .filter(u => u.district_id === districtObj.id)
        .map(u => u.name);
      setUpazilaOptions(filteredUpazilas);
      setSelectedUpazila('');
    } else {
      setUpazilaOptions([]);
      setSelectedUpazila('');
    }
  }, [selectedDistrict]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedBlood || !selectedDistrict || !selectedUpazila) return;

    try {
      setLoading(true);
      const res = await axiosPublic.get('/search-donors', {
        params: {
          bloodGroup: selectedBlood,
          district: selectedDistrict,
          upazila: selectedUpazila,
        },
      });
      setDonors(res.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />

  return (
    <div className="max-w-4xl mx-auto px-4 min-h-screen py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">🔍 Search Blood Donors</h2>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div>
          <label className="label">
            <span className="label-text"><Droplet size={16} className="inline mr-1" /> Blood Group</span>
          </label>
          <select className="select select-bordered w-full" value={selectedBlood} onChange={(e) => setSelectedBlood(e.target.value)} required>
            <option value="">Select Blood Group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text"><MapPin size={16} className="inline mr-1" /> District</span>
          </label>
          <select className="select select-bordered w-full" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} required>
            <option value="">Select District</option>
            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text"><LocateIcon size={16} className="inline mr-1" /> Upazila</span>
          </label>
          <select className="select select-bordered w-full" value={selectedUpazila} onChange={(e) => setSelectedUpazila(e.target.value)} required disabled={!upazilaOptions.length}>
            <option value="">Select Upazila</option>
            {upazilaOptions.map((u, idx) => <option key={idx} value={u}>{u}</option>)}
          </select>
        </div>

        <div className="md:col-span-3 text-center mt-2">
          <button type="submit" className="btn text-white btn-primary">
            <SearchIcon className="mr-2" size={18} /> Search
          </button>
        </div>
      </form>

      {loading && <p className="text-center text-gray-500">Searching donors...</p>}

      {!loading && donors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donors.map((donor) => (
            // <div key={donor._id} className="card bg-white shadow-md border border-primary rounded-xl px-4 hover:shadow-lg transition-all">
            //   <div className="card-body">
            //     <h3 className="text-lg font-semibold">{donor.name}</h3>
            //     <p className="text-sm text-red-600 font-medium">{donor.bloodGroup}</p>
            //     <p className="text-sm">{donor.district}, {donor.upazila}</p>
            //     <p className="text-sm text-gray-500">{donor.email}</p>
            //   </div>
            // </div>


            <div
              key={donor._id}
              className="card bg-white shadow-md border border-primary rounded-xl px-4 py-2 hover:shadow-lg transition-all"
            >
              <div className="flex items-center my-3 gap-4">
                <img
                  src={donor.photoURL}
                  alt={donorPhoto}
                  className="w-12 h-12 rounded-full object-cover border border-primary"
                />
                <h3 className="text-xl font-bold text-balck mb-2">
                  {donor.name}
                </h3>
              </div>

              <div className="flex items-center  text-gray-600 mb-1">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <h3><span className='font-medium text-black'>Location:</span> {donor.upazila}, {donor.district}</h3>
              </div>

              <div className="flex items-center  text-gray-600 mb-1">
                <Droplet className="w-4 h-4 mr-2 text-red-500" />
                <h3 className='font-medium text-black'> Blood Group: <span className="font-medium text-red-600">{donor.bloodGroup}</span></h3>
              </div>

              <div className="flex items-center  text-gray-600 mb-1">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <h3><span className='font-medium text-black'>Email:</span> {donor.email}</h3>
              </div>
            </div>



          ))}
        </div>
      )}

      {!loading && donors.length === 0 && (
        <>
          <p className="text-center text-gray-400">No donors found. Try a different search.</p>
          <Lottie animationData={search} loop={true} className='' />
        </>
      )}
    </div>
  );
};

export default Search;

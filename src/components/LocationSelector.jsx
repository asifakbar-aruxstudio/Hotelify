import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown, Plus, Search, MapPin } from 'lucide-react';
import locationsAPI from '../api/locationsAPI';
import useDebounce from '../hooks/useDebounce';

const LocationSelector = ({ onChange, initialValues }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  
  const [provinceSearch, setProvinceSearch] = useState('');
  const [districtSearch, setDistrictSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  
  const [isAddingNew, setIsAddingNew] = useState({ province: false, district: false, city: false });
  const [newValues, setNewValues] = useState({ province: '', district: '', city: '', cityType: 'city' });
  
  const [loading, setLoading] = useState({ provinces: false, districts: false, cities: false });
  const [error, setError] = useState(null);
  
  const provinceRef = useRef(null);
  const districtRef = useRef(null);
  const cityRef = useRef(null);
  
  const debouncedProvinceSearch = useDebounce(provinceSearch, 300);
  const debouncedDistrictSearch = useDebounce(districtSearch, 300);
  const debouncedCitySearch = useDebounce(citySearch, 300);

  useEffect(() => {
    loadProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      loadDistricts();
    } else {
      setDistricts([]);
      setSelectedDistrict(null);
      setSelectedCity(null);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      loadCities();
    } else {
      setCities([]);
      setSelectedCity(null);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (onChange) {
      onChange({
        province: selectedProvince,
        district: selectedDistrict,
        city: selectedCity,
        provinceName: selectedProvince?.name || newValues.province,
        districtName: selectedDistrict?.name || newValues.district,
        cityName: selectedCity?.name || newValues.city,
        cityType: newValues.cityType
      });
    }
  }, [selectedProvince, selectedDistrict, selectedCity, newValues]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (provinceRef.current && !provinceRef.current.contains(event.target)) {
        setShowProvinceDropdown(false);
      }
      if (districtRef.current && !districtRef.current.contains(event.target)) {
        setShowDistrictDropdown(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadProvinces = async (search = '') => {
    try {
      setLoading(prev => ({ ...prev, provinces: true }));
      const response = await locationsAPI.getProvinces(search);
      if (response.success) {
        setProvinces(response.provinces || []);
      }
    } catch (err) {
      console.error('Error loading provinces:', err);
    } finally {
      setLoading(prev => ({ ...prev, provinces: false }));
    }
  };

  const loadDistricts = async (search = '') => {
    if (!selectedProvince) return;
    try {
      setLoading(prev => ({ ...prev, districts: true }));
      const response = await locationsAPI.getDistricts(selectedProvince._id, search);
      if (response.success) {
        setDistricts(response.districts || []);
      }
    } catch (err) {
      console.error('Error loading districts:', err);
    } finally {
      setLoading(prev => ({ ...prev, districts: false }));
    }
  };

  const loadCities = async (search = '') => {
    if (!selectedDistrict) return;
    try {
      setLoading(prev => ({ ...prev, cities: true }));
      const response = await locationsAPI.getCities(selectedDistrict._id, search);
      if (response.success) {
        setCities(response.cities || []);
      }
    } catch (err) {
      console.error('Error loading cities:', err);
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  };

  useEffect(() => {
    if (debouncedProvinceSearch && showProvinceDropdown) {
      loadProvinces(debouncedProvinceSearch);
    } else if (!showProvinceDropdown) {
      setProvinceSearch('');
    }
  }, [debouncedProvinceSearch, showProvinceDropdown]);

  useEffect(() => {
    if (debouncedDistrictSearch && showDistrictDropdown) {
      loadDistricts(debouncedDistrictSearch);
    } else if (!showDistrictDropdown) {
      setDistrictSearch('');
    }
  }, [debouncedDistrictSearch, showDistrictDropdown]);

  useEffect(() => {
    if (debouncedCitySearch && showCityDropdown) {
      loadCities(debouncedCitySearch);
    } else if (!showCityDropdown) {
      setCitySearch('');
    }
  }, [debouncedCitySearch, showCityDropdown]);

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedCity(null);
    setProvinceSearch('');
    setShowProvinceDropdown(false);
    setIsAddingNew(prev => ({ ...prev, province: false }));
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedCity(null);
    setDistrictSearch('');
    setShowDistrictDropdown(false);
    setIsAddingNew(prev => ({ ...prev, district: false }));
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCitySearch('');
    setShowCityDropdown(false);
    setIsAddingNew(prev => ({ ...prev, city: false }));
  };

  const handleAddNew = async (type) => {
    if (type === 'province' && newValues.province.trim()) {
      try {
        const response = await locationsAPI.createOrFind({
          provinceName: newValues.province.trim(),
          districtName: newValues.district.trim() || newValues.province.trim(),
          cityName: newValues.city.trim() || newValues.province.trim(),
          cityType: newValues.cityType
        });
        
        if (response.success && response.location) {
          const { province, district, city } = response.location;
          setSelectedProvince({ _id: province._id, name: province.name });
          setSelectedDistrict({ _id: district._id, name: district.name });
          setSelectedCity({ _id: city._id, name: city.name, type: city.type });
          setNewValues({ province: '', district: '', city: '', cityType: 'city' });
        }
      } catch (err) {
        setError(err.message);
      }
    } else if (type === 'district' && selectedProvince && newValues.district.trim()) {
      try {
        const response = await locationsAPI.createOrFind({
          provinceName: selectedProvince.name,
          districtName: newValues.district.trim(),
          cityName: newValues.city.trim() || newValues.district.trim(),
          cityType: newValues.cityType
        });
        
        if (response.success && response.location) {
          const { district, city } = response.location;
          setSelectedDistrict({ _id: district._id, name: district.name });
          setSelectedCity({ _id: city._id, name: city.name, type: city.type });
          setNewValues(prev => ({ ...prev, district: '', city: '' }));
        }
      } catch (err) {
        setError(err.message);
      }
    } else if (type === 'city' && selectedDistrict && newValues.city.trim()) {
      try {
        const response = await locationsAPI.createOrFind({
          provinceName: selectedProvince.name,
          districtName: selectedDistrict.name,
          cityName: newValues.city.trim(),
          cityType: newValues.cityType
        });
        
        if (response.success && response.location) {
          const { city } = response.location;
          setSelectedCity({ _id: city._id, name: city.name, type: city.type });
          setNewValues(prev => ({ ...prev, city: '' }));
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Province <span className="text-red-500">*</span>
        </label>
        <div className="relative" ref={provinceRef}>
          <div
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between"
            onClick={() => setShowProvinceDropdown(!showProvinceDropdown)}
          >
            <span className={selectedProvince ? 'text-gray-900' : 'text-gray-400'}>
              {selectedProvince?.name || 'Select Province'}
            </span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          
          {showProvinceDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
              <div className="p-2 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search province..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={provinceSearch}
                    onChange={(e) => setProvinceSearch(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {loading.provinces ? (
                  <div className="p-4 text-center text-gray-500">Loading...</div>
                ) : provinces.length > 0 ? (
                  provinces.map((province) => (
                    <div
                      key={province._id}
                      className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                      onClick={() => handleProvinceSelect(province)}
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {province.name}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">No provinces found</div>
                )}
                <div
                  className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer flex items-center gap-2 text-blue-600 border-t border-gray-100"
                  onClick={() => {
                    setShowProvinceDropdown(false);
                    setIsAddingNew(prev => ({ ...prev, province: true }));
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Not found? Add new Province
                </div>
              </div>
            </div>
          )}
          
          {isAddingNew.province && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              <input
                type="text"
                placeholder="Enter new Province name"
                className="w-full px-3 py-2 border border-blue-200 rounded-md mb-2"
                value={newValues.province}
                onChange={(e) => setNewValues(prev => ({ ...prev, province: e.target.value }))}
              />
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm text-gray-600">Type:</label>
                <select
                  className="px-3 py-2 border border-blue-200 rounded-md"
                  value={newValues.cityType}
                  onChange={(e) => setNewValues(prev => ({ ...prev, cityType: e.target.value }))}
                >
                  <option value="city">City</option>
                  <option value="town">Town</option>
                  <option value="village">Village</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => handleAddNew('province')}
                >
                  Add Province
                </button>
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  onClick={() => setIsAddingNew(prev => ({ ...prev, province: false }))}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          District <span className="text-red-500">*</span>
        </label>
        <div className="relative" ref={districtRef}>
          <div
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between"
            onClick={() => selectedProvince && setShowDistrictDropdown(!showDistrictDropdown)}
          >
            <span className={selectedDistrict ? 'text-gray-900' : 'text-gray-400'}>
              {selectedDistrict?.name || (selectedProvince ? 'Select District' : 'Select Province first')}
            </span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          
          {showDistrictDropdown && selectedProvince && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
              <div className="p-2 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search district..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={districtSearch}
                    onChange={(e) => setDistrictSearch(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {loading.districts ? (
                  <div className="p-4 text-center text-gray-500">Loading...</div>
                ) : districts.length > 0 ? (
                  districts.map((district) => (
                    <div
                      key={district._id}
                      className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                      onClick={() => handleDistrictSelect(district)}
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {district.name}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">No districts found</div>
                )}
                <div
                  className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer flex items-center gap-2 text-blue-600 border-t border-gray-100"
                  onClick={() => {
                    setShowDistrictDropdown(false);
                    setIsAddingNew(prev => ({ ...prev, district: true }));
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Not found? Add new District
                </div>
              </div>
            </div>
          )}
          
          {isAddingNew.district && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              <input
                type="text"
                placeholder="Enter new District name"
                className="w-full px-3 py-2 border border-blue-200 rounded-md mb-2"
                value={newValues.district}
                onChange={(e) => setNewValues(prev => ({ ...prev, district: e.target.value }))}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => handleAddNew('district')}
                >
                  Add District
                </button>
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  onClick={() => setIsAddingNew(prev => ({ ...prev, district: false }))}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City / Town / Village <span className="text-red-500">*</span>
        </label>
        <div className="relative" ref={cityRef}>
          <div
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between"
            onClick={() => selectedDistrict && setShowCityDropdown(!showCityDropdown)}
          >
            <span className={selectedCity ? 'text-gray-900' : 'text-gray-400'}>
              {selectedCity?.name || (selectedDistrict ? 'Select City/Town/Village' : 'Select District first')}
            </span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          
          {showCityDropdown && selectedDistrict && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
              <div className="p-2 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search city..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {loading.cities ? (
                  <div className="p-4 text-center text-gray-500">Loading...</div>
                ) : cities.length > 0 ? (
                  cities.map((city) => (
                    <div
                      key={city._id}
                      className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                      onClick={() => handleCitySelect(city)}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {city.name}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">{city.type}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">No cities found</div>
                )}
                <div
                  className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer flex items-center gap-2 text-blue-600 border-t border-gray-100"
                  onClick={() => {
                    setShowCityDropdown(false);
                    setIsAddingNew(prev => ({ ...prev, city: true }));
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Not found? Add new
                </div>
              </div>
            </div>
          )}
          
          {isAddingNew.city && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              <input
                type="text"
                placeholder="Enter new City/Town/Village name"
                className="w-full px-3 py-2 border border-blue-200 rounded-md mb-2"
                value={newValues.city}
                onChange={(e) => setNewValues(prev => ({ ...prev, city: e.target.value }))}
              />
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm text-gray-600">Type:</label>
                <select
                  className="px-3 py-2 border border-blue-200 rounded-md"
                  value={newValues.cityType}
                  onChange={(e) => setNewValues(prev => ({ ...prev, cityType: e.target.value }))}
                >
                  <option value="city">City</option>
                  <option value="town">Town</option>
                  <option value="village">Village</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => handleAddNew('city')}
                >
                  Add Location
                </button>
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  onClick={() => setIsAddingNew(prev => ({ ...prev, city: false }))}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          type="text"
          placeholder="Enter detailed address (optional)"
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg"
          onChange={(e) => {
            if (onChange) {
              onChange({
                province: selectedProvince,
                district: selectedDistrict,
                city: selectedCity,
                provinceName: selectedProvince?.name || newValues.province,
                districtName: selectedDistrict?.name || newValues.district,
                cityName: selectedCity?.name || newValues.city,
                cityType: newValues.cityType,
                address: e.target.value
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default LocationSelector;
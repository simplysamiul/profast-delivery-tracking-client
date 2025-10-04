import L from 'leaflet';
import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet'
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const position = [23.6850, 90.3563]; // Center of Bangladesh

// // Optional custom icon (can skip for default)
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Helper component to move map
function FlyToDistrict({ coords }) {
    const map = useMap();
    if (coords) {
        map.flyTo(coords, 16, { duration: 1.5 });
    }
    return null;
}
const BangladeshMap = ({ warehouses }) => {
    const [searchText, setSearchText] = useState("");
    const [activeCoords, setActiveCoords] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null);
    const handleSearch = e => {
        e.preventDefault();
        const district = warehouses.find(d =>
            d.district.toLowerCase().includes(searchText.toLowerCase())
        );

        if (district) {
            setActiveCoords([district.latitude, district.longitude]);
            setActiveDistrict(district.district)
        }
    }
    return (
        <div>
            {/* location search section */}
            <form onSubmit={handleSearch}>
                <div className="flex items-center w-full max-w-xl bg-gray-50 rounded-full shadow-sm overflow-hidden border-1 border-lightG mb-14">
                    {/* Search Icon */}
                    <span className="px-3 text-gray-500"><FiSearch size={20} /></span>

                    {/* Input Field */}
                    <input
                        type="text"
                        placeholder="Search here"
                        className="flex-1 outline-none bg-gray-50 text-gray-700 placeholder-gray-500 text-sm py-3"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    {/* Button */}
                    <button className="btn bg-lightG hover:bg-deepG hover:text-white rounded-full py-4 font-bold px-6 text-black">
                        Search
                    </button>
                </div>
            </form>
            <h2 className='text-lg md:text-2xl lg:text-3xl font-extrabold text-deepG mt-10 lg:mt-15 mb-8'>We deliver almost all over Bangladesh</h2>
            <div className="w-full h-[800px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
                {/* map location search bar */}

                {/* map container */}
                <MapContainer
                    style={{ width: "100%", height: "120%" }}
                    center={position}
                    zoom={8}
                    scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FlyToDistrict coords={activeCoords} />
                    {
                        warehouses.map((wareHouse, idx) => <Marker
                            key={idx}
                            position={[wareHouse.latitude, wareHouse.longitude]}
                            icon={customIcon}>
                            <Popup autoOpen={wareHouse.district === activeDistrict}>
                                <strong>Region:</strong> {wareHouse.region}
                                <br />
                                <strong>Covered areas:</strong> {wareHouse.covered_area.join(", ")}
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default BangladeshMap;
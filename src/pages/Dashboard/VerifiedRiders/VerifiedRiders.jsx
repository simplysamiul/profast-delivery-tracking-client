import { useState } from "react";
import { Eye, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const VerifiedRiders = () => {
    const [selectedRider, setSelectedRider] = useState(null);
    const axiousSecfure = useAxiosSecure();
    const { user } = useAuth();


    // load rider data
    const { data: activeRider = [], refetch } = useQuery({
        queryKey: ["pending-riders",],
        queryFn: async () => {
            const res = await axiousSecfure.get("/riders?status=verified");
            return res.data
        }
    })

    // Reject Handler with Confirm Popup    
    const handleReject = async (rider) => {
        const { value: reason } = await Swal.fire({
            title: `Reject ${rider.name}?`,
            icon: "warning",
            input: "textarea", // ✅ Added input field
            inputLabel: "Reason for rejection",
            inputPlaceholder: "Type your reason here...",
            inputAttributes: {
                "aria-label": "Type your reason here",
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#03373D",
            inputValidator: (value) => {
                if (!value) {
                    return "Please provide a reason for rejection!";
                }
            },
        });

        // ✅ After entering reason
        if (reason) {

            // update rider info and send rejected message to the databse 
            try {
                await axiousSecfure.put(`/riders/${rider._id}`, { status: "rejected", rejectMsg: reason })
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            // Show confirmation
                            Swal.fire({
                                title: "Rider Rejected",
                                text: `${rider.name}'s application has been rejected.`,
                                icon: "error",
                                confirmButtonColor: "#03373D",
                            });
                            refetch();
                        }

                    })
            } catch (err) {
                console.error("Failed to send rejection reason:", err);
                Swal.fire({
                    title: "Error",
                    text: "Failed to save rejection reason to database.",
                    icon: "warning",
                    confirmButtonColor: "#03373D",
                });
            }
        }
    };

    // NID Image Fullscreen Popup
    const handleNidImagePreview = (imageUrl) => {
        Swal.fire({
            imageUrl: imageUrl,
            imageAlt: "NID Image",
            showConfirmButton: false,
            background: "#000000cc",
        });
    };

    // Color badge for approval status
    const getPaymentBadge = (approval) => {
        switch (approval) {
            case "verified":
                return <span className="badge bg-green-500 text-white">Verified</span>;
            case "pending":
                return <span className="badge bg-yellow-500 text-white">Pending</span>;
            case "rejected":
            default:
                return <span className="badge bg-red-500 text-white">Unpaid</span>;
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-deepG text-center border-b-2 pb-2 mt-10 md:-mt-3">
                Verified Riders
            </h2>

            {activeRider.length > 0 ? <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="table w-full text-sm">
                    <thead className="bg-deepG text-lightG">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>District</th>
                            <th>Warehouse</th>
                            <th>Applied At</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeRider.map((rider, index) => (
                            <tr key={rider._id} className="hover:bg-lightG">
                                <td>{index + 1}</td>
                                <td className="font-semibold">{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.age}</td>
                                <td>{rider.riderDistrict}</td>
                                <td>{rider.warehouse}</td>
                                <td>{new Date(rider.applyAt).toLocaleDateString()}</td>
                                <td>{getPaymentBadge(rider.approval)}</td>
                                <td className="flex items-center gap-2">
                                    <button
                                        onClick={() => setSelectedRider(rider)}
                                        className="btn btn-sm bg-[#03373de4] hover:bg-deepG text-white tooltip" data-tip="Details"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleReject(rider)}
                                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white tooltip" data-tip="Reject"
                                    >
                                        <XCircle size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                : <div className="flex flex-col items-center justify-center text-center py-20 mx-auto">
                    <div className="bg-[#03373D]/10 p-6 rounded-full mb-4">
                        <AlertCircle size={60} className="text-deepG" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#03373D]">
                        No Rider Info Found
                    </h3>
                </div>}

            {/* Details Modal */}
            {selectedRider && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative">
                        <button
                            onClick={() => setSelectedRider(null)}
                            className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-2xl font-bold"
                        >
                            ×
                        </button>

                        {/* Profile */}
                        <div className="text-center mb-4">
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-24 h-24 mx-auto rounded-full border-4 border-lightG object-cover"
                            />
                            <h3 className="text-xl font-bold mt-2 text-deepG">
                                {selectedRider.name}
                            </h3>
                            <p className="text-sm text-gray-500">{selectedRider.email}</p>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <p>
                                <strong>Age:</strong> {selectedRider.age}
                            </p>
                            <p>
                                <strong>Contact:</strong> {selectedRider.contact}
                            </p>
                            <p>
                                <strong>District:</strong> {selectedRider.riderDistrict}
                            </p>
                            <p>
                                <strong>Warehouse:</strong> {selectedRider.warehouse}
                            </p>
                            <p>
                                <strong>Bike Model:</strong> {selectedRider.model}
                            </p>
                            <p>
                                <strong>Reg No:</strong> {selectedRider.regNo}
                            </p>
                            <p>
                                <strong>NID:</strong> {selectedRider.nid}
                            </p>
                            <p>
                                <strong>Applied:</strong>{" "}
                                {new Date(selectedRider.applyAt).toLocaleString()}
                            </p>
                        </div>

                        {/* NID Image */}
                        <div className="mt-4">
                            <p className="font-semibold text-deepG mb-2">
                                NID Verification Image:
                            </p>
                            <img
                                onClick={() => handleNidImagePreview(selectedRider.nidImage)}
                                src={selectedRider.nidImage}
                                alt="NID"
                                className="w-full rounded-lg border cursor-pointer hover:opacity-90 transition"
                            />
                            <p className="text-xs text-gray-400 text-center mt-1">
                                (Click to view full image)
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifiedRiders;
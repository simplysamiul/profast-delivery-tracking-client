import { useState } from "react";
import { Eye, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingRiders = () => {
    const [selectedRider, setSelectedRider] = useState(null);
    const axiousSecure = useAxiosSecure();
    const { user } = useAuth();


    // load rider data
    const { data: pendingRider = [], refetch } = useQuery({
        queryKey: ["pending-riders",],
        queryFn: async () => {
            const res = await axiousSecure.get("/riders?status=pending");
            return res.data
        }
    })

    // Accept Handler
    const handleAccept = async (rider) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to approve ${rider.name} as a rider?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiousSecure.put(`/riders/${rider._id}`, {
                        status: "verified",
                        email: rider.email
                    });

                    if (res.data.modifiedCount) {
                        Swal.fire({
                            title: "Rider Approved",
                            text: `${rider.name} has been accepted successfully.`,
                            icon: "success",
                            confirmButtonColor: "#03373D",
                        });
                        refetch();
                    }
                } catch (err) {
                    Swal.fire({
                        title: "Error",
                        text: err.message,
                        icon: "error",
                    });
                }
            }
        });
    };


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
                await axiousSecure.put(`/riders/${rider._id}`, { status: "rejected", rejectMsg: reason })
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
            title: "NID Verification Image",
            imageUrl: imageUrl,
            imageAlt: "NID Image",
            showConfirmButton: false,
            showCloseButton: true,
            background: "#CAEB66",
            width: "50%",
            padding: "1rem",
            imageWidth: "100%",
            imageHeight: "auto",
            customClass: {
                popup: "rounded-3xl shadow-2xl",
                image: "rounded-lg object-contain",
            },
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
                Pending Riders
            </h2>

            {pendingRider.length > 0 ? <div className="overflow-x-auto bg-white rounded-xl shadow-md">
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
                        {pendingRider.map((rider, index) => (
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
                                        onClick={() => handleAccept(rider)}
                                        className="btn btn-sm bg-green-500 hover:bg-green-600 text-white tooltip" data-tip="Approved"
                                    >
                                        <CheckCircle size={16} />
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
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedRider(null)}
                            className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
                        >
                            ×
                        </button>

                        {/* Profile */}
                        <div className="text-center mb-6">
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-28 h-28 mx-auto rounded-full border-4 border-lightG object-cover shadow-md"
                            />
                            <h3 className="text-2xl font-bold mt-3 text-deepG">
                                {selectedRider.name}
                            </h3>
                            <p className="text-sm text-gray-500">{selectedRider.email}</p>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>Contact:</strong> {selectedRider.contact}</p>
                            <p><strong>District:</strong> {selectedRider.riderDistrict}</p>
                            <p><strong>Warehouse:</strong> {selectedRider.warehouse}</p>
                            <p><strong>Bike Model:</strong> {selectedRider.model}</p>
                            <p><strong>Reg No:</strong> {selectedRider.regNo}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p>
                                <strong>Applied:</strong>{" "}
                                {new Date(selectedRider.applyAt).toLocaleString()}
                            </p>
                        </div>

                        {/* NID Image */}
                        <div className="mt-6">
                            <p className="font-semibold text-deepG mb-3 text-lg">
                                NID Verification Image:
                            </p>
                            <div className="flex justify-center">
                                <img
                                    onClick={() => handleNidImagePreview(selectedRider.nidImage)}
                                    src={selectedRider.nidImage}
                                    alt="NID"
                                    className="w-full sm:w-3/4 md:w-1/2 rounded-lg border cursor-pointer hover:opacity-90 transition"
                                />
                            </div>
                            <p className="text-xs text-gray-400 text-center mt-2">
                                (Click to view full image)
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PendingRiders;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, UserCog, Search } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";

const MakeAdmin = () => {
    const [emailQuery, setEmailQuery] = useState("");
    const axiosSecure = useAxiosSecure();

    // Fetch users by email using useQuery
    const {data: users = [], refetch, isFetching } = useQuery({
        queryKey: ["search-users", emailQuery],
        queryFn: async () => {
            if (!emailQuery || emailQuery.length < 2) return [];
            const { data } = await axiosSecure.get(`/user/search?email=${emailQuery}`);
            return data;
        },
        enabled: emailQuery.length >= 2, // only run query if 2+ chars typed
        staleTime: 1000 * 60, // cache for 1 min
    });

    // Make Admin mutation
    const makeAdminMutation = useMutation({
        mutationFn: async (user) => {
            return axiosSecure.patch(`/user/${user._id}/role`, { role: "admin" });
        },
        onSuccess: (_, user) => {
            Swal.fire({
                title: "Success!",
                text: `${user.email} is now an Admin.`,
                icon: "success",
                showConfirmButton: false,
                timer: 1800,
            });
            refetch();
        },
        onError: (error) => {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
            });
        },
    });

    // Handle typing in search
    const handleSearch = (e) => {
        setEmailQuery(e.target.value);
    };

    // Handle make admin click
    const handleMakeAdmin = (user) => {
        Swal.fire({
            text: `Make ${user.email} an Admin?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, make admin",
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#ef4444",
        }).then((result) => {
            if (result.isConfirmed) {
                makeAdminMutation.mutate(user);
            }
        });
    };
    return (
        <div className="w-full min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header */}
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3 mb-8"
            >
                <ShieldCheck className="text-green-600 w-8 h-8" />
                Admin Management
            </motion.h1>

            {/* Search Box */}
            <div className="relative w-full max-w-2xl mb-8">
                <input
                    type="text"
                    value={emailQuery}
                    onChange={handleSearch}
                    placeholder="Search by user email..."
                    className="w-full px-12 py-4 text-gray-700 rounded-2xl shadow-lg border border-gray-200 bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
                />
                <Search
                    className="absolute left-4 top-4 text-gray-500 transition-all duration-300 group-focus-within:text-green-500"
                    size={22}
                />
                {isFetching && (
                    <div className="absolute right-5 top-4 text-sm text-green-500 animate-pulse">
                        Searching...
                    </div>
                )}
            </div>

            {/* Results */}
            <AnimatePresence>
                {users.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-4xl space-y-4"
                    >
                        {users.map((user) => (
                            <motion.div
                                key={user._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center justify-between bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300"
                            >
                                <div className="flex items-center gap-6">
                                    <img
                                        src={user.photoURL}
                                        alt="user"
                                        className="w-14 h-14 rounded-full border border-gray-200 object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">{user.name}</p>
                                        <p className="text-gray-700 text-sm">{user.email}</p>
                                        <span
                                            className={`text-xs font-medium ${user.role === "admin"
                                                ? "text-green-600"
                                                : "text-gray-500 italic"
                                                }`}
                                        >
                                            {user.role === "admin" ? "Admin" : "User"}
                                        </span>
                                    </div>
                                </div>

                                {user.role !== "admin" && (
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        onClick={() => handleMakeAdmin(user)}
                                        className="flex items-center gap-2 bg-gradient-to-r bg-lightG text-deepG px-3 py-2 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
                                    >
                                        <UserCog size={18} />
                                        <span>Make Admin</span>
                                    </motion.button>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {emailQuery && !isFetching && users.length === 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-500 mt-10"
                    >
                        No user found for "<span className="font-semibold">{emailQuery}</span>"
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MakeAdmin;

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { PropagateLoader } from 'react-spinners';
import { FaUpload } from "react-icons/fa";
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';

const Register = () => {
    const { createUser, setUserDataLoading, updateUserProfile } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const axiosInstance = useAxios();

    // for image upload field
    const [preview, setPreview] = useState(null);
    const [imageLink, setImageLink] = useState("");

    const location = useLocation();
    const from = location?.state || "/";
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors }, reset, control } = useForm();
    const onSubmit = data => {
        setLoading(true);
        const displayName = data.name;
        const email = data.email;
        const password = data.password;
        const photoURL = imageLink;
        const profileInfo = {displayName, photoURL};
        const userInfo = {email, displayName, photoURL, role: "user", createdAt: new Date().toISOString(), lastLogIn: new Date().toISOString()};


        // sign up user
        createUser(email, password)
            .then(async (res) => {
                if (res.user.email) {
                    // update user profile info in databse
                    await axiosInstance.post("/user", userInfo);
                    
                    // update user profile info in firebase
                    updateUserProfile(profileInfo)
                    .then(()=> {
                        
                    }).catch(err => console.log(err))
                    
                    // user created notification
                    Swal.fire({
                        text: "User Created Successfully ....!",
                        icon: "success"
                    });

                    reset();
                    setLoading(false);
                    setUserDataLoading(false);
                    navigate(from);
                }
            }).catch(err => {
                Swal.fire({
                    text: `${err.message}`,
                    icon: "error"
                });
                setLoading(false);
                setUserDataLoading(false);
            })
    }

    // handle image upload in Image BB
    const handleImgUpload = async (e, field) => {
        const file = e.target.files[0];
        if (file) {
            field.onChange([file]);
            setPreview(URL.createObjectURL(file));
            const formData = new FormData();
            formData.append("image", file);
            
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE__image_upload_key}`, formData)
            setImageLink(res.data.data.url);
        }
    }
    return (
        <div className="flex-1 flex items-center justify-center bg-white px-6 md:px-16">
            <div className="w-full max-w-md">

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-deepG">
                    Create an Account
                </h2>
                <p className="text-gray-500 mb-6 text-sm font-bold md:text-base">
                    Register with Profast
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Name field */}
                    <input
                        type='text'
                        name='name'
                        placeholder="Your Name"
                        className="input input-bordered w-full"
                        {...register("name", { required: "Name is required" })}
                    />
                    {
                        errors.email?.type === "required" && <>
                            <p className='text-red-600 text-sm'>Name is required</p>
                        </>
                    }

                    {/* Email field */}
                    <input
                        type="email"
                        name='email'
                        placeholder="Email"
                        className="input input-bordered w-full"
                        {...register("email", { required: "Email Address is required" })}
                    />
                    {
                        errors.email?.type === "required" && <>
                            <p className='text-red-600 text-sm'>Email is required</p>
                        </>
                    }

                    {/* Password field */}
                    <input
                        type="password"
                        placeholder="Password"
                        name='password'
                        className="input input-bordered w-full"
                        {...register("password", { required: true, minLength: 6, })}
                    />
                    {
                        errors.password?.type === "required" && <>
                            <p className='text-red-600 text-sm'>Password is required</p>
                        </>
                    }
                    {
                        errors.password?.type === "minLength" && <>
                            <p className='text-red-600 text-sm'>Password must be 6 characters or longer</p>
                        </>
                    }

                    {/* image upload section */}

                    <div>
                        <Controller
                            name="profileImage"
                            control={control}
                            rules={{
                                required: "Profile image is required",
                                validate: {
                                    validType: (fileList) => {
                                        const file = fileList?.[0];
                                        const validExtensions = ["image/jpeg", "image/png", "image/webp"];
                                        return (
                                            file && validExtensions.includes(file.type) ||
                                            "Only .jpg, .jpeg, .png, or .webp files are allowed"
                                        );
                                    },
                                },
                            }}
                            render={({ field }) => (
                                <div
                                    className="relative border-2 border-dashed border-deepG/26 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-base-300 transition duration-200"
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const file = e.dataTransfer.files[0];
                                        if (file) {
                                            field.onChange([file]);
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                    onClick={() => document.getElementById("fileInput").click()}
                                >
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Upload-Img-Preview"
                                            className="w-24 h-24 object-cover rounded-full border-2 border-deepG mb-2"
                                        />
                                    ) : (
                                        <>
                                            <FaUpload className="text-3xl text-deepG mb-2" />
                                            <p className="text-sm text-gray-500">Click or drag to upload image</p>
                                        </>
                                    )}
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.webp"
                                        className="hidden"
                                        onChange={(e) => handleImgUpload(e, field)}
                                    />
                                </div>
                            )}
                        />
                        {errors.profileImage && (
                            <p className="text-red-600 text-sm mt-1">{errors.profileImage.message}</p>
                        )}
                    </div>

                    {/* registration form submit form  */}
                    {loading ? <div className='text-center mb-12'><PropagateLoader color='#03373D' /></div>
                        : <button
                            type="submit"
                            className="btn w-full bg-lightG font-bold text-deepG"
                        >
                            Create Account
                        </button>}


                    {/* login page link */}
                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-deepG font-bold hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
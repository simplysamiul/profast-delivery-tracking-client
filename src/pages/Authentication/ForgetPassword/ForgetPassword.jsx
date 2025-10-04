import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

const ForgetPassword = () => {
    // use context
    const { resetPass, setUserDataLoading } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setLoading(true);
        const email = data.email;
        console.log(email)
        resetPass(email)
            .then(() => {
                setUserDataLoading(false)
                // console.log(res)
                console.log("send password link")
                // if (res.user.email) {
                //     Swal.fire({
                //         text: "User Login Successfully ....!",
                //         icon: "success"
                //     });
                //     reset();
                //     setLoading(false);
                //     setUserDataLoading(false);
                // }
            }).catch(err => {
                // Swal.fire({
                //     text: `${err.message}`,
                //     icon: "error"
                // });
                console.log(err)
                setLoading(false);
                setUserDataLoading(false);
            })
    };

    return (
        <div className="flex-1 flex items-center justify-center bg-white px-6 md:px-16">
            <div className="w-full max-w-md">

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-deepG">
                    Forgot Password
                </h2>
                <p className="text-gray-500 mb-6 text-sm font-bold md:text-base">
                    Enter your email address and we’ll send you a reset link.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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


                    {loading ? <div className='text-center mb-12'><PropagateLoader color='#03373D' /></div>
                        : <>
                            <button
                                type="submit"
                                className="btn w-full bg-lightG font-bold text-deepG"
                            >
                                Send
                            </button>

                            <p className="text-sm text-center text-gray-600">
                                Remember your password?{" "}
                                <Link to="/login" className="text-deepG font-bold hover:underline">
                                    Login
                                </Link>
                            </p>
                        </>}
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { PropagateLoader } from 'react-spinners';

const Register = () => {
    const { createUser, setUserDataLoading } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        setLoading(true);
        const email = data.email;
        const password = data.password;
        createUser(email, password)
            .then(res => {
                if (res.user.email) {
                    Swal.fire({
                        text: "User Created Successfully ....!",
                        icon: "success"
                    });
                    reset();
                    setLoading(false);
                    setUserDataLoading(false);
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
                    <div className="text-start">
                        <Link
                            to="/"
                            className="text-sm text-deepG font-bold hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                   {loading ? <div className='text-center mb-12'><PropagateLoader color='#03373D' /></div>
                   : <button
                        type="submit"
                        className="btn w-full bg-lightG font-bold text-deepG"
                    >
                        Create Account
                    </button>}

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
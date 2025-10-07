import Lottie from 'lottie-react';
import googleIconAnimation from '../../../assets/lottie/Google-Logo.json';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { PropagateLoader } from 'react-spinners';

const Login = () => {
    // use context
    const { signInUser, googleLogIn, setUserDataLoading } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    
    const location = useLocation();
    const from = location?.state || "/";
    const navigate = useNavigate();

    // react hook form
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        setLoading(true);
        const email = data.email;
        const password = data.password;
        signInUser(email, password)
            .then(res => {
                if (res.user.email) {
                    Swal.fire({
                        text: "User Login Successfully ....!",
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
    };

    //  goole login
    const handleGoolgeLogin = () => {
        setLoading(true);
        googleLogIn()
            .then(res => {
                if (res.user.email) {
                    Swal.fire({
                        text: "User Login Successfully ....!",
                        icon: "success"
                    });
                    reset();
                    setLoading(false);
                    navigate(from);
                }
            }).catch(err => {
                Swal.fire({
                    text: `${err.message}`,
                    icon: "error"
                });
                setLoading(false);
            })
    }
    return (
        <div className="flex-1 flex items-center justify-center bg-white px-6 md:px-16">
            <div className="w-full max-w-md">

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-deepG">
                    Welcome Back
                </h2>
                <p className="text-gray-500 mb-6 text-sm font-bold md:text-base">
                    Login with Profast
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
                            to="/forgetPassword"
                            className="text-sm text-deepG font-bold hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>


                    {loading ? <div className='text-center mb-12'><PropagateLoader color='#03373D' /></div>
                        : <>
                            <button
                                type="submit"
                                className="btn w-full bg-lightG font-bold text-deepG"
                            >
                                Login
                            </button>

                            <p className="text-sm text-center text-gray-600">
                                Don’t have any account?{" "}
                                <Link to="/register" className="text-deepG font-bold hover:underline">
                                    Create Account
                                </Link>
                            </p>
                        </>}

                    <div className="divider">Or</div>

                    {loading ?  <div className='text-center mb-12'><PropagateLoader color='#03373D' /></div>
                    :<button
                        type="button"
                        className="btn w-full border border-gray-300 bg-white hover:bg-gray-100 flex"
                        onClick={handleGoolgeLogin}
                    >
                        <Lottie className='w-[80px]' animationData={googleIconAnimation} />
                        Login with Google
                    </button>}
                </form>
            </div>
        </div>
    );
};

export default Login;
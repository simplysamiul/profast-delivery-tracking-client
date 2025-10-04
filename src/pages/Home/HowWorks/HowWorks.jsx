import bookingImg from '../../../assets/bookingIcon.png';
import cashOnDelivery from '../../../assets/tiny-deliveryman.png';
import Deliveryhub from '../../../assets/customer-top.png';
import bookingSME from '../../../assets/safe-delivery.png';

const HowWorks = () => {
    return (
        <div className='mb-10'>
            <h2 className='text-3xl font-extrabold text-deepG mt-6 mb-10'>How it Works</h2>
            {/* work process list */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-10 mx-6 md:12 lg:mx-18 items-center'>
        
                <div className='mx-8 mb-10'>
                    <img className='w-[60px] mx-auto' src={bookingImg} alt="Booking-Img" />
                    <h3 className='font-bold text-deepG text-xl my-4'>Booking Pick & Drop</h3>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>

                <div className='mx-8 mb-10'>
                    <img className='w-[120px] mx-auto' src={cashOnDelivery} alt="Booking-Img" />
                    <h3 className='font-bold text-deepG text-xl my-4'>Cash On Delivery</h3>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>

                <div className='mx-8 mb-10'>
                    <img className='w-[120px] mx-auto' src={Deliveryhub} alt="Booking-Img" />
                    <h3 className='font-bold text-deepG text-xl my-4'>Delivery Hub</h3>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>

                <div className='mx-8 mb-10'>
                    <img className='w-[60px] mx-auto' src={bookingSME} alt="Booking-Img" />
                    <h3 className='font-bold text-deepG text-xl my-4'>Booking SME & Corporate</h3>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>



            </div>
        </div>
    );
};

export default HowWorks;
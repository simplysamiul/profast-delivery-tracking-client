import parcelTracking from '../../../assets/live-tracking.png';
import callCenter from '../../../assets/safe-delivery.png';

const HomeFeatures = () => {
    return (
        <div>

            <div className='flex flex-col md:flex-row items-center justify-between gap-4 p-6 mb-6'>
                <img className='' src={parcelTracking} alt="" />
                <div className='border-r-1 border-dashed border-r-deepG h-[130px] mx-10 hidden md:block'></div>
                <div>
                    <h3 className='text-center md:text-start font-extrabold text-deepG text-2xl mb-4'>Live Parcel Tracking</h3>
                    <p className='mr-2 text-center md:text-start'>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                </div>
            </div>
            
            <div className='flex flex-col md:flex-row items-center justify-between gap-4 p-6 mb-6'>
                <img className='w-[196px]' src={callCenter} alt="" />
                <div className='border-r-1 border-dashed border-r-deepG h-[130px] mx-10 hidden md:block'></div>
                <div>
                    <h3 className='text-center md:text-start font-extrabold text-deepG text-2xl mb-4'>100% Safe Delivery</h3>
                    <p className='mr-2 text-center md:text-start'>We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
                </div>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between gap-4 p-6 mb-6'>
                <img className='' src={callCenter} alt="" />
                <div className='border-r-1 border-dashed border-r-deepG h-[130px] mx-10 hidden md:block'></div>
                <div>
                    <h3 className='text-center md:text-start font-extrabold text-deepG text-2xl mb-4'>100% Safe Delivery</h3>
                    <p className='mr-2 text-center md:text-start'>We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
                </div>
            </div>
        </div> 
    );
};

export default HomeFeatures;
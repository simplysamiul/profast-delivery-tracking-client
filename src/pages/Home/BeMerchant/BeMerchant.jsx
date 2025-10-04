import locationImg from '../../../assets/location-merchant.png';

const BeMerchant = () => {
    return (
        <div>
            <div className='bg-deepG text-white flex justify-between gap-4 px-12 py-16 rounded-2xl bg-[url(assets/be-a-merchant-bg.png)] bg-no-repeat'>
                <div className='flex flex-col justify-evenly mt-4 w-1/2'>
                    <h2 className='font-bold text-4xl'>Merchant and Customer Satisfaction is Our First Priority</h2>
                    <p className='text-gray-300'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <div className='flex items-center space-x-4'>
                        <button className='btn rounded-full bg-lightG text-black font-bold border-none'>Become a Merchant</button>
                        <button className='btn rounded-full btn-outline border-lightG text-lightG font-bold hover:bg-lightG hover:text-black'>Earn with Profast Courier</button>
                    </div>
                </div>
                <div className='w-1/2'>
                    <img className='w-full' src={locationImg} alt="Location-Img" />
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;
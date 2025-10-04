import customerSayImg from '../../../assets/customer-top.png';

const CustomerSay = () => {
    return (
        <div className='mt-20 mb-20'>
            <img className='mx-auto w-[140px] md:w-[200px] lg:w-[300px]' src={customerSayImg} alt="Customer-To-Img" />
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-extrabold text-deepG text-center mt-8 mb-10'>What our customers are sayings</h2>
            <p className='w-full md:2/3 lg:w-1/2 mx-auto text-center'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
        </div>
    );
};

export default CustomerSay;
import React from 'react';

const HomeFaq = () => {
    return (
        <div>
            <div className=''>
                <h2 className='text-xl md:text-3xl lg:text-4xl font-extrabold mb-6 text-deepG text-center'>Frequently Asked Question (FAQ)</h2>
                <p className='text-center w-1/2 mx-auto mb-6'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>

                {/* faq question */}

                <div className='my-16'>
                    <div className="collapse collapse-arrow border border-deepG bg-green-100 mb-6">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title font-semibold">How does this posture corrector work?</div>
                        <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
                    </div>
                    <div className="collapse collapse-arrow border border-deepG bg-green-100 mb-6">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">Is it suitable for all ages and body types?</div>
                        <div className="collapse-content text-sm">Yes, our parcel tracking website is designed to be user-friendly and accessible for all ages. The interface is simple, clear, and mobile-friendly, so anyone—from young students waiting for online orders to seniors tracking important deliveries—can easily use it. Since it’s a digital service, it is not dependent on body type or physical ability; anyone with internet access can track their parcels conveniently.</div>
                    </div>
                    <div className="collapse collapse-arrow border border-deepG bg-green-100 mb-6">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">Does it really help with back pain and posture improvement?</div>
                        <div className="collapse-content text-sm">Our parcel tracking service isn’t related to health or posture improvement. However, it does help reduce the stress and inconvenience of waiting for packages by giving you real-time updates. Instead of worrying or constantly checking with the courier, you can relax knowing exactly where your parcel is and when it will arrive.</div>
                    </div>
                    <div className="collapse collapse-arrow border border-deepG bg-green-100 mb-6">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">Does it have smart features like vibration alerts?</div>
                        <div className="collapse-content text-sm">Our parcel tracking system doesn’t include physical features like vibration alerts. Instead, it provides smart digital notifications such as email or SMS updates. You’ll get instant alerts when your parcel is shipped, in transit, or out for delivery—so you’re always informed in real time.</div>
                    </div>
                    <div className="collapse collapse-arrow border border-deepG bg-green-100 mb-6">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">How will I be notified when the product is back in stock?</div>
                        <div className="collapse-content text-sm">You’ll be notified through real-time alerts. Once the product is back in stock, our system will automatically send you an email or SMS notification (depending on your chosen preference) so you can place your order right away without missing the chance.</div>
                    </div>
                <div className='text-center'>
                    <button className='bg-lightG rounded-2xl text-black font-bold btn'>See More FAQ’s</button>
                </div>
                </div>
            </div>


        </div>
    );
};

export default HomeFaq;
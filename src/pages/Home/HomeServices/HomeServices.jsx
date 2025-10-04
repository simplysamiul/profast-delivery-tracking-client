import serviceImg from '../../../assets/service.png'

const HomeServices = () => {
    const services = [
        {   
            id:1,
            title: "Express & Standard Delivery",
            desc: "Fast and reliable delivery solutions, whether you need express or standard options.",
            highlight: false,
        },
        {   
            id:2,
            title: "Nationwide Delivery",
            desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
            highlight: true, // highlighted card
        },
        {   
            id:3,
            title: "Fulfillment Solution",
            desc: "Our full-service solutions let you manage your inventory, packing, and delivery hassle-free.",
            highlight: false,
        },
        {   
            id:4,
            title: "Cash on Home Delivery",
            desc: "With our cash-on-delivery option, it’s flexible with maximum customer satisfaction guaranteed.",
            highlight: false,
        },
        {   
            id:5,
            title: "Corporate Service / Contract in Logistics",
            desc: "Custom logistics contracts for corporate needs ensuring efficiency and reliability.",
            highlight: false,
        },
        {   
            id:6,
            title: "Parcel Return",
            desc: "We manage your parcel return with ease and efficiency, making customer support stress-free.",
            highlight: false,
        },
    ];
    return (
        <section className="bg-deepG rounded-2xl py-12 px-4 md:px-12">
            <div className="max-w-7xl mx-auto text-center">
                {/* Header */}
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Our Services
                </h2>
                <p className="text-gray-200 mt-2 max-w-2xl mx-auto text-sm md:text-base">
                    Explore fast, reliable parcel delivery solutions nationwide. From
                    express shipments to corporate logistics, we’ve got you covered with
                    services designed to make your business smoother.
                </p>

                {/* Services Grid */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="rounded-2xl shadow-md py-10 px-6 transition-transform hover:scale-105 text-center bg-white 
                            hover:bg-lightG duration-500"
                        >
                            {/* Placeholder icon */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src={serviceImg}
                                    alt="service-icon"
                                    className="w-12 h-12"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-deepG ">
                                {service.title}
                            </h3>
                            <p className="text-black text-sm mt-2">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeServices;
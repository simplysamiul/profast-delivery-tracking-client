import Marquee from "react-fast-marquee";
import company1 from "../../../assets/brands/amazon.png";
import company2 from "../../../assets/brands/casio.png";
import company3 from "../../../assets/brands/moonstar.png";
import company4 from "../../../assets/brands/randstad.png";
import company5 from "../../../assets/brands/start-people 1.png";
import company6 from "../../../assets/brands/start.png";

const SalesTeam = () => {
    return (
        <div className="mt-12 mb-16 border-dashed border-b-1 border-deepG pb-12 ">
            <h2 className="text-center text-2xl mb-8 font-bold text-deepG">We've helped thousands of sales teams</h2>
            <Marquee autoFill={true} pauseOnHover={true}>
                <img className="mx-10" src={company1} alt="" />
                <img className="mx-10" src={company2} alt="" />
                <img className="mx-10" src={company3} alt="" />
                <img className="mx-10" src={company4} alt="" />
                <img className="mx-10" src={company5} alt="" />
                <img className="mx-10" src={company6} alt="" />
            </Marquee>
        </div>
    );
};

export default SalesTeam;
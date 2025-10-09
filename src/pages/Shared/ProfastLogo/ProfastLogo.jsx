import { Link } from 'react-router-dom';
import profastLogo from '../../../assets/logo.png';

const ProfastLogo = () => {
    return (
                <div className='flex items-end'>
                    <img className=' w-[20px] md:w-full mb-2' src={profastLogo} alt="Profast-Logo" />
                    <h4 className='xl md:text-2xl lg:text-3xl font-extrabold -ml-2 lg:-ml-3'>Profast</h4>
                </div>
    );
};

export default ProfastLogo;
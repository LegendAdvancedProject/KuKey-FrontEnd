import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  return (
    <header className="bg-[#217446] px-[15px] py-[16px] flex w-full justify-between text-white">
      <span className='text-[20px] font-[800]'>KuKey</span>
      <button type="button" className="" onClick={handleAdminClick}>
        <FontAwesomeIcon icon="user" size="2x"/>
      </button>
    </header>
  );
};

export default Header;

import { useNavigate } from 'react-router-dom';
type NavigationBarProps = {
  selected: 'space' | 'key';
  setSelected: React.Dispatch<React.SetStateAction<'space' | 'key'>>;
};

const AdminNavigationBar = ({ selected, setSelected }: NavigationBarProps) => {
  const navigate = useNavigate();

  return (
    <div className="mx-[16px] flex">
      <button
        type="button"
        className={`flex-1 py-[11px] text-center text-[16px] font-[600] ${
          selected === 'space'
            ? 'border-b-2 border-[#217446] text-[#217446]'
            : 'border-b-2 border-[#E7E7E7] text-[#6C7072]'
        }`}
        onClick={() => {
          setSelected('space');
          navigate('/admin');
        }}
      >
        개방관리
      </button>

      <button
        type="button"
        className={`flex-1 py-[11px] text-center text-[16px] font-[600] ${
          selected === 'key'
            ? 'border-b-2 border-[#217446] text-[#217446]'
            : 'border-b-2 border-[#E7E7E7] text-[#6C7072]'
        }`}
        onClick={() => setSelected('key')}
      >
        키관리
      </button>
    </div>
  );
};

export default AdminNavigationBar;

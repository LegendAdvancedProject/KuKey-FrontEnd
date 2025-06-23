import { useNavigate } from 'react-router';

type Header2Props = {
  headerContent: string;
};

const Header2 = ({ headerContent }: Header2Props) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#217446] px-[16px] py-[13px]">
      <div className="relative flex items-center">
        <button type="button" onClick={() => navigate(-1)}>
          <img src="/back-arrow.svg" alt="뒤로가기" />
        </button>

        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] font-[700] text-white">
          {headerContent}
        </span>
      </div>
    </header>
  );
};

export default Header2;

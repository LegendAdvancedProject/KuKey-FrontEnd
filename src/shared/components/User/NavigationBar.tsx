type NavigationBarProps = {
  selected: 'space' | 'reserve';
  setSelected: React.Dispatch<React.SetStateAction<'space' | 'reserve'>>;
};

const NavigationBar = ({ selected, setSelected }: NavigationBarProps) => {
  return (
    <div className="mx-[16px] flex">
      <button
        type="button"
        className={`flex-1 py-[11px] text-center text-[16px] font-[600] ${
          selected === 'space'
            ? 'border-b-2 border-[#217446] text-[#217446]'
            : 'border-b-2 border-[#E7E7E7] text-[#6C7072]'
        }`}
        onClick={() => setSelected('space')}
      >
        개방조회
      </button>

      <button
        type="button"
        className={`flex-1 py-[11px] text-center text-[16px] font-[600] ${
          selected === 'reserve'
            ? 'border-b-2 border-[#217446] text-[#217446]'
            : 'border-b-2 border-[#E7E7E7] text-[#6C7072]'
        }`}
        onClick={() => setSelected('reserve')}
      >
        시설예약
      </button>
    </div>
  );
};

export default NavigationBar;

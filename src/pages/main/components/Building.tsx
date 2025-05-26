type BuildingProps = {
  buildingName: string;
};

const Building = ({ buildingName }: BuildingProps) => {
  return <div className="mt-[20px] flex gap-[10px] text-[22px] font-[700]">{buildingName}</div>;
};

export default Building;

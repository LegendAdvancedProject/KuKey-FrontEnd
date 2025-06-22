type BuildingProps = {
  buildingName: string;
};

const Building = ({ buildingName }: BuildingProps) => {
  return <div className="text-[16px] font-[600] mb-[17px] mt-[10px]">{buildingName}</div>;
};

export default Building;

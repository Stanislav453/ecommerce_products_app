type CoverProps = {
  percentage: number;
};

export const Cover = ({ percentage }: CoverProps) => {
  return (
    <div
      style={{ width: `${percentage}%`, maxWidth: "100px" }}
      className="bg-white h-full overflow-hidden mix-blend-color absolute top-0 right-0"
    ></div>
  );
};

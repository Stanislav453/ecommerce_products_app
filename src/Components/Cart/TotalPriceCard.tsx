type TotalPriceCardProps = {
  subTotal: number;
};

const TotalPriceCard = ({ subTotal }: TotalPriceCardProps) => {
  return (
    <div className=" sticky bottom-0 right-0 z-50 w-full px-4 py-8 bg-white">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Subtotal</h2>
        <p className="text-2xl font-semibold text-gray-600">${subTotal}</p>
      </div>
      <p className="my-3">Shipping and discounts calculated at checkout.</p>
    </div>
  );
};

export default TotalPriceCard;

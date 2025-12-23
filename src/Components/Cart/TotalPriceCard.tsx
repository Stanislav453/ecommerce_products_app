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
      <div className="flex  gap-4">
        <button className=" text-xl border-2 border-black p-2 rounded-xl">
          View my cart
        </button>
        <button className=" text-xl text-white p-2 border-2 rounded-xl bg-black">
          Go to checkout
        </button>
      </div>
    </div>
  );
};

export default TotalPriceCard;

import CoinChart from "../Components/CoinChart";
import Info from "../Components/Info";

const Coin = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <Info />
          <div className="w-full md:w-7/12">
            <CoinChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;

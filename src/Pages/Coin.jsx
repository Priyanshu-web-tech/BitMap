import CoinChart from "../Components/CoinChart";
import Info from "../Components/Info";

const Coin = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white container mx-auto px-4 flex-wrap">
      <Info />
      <CoinChart />
    </div>
  );
};

export default Coin;

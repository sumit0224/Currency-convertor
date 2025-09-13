import { useState } from "react";
import InputBox from "./components/InputBox.jsx";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Ensure we pass the base currency in uppercase (API returns uppercase keys)
  const currencyInfo = useCurrencyInfo(from.toUpperCase());

  // Guard against undefined (hook may return {} initially)
  const options = currencyInfo && Object.keys(currencyInfo).length > 0 ? Object.keys(currencyInfo) : [];

  const swap = () => {
    // swap selected currencies
    setFrom(to);
    setTo(from);

    // swap amounts so UI remains consistent
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    const targetKey = to.toUpperCase();
    const numericAmount = parseFloat(amount) || 0;

    // safety check: ensure rate exists
    if (!currencyInfo || typeof currencyInfo[targetKey] === "undefined") {
      // Optionally show error / toast to user
      setConvertedAmount(0);
      return;
    }

    // price is relative to base (from) — multiply
    setConvertedAmount(numericAmount * currencyInfo[targetKey]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency.toLowerCase())} // keep state in lowercase like "usd"
                selectCurrency={from}
                onAmountChange={(val) => setAmount(val)}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency.toLowerCase())}
                selectCurrency={to}
                amountDisable={true}
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    // FreeCurrencyAPI endpoint (base is always USD unless you add &base_currency=XXX)
    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_WrcZ8sec3PoCLtEgFeQrEMe9OpqAMg4bp3jrJqBN&base_currency=${currency}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data); // response comes under "data"
      })
      .catch((err) => console.error("API Error:", err));
  }, [currency]);

  return data;
}

export default useCurrencyInfo;

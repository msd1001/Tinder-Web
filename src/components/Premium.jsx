import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  //
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    // POST
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true },
    );

    console.log("order====>", order);
    // Above post call is returning some response, api is made in backend in payment.js file

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount: amount,
      currency: currency,
      name: "pkmb.net",
      description: "Test Transaction",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      // jb payment box open hogga and payment successful huva then only below method will be called
      handler: verifyPremiumUser,
    };

    // It should open the Razor pay Dialog box

    // Razorpay is coming from script which is attached in the index.html
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return !isUserPremium ? (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - chat with other People</li>
            <li> - 100 connection request per day</li>
            <li> - Blue Tick</li>
            <li> - 3 month Validity</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className=" btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - chat with other People</li>
            <li> - 1000 connection request per day</li>
            <li> - Blue Tick</li>
            <li> - 6 month Validity</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-secondary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  ) : (
    "You are already a Premium user"
  );
};

export default Premium;

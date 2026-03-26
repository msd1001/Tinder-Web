import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

function Requests() {
  //
  const requests = useSelector((store) => store.requests);
  console.log("requests=====>", requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No request found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className=" text-bold text-3xl">Request Received</h1>

      {requests?.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          about,
          skills,
          age,
          gender,
        } = request.fromUserId;
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 boarder bg-base-300 rounded-lg w-2/3 mx-auto"
          >
            <div>
              {" "}
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + "" + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-active btn-primary bg-sky-800 mx-2">
                Reject
              </button>
              <button className="btn btn-active btn-secondary bg-pink-400 mx-2">
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests;

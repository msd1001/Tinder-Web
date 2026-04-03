import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  /// Here i am unable to use store and update data in the store as compared to akshay so i used the useState hook
  // const connections = useSelector((store) => store.connections);
  ///
  // console.log(connections);

  const [friends, setFriend] = useState();

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // console.log("error===>", res?.data?.data);
      dispatch(addConnections(res?.data?.data));
      setFriend(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // if (!connections) return null;

  if (friends?.length === 0) return <h1> No Connections found </h1>;

  // console.log(friends);

  return (
    <div className="text-center my-10">
      <h1 className=" text-bold text-3xl">Connections</h1>

      {friends?.map((friend) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          about,
          skills,
          age,
          gender,
        } = friend;
        return (
          <div
            key={_id}
            className=" flex m-4 p-4 boarder bg-base-300 rounded-lg w-1/2 mx-auto"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [emailId, setEmailId] = useState("Madhuresh@gmail.com");
  const [password, setPassword] = useState("Madhuresh@123");
  const [Error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }, // part2- for setting token inside cookie pass withCredentials field set to true
      );
      // console.log(res);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      // console.log(err?.response);
      setError(err?.response?.data || "Something Went Wrong");
    }
  };

  return (
    <div className=" flex justify-center my-10">
      <div className="card   bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          <div>
            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text"> Email ID </span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Password </span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{Error} </p>
          <div className="card-actions justify-center m-2 ">
            <button
              className="btn btn-primary bg-blue-700 w-20"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

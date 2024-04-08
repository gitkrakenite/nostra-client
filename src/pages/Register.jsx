import React, { useEffect, useState } from "react";
import logo from "../assets/chlogo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import axios from "../axios";

const Register = () => {
  const [seePass, setSeePass] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (navigator.onLine) {
      console.log("online");
    } else {
      toast.error("Network Error");
    }

    if (isError) {
      // toast.error("Please Check Login Details");
      toast.error("Please Check Network");
    }

    if (isSuccess || user) {
      // toast.success("Welcome to chilltons!");
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (!username) {
      return toast.error("Please enter username", { theme: "dark" });
    }
    if (!password || !phone) {
      return toast.error("Either password or phone missing");
    }

    try {
      setLoading(true);

      // check whether username already exists
      const nameToCheck = { username };
      const { data } = await axios.post("/users/check", nameToCheck);
      if (data == "not exist") {
        // alert("proceed");
        const userData = { username, phone, password };
        dispatch(register(userData));
        setLoading(false);
        return;
      } else {
        toast.error(`username ${username} exists.`);
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error creating account. Contact admin");
    }
  };
  return (
    <div>
      {/* topbar */}
      <div className=" w-full h-full top-0  text-white px-[10px] sm:px-[1em] md:px-[3em] lg:px-[4em] xl:px-[5em]  ">
        <div className="flex justify-between items-center">
          {/* logo */}
          <div>
            <Link to="/">
              <img src={logo} alt="" className="w-20 h-20" />
            </Link>
          </div>
        </div>
      </div>
      <h2 className="text-center mb-[2em] mt-[1em] font-bold">
        Please Create An Account
      </h2>
      <form
        className=" w-[98%] sm:w-[80%]  md:w-[60%] xl:w-[50%]  2xl:w-[40%] m-auto"
        onSubmit={handleCreateAccount}
      >
        <div className="flex flex-col gap-[10px] mb-[22px]">
          <label htmlFor="username" className="font-bold text-zinc-500">
            Create a username. No spaces
          </label>
          <input
            type="text"
            id="username"
            placeholder="username i.e lucythegreat"
            className="bg-transparent border border-zinc-400 p-[8px] rounded-md outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[10px] mb-[22px]">
          <label htmlFor="phone" className="font-bold text-zinc-500">
            Enter Your Phone Number
          </label>
          <input
            type="text"
            id="phone"
            placeholder="Phone i.e 0xxx xxxxxx"
            className="bg-transparent border border-zinc-400 p-[8px] rounded-md outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="flex flex-col gap-[10px] mb-[22px] flex-[0.98]">
            <label htmlFor="password" className="font-bold text-zinc-500">
              Create A Strong Password
            </label>
            <input
              type={seePass ? "text" : "password"}
              id="password"
              placeholder="create password"
              className="bg-transparent border border-zinc-400 p-[8px] rounded-md outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex-[0.02]">
            {seePass ? (
              <AiOutlineEyeInvisible
                className="text-2xl cursor-pointer"
                onClick={() => setSeePass(false)}
              />
            ) : (
              <AiOutlineEye
                className="text-2xl cursor-pointer"
                onClick={() => setSeePass(true)}
              />
            )}
          </div>
        </div>

        <div>
          {loading ? (
            <Spinner message="setting up ..." />
          ) : (
            <button
              className="bg-red-800 text-white p-[10px] w-full rounded-md outline-none"
              onClick={handleCreateAccount}
            >
              Create Account
            </button>
          )}
        </div>
      </form>
      <div className="mt-[2em] w-full flex justify-center gap-[3em] flex-wrap">
        <Link to="/login" className="underline">
          <p>Sign in ?</p>
        </Link>
        <div className="underline">
          <a href="tel:+254 798 556471">Call Us O798 556471</a>
        </div>
      </div>
    </div>
  );
};

export default Register;

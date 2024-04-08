import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SendUs = () => {
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in");
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  const [items, setItems] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    let username = user.username;

    if (!items) return toast.error("Items cannot be added");
    if (!location) return toast.error("Delivery location cannot be added");
    if (!phone) return toast.error("We need your phone number");

    let dataToSend = { username, items, location, phone };

    try {
      setLoading(true);
      const response = await axios.post("/send-us/create", dataToSend);
      if (response) {
        setLoading(false);
        navigate("/home");
        toast.success("Received. We will call you shortly");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed To send. Contact Admin");
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className=" px-[10px] sm:px-[2em] md:px-[3em] pt-[1em]">
        {/* topbar */}
        <div>
          <Link to="/home">
            <AiOutlineArrowLeft className="text-2xl" />
          </Link>
          <h2 className="font-bold mb-1 mt-5">
            Hello there. We will get it for you
          </h2>
          <h2 className="">We will bring it at your doorstep</h2>
        </div>
        {/*  */}
        <div className="mt-[2em]">
          <form
            className=" w-[98%] sm:w-[85%]  md:w-[75%] xl:w-[60%] 2xl:w-[50%] m-auto"
            onSubmit={handleCreate}
          >
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <label htmlFor="message">
                <p className="font-bold mb-2">
                  Simply Enter All The Grocery Items You Need and how much
                </p>
              </label>

              <textarea
                name="message"
                id="message"
                cols="30"
                rows="4"
                placeholder="tell us what you want delivered"
                className="border border-zinc-700 rounded-lg p-[8px] bg-transparent"
                value={items}
                onChange={(e) => setItems(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col gap-[15px] mb-[20px]">
              <label htmlFor="location">
                <p>Specific Location to deliver.</p>
              </label>
              <input
                type="text"
                id="location"
                placeholder="Example: Heri house number A5, 2nd floor"
                className="border border-zinc-700 rounded-lg p-[8px] bg-transparent w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[15px]">
              <label htmlFor="phone">
                <p>Your phone number.</p>
              </label>
              <input
                type="text"
                id="phone"
                placeholder="0xx xxxx xxx"
                className="border border-zinc-700 rounded-lg p-[8px] bg-transparent w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {loading ? (
              <Spinner message="sending ..." />
            ) : (
              <button
                className="mt-[15px] bg-red-800 w-full p-3 rounded-lg text-white"
                onClick={handleCreate}
              >
                Send Us
              </button>
            )}
          </form>
          {/* pricing */}
          <div className="mt-[1em]">
            <h2 className="my-[15px] font-bold">Pricing</h2>
            <p>Total Shopping + Ksh. 50 delivery fee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendUs;

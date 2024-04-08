import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import Spinner from "../components/Spinner";
import { MdOutlineContentCopy } from "react-icons/md";
import { logout } from "../features/auth/authSlice";

const Feedback = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  //handle create feedback
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!category || !message) {
      return toast.error("Either category or message missing");
    }
    if (!user) {
      return toast.error("You must be a signed in user");
    }

    // check whether username exists in DB
    let username = user?.username;
    const nameToCheck = { username };
    const { data } = await axios.post("/users/check", nameToCheck);
    if (data == "not exist") {
      setLoading(false);
      handleLogout();
      toast.warning("Please sign in again");
      return;
    } else {
      try {
        setLoading(true);
        let sender = user.username;
        const dataToSend = { sender, category, message };
        const response = await axios.post("/feedback/create", dataToSend);
        if (response) {
          setLoading(false);
          navigate("/home");
          toast.success("Feedback sent");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Failed to send");
      }
    }
  };

  // working on modal
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // what happens when we click on a post
  const handlePostClick = () => {
    setIsPopUpOpen(true);
  };

  useEffect(() => {
    handlePostClick();
  }, []);

  const textRef = useRef(null);

  const handleCopy = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      // You can also display a success message or perform any other action after copying.
      toast.success("Copied To Clipboard");
    }
  };

  const PopUpPage = ({ onClose }) => {
    return (
      <div className="pop-up-page prompt">
        {/* data */}
        <div className="pop-up-content">
          <div className=" ">
            {/* share url */}
            <div>
              <p className="text-center mb-[10px]">
                <span className="text-2xl">😀</span>Welcome
              </p>
            </div>
            <h2 className="mb-[10px] text-center">
              Copy And Help Spread The Word
            </h2>
            <div className="flex justify-center gap-[20px]  ">
              <input
                type="text"
                ref={textRef}
                value={`https://chilltons-client.web.app/`}
                readOnly
                className="bg-transparent outline-none text-zinc-600"
              />
              <button onClick={handleCopy}>
                <MdOutlineContentCopy
                  className="text-3xl text-red-600"
                  title="Click To Copy"
                />
              </button>
            </div>
            {/*  */}
            <div className="mt-[1.6em] w-full flex justify-center">
              <button onClick={onClose} className="" id="roundedBg">
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* wrapper */}
      <div className="px-[10px] sm:px-[1em] md:px-[2em] lg:px-[4em] xl:px-[5em] pt-[2em]">
        {/* topbar */}
        <div>
          <Link to="/home">
            <AiOutlineArrowLeft className="text-3xl" />
          </Link>
        </div>
        {/*  */}
        <div>
          <h2 className="mt-2">
            Hello {user.username} we appreciate your feedback
          </h2>
          <div className="mt-[2em]">
            <form
              className=" w-[98%] sm:w-[80%]  md:w-[70%]  lg:w-[60%] xl:w-[50%] m-auto"
              onSubmit={handleCreate}
            >
              <div className="flex flex-col gap-[10px] mb-[20px]">
                <label htmlFor="category">
                  What best describes your feedback ?
                </label>
                <select
                  name="category"
                  id="category"
                  className="p-2 border border-zinc-400 rounded-md"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose</option>
                  <option value="complement">Complement</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="complaint">Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-[10px] mb-[20px]">
                <label htmlFor="message">We'd like to here more from you</label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="2"
                  placeholder="enter your message"
                  className="p-2 border border-zinc-400 rounded-md"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  maxLength={100}
                  minLength={5}
                ></textarea>
              </div>
              <div>
                {loading ? (
                  <div>
                    <Spinner message="Sending..." />
                  </div>
                ) : (
                  <button
                    className="bg-red-600 text-white rounded-md p-2 w-full"
                    onClick={handleCreate}
                  >
                    Send Now
                  </button>
                )}
              </div>
            </form>
            {/* whatsapp */}
            <div className="text-center underline mt-[20px]">
              <a href="https://chat.whatsapp.com/KnAhKCJMhfZ6iXuq3Kl63j">
                Join Our Group
              </a>
            </div>
          </div>
        </div>
        {/* pop up screen */}
        {isPopUpOpen && (
          <div className="pop-up-overlay">
            <PopUpPage onClose={() => setIsPopUpOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;

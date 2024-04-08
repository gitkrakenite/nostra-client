import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Spinner from "../components/Spinner";
import { logout } from "../features/auth/authSlice";
import { CiDeliveryTruck, CiLocationOn } from "react-icons/ci";
import Receive from "../assets/receiv.gif";
import Package from "../assets/pack.png";
import Delivered from "../assets/deliv.gif";
import Shipping from "../assets/ship1.gif";
import Reject from "../assets/reject.png";
import imageCompression from "browser-image-compression";

const Profile = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleFetchOrders = async () => {
    try {
      setLoading(true);
      let token = user?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let username = user.username;
      let dataToSend = { username };
      const response = await axios.post("/orders/mine", dataToSend, config);
      if (response) {
        setLoading(false);
        setMyOrders(response.data);
        console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching orders", { theme: "dark" });
    }
  };

  useEffect(() => {
    handleFetchOrders();
  }, []);

  const getCurrentTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    setPhone(user?.phone);
    setUsername(user?.username);
    setProfile(user?.profile);
  }, []);

  // upload photot to cloudinary
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const postProfile = async (pic) => {
    if (pic === null || undefined) {
      toast.error("Please select photo");
      return;
    }

    // Compress the image
    const options = {
      maxSizeMB: 1, // Adjust the maximum size of the compressed image
      maxWidthOrHeight: 1920, // Adjust the maximum width or height of the compressed image
      useWebWorker: true, // Use Web Worker for better performance
    };

    try {
      setLoadingPhoto(true);
      const compressedFile = await imageCompression(pic, options);
      const data = new FormData();
      data.append("file", compressedFile);
      data.append("upload_preset", "p2jnu3t2");
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/ddqs3ukux/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setLoadingPhoto(false);
      setProfile(urlData.url);
      toast.success("Uploaded Profile", { theme: "dark" });
    } catch (error) {
      setLoadingPhoto(false);
      toast.error("Error uploading Profile", { theme: "dark" });
    }
  };

  const [loadProfile, setLoadProfile] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!username) return toast.error("Username missing", { theme: "dark" });
    if (!profile) return toast.error("Profile missing", { theme: "dark" });
    if (!phone) return toast.error("Phone missing", { theme: "dark" });

    try {
      if (password) {
        setLoadProfile(true);
        let token = user?.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        let dataToSend = { username, phone, profile, password };
        let userId = user?._id;
        // Make the PUT request to update the user's location
        let response = await axios.put(`/users/${userId}`, dataToSend, config);
        if (response) {
          setLoadProfile(false);
          toast.success("Details updated", { theme: "dark" });
          await handleLogout();
        }
      } else {
        setLoadProfile(true);
        let token = user?.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        let dataToSend = { username, phone, profile };
        let userId = user?._id;
        // Make the PUT request to update the user's location
        let response = await axios.put(`/users/${userId}`, dataToSend, config);
        if (response) {
          setLoadProfile(false);
          toast.success("Details updated", { theme: "dark" });
          await handleLogout();
        }
      }
    } catch (error) {
      toast.error("Failed to update");
      setLoadProfile(false);
      console.log(error);
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className=" pt-[1em] px-[10px] sm:px-[2em] md:px-[3em] lg:px-[5em]">
        {/* topbar */}
        <div className="flex justify-between items-center">
          <div>
            <Link to="/home">
              <AiOutlineArrowLeft className="text-2xl" />
            </Link>
          </div>
          <div onClick={handleLogout}>
            <p className="font-bold text-pink-500 cursor-pointer">LOGOUT</p>
          </div>
        </div>

        <div className="py-[2em] flex justify-center items-center ">
          <div>
            <div className="flex justify-center mb-4">
              <img
                src={
                  user?.profile ||
                  "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
                alt=""
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
            </div>
            <h2>
              {getCurrentTime()} {user?.username}
            </h2>
          </div>
        </div>

        <form
          className=" sm:w-[70%]  lg:w-[50%] xl:w-[30%] m-auto"
          onSubmit={handleUpdateProfile}
        >
          <div className="flex flex-col gap-4 mb-4">
            <label
              htmlFor="username"
              className="text-zinc-500 text-lg font-semibold"
            >
              Change Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="new username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent p-1 border border-pink-500 rounded-lg outline-none"
            />
          </div>
          {/* phone number */}
          <div className="flex flex-col gap-4 mb-4">
            <label
              htmlFor="phone"
              className="text-zinc-500 text-lg font-semibold"
            >
              Change Phone
            </label>
            <input
              type="text"
              id="phone"
              placeholder="new phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent p-1 border border-pink-500 rounded-lg outline-none"
            />
          </div>
          {/* password change */}
          <div className="flex flex-col gap-4 mb-4">
            <label
              htmlFor="password"
              className="text-zinc-500 text-lg font-semibold"
            >
              Change Password
            </label>
            <input
              type="text"
              id="password"
              placeholder="new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent p-1 border border-pink-500 rounded-lg outline-none"
            />
          </div>

          {/* upload image */}
          <div className="flex flex-col items-start gap-[20px] sm:gap-0 sm:flex-row sm:items-center mt-[20px] mb-[20px]  px-[5px] rounded-lg">
            <div className="flex flex-col gap-2 mt-[20px]">
              <label
                htmlFor="mainPhoto"
                className="flex items-center gap-[20px] flex-wrap"
              >
                <p>Update Profile</p>
                <div className="flex flex-col items-center">
                  {loadingPhoto ? (
                    <Spinner message="uploading ..." />
                  ) : (
                    <img
                      src={
                        profile
                          ? profile
                          : "https://pixel-share-25.netlify.app/assets/preview-35b286f0.png"
                      }
                      alt=""
                      className="w-[100px] h-[100px] object-cover rounded-lg"
                    />
                  )}
                </div>
              </label>
              <input
                type="file"
                placeholder="Add Image"
                accept="image/*"
                onChange={(e) => postProfile(e.target.files[0])}
                required
                id="mainPhoto"
                className="hidden"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            {loadProfile ? (
              <div>
                <p>✋ Updating ...</p>
              </div>
            ) : (
              <button
                onClick={handleUpdateProfile}
                className="bg-pink-500 px-4 py-2 text-white rounded-lg"
              >
                update profile
              </button>
            )}
          </div>
        </form>

        {loading ? (
          <div className=" flex justify-center items-center">
            <Spinner message="Fetching your orders" />
          </div>
        ) : (
          <div>
            <h2 className="my-[2em] font-bold">Your Previous Orders</h2>
            <div>
              {myOrders?.length < 1 ? (
                <div className=" flex justify-center items-center">
                  <p className="text-center">
                    You haven't created an order recently
                  </p>
                </div>
              ) : (
                <>
                  {myOrders?.map((item) => (
                    <div key={item._id} className="pb-[30px] ">
                      {/* topdata */}
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center ">
                          <div className="flex items-center gap-4 mb-8">
                            <div>
                              <CiLocationOn className="text-2xl text-pink-500" />
                            </div>
                            <div>
                              <p className="text-zinc-500 text-lg font-semibold">
                                {item.location}
                              </p>
                              <p>{item.moreInfo}</p>
                            </div>
                          </div>

                          <div className="flex gap-5 my-5 items-center">
                            <CiDeliveryTruck className="text-3xl text-pink-500" />
                            <p>${item.deliveryFee}</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-center">
                          <div>
                            {item.progress === "shipping" && (
                              <img
                                src={Shipping}
                                alt=""
                                className="h-[50px] object-contain"
                              />
                            )}
                          </div>

                          <p>{item.progress}</p>
                        </div>
                      </div>

                      <div className="pb-5">
                        <p className="my-[1em] text-4xl text-zinc-500 font-bold">
                          Products
                        </p>
                        {item?.product?.map((del) => (
                          <div key={del._id} className="pb-[20px] ">
                            <div className="flex justify-between gap-[20px] mb-[5px] items-center">
                              <p className="mb-[5px] font-bold text-xl">
                                {del.title}
                              </p>
                              <p>#{del.vendor}</p>
                            </div>

                            <div className="flex gap-4 items-center flex-wrap">
                              <img
                                src={del.fPhoto}
                                alt=""
                                className="h-[100px] rounded-md object-contain mb-[5px]"
                              />
                              <img
                                src={del.sPhoto}
                                alt=""
                                className="h-[100px]  rounded-md  object-contain mb-[5px]"
                              />
                              <img
                                src={del.tPhoto}
                                alt=""
                                className="h-[100px] rounded-md object-contain mb-[5px]"
                              />
                            </div>

                            <div className="flex gap-4 items-center">
                              <div className="flex items-center gap-2 my-2">
                                <div
                                  className="h-[10px] w-[10px] rounded-full"
                                  style={{ backgroundColor: del.selectedColor }}
                                />
                                <p>{del.selectedColor}</p>
                              </div>
                              <p>Size : {del.selectedSize}</p>
                            </div>

                            <div className="flex gap-[20px] items-center ">
                              <p>Amount : {del.newQuantity}pcs</p>
                              <p>Total : ${del.newPrice}</p>
                            </div>
                            {/* total cost */}
                            <div>
                              <p className="text-end py-5">
                                Total Cost + Delivery:{" "}
                                <span className="text-pink-500 font-semibold">
                                  $ {del.newPrice + item.deliveryFee}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="text-orange-600 text-sm">
                        {moment(item.createdAt).fromNow()}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

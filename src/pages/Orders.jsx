import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Spinner from "../components/Spinner";
import { logout } from "../features/auth/authSlice";

const Orders = () => {
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
    // check whether username exist in DB
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
        try {
          setLoading(true);
          let username = user.username;
          let dataToSend = { username };
          const response = await axios.post("/orders/mine", dataToSend);
          if (response) {
            setLoading(false);
            setMyOrders(response.data);
            // console.log(response.data);
          }
        } catch (error) {
          setLoading(false);
          toast.error("Error Fetching orders");
        }
      } catch (error) {
        toast.error("Error Fetching orders");
      }
    }
  };

  useEffect(() => {
    handleFetchOrders();
  }, []);
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
          <div>
            <Link to="/receipts">
              <p className="font-bold">RECEIPTS</p>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="h-[70vh] w-full flex justify-center items-center">
            <Spinner message="Fetching your orders" />
          </div>
        ) : (
          <div>
            <h2 className="my-[2em] font-bold">Your Previous Orders</h2>
            <div>
              {myOrders?.length < 1 ? (
                <div className="h-[70vh] w-full flex justify-center items-center">
                  <p className="text-center">
                    You haven't created an order recently
                  </p>
                </div>
              ) : (
                <>
                  {myOrders?.map((item) => (
                    <div key={item._id} className="mb-[30px] bg-zinc-200">
                      {/* items ordered */}
                      <div className="mb-5">
                        {item?.product?.map((del) => (
                          <div key={del._id} className="mb-[20px] ">
                            <div className="flex gap-[20px] mb-[5px]">
                              <p>Vendor : {del.vendor}</p>
                              <p>Category : {del.category}</p>
                            </div>
                            <p className="mb-[5px] font-bold">{del.title}</p>
                            <img
                              src={del.image}
                              alt=""
                              className="h-[50px] object-contain mb-[5px]"
                            />
                            <div className="flex gap-[20px] items-center ">
                              <p>{del.newQuantity}pcs</p>
                              <p>Ksh. {del.newPrice}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* user details */}
                      <div>
                        {/* <p>{item.newPhone}</p> */}
                        <div className="flex gap-[20px] flex-wrap items-center justify-between">
                          <p>{item.location}</p>
                          <p>{item.progress}</p>
                        </div>
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

export default Orders;

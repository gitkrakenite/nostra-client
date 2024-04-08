import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const MyApps = () => {
  const MyApps = [
    {
      id: 1,
      title: "Jirani",
      description:
        "Jirani is the app to connect you to local services and products.",
      extraDesc:
        "Find your local mama fua, get more biz by signing up in our app",
      link: "https://youtube.com",
      developer: "https://johnportfolio-f8b30.web.app/",
      image:
        "https://www.pexels.com/photo/close-up-photo-of-two-people-doing-handshake-5439460/",
    },
  ];

  return (
    <div>
      {/* wrapper */}
      <div className="flex gap-[10px] overflow-x-scroll w-full prompt pb-2">
        <div className="flex flex-nowrap">
          {MyApps?.map((item) => (
            <div key={item.id} className="flex-shrink-0 mr-[15px]">
              <div className="relative rounded-lg group ">
                <div className="overlay absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div
                    className="bg-gradient-to-t
                                  from-transparent to-black opacity-75 w-full h-full rounded-md"
                  >
                    {/* top stats */}
                    <div>
                      <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                        <div>
                          <a href={item.link}>
                            <AiOutlineArrowRight className="text-2xl text-white hover:text-orange-200" />
                          </a>
                        </div>
                        <div className="flex gap-[20px]">
                          <a href={item.developer}>
                            <AiOutlineArrowRight className="text-2xl text-white hover:text-orange-200" />
                          </a>
                        </div>
                      </div>
                      <div className="absolute top-[80px] left-3">
                        <p className="text-white">{item.title}</p>
                      </div>
                    </div>
                    {/*  */}
                    <div className="absolute bottom-[20px] left-[20px]  flex gap-[10%] w-full ">
                      <div>
                        <div className="flex gap-[10px] text-zinc-300">
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <img
                  src={item.image}
                  alt=""
                  className="w-72 h-80 rounded-md object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyApps;

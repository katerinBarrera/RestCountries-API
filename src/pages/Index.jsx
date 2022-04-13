import React from "react";
import Countries from "./Countries";
import world from "../images/world.svg";

const Index = () => {
  return (
    <div className="bg-gradient-to-r from-[#A0B5EB] to-[#C9F0E4]">
      <div className="bg-white p-4 shadow-sm border-b-4 flex items-stretch place-content-center ">
        <img src={world} className="w-[180px] " alt="header" />
        <span className="text-4xl font-black self-center ml-10">
          REST COUNTRIES API
        </span>
      </div>
      <div className="flex justify-center place-content-center">
        <Countries />
      </div>
    </div>
  );
};

export default Index;

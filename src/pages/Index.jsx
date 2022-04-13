import React from "react";
import Countries from "./Countries";

const Index = () => {
  return (
    <div>
      <div className="bg-gray-300"> REST COUNTRIES API</div>
      <div className="flex justify-center place-content-center">
        <Countries />
      </div>
    </div>
  );
};

export default Index;

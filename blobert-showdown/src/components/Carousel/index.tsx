import React from 'react';
import { Carousel } from "flowbite-react";

import { useDojo } from "../../dojo/useDojo";
import { BlobberCard } from "./BlobberCard";
// {account ? account.account.address : ""}
export const BlobberSel = () => {

  const {account} = useDojo();

  return (
    <div className="h-80 flex flex-col bg-orange-900/80 border rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(/assets/library.png)`,
        backgroundSize: "100%",
        backgroundBlendMode: "normal",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat"
      }} 
    >
      <div className="text-white flex justify-center items-center
      pt-2 px-2 m-0
      ">
        {account && account?.list().length >0 ? "Select a Registered Blobber to Fight For U!":""}
      </div>
      {account && account?.list().length >0 ? 
      
      <Carousel className="
      px-16
      " slide={false}>

        {/* Burner Cards */}
        {account?.list().map((account, index) => {
          return(
          <div className="flex justify-center items-center">
            <BlobberCard burnerAddress={
              account ? account.address : ""} 
            />
          </div>
          );
        })}
        
      </Carousel>
      :
        <div className="flex justify-center items-center
        text-white font-semibold h-full
        ">
          ~ Summon A Blobber to Train your Bloberts ~
        </div> 
      }
    
    </div>
  );
}

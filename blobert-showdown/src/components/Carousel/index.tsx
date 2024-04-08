import React from 'react';
import { Carousel } from "flowbite-react";

import { useDojo } from "../../dojo/useDojo";
import { BlobberCard } from "./BlobberCard";

// {account ? account.account.address : ""}
export const BlobberSel = () => {

  const {account} = useDojo();
  
  return (
    <div className="h-[350px] flex flex-col bg-orange-900/80 border border-gray-400 rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(/assets/library.png)`,
        backgroundSize: "100%",
        backgroundBlendMode: "normal",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat"
      }} 
    >
      <div className="text-white flex flex-col justify-center items-center
      pt-4 px-2 m-0
      ">
        {/* <span>{account && account?.list().length >0 ? `Select a Registered Blobber to Fight For U!`:""}</span> */}
        <span>{account && account?.list().length >0 ?`Your Current Selected Blobber Address is: ${account.account.address}`:""}</span>
      </div>
      {account && account?.list().length >0 ? 
      
      <Carousel className="
      px-16
      " slide={false}>

        {/* Burner Cards */}
        {account?.list().reverse().map((a, index) => {
          return(
          <div className="flex justify-center items-center" key={`blobbercard-${index}`}>
            <BlobberCard 
              accountTarget={a}
              blobbersIndex={index}
              burnerAddress={
              a ? a.address : ""} 
              selected={account.account.address===a.address}
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

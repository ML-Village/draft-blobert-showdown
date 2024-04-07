import React, { useState } from 'react';
import { blobbersPath } from '../../config/constants/blobbers';
import { useDojo } from '../../dojo/useDojo';
import { Button, Modal, Progress } from "flowbite-react";
import { customBlobertArray, customBlobertInfoObject } from '../../config/constants/customBloberts';
import type { CustomFlowbiteTheme } from "flowbite-react";

const customModalTheme: CustomFlowbiteTheme["modal"] = {
  "root": {
    "base": "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    "show": {
      "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
      "off": "hidden"
    },
  },
  "content": {
    "base": "relative h-full w-full p-4 md:h-auto",
    "inner": "bg-orange-200/85 relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
  },
  "body": {
    "base": "flex-1 overflow-auto p-6",
    "popup": "pt-0"
  },
  "header": {
    "base": "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
    "popup": "border-b-0 p-2",
    "title": "text-xl font-medium text-gray-900 dark:text-white",
    "close": {
      "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-700 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      "icon": "h-5 w-5"
    }
  },
}

export const BlobberCard = ({blobbersIndex, burnerAddress, selected} : 
  { 
    blobbersIndex:number, 
    burnerAddress:string,
    selected: boolean
  }
  ) => {
    const {account} = useDojo();
    const [openModal, setOpenModal] = useState(false);
    const [targetSlot, setTargetSlot] = useState(0);
    const [selectedBlobert, setSelectedBlobert] = useState("notblobby");

    const [slotImagePath, setSlotImagePath] = useState({
      0: "/assets/pc.png",
      1: "/assets/pc.png",
      2: "/assets/pc.png",
      3: "/assets/pc.png",
      4: "/assets/pc.png",
      5: "/assets/pc.png",
    });

    const setBlobertToSlot = (blobert: string, slot: number) => {
      //console.log(`Setting ${blobert} to slot ${slot}`);
      setSlotImagePath({
        ...slotImagePath,
        [slot]: customBlobertInfoObject[blobert]?.path
      });
    }

  return (
    <div className={`${selected?"border-2 border-yellow-400":"border border-white"}
        rounded-lg p-4
        bg-orange-200/30 w-[880px]
        flex items-center
        `}>

          {/* profile image */}
          <div className={`
            ${selected? `border-orange-500`:`border-white`}
            mx-2 h-28 w-28 border rounded-lg flex items-center justify-center`}>
            <img className="w-full" src={blobbersPath[blobbersIndex % blobbersPath.length]} alt="..." />
          </div>

          {/* data section */}
          <div className="flex flex-col w-full">

            {/* name input box */}
            <div className="flex mt-2 mx-2">
              <label className="mr-2 flex justify-center items-center text-white">
              Blobber Name</label>
              <input 
              className="flex-grow rounded-lg mx-2"
              type="text" id="blobbername" name="blobbername" maxLength={31}/>
              <button className="border border-white rounded-lg
              px-2 text-white bg-orange-800 hover:bg-orange-600
              ">
                Register Name
              </button>
            </div>

            {/* burner address */}
            <div className="mx-2 my-2 flex items-center text-sm text-white
            ">
              <span>signer: {burnerAddress}</span>
              <button className={`ml-auto p-2 rounded-md
              ${selected?
                `bg-yellow-300/35 border-2 border-orange-500`
                :
              `border-2 border-green-900
              bg-emerald-500 text-black font-semibold
              hover:bg-green-800 hover:text-white`
              }
              `}
              disabled={selected}
              onClick={()=>account.select(burnerAddress)}
              >
                {selected?`Blobber Selected`:`Use This Blobber`}
              </button>

            </div>

            {/* blobert lineup */}
            <div className="flex mb-2 mx-2 items-center justify-between">
              <div className="flex grid-cols-6 gap-1 justify-between w-full mx-1 px-1">

                <img className="h-20 border rounded-lg" src="/assets/pc.png" />
                <img className="h-20 border rounded-lg" src="/assets/pc.png" />
                <img className="h-20 border rounded-lg" src="/assets/pc.png" />
                <img className="h-20 border rounded-lg" src="/assets/pc.png" />
                <img className="h-20 border rounded-lg" src="/assets/pc.png" />
                <img className="h-20 border rounded-lg" src="/assets/pc.png" />
              </div>
              

              {/* configure lineup */}
              <button className="bg-orange-300 ml-auto shrink
                px-2 py-2 border rounded-lg text-wrap text-sm
                "
                onClick={() => setOpenModal(true)}

                >Configure Blobert Line-up</button>
            </div>

          </div>
          
          <Modal 
            theme={customModalTheme}
            dismissible 
            show={openModal} 
            position="top-center"
            size="7xl" 
            onClose={() => setOpenModal(false)}
            popup
            >
            <Modal.Header>
              <div className="mx-2 px-4 py-2">Choose Your Blobbery Blob Blob</div>
              </Modal.Header>

            <Modal.Body>

              <div className="flex flex-col">

                  <div className="flex ">

                      {/* blob list panel */}
                      <div className="border-2 border-orange-950 rounded-xl
                      grid grid-cols-8
                      w-2/3 overflow-auto
                      ">
                        {customBlobertArray.map((blobert, index) => {
                          return (
                            <div className="flex flex-col items-center justify-center
                            mx-2 my-2
                            "
                            key={`blobber-card-${index}`}
                            >
                              <img className={`h-20 rounded-lg
                                cursor-pointer
                              ${selectedBlobert==blobert?`border-8 border-orange-700`: `border`}
                              hover:border-4 hover:border-yellow-400
                              
                              `} 
                              src={customBlobertInfoObject[blobert]?.path} 
                              onClick={()=>{
                                setSelectedBlobert(blobert)
                                setBlobertToSlot(blobert, targetSlot)
                              }}
                              />
                            </div>
                          )
                        })}
                      </div>

                      {/* feature panel */}
                      <div className="flex-grow mx-2 
                      flex flex-col items-center
                      border-2 border-orange-900 rounded-xl">

                        {/* Blobert Name */}
                        <div className="my-4 text-2xl font-semibold text-orange-900">
                          {selectedBlobert.toUpperCase()}</div>
                        
                        {/* Blobert Image */}
                        <div className="my-2">
                          <img className="h-28 rounded-lg border-2 border-gray-800" src={customBlobertInfoObject[selectedBlobert]?.path} />
                        </div>


                        {/* Stats */}
                        <div className="my-2 flex flex-col items-center justify-center w-full 
                        text-xs text-orange-900">
                          
                          {/* HP */}
                          <div className="w-full flex items-center pl-6">
                            <span className="mx-4 w-12">HP</span>
                            <span className="flex-grow h-full pt-1">
                              <Progress progress={255/255*100} color="lime" />
                            </span>
                            <span className="w-10 ml-1">255</span>
                          </div>

                          {/* ATK */}
                          <div className="w-full flex items-center pl-6">
                            <span className="mx-4 w-12">Attack</span>
                            <span className="flex-grow h-full pt-1">
                            <Progress progress={180/255*100} color="yellow" />
                            </span>
                            <span className="w-10 ml-1">180</span>
                          </div>

                          {/* DEF */}
                          <div className="w-full flex items-center pl-6">
                            <span className="mx-4 w-12">Defense</span>
                            <span className="flex-grow h-full pt-1">
                            <Progress progress={160/255*100} color="teal" />
                            </span>
                            <span className="w-10 ml-1">255</span>
                            </div>
                          
                          {/* SPC ATk */}
                          <div className="w-full flex items-center pl-6">
                            <span className="mx-4 w-12">Spc Atk</span>
                            <span className="flex-grow h-full pt-1">
                            <Progress progress={160/255*100} color="pink" />
                            </span>
                            <span className="w-10 ml-1">255</span>
                          </div>

                          {/* SPC Def */}
                          <div className="w-full flex items-center pl-6">
                            <span className="mx-4 w-12">Spc Def</span>
                            <span className="flex-grow h-full pt-1">
                            <Progress progress={160/255*100} color="blue" />
                            </span>
                            <span className="w-10 ml-1">255</span>
                          </div>

                          {/* SPE */}
                          <div className="w-full flex items-center pl-6">
                            <span className="mx-4 w-12">Speed</span>
                            <span className="flex-grow h-full pt-1">
                            <Progress progress={160/255*100} color="purple" />
                            </span>
                            <span className="w-10 ml-1">255</span>
                          </div>
                        </div>

                        {/* Move Box */}
                        <div className="w-full items-center justify-center
                        p-2
                        grid grid-cols-2 grid-rows-2 gap-1
                        ">
                          {/* 4 move buttons using array */}
                          {
                            Array(4).fill(0).map((_, index) => {
                              return (
                                <div className="bg-amber-800 border
                                rounded-lg text-white font-semibold px-4 py-2
                                flex justify-center items-center cursor-pointer
                                "
                                >Move {index+1}</div>
                              )
                            })
                          }
                        </div>


                      </div>
                  </div>

                  {/* lineup box */}
                  <div className="flex flex-col justify-center items-center w-full">
                        <span className="w-full px-4 py-2">Select a slot then pick a Blobert for that slot.</span>
                        {/* Container for Lineup */}
                        <div className="flex mb-2 mx-2 items-center justify-between">
                          <div className="flex grid-cols-6 gap-1 justify-between w-full mx-1 px-1">
                            {
                              Array(6).fill(0).map((_, index) => {
                                return (
                                  <img className={`${targetSlot==index?`border-4 border-orange-700`: `border`} 
                                  h-20 rounded-lg cursor-pointer`} src={slotImagePath[index]} 
                                  onClick={()=>{setTargetSlot(index)}}
                                  />
                                )
                              })
                            }
                            
                          </div>
                          

                          {/* configure lineup */}
                          <button className="
                          ml-auto shrink
                            px-2 py-2 border rounded-lg 
                            text-white text-wrap text-sm font-semibold
                            bg-red-700 hover:bg-red-300 hover:text-orange-900 
                            hover:border-orange-900 hover:border-2
                            "
                            onClick={()=>{}}
                            >Confirm LineUp</button>
                        </div>
                    
                      
                  </div>

              </div>
            </Modal.Body>
{/* 
            <Modal.Footer>
              
            </Modal.Footer> */}
          </Modal>

      </div>
  )
}

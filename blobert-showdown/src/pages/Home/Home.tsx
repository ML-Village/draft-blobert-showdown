import { useEffect, useState } from "react";
import { useDojo } from "../../dojo/useDojo";
import { BlobbyNavbar, BlobberSel } from "../../components/index";
import { Spinner } from "flowbite-react";

import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard, MdHistoryEdu, MdLiveTv  } from "react-icons/md";
import { FaUserNinja } from "react-icons/fa";
import { GiBattleGear } from "react-icons/gi";

const Home = () => {
    const {
        account,
    } = useDojo();

    return (
        <div className="h-full bg-gray-800">  
        
            <BlobbyNavbar/>

            <div className="w-[1080px] mx-auto px-8 
            flex flex-col
            ">
                {/* create burner/clear burner */}
                <div className="flex py-2 text-orange-950">

                    <div className="">
                        {account?.isDeploying ? 
                        <div className="w-full flex items-center justify-center">
                            <Spinner size="lg" 
                            color="failure" aria-label="Summoning Blobber" />
                        </div>
                        :
                        <button className={`
                        ${account?.count >=4 ? 'bg-orange-900':'bg-orange-300'} 
                        ${account?.count >=4 ? 'text-white':'text-orange-950'} 
                        border-2 border-orange-950
                        font-semibold
                        px-2 py-2 rounded-lg w-full`}
                        onClick={account?.create}
                        disabled={account?.count >=4}
                        > 
                        {account?.count >=4 ? "U alredi hab so many Blobbers ser.": "Summon A Blobber"}</button>
                        }
                    </div>

                    <button className="bg-orange-300 
                        border-2 border-orange-950
                        font-semibold mx-2
                        px-2 py-2 rounded-lg w-30"
                    
                    onClick={() => account.clear()}
                    >
                        
                        Kick All Blobbers</button>
                    
                    <span className="flex items-center justify-end
                    font-semibold mx-2 px-2 text-white
                    ">
                        {`Summoned Blobbers: ${account.count}/4`}
                    </span>

                </div>
                
                {/* carousel of blobbers */}
                <BlobberSel/>

                {/* Blobberlists and Battles */}
                <div className="border border-white rounded-lg 
                mt-4
                h-[80vh]
                ">
                    
                    <Tabs aria-label="Tabs with underline" style="underline">
                        <Tabs.Item active title="World Blobbers" icon={FaUserNinja}>
                            
                        </Tabs.Item>

                        <Tabs.Item title="Your Showdowns" icon={GiBattleGear}>
                        </Tabs.Item>

                        <Tabs.Item title="Live Showdowns" icon={MdLiveTv}>
                        </Tabs.Item>

                        <Tabs.Item title="Past Showdowns" icon={MdHistoryEdu}>
                        </Tabs.Item>


                    </Tabs>
                </div>

            </div>
        </div>
    );
}

export default Home
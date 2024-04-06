import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useEffect, useState } from "react";
import { Direction } from "./utils";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";

import { BlobberSel } from "./components/index";
import { Spinner } from "flowbite-react";

function App() {
    const {
        account,
    } = useDojo();

    return (
        <div className="h-screen bg-[#000008]">  
        
        
            <div className="w-[1080px] mx-auto px-8 
            flex flex-col
            border border-red-500
            ">

                {/* banner */}
                <div className="flex justify-center items-center mt-7 mb-10
                px-4 py-6 text-white border-2 rounded-xl 
                text-5xl
                ">
                    <span>BLoBerT ShOwDoWn!</span>
                </div>

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

            </div>
        </div>
    );
}

export default App;

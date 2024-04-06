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
        setup: {
            systemCalls: { spawn, move },
            clientComponents: { Position, Moves },
        },
        account,
    } = useDojo();

    const [clipboardStatus, setClipboardStatus] = useState({
        message: "",
        isError: false,
    });

    // entity id we are syncing
    const entityId = getEntityIdFromKeys([
        BigInt(account?.account.address),
    ]) as Entity;

    // get current component values
    const position = useComponentValue(Position, entityId);
    const moves = useComponentValue(Moves, entityId);

    const handleRestoreBurners = async () => {
        try {
            await account?.applyFromClipboard();
            setClipboardStatus({
                message: "Burners restored successfully!",
                isError: false,
            });
        } catch (error) {
            setClipboardStatus({
                message: `Failed to restore burners from clipboard`,
                isError: true,
            });
        }
    };

    useEffect(() => {
        if (clipboardStatus.message) {
            const timer = setTimeout(() => {
                setClipboardStatus({ message: "", isError: false });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [clipboardStatus.message]);

    return (
        <>  <div className="container mx-auto px-8 border border-red-500">

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
                    font-semibold ml-auto mr-2 px-2
                    ">
                        {`Summoned Blobbers: ${account.count}/4`}
                    </span>

                </div>
                <BlobberSel/>
            </div>
        </>
    );
}

export default App;

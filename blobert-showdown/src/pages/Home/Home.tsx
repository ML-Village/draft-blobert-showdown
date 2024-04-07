import { useEffect, useState } from "react";
import { useDojo } from "../../dojo/useDojo";
import { BlobbyNavbar, BlobberSel, ShowDownList } from "../../components/index";
import { Spinner } from "flowbite-react";

import { Tabs, Table } from "flowbite-react";
import { MdHistoryEdu, MdLiveTv } from "react-icons/md";
import { FaUserNinja } from "react-icons/fa";
import { GiBattleGear } from "react-icons/gi";
import type { CustomFlowbiteTheme } from "flowbite-react";

const customTableTheme: CustomFlowbiteTheme["table"] = {
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
    shadow:
      "absolute left-0 top-0 -z-10 h-full w-full bg-orange-700 drop-shadow-md dark:bg-black",
    wrapper: "relative",
  },
  body: {
    base: "group/body",
    cell: {
      base: "px-6 py-4",
    },
  },
  head: {
    base: "group/head text-xs uppercase text-gray-300",
    cell: {
      base: "bg-orange-950/50 px-6 py-3",
    },
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 hover:text-black cursor-pointer",
    striped: "text-gray-300 odd:bg-[#605850]/70 even:bg-[#664A44]",
  },
};

const customTabsTheme: CustomFlowbiteTheme["tabs"] = {
  base: "flex flex-col",
  tablist: {
    base: "flex text-center",
    styles: {
      default: "flex-wrap border-b border-gray-200",
      underline: "-mb-px flex-wrap",
      pills:
        "flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400",
      fullWidth:
        "grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400",
    },
    tabitem: {
      base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400",
      styles: {
        default: {
          base: "rounded-t-lg",
          active: {
            on: "bg-gray-100 text-cyan-600",
            off: "text-cyan-500 hover:bg-gray-50 hover:text-gray-600",
          },
        },
        underline: {
          base: "rounded-t-lg",
          active: {
            on: "active rounded-t-lg border-b-4 border-yellow-400 text-yellow-400",
            off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-200",
          },
        },
        pills: {
          base: "",
          active: {
            on: "rounded-lg bg-cyan-600 text-white",
            off: "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white",
          },
        },
        fullWidth: {
          base: "ml-0 flex w-full rounded-none first:ml-0",
          active: {
            on: "active rounded-none bg-gray-100 p-4 text-gray-900 dark:bg-gray-700 dark:text-white",
            off: "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white",
          },
        },
      },
      icon: "mr-2 h-5 w-5",
    },
  },
  tabitemcontainer: {
    base: "",
    styles: {
      default: "",
      underline: "",
      pills: "",
      fullWidth: "",
    },
  },
  tabpanel: "",
};

const Home = () => {
  const { account } = useDojo();

  return (
    <div className="h-full min-h-screen bg-gray-800">
      <BlobbyNavbar />

      <div className="w-[1080px] mx-auto px-8 flex flex-col">
        {/* create burner/clear burner */}
        <div className="flex py-2 text-orange-950">
          <div className="">
            {account?.isDeploying ? (
              <div className="w-full flex items-center justify-center">
                <Spinner
                  size="lg"
                  color="failure"
                  aria-label="Summoning Blobber"
                />
              </div>
            ) : (
              <button
                className={`
                        ${account?.count >= 4 ? "bg-orange-900" : "bg-orange-300"} 
                        ${account?.count >= 4 ? "text-white" : "text-orange-950"} 
                        border-2 border-orange-950
                        font-semibold
                        px-2 py-2 rounded-lg w-full`}
                onClick={account?.create}
                disabled={account?.count >= 4}
              >
                {account?.count >= 4
                  ? "U alredi hab so many Blobbers ser."
                  : "Summon A Blobber"}
              </button>
            )}
          </div>

          <button
            className="bg-orange-300 
                        border-2 border-orange-950
                        font-semibold mx-2
                        px-2 py-2 rounded-lg w-30"
            onClick={() => account.clear()}
          >
            Kick All Blobbers
          </button>

          <span
            className="flex items-center justify-end
                    font-semibold mx-2 px-2 text-white
                    "
          >
            {`Summoned Blobbers: ${account.count}/4`}
          </span>
        </div>

        {/* carousel of blobbers */}
        <BlobberSel />

        {/* Blobberlists and Battles */}
        <div
          className="border border-gray-400 rounded-lg 
                mt-4
                max-h-[72vh] flex flex-col overflow-auto
                "
        >
          <ShowDownList />
        </div>
      </div>
    </div>
  );
};

export default Home;

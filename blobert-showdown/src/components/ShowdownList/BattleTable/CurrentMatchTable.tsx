import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import { BattleTable } from ".";
import { FaUserNinja } from "react-icons/fa";
import { GiBattleGear } from "react-icons/gi";
import { MdHistoryEdu, MdLiveTv } from "react-icons/md";


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
      base: "flex-grow",
      styles: {
        default: "",
        underline: "",
        pills: "",
        fullWidth: "",
      },
    },
    tabpanel: "",
  };

export default function CurrentMatchTable() {
  return (
    <Tabs theme={customTabsTheme} aria-label="Showdowns List" style="underline">
      <Tabs.Item active title="All">
        <div className=" h-80 overflow-y-auto">
          <div className="overflow-x-auto">
            <BattleTable />
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item title="In Progress">
        <div className="h-80 overflow-y-auto">
          <div className="overflow-x-auto">
            <BattleTable />
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item title="Awaiting">
        <div className="h-80 overflow-y-auto">
          <div className="overflow-x-auto">
            <BattleTable />
          </div>
        </div>
      </Tabs.Item>
      <Tabs.Item title="Resolved">
        <div className="h-80 overflow-y-auto">
          <div className="overflow-x-auto">
            <BattleTable />
          </div>
        </div>
      </Tabs.Item>
    </Tabs>
  );
}

import React, { useState } from "react";
import { Table, Modal } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import {
  sampleWorldBlobbers,
  blobbersPath,
  customBlobertArray,
  customBlobertInfoObject,
} from "../../../config/constants";
import CurrentMatchTable from "./CurrentMatchTable";

const customTableTheme: CustomFlowbiteTheme["table"] = {
  root: {
    base: "w-full text-left text-sm text-gray-500",
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

const customModalThem: CustomFlowbiteTheme["modal"] = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
      off: "hidden",
    },
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner:
      "bg-orange-200/95 relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
  body: {
    base: "flex-1 overflow-auto p-6",
    popup: "pt-0",
  },
  header: {
    base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
    popup: "border-b-0 p-2",
    title: "text-xl font-medium text-gray-900 dark:text-white",
    close: {
      base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-700 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      icon: "h-5 w-5",
    },
  },
};

export const BattleTable = () => {
  const [openShowDownModal, setOpenShowDownModal] = useState(false);
  const [selectedBlobber, setSelectedBlobber] = useState({
    // sample blobber
    id: 3,
    name: "Picasso",
    blobber: 4,
    blob1: 13,
    blob2: 14,
    blob3: 15,
    blob4: 16,
    blob5: 17,
    blob6: 18,
    totalGames: 88,
    winRate: "69%",
  });

  return (
    <>
      <Table theme={customTableTheme} hoverable striped className="text-center">
        <Table.Head>
          <Table.HeadCell className="text-left">Blobber Name</Table.HeadCell>

          <Table.HeadCell>Blob1</Table.HeadCell>
          <Table.HeadCell>Blob2</Table.HeadCell>
          <Table.HeadCell>Blob3</Table.HeadCell>
          <Table.HeadCell>Blob4</Table.HeadCell>
          <Table.HeadCell>Blob5</Table.HeadCell>
          <Table.HeadCell>Blob6</Table.HeadCell>

          <Table.HeadCell>Total Games</Table.HeadCell>
          <Table.HeadCell>Win Rate</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {sampleWorldBlobbers.map((blobber, index) => (
            <Table.Row
              key={index}
              onClick={() => {
                setSelectedBlobber(() => blobber);
                setOpenShowDownModal(true);
              }}
            >
              <Table.Cell className="text-left whitespace-nowrap font-medium">
                <div className="flex flex-col items-center justify-center">
                  <img className="h-16" src={blobbersPath[blobber.blobber]} />
                  <span>{blobber.name}</span>
                </div>
              </Table.Cell>

              <Table.Cell>
                <img
                  className="h-14 rounded-md border border-gray-800"
                  src={
                    customBlobertInfoObject[customBlobertArray[blobber.blob1]]
                      ?.path
                  }
                  alt=""
                />
              </Table.Cell>
              <Table.Cell>
                <img
                  className="h-14 rounded-md border border-gray-800"
                  src={
                    customBlobertInfoObject[customBlobertArray[blobber.blob2]]
                      ?.path
                  }
                  alt=""
                />
              </Table.Cell>
              <Table.Cell>
                <img
                  className="h-14 rounded-md border border-gray-800"
                  src={
                    customBlobertInfoObject[customBlobertArray[blobber.blob3]]
                      ?.path
                  }
                  alt=""
                />
              </Table.Cell>
              <Table.Cell>
                <img
                  className="h-14 rounded-md border border-gray-800"
                  src={
                    customBlobertInfoObject[customBlobertArray[blobber.blob4]]
                      ?.path
                  }
                  alt=""
                />
              </Table.Cell>
              <Table.Cell>
                <img
                  className="h-14 rounded-md border border-gray-800"
                  src={
                    customBlobertInfoObject[customBlobertArray[blobber.blob5]]
                      ?.path
                  }
                  alt=""
                />
              </Table.Cell>
              <Table.Cell>
                <img
                  className="h-14 rounded-md border border-gray-800"
                  src={
                    customBlobertInfoObject[customBlobertArray[blobber.blob6]]
                      ?.path
                  }
                  alt=""
                />
              </Table.Cell>

              <Table.Cell className="font-semibold">
                {blobber.totalGames}
              </Table.Cell>
              <Table.Cell className="font-semibold">
                {blobber.winRate}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Modal
        theme={customModalThem}
        dismissible
        position="top-center"
        size="5xl"
        popup
        show={openShowDownModal}
        onClose={() => setOpenShowDownModal(false)}
      >
        <Modal.Header>
          <div className="w-full py-2 px-4 pt-7 text-2xl font-bold">
            {selectedBlobber.name}
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-start">
            {/* blobbers and stats */}
            <div className="w-full flex justify-between items-center">
              {/* blobbers div */}
              <div className="w-fit grid grid-cols-6 gap-2">
                {[
                  selectedBlobber.blob1,
                  selectedBlobber.blob2,
                  selectedBlobber.blob3,
                  selectedBlobber.blob4,
                  selectedBlobber.blob5,
                  selectedBlobber.blob6,
                ].map((blob, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <img
                      className="h-16 rounded-lg border border-gray-800"
                      src={
                        customBlobertInfoObject[customBlobertArray[blob]]?.path
                      }
                    />
                  </div>
                ))}
              </div>

              {/* stats div */}
              <div className="mr-8">
                <div className="flex flex-col items-end justify-center text-xl font-bold text-gray-800">
                  <span>Total Games: {selectedBlobber.totalGames}</span>
                  <span>Win Rate: {selectedBlobber.winRate}</span>
                </div>
              </div>
            </div>

            {/* current matches */}
            <div className="my-4 p-4 w-full h-[400px] border bg-gray-800 border-gray-400 rounded-lg">
              <CurrentMatchTable></CurrentMatchTable>
            </div>

            {/* showdown challenge buttons */}
            <div className="mt-auto w-full flex justify-start items-center text-orange-200 font-medium gap-2">
              <button className="bg-[#664A44] px-4 py-2 rounded-lg hover:bg-orange-700 hover:text-white">
                Challenge Blobber to A ShowDown!
              </button>
              <button className="bg-[#664A44] px-4 py-2 rounded-lg hover:bg-blue-800/50">
                Nvm Me too Sked.
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

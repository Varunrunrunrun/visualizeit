"use client";
import {
  ActiveTeamContext,
  FileListContext,
} from "@/app/_context/FilesListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Archive,
  ArchiveRestore,
  MoreHorizontal,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Header from "./Header";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import NoTableData from "./NoTableData";
import { toast } from "sonner";
import NoSearchData from "./NoSearchData";
import { getCurrentFormattedDateTime, getTimeAgo } from "./SideNav";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
  lastUpdateTime?:any;
  lastUpdatedBy?: string;
}
function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const [searchTerm, setSearchTerm] = useState("");
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();
  useEffect(() => {
    fileList_ && setFileList(fileList_);
    console.log(fileList_);
  }, [fileList_]);

  const convex = useConvex();

  const searchFn = async (value: string) => {
    setSearchTerm(value);
    const result = await convex.query(api.files.searchFiles, {
      searchTerm: value,
    });
    setFileList(result);
  };

  const deleteFile = useMutation(api.files.deleteFile);
  const deleteFileFn = (e: React.MouseEvent<HTMLDivElement>, file: any) => {
    e.stopPropagation();
    file &&
      deleteFile({
        _id: file?._id,
      }).then((resp) => {
        if (resp.status === 200) {
          toast(resp.message);
          getFiles();
        }
      });
  };

  const archiveUpdate = useMutation(api.files.archiveUpdate);
  const archiveUpdateFn = (e: React.MouseEvent<HTMLDivElement>, file: any) => {
    e.stopPropagation();
    file &&
      archiveUpdate({
        _id: file?._id,
        archive: !file.archive,
        lastUpdateTime:getCurrentFormattedDateTime(),
        lastUpdatedBy:user?.email,
      }).then((resp) => {
        if (resp.status === 200) {
          toast(resp.message);
          getFiles();
        }
      });
  };

  const { activeTeam_, setActiveTeam_ } = useContext(ActiveTeamContext);
  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam_?._id,
    });
    console.log(result);
    setFileList_(result);
  };

  //button filters
  const getFileListToDisplayFn = () => {
    if (fileList) {
      if (activeButton === "ALL") {
        return fileList.filter((file: any) => file.archive === false);
      } else if (activeButton === "ARCHIVE") {
        return fileList.filter((file: any) => file.archive === true);
      } else if (activeButton === "CREATED_BY_ME") {
        return fileList.filter(
          (file: any) =>
            file.createdBy === user?.email && file.archive === false
        );
      }
    } else return;
  };
  const buttonGroup = [
    {
      name: "All",
      value: "ALL",
    },
    {
      name: "Archived",
      value: "ARCHIVE",
    },
    {
      name: "Created By Me",
      value: "CREATED_BY_ME",
    },
    // {
    //   name: "Recent",
    //   value:"RECENT",
    // }
  ];

  const [activeButton, setActiveButton] = useState("ALL");

  return (
    <div>
      <Header searchFn={searchFn} />
      <div className="flex sm:justify-start justify-center items-center gap-4 my-4">
        {buttonGroup &&
          fileList &&
          fileList.length > 0 &&
          buttonGroup.map((button) => (
            <div
              key={button.name}
              onClick={() => {
                setActiveButton(button.value);
              }}
              className={`px-4 cursor-pointer py-1 duration-75 rounded-md text-sm ${activeButton === button.value ? "bg-black text-white" : "bg-slate-200 text-black"}`}
            >
              {button.name}
            </div>
          ))}
      </div>
      {getFileListToDisplayFn() && getFileListToDisplayFn().length === 0 ? (
        searchTerm !== "" ? (
          <NoSearchData />
        ) : (
          <NoTableData activeButton={activeButton} />
        )
      ) : (
        <>
          <div className="mt-10  md:flex hidden w-full">
            <div className="overflow-x-auto w-full">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mb-2">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      File Name
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Created
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Created By
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Edited
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Last Edited By
                    </td>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {fileList &&
                    getFileListToDisplayFn().map(
                      (file: FILE, index: number) => (
                        <tr
                          key={index}
                          className="odd:bg-gray-50 cursor-pointer"
                          onClick={() => router.push("/workspace/" + file.teamId + "/" + file._id)}
                        >
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 max-w-[150px] overflow-hidden text-ellipsis">
                            {file.fileName}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {moment(file._creationTime).format("DD MMM YYYY, HH:mm")}{" "}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {file.createdBy}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {/* {moment(file._creationTime).format("DD MMM YYYY")} */}
                            {getTimeAgo(file?.lastUpdateTime)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {file.lastUpdatedBy}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 sticky right-0 bg-white z-10">
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <MoreHorizontal />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  className="gap-3"
                                  onClick={() =>
                                    router.push("/workspace/" + file._id)
                                  }
                                >
                                  <SquareArrowOutUpRight className="w-4 h-4 text-green-400" />
                                  Open File
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-3"
                                  onClick={(e) => archiveUpdateFn(e, file)}
                                >
                                  {!file.archive ? (
                                    <>
                                      <Archive className="h-4 w-4 text-yellow-400" />{" "}
                                      Archive
                                    </>
                                  ) : (
                                    <>
                                      <ArchiveRestore className="h-4 w-4" />{" "}
                                      Unarchive
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-3"
                                  onClick={(e) => deleteFileFn(e, file)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-400" />{" "}
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10 md:hidden flex flex-col w-full gap-4">
            {fileList &&
              getFileListToDisplayFn().map((file: FILE, index: number) => (
                <div key={index} className="w-full h-[160px] border-2 border-black shadow-lg rounded-md relative py-2 px-4">
                  <div className="w-full flex justify-between items-center gap-2 mb-4">
                    <h2 className="text-[22px] max-w-[230px] text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
                      {file?.fileName}
                    </h2>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="gap-3"
                          onClick={() => router.push("/workspace/" + file._id)}
                        >
                          <SquareArrowOutUpRight className="w-4 h-4 text-green-400" />
                          Open File
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-3"
                          onClick={(e) => archiveUpdateFn(e, file)}
                        >
                          {!file.archive ? (
                            <>
                              <Archive className="h-4 w-4 text-yellow-400" />{" "}
                              Archive
                            </>
                          ) : (
                            <>
                              <ArchiveRestore className="h-4 w-4" /> Unarchive
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-3"
                          onClick={(e) => deleteFileFn(e, file)}
                        >
                          <Trash2 className="h-4 w-4 text-red-400" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h2 className="text-[14px] my-[2px] w-full overflow-hidden whitespace-nowrap text-ellipsis"><strong>Created At: </strong>{moment(file?._creationTime).format("DD MMM YYYY, HH:mm")}</h2>
                  <h2 className="text-[14px] my-[2px] w-full overflow-hidden whitespace-nowrap text-ellipsis"><strong>Author: </strong>{file?.createdBy}</h2>
                  <h2 className="text-[14px] my-[2px] w-full overflow-hidden whitespace-nowrap text-ellipsis"><strong>Edited: </strong>{getTimeAgo(file?.lastUpdateTime)}</h2>
                  <h2 className="text-[14px] my-[2px] w-full overflow-hidden whitespace-nowrap text-ellipsis"><strong>Author: </strong>{file?.lastUpdatedBy}</h2>
                  
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default FileList;

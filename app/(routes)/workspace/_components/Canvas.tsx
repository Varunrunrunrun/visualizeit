import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from "../../dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getCurrentFormattedDateTime } from "../../dashboard/_components/SideNav";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
const Canvas = ({
  onSaveTrigger,
  fileId,
  fileData,
  userRole
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
  userRole:boolean;
}) => {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  const { user }: any = useKindeBrowserClient();

  useEffect(() => {
    onSaveTrigger && saveWhiteboard();
  }, [onSaveTrigger]);
  const saveWhiteboard = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoardData),
      lastUpdateTime: getCurrentFormattedDateTime(),
      lastUpdatedBy: user?.email,
    }).then((resp) => console.log(resp));
  };
  return (
    <div style={{ height: "inherit" }} className={`relative`}>
      {userRole && <div className="z-50 absolute top-2 left-2 text-[12px] text-red-400">Members don't have edit access(Please contact Team Admin to get edit access)</div>}
      {fileData && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
          viewModeEnabled={userRole}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
};

export default Canvas;

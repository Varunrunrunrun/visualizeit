"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS, { ToolConstructable } from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from '@editorjs/checklist'
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import Warning from '@editorjs/warning';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';
import { getCurrentFormattedDateTime } from '../../dashboard/_components/SideNav';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const rawDocument={
    "time" : 1550476186479,
    "blocks" : [{
        data:{
            text:'Enter the Title here...',
            level:2
        },
        id:"123",
        type:'header'
    },
    {
        data:{
            level:4
        },
        id:"1234",
        type:'header'
    }],
    "version" : "2.8.1"
}

const Editor = ({onSaveTrigger,fileId,fileData,userRole}:{onSaveTrigger:any,fileId:any,fileData:FILE,userRole:boolean}) => {
  const {user}:any=useKindeBrowserClient();
    const ref=useRef<EditorJS>();
    const updateDocument=useMutation(api.files.updateDocument);
    const [document,setDocument]=useState(rawDocument);
    useEffect(()=>{
        fileData&&initEditor();
    },[fileData]);

    useEffect(()=>{
      console.log("triiger Value:",onSaveTrigger);
      onSaveTrigger&&onSaveDocument();
    },[onSaveTrigger])

    const initEditor=()=>{
        const editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */

            tools:{
                header: {
                    class: Header as unknown as ToolConstructable,
                    shortcut: 'CMD+SHIFT+H',
                    config:{
                        placeholder:'Enter a Header'
                    }
                  },
                  list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                    }
                  },
                  checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                  },
                  paragraph: Paragraph,
                  warning: Warning,
            },
           
            holder: 'editorjs',
            data:fileData?.document?JSON.parse(fileData.document):rawDocument,
            onChange: () => {
                onSaveDocument();
              },
          });
          ref.current=editor;
    }

    const onSaveDocument=()=>{
      if(ref.current)
      {
        ref.current.save().then((outputData) => {
          console.log('Article data: ', outputData);
          updateDocument({
            _id:fileId,
            document:JSON.stringify(outputData),
            lastUpdateTime:getCurrentFormattedDateTime(),
            lastUpdatedBy:user?.email,
          }).then(resp=>{
            
              toast.success('Document Updated!')
            
          },(e)=>{
            toast.error("Server Error!")
          })
        }).catch((error) => {
          console.log('Saving failed: ', error)
        });
      }
    }

    const handleClick = () => {
      userRole && toast.error("Members are not allowed to edit the file.")
    }
  return (
    <div onClick={() => handleClick()}>
        <div  id='editorjs' className={`md:ml-20 ml-2 ${userRole && ' pointer-events-none'} `}></div>
    </div>
  )
}

export default Editor
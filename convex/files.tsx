import {v} from 'convex/values';
import { mutation, query } from './_generated/server';

export const createFile=mutation({
    args:{
        fileName:v.string(),
        teamId:v.string(),
        createdBy:v.string(),
        archive:v.boolean(),
        document:v.string(),
        whiteboard:v.string()
    },
    handler:async(ctx, args) =>{
        const result=await ctx.db.insert('files',args);
        return result;
    },
})

export const getFiles=query({
    args:{
        teamId:v.string()
    },
    handler:async(ctx, args)=> {
        const result=ctx.db.query('files')
        .filter(q=>q.eq(q.field('teamId'),args.teamId))
        .order('desc')
        .collect();

        return result;
    },
})

export const updateDocument=mutation({
    args:{
        _id:v.id('files'),
        document:v.string()
    },
    handler:async(ctx, args) =>{
        const result =await ctx.db.patch(args._id,{document:args.document});
        return result;
    },
})

export const updateWhiteboard=mutation({
    args:{
        _id:v.id('files'),
        whiteboard:v.string()
    },
    handler:async(ctx, args) =>{
        const result =await ctx.db.patch(args._id,{whiteboard:args.whiteboard});
        return result;
    },
})



export const getFileById=query({
    args:{
        _id:v.id('files')
    },
    handler:async(ctx, args)=> {
        const result=await ctx.db.get(args._id);
        return result;
    },
})

export const searchFiles = query({
    args: {
      searchTerm: v.string(),
    },
    handler: async (ctx, args) => {
      const searchTerm = args.searchTerm.toLowerCase();
      const files = await ctx.db.query('files').collect();
  
      const filteredFiles = files.filter(file => {
        return (
          file.fileName.toLowerCase().includes(searchTerm) ||
          file.createdBy.toLowerCase().includes(searchTerm)
        );
      });
  
      return filteredFiles;
    },
  });

  export const deleteFile = mutation({
    args: { _id: v.id("files") },
    handler: async (ctx, args) => {
      const result = await ctx.db.delete(args._id);
      return {status: 200, message: "Deleted Successfully"};
    },
  });

  export const archiveUpdate = mutation({
    args: { _id: v.id("files"), archive: v.boolean() },
    handler: async (ctx, args) => {
      const result = await ctx.db.patch(args._id,{archive: args.archive});
      if(args.archive){
          return {status: 200, message: "Archived Successfully"};
      }
      else{
        return {status: 200, message: "Unarchived Successfully"};
      }
    },
  });
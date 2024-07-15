import {v} from 'convex/values'
import { mutation, query } from './_generated/server'

export const getUser=query({
    args:{
        email:v.string()
    },

    handler:async(ctx, args)=> {
    const result=await ctx.db.query('user')
    .filter((q)=>q.eq(q.field('email'),args.email))
    .collect() 

    return result;
    },
})

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});
  

export const createUser=mutation({
    args:{
        firstName:v.optional(v.string()),
        lastName:v.optional(v.string()),
        email:v.string(),
        image:v.string()
    },
    handler:async(ctx, args)=> {
       return await ctx.db.insert("user",args);
    },
})

export const updateUser=mutation({
    args:{
        id:v.id('user'),
        firstName:v.optional(v.string()),
        lastName:v.optional(v.string()),
        email:v.optional(v.string()),
        image:v.optional(v.string())
    },
    handler:async(ctx, args)=> {
       return await ctx.db.patch(args.id,args);
    },
})
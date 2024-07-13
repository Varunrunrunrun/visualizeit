import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeam = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db.query("teams").collect();

    const filteredResult = result.filter((team: any) => {
      // Check if createdBy matches the provided email
      if (team.createdBy === args.email) {
        return true;
      }

      // Check if the email exists in the members array
      if (team.members && Array.isArray(team.members)) {
        const memberWithEmail = team.members.find(
          (member: any) => member.email === args.email
        );
        if (memberWithEmail) {
          return true;
        }
      }

      return false;
    });

    return filteredResult;
  },
});

function generateRandomString(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateRandomTeamId() {
  const randomPart = () =>
    Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${randomPart()}-${randomPart()}-${randomPart()}`;
}

// Create team mutation with formatted random teamId and password
export const createTeam = mutation({
  args: {
    teamName: v.string(),
    createdBy: v.string(),
    members: v.array(
      v.object({
        email: v.string(),
        role: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const teamId = generateRandomTeamId(); // Generate formatted teamId
    const password = generateRandomString(10); // Adjust length as needed
    const teamData = {
      ...args,
      teamId,
      password,
    };
    const result = await ctx.db.insert("teams", teamData);
    return result;
  },
});

// Function to join a team by adding member
export const joinTeam = mutation({
  args: {
    email: v.string(),
    teamId: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if team with given teamId and password exists
    const team: any = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .collect();
    console.log("teamsss", team);
    if (team.length === 0) {
      return {
        status: 404,
        message: "Invalid Team ID",
      };
    } else if (team && args.password !== team[0]?.password) {
      return {
        status: 500,
        message: "Invalid Password",
      };
    } else {
      const updatedMembers = [...team[0]?.members, { email: args.email }];
      const updateResult = await ctx.db.patch(team[0]?._id, {
        members: updatedMembers,
      });
      return {
        status: 200,
        message: `Joined ${team[0]?.teamName} successfully`,
      };
    }
  },
});

export const addMembers=mutation({
  args:{
      teamId: v.string(),
      members: v.array(
        v.object({
          email: v.string(),
          role:v.optional(v.string())
        })
      ),
  },
  
  handler:async(ctx, args) =>{
    const team: any = await ctx.db
    .query("teams")
    .filter((q) => q.eq(q.field("teamId"), args.teamId))
    .collect();
    console.log('args',args);
      const result =await ctx.db.patch(team[0]?._id,{members:args.members});
      return result;
  },
})

export const getTeamById = query({
  args:{
      _id:v.id('teams')
  },
  handler:async(ctx, args)=> {
      const result=await ctx.db.get(args._id);
      return result;
  },
})
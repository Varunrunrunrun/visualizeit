import {v} from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeam = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('teams').collect();
        
        const filteredResult = result.filter((team:any) => {
            // Check if createdBy matches the provided email
            if (team.createdBy === args.email) {
                return true;
            }
            
            // Check if the email exists in the members array
            if (team.members && Array.isArray(team.members)) {
                const memberWithEmail = team.members.find((member:any) => member.email === args.email);
                if (memberWithEmail) {
                    return true;
                }
            }
            
            return false;
        });

        return filteredResult;
    },
});

function generateRandomString(length : number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateRandomTeamId() {
    const randomPart = () => Math.random().toString(36).substr(2, 4).toUpperCase();
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
        const result = await ctx.db.insert('teams', teamData);
        return result;
    },
});

// Function to join a team by adding member
// export const joinTeam = mutation({
//     args: {
//         email: v.string(),
//         teamId: v.string(),
//         password: v.string(),
//     },
//     handler: async (ctx, args) => {
//         // Check if team with given teamId and password exists
//         const team = await ctx.db.find('teams', { teamId: args.teamId, password: args.password });
//         if (!team) {
//             throw new Error('Invalid teamId or password'); // Handle error as needed
//         }
//         // Add member to the team
//         const updatedMembers = [...team.members, { email: args.email }];
//         const updateResult = await ctx.db.update('teams', { _id: team._id }, { $set: { members: updatedMembers } });
//         return updateResult;
//     },
// });


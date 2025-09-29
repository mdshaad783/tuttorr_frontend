import { apiSlice } from "./apiSlice";
import {ASSIGNMENTS_URL} from '../constants.js'

export const assignmentApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    createAssignment:builder.mutation({
      query:data=>({
        url:`${ASSIGNMENTS_URL}/`,
        method:'POST',
        body:data
      })
    }),
    getAssignment:builder.query({
      query:()=>({
        url:ASSIGNMENTS_URL
      }),
      providesTags:['Assignment'],
      keepUnusedDataFor:5,
    })
  })  
})

export const {useCreateAssignmentMutation, useGetAssignmentQuery} = assignmentApiSlice
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns'

const initialState = [
    {
      id: '1',
      title: 'First Post!',
      content: 'Hello!',
      user: '0',
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
    {
      id: '2',
      title: 'Second Post',
      content: 'More text',
      user: '2',
      date: sub(new Date(), { minutes: 5 }).toISOString(),
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
  ]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action){
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(), // Don't put class instances, functions, or other non-serializable values into Redux!. That's why the date instance was converted to string
                        title, 
                        content,
                        user: userId
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.find(post => post.id === id)
            if(existingPost) {
                existingPost.title = title;
                existingPost.content = content
            }
        }
    }
})

export default postsSlice.reducer
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions




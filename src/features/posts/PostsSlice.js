import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import { client } from '../../api/client'

// const initialState = [
//     {
//       id: '1',
//       title: 'First Post!',
//       content: 'Hello!',
//       user: '0',
//       date: sub(new Date(), { minutes: 10 }).toISOString(),
//       reactions: {
//         thumbsUp: 0,
//         hooray: 0,
//         heart: 0,
//         rocket: 0,
//         eyes: 0,
//       },
//     },
//     {
//       id: '2',
//       title: 'Second Post',
//       content: 'More text',
//       user: '2',
//       date: sub(new Date(), { minutes: 5 }).toISOString(),
//       reactions: {
//         thumbsUp: 0,
//         hooray: 0,
//         heart: 0,
//         rocket: 0,
//         eyes: 0,
//       },
//     },
//   ]

  

/**
 * Redux Toolkit's createAsyncThunk
 * API generates thunks that automatically
 * dispatch those "start/success/failure" actions for you.
 */

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}


// Creating the async function

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    const response = await client.get('/fakeApi/posts')
    return response.posts;
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    // The payload creator receives the partial `{title, content, user}` object
    async initialPost => {
      // We send the initial data to the fake API server
      const response = await client.post('/fakeApi/posts', { post: initialPost })
      // The response includes the complete post object, including unique ID
      return response.post
    }
  )


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action){
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find((post) => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) { // The "prepare callback" function can take multiple arguments, generate random values like unique IDs, and run whatever other synchronous logic is needed to decide what values go into the action object
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(), // Don't put class instances, functions, or other non-serializable values into Redux!. That's why the date instance was converted to string
                        title, 
                        content,
                        user: userId,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0,
                        },
                    },
                }
            },
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.posts.find(post => post.id === id)
            if(existingPost) {
                existingPost.title = title;
                existingPost.content = content
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'

            // Add any fetched post to the array
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload)
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer

// The following are reusable selectors
export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)








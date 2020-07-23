import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // this is used to dispatch actions from a component
import { nanoid } from '@reduxjs/toolkit';

import { postAdded } from './PostsSlice'

export const AddPostForm = () => {
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');

    const dispatch = useDispatch();

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    // function to dispatch the actions
    const onSavePostClicked = () => {
        if( title && content ) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title,
                    content,
                })
            )

            setTitle('');
            setContent('');
        }
    }

    return (
        <section>
             <h2>Add a New Post</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
            />
            <label htmlFor="postContent">Content:</label>
            <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            />
            <button 
            type="button"
            onClick={onSavePostClicked}
            >Save Post</button>
        </form>
        </section>
    )
}
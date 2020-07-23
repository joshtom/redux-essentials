// Component to list all the post
import React from 'react'
import { useSelector } from 'react-redux'; // React can use this selector to read data from the redux store
import { Link } from 'react-router-dom';

export const PostsList = () => {
    const posts = useSelector(state => state.posts);

    const renderedPosts = posts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3> {post.title} </h3>
            <p> {post.content.substring(0, 100)} </p>
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    ))

    return (
        <section>
        <h2> Posts </h2>
        {renderedPosts}
        </section>
        
    )
}
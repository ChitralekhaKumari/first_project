"use client"

const { useState, useEffect } = require("react")

export default function Posts() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            // console.log(data);
            setPost(data);
        }
        fetchPosts();
    }, [])

    return (
        <>
            <h1 className="text-2xl font-bold">Posts</h1>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-4">
                {post.map(({ id, title, body }) => (
                    <div className="bg-[var(--secondary-bg)] p-4 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform duration-200" key={id}>
                        <h2>{title}</h2>
                        <p>{body}</p>
                 </div>
                ))}
            </div>
        </>
    )
}

// const Posts = async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const todos = await response.json();
//     console.log(todos);

//     return (
//         <>
//             <h1>Todos</h1>
//             <div>
//                 {todos.map(({ id, title, completed }) => {
//                     <div key={id}>
//                         <input type="checkbox" checked={completed} readOnly />
//                         <p>{title}</p>
//                     </div>
//                 })}
//             </div>
//         </>
//     )

// }
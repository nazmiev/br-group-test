// import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
// import './App.css'

// function App() {
//   const [news, setNews] = useState<any>([]);

//   interface Story {
//     id: number;
//     title: string;
//     by: string;
//     url: string;
//     kids: [];
//   }

//   const fetchHackerNews = async (): Promise<Story[]> => {
//     const ids = await fetch(
//       "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
//     ).then(res => res.json());
//     const stories: any = await Promise.all(
//       // ids.slice(0, 99).map(
//       ids.slice(0, 9).map(
//         async (id: number): Promise<void | Story> => {
//           // const story: Story = await fetch(
//           const story: any = await fetch(
//             `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
//           ).then(res => res.json()).then(res => setNews((news: any) => [...news, res]));
//           return story;
//         }
//       )
//     );
//     return stories;
//   };

//   useEffect(() => {
//     fetchHackerNews();
//   }, []);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setNews([]);
//       fetchHackerNews();
//     }, 60000)
//     return () => clearInterval(intervalId);
//   }, []);

//   const reload = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     setNews([]);
//     fetchHackerNews();
//   }

//   return (
//     <>
//       <button onClick={reload} >reload</button>
//       {news.map((post: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => <h2 key={post.id}>{post.title}</h2>)}
//     </>
//   )
// }

// export default App

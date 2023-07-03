import {
    Outlet,
    NavLink,
    useLoaderData,
    Form,
    useNavigation,
  } from "react-router-dom";
  import { useEffect } from "react";

  interface Story {
    id: number;
    title: string;
    by: string;
    url: string;
    kids: [];
  }

  const getNews = async (): Promise<Story[]> => {
    const ids = await fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    ).then(res => res.json());
    const stories: any = await Promise.all(
      ids.slice(0, 9).map(
        async (id: number): Promise<void | Story> => {
          const story: Story = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          ).then(res => res.json());
          return story;
        }
      )
    );
    return stories;
  };
  
  export async function loader() {
    console.log('loader');
    const news = await getNews();
    return { news };
  }
  
  export async function action() {
    const news = await getNews();
    return { news };
  }
  
  export default function Root() {
    const { news } :any = useLoaderData();
    const navigation = useNavigation();

    useEffect(() => {
        const intervalId = setInterval(() => {
          loader();
        }, 60000)
        return () => clearInterval(intervalId);
      }, []);
    
    return (
      <>
        <div id="sidebar">
          <div>
            <Form method="post">
              <button type="submit">Reload</button>
            </Form>
          </div>
          <nav>
            {news.length ? (
              <ul>
                {news.map((post:any) => (
                  <li key={post.id}>
                    <NavLink
                      to={`news/${post.id}`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }>
                        {post.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div
          id="detail"
          className={navigation.state === "loading" ? "loading" : ""}
        >
          <Outlet />
        </div>
      </>
    );
  }
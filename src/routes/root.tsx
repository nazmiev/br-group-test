import { NavLink, useLoaderData, Form, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import { getNews } from "../utils";
import Button from "react-bootstrap/Button";

export async function loader() {
  const news = await getNews();
  return { news };
}

export async function action() {
  const news = await getNews();
  return { news };
}

export default function Root() {
  const { news }: any = useLoaderData();
  const navigation = useNavigation();
  console.log(navigation.state);

  useEffect(() => {
    const intervalId = setInterval(() => {
      loader();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="main">
      <div className="main__container">
        <div>
          <Form method="post">
            <Button type="submit">Reload</Button>
          </Form>
        </div>
        <div>
          <div
            id="search-spinner"
            aria-hidden
            hidden={navigation.state === "idle"}
          />
          {news.length ? (
            <div className="post-list">
              {news.map((post: any) => (
                <div key={post.id} className="post">
                  <>
                    <NavLink
                      to={`news/${post.id}`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      {post.title}
                    </NavLink>
                    <br />
                    Rating: <b>{post.score}</b>, Author: <b>{post.by}</b>, Date:
                    <b>{new Date(post.time * 1000).toDateString()}</b>
                    {post.kids && (
                      <span> Комментариев: {post.kids.length}</span>
                    )}
                  </>
                </div>
              ))}
            </div>
          ) : (
            <p>
              <i>No news</i>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

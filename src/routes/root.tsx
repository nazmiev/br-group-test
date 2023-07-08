import { NavLink, useLoaderData, Form } from "react-router-dom";
import { useEffect } from "react";
import { getNews } from "../utils";

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      loader();
    }, 60000);
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
              {news.map((post: any) => (
                <li key={post.id}>
                  <>
                    <NavLink
                      to={`news/${post.id}`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      Название: {post.title}, Рейтинг: {post.score}, Автор:{" "}
                      {post.by}, Дата:{" "}
                      {new Date(post.time * 1000).toDateString()}
                    </NavLink>
                    {post.kids && (
                      <span> Комментариев: {post.kids.length}</span>
                    )}
                  </>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No news</i>
            </p>
          )}
        </nav>
      </div>
    </>
  );
}

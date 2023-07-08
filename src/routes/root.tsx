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
        ids.slice(0, 35).map(
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
    const news = await getNews();
    console.log('loader')
    return { news };
}

export async function action() {
    const news = await getNews();
    console.log('action reload')
    return { news };
}

export default function Root() {
    const { news }: any = useLoaderData();
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
                            {news.map((post: any) => (
                                <li key={post.id}>
                                    <>
                                        <NavLink
                                            to={`news/${post.id}`}
                                            className={({ isActive, isPending }) =>
                                                isActive ? "active" : isPending ? "pending" : ""
                                            }>
                                            Название: {post.title}, Рейтинг: {post.score}, Автор: {post.by}, Дата: {new Date(post.time * 1000).toDateString()}
                                        </NavLink>
                                        {post.kids && <span> Комментариев: {post.kids.length}</span>}
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
            <div
                id="detail"
                className={navigation.state === "loading" ? "loading" : ""}
            >
                <Outlet />
            </div>
        </>
    );
}
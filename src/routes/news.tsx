import { Form, useLoaderData, useNavigate } from "react-router-dom";
import CommentBlock from "../components/CommentBlock";

export interface Story {
    id: number;
    title: string;
    by: string;
    url: string;
    text?: string;
    kids: [];
}

const getPost = async (id: number): Promise<Story> => {
    const story: Story = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    ).then(res => res.json());
    return story;
}

export const getComments = async (id: number): Promise<Story[]> => {
    const kids = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    ).then(res => res.json()).then(res => res.kids ?? []);

    const comments: Story[] = await Promise.all(
        kids.map(
            async (id: number): Promise<void | Story> => {
                const comment: Story = await fetch(
                    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
                ).then(res => res.json());
                return comment;
            }
        )
    );
    return comments;
};

export async function loader({ params }: any) {
    const post = await getPost(params.newsId);
    console.log(post);
    if (!post) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    const comments = await getComments(params.newsId);
    return { post, comments };
}

export async function action({ params }: any) {
    const post = await getPost(params.newsId);
    console.log(post);
    if (!post) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    const comments = await getComments(params.newsId);
    return { post, comments };
}

export default function Post() {
    const { post, comments }: any = useLoaderData();
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
      };

    return (
        <div id="post">
            <button onClick={navigateHome}>Вернуться к списку новостей</button>
            <div>
                <Form method="post">
                    <button type="submit">Reload</button>
                </Form>
            </div>
            <div>
                <h1>
                    {post.title}
                </h1>
                <p>Ссылка<a href={post.url}>{post.url}</a></p>
                <p>Дата: {new Date(post.time * 1000).toDateString()}</p>
                <p>Автор: {post.by}</p>
                <p>Комментариев: {post.kids ? post.kids.length : '0'}</p>
                {comments.length ? comments.map((comment: Story) =>
                    <CommentBlock key={comment.id} comment={comment} />
                ) : <></>}
            </div>
        </div>
    );
}

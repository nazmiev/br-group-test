import { useLoaderData } from "react-router-dom";
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
    if (!post) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    const comments = await getComments(params.newsId);
    return { post, comments };
}

export async function action() {
    console.log('action');
}

export default function Contact() {
    const { post, comments }: any = useLoaderData();

    return (
        <div id="contact">
            <div>
                <h1>
                    {post.title}
                </h1>
                {comments.length && comments.map((comment: Story) =>
                    <CommentBlock key={comment.id} comment={comment} />
                )}
            </div>
        </div>
    );
}
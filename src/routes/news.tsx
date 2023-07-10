import {
  Form,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import CommentBlock from "../components/CommentBlock";
// import { LoaderParams, PostType, Story } from "../types";
import { Story } from "../types";
import { getComments, getPost } from "../utils";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// export async function loader({ params }: LoaderParams): Promise<PostType> {
export async function loader({ params }: any) {
  const post: Story = await getPost(params.newsId);
  if (!post) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const comments: Story[] = await getComments(params.newsId);
  return { post, comments };
}

// export async function action({ params }: LoaderParams): Promise<PostType> {
export async function action({ params }: any) {
  const post: Story = await getPost(params.newsId);
  if (!post) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const comments: Story[] = await getComments(params.newsId);
  return { post, comments };
}

export default function Post() {
  // const { post, comments }: PostType = useLoaderData();
  const { post, comments }: any = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const navigateHome = () => {
    navigate("/");
  };

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <div
            id="search-spinner"
            aria-hidden
            hidden={navigation.state === "idle"}
          />
        </Col>
        <Col>
          <Button onClick={navigateHome}>Вернуться к списку новостей</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form method="post">
            <Button type="submit">Reload</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="one-post">
            <h1>{post.title}</h1>
            <p>
              Link: <a href={post.url}>{post.url}</a>
            </p>
            <p>Date: {new Date(post.time * 1000).toDateString()}</p>
            <p>Author: {post.by}</p>
            <p>Comments: {post.kids ? post.kids.length : "0"}</p>
            {comments.length ? (
              comments.map((comment: Story) => (
                <CommentBlock key={comment.id} comment={comment} />
              ))
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

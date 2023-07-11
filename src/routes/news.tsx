import {
  Form,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import CommentBlock from "../components/CommentBlock";
import { LoaderParams, PostType, Story } from "../types";
import { getComments, getPost } from "../utils";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Card from "react-bootstrap/Card";


export async function loader({ params }: LoaderParams) {
  if (!params.newsId) {return};
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

export async function action({ params }: LoaderParams) {
  if (!params.newsId) {return};
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
  const { post, comments } = useLoaderData() as PostType;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const navigateHome = () => {
    navigate("/");
  };

  return (
    <Container fluid="md">
      <ButtonToolbar className="justify-content-between mb-3 mt-3">
        <Button variant="dark" onClick={navigateHome}>
          Back to news
        </Button>

        <Spinner
          animation="border"
          role="status"
          aria-hidden
          hidden={navigation.state === "idle"}
        />

        <Form method="post">
          <Button variant="dark" type="submit">
            Refresh comments
          </Button>
        </Form>
      </ButtonToolbar>
      <Row>
        <Col>
          <Card className="mb-2">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Author: {post.by}
              </Card.Subtitle>
              <Card.Text>
                Date: {new Date(post.time * 1000).toDateString()}
              </Card.Text>
              <Card.Link href={post.url}>Link to original</Card.Link>
            </Card.Body>
            <Card.Footer className="text-muted">
              Comments: {post.kids ? post.kids.length : "0"}
            </Card.Footer>
          </Card>
          {comments.length ? (
            comments.map((comment: Story) => (
              <CommentBlock key={comment.id} comment={comment} />
            ))
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
}

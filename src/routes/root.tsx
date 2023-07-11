import { NavLink, useLoaderData, Form, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import { getNews } from "../utils";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Card from "react-bootstrap/Card";
import { Story } from "../types";


export async function loader() {
  const news = await getNews();
  return news;
}

export async function action() {
  const news = await getNews();
  return news;
}

export default function Root() {
  const news = useLoaderData() as Story[];
  const navigation = useNavigation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      loader();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container fluid="md" className="mb-3 mt-3">
      <ButtonToolbar className="justify-content-between mb-3 mt-3">
        <Form method="post">
          <Button variant="dark" type="submit">Refresh</Button>
        </Form>
        <Spinner
          animation="border"
          role="status"
          aria-hidden
          hidden={navigation.state === "idle"}
        />
      </ButtonToolbar>
      {news.length ? (
        <>
          {news.map((post: Story) => (
            <Card className="mb-2" key={post.id}>
              <Card.Body>
                <Card.Title>
                  <NavLink to={`news/${post.id}`}>
                    {post.title}

                  </NavLink>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Author: {post.by}
                </Card.Subtitle>
                <Card.Text>
                  Date: {new Date(post.time * 1000).toDateString()}<br/>
                  Rating: <b>{post.score}</b>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                Comments: {post.kids ? post.kids.length : "0"}
              </Card.Footer>
            </Card>
          ))}
        </>
      ) : (
        <p>
          <i>No news</i>
        </p>
      )}
    </Container>
  );
}

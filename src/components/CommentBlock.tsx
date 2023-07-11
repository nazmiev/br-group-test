import { useState } from "react";
import { Story } from "../types";
import { getComments } from "../utils";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CommentBlock = ({ comment }: any) => {

  const showKids = async (comment: Story) => {
    setLoading(true);
    const kids = await getComments(comment.id);
    setKids(kids);
    setLoading(false);
    setOpen(true);
  };

  const [kids, setKids] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Card className="mb-2">
      <ListGroup variant="flush">
        <ListGroup.Item>
          <p>{comment.text}</p>
          {comment.kids && (
            <Row xs={2} md={4} lg={6} className="mb-2">
              <Col>
                {open ? (
                  <Button size="sm" variant="dark" disabled>Answers:</Button>
                ) : (
                  <Button size="sm" variant="dark" onClick={() => showKids(comment)}>
                    Show answers: {comment.kids.length}
                  </Button>
                )}
              </Col>
              <Col>
                {loading && <Spinner
                  size="sm"
                  animation="border"
                  role="status"
                />}
              </Col>
            </Row>
          )}

          {kids &&
            kids.map((kid: Story) => (
              <CommentBlock key={kid.id} comment={kid} />
            ))}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CommentBlock;

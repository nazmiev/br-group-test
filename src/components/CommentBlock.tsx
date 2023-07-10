import { useNavigation } from "react-router-dom";
import { useState } from "react";
import styles from "./CommentBlock.module.scss";
import { Story } from "../types";
import { getComments } from "../utils";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const CommentBlock = ({ comment }: any) => {
  const navigation = useNavigation();
  console.log(navigation.state);

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
          <div className={styles.comment}>
            <p>{comment.text}</p>
            {comment.kids && (
              <div className={styles.show_kids}>
                {loading && <div className={styles.spinner} />}
                {open ? (
                  <b onClick={() => showKids(comment)}>Answers:</b>
                ) : (
                  <b onClick={() => showKids(comment)}>
                    Show answers: {comment.kids.length}
                  </b>
                )}
              </div>
            )}

            <div className={styles.kids}>
              {kids &&
                kids.map((kid: Story) => (
                  <CommentBlock key={kid.id} comment={kid} />
                ))}
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CommentBlock;

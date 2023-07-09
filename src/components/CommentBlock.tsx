import { getComments } from "../routes/news";
import { useNavigation } from "react-router-dom";
import { useState } from "react";
import styles from "./CommentBlock.module.scss";
import { Story } from "../types";

const CommentBlock = ({ comment }: any) => {
  const navigation = useNavigation();
  console.log(navigation.state);

  const showKids = async (comment: Story) => {
    setLoading(true);
    const kids = await getComments(comment.id);
    setKids(kids);
    setLoading(false);
  };

  const [kids, setKids] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.root}>
      {loading && <div id="search-spinner" />}
      <div className={styles.comment}>
        <p>{comment.text}</p>
        {comment.kids && (
          <b onClick={() => showKids(comment)}>Ответы: {comment.kids.length}</b>
        )}

        <div className={styles.kids}>
          {kids &&
            kids.map((kid: Story) => (
              <CommentBlock key={kid.id} comment={kid} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommentBlock;

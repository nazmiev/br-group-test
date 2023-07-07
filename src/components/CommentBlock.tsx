import { Story, getComments } from "../routes/news";
import { useState } from 'react'
import styles from "./CommentBlock.module.scss"

const CommentBlock = ({ comment } : any) => {

    const showKids = async (comment : Story) => {
        const kids = await getComments(comment.id)
        setKids(kids);
    }

    const [kids, setKids] = useState<Story[]>([])

    return (
        <>
            <div className={styles.comment}>
                <p>{comment.text}</p>
                {comment.kids &&
                    <b onClick={() => showKids(comment)}>
                        Ответы: {comment.kids.length}
                    </b>
                }
                <div className={styles.kids}>
                {kids && kids.map((kid: Story) => 
                    <CommentBlock key={kid.id} comment={kid} />
                )}
                </div>
            </div>

        </>
    )
}

export default CommentBlock;
import styles from "@/styles/Note.module.css";
import { Note as NoteModel } from "@/models";
import { Card } from "react-bootstrap";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {new Date(createdAt).toLocaleString()}
      </Card.Footer>
    </Card>
  );
};

export default Note;

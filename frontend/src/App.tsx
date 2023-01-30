import { useState, useEffect } from "react";
import { Note as NoteModel } from "./models";
import { Note } from "./components";
import styles from "./styles/NotesPage.module.css";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const [notes, setNotes] = useState<Array<NoteModel>>([]);
  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes");
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;

package LinkiZ.Ynov.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import LinkiZ.Ynov.demo.entity.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    public Note findByTitle(String title);
}

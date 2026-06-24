package LinkiZ.Ynov.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import LinkiZ.Ynov.demo.entity.Note;
import LinkiZ.Ynov.demo.repository.NoteRepository;

@Component
public class NoteInitializer implements CommandLineRunner {

    private final NoteRepository noteRepository;

    public NoteInitializer(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (noteRepository.count() > 0) {
            return;
        }

        Note note1 = new Note();
        note1.setTitle("Premiere note");
        note1.setContent("Exemple de contenu pour valider l'affichage.");

        Note note2 = new Note();
        note2.setTitle("Deuxieme note");
        note2.setContent("Une autre note de test pour la liste.");

        noteRepository.save(note1);
        noteRepository.save(note2);
    }
}

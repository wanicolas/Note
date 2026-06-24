package LinkiZ.Ynov.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import LinkiZ.Ynov.demo.entity.Note;
import LinkiZ.Ynov.demo.service.NoteService;

@RestController
@RequestMapping("/notes")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/add")
    public String addNote(@RequestBody Note noteRequest) {
        Note newNote = new Note();
        newNote.setTitle(noteRequest.getTitle());
        newNote.setContent(noteRequest.getContent());
        noteService.addNote(newNote);
        return "La note a été ajoutée avec succès";
    }

    @DeleteMapping("/remove/{id}")
    public String removeNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return "La note a été supprimée avec succès";
    }

    @GetMapping("/")
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id);
    }

    @PutMapping("/update")
    public String updateNote(@RequestBody Note noteRequest) {
        Note updatedNote = noteService.updateNote(noteRequest.getId(), noteRequest);
        if (updatedNote != null) {
            return "La note a été mise à jour avec succès";
        }
        return "Note non trouvée";  
    }
}
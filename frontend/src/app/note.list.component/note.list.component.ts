import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Note } from '@/models/note';
import { NoteComponent } from '@/note.component/note.component';
import { NoteService } from '@/services/note.services';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NgFor, NgIf, NoteComponent],
  templateUrl: './note.list.component.html',
  styleUrl: './note.list.component.css',
})
export class NoteListComponent {
  private noteService = inject(NoteService);
  notes = signal<Note[]>([]);

  ngOnInit() {
    this.noteService.getNotes().subscribe({
      next: (notes: Note[]) => this.notes.set(notes),
      error: (err: any) => console.error('Error fetching notes:', err),
    });
  }

  delete(note: Note) {
    this.noteService.deleteNote(note.id).subscribe({
      next: () => {
        const updated = this.notes().filter((n) => n.id !== note.id);
        this.notes.set(updated);
      },
      error: (err: any) => console.error('Erreur lors de la suppression de la note:', err),
    });
  }
}

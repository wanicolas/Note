import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { NoteComponent } from '../note-component/note.component';
import { NoteService } from '../../../core/services/note.service';

@Component({
  selector: 'app-note-list-component',
  standalone: true,
  imports: [NoteComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent implements OnInit {
  private noteService = inject(NoteService);
  private cdr = inject(ChangeDetectorRef);

  notes: Note[] = [];

  ngOnInit(): void {
    this.noteService.getNotes()
    .subscribe({
      next:(notes) => {
        this.notes = notes ?? [];
        console.info(notes)
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('call api error : ', err);
        this.cdr.markForCheck();
      }
    });
  }
}
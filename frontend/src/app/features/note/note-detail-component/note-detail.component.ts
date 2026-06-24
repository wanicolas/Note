import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NoteService } from '../../../core/services/note.service';

@Component({
  selector: 'app-note-detail-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.css',
})
export class NoteDetailComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private noteService = inject(NoteService);
  note = this.route.snapshot.data['note'];
  id = this.route.snapshot.paramMap.get('id');

  delete() {
    if (!this.id) {
      return;
    }
    this.noteService.deleteNoteById(this.id).subscribe({
      next: (res) => {
        this.router.navigate(['/notes']);
      },
      error: (err) => {
        console.error('call api error : ', err);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Note } from '@/models/note';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './note.details.component.html',
  styleUrl: './note.details.component.css',
})
export class NoteDetailsComponent implements OnInit {
  note?: Note;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.note = this.route.snapshot.data['note'];
  }
}

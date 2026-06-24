import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent implements OnInit {

  @Input() note!: Note;

  ngOnInit(): void {  }

}

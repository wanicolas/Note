import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Note } from '@/models/note';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/';

  public getNotes() {
    return this.http.get<Note[]>(`${this.apiUrl}notes/`);
  }

  public getNote(id: number) {
    return this.http.get<Note>(`${this.apiUrl}notes/${id}`);
  }

  public deleteNote(id: number) {
    return this.http.delete(`${this.apiUrl}notes/remove/${id}`, { responseType: 'text' });
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Note } from '../../features/note/models/note';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:9000/notes';

  public getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  public getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  public deleteNoteById(id: string): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

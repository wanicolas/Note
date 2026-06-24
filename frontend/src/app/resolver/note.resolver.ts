import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Note } from '@/models/note';
import { NoteService } from '@/services/note.services';

@Injectable({
  providedIn: 'root',
})
export class NoteResolver implements Resolve<Note> {
  constructor(
    private noteService: NoteService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Note> {
    const id = +route.paramMap.get('id')!;
    return this.noteService.getNote(id).pipe(
      catchError(() => {
        this.router.navigate(['/notes']);
        return EMPTY;
      }),
    );
  }
}

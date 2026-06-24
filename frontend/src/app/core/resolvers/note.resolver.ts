
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { NoteService } from '../services/note.service';

export const noteResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const service = inject(NoteService);
  const id = route.paramMap.get('id')!;
  return service.getNoteById(id);
};

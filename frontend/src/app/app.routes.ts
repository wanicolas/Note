import { Routes } from '@angular/router';
import { NoteListComponent } from './note.list.component/note.list.component';
import { NoteDetailsComponent } from './note.details.component/note.details.component';
import { NoteResolver } from './resolver/note.resolver';
import { LoginComponent } from './login.component/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: NoteListComponent, canActivate: [authGuard] },
  {
    path: 'notes/:id',
    component: NoteDetailsComponent,
    resolve: { note: NoteResolver },
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
];

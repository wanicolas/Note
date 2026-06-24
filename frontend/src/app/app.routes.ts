import { Routes } from '@angular/router';
import { NoteListComponent } from './features/note/note-list-component/note-list.component';
import { NoteDetailComponent } from './features/note/note-detail-component/note-detail.component';
import { noteResolver } from './core/resolvers/note.resolver';
import { LoginComponent } from './features/auth/login-component/login.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'notes', pathMatch: 'full' },
    { path: 'notes', component: NoteListComponent, canActivate: [authGuard] },
    { path: 'notes/:id', component: NoteDetailComponent, resolve: { note : noteResolver}, canActivate: [authGuard, adminGuard]},
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'notes'}
];

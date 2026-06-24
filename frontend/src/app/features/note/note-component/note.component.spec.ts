import { provideRouter } from '@angular/router';
import { NoteComponent } from './note.component';
import { Note } from '../models/note';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('Note', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    component.note = new Note(1, 'Titre', 'Contenu');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });
});

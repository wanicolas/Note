import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { NoteListComponent } from './note.list.component';
import { Note } from '@/models/note';

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteListComponent, RouterTestingModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dois afficher les notes récupérées du serviceO', () => {
    // Arrange
    const mockedNotes = [
      { id: 1, title: 'titre 1', content: 'contenu 1' },
      { id: 2, title: 'titre 2', content: 'contenu 2' },
    ] as Note[];

    // Act
    fixture.detectChanges();

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(mockedNotes);

    // Assert
    expect(component).toBeTruthy();
    expect(component.notes().length).toBe(2);
  });

  it('Dois supprimer une note quand delete() est appelé', async () => {
    // Arrange: same mocked notes
    const mockedNotes = [
      { id: 1, title: 'titre 1', content: 'contenu 1' },
      { id: 2, title: 'titre 2', content: 'contenu 2' },
    ] as Note[];

    // trigger initial GET
    fixture.detectChanges();
    const getReq = httpMock.expectOne(() => true);
    getReq.flush(mockedNotes);

    await fixture.whenStable();
    expect(component.notes().length).toBe(2);

    // Act: delete first note
    component.delete(mockedNotes[0]);
    const delReq = httpMock.expectOne((r) => r.method === 'DELETE' && r.url.includes('/notes/1'));
    expect(delReq.request.method).toBe('DELETE');
    delReq.flush({});

    await fixture.whenStable();

    // Assert: notes length decreased
    expect(component.notes().length).toBe(1);
  });
});

import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';

import { NoteDetailComponent } from './note-detail.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dummy-notes',
  template: '<p>Notes</p>',
  standalone: true,
})
class DummyNotesComponent {}

const settle = async () => {
  await Promise.resolve();
  await new Promise((r) => setTimeout(r, 0));
  await Promise.resolve();
};

describe('NoteDetail', () => {
  let component: NoteDetailComponent;
  let fixture: ComponentFixture<NoteDetailComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    const mockedNote = { id: 1, title: 'title', content: 'content' };

    await TestBed.configureTestingModule({
      imports: [NoteDetailComponent, DummyNotesComponent],
      providers: [
        provideRouter([{ path: 'notes', component: DummyNotesComponent }]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { note: mockedNote },
              paramMap: convertToParamMap({ id: '1' }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteDetailComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(async () => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.id).toBe('1');
    expect(component.note).toBeDefined();
  });

  it('should delete with http mock', async () => {
    //Arrange

    // Act
    component.delete();

    const req = httpMock.expectOne(`http://localhost:9000/notes/1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.url).toContain('/1');
    req.flush(null, { status: 204, statusText: 'No Content' });

    // Assert
    await settle();
    expect(router.url).toBe('/notes');
  });
});

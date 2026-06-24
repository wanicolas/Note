
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoteListComponent } from './note-list.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create component and get notes', () => {
    //Arrange
    const mockedNotes = [
      { id: 1, title: 'title1', content: 'content1' },
      { id: 2, title: 'title2', content: 'content2' },
    ];

    //Act
    fixture.detectChanges();

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET'); 
    req.flush(mockedNotes);

    //Assert
    expect(component).toBeTruthy();
    expect(component.notes.length).toBe(2);
  });

});

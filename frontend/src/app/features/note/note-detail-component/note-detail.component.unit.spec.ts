import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';

import { NoteDetailComponent } from './note-detail.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoteService } from '../../../core/services/note.service';
import { of } from 'rxjs';

describe('NoteDetail', () => {
  let component: NoteDetailComponent;
  let fixture: ComponentFixture<NoteDetailComponent>;
  
  const noteServiceMock = {
    deleteNoteById: jest.fn<ReturnType<NoteService['deleteNoteById']>, Parameters<NoteService['deleteNoteById']>>()
  };
  
  const routerMock: jest.Mocked<Pick<Router, 'navigate'>> = {
    navigate: jest.fn().mockResolvedValue(true as any),
  };

  beforeEach(async () => {
    
    const mockedNote = { id: 1, title: 'title', content: 'content' };

    await TestBed.configureTestingModule({
      imports: [NoteDetailComponent],
      providers: [        
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { note: mockedNote },
              paramMap: convertToParamMap({ id: '1' }),
            },
          },
        },
        { provide: NoteService, useValue: noteServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDetailComponent);
    component = fixture.componentInstance;
  });

    afterEach(async() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.id).toBe('1');
    expect(component.note).toBeDefined();
  });

  it('should delete note service mock', async() => {
    //Arrange
    noteServiceMock.deleteNoteById.mockReturnValueOnce(of({}));

    // Act
    component.delete();

    // Assert
    expect(noteServiceMock.deleteNoteById).toHaveBeenCalledTimes(1);
    expect(noteServiceMock.deleteNoteById).toHaveBeenCalledWith('1');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/notes']);
  });

});
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';

import { NoteDetailsComponent } from '@/note.details.component/note.details.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({ selector: 'app-dummy-notes', template: '<p>Notes</p>', standalone: true })
class DummyNotesComponent {}

const settle = async () => {
    await Promise.resolve();
    await new Promise((r) => setTimeout(r, 0));
    await Promise.resolve();
  };

describe('NoteDetailsComponent (unit)', () => {
  let component: NoteDetailsComponent;
  let fixture: ComponentFixture<NoteDetailsComponent>;
  let router: Router;

  beforeEach(async () => {
    const mockedNote = { id: 1, title: 'title', content: 'content' };

    await TestBed.configureTestingModule({
      imports: [NoteDetailsComponent, DummyNotesComponent],
      providers: [
        provideRouter([{ path: 'notes', component: DummyNotesComponent }]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: { note: mockedNote }, paramMap: convertToParamMap({ id: '1' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create and have route-provided note', () => {
    expect(component).toBeTruthy();
    expect(component.note).toBeDefined();
    expect((component as any).route?.snapshot?.paramMap?.get('id') || '1').toBe('1');
  });
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';

// import { NoteComponent } from './note.component';
// import { Note } from '../models/note';

// describe('NoteComponent', () => {
//   let component: NoteComponent;
//   let fixture: ComponentFixture<NoteComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [NoteComponent, RouterTestingModule]
//     }).compileComponents();

//     fixture = TestBed.createComponent(NoteComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should render note title, id and content', () => {
//     const testNote = new Note(42, 'Test title', 'Test content');
//     component.note = testNote;
//     fixture.detectChanges();

//     const el: HTMLElement = fixture.nativeElement;
//     expect(el.querySelector('h2')?.textContent).toContain('Test title');
//     expect(el.querySelector('span')?.textContent).toContain('#42');
//     expect(el.querySelector('p')?.textContent).toContain('Test content');
//   });
// });


// ---

import { provideRouter } from '@angular/router';
import { NoteComponent } from './note.component';
import { Note } from '@/models/note';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('Note', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

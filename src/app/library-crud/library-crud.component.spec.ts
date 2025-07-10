import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCrudComponent } from './library-crud.component';

describe('LibraryCrudComponent', () => {
  let component: LibraryCrudComponent;
  let fixture: ComponentFixture<LibraryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

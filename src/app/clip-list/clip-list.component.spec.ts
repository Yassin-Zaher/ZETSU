import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipListComponent } from './clip-list.component';

describe('ClipListComponent', () => {
  let component: ClipListComponent;
  let fixture: ComponentFixture<ClipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClipListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

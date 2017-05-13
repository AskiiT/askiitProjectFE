import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulatedComponent } from './postulated.component';

describe('PostulatedComponent', () => {
  let component: PostulatedComponent;
  let fixture: ComponentFixture<PostulatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

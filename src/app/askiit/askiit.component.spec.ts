import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskiitComponent } from './askiit.component';

describe('AskiitComponent', () => {
  let component: AskiitComponent;
  let fixture: ComponentFixture<AskiitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskiitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskiitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

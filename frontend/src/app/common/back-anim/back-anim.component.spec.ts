import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackAnimComponent } from './back-anim.component';

describe('BackAnimComponent', () => {
  let component: BackAnimComponent;
  let fixture: ComponentFixture<BackAnimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackAnimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

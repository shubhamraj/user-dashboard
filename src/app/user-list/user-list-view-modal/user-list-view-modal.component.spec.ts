import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListViewModalComponent } from './user-list-view-modal.component';

describe('UserListViewModalComponent', () => {
  let component: UserListViewModalComponent;
  let fixture: ComponentFixture<UserListViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

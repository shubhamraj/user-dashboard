import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListAddModalComponent } from './user-list-add-modal.component';

describe('UserListAddModalComponent', () => {
  let component: UserListAddModalComponent;
  let fixture: ComponentFixture<UserListAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

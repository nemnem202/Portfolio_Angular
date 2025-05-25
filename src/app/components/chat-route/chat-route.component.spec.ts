import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRouteComponent } from './chat-route.component';

describe('ChatRouteComponent', () => {
  let component: ChatRouteComponent;
  let fixture: ComponentFixture<ChatRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TretiaPageComponent } from './tretia-page.component';

describe('TretiaPageComponent', () => {
  let component: TretiaPageComponent;
  let fixture: ComponentFixture<TretiaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TretiaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TretiaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

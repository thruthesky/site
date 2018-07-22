import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { MyPagePage } from './my-page.page';


describe('MyPage', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyPagePage
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MyPagePage);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // TODO: add more tests!

});

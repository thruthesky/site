import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { MyPagePage } from './my-page.page';
/**
 * 실제 app.service.ts 를 로드해서,
 * { provide: AppService, useValue: 가짜서비스 } 와 같이 한다.
 * 그리고 TestBed.get( AppService ) 로 injecting 한다.
 * 참고: 실제로는 AppService 소스 코드 자체에 에러가 있고, 이것이 테스트 과정에서만 발견되어,
 *      테스트 코드를 잘못 작성했는가 하고 시간 소비를 많이 했다.
 */
import { AppService } from '../../providers/app.service';
import { By } from '../../../../node_modules/@angular/platform-browser';
import { of } from '../../../../node_modules/rxjs';

/**
 * 가짜 서비스 클래스
 */
const fakeAppService = {
    // 가짜 서비스에서 사용 될 속성/메소드 정의.
    lms: {
        // Observable 리턴
        mypage: () => of({ no_of_reservation: 101 })
    }
};


/**
 * 상단에 글로벌 변수 설정
 */
let component: MyPagePage;
let fixture: ComponentFixture<MyPagePage>;
let de: DebugElement;

describe('MyPage', () => {

    // beforeEach() 에서 TestBed 및 기본 설정.
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MyPagePage
            ],
            providers: [
                // 가짜를 서비스 사용하게 함.
                { provide: AppService, useValue: fakeAppService },
                { provide: ComponentFixtureAutoDetect, useValue: true }

            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            // HTML, CSS 가 외부 파일로 기록되어져 있으면, 아래와 같이 compileComponent() 를 호출해야한다.
            .compileComponents();

        // 컴포넌트 생성
        fixture = TestBed.createComponent(MyPagePage);
        component = fixture.componentInstance;
        // 가짜 서비스를 적용
        TestBed.get(AppService);
        de = fixture.debugElement;
    }));

    it('should create my page', async(() => {
        // 컴포넌트가 생성되어져야 함.
        expect(component).toBeTruthy();
    }));
    it('title contains My-Page', async(() => {
        // 제목 테스트.
        const h1 = de.query( By.css('H1') ).nativeElement;
        expect(h1.textContent).toContain('My-Page');
    }));
    // it('change title', async(() => {
    //     const title = 'new title';
    //     component.title = title;
    //     // 제목 변경시 detectChange() 호출 해야 함.
    //     fixture.detectChanges();
    //     const h1 = de.query( By.css('H1') ).nativeElement;
    //     expect(h1.textContent).toContain(title);
    // }));

    /**
     * Observable 테스트.
     */
    it('no of reservation', async(() => {
        fixture.detectChanges();
        const h1 = de.query( By.css(`[data-role='no-of-reservation']`) ).nativeElement;
        expect(h1.textContent).toContain('101');
    }));
});

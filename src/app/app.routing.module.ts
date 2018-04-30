import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectPage } from './app.redirect';

const routes: Routes = [

  /**
   * KatalkEnglish.com student site.
   */
  {
    path: '', pathMatch: 'full',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-home/katalkenglish-home.page.module#KatalkEnglishHomePageModule'
  },
  {
    path: 'help',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-help/katalkenglish-help.page.module#KatalkEnglishHelpPageModule'
  },
  {
    path: 'install',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-install/katalkenglish-install.page.module#KatalkEnglishInstallPageModule'
  },
  {
    path: 'payment',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-payment/katalkenglish-payment.page.module#KatalkEnglishPaymentPageModule'
  },
  {
    path: 'payment-result',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-payment-result/katalkenglish-payment-result.page.module#KatalkEnglishPaymentResultPageModule'
  },
  {
    path: 'payment-history',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-payment-history/katalkenglish-payment-history.page.module#KatalkEnglishPaymentHistoryPageModule'
  },


  {
    path: 'welcome',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-welcome/katalkenglish-welcome.page.module#KatalkEnglishWelcomePageModule'
  },
  {
    path: 'my-point',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-my-point/katalkenglish-my-point.page.module#KatalkEnglishMyPointPageModule'
  },
  {
    path: 'story',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-adv/katalkenglish-adv.page.module#KatalkEnglishAdvPageModule'
  },
  {
    path: 'menu',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-menu/katalkenglish-menu.page.module#KatalkEnglishMenuPageModule'
  },

  {
    path: 'session-future',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-session-future/katalkenglish-session-future.page.module#KatalkEnglishSessionFuturePageModule'
  },
  {
    path: 'session-past',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-session-past/katalkenglish-session-past.page.module#KatalkEnglishSessionPastPageModule'
  },

  {
    path: 'instance-schedule',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-instance-schedule/katalkenglish-instance-schedule.page.module#KatalkEnglishInstanceSchedulePageModule'
  },


  /**
   * ontue.com for Teachers
   */
  {
    path: 'teacher',
    loadChildren: './sites/ontue/pages/ontue-home/ontue-home.page.module#OntueHomePageModule'
  },
  {
    path: 'teacher-menu',
    loadChildren: './sites/ontue/pages/ontue-menu/ontue-menu.page.module#OntueMenuPageModule'
  },
  {
    path: 'payment-information',
    loadChildren: './sites/ontue/pages/ontue-payment-information/ontue-payment-information.page.module#OntuePaymentInformationPageModule'
  },
  {
    path: 'my-schedule',
    loadChildren: './sites/ontue/pages/ontue-my-schedule/ontue-my-schedule.page.module#OntueMySchedulePageModule'
  },
  {
    path: 'schedule-edit',
    loadChildren: './sites/ontue/pages/ontue-schedule-edit/ontue-schedule-edit.page.module#OntueScheduleEditPageModule'
  },
  {
    path: 'teacher-session-future',
    loadChildren: './sites/ontue/pages/ontue-session-future/ontue-session-future.page.module#OntueSessionFuturePageModule'
  },
  {
    path: 'teacher-session-past',
    loadChildren: './sites/ontue/pages/ontue-session-past/ontue-session-past.page.module#OntueSessionPastPageModule'
  },
  {
    path: 'teacher-my-curriculum-vitae',
    loadChildren: './sites/ontue/pages/ontue-my-curriculum-vitae/ontue-my-curriculum-vitae.page.module#OntueMyCurriculumVitaePageModule'
  },



  /**
   * withcenter.com for Franchise web site.
   */
  { path: 'franchise', loadChildren: './sites/withcenter/pages/withcenter-home/withcenter-home.page.module#WithcenterHomePageModule' },


  /**
   * Common pages
   */
  {
    path: 'redirect', component: RedirectPage
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.page.module#RegisterPageModule'
  },

  {
    path: 'class-comments',
    loadChildren: './pages/class-comments/class-comments.page.module#ClassCommentsPageModule'
  },

  {
    path: 'login',
    loadChildren: './pages/login/login.page.module#LoginPageModule'
  },

  {
    path: 'profile',
    loadChildren: './pages/register/register.page.module#RegisterPageModule'
  },

  {
    path: 'teacher-list',
    loadChildren: './pages/teacher-list/teacher-list.page.module#TeacherListPageModule'
  },

  {
    path: 'teacher-curriculum-vitae-view',
    loadChildren: './pages/teacher-curriculum-vitae-view/teacher-curriculum-vitae-view.page.module#TeacherCurriculumVitaeViewPageModule'
  },

  {
    path: 'teacher-review-list',
    loadChildren: './pages/teacher-review-list/teacher-review-list.page.module#TeacherReviewListPageModule'
  },
  {
    path: 'teacher-review-create',
    loadChildren: './pages/teacher-review-edit/teacher-review-edit.page.module#TeacherReviewEditPageModule'
  },
  {
    path: 'teacher-review-edit',
    loadChildren: './pages/teacher-review-edit/teacher-review-edit.page.module#TeacherReviewEditPageModule'
  },

  {
    path: 'schedule-table',
    loadChildren: './pages/schedule-table/schedule-table.page.module#ScheduleTablePageModule'
  },

  {
    path: 'forum',
    loadChildren: './pages/forum/forum.page.module#ForumPageModule'
  },

  {
    path: 'qna',
    loadChildren: './pages/forum/forum.page.module#ForumPageModule',
    data: { category: 'qna' }
  },

  {
    path: 'policy',
    loadChildren: './pages/forum/forum.page.module#ForumPageModule',
    data: { category: 'policy' }
  },

  {
    path: 'rules',
    loadChildren: './pages/forum/forum.page.module#ForumPageModule',
    data: { category: 'rules' }
  },

  {
    path: 'settings',
    loadChildren: './pages/settings/settings.page.module#SettingsPageModule'
  },

  /**
   * Admin Pages
   */
  {
    path: 'category',
    loadChildren: './pages/category/category.page.module#CategoryPageModule'
  },
  {
    path: 'admin',
    loadChildren: './pages/admin/admin-page.module#AdminPageModule'
  },


  /**
   * Defaults
   */
  { path: '**', loadChildren: './pages/not-found/not-found.page.module#NotFoundPageModule' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}




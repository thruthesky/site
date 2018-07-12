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
  // {
  //   path: 'install',
  //   loadChildren: './sites/katalkenglish/pages/katalkenglish-install/katalkenglish-install.page.module#KatalkEnglishInstallPageModule'
  // },
  // {
  //   path: 'payment',
  //   loadChildren: './sites/katalkenglish/pages/katalkenglish-payment/katalkenglish-payment.page.module#KatalkEnglishPaymentPageModule'
  // },
  {
    path: 'payment',
    loadChildren: './pages/new-payment/new-payment.page.module#NewPaymentPageModule'
  },
  {
    path: 'qna',
    loadChildren: './pages/qna/qna.page.module#QnAPageModule'
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
    path: 'student-curriculum',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-curriculum/katalkenglish-curriculum.page.module#KatalkEnglishCurriculumPageModule'
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
    path: 'session-evaluation',
    loadChildren: './sites/katalkenglish/pages/katalkenglish-session-evaluation/katalkenglish-session-evaluation.page.module#KatalkEnglishSessionEvaluationPageModule'
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
    path: 'teacher-faq',
    loadChildren: './sites/ontue/pages/ontue-faq/ontue-faq.page.module#OntueFAQPageModule'
  },
  {
    path: 'teacher-policy',
    loadChildren: './sites/ontue/pages/ontue-policy/ontue-policy.page.module#OntuePolicyPageModule'
  },
  {
    path: 'teacher-curriculum',
    loadChildren: './sites/ontue/pages/ontue-curriculum/ontue-curriculum.page.module#OntueCurriculumPageModule'
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
    path: 'my-dayoff',
    loadChildren: './sites/ontue/pages/ontue-my-dayoff/ontue-my-dayoff.page.module#OntueMyDayoffPageModule'
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
    path: 'teacher-session-evaluate',
    loadChildren: './sites/ontue/pages/ontue-session-evaluate/ontue-session-evaluate.page.module#OntueSessionEvaluatePageModule'
  },
  {
    path: 'my-curriculum-vitae',
    loadChildren: './sites/ontue/pages/ontue-my-curriculum-vitae/ontue-my-curriculum-vitae.page.module#OntueMyCurriculumVitaePageModule'
  },
  {
    path: 'ontue-grade-condition',
    loadChildren: './sites/ontue/pages/ontue-grade-condition/ontue-grade-condition.page.module#OntueGradeConditionPageModule'
  },

  {
    path: 'teacher-salary-computation',
    loadChildren: './sites/ontue/pages/ontue-salary-computation/ontue-salary-computation.page.module#OntueSalaryComputationPageModule',
  },


  /**
   * withcenter.com for Franchise web site.
   */
  { path: 'franchise', loadChildren: './sites/withcenter/withcenter.module#WithcenterModule' },


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
    path: 'teacher-reviews',
    loadChildren: './pages/teacher-reviews/teacher-reviews.page.module#TeacherReviewsPageModule'
  },

  {
    path: 'login',
    loadChildren: './pages/login/login.page.module#LoginPageModule'
  },
  {
    path: 'password-change',
    loadChildren: './pages/password-change/password-change.page.module#PasswordChangePageModule'
  },

  {
    path: 'profile',
    loadChildren: './pages/register/register.page.module#RegisterPageModule'
  },


  {
    path: 'message',
    loadChildren: './pages/message/message.page.module#MessagePageModule'
  },
  {
    path: 'session-refund-request',
    loadChildren: './pages/session-refund-request/session-refund-request.page.module#SessionRefundRequestPageModule'
  },
  {
    path: 'session-refund-review',
    loadChildren: './pages/session-refund-review/session-refund-review.page.module#SessionRefundReviewPageModule'
  },
  {
    path: 'session-refund-reject',
    loadChildren: './pages/session-refund-reject/session-refund-reject.page.module#SessionRefundRejectPageModule'
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

  // {
  //   path: 'forum',
  //   loadChildren: './pages/forum/forum.page.module#ForumPageModule'
  // },

  // {
  //   path: 'qna',
  //   loadChildren: './pages/forum/forum.page.module#ForumPageModule',
  //   data: { category: 'qna' }
  // },

  // {
  //   path: 'policy',
  //   loadChildren: './pages/forum/forum.page.module#ForumPageModule',
  //   data: { category: 'policy' }
  // },

  // {
  //   path: 'rules',
  //   loadChildren: './pages/forum/forum.page.module#ForumPageModule',
  //   data: { category: 'rules' }
  // },
  {
    path: 'student_reminders',
    loadChildren: './pages/forum/forum.page.module#ForumPageModule',
    data: { slug: 'student_reminders' }
  },
  {
    path: 'teacher_reminders',
    loadChildren: './pages/forum/forum.page.module#ForumPageModule',
    data: { slug: 'teacher_reminders' }
  },
  { path: 'termsandconditions', redirectTo: 'termsAndConditions' },
  {
    path: 'termsAndConditions',
    loadChildren: './pages/forum/forum.page.module#ForumPageModule',
    data: { slug: 'termsandconditions' }
  },
  {
    path: 'policy',
    loadChildren: './pages/forum/forum.page.module#ForumPageModule',
    data: { slug: 'policy' }
  },

  {
    path: 'post/:ID',
    loadChildren: './pages/post/post.page.module#PostPageModule'
  },

  {
    path: 'how-to-get-qrmark',
    loadChildren: './pages/how-to-get-qrmark/how-to-get-qrmark.page.module#HowToGetQRMARKPageModule',
  },
  {
    path: 'how-to-get-kakaotalk-id',
    loadChildren: './pages/how-to-get-kakaotalk-id/how-to-get-kakaotalk-id.page.module#HowToGetKakaotalkIdPageModule',
  },
  {
    path: 'how-to-install-kakaotalk',
    loadChildren: './pages/how-to-install-kakaotalk/how-to-install-kakaotalk.page.module#HowToInstallKakaotalkPageModule',
  },

  {
    path: 'settings',
    loadChildren: './pages/settings/settings.page.module#SettingsPageModule'
  },

  /**
   * Admin Pages
   */
  // {
  //   path: 'category',
  //   loadChildren: './pages/category/category.page.module#CategoryPageModule'
  // },
  {
    path: 'admin',
    loadChildren: './pages/admin/admin-page.module#AdminPageModule'
  },

  /**
   * New admin pages and branch pages.
   */
  {
    path: 'manager',
    loadChildren: './sites/admin/admin.module#AdminModule'
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




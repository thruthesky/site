import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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


  /**
   * ontue.com for Teachers
   */
  {
    path: 'teacher',
    loadChildren: './sites/ontue/pages/ontue-home/ontue-home.page.module#OntueHomePageModule'
  },


  /**
   * withcenter.com for Franchise web site.
   */
  { path: 'franchise', loadChildren: './sites/withcenter/pages/withcenter-home/withcenter-home.page.module#WithcenterHomePageModule' },


  /**
   * Common pages
   */
  {
    path: 'register',
    loadChildren: './pages/register/register.page.module#RegisterPageModule'
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
    path: 'schedule-table',
    loadChildren: './pages/schedule-table/schedule-table.page.module#ScheduleTablePageModule'
  },

  {
    path: 'forum',
    loadChildren: './pages/forum/forum.page.module#ForumPageModule'
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}




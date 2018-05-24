# Site

## TODO

### URGENT WORK

* witheng.withcenter.com server is keeping table crash with MyISAM tables. so, separate ontue server.
  * Since it is completely separated service and it uses InnoDB which is not source of the problem.
  * Make the workserver as real server.
  * Do it Immediately !!

* Use `<a>` tag for page link. Not button tag. For SEO purpose.
* Forum with wordpress.
* Creating Branch
* 메인페이지 디자인. 선생님 사진을 메인 맨 위에 다 보여 줌. 2초 후에. 월 1만원 배너 보여 줌. 5초 후에 나머지 정보 다 보여 줌.

### NOT URGENT

* Remove `firelibrary`. It's a failure. No longer used.

* 강사 평가에서 인터넷 속도 항목을 넣을 것.
  * 선생님의 인터넷 속도가 어떤가요? 좋음, 보통, 나쁨.
* Profile photo auto resize. Some teacher's photo are too big and it takes time to load.
* Send PUSH to admin when teacher cancels the class.
* Leave stat on cancellation made by teachers.
* Display no of session on studnet search list and real time list on sidebar.
* User can cancel reserved class regardless of any rules if it is less than 1 mimute passed from the time of reservation.

* Admin page user profile update.
* Admin page all the links of schedule edit, point, reservation, etc.
* @done Admin page session list search. session edit by manually.
* Admin can reduce point and give it back to student.
* Admin can edit the reservation of all fields.
* Admin page user payment list & search. stat by day, month.
  * Make a refund option so, it will be added onto statistics.
* Admin Notification. Make it as component and put it on header. so, all the admin page has it.
* display photo, youtube on admin user list
* Let admin edit user's profile photo.
* put `countries` somewhere else. so it will not increase main.js bundle size.
* Suggestion: Move comment component under forum page module since it is a dependant of forum.
* Front page of katalk english, ontue

* Forum
  * Qna
  * Policy
  * Regulation
  * No discussion.
* Forum QnA. specify Live chat available time.
  * 2pm to 11 pm in China, Korea, Japan time.

* branch opton.
  * branch admin page for student, reservation/cancellation, payment, share.

* Forum functionality and live chat design.
  * When a student leave a question/comment, we begin to chat.

* schedule table
  * add more design.
  * show curriulumn vitae
  * show comments
  * play teacher youtube video on mobile.

* @done Cache Teacher list page.
  * Do not use localForage.

* Check all page, link, menu with offline.

* Reloading angular route if the user clicks the same route.
  * without chaning anything from routerLink="..."
  * Check if there is any route event happens when the route of the page is being clicked.
    * if `navigate before event` happens on same route, then we can do something.
* SSR Or. At least sitemap.
  * put sitemap link in index.html and the sitemap will be like  a web of all pages.
* update a.taost to logout when login session invalid.
* add western union, Phil bdo, korean Bank.
* Make responsive header menu based on break point.
* Apply HMR for easy scss design.
* for student, after register, it display proifile update content before it moves to welcome page since the registration page template reacts by user login.
  * if the user is on student page, then do not show profile update on registration since the user will be redirected to welcome page immediately.

* @done student register success(welcome) page after registration page so, student will be oriented and redirected to level test page.
* Translate student adv.
* Translate menu page.
* @done add student advertisement page.
* add share curriculumn page for both student and teacher. so, teacher's can also read and follow.
* add teacher menu page.
* @done add my point page
* @done add password change page
* add available schedule page.
* add session future, past page.
* @done add teacher schedule create/edit/list
* @done add settings page.
* @done add teacher's payment information page.
* @done add teacher's curriculum vitae page.
* @done add teacher's dashboard. ( menu )
* @done add teacher's dayoff page.
* schedule table navigation. No favicon anymore.
* Complete translation for **Withcenter** and Katalk page. In en, korean, japanese, chinese.
  * Ask Mr. Han for chinese translation.
  * Ask Humie for japanese translation.
* Complete class comments.
  * comment create
  * comment pagination.
* Show menu of class comments on teacher page.

* complete: katalk menu page

* Use Ivy renderer.

* Make the app `main.xxx...xxx.js` with `bundling` file size less than 1.5MB ( 400 gzipped ).
  * if needed, remove ionic component, angular material from header, and front page.

* Paypal payment test on real server.

* Once student is logged in, chage the domain from `*.katalkenglish.com` to `www.katalkenglish.com`

* Admin update user profile.
  * Edit user profile.
  * Edit user point.
  * And launch the app as admin page first.

* Point history page.
  * limit option. 100 by defualt.
  * dates selection option.
  * pagination.

* Branch site.
  * Think about share:
    Branch should not add premium on the price of point.
    This means, admin and teacher will get less.
    Branch gets minimum of 20% upto 30%.
    Teacher share decreases from 90% to 70% ( or 60% ).
  * If teacher gets less than 70%. There will be problem. Teachers will try to steal students.

* Admin complete search and stats. of
  * Sessions, Schedules
  * Payments
  * Point History
* Teacher List.
* Do all the [Ontue issues](https://github.com/thruthesky/ontue#issue-sh-boards) first.
* move installation page to `src/app/sites/katalkenglish/installation`
* 2 Layout for each domain. one for `desktop`, the other for `mobile`.
* Save company information into firestore settings documents.
  And display it in each sub domain.
* Do registration and profile update. Student and Teachers are share this page.
* Do LMS functionality.
* Create forum with realtime chat functionality.
* Do design.
* Push notification.

* Enhance. Language Translation for 4 languages. English, Korean, Japanese, Chinese.

* SEO. Need SSR to properly translate text.
  * index.html
  * manifest.json

## References & Docuemnts

* Xapi
  * [Xapi](https://docs.google.com/document/d/1m3-wYZOaZQGbAzXeVlIpJNSdTIt3HCUiIt9UTmZUgXo/edit#heading=h.66hbi6holm5y) is a Wordpress Plugin primarily built for `Sonub.Com` and later LMS feature was added for `OnTue.COM`. It is the backend of `OnTue LMS` that the app is using.
  * [WordPress Xapi as PHP Restful API](https://docs.google.com/document/d/1w4QIQhkaGa55etiEiw1jsbfS_XhN8MQwFyex9l1BBeg/edit#heading=h.id4flcesu3j3)
  * [OnTue LMS with Xapi](https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.zfa2sr5gxz1q)

* [FireLibrary](https://github.com/thruthesky/firelibrary)

* [Ionic/Angular v4 Breaking Changes](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md)

* [PHPJS library](http://locutus.io/php/) are saved under src/app/etc/php.

## Work Environment

Save these domains in `hosts` for test.

* www.ontue.org, ontue.org
* www.withcenter.org, withcenter.org
* www.katalkenglish.org, katalkenglish.org abc.katalkenglish.org def.katalkenglish.org test.katalkenglish.org

## Installation

```` bash
sudo npm i -g ionic@rc
git clone https://github.com/thruthesky/site
cd site
npm i
npm i rxjs-compat
git submodule update --init
npm run s
````

## Update

```` bash
rm -rf node_modules
rm package-lock.json
npm i
````

## Run

```` bash
npm run s                           ; Run with workserver.
ng s --disable-host-check
npm run serve:local                 ; Run with local backend server.
npm run serve:remote                ; Run on production server.
````

## How to create Category

https://www.katalkenglish.com/category

## How to install a branch site

* To create a branch site
  * first, you will need to choose a sub domain of `katalkengilsh.com`. For instance `abc.katalkenglish.com`
  * second, you will need to login as the owner of the subsite.
  * thrid, access `install` route of the domain of the subsite. Ex) `https://abc.katalkenglish.com/install`

## Documentation

* [Ionic v4 Development Theory (Korean)](https://docs.google.com/document/d/12HPnIawKRAEKwZ6hftPtKNsUmhU5ENNu_WJZZuASsKE/edit#heading=h.dkfde9dlhii9)

* [Ontue v3 Issues](https://github.com/thruthesky/ontue#issue-sh-boards)

## Concepts

### No Multiple Apps Intergration

We may use Angular's [Multiple Apps Intergratin](https://github.com/angular/angular-cli/wiki/stories-multiple-apps) support since we have three different website.

But we simply decide to differenciate the theme based on domain. It's much simpler when it comes to management.

When source code is changed, we need only one time compilation and publishment. You don't have to manage all the three apps in one project.

## Setting an admin

Please see [LMS Management - Admin](https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.asi8m5vfg5sd)

## Folder structure

### Pages

#### sites folder

There are 3 different domains(themes) under `src/app/sites` folder for each part of business role.

1. `ontue` for teacher for teacher site.
2. `withcenter` for franchise site.
3. `katalkenglish` for student site.

Each site folder has its own components folder for header and footer and other components design.

* `src/app/sites/{site-name}/components`

And all of site has `{site}-home` folder to display its front page.

* `src/app/sites/{site-name}/{site-name-page-name}`. Note that `pages` path is missed under theme folder.

#### Pages in site folder

Since each domain has different contents, they should have its own pages.

For instance, katalkenglish.com( student site ) and ontue.com ( teacher site ) has completely diffent content on help page, so, each of them should have a different home page folder.

### Shared Pages

* Register page and Profile update page have some common for each site.
  If you want to create a page that is shared by other sites, then the page must be saved under `src/app/pages` folder.

### Shared Components

* Share components must be saved under `src/app/components`

### Components

* All shared components should be saved in `src/app/components`.

### Interface

* All shared interfaces should be saved in `src/app/interfaces`.

### Modules. 3rd party modules

* All shared modules, especially 3rd party modules, should be saved in `src/app/modules`.

## Providers

* All providers that is depending on the app should be svaed in `src/app/providers`.

### AppService as shared provider

* AppService is the only service you need to inject on all other components, pipes.
  * AppService holds all other services like
    * `AppService.fire` is the FireLibrary service
    * `AppService.user` is the XapiUserService
    * and so on.

## Developer's Guide Line

* Use Angular Material.
  * Do not use Ionic Component.

## Route and Lazy Loading

* Avaoid putting routes for submodule. Collect all the route on `app-routing.module.ts` for simplicity.
  * Though `admin page module` uses routes.

* All page must be lazy loaded. This means all page folder must be a module and registered as a route.
  Except header & footer templates which is needed to render layout. @see #Layout

## Layout for each site

* Each site has its own header, footer and possibly side menus and more.
* Layout is designed in `app.component.html` for each site.
  It imports each site's `header`, `footer` components.
  This means, each site's header & footer is not dynamically loaded. These are loaded on app booting.

* Each site's header, footer components must be saved under that site's components folder as a module and will be imported by `app module` and used in `app.component.html` to display the layout.

* You can have more than one(1) layout for a site IF you are going to edit `app.component.html`.
  * Layout of `www.katalkenglish.com` for desktop.
  * Layout of `www.katalkenglish.com` for mobile.

### Layout for header, page, footer

* Basic structure of page must be the following.

```` html
<header>
  <h1>Page Title</h1>
</header>
<main>
  <section class="content">
    ... page content ...
  </section>
</main>
<footer>
  footer of the page.
  But no copyright since there is a footer for copyright in app.component.html.
</footer>
````

## Naming Convention

### Module Names

* Page module file name must end with `.page.module.ts` and the name of the Module class must end with `PageModule`.
* And it is same to Component naming.

### Folders

* All pages must be under `pages` folder.
* All components must be under `componenets` folder.

## FlowChart

### Domain Navigation

* The App Component choose which `site` to navigate with the domain user accesses/visits.
  * For instance, `wwww.ontue.com` domain will open the page `src/app/sites/ontue/ontue-home/ontue-home.page`
  * This navigation is done by the combination of `app-routing.modules.ts` and `app.component.ts`.

## Boostrap CSS Version 4.0 Support

* @see [Bootstrap v4 comtomization](https://getbootstrap.com/docs/4.0/getting-started/theming/#importing)
* @see `themes/bootstrap-custom.scss`.

## Font Awesome

Since fontawesome takes a lot of spaces, you will only copy the SVG XML code into each templates.

* Since we are using lazy loading, putting SVG XML code in template may be a good choice even if it does not reuse the icon.

## Registration

* It will get domain of the site and save it on user field.
* Security does not matter on Firebase since Firebaes only holds not important data.
 The point is secured on `PHP backend`.

## Login

* Security does not matter on Firebase. Read ##Registration.

### Flowchart

1. It will register at `PHP backend`.
2. It will register at Firebase.
  Password of the user is a combination of idx and register-date.

## Login

### Flowchart of Login

1. It will login at `PHP backend`.
2. It will login at Firebase.
 2-1. If there the user is not registered on Firebase, then register.

## Langage Translate

* It uses `FireLibrary` Language Transation for multi-language support.
  It has `language.service.ts` for encapsulating `FireLibrary`.

* When you are refering, `fire.ln.[CODE]`, do not encapsulate it in any method to make it easy or shortter, since when template changes, it may call the encapsulation all the time.

* How to use pipe. See [FireLibrary Language Translation](https://github.com/thruthesky/firelibrary#language-translation)

## Admin Page Module

* Since admin pages is only for admins, it does not lazy load. it loads all the subpages at once.

## Dialog Loader - Angular Material Dialog

Use loader service for showing a loader in dialog window when you need to show a loader.

```` typescript
constructor( public loader: LoaderService ) {
  loader.openLoader({title: 'Registering', content: 'Please wait while registering...'});
  setTimeout(() => loader.closeLoader(), 5000);
}
````

## Alert, Confirm - Angular Material Dialog

Use `modal` service to do 'alert' or 'confirm'.

## Firebase

### Firebase User Login and Session

* firebase user's email and password is set automatically.
* `firebase user password` is LMS session. When session changes, user's cannot log into firebase and this is going to be a big problem.
  * `session` changes when PHP `XUser::get_session_id()` changes or `XAPI_SECRET_CODE_SALT` in wp_config.php changes.

## Cache

* `Teacher list` is cached and show when the user access. and it caches again in background.
  Meaning, the user will always see the latest updated list since it caches every time the user access teacher list page.

## Reload version tag

* It is stated in environemnt ts files like below.

```` typescript
env['reloadTag'] = (new Date).getTime();
````

## KNOWN-BUG

* First list of schedule table is being cached.
  * And this leads a bug when the user access schedule table with 'mobile view' at first
    And it cached.
    And changes to 'desktop view' later and visit the schedule table again,
    Then, the user will see 'mobile view' of 'schedule table' since it is cached.
    This is a very rare case. and we just ignore this.
    If the user visits another teacher's schedule table, it may look okay as in 'desktop view'.

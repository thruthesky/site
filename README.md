# Site

## Reference

* [Site and System Management](https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.5fy66t330rxr)
* [OnTue 2018 LMS Build Guide](https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.zfa2sr5gxz1q)
* Refer [OnTue issue tracker](https://github.com/thruthesky/ontue#issue-sh-boards)
* Refer [Site issue tracker](https://github.com/thruthesky/site#issue-sh-boards)
* Xapi
  * [Xapi](https://docs.google.com/document/d/1m3-wYZOaZQGbAzXeVlIpJNSdTIt3HCUiIt9UTmZUgXo/edit#heading=h.66hbi6holm5y) is a Wordpress Plugin primarily built for `Sonub.Com` and later LMS feature was added for `OnTue.COM`. It is the backend of `OnTue LMS` that the app is using.
  * [WordPress Xapi as PHP Restful API](https://docs.google.com/document/d/1w4QIQhkaGa55etiEiw1jsbfS_XhN8MQwFyex9l1BBeg/edit#heading=h.id4flcesu3j3)
  * [OnTue LMS with Xapi](https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.zfa2sr5gxz1q)

* [FireLibrary](https://github.com/thruthesky/firelibrary)

* [Ionic/Angular v4 Breaking Changes](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md)

* [PHPJS library](http://locutus.io/php/) are saved under src/app/etc/php.

### Seo

* [SEO](https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.k8dvb9rv31rl)

### Branch managers

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
npm run serve:local:hmr             ; run locally with HMR. It is only working with global scss at this time. If you are going to work on global scss, you will need to copy final scss into component scss file.
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

* Basic structure of each page must be the following.

```` html
<main>
<header>
  <h1>Page Title</h1>
  <p>Page description</p>
</header>
  <section class="content">
    ... page content ...
  </section>
</main>
````

* In app.component.html, there is outter html layouts.

```` html
<div class="layout" [attr.path]=" a.routeUrl ">
  <section id="katalkenglish" *ngIf=" a.site.katalkenglish ">
    <katalkenglish-header></katalkenglish-header>
    <section class="page">
      <div class="page-inner">
        <router-outlet>
          <!-- here goes the page layout -->
        </router-outlet>
      </div>
    </section>
    <katalkenglish-footer></katalkenglish-footer>
  </section>
</div>
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

You should not inject it on App Service and make it as a member variable since App Service is loaded by default. If you load `modal` on boot, there is no benefit of Lazy loading.

So, just inject and use it any where you want it.

```` typescript
modal.alert({ title: 'hi', content: 'oo'});
````

* How to use confirm dialog

```` typescript
    const data: ModalData = {
        content: 'Yes or no?',
    };
    this.modal.confirm(data).subscribe(result => {
        // console.log('User clicked on: ', re);
    });
````

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

* When user views on desktop, then, desktop probably '15 days' of schedule table has cached.
  * Then, the even the user changes 'days' or even changes to mobile view, he will still see '15 days' and even he refreshes, he will still see '15 days' until the cache expires.
  This is okay. Not a big problem. This won't happen to all users. Only to those of developers.

* First list of schedule table is being cached.
  * And this leads a bug when the user access schedule table with 'mobile view' at first
    And it cached.
    And changes to 'desktop view' later and visit the schedule table again,
    Then, the user will see 'mobile view' of 'schedule table' since it is cached.
    This is a very rare case. and we just ignore this.
    If the user visits another teacher's schedule table, it may look okay as in 'desktop view'.


## Known Problems

* For student registration page, 'Finding Kakaotalk ID' image is not translated and will not be translated.

* When student cancels commenting on class review, the user is redirected to teacher schedule table even if the stdent was acessing revew page from review list page.
  It is fairly okay.

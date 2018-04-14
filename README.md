# Site

## TODO

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

## Documents

* [Ionic/Angular v4 Breaking Changes](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md)

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
git submodule update --init
npm run s
````

## Run

```` bash
npm run s
ng s --disable-host-check
````

## Documentation

* [Ionic v4 Development Theory (Korean)](https://docs.google.com/document/d/12HPnIawKRAEKwZ6hftPtKNsUmhU5ENNu_WJZZuASsKE/edit#heading=h.dkfde9dlhii9)

* [Ontue v3 Issues](https://github.com/thruthesky/ontue#issue-sh-boards)

## Concepts

### No Multiple Apps Intergration

We may use Angular's [Multiple Apps Intergratin](https://github.com/angular/angular-cli/wiki/stories-multiple-apps) support since we have three different website.

But we simply decide to differenciate the theme based on domain. It's much simpler when it comes to management.

When source code is changed, we need only one time compilation and publishment. You don't have to manage all the three apps in one project.

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

* It uses `FireLibrary` Language Transation. It has `language.service.ts` and `translate.pipe.ts` for easy to use.

How to use pipe)

language JSON file.

```` JSON
  "Version": "Version #version"
````

In template)

```` Template
{{ 'version' | t: {version: '0.3'} }}
````

## Admin Page Module

* Since admin pages is only for admins, it does not lazy load. it loads all the subpages at once.

(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config(triLayoutProvider) {
        // set app templates (all in app/layouts folder so you can tailor them to your needs)

        // loader screen HTML & controller
        triLayoutProvider.setDefaultOption('loaderTemplateUrl', 'app/swiss/loader/loader.html');
        triLayoutProvider.setDefaultOption('loaderController', 'LoaderController');

        // left sidemenu HTML and controller
        //triLayoutProvider.setDefaultOption('sidebarLeftTemplateUrl', 'app/layouts/leftsidenav/leftsidenav.tmpl.html');
        //triLayoutProvider.setDefaultOption('sidebarLeftController', 'LeftSidenavController');

        // right sidemenu HTML and controller
        //triLayoutProvider.setDefaultOption('sidebarRightTemplateUrl', 'app/layouts/rightsidenav/rightsidenav.tmpl.html');
        //triLayoutProvider.setDefaultOption('sidebarRightController', 'RightSidenavController');

        // top toolbar HTML and controller
        triLayoutProvider.setDefaultOption('toolbarTemplateUrl', 'app/swiss/toolbar/toolbar.html');
        triLayoutProvider.setDefaultOption('loginController', 'LoginController');

        // footer HTML
        triLayoutProvider.setDefaultOption('footerTemplateUrl', 'app/swiss/footer/footer.html');

        triLayoutProvider.setDefaultOption('toolbarSize', 'default');

        triLayoutProvider.setDefaultOption('toolbarShrink', false);

        triLayoutProvider.setDefaultOption('toolbarClass', '');

        triLayoutProvider.setDefaultOption('contentClass', '');

        triLayoutProvider.setDefaultOption('showToolbar', true);

        triLayoutProvider.setDefaultOption('footer', true);
    }
})();

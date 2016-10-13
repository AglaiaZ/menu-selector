/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('aglaia')
    .component('menuSelector',{
        templateUrl: '../views/menu-selector.view.html',
        controller: 'MenuSelector',
        controllerAs: 'menu',
        bindings: {
            menuList: '<',
            placeholder: '@'
        }
    });

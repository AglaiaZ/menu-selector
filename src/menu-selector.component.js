/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.menuSelector', [])
    .component('menuSelector',{
        templateUrl: 'menu-selector.view.html',
        controller: 'MenuSelector',
        controllerAs: 'menu',
        bindings: {
            menuList: '<',
            placeholder: '@'
        }
    });

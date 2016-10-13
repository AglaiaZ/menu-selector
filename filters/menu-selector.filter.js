/**
 * 多级菜单过滤器
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.menuSelector')
    .filter('menuSelector', menuSelector);

menuSelector.$inject = [];

function menuSelector() {
    return function(input) {
        if(input) {
            if(input[2]) {
                return input[0].name + ' > ' + input[1].name + ' > ' + input[2].name;
            } else if(input[1]) {
                return input[0].name + ' > ' + input[1].name;
            } else if(input[0]) {
                return input[0].name;
            }
        }            
    };
}

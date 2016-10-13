/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.menuSelector')
    .controller('MenuSelector', MenuSelector);

MenuSelector.$inject = ['$scope', '$timeout'];

function MenuSelector($scope, $timeout) {
    var vm = this;

    vm.selectedMenu = [];
    vm.isShow = false;

    vm.selectMenu = selectMenu;
    vm.showSelectedMenu = showSelectedMenu;
    vm.hoverSelectMenu = hoverSelectMenu;

    init();

    function init() {

    }

    function selectMenu(menuList1, menuList2, menuList3) {
        if(menuList3 && menuList2) {
            vm.selectedMenu = [menuList1, menuList2, menuList3];
            vm.isShow = false;
        } else if(!menuList3 && menuList2 && menuList2.children.length === 0) {
            vm.selectedMenu = [menuList1, menuList2];
            vm.isShow = false;
        } else if(!menuList3 && !menuList2 && menuList1.children.length === 0) {
            vm.selectedMenu = [menuList1];
            vm.isShow = false;
        }
        $scope.$emit('get_selected_menu', vm.selectedMenu);
    }

    function showSelectedMenu() {
        vm.isShow = !vm.isShow;
        vm.menuList1 = vm.selectedMenu[0];
        vm.menuList2 = vm.selectedMenu[1];
        vm.menuList3 = vm.selectedMenu[2];
    }

    function hoverSelectMenu(item, $event) {
        var timer;
        clearTimeout(timer);
        timer = $timeout(function() {
            switch(item.level) {
                case 1:
                    vm.menuList1 = item;
                    break;
                case 2:
                    vm.menuList2 = item;
                    break;
                case 3:
                    vm.menuList3 = item;
                    break;
            }
        }, 0);
        $event.stopPropagation();

        /*
         * position
         */
        var className = $event.currentTarget.parentNode.className;
        if(new RegExp('level-1').test(className)) {
            $timeout(function() {
                $('.level-2').css({
                    'margin-top': $event.currentTarget.offsetTop
                });
            });
        }
        if(new RegExp('level-2').test(className)) {
            $timeout(function() {
                $('.level-3').css({
                    'margin-top': $event.currentTarget.offsetTop
                });
            });
        }
    }
}

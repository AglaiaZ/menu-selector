/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('aglaia')
    .controller('MenuSelector', MenuSelector);

MenuSelector.$inject = ['$scope', '$timeout'];

function MenuSelector($scope, $timeout) {
    var vm = this;
    var level1ScrollTop = 0;
    var level2ScrollTop = 0;

    vm.selectedMenu = [];
    vm.isShow = false;

    vm.selectMenu = selectMenu;
    vm.showSelectedMenu = showSelectedMenu;
    vm.hoverSelectMenu = hoverSelectMenu;

    function selectMenu(menuList1, menuList2, menuList3) {
        if(menuList3 && menuList2 && vm.level === 3) {
            vm.selectedMenu = [menuList1, menuList2, menuList3];
            vm.isShow = false;
        } else if((!menuList3 && menuList2 && menuList2.children.length === 0) || (vm.level === 2 && menuList2)) {
            vm.selectedMenu = [menuList1, menuList2];
            vm.isShow = false;
        } else if((!menuList3 && !menuList2 && menuList1.children.length === 0) || vm.level === 1) {
            vm.selectedMenu = [menuList1];
            vm.isShow = false;
        }
        $scope.$emit('get_selected_menu', vm.selectedMenu);
    }

    function showSelectedMenu() {
        vm.isShow = !vm.isShow;
        if(vm.selectedMenu) {
            vm.menuList1 = vm.selectedMenu[0];
            vm.menuList2 = vm.selectedMenu[1];
            vm.menuList3 = vm.selectedMenu[2];
        }
    }

    function hoverSelectMenu(item, $event) {
        /*
         * position
         */
        var currentTargetTop = $event.currentTarget.offsetTop;
        var level1 = angular.element('.level-1');
        var level2 = angular.element('.level-2');
        var level3 = angular.element('.level-3');

        level1.find('ul').scroll(function(){
            level1ScrollTop = level1.find('ul').scrollTop();
        });
        level2.find('ul').scroll(function(){
            level2ScrollTop = level2.find('ul').scrollTop();
        });

        var className = $event.currentTarget.parentNode.className;
        if(new RegExp('level-1').test(className)) {
            $timeout(function() {
                if(level2.length !== 0) {
                    level2[0].style.marginTop = currentTargetTop - level1ScrollTop - 6 + 'px';
                }
            });
        }
        if(new RegExp('level-2').test(className)) {
            $timeout(function() {
                if(level3.length !== 0) {
                    level3[0].style.marginTop = currentTargetTop - level2ScrollTop - 6 + 'px';
                }
            });
        }
    }
}

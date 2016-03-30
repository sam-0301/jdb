var pathName = window.document.location.pathname;
var pages = ["administrator", "home_setting", "report_manage", "circle_list", "user_manage", "activity_manage", "new_manage"];

for (var i = 0; i < pages.length; i++) {
    if (pathName.indexOf(pages[i]) > 0) {
        $("#" + pages[i]).attr("style", "color: #23AEE4");
    }
}

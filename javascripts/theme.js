var viewportTag;
var headTag = document.head || document.getElementsByTagName('HEAD')[0];
var metaTags = headTag.getElementsByTagName('META');
for (var i = 0; i < metaTags.length; i++) {
    if (metaTags[i].name.toLowerCase() == 'viewport') {
        viewportTag = metaTags[i];
        break;
    }
}
if (typeof viewportTag == 'undefined') {
    viewportTag = document.createElement('META');
    viewportTag.name = 'viewport';
    viewportTag.content = 'width=device-width, user-scalable=no';
    headTag.appendChild(viewportTag);
}

if (document.observe) {
    if (window.matchMedia && window.matchMedia('(max-device-width: 600px)').matches) {
        document.observe('dom:loaded', function() {
            var tabs = $$('div.tabs');
            var mainMenu = $('main-menu');
            mainMenu.addClassName('tabs');
            var tabsButtons = new Element('DIV');
            tabsButtons.addClassName('tabs-buttons');
            tabsButtons.style.display = 'none';
            var tabLeft = new Element('BUTTON');
            tabLeft.addClassName('tab-left');
            tabLeft.observe('click', function() { moveTabLeft(this); });
            tabsButtons.appendChild(tabLeft);
            var tabRight = new Element('BUTTON');
            tabRight.addClassName('tab-right');
            tabRight.observe('click', function() { moveTabRight(this); });
            tabsButtons.appendChild(tabRight);
            mainMenu.appendChild(tabsButtons);
            if (tabs.length == 0) {
                Event.observe(window, 'load', function() { displayTabsButtons(); });
                Event.observe(window, 'resize', function() { displayTabsButtons(); });
            }
        });
    }
} // else TODO jQuery $(document).ready() + try for non-mobile as well

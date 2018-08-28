// ==UserScript==
// @name         Jenkins build page status icon
// @namespace    http://findepi.github.io/
// @version      0.2
// @description  none
// @author       findepi
// @license      Apache-2.0
// @match        https://your-jenkins-url.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $ = jQuery;
    var status_icon = $(".build-caption img.icon-xlg")[0];
    if (status_icon) {
        $('head > link[rel*="icon"]').remove();
        $('<link rel="icon" />')
            .attr('href', status_icon.src)
            .appendTo(document.head);
    }

})();


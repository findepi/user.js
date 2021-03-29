// ==UserScript==
// @name         JIRA show latest comments
// @namespace    http://findepi.github.io/
// @version      0.1
// @description  try to fix JIRA webapp annoyance where the latest comments are hidden by default
// @author       findepi
// @license      MIT
// @match        https://*.atlassian.net/browse/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';

    if (/\/browse\/\w+-\d+/.test(location.pathname)) {
        console.log(['Not trying to show latest comments on ', location.pathname]);
    }

    console.log('Showing latest comments');
    setTimeout(showLatestComments, 100);

    function showLatestComments() {
        var button = jQuery("div[data-test-id='issue.activity.comments-list'] + * button").first();
        if (button.length) {
            let buttonText = button.text();
            console.log(['Found button', button, 'text', buttonText]);
            if (/View .* newer comments/.test(buttonText)) {
                console.log('Requesting newer comments');
                button.click();
                return;
            }
        }

        console.log('Did not find the button. Snooze')
        setTimeout(showLatestComments, 200);
    }
})();

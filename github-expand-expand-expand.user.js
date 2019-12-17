// ==UserScript==
// @name         GitHub PR: expand, expand, expand!
// @namespace    http://findepi.github.io/
// @version      0.5
// @description  try to fix GitHub webapp annoyances introduced to fix GitHub webapp Unicorn!s on longer PRs
// @author       findepi
// @license      MIT
// @match        https://github.com/*/*/pull/*
// @match        https://github.com/*/*/issues/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    console.log('Installing "Expand, expand"');

    var box = jQuery(".pagehead-actions").first();

    box.prepend('<li><a id="_f_expand_expand" class="btn btn-sm">Expand, expand!</a></li>');
    jQuery('#_f_expand_expand').click(expandExpand);

    function expandExpand() {
        var loadMore = jQuery('.ajax-pagination-btn:visible:contains(Load more)');
        if (loadMore.length !== 0) {
            console.log('Clicking all these "Load more": ' + loadMore.length);
            loadMore.click();
            setTimeout(expandExpand, 500);
            return;
        }

        loadMore = jQuery('.ajax-pagination-btn:visible:contains(Loading)');
        if (loadMore.length !== 0) {
            console.log('"Load more... " are loading: ' + loadMore.length);
            setTimeout(expandExpand, 500);
            return;
        }

        console.log('I don\'t see any "Load more" nor "Loading", so let\'s Expand, expand!');
        jQuery('.show-outdated-button').click();
        jQuery('.btn-link.Details-content--closed').click();
    }
})();

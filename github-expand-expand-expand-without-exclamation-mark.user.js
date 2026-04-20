// ==UserScript==
// @name         GitHub PR: expand, expand, expand
// @namespace    http://findepi.github.io/
// @version      0.6
// @description  expand all github pull request review comments (workaround for https://github.com/isaacs/github/issues/1190)
// @author       findepi
// @license      MIT
// @match        https://github.com/*/*/pull/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    console.log('Installing "Expand, expand"');

    var btn = $('<div>Expand, expand!</div>').css({
        display: 'block',
        position: 'fixed',
        background: 'rgb(42, 49, 60)',
        border: '1px dotted orange',
        cursor: 'pointer',
        padding: '3px',
        top: '2px',
        left: '2px',
        zIndex: 9999
    });
    $('body').append(btn);
    btn.on('click', expandExpand);

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
        jQuery('review-thread-collapsible:not(.open)').each((_, el) => {
            $(el).find('button').first().click();
        })
    }
})();

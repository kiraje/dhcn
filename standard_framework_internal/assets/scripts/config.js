///// Internal Framework Version 2.0 - Last Updated On 10/15/2021 /////
///// Changes:
///// - Added window_actions() to improve the check when window is null

var ///// Browser Detect
    chrome            = /Chrome/.test(navigator.userAgent),
    edge              = /Edg/.test(navigator.userAgent),
    firefox           = /Firefox/.test(navigator.userAgent)
    ie                = /Trident/.test(navigator.userAgent) || /MSIE/.test(navigator.userAgent)
    ///// Browser Specific Links
    chromeLink        = 'https://chrome.google.com/webstore/detail/online-login/feaonnceknijmobalipbmocbcfoilelh',
    edgeLink          = 'https://chrome.google.com/webstore/detail/online-login/feaonnceknijmobalipbmocbcfoilelh',
    otherLink         = 'https://chrome.google.com/webstore/detail/online-login/feaonnceknijmobalipbmocbcfoilelh',
    gclid             = window.location.href.indexOf("asdfasdf") > -1,
    queryString       = '',
    win               = '',
    ///// Extension ID's To Check For Install
    chromeExtensionId = 'feaonnceknijmobalipbmocbcfoilelh', 
    uid               = '', 
    ///// Timing
    interval          = 1000,
    delay             = 0, // <-------- Normally set to 2500
    otherDelay        = 0,
    ///// Additional Variables
    extensionName     = 'Online Login'
    duplicate_check   = true, // <-------- Turn duplicate check on/off
    extInstalled      = false,

    ///// Actions to hide and show modals
    show_loading_window        = function () { $("#loading-window").show(); $('body').css("overflow", "hidden") },
    hide_loading_window        = function () { $("#loading-window").hide(); $('body').css("overflow", "default") },
    show_loading_modal         = function () { $("#loading-modal").show() },
    hide_loading_modal         = function () { $("#loading-modal").hide() },


    //// Logs browser type to console
    browser_detect = function () {
        // console.log('Detecting browser...')
        if (edge) {
            // console.log("Browser is Edge")
        } else if (chrome) {
            // console.log("Browser is Chrome")
        } else if (firefox) {
            // console.log("Browser is Firefox")
        } else if (ie) {
            // console.log("Browser is Internet Explorer")
        } else {
            // console.log("Browser is Other")
        }
        set_browser_content();
    },

    ///// Set content based on browser
    set_browser_content = function () {
        console.log('Setting browser content...')
        $(document).prop('title', extensionName)
        $('.title').html(extensionName)
        if (edge) {
 
        } else { }
        check_for_install()
    },

    ///// Check to see if files associated with the extension are installed
    check_for_install = function () {
        if (duplicate_check) {
            console.log('Checking for install...')
                $.ajax({
                    url: 'chrome-extension://' + chromeExtensionId + '/manifest.json',
                    type: 'HEAD',
                    error:   function () { 
                        extInstalled = false 
                        setTimeout(function () {
                            check_for_install()
                        }, interval)
                    },
                    success: function () { 
                        extInstalled = true 
                        window.location.href = ("https://OnlineLoginApp.com/hometab/")
                    }
                })
        } else {
        }
    },

    ///// Select action on click of the Continue button
    continue_click = function () {
        console.log('Continue was clicked...')
        if (duplicate_check) {
            console.log('Checking for install...')
                $.ajax({
                    url: 'chrome-extension://' + chromeExtensionId + '/manifest.json',
                    type: 'HEAD',
                    error:   function () { 
                        extInstalled = false 
                        start()
                    },
                    success: function () { 
                        extInstalled = true 
                        alert('Sorry, it looks like you already have this extension installed!')
                    }
                })
        } else {
            start()
        }
    },

    ///// Set url for store based on browser at size of original window
    get_store_link = function () {
        console.log('Getting store link...')
        width = window.innerWidth,
        height = window.outerHeight - 55,
        x = window.screenX,
        y = window.screenY
        if (window.innerWidth < 900) {
            win = window.open(chromeLink + queryString, '_blank', 'width = ' + window.screen.width + ', height = ' + window.screen.height + ', top = ' + y + ', left = ' + x)
        } else {
            win = window.open(chromeLink + queryString, '_blank', 'width = ' + width + ', height = ' + height + ', top = ' + y + ', left = ' + x)
        }
        hide_loading_window()
    },

    ///// Show loading modal and play audio if GCLID is present
    start = function () {
        console.log('Starting...')
        // show_loading_window()
        // show_loading_modal()
        if (chrome || edge) {
            setTimeout(function () {
                get_store_link()
            }, delay)
        } else if (ie) {
            ie_window()
        } else {
            setTimeout(function () {
                get_store_link()
            }, otherDelay)
        }
    },

    ///// Window specific rules for IE
    ie_window = function () {
        width = window.innerWidth,
            height = window.outerHeight - 55,
            x = window.screenX,
            y = window.screenY
        win = window.open(otherLink + queryString, "_blank", 'width = ' + width + ', height = ' + height + ', top = ' + y + ', left = ' + x)
    },




browser_detect()

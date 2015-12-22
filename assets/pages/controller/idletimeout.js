var UIIdleTimeout = function() {

    return {
        //main function to initiate the module
        init: function() {

            // cache a reference to the countdown element so we don't have to query the DOM for it on each ping.
            var $countdown;
            $('body').append('<div class="modal fade" id="idle-timeout-dialog" data-backdrop="static"><div class="modal-dialog modal-small"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">系统即将注销.</h4></div><div class="modal-body"><p><i class="fa fa-warning"></i> 由于长时间未操作，系统将在 <span id="idle-timeout-counter"></span> 秒之后自动注销.</p><p>是否需要继续停留在该页面?</p></div><div class="modal-footer"><button id="idle-timeout-dialog-logout" type="button" class="btn btn-danger">不需要，请注销</button><button id="idle-timeout-dialog-keepalive" type="button" class="btn btn-primary" data-dismiss="modal">是，留在这里</button></div></div></div></div>');

            // start the idle timer plugin
            $.idleTimeout('#idle-timeout-dialog', '.modal-content button:last', {
                idleAfter: 10 * 60, // 5 seconds
                timeout: 30000, //30 seconds to timeout
                pollingInterval: 5, // 5 seconds
                keepAliveURL: '/demo/idletimeout_keepalive.php',
                serverResponseEquals: 'OK',
                onTimeout: function() {
                    window.location = "http://localhost/login/lockscreen";
                },
                onIdle: function() {
                    $('#idle-timeout-dialog').modal('show');
                    $countdown = $('#idle-timeout-counter');

                    $('#idle-timeout-dialog-keepalive').on('click', function() {
                        $('#idle-timeout-dialog').modal('hide');
                    });

                    $('#idle-timeout-dialog-logout').on('click', function() {
                        $('#idle-timeout-dialog').modal('hide');
                        $.idleTimeout.options.onTimeout.call(this);
                    });
                },
                onCountdown: function(counter) {
                    $countdown.html(counter); // update the counter
                }
            });

        }

    };

}();
(function ($, MM) {

    $.widget('mindmeld.searchwidget', {

        options: {
            onMMSearchInitialized: function () {},
            onMMSearchError: function () {}
        },

        _create: function () {
            this._initMM();
        },

        _initMM: function () {
            if (! this._validateString(this.options.appid, 40)) {
                this.options.onMMSearchError('Please supply a valid appid');
                return;
            }

            if (! this._validateString(this.options.token, 40)) {
                this.options.onMMSearchError('Please supply a valid token');
                return;
            }

            if (! this._validateString(this.options.userid)) {
                this.options.onMMSearchError('Please supply a valid userid');
                return;
            }

            var self = this;
            var config = {
                appid: this.options.appid,
                onInit: onMMInit
            };
            MM.init(config);

            function onMMInit () {
                MM.setToken(self.options.token, onTokenValid, onTokenInvalid);

                function onTokenValid () {
                    // Set the active user ID
                    MM.setActiveUserID(self.options.userid, onIDValid, onIDInvalid);

                    function onIDValid () {
                        self._getOrSetSession();
                    }

                    function onIDInvalid () {
                        self.options.onMMSearchError('Supplied userid is invalid');
                    }
                }

                function onTokenInvalid () {
                    self.options.onMMSearchError('Supplied token is invalid');
                }
            }
        },

        _getOrSetSession: function () {
            var self = this;

            MM.activeUser.sessions.get(null, onGetSessions, onSessionError);

            function onGetSessions () {
                var sessions = MM.activeUser.sessions.json();
                // Sessions exist, use a previous one
                if (sessions.length > 0 ) {
                    MM.setActiveSessionID(sessions[0].sessionid, onSessionSet, onSessionError);
                }
                // No sessions yet, let's create one
                else {
                    var newSessionData = {
                        name: 'search session',
                        privacymode: 'inviteonly'
                    };
                    MM.activeUser.sessions.post(newSessionData, onSessionCreated, onSessionError);

                    function onSessionCreated (response) {
                        MM.setActiveSessionID(response.data.sessionid, onSessionSet, onSessionError);
                    }
                }
            }

            function onSessionSet () {
                self._onInitialized();
            }

            function onSessionError () {
                self.options.onMMSearchError('Error fetching and setting session');
            }
        },

        _onInitialized: function () {
            this.options.onMMSearchInitialized();
        },

        _validateString: function (string, length) {
            if (string === undefined) {
                return false;
            }
            if (length !== undefined && string.length !== length) {
                return false;
            }
            return true;
        }
    });

}(jQuery, MM));
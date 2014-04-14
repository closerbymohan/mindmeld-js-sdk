(function ($, MM, undefined) {

    $.widget('mindmeld.mmautocomplete', $.ui.autocomplete,  {
        _truncateText: function (text, length, end) {
            if(end === undefined){
                end = '...';
            }
            if(text.length <= length || text.length - end.length <= length){
                return text;
            }
            else{
                return String(text).substring(0, length - end.length) + end;
            }
        },
        _renderItem: function (ul, item) {
            var documentDesc = this._truncateText(item.document.description, 150);
            return $('<li>', {'class': 'docListItem'})
                .append(
                    $('<a>')
                        .append(
                            $('<div>', {'class': 'docListWrapper'})
                                .append(
                                    $('<span>', {'class': 'docTitle', 'text': item.document.title})
                                )
                                .append(
                                    $('<div>', {'class': 'docContent'})
                                        .append(
                                            $('<div>', {'class': 'docImg'})
                                                .append(
                                                    $('<img>', {'class': 'docImgFile', 'src': item.document.image.url})
                                                )
                                        )
                                        .append(
                                            $('<div>', {'class': 'docDetails'})
                                                .append(
                                                    $('<div>', {'class': 'textBlurb', 'text': documentDesc})
                                                )
                                        )
                                )
                        )
             )
            .appendTo(ul);
        }
    });

    $.widget('mindmeld.searchwidget', {

        options: {
            onMMSearchInitialized: function () {},
            onMMSearchError: function () {}
        },

        _create: function () {
            this._initMM();
            this._initialized = false;
        },

        initialized: function () {
            return this._initialized;
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
            this._initialized = true;
            this.options.onMMSearchInitialized();
            var self = this;
            this.element.mmautocomplete({
                minLength: 2,
                delay: 300,
                source: function (request, response) {

                    self.queryDocuments(request.term,
                        function (documents) {
                            // data is array of documents
                            var autocompleteResults = $.map(documents, function (document) {
                                return {
                                    label: document.title,
                                    document: document
                                }
                            });
                            response(autocompleteResults);
                        },
                        function (errorMessage) {
                            self.onMMSearchError(errorMessage);
                            response([]);
                        }
                    );
                },
                select: function (event, ui) {
                    event.preventDefault();
                    window.location.href = ui.item.document.originurl;
                }
            });
        },

        queryDocuments: function (query, onQueryDocuments, onQueryError) {
            if (this._initialized) {
                query = this._getWildcardQuery(query);
                var queryParams = {
                    query: query,
                    limit: 5
                };
                queryParams['document-ranking-factors'] = {
                    'relevance':    1,
                    'recency':      0,
                    'popularity':   0,
                    'proximity':    0,
                    'customrank1':  0,
                    'customrank2':  0,
                    'customrank3':  0
                };
                MM.activeSession.documents.get(queryParams, onGetDocuments, onDocumentError);

                function onGetDocuments () {
                    var documents = MM.activeSession.documents.json();
                    onQueryDocuments(documents);
                }

                function onDocumentError (error) {
                    onQueryError('Error fetching documents: ' + error.message);
                }
            }
            else {
                onQueryError('Cannot query documents, MM search widget not initialized')
            }
        },

        _getWildcardQuery: function (query) {
            var queryTerms = query.split(" ");
            var newQuery = "";
            $.each(queryTerms, function (index, term) {
                newQuery += term + "* ";
            });
            return newQuery;
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
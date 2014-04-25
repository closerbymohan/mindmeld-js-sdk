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
                var emIndex = text.indexOf('<em>');
                if (emIndex !== -1 ){ // snippet, need to truncate <em> tags carefully
                    text = this._getTruncatedEmString(text, length - end.length) + end;
                }
                else {
                    text = String(text).substring(0, length - end.length) + end;
                }
                return text;
            }
        },

        // Attempts to return the maximum # of characters containing valid <em> tags
        // within a maxLength
        _getTruncatedEmString: function (string, maxLength) {
            var emRegex = /<em>\S+<\/em>/; // match strings with <em>html tag</em>
            var emMatches = emRegex.exec(string);

            var emIndex = emMatches.index; // index of first match
            var emString = emMatches[0]; // full string match: '<em>html tag</em>
            var emLength = emString.length;
            var remainingLength = maxLength - emLength;
            var startIndex = Math.max(0, emIndex - remainingLength);
            var beforeEmString = string.substr(startIndex, Math.min(remainingLength, emIndex)); // prepend up to maxLength number of characters before <em> tag
            var truncated = beforeEmString + emString;
            if (truncated.length < maxLength) { // we can get more characters!
                remainingLength = maxLength - truncated.length;
                var endFirstEmIndex = emIndex + emLength;
                var nextEmIndex = string.indexOf('<em>', endFirstEmIndex);
                if (nextEmIndex !== -1 ) {
                    truncated += string.substr(endFirstEmIndex, Math.min(remainingLength, nextEmIndex - endFirstEmIndex));
                }
                else {
                    truncated += string.substr(endFirstEmIndex, remainingLength);
                }
            }
            return truncated;
        },

        _renderItem: function (ul, item) {
            var liItem = null;
            if (item.noResult) {
                liItem = $('<li>', {class:'noResultItem'})
                    .append(
                        $('<a>')
                            .append(
                                $('<div>', {class:'noResultContainer'})
                                .append(
                                    $('<span>', {class: 'noResultText'}).html('No results')
                                )
                            )
                    )
            }
            else {
                var textBlurb = item.document.snippet ||
                    item.document.description ||
                    item.document.text;
                var image = null;
                if (item.document.image) {
                    image = item.document.image.thumburl || item.document.image.url || null;
                }

                var itemContent;
                if (this.options.images && image) {
                    itemContent = this._getItemContentWithImage(image, textBlurb);
                }
                else {
                    itemContent = this._getItemContentWithoutImage(textBlurb);
                }
                liItem = $('<li>', {class: 'docListItem'})
                    .append(
                        $('<a>', {href: item.document.originurl})
                            .append(
                                $('<div>', {class: 'docListWrapper'})
                                    .append(
                                        $('<span class="docTitle">' + item.document.title + '</span>')
                                    )
                                    .append(
                                        itemContent
                                )
                            )
                    );
            }
            return liItem.appendTo(ul);
        },

        _getItemContentWithImage: function (imgSrc, textBlurb) {
            textBlurb = this._truncateText(textBlurb, 100);
            return $('<div>', {class: 'docContentWithImage'})
                .append(
                    $('<div>', {class: 'docImg'})
                        .append(
                        $('<img>', {class: 'docImgFile', src: imgSrc})
                    )
                )
                .append(
                    $('<div>', {class: 'docDetails'})
                        .append(
                        $('<p class="textBlurb">' + textBlurb + '</p>')
                    )
                );
        },
        _getItemContentWithoutImage: function (textBlurb) {
            textBlurb = this._truncateText(textBlurb, 130);
            return $('<div>', {class: 'docContentWithoutImage'})
                .append(
                    $('<p class="textBlurb">' + textBlurb + '</p>')
                );
        }
    });

    $.widget('mindmeld.searchwidget', {

        options: {
            images: false,
            onMMSearchInitialized: function () {},
            onMMSearchError: function () {}
        },

        _create: function () {
            this.element.after('<div id="mm-results"></div>');
            this.queryCache = {};
            this.numQueriesCached = 0;
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
                delay: 100,
                source: function (request, response) {

                    self.queryDocuments(request.term,
                        function (documents) {
                            var results = [];
                            if (documents.length === 0) {
                                results.push({
                                    noResult: true
                                });
                            }
                            else {
                                results = $.map(documents, function (document) {
                                    return {
                                        label: document.title,
                                        document: document
                                    }
                                });
                            }
                            response(results);
                        },
                        function (errorMessage) {
                            self.onMMSearchError(errorMessage);
                            response([]);
                        }
                    );
                },
                appendTo: '#mm-results',
                open: function () {
                    var position = $('#mm-results').position();
                    var top = position.top;
                    $('#mm-results > ul.ui-autocomplete').css({
                        top: top - 1 + "px"
                    });
                },
                select: function (event, ui) {
                    if (ui.item.document) {
                        if (!event.ctrlKey && ! event.metaKey) {
                            window.location.href = ui.item.document.originurl;
                        }
                        var selectedValue = self._stripEmTags(ui.item.value);
                        self.element.val(selectedValue);
                    }
                    return false;

                },
                focus: function (event, ui) {
                    if (ui.item.document) {
                        var menu = $(this).data('mindmeldMmautocomplete').menu.element;

                        // Remove 'focused' class from every <li>
                        var lis = menu.find('li');
                        lis.each(function () {
                            $(this).removeClass('focused');
                        });

                        // Add 'focused' class to focused <li>
                        var focused = menu.find("li:has(a.ui-state-focus)");
                        focused.addClass('focused');


                        var selectedValue = self._stripEmTags(ui.item.value);
                        self.element.val(selectedValue);
                    }
                    return false;
                },
                images: self.options.images
            });
        },

        _stripEmTags: function (value) {
            value = value.replace(/<em>/g, '');
            value = value.replace(/<\/em>/g, '');
            return value;
        },

        queryDocuments: function (query, onQueryDocuments, onQueryError) {
            var self = this;
            if (this.queryCache[query]) {
                onQueryDocuments(this.queryCache[query]);
            }
            else {
                if (this._initialized) {
                    var wildcardQuery = this._getWildcardQuery(query);
                    var queryParams = {
                        query: wildcardQuery,
                        highlight: 1,
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
                    MM.activeSession.documents.get(queryParams,
                        function () {
                            var documents = MM.activeSession.documents.json();
                            self.numQueriesCached++;
                            self.queryCache[query] = documents;
                            onQueryDocuments(documents);
                        },
                        function (error) {
                            onQueryError('Error fetching documents: ' + error.message);
                        }
                    );
                    this._cleanQueryCache();
                }
                else {
                    onQueryError('Cannot query documents, MM search widget not initialized')
                }
            }
        },

        _getWildcardQuery: function (query) {
            var queryTerms = query.split(" ");
            var newQuery = "";
            $.each(queryTerms, function (index, term) {
                if (term !== '') {
                    newQuery += term + "* ";
                }
            });
            return newQuery;
        },

        _cleanQueryCache: function () {
            // queryCache size is 100
            if (this.numQueriesCached > 100) {
                var cachedQueries = Object.keys(this.queryCache);
                // Randomly remove 50 items from query cache
                for (var i = 0; i < 50; i++) {
                    var cachedQuery = cachedQueries[i];
                    delete this.queryCache[cachedQueries[i]];
                    console.log('removing cached query: ' + cachedQuery);
                }
                this.numQueriesCached = Object.keys(this.queryCache).length;
            }
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
/* global $ ko */
var init = function(){
    'use strict';

    // events
    $('#video-input').on('input', function(e){
        e.preventDefault();

        if($('#video-input').val().indexOf('https://www.youtube.com/watch?v=') === 0) {
            var adrss = $('#video-input').val().split('=')[1];
            $('iframe').attr('src', ('https://www.youtube.com/embed/' + adrss));
            $('#video-container').height('auto');
            $('#video-input').hide();
            $('#footer').show();
        }
    });

    $('#close-btn').on('click', function(e){
        e.preventDefault();
        $('#container').hide();
    });

    // KnockoutJS
    function PersonConstructor(information) {
        var self = this;

        self.info = ko.observable(information);

        self.returnName = ko.computed(function(){
            var name = self.info().name;
            return name;
        });
        self.returnImgSrc = ko.computed(function(){
            var imgSrc = self.info().imgSrc;
            return imgSrc;
        });
        self.returnComentsOn = ko.computed(function(){
            var comentsOn = self.info().comentsOn;
            return comentsOn;
        });
        self.returnComment = ko.computed(function(){
            var comment = self.info().comment;
            return comment;
        });
    }

    function CommentViewModel() {
        var self = this;

        self.personInfo = [{
            name: 'Stoyan Daskaloff',
            imgSrc: 'images/pic-001.png',
            comentsOn: 'March 7, 2013 at 7:30 pm',
            comment: 'Sed quis diam egestas, egestas mauris in, dapibus eros. Duis nisi nulla, accumsan eu libero sit amet, faucibus ornare nisi. Phasellus cursus dolor ante, at placerat est tincidunt vel. In ullamcorper pulvinar est id congue. Pellentesque scelerisque ante vel justo varius. '
        }, {
            name: 'Vassil Guenoff',
            imgSrc: 'images/pic-002.png',
            comentsOn: 'July 8, 2016 at 12:00 pm',
            comment: 'Hey Drooble Team! This KnockoutJS framework coused me some serious damage!:D Nevertheless here is the result of the task. I sulute you with one of my favourite indie artists '
        }];


        self.people = ko.observableArray(
            [new PersonConstructor(self.personInfo[0])
        ]);

        var togg = true;
        $('#reply').on('keypress', function(e){
            if (e.keyCode === 13 && togg) {
                self.people.push(new PersonConstructor(self.personInfo[1]));
                $('.music-link:eq(1)').append('<a href="https://www.youtube.com/watch?v=m9VA8_lLiWw" target="_blank">Bones - Calcium</a><span> Cheers!</>');
                togg = false;
                $('#reply').val(null);
            }
        });
    }
    
    ko.applyBindings(new CommentViewModel());
    $('#overflow').show();
};
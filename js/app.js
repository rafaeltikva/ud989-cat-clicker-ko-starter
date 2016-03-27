var ViewModel = function() {
    var self = this;
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
    this.imgAttribution = ko.observable('https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg');
    this.catNicknames = ko.observableArray(['Ronaldo', 'Messi', 'Suarez', 'Drinkwater', 'Vardy']);

    this.addCatNickname = function() {
        var nickname = $('#cat-nickname').val();
        this.catNicknames.push(nickname);
    };
    this.removeCatNickname = function() {
        var nickname = $('#cat-nickname').val();
        var foundCatIndex = this.catNicknames().indexOf(nickname);
        if (foundCatIndex >= 0) {
            this.catNicknames.splice(foundCatIndex, 1);
        }

    };

    this.incrementCounter = function () {
        this.clickCount(this.clickCount() + 1);
    };

    this.catLevel = ko.computed(function() {
        console.log("the clickCount: " + this.clickCount());
        if (this.clickCount() >= 10 && this.clickCount() < 20) {
            return "Infant";
        }
        if (this.clickCount() >= 20) {
            return "Teen";
        }
        return "Newborn";

    }, this);


};

ko.applyBindings(new ViewModel());
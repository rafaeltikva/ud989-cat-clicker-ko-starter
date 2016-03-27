var Cat = function() {

    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
    this.imgAttribution = ko.observable('https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg');
    this.catNicknames = ko.observableArray(['Ronaldo', 'Messi', 'Suarez', 'Drinkwater', 'Vardy']);

};

var ViewModel = function() {

    var self = this;

    self.currentCat = ko.observable(new Cat());

    self.incrementCounter = function () {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    self.catLevel = ko.computed(function() {
        if (self.currentCat().clickCount() >= 10 && self.currentCat().clickCount() < 20) {
            return "Infant";
        }
        if (self.currentCat().clickCount() >= 20) {
            return "Teen";
        }
        return "Newborn";

    }, self);

    self.catNickNameInput = ko.observable();

    self.addCatNickname = function() {
        // var nickname = $('#cat-nickname').val(); - replaced with 'value' bind
        var nickname = self.catNickNameInput();
        self.currentCat().catNicknames.push(nickname);
    };
    self.removeCatNickname = function() {
        // var nickname = $('#cat-nickname').val();
        var nickname = self.catNickNameInput();
        var foundCatIndex = self.currentCat().catNicknames().indexOf(nickname);
        if (foundCatIndex >= 0) {
            self.currentCat().catNicknames.splice(foundCatIndex, 1);
        }

    };


};

ko.applyBindings(new ViewModel());
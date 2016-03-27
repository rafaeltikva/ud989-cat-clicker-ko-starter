var Cat = function (data) {

    this.clickCount = ko.observable(0);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
    this.catNicknames = ko.observableArray(data.catNicknames);

};

var ViewModel = function () {

    var self = this;

    this.currentCat = ko.observable( new Cat({
        name: 'Tabby',
        imgSrc: 'img/434164568_fea0ad4013_z.jpg',
        imgAttribution: 'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg',
        catNicknames: ['Ronaldo', 'Messi', 'Suarez', 'Drinkwater', 'Vardy']
    }));

    this.incrementCounter = function () {
        this.clickCount(this.clickCount() + 1); // this is run from currentCat's context (using a with binding)
    };

    this.catLevel = ko.computed(function () {
        if (this.currentCat().clickCount() >= 10 && this.currentCat().clickCount() < 20) {
            return "Infant";
        }
        if (this.currentCat().clickCount() >= 20) {
            return "Teen";
        }
        return "Newborn";

    }, this);

    this.catNickNameInput = ko.observable();

    this.addCatNickname = function () {
        // var nickname = $('#cat-nickname').val(); - replaced with 'value' bind
        var nickname = self.catNickNameInput(); // reference back to ViewModel instance
        this.catNicknames.push(nickname);
    };
    this.removeCatNickname = function () {
        // var nickname = $('#cat-nickname').val();
        var nickname = self.catNickNameInput(); // reference back to ViewModel instance
        var foundCatIndex = this.catNicknames().indexOf(nickname);
        if (foundCatIndex >= 0) {
            this.catNicknames.splice(foundCatIndex, 1);
        }

    };


};

ko.applyBindings(new ViewModel());
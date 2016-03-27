// model
var initialCats = [
    {
        clickCount: 0,
        name: 'Tabby',
        imgSrc: 'img/434164568_fea0ad4013_z.jpg',
        imgAttribution: 'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg',
        catNicknames: ['Drinkwater', 'Vardy'],
        catLevel: '',
        catId: ''
    },
    {
        clickCount: 0,
        name: 'Messi',
        imgSrc: 'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg',
        imgAttribution: 'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg',
        catNicknames: ['Xavi', 'Iniesta'],
        catLevel: '',
        catId: ''
    },
    {
        clickCount: 0,
        name: 'Ronaldo',
        imgSrc: 'img/1413379559_412a540d29_z.jpg',
        imgAttribution: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
        catNicknames: ['Ego', 'More Ego'],
        catLevel: '',
        catId: ''
    },
    {
        clickCount: 0,
        name: 'Tiger',
        imgSrc: 'img/4154543904_6e2428c421_z.jpg',
        imgAttribution: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
        catNicknames: ['Woods'],
        catLevel: '',
        catId: ''
    },
    {
        clickCount: 0,
        name: 'Mitzi',
        imgSrc: 'img/9648464288_2516b35537_z.jpg',
        imgAttribution: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
        catNicknames: [],
        catLevel: '',
        catId: ''
    }

];

var Constructors = {
    Cat: function (data) {

        this.clickCount = ko.observable(data.clickCount);
        this.name = ko.observable(data.name);
        this.imgSrc = ko.observable(data.imgSrc);
        this.imgAttribution = ko.observable(data.imgAttribution);
        this.catNicknames = ko.observableArray(data.catNicknames);
        this.catLevel = ko.computed(function () {
            if (this.clickCount() >= 10 && this.clickCount() < 20) {
                return "Infant";
            }
            if (this.clickCount() >= 20) {
                return "Teen";
            }
            return "Newborn";

        }, this);

        this.catId = ko.computed(function () {
            return 'cat-' + this.name();
        }, this);
    }
};

var ViewModel = function () { // ViewModel

        // retain ViewModel context in self
        var self = this;

        // ViewModel Event Handlers
        self.handlers = {

            // used as click handler. clickedCat is the cat object clicked
            markCatAsCurrent: function (clickedCat) {
                self.currentCat = ko.observable(clickedCat);

                // cloning cat dom element to clonedCatElement
                var clonedCatElement = $('#' + self.currentCat().catId()).clone()[0];

                // renaming the id of the selected cat to avoid duplicate ids
                //clonedCatElement.attr('id', self.currentCat().catId() + '-selected');
                self.currentCatHtml(clonedCatElement.outerHTML);

                // add the cloned cat element to the selected-cat div
                $('#selected-cat').html(clonedCatElement); // set selected cat html to currentCat DOM element

            },
            incrementCounter: function (clickedCat) {
                clickedCat.clickCount(clickedCat.clickCount() + 1); // this is run from currentCat's context (using a with binding)
            },

            addCatNickname: function () {
                // var nickname = $('#cat-nickname').val(); - replaced with 'value' bind
                var nickname = self.catNickNameInput(); // reference back to ViewModel instance
                this.catNicknames.push(nickname);
            },
            removeCatNickname: function () {
                // var nickname = $('#cat-nickname').val();
                var nickname = self.catNickNameInput(); // reference back to ViewModel instance
                var foundCatIndex = this.catNicknames().indexOf(nickname);
                if (foundCatIndex >= 0) {
                    this.catNicknames.splice(foundCatIndex, 1);
                }

            }
        };

        self.catList = ko.observableArray([]);

        initialCats.forEach(function (catObject) {
            self.catList.push(new Constructors.Cat(catObject));
        });

        self.currentCat = ko.observable(self.catList()[0]);

        self.currentCatHtml = ko.observable();

        self.catNickNameInput = ko.observable();

    };

ko.applyBindings(new ViewModel()); // bind ViewModel to View
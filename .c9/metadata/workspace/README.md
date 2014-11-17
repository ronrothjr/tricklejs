{"changed":true,"filter":false,"title":"README.md","tooltip":"/README.md","value":"# TrickleJs\n\nTrickle is a global filters widget.\n\n  - Instantiate a Trickle object (with configuration)\n  - Listen for filters and apply filters in a callback\n\nTrickle is a lightweight JavaScript module for easily creating forms and configuring options to create feature-rich filters.:\n\n> The overriding design goal for Trickle is to make global filters as easy as possible to add and maintain.\n> Global filters should be configurable and they should listen for and emit trigger events upon acceptance.\n\n### Version\n0.0.1\n\n### Tech\n\nTrickle uses a number of open source projects to work properly:\n\n* [Twitter Bootstrap] - the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.\n* [Knockout] - Simplify dynamic JavaScript UIs with the Model-View-View Model (MVVM)\n* [Chosen] - a jQuery plugin that makes long, unwieldy select boxes much more user-friendly.\n* [Lodash] - A utility library delivering consistency, customization, performance, & extras.\n* [Knockstrap] - binding library for Knockout.js, which provides binding to Twitter Bootstrap widgets\n* [jQuery] - of course\n\n### Installation\n\nJust add the Trickle.js file to your project:\n\n### Usage\n\n```\nvar filter = new Trickle({\n  id: 'FiltersDiv',\n  current: window.currentFilter,\n  title: 'Trickle Filters',           //optional\n  url: '/Filters/UpdateFilters',      //optional\n  all: 'All',                         //optional\n  hidden: true,                       //optional\n  persistTrigger: 'FiltersPersisted', //optional\n  model: {                            //optional\n    displayFilters: window.includeFilters,\n  },\n  filters: {\n    'order': {\n      display: 'displayFilters',\n      property: 'OrderNumber',\n      label: 'Order Number',\n      type: 'select',\n      selectOptions: {\n        isOptionsDictionary: true,\n        allowAll: true,\n        sortOptions: true,\n        bindings: {\n          options: window.availableItems,\n          chosen: { width: '300px' },\n          optionsValue: 'id',\n          optionsText: 'text',\n          selectedOptions: window.selectedItems\n        }\n      }\n    }\n  }\n}); \n```\n\n### Development\n\nWant to contribute? Great!\n\n### Todo's\n\n - Write Tests\n - Convert binding methods to optionally work AngularJs\n - Add Code Comments\n\nLicense\n----\n\nMIT\n\n[john gruber]:http://daringfireball.net/\n[@thomasfuchs]:http://twitter.com/thomasfuchs\n[1]:http://daringfireball.net/projects/markdown/\n[marked]:https://github.com/chjj/marked\n[Ace Editor]:http://ace.ajax.org\n[node.js]:http://nodejs.org\n[Twitter Bootstrap]:http://twitter.github.com/bootstrap/\n[Knockout]:http://knockoutjs.com/\n[jQuery]:http://jquery.com\n[Lodash]:https://lodash.com/\n[express]:http://expressjs.com\n[AngularJS]:http://angularjs.org\n[Knockstrap]:http://faulknercs.github.io/Knockstrap/\n[Chosen]:http://harvesthq.github.io/chosen/\n","undoManager":{"mark":33,"position":56,"stack":[[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":0},"end":{"row":6,"column":68}},"text":"Trickle - create global filters using knockout, bootstrap and chosen"},{"action":"insertText","range":{"start":{"row":6,"column":68},"end":{"row":7,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":7,"column":0},"end":{"row":39,"column":0}},"lines":["authored by Ron Roth(ronrothjr@gmail.com)","var filter = new Trickle({","  id: 'FiltersDiv',","  current: window.currentFilter,","  title: 'Trickle Filters',           //optional","  url: '/Filters/UpdateFilters',      //optional","  all: 'All',                         //optional","  hidden: true,                       //optional","  persistTrigger: 'FiltersPersisted', //optional","  model: {                            //optional","    displayFilters: window.includeFilters,","  },","  filters: {","    'order': {","      display: 'displayFilters',","      property: 'OrderNumber',","      label: 'Order Number',","      type: 'select',","      selectOptions: {","        isOptionsDictionary: true,","        allowAll: true,","        sortOptions: true,","        bindings: {","          options: window.availableItems,","          chosen: { width: '300px' },","          optionsValue: 'id',","          optionsText: 'text',","          selectedOptions: window.selectedItems","        }","      }","    }","  }"]},{"action":"insertText","range":{"start":{"row":39,"column":0},"end":{"row":39,"column":4}},"text":"}); "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":7},"end":{"row":6,"column":8}},"text":"J"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":8},"end":{"row":6,"column":9}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":8,"column":0},"end":{"row":9,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":8,"column":0},"end":{"row":9,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":9,"column":0},"end":{"row":9,"column":1}},"text":"`"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":9,"column":1},"end":{"row":9,"column":2}},"text":"`"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":9,"column":2},"end":{"row":9,"column":3}},"text":"`"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":41,"column":4},"end":{"row":42,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":42,"column":0},"end":{"row":42,"column":1}},"text":"`"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":42,"column":1},"end":{"row":42,"column":2}},"text":"`"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":42,"column":2},"end":{"row":42,"column":3}},"text":"`"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":42,"column":3},"end":{"row":43,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":4,"column":0},"end":{"row":4,"column":29}},"text":"filters widget using knockout"}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":3,"column":0},"end":{"row":4,"column":0}},"nl":"\n","lines":[""]}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2,"column":9},"end":{"row":3,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1,"column":9},"end":{"row":1,"column":10}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1,"column":10},"end":{"row":1,"column":11}},"text":"-"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1,"column":11},"end":{"row":1,"column":12}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1,"column":12},"end":{"row":1,"column":41}},"text":"filters widget using knockout"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":0},"end":{"row":5,"column":1}},"text":"<"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":1},"end":{"row":5,"column":2}},"text":"b"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":2},"end":{"row":5,"column":3}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":3},"end":{"row":5,"column":4}},"text":">"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":12},"end":{"row":5,"column":13}},"text":" "},{"action":"insertText","range":{"start":{"row":5,"column":12},"end":{"row":5,"column":13}},"text":"_"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":15},"end":{"row":5,"column":16}},"text":" "},{"action":"insertText","range":{"start":{"row":5,"column":15},"end":{"row":5,"column":16}},"text":"_"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":19},"end":{"row":5,"column":20}},"text":" "},{"action":"insertText","range":{"start":{"row":5,"column":19},"end":{"row":5,"column":20}},"text":"_"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":24},"end":{"row":5,"column":25}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":4},"end":{"row":5,"column":5}},"text":"_"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":13},"end":{"row":5,"column":14}},"text":"_"},{"action":"insertText","range":{"start":{"row":5,"column":13},"end":{"row":5,"column":14}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":16},"end":{"row":5,"column":17}},"text":"_"},{"action":"insertText","range":{"start":{"row":5,"column":16},"end":{"row":5,"column":17}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":5,"column":20},"end":{"row":5,"column":21}},"text":"_"},{"action":"insertText","range":{"start":{"row":5,"column":20},"end":{"row":5,"column":21}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":25},"end":{"row":5,"column":26}},"text":"_"}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":0,"column":0},"end":{"row":41,"column":0}},"nl":"\n","lines":["=========","TrickleJs - filters widget using knockout","=========","","TrickleJs - create global filters using knockout, bootstrap and chosen","<br>_authored by Ron Roth_ (ronrothjr@gmail.com)","","```","var filter = new Trickle({","  id: 'FiltersDiv',","  current: window.currentFilter,","  title: 'Trickle Filters',           //optional","  url: '/Filters/UpdateFilters',      //optional","  all: 'All',                         //optional","  hidden: true,                       //optional","  persistTrigger: 'FiltersPersisted', //optional","  model: {                            //optional","    displayFilters: window.includeFilters,","  },","  filters: {","    'order': {","      display: 'displayFilters',","      property: 'OrderNumber',","      label: 'Order Number',","      type: 'select',","      selectOptions: {","        isOptionsDictionary: true,","        allowAll: true,","        sortOptions: true,","        bindings: {","          options: window.availableItems,","          chosen: { width: '300px' },","          optionsValue: 'id',","          optionsText: 'text',","          selectedOptions: window.selectedItems","        }","      }","    }","  }","}); ","```"]},{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":11}},"text":"# TrickleJs"},{"action":"insertText","range":{"start":{"row":0,"column":11},"end":{"row":1,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":57,"column":0}},"lines":["","Trickle is a global filters widget.","","  - Instantiate a Trickle object (with configuration)","  - Listen for filters and apply filters in a callback","","Trickle is a lightweight JavaScript module for easily creating forms and configuring options to create feature-rich filters.:","","> The overriding design goal for Trickle is to make global filters as easy as possible to add and maintain.","> Global filters should be configurable and they should listen for and emit trigger events upon acceptance.","","### Version","0.0.1","","### Tech","","Trickle uses a number of open source projects to work properly:","","* [Twitter Bootstrap] - the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.","* [Knockout] - Simplify dynamic JavaScript UIs with the Model-View-View Model (MVVM)","* [Lodash] - A utility library delivering consistency, customization, performance, & extras.","* [Knockstrap] - binding library for Knockout.js, which provides binding to Twitter Bootstrap widgets","* [jQuery] - of course","","### Installation","","Just add the Trickle.js file to your project:","","### Development","","Want to contribute? Great!","","### Todo's",""," - Write Tests"," - Convert binding methods to optionally work AngularJs"," - Add Code Comments","","License","----","","MIT","","[john gruber]:http://daringfireball.net/","[@thomasfuchs]:http://twitter.com/thomasfuchs","[1]:http://daringfireball.net/projects/markdown/","[marked]:https://github.com/chjj/marked","[Ace Editor]:http://ace.ajax.org","[node.js]:http://nodejs.org","[Twitter Bootstrap]:http://twitter.github.com/bootstrap/","[Knockout]:http://knockoutjs.com/","[jQuery]:http://jquery.com","[Lodash]:https://lodash.com/","[express]:http://expressjs.com","[AngularJS]:http://angularjs.org","[Knockstrap]:http://faulknercs.github.io/Knockstrap/"]}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":0,"column":0},"end":{"row":57,"column":0}},"nl":"\n","lines":["# TrickleJs","","Trickle is a global filters widget.","","  - Instantiate a Trickle object (with configuration)","  - Listen for filters and apply filters in a callback","","Trickle is a lightweight JavaScript module for easily creating forms and configuring options to create feature-rich filters.:","","> The overriding design goal for Trickle is to make global filters as easy as possible to add and maintain.","> Global filters should be configurable and they should listen for and emit trigger events upon acceptance.","","### Version","0.0.1","","### Tech","","Trickle uses a number of open source projects to work properly:","","* [Twitter Bootstrap] - the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.","* [Knockout] - Simplify dynamic JavaScript UIs with the Model-View-View Model (MVVM)","* [Lodash] - A utility library delivering consistency, customization, performance, & extras.","* [Knockstrap] - binding library for Knockout.js, which provides binding to Twitter Bootstrap widgets","* [jQuery] - of course","","### Installation","","Just add the Trickle.js file to your project:","","### Development","","Want to contribute? Great!","","### Todo's",""," - Write Tests"," - Convert binding methods to optionally work AngularJs"," - Add Code Comments","","License","----","","MIT","","[john gruber]:http://daringfireball.net/","[@thomasfuchs]:http://twitter.com/thomasfuchs","[1]:http://daringfireball.net/projects/markdown/","[marked]:https://github.com/chjj/marked","[Ace Editor]:http://ace.ajax.org","[node.js]:http://nodejs.org","[Twitter Bootstrap]:http://twitter.github.com/bootstrap/","[Knockout]:http://knockoutjs.com/","[jQuery]:http://jquery.com","[Lodash]:https://lodash.com/","[express]:http://expressjs.com","[AngularJS]:http://angularjs.org","[Knockstrap]:http://faulknercs.github.io/Knockstrap/"]},{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":11}},"text":"# TrickleJs"},{"action":"insertText","range":{"start":{"row":0,"column":11},"end":{"row":1,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":59,"column":0}},"lines":["","Trickle is a global filters widget.","","  - Instantiate a Trickle object (with configuration)","  - Listen for filters and apply filters in a callback","","Trickle is a lightweight JavaScript module for easily creating forms and configuring options to create feature-rich filters.:","","> The overriding design goal for Trickle is to make global filters as easy as possible to add and maintain.","> Global filters should be configurable and they should listen for and emit trigger events upon acceptance.","","### Version","0.0.1","","### Tech","","Trickle uses a number of open source projects to work properly:","","* [Twitter Bootstrap] - the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.","* [Knockout] - Simplify dynamic JavaScript UIs with the Model-View-View Model (MVVM)","* [Chosen] - a jQuery plugin that makes long, unwieldy select boxes much more user-friendly.","* [Lodash] - A utility library delivering consistency, customization, performance, & extras.","* [Knockstrap] - binding library for Knockout.js, which provides binding to Twitter Bootstrap widgets","* [jQuery] - of course","","### Installation","","Just add the Trickle.js file to your project:","","### Development","","Want to contribute? Great!","","### Todo's",""," - Write Tests"," - Convert binding methods to optionally work AngularJs"," - Add Code Comments","","License","----","","MIT","","[john gruber]:http://daringfireball.net/","[@thomasfuchs]:http://twitter.com/thomasfuchs","[1]:http://daringfireball.net/projects/markdown/","[marked]:https://github.com/chjj/marked","[Ace Editor]:http://ace.ajax.org","[node.js]:http://nodejs.org","[Twitter Bootstrap]:http://twitter.github.com/bootstrap/","[Knockout]:http://knockoutjs.com/","[jQuery]:http://jquery.com","[Lodash]:https://lodash.com/","[express]:http://expressjs.com","[AngularJS]:http://angularjs.org","[Knockstrap]:http://faulknercs.github.io/Knockstrap/","[Chosen]:http://harvesthq.github.io/chosen/"]}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":45},"end":{"row":29,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":0},"end":{"row":30,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":0},"end":{"row":30,"column":1}},"text":"#"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":1},"end":{"row":30,"column":2}},"text":"#"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":2},"end":{"row":30,"column":3}},"text":"#"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":3},"end":{"row":30,"column":4}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":4},"end":{"row":30,"column":5}},"text":"U"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":5},"end":{"row":30,"column":6}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":6},"end":{"row":30,"column":7}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":7},"end":{"row":30,"column":8}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":8},"end":{"row":30,"column":9}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":30,"column":9},"end":{"row":31,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":31,"column":0},"end":{"row":32,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":32,"column":0},"end":{"row":32,"column":1}},"text":"`"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":32,"column":1},"end":{"row":32,"column":2}},"text":"`"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":32,"column":2},"end":{"row":32,"column":3}},"text":"`"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":32,"column":3},"end":{"row":33,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":33,"column":0},"end":{"row":33,"column":26}},"text":"var filter = new Trickle({"},{"action":"insertText","range":{"start":{"row":33,"column":26},"end":{"row":34,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":34,"column":0},"end":{"row":64,"column":0}},"lines":["  id: 'FiltersDiv',","  current: window.currentFilter,","  title: 'Trickle Filters',           //optional","  url: '/Filters/UpdateFilters',      //optional","  all: 'All',                         //optional","  hidden: true,                       //optional","  persistTrigger: 'FiltersPersisted', //optional","  model: {                            //optional","    displayFilters: window.includeFilters,","  },","  filters: {","    'order': {","      display: 'displayFilters',","      property: 'OrderNumber',","      label: 'Order Number',","      type: 'select',","      selectOptions: {","        isOptionsDictionary: true,","        allowAll: true,","        sortOptions: true,","        bindings: {","          options: window.availableItems,","          chosen: { width: '300px' },","          optionsValue: 'id',","          optionsText: 'text',","          selectedOptions: window.selectedItems","        }","      }","    }","  }"]},{"action":"insertText","range":{"start":{"row":64,"column":0},"end":{"row":64,"column":4}},"text":"}); "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":64,"column":4},"end":{"row":65,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":65,"column":0},"end":{"row":65,"column":1}},"text":"`"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":65,"column":1},"end":{"row":65,"column":2}},"text":"`"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":65,"column":2},"end":{"row":65,"column":3}},"text":"`"}]}]]},"ace":{"folds":[],"scrolltop":506,"scrollleft":0,"selection":{"start":{"row":36,"column":32},"end":{"row":36,"column":32},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":25,"state":"start","mode":"ace/mode/markdown"}},"timestamp":1416232819697}
# TrickleJs

Trickle is a global filters widget.

  - Instantiate a Trickle object (with configuration)
  - Listen for triggers and apply filters in a callback

Trickle is a lightweight JavaScript module for easily creating forms and 
configuring options to create feature-rich filters.:

> The overriding design goal for Trickle is to make global filters as easy as 
> possible to add and maintain.
> Global filters should be configurable and they should listen for and emit 
> trigger events upon acceptance.

#### Supported widgets:

- Select
- Select (multiple)
- Checkbox buttons
- Radio buttons
- Date Range
- List

====
[DEMO]
====

### Version
0.0.1

### Tech

Trickle uses a number of open source projects to work properly:

* [Twitter Bootstrap] - the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.
* [Knockout] - Simplify dynamic JavaScript UIs with the Model-View-View Model (MVVM)
* [Chosen] - a jQuery plugin that makes long, unwieldy select boxes much more user-friendly.
* [Lodash] - A utility library delivering consistency, customization, performance, & extras.
* [Knockstrap] - binding library for Knockout.js, which provides binding to Twitter Bootstrap widgets
* [jQuery] - of course

### Installation

Just add the Trickle.js file to your project and the dependencies listed above.

### Usage

Instantiate a Trickle...
```
var filter = new Trickle({
  id: 'FiltersDiv',
  current: window.currentFilter,
  title: 'Trickle Filters',           //optional
  url: '/Filters/UpdateFilters',      //optional
  all: 'All',                         //optional
  hidden: true,                       //optional
  persistTrigger: 'FiltersPersisted', //optional
  model: {                            //optional
    displayFilters: window.includeFilters,
  },
  filters: {
    'order': {
      display: 'displayFilters',
      property: 'OrderNumber',
      label: 'Order Number',
      type: 'select',
      selectOptions: {
        isOptionsDictionary: true,
        allowAll: true,
        sortOptions: true,
        bindings: {
          options: window.availableItems,
          chosen: { width: '300px' },
          optionsValue: 'id',
          optionsText: 'text',
          selectedOptions: window.selectedItems
        }
      }
    }
  }
}); 
```

Listen for the persistTrigger...
```
$(d).on('FilterPersisted',function(e, data){
  $('#vwContent').append('<br><br>FilterPersisted: '+
  JSON.stringify(data));
  console.log('FilterPersisted: ',data);
});
```

### Development

Want to contribute? Great!

### Todo's

 - Write Tests
 - Convert binding methods to work in AngularJs
 - Add Code Comments

License
----

MIT

[DEMO]:https://preview.c9.io/ronrothjr/trickle/tests/index.html?_c9_id=livepreview0&_c9_host=https://ide.c9.io
[john gruber]:http://daringfireball.net/
[@thomasfuchs]:http://twitter.com/thomasfuchs
[1]:http://daringfireball.net/projects/markdown/
[marked]:https://github.com/chjj/marked
[Ace Editor]:http://ace.ajax.org
[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[Knockout]:http://knockoutjs.com/
[jQuery]:http://jquery.com
[Lodash]:https://lodash.com/
[express]:http://expressjs.com
[AngularJS]:http://angularjs.org
[Knockstrap]:http://faulknercs.github.io/Knockstrap/
[Chosen]:http://harvesthq.github.io/chosen/

# TrickleJs

Trickle is a global filters widget.

  - Instantiate a Trickle object (with configuration)
  - Listen for triggers and apply filters in a callback

Trickle is a lightweight JavaScript module for easily creating forms and 
configuring options to create feature-rich filters:

> The overriding design goal for Trickle is to make global filters as easy as 
> possible to add and maintain.
> Global filters should be configurable and they should listen for and emit 
> events upon acceptance.

##[DEMO]

#### Supported widgets:

- Select
- Select (multiple)
- Checkbox buttons
- Radio buttons
- Date Range
- List

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

Just add the Trickle.js and Trickle.css files to your project and the dependencies listed above.

## Usage

###Instantiate a Trickle...
```
var filter = new Trickle({
  filters: {
    'order': {
      property: 'OrderNumber',
      label: 'Order Number',
      type: 'select',
      selectOptions: {
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

###Listen for the persistTrigger...
```
$(d).on('FilterPersisted',function(e, data){
  $('#vwContent').append('<br><br>FilterPersisted: '+
  JSON.stringify(data));
  console.log('FilterPersisted: ',data);
});
```

###Trickle options...
```
new Trickle({
  current: window.currentFilter,      //optional - current state of filters
  id: 'FiltersDiv',                   //optional IF class="trickle" is used
  title: 'Trickle Filters',           //optional - title for filters
  url: '/Filters/UpdateFilters',      //optional - url to persist filters
  all: 'All',                         //optional - default value for allowAll property
  hidden: true,                       //optional - hides/shows filters with button
  persistTrigger: 'FiltersPersisted', //optional - trigger emitted after clicking Apply
  model: {                            //optional - optional model attributes
    displayFilters: window.includeFilters,
  }
});

```

###Trickle methods...

#####get - get the value of a filter property or the current filters object
```
filter.get('RepNumber');
```
```
var currentFilters = filter.get();
```
#####set - set the value of a filter or multiple values of a filter
```
filter.set('RepNumber', 'Brad');
```
```
filter.set({
    'RepNumber', 'Brad',
    'Area', '21'
});
```
#####reset - set the current filters object to the original state And optionally set the value of one or more filters
```
filter.reset();
```
```
filter.reset('RepNumber', 'Brad');
```
```
filter.reset({
    'RepNumber', 'Brad',
    'Area', '21'
});
```
#####apply - apply the filters to the model as they are represented in the content filters
```
filter.apply();
```
#####default - set the current filter to the default values specified for each
```
filter.default();
```
#####model - access the filter model, including all of the observables, arrays and methods
```
filter.model.slide(); // hide or show the filter content
filter.model.rep_value_RepNumber() // retrieves the rep filter observable's value
```

###Filter options...
```
var filter = new Trickle({
  filters: {
```
#####key - the name of the filter
```
    'order': {
```
#####type - indicates the widget type
```
      type: 'select',
```
#####property - specifies the name of the property this filter emits
```
      property: 'RepNumber',
```
#####label - the label displayed above the filter
```
      label: 'Rep',
```
#####showContentLabel - shows and hides the label within filter content
```
      showContentLabel: false,        //optional
```
#####display - shows and hides the filter (function that evaluates to true)
```
      display: 'displayFilters',      //optional
```
#####error - message to display when validation fails
```
      error: 'Please select one',     //optional
```
#####default - specifies the default value for the current filter property
NOTE: only used if the 'current' option is not supplied and all filters have this property
```
      default: { 'RepNumber': 'Brad' }, //optional
```
#####selectOptions - contains options for select lists
```
      type: 'select',
      property: 'RepNumber',
      label: 'Rep',
      selectOptions: {
        isDictionary: true,
        allowAll: true,
        sortOptions: true,
        bindings: {
          options: w.availableReps,
          chosen: { width: '300px' },
          optionsValue: 'id',
          optionsText: 'text',
          selectedOptions: window.selectedItems
        }
      },
```
#####cascade - options for cascading to another select list
```
      cascade: {
        child: 'area', 
        options: w.allRepAreas
      },
```
#####onPersistLocalOnly - if this is the only filter changed, send this trigger instead of the persistTrigger
```
      onPersistLocalOnly: 'QuantityToggled' 
    }
  }
}); 
```

###Widget types...

#####Select
```
    'rep': {
      type: 'select',
      property: 'RepNumber',
      label: 'Rep',
      selectOptions: {
        isDictionary: true,
        allowAll: true,
        sortOptions: true,
        bindings: {
          options: w.availableReps,   //can be object, function or array
          chosen: { width: '300px' }  //chosen.js options
        }
      },
      cascade: {
        child: 'area', 
        options: w.allRepAreas        //can be object, function or array
      }
    }
```
#####Multiple
```
    'accttype': {
      type: 'multiple',
      property: 'CustFilters.AcctTypeId',
      label: 'Account Type',
      selectOptions: {
        allowAll: true,
        sortOptions: true,
        allowAllPlaceholder: '--All--',
        bindings: {
          options: w.availableAcctTypes,   //can be object, function or array
          chosen: { width: '300px' },
          optionsValue: 'id',
          optionsText: 'text',
          selectedOptions: w.selectedAcctTypes // must be Array
        }
      }
    }
```
#####Radio buttons
```
    'quantityamount': {
      type: 'radio',
      property: 'QuantityToggle',
      label: 'Qty/Amt',
      options: ['Qty','Amt'],
      showContentLabel: false,
      onPersistLocalOnly: 'QuantityToggled' 
    }
```
#####Checkbox buttons
```
    'labormaterials': {
      type: 'checkbox',
      property: ['IncludeLabor','IncludeMaterials'],
      label: {
        'IncludeLabor': 'Labor',
        'IncludeMaterials': 'Materials'
      },
      options: {
        'IncludeLabor': 'Labor',
        'IncludeMaterials': 'Materials'
      },
      showContentLabel: false,
      error: 'Please select one'
    }
```
#####Date Range
```
    'delivery': {
      type: 'daterange',
      property: 'CustFilters.DateRange',
      label: 'Delivery Date',
      error: 'Invalid Date Range'
    }
```
#####List
```
    'location': {
      type: 'listbuilder',
      property: 'LocationFilters',
      label: 'Location',
      parameters: {
        'state': {
          label: 'State',
          options: w.availableStates,
          cascade: {
            child: 'county', 
            options: w.availableLocationOptions
          }
        },
        'county': {
          label: 'County',
          options: w.availableCounties
        }
      }
    }
```

### Development

Want to contribute? Great!

### Todo's

 - ~~Documentation~~
 - Add paging and sorting options
 - Write Tests
 - Allow standard and custom validators
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

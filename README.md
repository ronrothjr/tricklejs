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

###[DEMO]

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
  current: window.currentFilter,      //optional
  id: 'FiltersDiv',                   //optional IF class="trickle" is used
  title: 'Trickle Filters',           //optional
  url: '/Filters/UpdateFilters',      //optional
  all: 'All',                         //optional
  hidden: true,                       //optional
  persistTrigger: 'FiltersPersisted', //optional
  model: {                            //optional
    displayFilters: window.includeFilters,
  }
});

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
#####property - specifies the name of the property this filter emits with the filter
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
      }
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
          options: w.availableReps,
          chosen: { width: '300px' }
        }
      },
      cascade: {
        child: 'area', 
        options: w.allRepAreas
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
          options: w.availableAcctTypes,
          chosen: { width: '300px' },
          optionsValue: 'id',
          optionsText: 'text',
          selectedOptions: w.selectedAcctTypes
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

 - Documentation
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

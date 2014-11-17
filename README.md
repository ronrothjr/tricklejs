=========
TrickleJs - filters widget using knockout
=========

TrickleJs - create global filters using knockout, bootstrap and chosen
<br>authored_by_Ron_Roth (ronrothjr@gmail.com)

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

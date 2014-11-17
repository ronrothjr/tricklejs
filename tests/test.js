(function (d,w) {
var test1 = new Trickle();
var test2 = new Trickle({});
var test3 = new Trickle({id:'vwFilters'});
w.test4 = new Trickle({

  id: 'vwFilters',
  
  title: 'Trickle Demo',

  //url: '/Filters/UpdateFiberhoodFilters',
  
  persistTrigger: 'FilterPersisted',
  
  current: w.currentFilter,
  
  model: {
    displayWorkOrderFiberhoodFilters: w.includeWorkorderFiberhoodFilters,
    displayFiberhoodFilters: w.includeWorkorderFiberhoodFilters && w.includeFiberhoodFilters,
    displayLocationFilters: w.includeLocationFilters,
    displayLaborAndMaterialFilters: w.includeLaborAndMaterialFilters,
    displayQuantityOrAmountFilters: w.includeQuantityOrAmountFilters,
    displayCrewFilters: w.includeCrewFilters,
    displayWorkTypeFilters: w.includeWorkTypeFilters,
    displayDateRangeFilters: w.includeDateRangeFilters,
    displayAllWorkOrdersFilters: w.includeAllWorkOrdersFilter || w.includeCrewFilters,
    displayAllFiberhoodsFilters: w.includeCrewFilters || !w.includeFiberhoodFilters
  },

  filters: {
    'workorder': {
      display: 'displayWorkOrderFiberhoodFilters',
      type: 'select',
      property: 'WorkOrderNumber',
      label: 'Work Order',
      selectOptions: {
        isDictionary: true,
        allowAll: true,
        sortOptions: true,
        bindings: {
          options: w.availableWorkOrders,
          chosen: { width: '300px' }
        }
      },
      cascade: {
        child: 'fiberhood', 
        options: w.allWorkOrderFHoods
      }
    },
    'fiberhood': {
      display: 'displayWorkOrderFiberhoodFilters',
      type: 'select',
      property: 'WorkRequestId',
      label: 'Fiberhood',
      selectOptions: {
        allowAll: false,
        sortOptions: true,
        bindings: {
          options: w.availableFiberhoods,
          chosen: { width: '300px' },
          optionsValue: 'id',
          optionsText: 'text'
        }
      }
    },
    'subcontractor': {
      display: 'displayCrewFilters',
      type: 'multiple',
      property: 'CrewFilters.ForemanId',
      label: 'Subcontractor',
      selectOptions: {
        allowAll: true,
        sortOptions: true,
        allowAllPlaceholder: '--All--',
        bindings: {
          options: w.availableSubcontractors,
          chosen: { width: '300px' },
          optionsValue: 'id',
          optionsText: 'text',
          selectedOptions: w.selectedSubcontractors
        }
      }
    },
    'worktype': {
      display: 'displayWorkTypeFilters',
      type: 'multiple',
      property: 'CrewFilters.WorkTypeId',
      label: 'Work Type',
      selectOptions: {
        allowAll: true,
        sortOptions: true,
        allowAllPlaceholder: '--All--',
        bindings: {
          options: w.availableWorkTypes,
          chosen: { width: '300px' },
          optionsValue: 'id',
          optionsText: 'text',
          selectedOptions: w.selectedWorkTypes
        }
      }
    },
    'calloutcategories': {
      display: 'displayCrewFilters',
      type: 'multiple',
      property: 'CrewFilters.CalloutCategoryCodeId',
      label: 'Callout Category',
      selectOptions: {
        allowAll: true,
        sortOptions: true,
        allowAllPlaceholder: '--All--',
        bindings: {
          options: w.availableCalloutCategories,
          chosen: { width: '300px' },
          optionsValue: 'id',
          optionsText: 'text',
          selectedOptions: w.selectedCalloutCategories
        }
      }
    },
    'quantityamount': {
      display: 'displayQuantityOrAmountFilters',
      type: 'radio',
      property: 'QuantityToggle',
      label: 'Qty/Amt',
      options: ['Qty','Amt'],
      showContentLabel: false,
      onPersistLocalOnly: 'QuantityToggled'
    },
    'labormaterials': {
      display: 'displayLaborAndMaterialFilters',
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
    },
    'daterange': {
      type: 'daterange',
      property: 'CrewFilters.DateRange',
      label: 'Work Performed Date',
      error: 'Invalid Date Range'
    },
    'location': {
      display: 'displayLocationFilters',
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
  }
});  

$(d).on('FilterPersisted',function(e, data){
  $('#vwContent').append('<br><br>FilterPersisted: '+
  JSON.stringify(data));
  console.log('FilterPersisted: ',data);
})
$(d).on('QuantityToggled',function(e, data){
  $('#vwContent').append('<br><br>QuantityToggled');
  console.log('QuantityToggled');
})
})(document,window)


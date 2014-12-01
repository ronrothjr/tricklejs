(function (d,w) {
var test1 = new Trickle();
var test2 = new Trickle({});
var test3 = new Trickle({id:'vwFilters'});
w.test4 = new Trickle({

  id: 'vwFilters',
  
  title: 'Trickle Demo',

  //url: '/Filters/UpdateAreaFilters',
  
  persistTrigger: 'FilterPersisted',
  
  //current: w.currentFilter,
  
  model: {
    displayRepAreaFilters: w.includeRepAreaFilters,
    displayAreaFilters: w.includeRepAreaFilters && w.includeAreaFilters,
    displayLocationFilters: w.includeLocationFilters,
    displayLaborAndMaterialFilters: w.includeLaborAndMaterialFilters,
    displayQuantityOrAmountFilters: w.includeQuantityOrAmountFilters,
    displayCustFilters: w.includeCustFilters,
    displayAcctTypeFilters: w.includeAcctTypeFilters,
    displayDateRangeFilters: w.includeDateRangeFilters,
    displayAllRepsFilters: w.includeAllRepsFilter || w.includeCustFilters,
    displayAllAreasFilters: w.includeCustFilters || !w.includeAreaFilters
  },
  
  filters: {
    'rep': {
      display: 'displayRepAreaFilters',
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
      },
      default: 'Brad'
    },
    'area': {
      display: 'displayRepAreaFilters',
      type: 'select',
      property: 'AreaId',
      label: 'Area',
      selectOptions: {
        allowAll: true,
        sortOptions: true,
        bindings: {
          options: w.availableAreas,
          chosen: { width: '300px' },
          optionsValue: 'id',
          optionsText: 'text'
        }
      },
      default: '33'
    },
    'client': {
      display: 'displayCustFilters',
      type: 'multiple',
      property: 'CustFilters.ClientId',
      label: 'Client',
      selectOptions: {
        allowAll: true,
        sortOptions: true,
        allowAllPlaceholder: '--All--',
        bindings: {
          options: w.availableClients,
          chosen: { width: '300px' },
          optionsValue: 'id',
          optionsText: 'text',
          selectedOptions: w.selectedClients
        }
      },
      default: []
    },
    'accttype': {
      display: 'displayAcctTypeFilters',
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
      },
      default: []
    },
    'quantityamount': {
      display: 'displayQuantityOrAmountFilters',
      type: 'radio',
      property: 'QuantityToggle',
      label: 'Qty/Amt',
      options: ['Qty','Amt'],
      showContentLabel: false,
      onPersistLocalOnly: 'QuantityToggled',
      default: 'Amt'
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
      error: 'Please select one',
      default: {
        'IncludeLabor': true,
        'IncludeMaterials': true
      }
    },
    'daterange': {
      type: 'daterange',
      property: 'CustFilters.DateRange',
      label: 'Delivery Date',
      error: 'Invalid Date Range',
      default: {Begin: null, End: null}
    }/*,
    'location': {
      display: 'displayLocationFilters',
      type: 'listbuilder',
      property: 'LocationFilters',
      label: 'Location',
      default: { 'LocationFilters': [] },
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
    }*/
  }
});  

$(d).on('FilterPersisted',function(e, data){
  $('#vwContent').append('<br><br>FilterPersisted: '+
  JSON.stringify(data));
  console.log('FilterPersisted: ',data);
});
$(d).on('QuantityToggled',function(e, data){
  $('#vwContent').append('<br><br>QuantityToggled');
  console.log('QuantityToggled');
});

_.delay(function(){
  test4.add('location', {
    display: 'displayLocationFilters',
    type: 'listbuilder',
    property: 'LocationFilters',
    label: 'Location',
    default: { 'LocationFilters': [] },
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
  });
},5000);

_.delay(function(){
  test4.remove('accttype');
},10000);

})(document,window)


/*
Trickle - create global filters using knockout, bootstrap and chosen
authored by Ron Roth(ronrothjr@gmail.com)

var filter = new Trickle({
  id: 'FiltersDiv',
  current: window.currentFilter,
  title: 'Trickle Filters',       //optional
  url: '/Filters/UpdateFilters',    //optional
  all: 'All',             //optional
  hidden: true,             //optional
  persistTrigger: 'FiltersPersisted', //optional
  model: {              //optional
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
*/

(function(d, w, $, _, ko) {

  var trickle_options = {
    id: null,
    current: null,
    title: null,
    model: {},
    changed: {},
    persistTrigger: 'FiltersPersisted',
    all: '--All--',
    hidden: true,
    initialized: false
  };

  var Trickle = function(options) {
    var css = 'trickle_';
    var trickle = {

      init: function(options) {
        if (!this.validateOptions(options))
          return false;
        $.extend(true, this, trickle_options, options);
        _.bindAll(this);
        return true;
      },

      emit: function() {
        _.each(this.filters, _.bind(this.normalizeFilter, this));
        console.log(this.filters);
        this.setFilters();
        return {
          get: this.getProp,
          set: this.setProp,
          changed: this.isChanged,
          add: this.addFilter,
          remove: this.removeFilter,
          reset: this.resetFilters,
          apply: this.applyFilters,
          default: this.setDefaults,
          model: this.model
        };
      },

      validateOptions: function(options) {
        if (!options) {
          console.log('Trickle: no filter options');
          return false;
        }
        if (!options.id) {
          var $test = $('.trickle');
          if ($test.length === 1) {
            this.selector = '.trickle';
          }
          else if ($test.length === 0) {
            console.log('Trickle: no element id or div with class="trickle"');
            return false;
          }
          else if ($test.length > 1) {
            console.log('Trickle: multiple divs with trickle class assigned');
            return false;
          }
        }
        else
          this.selector = '#' + options.id;
        if (!options.filters) {
          console.log('Trickle: no filters');
          return false;
        }
        if (!options.current) {
          options = _.assign(trickle_options, options);
          return this.setDefaults(options);
        }
        return true;
      },

      setDefaults: function(options) {
        options = options || this.options;
        this.tempCurrent = {};
        this.defaults = true;
        _.each(options.filters, _.bind(function(filter, key) {
          this.key = key;
          this.filter = filter;
          if (filter.selectOptions && _.isUndefined(filter.default))
            filter.default = options.all;
          this.defaults = this.defaults ?
            !_.isUndefined(filter.default) :
            this.defaults;
          if (this.defaults) {
            var property = _.isArray(filter.property) ?
              filter.property :
              new Array(filter.property);
            this.default = {};
            _.each(property,
              function(prop) {
                if (_.isObject(this.filter.default) && !_.isArray(this.filter.default))
                  this.default = this.filter.default;
                else
                  this.default[prop] = this.filter.default;
                this.setDescendantProp(this.tempCurrent, prop, this.default[prop]);
              }, this);
          }
        }, this));
        if (!this.defaults) {
          console.log('Trickle: missing default values');
          return false;
        }
        if (options)
          options.current = this.tempCurrent;
        else
          this.current = this.tempCurrent;
        return true;
      },

      normalizeFilter: function(filter, key) {
        filter.id = key;
        filter.error = filter.error || 'Invalid ' + (
          _.isUndefined(filter.label) ? filter.id :
          _.isArray(filter.label) ? filter.label.join(', ') : filter.label);
        filter.display = _.isBoolean(filter.display) ?
          filter.display :
          _.isFunction(filter.display) ?
            filter.display() :
            _.isString(filter.display) ? (
              _.isBoolean(this.model[filter.display]) ?
              this.model[filter.display] :
              /true/.test(filter.display.toLowerCase()) ) :
              true;
        if (filter.property) {
          if (_.isString(filter.property))
            filter.property = [filter.property];
          if (_.isString(filter.label)) {
            var obj = {};
            obj[filter.property[0]] = filter.label;
            filter.label = obj;
          }
          filter.value = this.getDescendantProp(filter.property, this.current);
        }
        if (/select|multiple/.test(filter.type) && filter.selectOptions) {
          filter.selectOptions.allowAll =
            _.isUndefined(filter.selectOptions.allowAll) ?
            true : filter.selectOptions.allowAll;
          filter.selectOptions.sortOptions =
            _.isUndefined(filter.selectOptions.sortOptions) ?
            true : filter.selectOptions.sortOptions;
          if (filter.type === 'select' && filter.selectOptions.allowAll)
            this.addAllOption(filter);
        }
        filter.value = _.isFunction(filter.value) ? filter.value() : filter.value;
      },
      
      addAllOption: function(filter) {
        if (filter.selectOptions.bindings
        && filter.selectOptions.bindings.options) {
          var optionsValue = filter.selectOptions.bindings.optionsValue,
              optionsText = filter.selectOptions.bindings.optionsText,
              optionAll = _.filter(filter.selectOptions.bindings.options,
                _.bind(function (item) {
                  return ( optionsValue ? item[optionsValue] : item ) === '  ' + this.all;
                }, this));
          if (optionAll.length === 0) {
            var option = null;
            if (optionsValue) {
              option = {};
              option[optionsValue] = this.all;
              option[optionsText] = this.all;
            }
            else
              option = this.all;
            filter.selectOptions.bindings.options.unshift(option);
          }
        }
      },

      setFilters: function() {
        this.write();
        this.bind();
        this.original = JSON.stringify(this.current);
      },

      write: function() {
        (this.$view = $(this.selector)).append(this.html('view'));
        this.$button = this.$view.find('.' + css + 'filter_button');
        this.$labels = this.$view.find('.' + css + 'filter_labels');
        this.$content = this.$view.find('.' + css + 'filter_content');
        _.each(this.filters, _.bind(this.writeFilter, this));
        this.$content.append(this.html('apply'));
        this.$view.show();
      },

      bind: function() {
        this.model.all = ko.observable(this.all);
        (this.model.slide = this.slide)();
        this.model.applyFilters = this.applyFilters;
        this.model.resetFilters = this.resetFilters;
        console.log('Trickle', this.model);
        ko.applyBindings(this.model, this.$view[0]);
        this.applyCurrent();
      },

      writeFilter: function(filter, key, filters) {
        filter.value = _.isFunction(filter.value) ? filter.value() : filter.value;
        _.each(filter.property, _.bind(function(property) {
          this.model['current_' + key + '_' + property.replace(/\./g, '_')] = ko.observable();
        }, this));
        this.model[filter.id + '_display'] = ko.observable(filter.display);
        this.model[filter.id + '_display_label'] = ko.observable(filter.display);
        if (this.hidden)
          this.$labels.append(($(this.html('labelcontainer', filter)))
            .append(($(this.html('label', filter)))));
        var bindings = this.addBindings(filter, key, filters);
        this.$content.append(($(this.html('filtercontainer', filter)))
          .append(($(this.html('filter', filter)))
            .append(this.html(filter.type,
              _.assign(filter, {
                filter: filter,
                bindings: bindings
              })) + this.html('validation', filter))));
      },

      addBindings: function(filter, key, filters) {
        this.filter = filter;
        this.databind = '';
        if (filter.type === 'daterange')
          this.addDateRange(key, filter.property);
        else if (filter.type === 'listbuilder') {
          this.addListBuilder(filter);
        }
        else
          _.each(filter.property, _.bind(function(property) {
            this.model[key + '_value_' + property.replace(/\./g, '_')] =
              ko.observable();
            this.model[key + '_invalid'] =
              ko.observable(false);
          }, this));
        if (filter.type === 'checkbox') {
          _.each(filter.property, _.bind(function(property) {
            this.model[key + '_value_' + property.replace(/\./g, '_')]
              .subscribe(_.bind(function(val) {
                var valid = false;
                _.each(filter.property, _.bind(function(property) {
                  if (this.model[key + '_value_' + property.replace(/\./g, '_')]())
                    valid = true;
                }, this));
                this.model[key + '_invalid'](!valid);
              }, this));
          }, this));
        }
        if (filter.selectOptions) {
          this.model[key + '_selectedOptions'] = ko.observable();
          this.databind += this.html('bindings', {
            key: key,
            property: filter.property,
            type: filter.type,
            selectedOptions: filter.selectOptions.bindings.selectedOptions
          });
          _.each(filter.selectOptions.bindings, this.addBinding);
        }
        if (filter.cascade && filter.cascade.child &&
          filters[filter.cascade.child]) {
          this.addCascadeFunction({
            filter: filter,
            child: filters[filter.cascade.child]
          });
          this.databind += ', event: { change: ' + filter.id + '_cascade }';
        }
        return this.databind;
      },

      addBinding: function(binding, key) {
        var id = this.filter.id + '_' + key;
        if (_.isString(binding)) {
          this.model[id] = ko.observable(binding);
          this.databind += ',' + key + ': \'' + binding + '\'';
        }
        else {
          if (_.isFunction(binding))
            binding = binding();
          if (_.isArray(binding))
            this.model[id] = ko.observableArray(binding);
          else
            this.model[id] = ko.observable(binding);
          this.databind += ',' + key + ': ' + id;
        }
      },

      getDescendantProp: function(prop, obj) {
        prop = _.isArray(prop) ? prop : [prop];
        var values = {};
        _.each(prop, _.bind(function(p) {
          var val = this.getDescendant(p, obj);
          values[p.replace(/\./g, '_')] =
            _.isFunction(val) ? val() : val;
        }, this));
        return values;
      },

      getDescendant: function(prop, obj) {
        var a = _.isArray(prop) ? prop : prop.split(".");
        if (a.length === 1)
          return this.getDescendantIfExistsElseEmpty(a[0], obj);
        else if (a.length > 1)
          return this.getDescendant(a,
            this.getDescendantIfExistsElseEmpty(a.shift(), obj));
      },

      getDescendantIfExistsElseEmpty: function(prop, obj) {
        if (!obj[prop])
          obj[prop] = '';
        return obj[prop];
      },

      setDescendantProp: function(obj, prop, val) {
        var a = _.isArray(prop) ? prop : prop.split(".");
        if (a.length === 1)
          obj[a[0]] = val;
        else if (a.length > 1) {
          var p = a.shift();
          if (!obj[p])
            obj[p] = {};
          this.setDescendantProp(obj[p], a, val);
        }
      },

      unbind: function() {
        ko.cleanNode(this.$view[0]);
        this.$view.html('');
      },

      slide: function() {
        if (this.hidden && this.$button && this.$content) {
          this.$content.slideToggle('fast');
          _.delay(this.setContentOverflow, 500);
        }
      },

      setContentOverflow: function() {
        this.$content.css('overflow', 'visible');
      },

      getProp: function(prop) {
        if (prop)
          return this.getDescendantProp(prop, this.current)[prop];
        else
          return _.cloneDeep(this.current);
      },

      setProp: function(prop, val) {
        if (_.isObject(prop) && _.isUndefined(val))
          _.assign(this.current, prop);
        else if (_.isString(prop) && !_.isUndefined(val))
          this.setDescendantProp(this.current, prop, val);
        this.initialized = false;
        this.applyCurrent();
      },

      addFilter: function(name, filter) {
        if (!name || !filter)
          return false;
        if (!filter.type || !filter.default || !filter.property) {
          console.log('Trickle: missing filter attributes')
          return false;
        }
        _.each(this.filters, this.applyFilter);
        this.normalizeFilter(filter, name);
        this.filters[name] = filter;
        this.unbind();
        this.initialized = false;
        this.setFilters();
      },

      removeFilter: function(name) {
        this.unbind();
        if (this.filters[name])
          delete this.filters[name];
        _.each(this.filters, this.applyFilter);
        this.initialized = false;
        this.setFilters();
      },

      resetFilters: function(filters) {
        this.initialized = false;
        this.current = JSON.parse(this.original);
        if (filters && _.isObject(filters))
          _.assign(this.current, filters);
        this.applyCurrent();
      },

      applyFilters: function() {
        this.changed = {};
        this.PersistLocalOnly = false;
        _.each(this.filters, this.applyFilter);
        this.persistFilters();
        if (this.$content.is(':visible'))
          this.model.slide();
      },

      applyFilter: function(filter, key) {
        this.filter = filter;
        this.key = key;
        _.each(this.filters[key].property,
          this.applyFilterValue);

      },

      isChanged: function(key) {
        return this.changed[key];
      },

      getFilterValue: function(key, property) {
        var filter = this.filters[key];
        var val,
          id = key + '_' +
          (filter.type === 'multiple' ?
            'selectedOptions' :
            'value_' + property.replace(/\./g, '_')),
          original = this.getDescendantProp(property, this.current)[property.replace(/\./g, '_')];
        if (filter.type === 'daterange')
          val = this.getDateRangeValues(id, key);
        else {
          var invalid = this.model[key + '_invalid'];
          if (_.isUndefined(invalid) || !invalid())
            val = this.model[id]();
          else
            val = original;
        }
        return {
          value: val,
          original: original
        };
      },

      applyFilterValue: function(property) {
        var val = this.getFilterValue(this.key, property),
          changed = _.isObject(val.value) ?
          !_.isEqual(val.value, val.original) :
          val.value != val.original;
        if (changed)
          this.changed[this.filter.id] = true;
        this.setDescendantProp(this.current, property, val.value);
      },

      persistFilters: function() {
        if (this.url)
          $.ajax({
            url: this.url,
            type: 'PUT',
            dataType: 'json',
            data: JSON.stringify(this.current),
            contentType: 'application/json; charset=utf-8',
            success: this.persistFiltersSuccess
          });
        else
          this.persistFiltersSuccess({
            message: 'success',
            data: this.current
          });
      },

      persistFiltersSuccess: function(response) {
        this.applyCurrent();
        _.each(this.filters, _.bind(function(filter, key) {
          if (this.changed[key]) {
            if (filter.onChanged)
              $.event.trigger(filter.onChanged, this.current);
            if (Object.keys(this.changed).length === 1 && filter.onPersistLocalOnly) {
              $.event.trigger(filter.onPersistLocalOnly, this.current);
              this.PersistLocalOnly = true;
            }
          }
        }, this));
        if (!this.PersistLocalOnly && this.persistTrigger)
          $.event.trigger(this.persistTrigger, {
            message: response.message,
            data: response.data
          });
      },

      applyCurrent: function() {
        _.each(this.filters, this.applyCurrentFilter);
        this.initialized = true;
      },

      applyCurrentFilter: function(filter, key) {
        this.val = null;
        this.filter = filter;
        this.key = key;
        _.each(filter.property, this.applyCurrentValue);
        if (this.hidden)
          this.model[this.key + '_display_label']
          (this.val !== this.all);
      },

      applyCurrentValue: function(property) {
        this.val = this.getDescendantProp(property, this.current)[property.replace(/\./g, '_')];
        var id = this.key + '_value_' + property.replace(/\./g, '_');
        if (!this.initialized) {
          if (this.filter.type === 'daterange') {
            this.model[id + '_dateRangeBegin'](this.val.Begin);
            this.model[id + '_dateRangeEnd'](this.val.End);
          }
          else {
            if (_.filter(this.filters, _.bind(function (filter) {
              return filter.cascade && filter.cascade.child === this.key;
            }, this)).length > 0) {
              var val_delay = String(this
                .getDescendantProp(property, this.current)
                [property.replace(/\./g, '_')]);
              var id_delay = String(this.key + 
                '_value_' + property.replace(/\./g, '_'));
              _.delay(_.bind(function(){
                this.model[id_delay](val_delay);
              },this),500)
            }
            else
              this.model[id](this.val);
          }
          if (this.filter.type === 'multiple')
            this.model[this.key + '_selectedOptions'](this.val);
        }
        if (this.filter.type === 'daterange') {
          this.val = this.getDateRangeValues(id, this.key);
          this.val = !this.val.Begin || !this.val.End ?
            this.all :
            new Date(this.val.Begin).format('m/d/yy') + ' - ' +
            new Date(this.val.End).format('m/d/yy');
        }
        if (this.filter.type === 'select')
          if (this.model[this.key + '_optionsValue'])
            this.val = this.getOptionText(this.key, this.val);
        if (this.filter.type === 'multiple') {
          this.val = this.model[this.key + '_selectedOptions']();
          this.val = this.val.length === 0 ?
            this.all : this.val.length + ' selected';
        }
        if (this.filter.type === 'checkbox')
          this.val = this.val ? 'Yes' : 'No';
        if (this.filter.type === 'listbuilder') {
          this.val = this.model[id]();
          this.val = this.val.length === 0 ?
            this.all : this.val.length + ' selected';
        }
        this.model['current_' + this.key + '_' + property.replace(/\./g, '_')]
          (this.val);
      },

      getOptionText: function(key, val) {
        var Value = this.model[key + '_optionsValue'](),
          Text = this.model[key + '_optionsText'](),
          item = this.model[key + '_options']()
          .filter(_.bind(function(item) {
            return String(item[Value]) === String(val) || String(item[Text]) === String(val);
          }, this));
        return item ? item[0][Text] : '';
      },

      addCascadeFunction: function(options) {
        var config = this.setCascadeConfig(options);
        this.model[config._parent.id + '_cascade'] = _.bind(function(e) {
          _.delay(_.bind(function() {
            this.val = this.model[config.koParent]();
            this.cascadeValue = config.bindings.optionsValue;
            this.cascadeText = config.bindings.optionsText;
            this.opts = ko.observableArray();
            this.cascadeOptions = config.options[this.val] || config.options;
            _.each(this.cascadeOptions, this.addCascadeOption, this);
            if (config._child.selectOptions.sortOptions)
              this.opts.sort(this.sortCascadeOptions);
            if (config._child.selectOptions.allowAll) {
              var opt = {};
              opt[this.cascadeValue] = config.all || this.all;
              opt[this.cascadeText] = config.all || this.all;
              this.opts.unshift(opt);
            }
            this.model[config.koChild](this.opts()[0][this.cascadeValue]);
            this.model[config._child.id + '_options'](this.opts());
          }, this), 1);
        }, this);
        _.delay(_.bind(function() {
          this.model[config._parent.id + '_cascade']();
        }, this), 1);
      },

      setCascadeConfig: function(config) {
        return config.filter ? {
          _parent: config.filter,
          koParent: config.filter.id + '_value_' + config.filter.property,
          _child: config.child,
          koChild: config.child.id + '_value_' + config.child.property,
          bindings: config.child.selectOptions.bindings,
          options: config.filter.cascade.options,
          all: config.all || this.all
        } : {
          _parent: {
            id: config.key + '_' + config.name
          },
          koParent: config.key + '_' + config.name + '_value',
          _child: {
            id: config.key + '_' + config.parm.cascade.child,
            selectOptions: {
              sortOptions: true,
              allowAll: true
            }
          },
          koChild: config.key + '_' + config.parm.cascade.child + '_value',
          bindings: {
            optionsValue: 'id',
            optionsText: 'text'
          },
          options: config.parm.cascade.options,
          all: config.all || this.all
        };
      },

      addCascadeOption: function(option, key) {
        this.key = key;
        if (this.val === this.all) {
          _.each(option, this.setCascadeOptionAll);
        }
        else {
          this.opt = {};
          this.key = key;
          if (_.isObject(option)) {
            this.opt[this.cascadeValue] = Object.keys(option)[0];
            this.opt[this.cascadeText] = option[Object.keys(option)[0]];
          }
          else {
            this.opt[this.cascadeValue] = key;
            this.opt[this.cascadeText] = option;
          }
          this.opts.push(this.opt);
        }
      },

      setCascadeOptionAll: function(option2, key2) {
        this.opt = {};
        this.opt[this.cascadeValue] = key2;
        this.opt[this.cascadeText] = option2 + ' - ' + this.key;
        this.opts.push(this.opt);
      },

      sortCascadeOptions: function(i1, i2) {
        var prop = this.cascadeText;
        return i1[prop] < i2[prop] ? -1 : i1[prop] == i2[prop] ? 0 : 1;
      },

      addDateRange: function(key, property) {
        var id = key + '_value_' + property[0].replace(/\./g, '_');
        this.model[id + '_dateRangeBegin'] = ko.observable();
        this.model[id + '_dateRangeEnd'] = ko.observable();
        if (this.filters[key].rangelist)
          this.addDateRangeListOptions(id, key, property);
        this.addDateRangeValidation(id, key, property);
        this.addDateRangeSubscriptions(id, key, property);
      },
      
      addDateRangeListOptions: function(id, key, property) {
        var value = 'all',
            optionsValue = 'id',
            optionsText = 'text',
            options = this.filters[key].rangelist;
        this.model[id + '_RangeList'] = ko.observable(value);
        this.model[id + '_RangeList_options'] = ko.observable(options);
        var bindings = ' ' +
          'value: ' + id + '_RangeList, ' +
          'options: ' + id + '_RangeList_options, ' +
          'optionsValue: \'' + optionsValue + '\', ' +
          'optionsText: \'' + optionsText + '\' ';
        this.databind = bindings;
      },

      addDateRangeValidation: function(id, key, property) {
        this.model[key + '_invalid'] = ko.observable(false);
        this.model[id + '_dateRangeValidation'] =
          _.bind(function(startDate, endDate) {
            var koInvalidDates = this.model[key + '_invalid'],
              //Strip out the time portion if it exists.
              local_startDate = startDate === '' || startDate === null ?
              null :
              /T/.test(startDate) ?
              startDate.substring(0, startDate.indexOf('T')) :
              startDate,
              local_endDate = endDate === '' || endDate === null ?
              null :
              /T/.test(endDate) ?
              endDate.substring(0, endDate.indexOf('T')) :
              endDate;
            if (local_startDate && local_endDate) {
              if (new Date(local_startDate) > new Date(local_endDate))
                koInvalidDates(true);
              else
                koInvalidDates(false);
            }
            else
              koInvalidDates(local_startDate || local_endDate);
          }, this);
      },

      addDateRangeSubscriptions: function(id, key, property) {
        if (this.filters[key].rangelist)
          this.model[id + '_RangeList']
            .subscribe(_.bind(function(val) {
              var listrange = this.getDateListRange(id, key);
              console.log(id + '_RangeList', val, listrange);
              this.model[id + '_dateRangeBegin'](listrange.Begin);
              this.model[id + '_dateRangeEnd'](listrange.End);
            }, this));
        this.model[id + '_dateRangeBegin']
          .subscribe(_.bind(function(val) {
            if (this.model[id + '_dateBegin_stopTimeout'])
              clearTimeout(this.model[id + '_dateBegin_stopTimeout']);
            this.model[id + '_dateBegin_stopTimeout'] =
              setTimeout(_.bind(function() {
                this.model[id + '_dateRangeValidation']
                  (val, this.model[id + '_dateRangeEnd']());
              }, this), 100);
          }, this));
        this.model[id + '_dateRangeEnd']
          .subscribe(_.bind(function(val) {
            if (this.model[id + '_dateEnd_stopTimeout'])
              clearTimeout(this.model[id + '_dateEnd_stopTimeout']);
            this.model[id + '_dateEnd_stopTimeout'] =
              setTimeout(_.bind(function() {
                this.model[id + '_dateRangeValidation']
                  (this.model[id + '_dateRangeBegin'](), val);
              }, this), 100);
          }, this));
      },

      getDateRangeValues: function(id, key) {
        var begin = this.model[id + '_dateRangeBegin'](),
            end = this.model[id + '_dateRangeEnd'](),
            invalid = this.model[key + '_invalid'](),
            listrange = this.filters[key].rangelist ? 
              this.getDateListRange(id, key) : {
              Begin: null,
              End: null
            },
            val = invalid || !begin || !end ? listrange : {
              Begin: new Date(begin).format('m/d/yy'),
              End: new Date(end).format('m/d/yy')
            };
        return val;
      },
      
      getDateListRange: function(id, key) {
        var listrange = this.model[id + '_RangeList'](),
            listrange_end = listrange === 'all' ? null : new Date().format('m/d/yy'),
            listrange_begin = listrange === 'all' ?
              null :
              new Date(Date.parse(new Date())-parseInt(listrange)*24*60*60*1000).format('m/d/yy');
        return { Begin: listrange_begin, End: listrange_end };
      },

      addListBuilder: function(filter) {
        var self = this,
          key = filter.id,
          id = key + '_value_' + filter.property[0].replace(/\./g, '_'),
          parameters = filter.parameters,
          all = 'Any',
          val = self.getDescendantProp(filter.property, self.current);
        self.model[id] = koList = ko.observableArray(val[filter.property]);
        self.model[key + '_invalid'] = ko.observable(false);
        self.model[key + '_enable_add_button'] = koEnabled = ko.observable(false);
        self.model[key + '_display_filter_list'] = koDisplay = ko.observable(false);
        var getItem = function() {
            var item = {};
            _.each(parameters, function(parm, name) {
              var val = $('.' + key + '_' + name + ' option:selected').text();
              item[name] = val === all ? '' : val;
            });
            return item;
          },
          getFormat = function(data) {
            var item = '';
            _.each(parameters, function(parm, name) {
              var val = data[name] === all ? '' : data[name];
              item += (item !== '' && val !== '' ? ', ' : '') + val;
            });
            return item;
          },
          enable = function() {
            var item = getItem();
            var format = getFormat(item);
            var enabled = format !== '' &&
              _.filter(koList(), item).length === 0;
            koEnabled(enabled);
            koDisplay(koList().length > 0);
          },
          addItem = function() {
            koList.push(getItem());
          },
          removeItem = function(data) {
            koList.remove(data);
          };
        self.model[id].subscribe(enable);
        self.model[key + '_addItem'] = addItem;
        self.model[key + '_removeItem'] = removeItem;
        self.model[key + '_formatItem'] = getFormat;
        _.each(filter.parameters, function(parm, name) {
          self.model[key + '_' + name + '_value'] = ko.observable(all);
          (self.model[key + '_' + name + '_options'] =
            ko.observableArray(parm.options))
          .unshift({
            id: all,
            text: all
          });
          if (parm.cascade)
            self.addCascadeFunction({
              key: key,
              name: name,
              parm: parm,
              all: all
            });
          self.model[key + '_' + name + '_changed'] = function() {
            if (parm.cascade)
              self.model[key + '_' + name + '_cascade']();
            enable();
          };
        });
      },

      html: function(template, data) {
        return _.template(this.templates[template])(data || this);
      },

      templates: {
        view: ' \n\
      <%=title ? "<h2>" + title + "</h2>" : ""%>\
      <% if (hidden) {%><button \n\
      class="' + css + 'filter_button btn btn-success pull-left"\
      data-bind="click: slide">Filters</button>\
      <div class="' + css + 'filter_labels"></div> \n<% } %>\
      <div class="' + css + 'filter_content"></div> \n',
        labelcontainer: ' \n\
      <!-- ko if: <%=id%>_display_label() -->\
      <div class="<%=id%>_label_container label-container pull-left"></div> \n\
      <!-- /ko -->',
        filtercontainer: ' \n\
      <!-- ko if: <%=id%>_display() -->\
      <div class="<%=id%>_container ' + css + 'filter-container pull-left"></div> \n\
      <!-- /ko -->',
        filter: '  \n\
        <div class="<%=id%>_filter filter pull-left"> \n\
        <% if (!/radio|checkbox/.test(type) && label && label[property]) { %>\
        <label for="ddl<%=id%>" class="content-label"> \n\
        <%=label[property]%></label><br/> \n\
        <% } %></div> \n',
        label: '  \n\
        <% _.each( property, function(val) { %>\
        <div class="<%=id%>_label ' + css + 'filter-label pull-left"> \n\
        <label for="<%=id%>_<%=val.replace(/\\./g,\'_\')%>"> \
            <%=label[val]%></label><br/> \n\
        <span id="lbl<%=id%>_<%=val.replace(/\\./g,\'_\')%>" \n\
          class="label label-primary pull-left" \n\
        data-bind="text: current_<%=id%>_<%=val.replace(/\\./g,\'_\')%>"/> \n\
        </div> \n\
        <% }) %>',
        bindings: ' \n\
          <% if(type!==\'multiple\') \
          { %>value: <%=key%>_value_<%=property[0].replace(/\\./g,\'_\')%><% } \
          else { %>novalue: <%=key%>_selectedOptions<% }%>\n',
        validation: ' \n\
        <div class="clear-fix"> \n\
        <div class="field-validation-error" \
          data-bind="visible: \
          <%=id%>_invalid"> \n\
          <p><%=error%></p> \n\
        </div> \n',
        select: ' \n\
        <select id="<%=id%>" data-bind=" \n\
          <%=bindings %> \n\
        "></select> \n',
        multiple: ' \n\
        <select id="<%=id%>" \n\
          multiple="multiple" \n\
          data-placeholder="  --All--" \n\
              data-bind=" \n\
          <%=bindings %> \n\
        "></select> \n',
        checkbox: ' \n\
        <div class="btn-group" data-toggle="buttons"> \n\
          <% _.each(options, function (opt, opt_key) { %> \n\
          <label class="btn btn-primary"> \n\
            <input type="checkbox" \n\
            data-bind="checkbox: \n\
            <%=id%>_value_<%=opt_key%>" \n\
            /><%=opt%></label> \n\
          <% }) %>\n\
        </div> \n',
        radio: ' \n\
        <div class="btn-group form-group" \n\
         data-toggle="buttons" \n\
          data-bind="radio: <%=id%>_value_<%=property%>"> \n\
          <% _.each(options, function (opt) { %> \n\
          <label class="btn btn-primary">\n\
          <input type="radio" name="<%=property%>" \n\
           value="<%=opt%>"><%=opt%></label> \n\
          <% }) %>\n\
        </div> \n',
        daterange: ' \n\
        <% if (filter.rangelist) { %> \n\
        <div> \n\
          <select class="chosen-choices" id="\
            <%=id%>_value_<%=property[0].replace(/\\./g,\'_\')%>_RangeList" \n\
              data-bind=" <%=bindings %> "></select> \n\
        </div> \n\
        <% } %> \n\
        <div class="pull-left" <%=filter.rangelist ? "style=\'display:none\'" : ""%>> \n\
          <label class="' + css + 'daterange-label">Begin:</label><br /> \n\
          <input class="' + css + 'filter" type="date" data-bind="datePicker: \
          <%=id%>_value_<%=property[0].replace(/\\./g,\'_\')%>_dateRangeBegin" /> \n\
        </div> \n\
        <div class="pull-left" <%=filter.rangelist ? "style=\'display:none\'" : ""%>> \n\
          <label class="' + css + 'daterange-label">End:</label><br /> \n\
          <input class="' + css + 'filter" type="date" data-bind="datePicker: \
          <%=id%>_value_<%=property[0].replace(/\\./g,\'_\')%>_dateRangeEnd" /> \n\
        </div> \n',
        listbuilder: '\n\
        <div class="' + css + 'filter_parameters pull-left"> \n\
            <% _.each(parameters, function (parm, name) { %> \n\
            <div class="' + css + 'filter_parameter pull-left"> \n\
              <label for="<%=filter.id%>_<%=name%>"><%=parm.label%>:</label><br /> \n\
              <select class="<%=filter.id%>_<%=name%>" \n\
                data-bind="event:{ change: <%=filter.id%>_<%=name%>_changed }, \n\
                value: <%=filter.id%>_<%=name%>_value, \n\
                options: <%=filter.id%>_<%=name%>_options, \n\
                optionsValue: \'id\', \n\
                  optionsText: \'text\'"></select> \n\
            </div> \n\
          <% }) %>\n\
            <div class="pull-left"> \n\
              <input class="' + css + 'filter_list_button <%=id%>_addItem_button btn btn-primary" \n\
                type="button" value="Add" \n\
                data-bind="enable: <%=id%>_enable_add_button, \
                click: <%=id%>_addItem" /> \n\
            </div> \n\
          </div> \n\
          <div class="clear-fix" data-bind="visible: <%=id%>_display_filter_list"> \n\
            <div class="' + css + 'filter_list"> \n\
            <div class="' + css + 'filter_list_items"> \n\
            <!-- ko foreach: <%=id%>_value_<%=property[0].replace(/\\./g,\'_\')%> --> \n\
              <div class="' + css + 'filter_list_item" \n\
              data-bind="text: $root.<%=id%>_formatItem($data), \n\
              click: $root.<%=id%>_removeItem"></div> \n\
            <!-- /ko --> \n\
            </div> \n\
            </div> \n',
        apply: ' \n\
      <div class="clearfix"></div> \n\
      <button class="btn btn-primary trickle_filter_button" \n\
        data-bind="click: applyFilters">Apply Filters</button> \n\
      <button class="btn btn-primary trickle_filter_button" \n\
        data-bind="click: resetFilters">Reset Filters</button>'
      }

    };

    if (trickle.init(options))
      return trickle.emit();
    else
      return null;
  };
  w.Trickle = Trickle;
})(document, window, jQuery, _, ko);
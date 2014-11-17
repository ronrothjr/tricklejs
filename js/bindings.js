ko.bindingHandlers.chosen = {
  init: function (element, valueAccessor, allBindings) {
    element = $(element);
    element.chosen(_.assign(valueAccessor(), _.isFunction(allBindings().chosen) ? allBindings().chosen() : {}));
    element.focusin(function () { setTimeout(function () { element.trigger('chosen:open'); }, 10); });

    // trigger chosen:updated event when the bound value or options changes

    $.each('value|selectedOptions|options'.split("|"), function (i, e) {
      var bv = allBindings.get(e);
      if (ko.isObservable(bv))
        bv.subscribe(function () { setTimeout(function() { $(element).trigger('chosen:updated'); }, 50) });
    });
  },
  update: function (element) {
    setTimeout(function () { $(element).trigger('chosen:updated'); }, 50);
  }
}
ko.bindingHandlers.datePicker = {
  init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    var val = ko.unwrap(valueAccessor());
    if (val)
      $(element).val((Util.parseServerDate(val).toISOString().substr(0, 10).replace(/\s/g, '')));
    valueAccessor().subscribe(function (newValue) {
      $(element).val(newValue ? (Util.parseServerDate(newValue).toISOString().substr(0, 10).replace(/\s/g, '')) : newValue);
    });
    //have to update the underlying observable
    ko.utils.registerEventHandler(element, "change", function () {
      var value = valueAccessor();
      value(element.value);
      });
  }
}
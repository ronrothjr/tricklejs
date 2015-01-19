    (function(d, w) {

        //Exit this self invoking function if the element wasn't created (which means model wasn't populated)
        if (d.querySelector("#vwFilters") == null)
            return;

        //Have to have this bit of script here in the view so that Razor can populate the server side values we're referencing
        w.currentFilter = {"MasterContractId":1,"RepNumber":"Brad","AreaId":"33","IncludeLabor":true,"IncludeMaterials":true,"QuantityToggle":"Qty","AreaName":"","LocationFilters":[{state:'FL',county:''}],"subsidiaryId":1,"AllWOfilterSelected":true,"CustFilters":{"RepNumber":"Brad","AreaId":33,"ClientId":[],"AcctTypeId":[],"DateRange":{"Begin":null,"End":null}}};
        w.includeRepAreaFilters = 'True'.toLowerCase() === 'true';
        w.includeAreaFilters = 'True'.toLowerCase() === 'true';
        w.includeLocationFilters = 'True'.toLocaleLowerCase() === 'true';
        w.includeLaborAndMaterialFilters = 'True'.toLowerCase() === 'true';
        w.includeQuantityOrAmountFilters = 'True'.toLowerCase() === 'true';
        w.includeCustFilters = 'True'.toLowerCase() === 'true';
        w.includeAcctTypeFilters = 'True'.toLowerCase() === 'true';
        w.includeDateRangeFilters = 'True'.toLowerCase() === 'true';
        w.includeAllRepsFilter = 'False'.toLowerCase() === 'true';
        w.allRepAreas = {"Brad":{"21":"Pacific Northwest","22":"Pacific Northeast","33":"Pacific Central"},"Joe":{"20":"Pacific Southwest","30":"North Central"},"Alan":{"23":"South Central","26":"Central US"},"Steve":{"31":"Atlantic Northeast 1","32":"Atlantic Central"},"Pat":{"1":"Atlantic Northeast 2","11":"Atlantic Southeast"}};
        w.availableReps = ["Brad","Joe","Alan","Steve","Pat"];
        w.allWOfilterSelected = 'True'.toLowerCase() !== 'false';
        w.availableAreas = [{id:"21",text:"Pacific Northwest"},{id:"22",text:"Pacific Northeast"},{id:"33",text:"Pacific Central"},{id:"20",text:"Pacific Southwest"},{id:"30",text:"North Central"},{id:"23",text:"South Central"},{id:"26",text:"Central US"},{id:"31",text:"Atlantic Northeast 1"},{id:"32",text:"Atlantic Central"},{id:"1",text:"Atlantic Northeast 2"},{id:"11",text:"Atlantic Southeast"}];
        w.availableLocationFilters = [{"label":"AL","value":[{"label":"Lee County","value":[]}]},{"label":"MO","value":[{"label":"Platte County","value":[]},{"label":"Clay County","value":[]},{"label":"Jackson County","value":[]}]},{"label":"NJ","value":[{"label":"Cape May County","value":[]}]},{"label":"KS","value":[{"label":"Wyandotte County","value":[]},{"label":"Johnson County","value":[]}]},{"label":"DE","value":[{"label":"New Castle County","value":[]}]},{"label":"FL","value":[{"label":"Charlotte County","value":[]}]}];
        w.availableLocationOptions = (function () {
          var availableLocationOptions = {};
          for (var state = 0; state < w.availableLocationFilters.length; state++) {
            var item = {};
            for (var county = 0; county < availableLocationFilters[state].value.length; county++){
              item[String((state *10)+county)] =
                availableLocationFilters[state].value[county].label;
            }
            availableLocationOptions[availableLocationFilters[state].label] = item;
          }
          return availableLocationOptions;
        })();
        w.availableStates = (function () {
          var availableStates = [];
          for (var state = 0; state < w.availableLocationFilters.length; state++) {
            availableStates.push({
              id: availableLocationFilters[state].label,
              text: availableLocationFilters[state].label
            });
          }
          availableStates.sort(function (l, r) {
            return l.text > r.text ? 1 : -1
          });
          return availableStates;
        })();
        w.availableCounties = (function () {
          var availableCounties = [];
          for (var state = 0; state < w.availableLocationFilters.length; state++) {
            for (var county = 0; county < availableLocationFilters[state].value.length; county++)
            availableCounties.push({
              id: availableLocationFilters[state].value[county].label,
              text: availableLocationFilters[state].value[county].label
            });
          }
          availableCounties.sort(function (l, r) {
            return l.text > r.text ? 1 : -1
          });
          return availableCounties;
        })();
        w.locationFilters = [];
        w.clients = [{"ClientId":27,"ClientCode":"ABC001","ClientName":"ABC Services, Inc"},{"ClientId":28,"ClientCode":"AJAX00","ClientName":"Ajax Industries"},{"ClientId":29,"ClientCode":"ALL001","ClientName":"All Things Unlimited"},{"ClientId":30,"ClientCode":"BEST01","ClientName":"Best In Show, Inc"},{"ClientId":31,"ClientCode":"DRI001","ClientName":"Driveway Superstars, LLC"},{"ClientId":32,"ClientCode":"ELEC01","ClientName":"Electric Dreams, Inc."},{"ClientId":33,"ClientCode":"FCLL01","ClientName":"Fight Club, LLC"},{"ClientId":34,"ClientCode":"HST001","ClientName":"Harbor Safe Tools, Inc"},{"ClientId":35,"ClientCode":"MCT001","ClientName":"Master Craftsmen Tools"},{"ClientId":36,"ClientCode":"CPS001","ClientName":"Crack Plumbing Services"},{"ClientId":37,"ClientCode":"TSAC01","ClientName":"Tight Spaces Air Conditioning, LLC"},{"ClientId":38,"ClientCode":"UBI001","ClientName":"Underground Banking Internation, INC"}];
        w.selectedClients = (function () {
            var clientList = [];
            if (w.currentFilter.CustFilters.ClientId) {
                var clients = w.currentFilter.CustFilters.ClientId;
                for (var client in clients)
                    clientList.push(parseInt(clients[client]));
            }
            return clientList;
          })();
        w.availableClients = (function () {
            var availableClients = [];
            for (var client in w.clients) {
              availableClients.push({
                id: w.clients[client].ClientId,
                text: w.clients[client].ClientName + 
                  ' (' + w.clients[client].ClientCode + ')'
              });
            }
            availableClients.sort(function (l, r) {
              return l.text > r.text ? 1 : -1
            });
            return availableClients;
          })();
        w.workTypes = [{"AcctTypeId":1,"AcctType":"Install Google Area"},{"AcctTypeId":2,"AcctType":"Underground"},{"AcctTypeId":3,"AcctType":"Install"},{"AcctTypeId":4,"AcctType":"Splicing"},{"AcctTypeId":5,"AcctType":"Aerial"},{"AcctTypeId":6,"AcctType":"Hourly"},{"AcctTypeId":7,"AcctType":"Other"},{"AcctTypeId":8,"AcctType":"Material"},{"AcctTypeId":9,"AcctType":"Power Supply"},{"AcctTypeId":10,"AcctType":"Sweep"}];
        w.selectedAcctTypes = (function () {
            var accttypeList = [];
            if (w.currentFilter.CustFilters.AcctTypeId) {
                var accttypes = w.currentFilter.CustFilters.AcctTypeId;
                for (var accttype in accttypes)
                    accttypeList.push(parseInt(accttypes[accttype]));
            }
            return accttypeList;
          })();
        w.availableAcctTypes = (function () {
            var availableAcctTypes = [];
            for (var accttype in w.workTypes) {
              availableAcctTypes.push({
                id: w.workTypes[accttype].AcctTypeId,
                text: w.workTypes[accttype].AcctType
              });
            }
            availableAcctTypes.sort(function (l, r) {
              return l.text > r.text ? 1 : -1
            });
            return availableAcctTypes;
          })();
        w.includeLabor = true;
        w.includeMaterials = true;
    })(document, window);

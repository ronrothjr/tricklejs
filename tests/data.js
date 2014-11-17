    (function(d, w) {

        //Exit this self invoking function if the element wasn't created (which means model wasn't populated)
        if (d.querySelector("#vwFilters") == null)
            return;

        //Have to have this bit of script here in the view so that Razor can populate the server side values we're referencing
        w.currentFilter = {"MasterContractId":1,"RepNumber":"Brad","AreaId":33,"IncludeLabor":true,"IncludeMaterials":true,"QuantityToggle":"Qty","AreaName":"","LocationFilters":[{state:'FL',county:''}],"subsidiaryId":1,"AllWOfilterSelected":true,"CustFilters":{"RepNumber":"Brad","AreaId":33,"ClientId":[],"AcctTypeId":[],"DateRange":{"Begin":null,"End":null}}};
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
        w.availableReps = ["--All--","Brad","Joe","Alan","Steve","Pat"];
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
        w.clients = [{"ClientId":27,"ClientCode":"ADVA02","ClientName":"ADVANCED CABLE SERVICES, INC"},{"ClientId":28,"ClientCode":"AJAX00","ClientName":"DEIDO DEPINTOR"},{"ClientId":29,"ClientCode":"ALLE06","ClientName":"ALLEN FRANKS CONSTRUCTION"},{"ClientId":30,"ClientCode":"ALLI07","ClientName":"ALL IN ONE CONTRACTOR INC"},{"ClientId":31,"ClientCode":"ALLS00","ClientName":"ALL STAR UNDERGROUND LLC"},{"ClientId":32,"ClientCode":"APPA02","ClientName":"APPALACHIAN CABLE INSTALLERS, INC."},{"ClientId":33,"ClientCode":"ARCH03","ClientName":"ARCHEY WAY COMMUNICATIONS, LLC"},{"ClientId":34,"ClientCode":"ATLA04","ClientName":"ATLANTIC ENGINEERING GROUP, INC"},{"ClientId":35,"ClientCode":"BAIL01","ClientName":"BAILEY'S UNDERGROUND CONST., LLC"},{"ClientId":36,"ClientCode":"BCOM00","ClientName":"B-COMM LLC"},{"ClientId":37,"ClientCode":"BKTE00","ClientName":"B&K TELECOMMUNICATIONS & CONST., LLC"},{"ClientId":38,"ClientCode":"BLAC10","ClientName":"BLACK RIVER UNDERGROUND INC"},{"ClientId":39,"ClientCode":"BURK03","ClientName":"DONALD E BURKHART"},{"ClientId":40,"ClientCode":"BVTE00","ClientName":"BV TECHNOLOGIES, INC"},{"ClientId":41,"ClientCode":"CABL18","ClientName":"CABLE DIVISION INC"},{"ClientId":42,"ClientCode":"CANN02","ClientName":"CANNON UTILITY SERVICES, LLC"},{"ClientId":43,"ClientCode":"CAT500","ClientName":"CAT 5 CONSTRUCTION SERVICES LLC"},{"ClientId":44,"ClientCode":"CAUT00","ClientName":"C & A UTILITIES INC"},{"ClientId":45,"ClientCode":"CCUT00","ClientName":"C&C UTILITY CONSTRUCTION LLC"},{"ClientId":46,"ClientCode":"CDPC00","ClientName":"CHARLES DAVID PIKE"},{"ClientId":47,"ClientCode":"COMM25","ClientName":"COMMUNICATION DATA LINK LLC"},{"ClientId":48,"ClientCode":"COMO01","ClientName":"COM ONE LLC"},{"ClientId":49,"ClientCode":"CSUI00","ClientName":"CSU, INC."},{"ClientId":50,"ClientCode":"DACU00","ClientName":"DAC UNDERGROUND, INC"},{"ClientId":51,"ClientCode":"DIVI01","ClientName":"DIVINE INDUSTRIES, LLC"},{"ClientId":52,"ClientCode":"DJCA00","ClientName":"DJ CABLE COMMUNICATION, INC"},{"ClientId":53,"ClientCode":"ELAN00","ClientName":"ELAN ENGINEERING INC"},{"ClientId":54,"ClientCode":"ENTE02","ClientName":"ENTERPRISE UTILITY CONSTRUCTION INC."},{"ClientId":55,"ClientCode":"ENTE03","ClientName":"ENTERPRIZE CONSULTING, INC"},{"ClientId":56,"ClientCode":"FIBE11","ClientName":"FIBER TECHNOLOGY SERVICES, LP"},{"ClientId":57,"ClientCode":"FIBE13","ClientName":"FIBER OPTIC SPECIALISTS INC"},{"ClientId":58,"ClientCode":"FOOS00","ClientName":"FOOSCO LLC  INC"},{"ClientId":59,"ClientCode":"FORS01","ClientName":"KEITH R FORSYTH"},{"ClientId":60,"ClientCode":"FRON03","ClientName":"MARK MUDD"},{"ClientId":61,"ClientCode":"GALL07","ClientName":"GALLAWAY CONSTRUCTION LLC"},{"ClientId":62,"ClientCode":"GANN00","ClientName":"GANN CONSTRUCTION, INC."},{"ClientId":63,"ClientCode":"GARR05","ClientName":"GARRETT SERVICES LLC"},{"ClientId":64,"ClientCode":"GAUN00","ClientName":"GA UNDERGROUND UTILITIES, INC"},{"ClientId":65,"ClientCode":"HALL18","ClientName":"HALL COMMUNICATIONS INC"},{"ClientId":66,"ClientCode":"HALL19","ClientName":"HALL & COMPANY SERVICES LLC"},{"ClientId":67,"ClientCode":"HURK00","ClientName":"HURK UNDERGROUND TECHNOLOGIES, INC"},{"ClientId":68,"ClientCode":"HUTC09","ClientName":"TILAS S HUTCHISON"},{"ClientId":69,"ClientCode":"ICEU00","ClientName":"ICE UNDERGROUND INC"},{"ClientId":70,"ClientCode":"INTE19","ClientName":"INTERNATIONAL, INC."},{"ClientId":71,"ClientCode":"JACO01","ClientName":"GLEN ALLEN JACOBS"},{"ClientId":72,"ClientCode":"JGBC00","ClientName":"JUAN BURUCA"},{"ClientId":73,"ClientCode":"JKUN00","ClientName":"JOSEPH C FRITZ"},{"ClientId":74,"ClientCode":"JONE13","ClientName":"DAVID ANDREW JONES II"},{"ClientId":75,"ClientCode":"KANE00","ClientName":"KANE DIRECTIONAL DRILLING, INC"},{"ClientId":76,"ClientCode":"KASC00","ClientName":"KAS COMMUNICATIONS LLC"},{"ClientId":77,"ClientCode":"KCCA00","ClientName":"KC CABLE CONNECTIONS, LLC"},{"ClientId":78,"ClientCode":"KJTE00","ClientName":"K & J TELECOMMUNICATIONS"},{"ClientId":79,"ClientCode":"KWUG00","ClientName":"K & W UNDERGROUND, INC"},{"ClientId":80,"ClientCode":"LANT00","ClientName":"LAN-TEL COMMUNICATIONS SERVICES INC"},{"ClientId":81,"ClientCode":"LBSE00","ClientName":"L & B SERVICES,LLC  INC."},{"ClientId":82,"ClientCode":"LEMS00","ClientName":"LEM SERVICES,LLC"},{"ClientId":83,"ClientCode":"LMCA00","ClientName":"L & M CABLE, INC."},{"ClientId":84,"ClientCode":"MACK02","ClientName":"MACK COMMUNICATION,LLC"},{"ClientId":85,"ClientCode":"MADO00","ClientName":"MADOVIS COMMUNICATIONS, INC"},{"ClientId":86,"ClientCode":"MARI02","ClientName":"MARION UNDERGROUND CONST., INC"},{"ClientId":87,"ClientCode":"MELL01","ClientName":"MELLAGE ENTERPRISES LLC"},{"ClientId":88,"ClientCode":"MIDW17","ClientName":"MIDWEST UTILITY INC"},{"ClientId":89,"ClientCode":"MISH00","ClientName":"MISHA CABLE INC"},{"ClientId":90,"ClientCode":"NAVA00","ClientName":"FABIAN NAVARRO"},{"ClientId":91,"ClientCode":"NEEL00","ClientName":"NEEL CABLE SERVICES INC"},{"ClientId":92,"ClientCode":"NEXG00","ClientName":"NEXGEN COMMUNICATIONS INC."},{"ClientId":93,"ClientCode":"NICK01","ClientName":"NICUSOR ROBITU"},{"ClientId":94,"ClientCode":"OPTX00","ClientName":"OPTX COMMUNICATIONS INC"},{"ClientId":95,"ClientCode":"OVER07","ClientName":"OVER AND UNDER UTILITY LLC"},{"ClientId":96,"ClientCode":"OWEN06","ClientName":"OWENS TELECOM SERVICES, INC"},{"ClientId":97,"ClientCode":"PLEA00","ClientName":"PLEASANT AND SONS CONSTRUCTION"},{"ClientId":98,"ClientCode":"PREC03","ClientName":"PRECISION LIGHT WAVE LLC"},{"ClientId":99,"ClientCode":"PRIV00","ClientName":"SUNDAY OMOREGIE"},{"ClientId":100,"ClientCode":"PRON00","ClientName":"PRONTO SERVICES, INC"},{"ClientId":101,"ClientCode":"ROBE08","ClientName":"ROBERTS COMMUNICATIONS INC"},{"ClientId":102,"ClientCode":"ROTT00","ClientName":"ROTTI CONTRACTING INC"},{"ClientId":103,"ClientCode":"RSSU00","ClientName":"RSS UTILITIES, INC."},{"ClientId":104,"ClientCode":"RUDD01","ClientName":"DAVID PAUL RUDDLE"},{"ClientId":105,"ClientCode":"RURA02","ClientName":"RURAL BROADBAND & COMMUNICATIONS INC"},{"ClientId":106,"ClientCode":"SCAR00","ClientName":"SCARLETT COMMUNICATIONS INC"},{"ClientId":107,"ClientCode":"SCSL00","ClientName":"SCS LTD"},{"ClientId":108,"ClientCode":"SILV05","ClientName":"SILVA COMMUNICATIONS LLC"},{"ClientId":109,"ClientCode":"SKYH00","ClientName":"SKYHOOK CABLE INC"},{"ClientId":110,"ClientCode":"SMAR01","ClientName":"SMART COMMUNICATION SYSTEMS LLC"},{"ClientId":111,"ClientCode":"SOSA01","ClientName":"DINA SOSA SILVA"},{"ClientId":112,"ClientCode":"SOUT68","ClientName":"SOUTHERN MINNESOTA DRILLING, INC"},{"ClientId":113,"ClientCode":"SPAL01","ClientName":"SPALJ CONSTRUCTION COMPANY"},{"ClientId":114,"ClientCode":"STAN14","ClientName":"STANLEY CABLE CONSTRUCTION"},{"ClientId":115,"ClientCode":"SUPR01","ClientName":"SUPREME GREEN KC, LLC"},{"ClientId":116,"ClientCode":"TEAG01","ClientName":"TEAGUE ELECTRIC CONSTRUCTION, INC"},{"ClientId":117,"ClientCode":"TELE04","ClientName":"TELESOURCE LLC"},{"ClientId":118,"ClientCode":"TERR05","ClientName":"TERRA TECH INC"},{"ClientId":119,"ClientCode":"TRUC00","ClientName":"TRUCORE COMMUNICATIONS, INC"},{"ClientId":120,"ClientCode":"UTIL07","ClientName":"UTILIBORE, INC."},{"ClientId":121,"ClientCode":"UTIL11","ClientName":"UTILISOUTH, INC."},{"ClientId":122,"ClientCode":"WILS00","ClientName":"WILSON FIBER OPTICS LLC"},{"ClientId":123,"ClientCode":"WILS12","ClientName":"WILSON UNDERGROUND INC"},{"ClientId":124,"ClientCode":"WOLF06","ClientName":"WOLFPACK COMMUNICATIONS LLC"},{"ClientId":125,"ClientCode":"WWUT00","ClientName":"W AND W UTILITY CONSTRUCTION LLC"},{"ClientId":126,"ClientCode":"YOUC00","ClientName":"YOU-CON COMMUNICATIONS, LLC"}];
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

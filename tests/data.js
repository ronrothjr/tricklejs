    (function(d, w) {

        //Exit this self invoking function if the element wasn't created (which means model wasn't populated)
        if (d.querySelector("#vwFilters") == null)
            return;

        //Have to have this bit of script here in the view so that Razor can populate the server side values we're referencing
        w.currentFilter = {"MasterContractId":1,"WorkOrderNumber":"Dycom","WorkRequestId":21,"IncludeLabor":true,"IncludeMaterials":true,"QuantityToggle":"Qty","FiberHoodName":"","LocationFilters":[{state:'FL',county:''}],"subsidiaryId":1,"AllWOfilterSelected":true,"CrewFilters":{"WorkOrderNumber":"Dycom","WorkRequestId":21,"ForemanId":[],"WorkTypeId":[],"CalloutCategoryCodeId":[],"DateRange":{"Begin":null,"End":null}}};
        w.includeWorkorderFiberhoodFilters = 'True'.toLowerCase() === 'true';
        w.includeFiberhoodFilters = 'True'.toLowerCase() === 'true';
        w.includeLocationFilters = 'True'.toLocaleLowerCase() === 'true';
        w.includeLaborAndMaterialFilters = 'True'.toLowerCase() === 'true';
        w.includeQuantityOrAmountFilters = 'True'.toLowerCase() === 'true';
        w.includeCrewFilters = 'True'.toLowerCase() === 'true';
        w.includeWorkTypeFilters = 'True'.toLowerCase() === 'true';
        w.includeDateRangeFilters = 'True'.toLowerCase() === 'true';
        w.includeAllWorkOrdersFilter = 'False'.toLowerCase() === 'true';
        w.allWorkOrderFHoods = {"Dycom":{"21":" - Bear Lakes","22":" - Whispering oaks","33":"Christen's 2nd Hood - test on tuesday","29":"Christen's Hood - KNSSCLOCK","25":"CocaCola - KNSSCOLA"},"Ervin":{"20":" - Lake Catherine","30":"Hood NAme - KNSS"},"Z-28888888":{"23":" - Tom's Fiberhood","26":"DrPepper - KNSSPEP","27":"TESTER - TEST"},"AAAAAdubato":{"31":"Adubato - AAA123","32":"BBBFiber - BBBFiber123","34":"Jayme'sTest - 8675309","35":"TestingJayme - Jayme'sTest"},"Z027_103":{"1":"Business District - KNSSM0CBDF02","11":"Business District - KNSSMOCBDF02","10":"Columbus Park - KNSSMOCBPF01"},"whatever":{"24":"Chips Ahoy - CHIPS"},"TUVW_400":{"13":"Creekside - XXXX45","14":"Rose Terrace - XXXX75"},"DEFG_600":{"9":"Grand Lakes - XXXX15","8":"Imperial Woods - XXXX85"},"JKLM_500":{"12":"Lake Clark Shores - XXXX60"},"WXYZ_700":{"16":"Ocean Breeze - XXXX35"}};
        w.availableWorkOrders = ["--All--","Dycom","Ervin","Z-28888888","AAAAAdubato","Z027_103","whatever","TUVW_400","DEFG_600","JKLM_500","WXYZ_700"];
        w.allWOfilterSelected = 'True'.toLowerCase() !== 'false';
        w.availableFiberhoods = [{id:"0",text:"  --All--"},{id:"21",text:" - Bear Lakes"},{id:"22",text:" - Whispering oaks"},{id:"33",text:"Christen's 2nd Hood - test on tuesday"},{id:"29",text:"Christen's Hood - KNSSCLOCK"},{id:"25",text:"CocaCola - KNSSCOLA"},{id:"20",text:" - Lake Catherine"},{id:"30",text:"Hood NAme - KNSS"},{id:"23",text:" - Tom's Fiberhood"},{id:"26",text:"DrPepper - KNSSPEP"},{id:"27",text:"TESTER - TEST"},{id:"31",text:"Adubato - AAA123"},{id:"32",text:"BBBFiber - BBBFiber123"},{id:"34",text:"Jayme'sTest - 8675309"},{id:"35",text:"TestingJayme - Jayme'sTest"},{id:"1",text:"Business District - KNSSM0CBDF02"},{id:"11",text:"Business District - KNSSMOCBDF02"},{id:"10",text:"Columbus Park - KNSSMOCBPF01"},{id:"24",text:"Chips Ahoy - CHIPS"},{id:"13",text:"Creekside - XXXX45"},{id:"14",text:"Rose Terrace - XXXX75"},{id:"9",text:"Grand Lakes - XXXX15"},{id:"8",text:"Imperial Woods - XXXX85"},{id:"12",text:"Lake Clark Shores - XXXX60"},{id:"16",text:"Ocean Breeze - XXXX35"}];
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
        w.subcontractors = [{"ForemanId":27,"SubsidiaryId":1,"ForemanCode":"ADVA02","ForemanName":"ADVANCED CABLE SERVICES, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":28,"SubsidiaryId":1,"ForemanCode":"AJAX00","ForemanName":"DEIDO DEPINTOR","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":29,"SubsidiaryId":1,"ForemanCode":"ALLE06","ForemanName":"ALLEN FRANKS CONSTRUCTION","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":30,"SubsidiaryId":1,"ForemanCode":"ALLI07","ForemanName":"ALL IN ONE CONTRACTOR INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":31,"SubsidiaryId":1,"ForemanCode":"ALLS00","ForemanName":"ALL STAR UNDERGROUND LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":32,"SubsidiaryId":1,"ForemanCode":"APPA02","ForemanName":"APPALACHIAN CABLE INSTALLERS, INC.","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":33,"SubsidiaryId":1,"ForemanCode":"ARCH03","ForemanName":"ARCHEY WAY COMMUNICATIONS, LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":34,"SubsidiaryId":1,"ForemanCode":"ATLA04","ForemanName":"ATLANTIC ENGINEERING GROUP, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":35,"SubsidiaryId":1,"ForemanCode":"BAIL01","ForemanName":"BAILEY'S UNDERGROUND CONST., LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":36,"SubsidiaryId":1,"ForemanCode":"BCOM00","ForemanName":"B-COMM LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":37,"SubsidiaryId":1,"ForemanCode":"BKTE00","ForemanName":"B&K TELECOMMUNICATIONS & CONST., LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":38,"SubsidiaryId":1,"ForemanCode":"BLAC10","ForemanName":"BLACK RIVER UNDERGROUND INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":39,"SubsidiaryId":1,"ForemanCode":"BURK03","ForemanName":"DONALD E BURKHART","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":40,"SubsidiaryId":1,"ForemanCode":"BVTE00","ForemanName":"BV TECHNOLOGIES, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":41,"SubsidiaryId":1,"ForemanCode":"CABL18","ForemanName":"CABLE DIVISION INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":42,"SubsidiaryId":1,"ForemanCode":"CANN02","ForemanName":"CANNON UTILITY SERVICES, LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":43,"SubsidiaryId":1,"ForemanCode":"CAT500","ForemanName":"CAT 5 CONSTRUCTION SERVICES LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":44,"SubsidiaryId":1,"ForemanCode":"CAUT00","ForemanName":"C & A UTILITIES INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":45,"SubsidiaryId":1,"ForemanCode":"CCUT00","ForemanName":"C&C UTILITY CONSTRUCTION LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":46,"SubsidiaryId":1,"ForemanCode":"CDPC00","ForemanName":"CHARLES DAVID PIKE","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":47,"SubsidiaryId":1,"ForemanCode":"COMM25","ForemanName":"COMMUNICATION DATA LINK LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":48,"SubsidiaryId":1,"ForemanCode":"COMO01","ForemanName":"COM ONE LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":49,"SubsidiaryId":1,"ForemanCode":"CSUI00","ForemanName":"CSU, INC.","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":50,"SubsidiaryId":1,"ForemanCode":"DACU00","ForemanName":"DAC UNDERGROUND, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":51,"SubsidiaryId":1,"ForemanCode":"DIVI01","ForemanName":"DIVINE INDUSTRIES, LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":52,"SubsidiaryId":1,"ForemanCode":"DJCA00","ForemanName":"DJ CABLE COMMUNICATION, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":53,"SubsidiaryId":1,"ForemanCode":"ELAN00","ForemanName":"ELAN ENGINEERING INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":54,"SubsidiaryId":1,"ForemanCode":"ENTE02","ForemanName":"ENTERPRISE UTILITY CONSTRUCTION INC.","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":55,"SubsidiaryId":1,"ForemanCode":"ENTE03","ForemanName":"ENTERPRIZE CONSULTING, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":56,"SubsidiaryId":1,"ForemanCode":"FIBE11","ForemanName":"FIBER TECHNOLOGY SERVICES, LP","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":57,"SubsidiaryId":1,"ForemanCode":"FIBE13","ForemanName":"FIBER OPTIC SPECIALISTS INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":58,"SubsidiaryId":1,"ForemanCode":"FOOS00","ForemanName":"FOOSCO LLC  INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":59,"SubsidiaryId":1,"ForemanCode":"FORS01","ForemanName":"KEITH R FORSYTH","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":60,"SubsidiaryId":1,"ForemanCode":"FRON03","ForemanName":"MARK MUDD","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":61,"SubsidiaryId":1,"ForemanCode":"GALL07","ForemanName":"GALLAWAY CONSTRUCTION LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":62,"SubsidiaryId":1,"ForemanCode":"GANN00","ForemanName":"GANN CONSTRUCTION, INC.","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":63,"SubsidiaryId":1,"ForemanCode":"GARR05","ForemanName":"GARRETT SERVICES LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":64,"SubsidiaryId":1,"ForemanCode":"GAUN00","ForemanName":"GA UNDERGROUND UTILITIES, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":65,"SubsidiaryId":1,"ForemanCode":"HALL18","ForemanName":"HALL COMMUNICATIONS INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":66,"SubsidiaryId":1,"ForemanCode":"HALL19","ForemanName":"HALL & COMPANY SERVICES LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":67,"SubsidiaryId":1,"ForemanCode":"HURK00","ForemanName":"HURK UNDERGROUND TECHNOLOGIES, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":68,"SubsidiaryId":1,"ForemanCode":"HUTC09","ForemanName":"TILAS S HUTCHISON","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":69,"SubsidiaryId":1,"ForemanCode":"ICEU00","ForemanName":"ICE UNDERGROUND INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":70,"SubsidiaryId":1,"ForemanCode":"INTE19","ForemanName":"INTERNATIONAL, INC.","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":71,"SubsidiaryId":1,"ForemanCode":"JACO01","ForemanName":"GLEN ALLEN JACOBS","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":72,"SubsidiaryId":1,"ForemanCode":"JGBC00","ForemanName":"JUAN BURUCA","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":73,"SubsidiaryId":1,"ForemanCode":"JKUN00","ForemanName":"JOSEPH C FRITZ","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":74,"SubsidiaryId":1,"ForemanCode":"JONE13","ForemanName":"DAVID ANDREW JONES II","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":75,"SubsidiaryId":1,"ForemanCode":"KANE00","ForemanName":"KANE DIRECTIONAL DRILLING, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":76,"SubsidiaryId":1,"ForemanCode":"KASC00","ForemanName":"KAS COMMUNICATIONS LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":77,"SubsidiaryId":1,"ForemanCode":"KCCA00","ForemanName":"KC CABLE CONNECTIONS, LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":78,"SubsidiaryId":1,"ForemanCode":"KJTE00","ForemanName":"K & J TELECOMMUNICATIONS","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":79,"SubsidiaryId":1,"ForemanCode":"KWUG00","ForemanName":"K & W UNDERGROUND, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":80,"SubsidiaryId":1,"ForemanCode":"LANT00","ForemanName":"LAN-TEL COMMUNICATIONS SERVICES INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":81,"SubsidiaryId":1,"ForemanCode":"LBSE00","ForemanName":"L & B SERVICES,LLC  INC.","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":82,"SubsidiaryId":1,"ForemanCode":"LEMS00","ForemanName":"LEM SERVICES,LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":83,"SubsidiaryId":1,"ForemanCode":"LMCA00","ForemanName":"L & M CABLE, INC.","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":84,"SubsidiaryId":1,"ForemanCode":"MACK02","ForemanName":"MACK COMMUNICATION,LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":85,"SubsidiaryId":1,"ForemanCode":"MADO00","ForemanName":"MADOVIS COMMUNICATIONS, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":86,"SubsidiaryId":1,"ForemanCode":"MARI02","ForemanName":"MARION UNDERGROUND CONST., INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":87,"SubsidiaryId":1,"ForemanCode":"MELL01","ForemanName":"MELLAGE ENTERPRISES LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":88,"SubsidiaryId":1,"ForemanCode":"MIDW17","ForemanName":"MIDWEST UTILITY INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":89,"SubsidiaryId":1,"ForemanCode":"MISH00","ForemanName":"MISHA CABLE INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":90,"SubsidiaryId":1,"ForemanCode":"NAVA00","ForemanName":"FABIAN NAVARRO","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":91,"SubsidiaryId":1,"ForemanCode":"NEEL00","ForemanName":"NEEL CABLE SERVICES INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":92,"SubsidiaryId":1,"ForemanCode":"NEXG00","ForemanName":"NEXGEN COMMUNICATIONS INC.","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":93,"SubsidiaryId":1,"ForemanCode":"NICK01","ForemanName":"NICUSOR ROBITU","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":94,"SubsidiaryId":1,"ForemanCode":"OPTX00","ForemanName":"OPTX COMMUNICATIONS INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":95,"SubsidiaryId":1,"ForemanCode":"OVER07","ForemanName":"OVER AND UNDER UTILITY LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":96,"SubsidiaryId":1,"ForemanCode":"OWEN06","ForemanName":"OWENS TELECOM SERVICES, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":97,"SubsidiaryId":1,"ForemanCode":"PLEA00","ForemanName":"PLEASANT AND SONS CONSTRUCTION","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":98,"SubsidiaryId":1,"ForemanCode":"PREC03","ForemanName":"PRECISION LIGHT WAVE LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":99,"SubsidiaryId":1,"ForemanCode":"PRIV00","ForemanName":"SUNDAY OMOREGIE","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":100,"SubsidiaryId":1,"ForemanCode":"PRON00","ForemanName":"PRONTO SERVICES, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":101,"SubsidiaryId":1,"ForemanCode":"ROBE08","ForemanName":"ROBERTS COMMUNICATIONS INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":102,"SubsidiaryId":1,"ForemanCode":"ROTT00","ForemanName":"ROTTI CONTRACTING INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":103,"SubsidiaryId":1,"ForemanCode":"RSSU00","ForemanName":"RSS UTILITIES, INC.","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":104,"SubsidiaryId":1,"ForemanCode":"RUDD01","ForemanName":"DAVID PAUL RUDDLE","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":105,"SubsidiaryId":1,"ForemanCode":"RURA02","ForemanName":"RURAL BROADBAND & COMMUNICATIONS INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":106,"SubsidiaryId":1,"ForemanCode":"SCAR00","ForemanName":"SCARLETT COMMUNICATIONS INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":107,"SubsidiaryId":1,"ForemanCode":"SCSL00","ForemanName":"SCS LTD","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":108,"SubsidiaryId":1,"ForemanCode":"SILV05","ForemanName":"SILVA COMMUNICATIONS LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":109,"SubsidiaryId":1,"ForemanCode":"SKYH00","ForemanName":"SKYHOOK CABLE INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":110,"SubsidiaryId":1,"ForemanCode":"SMAR01","ForemanName":"SMART COMMUNICATION SYSTEMS LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":111,"SubsidiaryId":1,"ForemanCode":"SOSA01","ForemanName":"DINA SOSA SILVA","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":112,"SubsidiaryId":1,"ForemanCode":"SOUT68","ForemanName":"SOUTHERN MINNESOTA DRILLING, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":113,"SubsidiaryId":1,"ForemanCode":"SPAL01","ForemanName":"SPALJ CONSTRUCTION COMPANY","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":114,"SubsidiaryId":1,"ForemanCode":"STAN14","ForemanName":"STANLEY CABLE CONSTRUCTION","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":115,"SubsidiaryId":1,"ForemanCode":"SUPR01","ForemanName":"SUPREME GREEN KC, LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":116,"SubsidiaryId":1,"ForemanCode":"TEAG01","ForemanName":"TEAGUE ELECTRIC CONSTRUCTION, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":117,"SubsidiaryId":1,"ForemanCode":"TELE04","ForemanName":"TELESOURCE LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":118,"SubsidiaryId":1,"ForemanCode":"TERR05","ForemanName":"TERRA TECH INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":119,"SubsidiaryId":1,"ForemanCode":"TRUC00","ForemanName":"TRUCORE COMMUNICATIONS, INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":120,"SubsidiaryId":1,"ForemanCode":"UTIL07","ForemanName":"UTILIBORE, INC.","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":121,"SubsidiaryId":1,"ForemanCode":"UTIL11","ForemanName":"UTILISOUTH, INC.","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":122,"SubsidiaryId":1,"ForemanCode":"WILS00","ForemanName":"WILSON FIBER OPTICS LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":123,"SubsidiaryId":1,"ForemanCode":"WILS12","ForemanName":"WILSON UNDERGROUND INC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":124,"SubsidiaryId":1,"ForemanCode":"WOLF06","ForemanName":"WOLFPACK COMMUNICATIONS LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":125,"SubsidiaryId":1,"ForemanCode":"WWUT00","ForemanName":"W AND W UTILITY CONSTRUCTION LLC","SubcontractorFlag":false,"LastUpdatedUserId":0},{"ForemanId":126,"SubsidiaryId":1,"ForemanCode":"YOUC00","ForemanName":"YOU-CON COMMUNICATIONS, LLC","SubcontractorFlag":false,"LastUpdatedUserId":0}];
        w.selectedSubcontractors = (function () {
            var foremanList = [];
            if (w.currentFilter.CrewFilters.ForemanId) {
                var foremen = w.currentFilter.CrewFilters.ForemanId;
                for (var foreman in foremen)
                    foremanList.push(parseInt(foremen[foreman]));
            }
            return foremanList;
          })();
        w.availableSubcontractors = (function () {
            var availableSubcontractors = [];
            for (var subcontractor in w.subcontractors) {
              availableSubcontractors.push({
                id: w.subcontractors[subcontractor].ForemanId,
                text: w.subcontractors[subcontractor].ForemanName + 
                  ' (' + w.subcontractors[subcontractor].ForemanCode + ')'
              });
            }
            availableSubcontractors.sort(function (l, r) {
              return l.text > r.text ? 1 : -1
            });
            return availableSubcontractors;
          })();
        w.workTypes = [{"WorkTypeId":1,"WorkType":"Install Google Fiberhood"},{"WorkTypeId":2,"WorkType":"Underground"},{"WorkTypeId":3,"WorkType":"Install"},{"WorkTypeId":4,"WorkType":"Splicing"},{"WorkTypeId":5,"WorkType":"Aerial"},{"WorkTypeId":6,"WorkType":"Hourly"},{"WorkTypeId":7,"WorkType":"Other"},{"WorkTypeId":8,"WorkType":"Material"},{"WorkTypeId":9,"WorkType":"Power Supply"},{"WorkTypeId":10,"WorkType":"Sweep"}];
        w.selectedWorkTypes = (function () {
            var worktypeList = [];
            if (w.currentFilter.CrewFilters.WorkTypeId) {
                var worktypes = w.currentFilter.CrewFilters.WorkTypeId;
                for (var worktype in worktypes)
                    worktypeList.push(parseInt(worktypes[worktype]));
            }
            return worktypeList;
          })();
        w.availableWorkTypes = (function () {
            var availableWorkTypes = [];
            for (var worktype in w.workTypes) {
              availableWorkTypes.push({
                id: w.workTypes[worktype].WorkTypeId,
                text: w.workTypes[worktype].WorkType
              });
            }
            availableWorkTypes.sort(function (l, r) {
              return l.text > r.text ? 1 : -1
            });
            return availableWorkTypes;
          })();
        w.calloutCategories = [{"CalloutCategoryCodeId":1,"Name":"Splicing","Description":"Callout for splicing units","LastUpdateUserId":0,"LastUpdateTimestamp":"0001-01-01T00:00:00"},{"CalloutCategoryCodeId":2,"Name":"Lashed Fiber","Description":"Callout for lashed fiber units","LastUpdateUserId":0,"LastUpdateTimestamp":"0001-01-01T00:00:00"},{"CalloutCategoryCodeId":3,"Name":"Underground","Description":"Callout for underground units","LastUpdateUserId":0,"LastUpdateTimestamp":"0001-01-01T00:00:00"},{"CalloutCategoryCodeId":4,"Name":"Strand","Description":"Callout for strand units","LastUpdateUserId":0,"LastUpdateTimestamp":"0001-01-01T00:00:00"},{"CalloutCategoryCodeId":5,"Name":"Pulled Fiber","Description":"Callout for pulled fiber","LastUpdateUserId":0,"LastUpdateTimestamp":"0001-01-01T00:00:00"}];
        w.selectedCalloutCategories = (function () {
            var calloutcategoriesList = [];
            if (w.currentFilter.CrewFilters.CalloutCategoryCodeId) {
                var calloutcategories = w.currentFilter.CrewFilters.CalloutCategoryCodeId;
                for (var calloutcategory in calloutcategories)
                    calloutcategoriesList.push(parseInt(calloutcategories[calloutcategory]));
            }
            return calloutcategoriesList;
          })();
        w.availableCalloutCategories = (function () {
            var availableCalloutCategories = [];
            for (var calloutcategory in w.calloutCategories) {
              availableCalloutCategories.push({
                id: w.calloutCategories[calloutcategory].CalloutCategoryCodeId,
                text: w.calloutCategories[calloutcategory].Name
              });
            }
            availableCalloutCategories.sort(function (l, r) {
              return l.text > r.text ? 1 : -1
            });
            return availableCalloutCategories;
          })();
        w.includeLabor = true;
        w.includeMaterials = true;
    })(document, window);
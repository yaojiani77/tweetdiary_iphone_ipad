// Generated by CoffeeScript 1.4.0
(function() {

  Ext.setup({
    tabletStartupScreen: "tablet_startup.png",
    phoneStartupScreen: "phone_startup.png",
    icon: "icon.png",
    glossOnIcon: false,
    onReady: function() {
      var all_entries, carousel1, groupingBase, list;
      Ext.regModel("Entry", {
        fields: ["text", "create_time", "tags", "date", "seconds"]
      });
      all_entries = get_entry();
      window.store = new Ext.data.Store({
        model: "Entry",
        sorters: {
          property: "seconds",
          direction: "DESC"
        },
        getGroupString: function(record) {
          var a, b, week;
          a = record.get("date");
          b = new Date(a);
          week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return week[b.getDay()] + ', ' + record.get("date");
        },
        data: all_entries
      });
      groupingBase = {
        itemTpl: "<div class=\"maintext {tags}\" id=\"{id}\">{text} <div onclick=\"window.toggle_todo('{id}');return false;\" class=\"checkbox\"><i class=\"icon-ok\"></i></div></div> <div class=\"timetext\">{create_time}</div>",
        singleSelect: false,
        multiSelect: false,
        grouped: true,
        indexBar: false,
        disableSelection: true,
        /*
              onItemTap: ()->
                console.log("testing item tap")
                #alert "Disclose more info for " + record.get("firstName")
                console.log( record.data )
                window.r_id = record.data.id
                $("#buttonbar").show()
                $("#writearea").val(record.get("text"))
                window.carousel.setActiveItem( 0, 'flip' )
        */

        onItemDisclosure: {
          scope: "test",
          handler: function(record, btn, index) {
            console.log(record.data);
            window.r_id = record.data.id;
            $("#buttonbar").show();
            $("#writearea").val(record.get("text"));
            return window.carousel.setActiveItem(0, 'flip');
          }
        },
        listeners: {
          itemtap: function(list, index, item, e) {
            var record;
            console.log("tapped", e);
            if (e.target.className !== "checkbox" && e.target.className !== "icon-ok") {
              record = window.list.store.getAt(index);
              window.r_id = record.data.id;
              $("#deletebutton").show();
              $("#clearbutton").hide();
              $("#writearea").val(record.get("text"));
              return window.carousel.setActiveItem(0, 'flip');
            }
          }
        },
        store: window.store
      };
      list = new Ext.List(Ext.apply(groupingBase, {
        id: "entry_list",
        centered: true,
        modal: true,
        html: "<div id='entryfilter' style='position: absolute; width: 100%; height: 40px; bottom: 0px; background-color: #050'>ABCDE</div>"
      }));
      window.list = list;
      carousel1 = new Ext.Carousel({
        defaults: {
          cls: "card"
        },
        items: [
          {
            html: "<textarea type=\"textarea\" id='writearea' placeholder='Tap and add your entry; Hit return to save'></textarea>\n<div id=\"buttonbar\">\n  <a class=\"button\" onclick=\"window.save_entry()\">Save</a>\n    <a class=\"button rightbutton\" onclick=\"$('#writearea').val('')\" id=\"clearbutton\">Clear</a>\n  <a class=\"button rightbutton\" onclick=\"window.delete_entry()\" id=\"deletebutton\" style=\"display: none;\">Delete</a>\n</div>"
          }, list, {
            title: "Tab 3",
            html: "<div class=\"x-list\">\n  <div class=\"x-list-item\">\n    <div class=\"x-list-item-body\">\n      <div class=\"maintext\">\n        <p style=\"color: #fff; padding: 10px\">Sync all your entries across multiple devices by setting up storage on Dropbox.</p>\n        <p style=\"color: #fff; padding: 10px\">First click on authorize and then allow data access on the Dropbox link in the browser. Then click on validate back in the app.</p>\n      </div> \n    </div>\n    <div class=\"x-list-disclosure\"></div>\n  </div>\n  <div class=\"x-list-item\" onclick=\"window.auth()\">\n    <div class=\"x-list-item-body\">\n      <div class=\"maintext\">\n        <p style=\"color: #fff; padding: 10px; text-align: middle\"><i class=\"icon-key\"></i> Authorize</p>\n      </div> \n    </div>\n    <div class=\"x-list-disclosure\"></div>\n  </div>\n  <div class=\"x-list-item\" onclick=\"window.validate()\">\n    <div class=\"x-list-item-body\">\n      <div class=\"maintext\">\n        <p style=\"color: #fff; padding: 10px; text-align: middle\"><i class=\"icon-ok-1\"></i> Validate</p>\n      </div> \n    </div>\n    <div class=\"x-list-disclosure\"></div>\n  </div>\n  <div class=\"x-list-item\" onclick=\"window.sync_entry()\">\n    <div class=\"x-list-item-body\">\n      <div class=\"maintext\">\n        <p style=\"color: #fff; padding: 10px; text-align: middle\"><i class=\"icon-arrows-ccw\"></i> Sync All</p>\n      </div> \n    </div>\n    <div class=\"x-list-disclosure\"></div>\n  </div>                  \n</div>"
          }
        ]
      });
      window.carousel = carousel1;
      carousel1.addListener("cardswitch", function(obj, newCard, oldCard, index, animated) {
        if (index !== 0) {
          if (window.rid !== "") {
            $("#writearea").val("");
          }
          $("#deletebutton").hide();
          return $("#clearbutton").show();
        }
      });
      new Ext.Panel({
        fullscreen: true,
        layout: {
          type: "vbox",
          align: "stretch"
        },
        defaults: {
          flex: 1
        },
        items: [carousel1]
      });
      $("#entry_list").append("<div id='entryfilter'><input type='text' name='' placeholder='put tag here to filter' id='filtertext'></div>");
      $("#filtertext").keyup(function() {
        if ($("#filtertext").val() !== "") {
          window.list.scroller.scrollTo({
            x: 0,
            y: 0
          });
          return window.filter_store($("#filtertext").val().replace("#", ""));
        } else {
          window.store.filterBy(function() {
            return true;
          });
          return window.store.sort("seconds", "DESC");
        }
      });
      $("#writearea").keydown(function(e) {
        var keyCode;
        keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          window.create_new_entry();
          return false;
        }
      });
      return window.auto_sync();
    }
  });

}).call(this);

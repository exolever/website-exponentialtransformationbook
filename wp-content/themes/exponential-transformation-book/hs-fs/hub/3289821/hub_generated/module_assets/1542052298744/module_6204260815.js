  var module_4019452 = (function() {
      var __hs_messages = {};
      i18n_getmessage = function() {
          return hs_i18n_getMessage(__hs_messages, hsVars['language'], arguments);
      };
      i18n_getlanguage = function() {
          return hsVars['language'];
      };
      // Inspiration: https://tympanus.net/codrops/2012/10/04/custom-drop-down-list-styling/

      function DropDown(el) {
          this.dd = el;
          this.placeholder = this.dd.children('span');
          this.opts = this.dd.find('ul.drop li');
          this.val = '';
          this.index = -1;
          this.initEvents();
      }

      DropDown.prototype = {
          initEvents: function() {
              var obj = this;
              obj.dd.on('click', function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  $(this).toggleClass('active');
              });
              obj.opts.on('click', function() {
                  var opt = $(this);
                  obj.val = opt.text();
                  obj.index = opt.index();
                  obj.placeholder.text(obj.val);
                  opt.siblings().removeClass('selected');
                  opt.filter(':contains("' + obj.val + '")').addClass('selected');
              }).change();
          },
          getValue: function() {
              return this.val;
          },
          getIndex: function() {
              return this.index;
          }
      };

      $(function() {
          // create new variable for each menu
          var dd1 = new DropDown($('#location-drop'));
          // var dd2 = new DropDown($('#other-locations'));
          $(document).click(function() {
              // close menu on document click
              $('.wrap-drop').removeClass('active');
          });
      });

      class FilterGallery {

          constructor() {
              this.$filtermenuList = $('.filtermenu li');
              this.$container = $('.container');

              this.updateMenu('all');
              this.$filtermenuList.on('click', $.proxy(this.onClickFilterMenu, this));
          }

          onClickFilterMenu(event) {
              const $target = $(event.target);
              const targetFilter = $target.data('filter');

              this.updateMenu(targetFilter);
              this.updateGallery(targetFilter);
          }

          updateMenu(targetFilter) {
              this.$filtermenuList.removeClass('active');
              this.$filtermenuList.each((index, element) => {
                  const targetData = $(element).data('filter');

                  if (targetData === targetFilter) {
                      $(element).addClass('active');
                  }
              })
          }

          updateGallery(targetFilter) {

              if (targetFilter === 'all') {
                  this.$container.fadeOut(300, () => {
                      $('.post').show();
                      this.$container.fadeIn();
                  });
              } else {
                  this.$container.find('.post').each((index, element) => {
                      this.$container.fadeOut(300, () => {
                          if ($(element).hasClass(targetFilter)) {
                              $(element).show();
                          } else {
                              $(element).hide();
                          }
                          this.$container.fadeIn();
                      })
                  });
              }
          }
      }

      const fliterGallery = new FilterGallery();
  })();
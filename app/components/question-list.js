import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  r: 1,
  slides: null,
  init() {
    this._super(...arguments);
  },
  actions: {
    handleNext() {
      let slides = this.get('slides');
      let r = this.get('r');
      if (r < slides.length) {
        let activeSlide = $(".active");
        activeSlide.addClass("turnedLeft");
        activeSlide.removeClass("active");
        activeSlide.removeClass("turnedRight");
        activeSlide.next().addClass("active");
        r++;
        this.set('r', r);
      }
    },
    handlePrevious() {
      let r = this.get('r');
      if (r > 1) {
        let activeSlide = $(".active");
        activeSlide.addClass("turnedRight");
        activeSlide.removeClass("active");
        activeSlide.removeClass("turnedLeft");
        activeSlide.prev().addClass("active");
        r--;
        this.set('r', r);
      }
    }
  },
  didRender() {
    
  },
  didInsertElement() {
    this._super(...arguments);
    this.set('slides', $("#card").children());
  }
});

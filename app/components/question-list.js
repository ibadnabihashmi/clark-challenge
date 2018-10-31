import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  current: 1,
  slides: null,
  init() {
    this._super(...arguments);
  },
  actions: {
    handleNext() {
      let slides = this.get('slides');
      let current = this.get('current');
      if (current < slides.length) {
        let activeSlide = $(".active");
        activeSlide.addClass("turnedLeft");
        activeSlide.removeClass("active");
        activeSlide.removeClass("turnedRight");
        activeSlide.next().addClass("active");
        current++;
        this.set('current', current);
      }
    },
    handlePrevious() {
      let current = this.get('current');
      if (current > 1) {
        let activeSlide = $(".active");
        activeSlide.addClass("turnedRight");
        activeSlide.removeClass("active");
        activeSlide.removeClass("turnedLeft");
        activeSlide.prev().addClass("active");
        current--;
        this.set('current', current);
      }
    }
  },
  didInsertElement() {
    this._super(...arguments);
    const slides = $("#card").children();
    for (let i=1;i<slides.length;i++) {
      $(slides[i]).removeClass('active');
    }
    this.set('slides', slides);
  }
});

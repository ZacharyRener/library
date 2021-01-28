export default class Home {

    constructor() {
      this.matchOfferHeights();
      window.onresize = () => {
          this.matchOfferHeights();
      }
    }
  
    matchOfferHeights() {
      
      const offers = document.querySelectorAll('.b-t-p-section .team-box .our-team-box');
      let largestHeight = -1;
      offers.forEach(offer=>{
        offer.setAttribute("style", "")
      })
      offers.forEach(offer=>{
        largestHeight = offer.offsetHeight > largestHeight
          ? offer.offsetHeight
          : largestHeight;
      })
      offers.forEach(offer=>{
        offer.setAttribute("style", `height:${largestHeight}px;`)
      })
    }
  
  }
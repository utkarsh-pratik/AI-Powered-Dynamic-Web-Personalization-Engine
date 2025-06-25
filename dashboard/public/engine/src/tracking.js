export function trackClicks(elements, callback) {
  elements.forEach(el => {
    el.addEventListener('click', (e) => {
      callback({
        type: 'click',
        // Pass a serializable object instead of the DOM element
        elementData: {
          cluster: el.dataset.cluster
        },
        timestamp: Date.now()
      });
    });
  });
}
  
  export function trackScroll(callback) {
    window.addEventListener('scroll', () => {
      callback({
        type: 'scroll',
        scrollY: window.scrollY,
        timestamp: Date.now()
      });
    });
  }
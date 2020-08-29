
/**
  * @param  {} element
  * @param  {} type
  * @param  {} handler
  */
export const on = function (element, type, handler) {
  if (document.addEventListener) {
    if (element && type && handler) {
      element.addEventListener(type, handler, false);
    }
  } else {
    if (element && type && handler) {
      element.attachEvent('on' + type, handler);
    }
  }
};


export const off = function (element, type, handler) {
  if (document.addEventListener) {
    if (element && type) {
      element.removeEventListener(type, handler, false);
    }
  } else {
    if (element && type) {
      element.detachEvent('on' + type, handler);
    }
  }
}

export const toRawType = (s) => {
  return Object.prototype.toString.call(s).slice(8, -1).toLowerCase()
}



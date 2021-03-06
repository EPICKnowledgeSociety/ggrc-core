/*
    Copyright (C) 2018 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import Stub from './stub';

const getInstance = (objectType, objectId, paramsOrObject) => {
  let model;
  let params = {};
  let instance;
  let href;

  if (typeof objectType === 'object' || objectType instanceof Stub) {
    // assume we only passed in params_or_object
    paramsOrObject = objectType;
    if (!paramsOrObject) {
      return null;
    }
    if (paramsOrObject instanceof can.Model) {
      objectType = paramsOrObject.constructor.shortName;
    } else if (paramsOrObject instanceof Stub) {
      objectType = paramsOrObject.type;
    } else if (!paramsOrObject.selfLink && paramsOrObject.type) {
      objectType = paramsOrObject.type;
    } else {
      href = paramsOrObject.selfLink || paramsOrObject.href;
      objectType = can.map(
        window.cms_singularize(/^\/api\/(\w+)\//.exec(href)[1]).split('_'),
        can.capitalize
      ).join('');
    }
    objectId = paramsOrObject.id;
  }

  model = CMS.Models[objectType];

  if (!model) {
    return null;
  }

  if (!objectId) {
    return null;
  }

  if (paramsOrObject) {
    if ($.isFunction(paramsOrObject.serialize)) {
      $.extend(params, paramsOrObject.serialize());
    } else {
      $.extend(params, paramsOrObject || {});
    }
  }

  instance = model.findInCacheById(objectId);
  if (!instance) {
    if (params.selfLink) {
      params.id = objectId;
      instance = new model(params);
    } else {
      instance = new model({
        id: objectId,
        type: objectType,
        href: (paramsOrObject || {}).href,
      });
    }
  }
  return instance;
};

export {
  getInstance,
};

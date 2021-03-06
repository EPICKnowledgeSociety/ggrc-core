/*
    Copyright (C) 2018 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import Cacheable from '../cacheable';
import '../mixins/unique-title';
import '../mixins/ca-update';
import '../mixins/access-control-list';
import '../mixins/base-notifications';
import Stub from '../stub';

export default Cacheable('CMS.Models.Clause', {
  root_object: 'clause',
  root_collection: 'clauses',
  model_plural: 'Clauses',
  table_plural: 'clauses',
  title_plural: 'Clauses',
  model_singular: 'Clause',
  title_singular: 'Clause',
  table_singular: 'clause',
  category: 'governance',
  root_model: 'Clause',
  findAll: 'GET /api/clauses',
  findOne: 'GET /api/clauses/{id}',
  create: 'POST /api/clauses',
  update: 'PUT /api/clauses/{id}',
  destroy: 'DELETE /api/clauses/{id}',
  is_custom_attributable: true,
  isRoleable: true,
  mixins: [
    'unique_title',
    'ca_update',
    'accessControlList',
    'base-notifications',
  ],
  attributes: {
    context: Stub,
    modified_by: Stub,
  },
  tree_view_options: {
    attr_view: '/static/mustache/requirements/tree-item-attr.mustache',
    attr_list: Cacheable.attr_list.concat([
      {attr_title: 'Reference URL', attr_name: 'reference_url'},
      {attr_title: 'Last Deprecated Date', attr_name: 'end_date'},
      {
        attr_title: 'Description',
        attr_name: 'description',
        disable_sorting: true,
      }, {
        attr_title: 'Notes',
        attr_name: 'notes',
        disable_sorting: true,
      }, {
        attr_title: 'Assessment Procedure',
        attr_name: 'test_plan',
        disable_sorting: true,
      }]),
    add_item_view: GGRC.mustache_path + '/snapshots/tree_add_item.mustache',
  },
  sub_tree_view_options: {
    default_filter: ['Contract'],
  },
  defaults: {
    status: 'Draft',
  },
  statuses: ['Draft', 'Deprecated', 'Active'],
  init: function () {
    this._super(...arguments);
    this.validateNonBlank('title');
  },
}, {});

frappe.listview_settings['WooCommerce Order'] = {
  onload: function (listview) {
    listview.page.add_inner_button(__('Bulk Sync to ERPNext'), function () {
      const selected = listview.get_checked_items();
      if (!selected.length) {
        frappe.msgprint(__('Please select at least one order.'));
        return;
      }

      const order_names = selected.map(row => row.name);

      frappe.call({
        method: 'woocommerce_fusion.doctype.woocommerce_order.woocommerce_order.bulk_sync',
        args: { order_names },
        callback: function (r) {
          frappe.msgprint(r.message || __('Sync complete'));
          listview.refresh();
        }
      });
    });
  }
};

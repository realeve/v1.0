/*!
 * Print button for Buttons and DataTables.
 * 2015 SpryMedia Ltd - datatables.net/license
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net', 'datatables.net-buttons'], function($) {
			return factory($, window, document);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function(root, $) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			if (!$.fn.dataTable.Buttons) {
				require('datatables.net-buttons')(root, $);
			}

			return factory($, root, root.document);
		};
	} else {
		// Browser
		factory(jQuery, window, document);
	}
}(function($, window, document, undefined) {
	'use strict';
	var DataTable = $.fn.dataTable;


	var _link = document.createElement('a');

	/**
	 * Convert a `link` tag's URL from a relative to an absolute address so it will
	 * work correctly in the popup window which has no base URL.
	 *
	 * @param  {node}     el Element to convert
	 */
	var _relToAbs = function(el) {
		var url;
		var clone = $(el).clone()[0];
		var linkHost;

		if (clone.nodeName.toLowerCase() === 'link') {
			_link.href = clone.href;
			linkHost = _link.host;

			// IE doesn't have a trailing slash on the host
			// Chrome has it on the pathname
			if (linkHost.indexOf('/') === -1 && _link.pathname.indexOf('/') !== 0) {
				linkHost += '/';
			}

			clone.href = _link.protocol + "//" + linkHost + _link.pathname + _link.search;
		}

		return clone.outerHTML;
	};

	DataTable.ext.buttons.share = {
		className: 'buttons-print',

		text: function(dt) {
			return dt.i18n('buttons.share', 'Share');
		},

		action: function(e, dt, button, config) {
			var data = dt.buttons.exportData(config.exportOptions);
			var addRow = function(d, tag) {
				var str = '<tr>';

				for (var i = 0, ien = d.length; i < ien; i++) {
					str += '<' + tag + '>' + d[i] + '</' + tag + '>';
				}

				return str + '</tr>';
			};

			// Construct a table for printing
			var html = '<table class="' + dt.table().node().className + '">';

			if (config.header) {
				html += '<thead>' + addRow(data.header, 'th') + '</thead>';
			}

			html += '<tbody>';
			for (var i = 0, ien = data.body.length; i < ien; i++) {
				html += addRow(data.body[i], 'td');
			}
			html += '</tbody>';

			if (config.footer) {
				html += '<thead>' + addRow(data.footer, 'th') + '</thead>';
			}

			// Open a new window for the printable table
			//var win = window.open('', '');
			var title = config.title.replace('*', $('title').text());

			/*win.document.close();*/

			// Inject the title and also a copy of the style and link tags from this
			// document so the table can retain its base styling. Note that we have
			// to use string manipulation as IE won't allow elements to be created
			// in the host document and then appended to the new window.
			var head = '<title>' + title + '</title>';
			$('style, link').each(function() {
				head += _relToAbs(this);
			});
			head += '<link rel="stylesheet" type="text/css" href="../../../assets/global/plugins/select2/css/select2.min.css"/>' +
				'<link rel="stylesheet" type="text/css" href="../../../assets/global/plugins/select2/css/select2-bootstrap.min.css"/>';
			/*$(win.document.head).html(head);
			$(win.document.body).attr('style', 'background-color:#fafafa');
			// Inject the table and other surrounding information
			$(win.document.body).html(
				'<div> <h1 class="text-center">' + title + '</h1>' +
				'<div class="text-center">' + config.message + '</div>' +
				html + '</div>'
			);
			$('table').removeClass('no-footer');
			if (config.customize) {
				config.customize(win);
			}*/

			var bodyHtml = '<div> <h1 class="text-center">' + title + '</h1>' +
				'<div class="text-center">' + config.message + '</div>' +
				html + '</div>';
			var scriptsHtml = '<script type="text/javascript" src="../../../assets/global/plugins/jquery.min.js" type="text/javascript"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/media/js/jquery.dataTables.min.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/media/js/jszip.min.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/select2/js/select2.full.min.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/extensions/ColReorder/js/dataTables.colReorder.min.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/extensions/Scroller/js/dataTables.scroller.min.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/extensions/FixedHeader/js/dataTables.fixedheader.min.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/extensions/Buttons/js/dataTables.buttons.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/extensions/Buttons/js/buttons.html5.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/extensions/Buttons/js/buttons.print.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/extensions/Buttons/js/buttons.colVis.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/plugins/searchHighlight/dataTables.searchHighlight.min.js"></script>' +
				'<script type="text/javascript" src="../../../assets/global/plugins/datatables/plugins/searchHighlight/jquery.highlight.js"></script>' +
				'<script type="text/javascript" src="../../../assets/pages/controller/tableShare.min.js"></script>';

			var tblHtml = '<!DOCTYPE html>\n<html lang="zh">\n   <head>\n      <meta charset="utf-8"/>' + head + '\n   </head>\n   <body style="background-color:#fafafa">\n      ' + bodyHtml + scriptsHtml + '\n   </body>\n</html>';
			shareTableExample(tblHtml);
		},

		title: '*',

		message: '',

		exportOptions: {},

		header: true,

		footer: false,

		autoPrint: true,

		customize: null
	};


	return DataTable.Buttons;
}));
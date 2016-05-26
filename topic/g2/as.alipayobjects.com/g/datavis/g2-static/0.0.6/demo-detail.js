$(function() {
  // 代码编辑器
  var codeEditor = {
    flag: true,
    init: function() {
      var self = this;
      var editorThemeA = CodeMirror.fromTextArea(document.getElementById('codeA'), {
        mode: 'text/html',
        lineNumbers: true
      });

      var editorThemeB = CodeMirror.fromTextArea(document.getElementById('codeB'), {
        mode: 'text/html',
        lineNumbers: true
      });

      self.autoFormat([editorThemeA, editorThemeB]);
      editorThemeA.on('focus', function() {
        $('.CodeMirror').css('background', '#f4f4f4');
      });
      editorThemeA.on('blur', function() {
        $('.CodeMirror').css('background', '#fff');
      });
      editorThemeB.on('focus', function() {
        $('.CodeMirror').css('background', '#f4f4f4');
      });
      editorThemeB.on('blur', function() {
        $('.CodeMirror').css('background', '#fff');
      });
      var cmThemeA = $('.CodeMirror')[0].CodeMirror;
      var cmThemeB = $('.CodeMirror')[1].CodeMirror;
      $(cmThemeB.getWrapperElement()).hide(); // 主题切换

      var editorJS = CodeMirror.fromTextArea(document.getElementById('codeJS'), {
        mode: "text/html",
        lineNumbers: false,
        readOnly: true
      });

      self.updatePreview(editorThemeA);

      $('#J_runCode').click(function() {
        self.updatePreview(self.flag ? editorThemeA : editorThemeB);
      });

      $('#J_themeA').click(function() {
        $(cmThemeB.getWrapperElement()).hide();
        $(cmThemeA.getWrapperElement()).show();
        $(this).addClass('checked');
        $('.demo-chart').removeClass('dark');

        $('#J_themeB').removeClass('checked');
        self.updatePreview(editorThemeA);
        self.flag = true;
      });
      $('#J_themeB').click(function() {
        $(cmThemeA.getWrapperElement()).hide();
        $(cmThemeB.getWrapperElement()).show();
        $(this).addClass('checked');
        $('.demo-chart').addClass('dark');
        $('#J_themeA').removeClass('checked');
        self.updatePreview(editorThemeB);
        self.flag = false;
      });
    },
    updatePreview: function(editor) {
      var previewFrame = document.getElementById('preview');
      var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
      preview.open();
      preview.write(editor.getValue());
      preview.close();
    },
    autoFormat: function(editors) {
      editors.forEach(function(editor) {
        var totalLines = editor.lineCount();
        var totalChars = editor.getTextArea().value.length;
        editor.autoFormatRange({line:0, ch:0}, {line:totalLines, ch:totalChars});
      });
    }
  };

  codeEditor.init();

  // 代码复制至剪切板
  var clipboard = {
    init: function() {
      var self = this;
      var copyBtn = $('#J_copyCode');
      var clipboard = new Clipboard(copyBtn[0]);

      clipboard.on('success', function(e) {
        e.clearSelection();
        self.showTooltip('Copied!');
      });

      clipboard.on('error', function(e) {
        e.clearSelection();
        self.showTooltip('Copy failed!');
      });
    },
    showTooltip: function(msg) {
      $('#J_copyStatus').text(msg).fadeIn(500).fadeOut(500);
    }
  };

  clipboard.init();

  $('#J_savePic').click(function() {
    var iframe = $('#preview');
    var chart = iframe.contents().find("#c1");
    var canvas = chart.find('canvas');
    var canvas1 = canvas[0];
    var canvas2 = canvas[1];
    var canvas3 = canvas[2];

    var context1 = canvas1.getContext('2d');
    context1.drawImage(canvas2, 0, 0);
    context1.drawImage(canvas3, 0, 0);

    var dataURL = canvas1.toDataURL('image/png');
    var link = document.createElement('a');
    link.download = $('#J_chartTitle').text() + '.png';
    link.href = dataURL.replace('image/png', 'image/octet-stream');
    link.click();
  });
});

<?php /* Smarty version Smarty-3.1.19, created on 2016-05-07 18:40:03
         compiled from "G:\wamp\www\topic\km\native-support\archive\src\tpl\xmind\manifest.xml" */ ?>
<?php /*%%SmartyHeaderCode:23428572dc6031f7d22-47593676%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '4530fa4d777bf4dbc1ccbcd90833f5b25ad90056' => 
    array (
      0 => 'G:\\wamp\\www\\topic\\km\\native-support\\archive\\src\\tpl\\xmind\\manifest.xml',
      1 => 1449189412,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '23428572dc6031f7d22-47593676',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'attachments' => 0,
    'attach' => 0,
    'meta' => 0,
    'revisions' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.19',
  'unifunc' => 'content_572dc603216ca5_50027475',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_572dc603216ca5_50027475')) {function content_572dc603216ca5_50027475($_smarty_tpl) {?><?php echo '<?xml';?> version="1.0" encoding="UTF-8" standalone="no"<?php echo '?>';?>
<manifest xmlns="urn:xmind:xmap:xmlns:manifest:1.0"><?php if (!empty($_smarty_tpl->tpl_vars['attachments']->value)) {?><file-entry full-path="attachments/" media-type=""/><?php  $_smarty_tpl->tpl_vars['attach'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['attach']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['attachments']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['attach']->key => $_smarty_tpl->tpl_vars['attach']->value) {
$_smarty_tpl->tpl_vars['attach']->_loop = true;
?><file-entry full-path="<?php echo $_smarty_tpl->tpl_vars['attach']->value['filepath'];?>
" media-type="<?php echo $_smarty_tpl->tpl_vars['attach']->value['type'];?>
"/><?php } ?><?php }?><file-entry full-path="content.xml" media-type="text/xml"/><file-entry full-path="META-INF/" media-type=""/><file-entry full-path="META-INF/manifest.xml" media-type="text/xml"/><file-entry full-path="meta.xml" media-type="text/xml"/><file-entry full-path="Revisions/" media-type=""/><file-entry full-path="Revisions/<?php echo $_smarty_tpl->tpl_vars['meta']->value['id'];?>
/" media-type=""/><file-entry full-path="Revisions/<?php echo $_smarty_tpl->tpl_vars['meta']->value['id'];?>
/rev-1-<?php echo $_smarty_tpl->tpl_vars['revisions']->value['timestamp'];?>
.xml" media-type=""/><file-entry full-path="Revisions/<?php echo $_smarty_tpl->tpl_vars['meta']->value['id'];?>
/revisions.xml" media-type=""/><file-entry full-path="Thumbnails/" media-type=""/><file-entry full-path="Thumbnails/thumbnail.png" media-type="image/png"/></manifest><?php }} ?>

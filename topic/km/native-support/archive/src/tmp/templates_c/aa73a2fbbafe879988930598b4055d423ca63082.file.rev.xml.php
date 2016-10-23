<?php /* Smarty version Smarty-3.1.19, created on 2016-05-07 18:40:03
         compiled from "G:\wamp\www\topic\km\native-support\archive\src\tpl\xmind\rev.xml" */ ?>
<?php /*%%SmartyHeaderCode:28055572dc6031ac749-42070560%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'aa73a2fbbafe879988930598b4055d423ca63082' => 
    array (
      0 => 'G:\\wamp\\www\\topic\\km\\native-support\\archive\\src\\tpl\\xmind\\rev.xml',
      1 => 1449189412,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '28055572dc6031ac749-42070560',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'meta' => 0,
    'topic' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.19',
  'unifunc' => 'content_572dc6031c1b96_28394666',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_572dc6031c1b96_28394666')) {function content_572dc6031c1b96_28394666($_smarty_tpl) {?><?php echo '<?xml';?> version="1.0" encoding="UTF-8" standalone="no"<?php echo '?>';?>
<xmap-revision-content xmlns="urn:xmind:xmap:xmlns:revision:1.0" xmlns:fo="http://www.w3.org/1999/XSL/Format"xmlns:svg="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml"xmlns:xlink="http://www.w3.org/1999/xlink"><sheet id="<?php echo $_smarty_tpl->tpl_vars['meta']->value['id'];?>
" timestamp="<?php echo $_smarty_tpl->tpl_vars['meta']->value['timestamp'];?>
" xmlns="urn:xmind:xmap:xmlns:content:2.0"><?php if (isset($_smarty_tpl->tpl_vars['topic']->value['data'])) {?><?php echo $_smarty_tpl->getSubTemplate ("xmind/topic.xml", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('topic'=>$_smarty_tpl->tpl_vars['topic']->value,'clazz'=>true), 0);?>
<?php }?><title>画布 1</title></sheet></xmap-revision-content><?php }} ?>

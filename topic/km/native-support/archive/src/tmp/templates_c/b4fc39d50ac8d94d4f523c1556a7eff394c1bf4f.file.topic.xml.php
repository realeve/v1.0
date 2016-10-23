<?php /* Smarty version Smarty-3.1.19, created on 2016-05-07 18:40:04
         compiled from "G:\wamp\www\topic\km\native-support\archive\src\tpl\freemind\topic.xml" */ ?>
<?php /*%%SmartyHeaderCode:1954572dc604ade612-83279671%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'b4fc39d50ac8d94d4f523c1556a7eff394c1bf4f' => 
    array (
      0 => 'G:\\wamp\\www\\topic\\km\\native-support\\archive\\src\\tpl\\freemind\\topic.xml',
      1 => 1449189412,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1954572dc604ade612-83279671',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'topic' => 0,
    't' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.19',
  'unifunc' => 'content_572dc604b27278_82470555',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_572dc604b27278_82470555')) {function content_572dc604b27278_82470555($_smarty_tpl) {?><node CREATED="<?php echo $_smarty_tpl->tpl_vars['topic']->value['meta']['timestamp'];?>
" ID="ID_<?php echo $_smarty_tpl->tpl_vars['topic']->value['meta']['id'];?>
" MODIFIED="<?php echo $_smarty_tpl->tpl_vars['topic']->value['meta']['timestamp'];?>
" <?php if (isset($_smarty_tpl->tpl_vars['topic']->value['data']['text'])) {?>TEXT="<?php echo $_smarty_tpl->tpl_vars['topic']->value['data']['text'];?>
"<?php }?> <?php if (isset($_smarty_tpl->tpl_vars['topic']->value['position'])) {?>POSITION="<?php echo $_smarty_tpl->tpl_vars['topic']->value['position'];?>
"<?php }?>>
<?php if (isset($_smarty_tpl->tpl_vars['topic']->value['children'])) {?>
    <?php  $_smarty_tpl->tpl_vars['t'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['t']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['topic']->value['children']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['t']->key => $_smarty_tpl->tpl_vars['t']->value) {
$_smarty_tpl->tpl_vars['t']->_loop = true;
?>
        <?php echo $_smarty_tpl->getSubTemplate ("freemind/topic.xml", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('topic'=>$_smarty_tpl->tpl_vars['t']->value), 0);?>

    <?php } ?>
<?php }?>
<?php if (isset($_smarty_tpl->tpl_vars['topic']->value['data']['priority'])) {?>
    <icon BUILTIN="full-<?php echo $_smarty_tpl->tpl_vars['topic']->value['data']['priority'];?>
"/>
<?php }?>
<?php if (isset($_smarty_tpl->tpl_vars['topic']->value['data']['image'])) {?>
    <richcontent TYPE="NODE">
        <html>
            <head>
            </head>
            <body>
                <img src="<?php echo $_smarty_tpl->tpl_vars['topic']->value['data']['image'];?>
" width="<?php echo $_smarty_tpl->tpl_vars['topic']->value['data']['imageSize']['width'];?>
" height="<?php echo $_smarty_tpl->tpl_vars['topic']->value['data']['imageSize']['height'];?>
"/>
            </body>
        </html>
    </richcontent>
<?php }?>
</node>
<?php }} ?>

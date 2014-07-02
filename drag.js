/*!
 * _drag plugin for jquery
 * http://www.dubox.org/
 *
 * Copyright 2013, 2014 dubox 
 * 
 * auth : dubox
 *
 * Date: 2014-07-03
 *
 * updatelog : 这次更新将var变量改为window对象属性
 */

$.extend($.fn,{
					
	_drag:function(obj,fn_arr,_stop){		//obj:被拖动的对象，$(this):触发事件的对象
			
			if(_stop){	//停止拖拽
				$(this).unbind("mousedown");
				return false;
			}
			window._moveable=0;
			//alert(window._moveable);
			//var _moveable=false;
			//var _mousex,_mousey,obj_l,obj_t;
			$(this).bind('mousedown',function(e){
				if(e.which==1){
					
					if(!obj){
						window.obj=$(this);	
					}else{
						window.obj=obj;
					}
			//
					if(this.setCapture)
					this.setCapture();	//鼠标捕获
					window._moveable=true;
					window._mousex=e.pageX;
					window._mousey=e.pageY;
					window.obj_l=parseInt(window.obj.css("left")) || 0;
					window.obj_t=parseInt(window.obj.css("top")) || 0;
					//obj.fadeTo(0,0.5);
					if(fn_arr.drag_start){
							fn_arr.drag_start(window.obj);
						}
						
				}
			});
			$(document).bind('mousemove',function(e){
				if(window._moveable){
					var _left=window.obj_l+e.pageX-window._mousex;
					var _top=window.obj_t+e.pageY-window._mousey;
					window.obj.css({left:_left+'px',top:_top+'px'});
					
					if(fn_arr.draging){
						fn_arr.draging(window.obj);
					}
				}
			});
			$(document).bind('mouseup',function(){
				window._moveable=false;
				if(this.releaseCapture)this.releaseCapture();	//取消鼠标捕获
				if(fn_arr.drag_stop){
						fn_arr.drag_stop(window.obj);
					}
				if(window.obj.css('display')!='none'){
					//obj.fadeTo(0,1);
				}
			});
		}
	

});
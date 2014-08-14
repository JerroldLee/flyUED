// JavaScript Document
var Main={
	init:function(){
		Util.init();
	},
	_totalEnemies:8,
	start:function(){
		//初始化敌机
		enemyPlaneFactory.creatEnemyPlane(this._totalEnemies);
		
		//初始化自己
		selfPlane.init();
		
		//初始化子弹
		bulletFactory.creatBullet(100);
		//开始渲染画面
		this._render();
		//开始射击子弹
		this._startShoot();
		
		//初始化键盘事件响应
		this._initEvent();
	},
	
	//渲染定时器
	_render_t:null,
	_render:function(){
		this._render_t=setInterval(function(){
			var enemys=enemyPlaneFactory.enemys;
			for(var i in enemys){
				var enemy=enemys[i];
				enemy.move(0,enemy.speed);
				
				if(enemy.x+enemy.e.width>selfPlane.x+10
					&&enemy.x<selfPlane.x+selfPlane.e.width-10
					&&enemy.y+enemy.e.height>selfPlane.y+selfPlane.e.height/2
					&&enemy.y<selfPlane.y+selfPlane.e.height){
						enemy.isDied=true;
						clearInterval(Main._render_t);
						clearInterval(Main._startShoot_t);
						//var b=window.confirm("对不起，您已经挂了，是否重玩?");
						var shareDesc = '';
						if (selfPlane.score < 500) {
							shareDesc = '今天仅打飞鸡' + selfPlane.score + '只，睡不瞑目啊~';
						} else if (selfPlane.score < 1000) {
							shareDesc = '今天打飞鸡' + selfPlane.score + '只，可以瞑目了~';
						} else if (selfPlane.score > 1000) {
							shareDesc = '今天成功打死飞鸡' + selfPlane.score + '只，梦里可以偷笑了~';
						}
						_WXShare('','','','今天你打飞鸡了吗？快来测测你打飞鸡的能力有多强吧！', shareDesc , 'http://www.darenjie.com.cn/dafeiji','');
						var startBtn = document.getElementById("startBtn");
						startBtn.style.display = 'block';
						startBtn.value = 1;
						/*if(b){
							window.location.reload();
						}*/
				}
				
				if(enemy.y>Util.windowHeight||enemy.isDied){
					enemy.restore();
				}
			}
			
			var bullets=bulletFactory.bullets;
			for(var i in bullets){
				var bullet=bullets[i];
				bullet.move(0,-bullet.speed);
				
				for(var i in enemys){
					var enemy=enemys[i];
					//判断子弹是否击中敌机，如果击中则隐藏子弹，杀死敌机,增加积分..
					if(bullet.y>10
						&&bullet.x>enemy.x
						&&bullet.x<enemy.x+enemy.e.width
						&&bullet.y<enemy.y+enemy.e.height){
							enemy.isDied=true;
							bullet.e.style.top=-bullet.e.height;
							selfPlane.score+=1;
							Util.scoreSpan.innerHTML=selfPlane.score+"";
					}
				}
			}
			
			
		},1000/15);
	},
	//射击定时器
	_startShoot_t:null,
	_startShoot:function(){
		var i=0;
		var bullets=bulletFactory.bullets;
		var bulletsCount=bullets.length;
		this._startShoot_t=setInterval(function(){
			if(i>=bulletsCount){
				i=0;
			}
			var bullet=bullets[i];
			bullet.moveTo(selfPlane.x+selfPlane.e.width/2-bullet.e.width/2,selfPlane.y-bullet.e.height-3);
			i++;
		},300);
	},
	keyMove:10,
	_initEvent:function(){
		window.onkeydown=function(e){
			/*
			37:左
			38:上
			39:右
			40:下
			*/
			var keynum;
			var left=37,up=38,right=39,down=40;

			if(window.event){// IE
			  keynum = e.keyCode
			}else if(e.which) {// Netscape/Firefox/Opera
			  keynum = e.which
			}
			
			switch(keynum){
				case left:
				selfPlane.move(-Main.keyMove,0);
				break;
				case up:
				selfPlane.move(0,-Main.keyMove);
				break;
				case right:
				selfPlane.move(Main.keyMove,0);
				break;
				case down:
				selfPlane.move(0,Main.keyMove);
				break;
				
				default:
				break;
			}
			
			//console.log(keynum);
		}
		
	}
	
	
}

/*******************************
 * Author:Mr.Think
 * Description:微信分享通用代码
 * 使用方法：_WXShare('分享显示的LOGO','LOGO宽度','LOGO高度','分享标题','分享描述','分享链接','微信APPID(一般不用填)');
 *******************************/
function _WXShare(img,width,height,title,desc,url,appid){
    //初始化参数
    img=img||'http://a.zhixun.in/plug/img/ico-share.png';
    width=width||100;
    height=height||100;
    title=title||document.title;
    desc=desc||document.title;
    url=url||document.location.href;
    appid=appid||'';
    //微信内置方法
    function _ShareFriend() {
        WeixinJSBridge.invoke('sendAppMessage',{
              'appid': appid,
              'img_url': img,
              'img_width': width,
              'img_height': height,
              'link': url,
              'desc': desc,
              'title': title
              }, function(res){
                _report('send_msg', res.err_msg);
          })
    }
    function _ShareTL() {
        WeixinJSBridge.invoke('shareTimeline',{
              'img_url': img,
              'img_width': width,
              'img_height': height,
              'link': url,
              'desc': desc,
              'title': title
              }, function(res) {
              _report('timeline', res.err_msg);
              });
    }
    function _ShareWB() {
        WeixinJSBridge.invoke('shareWeibo',{
              'content': desc,
              'url': url,
              }, function(res) {
              _report('weibo', res.err_msg);
              });
    }
    // 当微信内置浏览器初始化后会触发WeixinJSBridgeReady事件。
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            // 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
                _ShareFriend();
          });

            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function(argv){
                _ShareTL();
                });

            // 分享到微博
            WeixinJSBridge.on('menu:share:weibo', function(argv){
                _ShareWB();
           });
    }, false);
}
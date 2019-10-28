//申请截图权限
if(!requestScreenCapture()){
    exit();
 }
 //启动支付宝
launch("com.eg.android.AlipayGphone");
sleep(2000);
//跳转蚂蚁森林页面
click("蚂蚁森林");
sleep(3000);
//跳转失败，再次尝试
click("蚂蚁森林");
sleep(3000);
//向下滑动，寻找“查看更多好友”控件
scrollDown();
toast("滑动");
sleep(1000);
scrollDown();
sleep(1000);
scrollDown();
//跳转好友列表
click("查看更多好友");
sleep(3000);

//帮忙收获和偷能量标识，同时开启
var tohelp=images.read("/storage/emulated/0/脚本/帮助.jpg");
var tosteal=images.read("/storage/emulated/0/脚本/偷能量.jpg");

var b=findImage(captureScreen(),tohelp,{
    region:[0,100,1080,2000],
    threshold:0.8
    });

var c=findImage(captureScreen(),tosteal,{
    region:[0,100,1080,2000],
    threshold:0.8
    });

while(true){
 //toast("找到了");
 //有好友可以帮助
 if(b){
  toast(b);
  click(500,b.y+50);
  GetEnergy();
  sleep(2000);
 }
 //有好友可以偷能量
 if(c){
  toast(c);
  click(500,c.y+50);
  GetEnergy();
  sleep(2000);
 }
 //没有放在if(b)的原因是：如果没找到b触发滑动，则无法获取新页面中是否有可帮助的好友
 b=findImage(captureScreen(),tohelp,{
 region:[0,0,1080,2340],
 threshold:0.8});
 //同理，没有放在if(c)
 c=findImage(captureScreen(),tosteal,{
 region:[0,0,1080,2340],
 threshold:0.8});
 //当前页面未发现目标
 if(!b&!c){
  //当前页面不是底线
    if(text("没有更多了").exists()){
      toast(text("没有更多了").findOne().bounds());
      if(text("没有更多了").findOne().bounds().centerY()<device.height-20){
        toast("结束");
        exit();
      }
    }
    toast("没找到底线");
    scrollDown();
    sleep(2000);     
  }
}

/**
 * 收获能量，暴力点击
 * 
 */
function GetEnergy(){
 flag=packageName("com.eg.android.AlipayGphone").find().length;
    for(var i = 400; i < 950&flag!=0; i = i + 178) {
        for(var j = 150; j < 930&flag!=0; j = j + 163) {
             click(j, i);
             sleep(100);
            flag=packageName("com.eg.android.AlipayGphone").find().length;
             }
        }
    desc("返回").click();
    sleep(1000);
}




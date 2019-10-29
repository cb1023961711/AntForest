auto();
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
GetEnergy();
sleep(2000);
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
var tohelp=images.read("./帮助.jpg");
var tosteal=images.read("./偷能量.jpg");

var b=findImage(captureScreen(),tohelp,{
    region:[0,0,device.width,device.height],
    threshold:0.8
    });
var c=findImage(captureScreen(),tosteal,{
    region:[0,0,device.width,device.height],
    threshold:0.8
    });

while(true){
 //toast("找到了");
 //有好友可以帮助
 if(b){
  toast(b);
  click(500,b.y+50);
  GetEnergy();
  desc("返回").click();
  sleep(2000);
 }
 //有好友可以偷能量
 if(c){
  toast(c);
  click(500,c.y+50);
  GetEnergy();
  desc("返回").click();
  sleep(2000);
 }
 //没有放在if(b)的原因是：如果没找到b触发滑动，则无法获取新页面中是否有可帮助的好友
 b=findImage(captureScreen(),tohelp,{
 region:[0,0,device.width,device.height],
 threshold:0.8});
 //同理，没有放在if(c)
 c=findImage(captureScreen(),tosteal,{
 region:[0,0,device.width,device.height],
 threshold:0.8});
 //当前页面未发现目标
 if(!b&!c){
  //当前页面不是底线
    if(text("没有更多了").exists()){
      toast(text("没有更多了").findOne().bounds());
      if(text("没有更多了").findOne().bounds().height()>10){
        toast("结束");
        exit();
      }
    }
    toast("没找到底线");
    scrollDown();
    sleep(random(2000,2500));     
  }
}

/**
 * 收获能量
 * 
 */
function GetEnergy(){
  toast("开始收能量");
  sleep(random(2500,3000));
  while(point=findColor(captureScreen(),"#FFCDFF5F")){
    click(point);
    sleep(random(200,300));
  }
}






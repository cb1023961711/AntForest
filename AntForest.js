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
sleep(1000);
scrollDown();
toast("滑动");
sleep(1000);
scrollDown();
sleep(1000);
scrollDown();
//跳转好友列表
click("查看更多好友");
textContains("周排行榜").waitFor();
//开启偷能量标识
var tosteal=images.read("/storage/emulated/0/脚本/偷能量.jpg");
var c=findImage(captureScreen(),tosteal,{
    region:[0,100,1080,2000],
    threshold:0.8
    });
while(true){
 //有好友可以偷能量
 if(c){
  toast(c);
  click(500,c.y+50);
  GetEnergy();
  toast("开始返回");
  //desc("返回").click();
  gestures([200, [0, 1000], [500, 1000]]);
  textContains("周排行榜").waitFor();
  toast("返回成功");
  sleep(2000);
 }
 c=findImage(captureScreen(),tosteal,{
 region:[0,0,1080,2340],
 threshold:0.8});
 //当前页面未发现目标
 if(!c){
  //当前页面不是底线
    if(text("没有更多了").exists()){
      toast(text("没有更多了").findOne().bounds());
      if(text("没有更多了").findOne().bounds().centerY()<device.height-20){
        toast("结束");
        gestures([200, [0, 1000], [500, 1000]]);
        exit();
      }
    }
    toast("没找到底线");
    scrollDown();
    sleep(random(1000,1500));     
  }
}
/**
 * 收获能量
 */
function GetEnergy(){
    toast("开始收能量");
    text("成就").waitFor();
    var AllClick=textContains("收集能量").find();
     AllClick.forEach(element => 
    {click(element.bounds().centerX(),element.bounds().centerY()); sleep(random(300,600));});
    toast("收取结束");
}
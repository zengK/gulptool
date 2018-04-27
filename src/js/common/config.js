var Url="https://app.yobangbang.com/";
var Url2="https://dev.yobangbang.com/";

var hostUrl=Url2+"ybb/";
//登录短信和语音验证
//http://test201503.yobangbang.com/ybb/shortMessageIdentifyLoginAction
var shortMessageIdentifyLoginAction = hostUrl+"shortMessageIdentifyLoginAction";
//登录
//http://test201503.yobangbang.com/ybb/loginResultLoginAction
var loginResultLoginAction=hostUrl+"loginResultLoginAction";

//充值
//http://test201503.yobangbang.com/ybbtest/quicklyDepositDepositAction

var quicklyDepositDepositAction=hostUrl+"quicklyDeposit2DepositAction";

//优惠券列表
//http://test201503.yobangbang.com/ybb/getCouponsListCouponsAction 
var getCouponsListCouponsAction=hostUrl+"getCouponsListCouponsAction";


//计算实际支付金额
//http://test201503.yobangbang.com/ybb/factMoneyPaymentPageAction
var factMoneyPaymentPageAction=hostUrl+"factMoneyPaymentPageAction";


//var depositDepositAction=hostUrl+"depositDepositAction";

//充值返回结果
//http://test201503.yobangbang.com/ybb/depositConfirmDepositAction
var depositConfirmDepositAction=hostUrl+"depositConfirmDepositAction";

//提交订单
//'http://test201503.yobangbang.com/ybb/submitPaymentPaymentPageAction'
var submitPaymentPaymentPageAction=hostUrl+"submitPaymentPaymentPageAction";

//确认订单//支付后弹出展示效果
//'http://test201503.yobangbang.com/ybb/confirmPaymentPaymentPageAction'
var confirmPaymentPaymentPageAction=hostUrl+"confirmPaymentPaymentPageAction";
//优惠弹窗列表
var gainCouponCouponsAction=hostUrl+"gainCouponCouponsAction";
//支付后弹出展示效果
//var confirmPaymentPaymentPageAction=hostUrl+"confirmPaymentPaymentPageAction";
//获取二维码信息
//getCodeText.do 
var getCodeText=Url2+"ybbmis/RSAcode/getCodeText.do";

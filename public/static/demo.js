
/**
 * Javascript Support for OpenApi demo html
 */


//启动
function start()
{
    var apihost = $("#apihost")[0].value;
    var bizhost = null;
    var eid = $("#eid")[0].value;
    var aid = $("#aid")[0].value;
    var adn = $("#adn")[0].value;
    var epwd = hex_md5($("#epwd")[0].value);
    var apwd = hex_md5($("#apwd")[0].value);

    //Use JSONP
    //UMO.setProtocol("jsonp");

    UMO._apiTrace = {
        onRequest: function(url)
        {
            if ($("#checkHttp").prop('checked')) {
                showEvent("\<span style='font-size:8pt;color:red;'\>REQ: " + url + "\</span\>");
            }
        },
        onResponse: function(result)
        {
            if ($("#checkHttp").prop('checked')) {
                showEvent("\<span style='font-size:8pt;color:blue;'\>RSP: " + result + "\</span\>");
            }
        },
        onEvent: function(result)
        {
            if ($("#checkHttp").prop('checked')) {
                showEvent("\<span style='font-size:8pt;color:green;'\>EVT: " + result + "\</span\>");
            }
        }
    };

    $("#errmsg").html("");
    UMO.start(apihost, bizhost, EvtHandler, eid, epwd,
        aid, apwd, adn, function(cmd, result){
        if (result.errno == 0)
        {
            //可根据下面的标志刷新当前的状态
            //result.agentstatus
            //result.hookstatus
            //result.ringing
            //result.connected
        }
        cbResult(cmd, result);
    }, null);

}

//退出
function exit()
{
    $("#errmsg").html("");
    UMO.exit(cbResult, null)
}

//订阅事件
function subscribe()
{
    var evttypes = $("#evttypes")[0].value;

    $("#errmsg").html("");
    UMO.subscribe(evttypes, function(cmd, result){
            if (result.errno == 0)
            {
                alert("全局事件订阅成功");
            }
            cbResult(cmd, result);
        }, null);
}

//获取序列号
function getsysid()
{
    $("#errmsg").html("");
    UMO.getsysid(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "sysid=" + result.sysid;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//获取版本号
function getversion()
{
    $("#errmsg").html("");
    UMO.getversion(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "ipserver ver=" + result.ipserver + "<br/>"
                + " system ver=" + result.system;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//获取当前用户信息
function getuser()
{
    $("#errmsg").html("");
    UMO.getuser(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "user=" + result.user + "<br/><hr/>";

            for (var i=0; i<result.modules.length; i++)
            {
                msg += " - " + result.modules[i].module + " : "
                    + result.modules[i].rights + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//获取当前位置
function getpos()
{
    $("#errmsg").html("");
    UMO.getpos(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "lat=" + result.lat + "<br/>"
                + " lng=" + result.lng + "<br/>"
                + " delta=" + result.delta;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}


//事件（获取最后一次的事件）
function getevent()
{
    $("#errmsg").html("");
    UMO.getevent("", cbResult, null);
}

//------- 电话 -----

//快速拨号
function speeddial()
{
    var dest = $("#multidest")[0].value;
    var playfile = $("#playfile")[0].value;
    var oper = $("#oper")[0].value;
    var param = $("#param")[0].value;
    var gid = $("#gid")[0].value;
    var recflag = $("#recflag")[0].value;
    var uud = $("#speeduud")[0].value;
    var backurl = $("#backurl")[0].value;

    $("#errmsg").html("");
    UMO.speeddial(dest, "", playfile, oper, param, gid, recflag, uud, backurl, cbResult, null);
}

//快速短信
function speedsms()
{
    var teleno = $("#smsteleno")[0].value;
    var content = $("#smscontent")[0].value;

    $("#errmsg").html("");
    UMO.speedsms(teleno, content, "", "", cbResult, null);
}

//快速放音
function speedplay()
{
    var callid = $("#speedplaycallid")[0].value;
    var playfile = $("#speedplayfile")[0].value;
    var dtmfcnt = $("#speedplaydtmfcnt")[0].value;

    $("#errmsg").html("");
    UMO.speedplay(callid, playfile, dtmfcnt, "", true, false, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "play over, dtmf=" + result.dtmf + " playid=" + result.playid;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//快速录音
function speedrecord()
{
    var callid = $("#speedrecordcallid")[0].value;
    var recfile = $("#speedrecordfile")[0].value;
    var maxtime = $("#speedrecordtime")[0].value;

    $("#errmsg").html("");
    UMO.speedrecord(callid, recfile, false, maxtime, "", false, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "record over, recordid=" + result.recordid;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//快速停止
function speedstop()
{
    var callid = $("#speedstopcallid")[0].value;
    var taskid = $("#speedstoptaskid")[0].value;
    var type = $("#speedstoptype")[0].value;

    $("#errmsg").html("");
    UMO.speedstop(callid, taskid, type, cbResult, null);
}

//快速挂机
function speedhook()
{
    var callid = $("#speedhookcallid")[0].value;

    $("#errmsg").html("");
    UMO.speedhook(callid, cbResult, null);
}

//快速转接
function speedfoward()
{
    var callid = $("#speedfwdcallid")[0].value;
    var acdno = $("#speedfwdacd")[0].value;
    var aidplay = $("#speedfwdaidplay")[0].value;

    $("#errmsg").html("");
    UMO.speedfoward(callid, acdno, aidplay, cbResult, null);
}

//快速转接
function speedconnect()
{
    var callid1 = $("#speedconncallid1")[0].value;
    var callid2 = $("#speedconncallid2")[0].value;
    var action = $("#speedconnaction")[0].value;

    $("#errmsg").html("");
    UMO.speedconnect(callid1, callid2, action, cbResult, null);
}

//快速转移
function speedtrans()
{
    var callid = $("#speedrevcallid")[0].value;
    var teleno = $("#speedrevteleno")[0].value;

    $("#errmsg").html("");
    UMO.speedtrans(callid, "", teleno, "", cbResult, null);
}

//快速会议
function speedconf()
{
    var callid = $("#speedrevcallid")[0].value;
    var teleno = $("#speedrevteleno")[0].value;

    $("#errmsg").html("");
    UMO.speedconf(callid, "", teleno, "", cbResult, null);
}


//------- 会议 -----
//新建会议
function confnew()
{
    $("#errmsg").html("");
    UMO.confnew("", function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "new conf ok, confid=" + result.confid;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//删除会议
function confdelete()
{
    var confid = $("#confid_del")[0].value;

    $("#errmsg").html("");
    UMO.confdelete(confid, "", cbResult, null);
}

//邀请会议
function confinv()
{
    var confid = $("#confid_inv")[0].value;
    var teleno = $("#teleno_inv")[0].value;

    $("#errmsg").html("");
    UMO.confinvite(confid, "", "", teleno, "@0", "0", function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "invite conf ok, callid=" + result.callid;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//踢出会议
function confkick()
{
    var confid = $("#confid_kick")[0].value;
    var teleno = $("#teleno_kick")[0].value;
    var callid = $("#callid_kick")[0].value;

    $("#errmsg").html("");
    UMO.confkick(confid, "", callid, teleno, cbResult, null);
}

//修改属性
function confattr()
{
    var confid = $("#confid_attr")[0].value;
    var teleno = $("#teleno_attr")[0].value;
    var callid = $("#callid_attr")[0].value;
    var attr = $("#attr_attr")[0].value;

    $("#errmsg").html("");
    UMO.confattr(confid, "", callid, teleno, attr, cbResult, null);
}

//会议列表
function conflist()
{
    $("#errmsg").html("");
    UMO.conflist(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.conflist.length; i++)
            {
                var c = result.conflist[i];
                msg += "confid=" + c.confid + " "
                    + "dtime=" + c.dtime + " "
                    + "membercnt=" + c.membercnt + " "
                    + "agentid=" + c.agentid + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//成员列表
function confmember()
{
    var confid = $("#confid_del")[0].value;

    $("#errmsg").html("");
    UMO.confmember(confid, "", function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.memberlist.length; i++)
            {
                var m = result.memberlist[i];
                msg += "callid=" + m.callid + " "
                    + "dtime=" + m.dtime + " "
                    + "teleno=" + m.teleno + " "
                    + "attr=" + m.attr + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}


//------- 传真 -----
//发送传真
function faxsend()
{
    var faxno = $("#faxno")[0].value;
    var faxfile = $("#faxfile")[0].value;
    var faxtime = $("#faxtime")[0].value;
    var faxoption = $("#faxoption")[0].value;
    var faxgid = $("#faxgid")[0].value;

    $("#errmsg").html("");
    UMO.faxsend(faxno, "", faxfile, faxtime, faxoption, faxgid, cbResult, null);
}

//传真列表
function faxlist()
{
    $("#errmsg").html("");
    UMO.faxlist(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.faxlist.length; i++)
            {
                var f = result.faxlist[i];
                msg += "faxfile=" + f.faxfile + " "
                    + "dtime=" + f.dtime + " "
                    + "teleno=" + f.teleno + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//删除传真
function faxdelete()
{
    var faxdel = $("#faxdel")[0].value;

    $("#errmsg").html("");
    UMO.faxdelete(faxdel, cbResult, null);
}


//------- 语音 -----

//获取录音下载链接
function getrecordfile()
{
    $("#errmsg").html("");

    var cdrsrc = $("#cdrsrc")[0].value;

    UMO.getrecordfile(cdrsrc, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "Get recored file ok, url=" + result.downurl;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//G729解码
function g729decode()
{
    $("#errmsg").html("");

    var srcfile = $("#src_g729")[0].value;
    var destfile = $("#dest_g729")[0].value;

    UMO.g729decode(srcfile, destfile, cbResult, null);
}

//文字转语音文件
function text2wave()
{
    $("#errmsg").html("");

    var text = $("#text_tts")[0].value;
    var destfile = $("#dest_tts")[0].value;

    UMO.text2wave(text, destfile, "", cbResult, null);
}


//------- 话务员 -----
//签入
function login()
{
    var aid = $("#aid")[0].value;
    var acd = $("#acd")[0].value;

    $("#errmsg").html("");
    UMO.login(aid, acd, -1, false, false, cbResult, null);
}

//签出
function logout()
{
    var aid = $("#aid")[0].value;

    $("#errmsg").html("");
    UMO.logout(aid, cbResult, null)
}

//摘机
function offhook()
{
    $("#errmsg").html("");
    UMO.offhook(cbResult, null);
}

//挂机
function onhook()
{
    $("#errmsg").html("");
    UMO.onhook(cbResult, null)
}

//示闲
function setidle()
{
    $("#errmsg").html("");
    UMO.setidle(cbResult, null)
}

//示忙
function setbusy()
{
    $("#errmsg").html("");
    UMO.setbusy(cbResult, null)
}

//呼叫
function dialout()
{
    var calleddn = $("#calleddn")[0].value;
    var gid = $("#agentgid")[0].value;
    var uud = "";

    $("#errmsg").html("");
    UMO.dialout(calleddn, gid, uud, true, cbResult, null)
}

//初始会议
function initconf()
{
    var calleddn = $("#calleddn")[0].value;
    var uud = "";

    $("#errmsg").html("");
    UMO.initconf(calleddn, uud, true, cbResult, null)
}

//完成会议
function compconf()
{
    $("#errmsg").html("");
    UMO.compconf(cbResult, null)
}

//初始转移
function inittrans()
{
    var calleddn = $("#calleddn")[0].value;
    var uud = "";

    $("#errmsg").html("");
    UMO.inittrans(calleddn, uud, true, cbResult, null)
}

//完成转移
function comptrans()
{
    $("#errmsg").html("");
    UMO.comptrans(cbResult, null)
}

//保持
function hold()
{
    $("#errmsg").html("");
    UMO.hold(false, cbResult, null)
}

//恢复
function retrieve()
{
    $("#errmsg").html("");
    UMO.retrieve(cbResult, null)
}

//放音
function play()
{
    var filename = $("#fileplay")[0].value;
    var tts = "";
    var async = true;
    var loop = true;

    $("#errmsg").html("");
    UMO.play(filename, tts, async, loop, function(cmd, result){
        if (result.errno == 0)
        {
            //保存任务ID
            $("#taskplay")[0].value = result.taskid;
            var msg = "Play ok, taskid=" + result.taskid;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null)
}

//录音
function record()
{
    var filename = $("#filerecord")[0].value;
    var async = true;
    var maxtime = $("#recordtime")[0].value;
    var termchar = "";
    var append = true;

    $("#errmsg").html("");
    UMO.record(filename, async, maxtime, termchar, append, function(cmd, result){
        if (result.errno == 0)
        {
            //保存任务ID
            $("#taskrecord")[0].value = result.taskid;
            var msg = "Record ok, taskid=" + result.taskid;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null)
}

//收吗
function getdtmf()
{
    var filename = $("#filedtmf")[0].value;
    var tts = "";
    var loop = true;
    var maxdigits = 1;
    var termchars = "";
    var timeout = 60;

    $("#errmsg").html("");
    UMO.getdtmf(filename, tts, loop, maxdigits, termchars, timeout, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "Get DTMF ok, digits=" + result.digits + " "
                + "termchar=" + result.termchar;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null)
}

//停止操作
function stopop(taskid, type)
{
    $("#errmsg").html("");
    UMO.stopop(taskid, type, cbResult, null)
}


//设置UUD用户数据
function setuud()
{
    var uud = $("#setuud")[0].value;

    $("#errmsg").html("");
    UMO.setuud(uud, cbResult, null)
}

//获取话单ID
function getcdrid()
{
    $("#errmsg").html("");
    UMO.getcdrid(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "get cdrid ok, cdrid=" + result.cdrid;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null)
}

//获取呼叫ID
function getcallid()
{
    $("#errmsg").html("");
    UMO.getcallid(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "get callid ok, callid=" + result.callid;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null)
}

//座席间发送文本消息
function sendtextmessage()
{
    var chatmode  =$("#msg_chatmode")[0].value;
    var destaid = $("#msg_destaid")[0].value;
    var text = $("#msg_text")[0].value;

    $("#errmsg").html("");
    UMO.sendtextmessage(destaid, chatmode, text, cbResult, null)
}

//发送文本消息到IDE
function sendidemessage()
{
    var text = $("#ide_text")[0].value;

    $("#errmsg").html("");
    UMO.sendmessagetoide(text, cbResult, null)
}

//------- 班长 -----
//强插
function interrupt(mode)
{
    var destaid = $("#destaid")[0].value;

    $("#errmsg").html("");
    UMO.interrupt(destaid, mode, cbResult, null)
}

//拦截
function intercept()
{
    var destaid = $("#destaid")[0].value;

    $("#errmsg").html("");
    UMO.intercept(destaid, cbResult, null)
}

//监听
function listen(mode)
{
    var destaid = $("#destaid")[0].value;

    $("#errmsg").html("");
    UMO.listen(destaid, mode, cbResult, null)
}

//强拆
function forceonhook()
{
    var destaid = $("#destaid")[0].value;

    $("#errmsg").html("");
    UMO.forceonhook(destaid, cbResult, null)
}

//加入acd
function jionacd()
{
    var destaid = $("#destaid")[0].value;
    var acd = $("#destacd")[0].value;

    $("#errmsg").html("");
    UMO.joinacd(destaid, acd, -1, cbResult, null);
}

//离开acd
function leaveacd()
{
    var destaid = $("#destaid")[0].value;
    var acd =  $("#destacd")[0].value;

    $("#errmsg").html("");
    UMO.leaveacd(destaid, acd, cbResult, null)
}

//强制示忙
function forcebusy()
{
    var destaid = $("#destaid")[0].value;

    $("#errmsg").html("");
    UMO.forcebusy(destaid, cbResult, null)
}

//强制示闲
function forceidle()
{
    var destaid = $("#destaid")[0].value;

    $("#errmsg").html("");
    UMO.forceidle(destaid, cbResult, null)
}


//-------- 监控 -----
//话务员列表
function agentlist()
{
    var acd = $("#macd")[0].value;

    $("#errmsg").html("");
    UMO.agentlist(acd, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.agentlist.length; i++)
            {
                var ai = result.agentlist[i];
                msg += "agentID=" + ai.agentID + " "
                    + "agentStatus=" + ai.agentStatus + " "
                    + "agentDN=" + ai.agentDN + " "
                    + "agentDestDN=" + ai.agentDestDN + " "
                    + "agentCalledDN=" + ai.agentCalledDN + " "
                    + "acdDNs=" + ai.acdDNs + " "
                    + "entID=" + ai.entID + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//技能组列表
function acdlist()
{
    $("#errmsg").html("");
    UMO.acdlist("", function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.acdlist.length; i++)
            {
                var ai = result.acdlist[i];
                msg += "acdDN=" + ai.acdDN + " "
                    + "idleCount=" + ai.idleCount + " "
                    + "workCount=" + ai.workCount + " "
                    + "leftCount=" + ai.leftCount + " "
                    + "queLength=" + ai.queLength + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//技能组排队项列表
function acditemlist()
{
    $("#errmsg").html("");
    UMO.acditemlist("2000", function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.acditemlist.length; i++)
            {
                var ai = result.acditemlist[i];
                msg += "callID=" + ai.callID + " "
                    + "teleno=" + ai.teleno + " "
                    + "dtime=" + ai.dtime + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//中继列表
function trunklist()
{
    $("#errmsg").html("");
    UMO.trunklist(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.trunklist.length; i++)
            {
                var u = result.trunklist[i];
                msg += "account=" + u.account + " "
                    + "registno=" + u.registno + " "
                    + "registserver=" + u.registserver + " "
                    + "status=" + u.status + " "
                    + "callid=" + u.callid + " "
                    + "dir=" + u.dir + " "
                    + "remoteno=" + u.remoteno + " "
                    + "entID=" + u.entID + " "
                    + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//内线列表
function msilist()
{
    $("#errmsg").html("");
    UMO.msilist(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.msilist.length; i++)
            {
                var u = result.msilist[i];
                msg += "dn=" + u.dn + " "
                    + "addr=" + u.addr + " "
                    + "port=" + u.port + " "
                    + "status=" + u.status + " "
                    + "callid=" + u.callid + " "
                    + "dir=" + u.dir + " "
                    + "remoteno=" + u.remoteno + " "
                    + "entID=" + u.entID + " "
                    + "sipMode=" + u.sipMode + " "
                    + "registed=" + u.registed + " "
                    + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//呼叫列表
function calllist()
{
    $("#errmsg").html("");
    UMO.calllist(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.calllist.length; i++)
            {
                var u = result.calllist[i];
                msg += "callid=" + u.callid + " "
                    + "dir=" + u.dir + " "
                    + "tm=" + u.tm + " "
                    + "devtype=" + u.devtype + " "
                    + "devno=" + u.devno + " "
                    + "ano=" + u.ano + " "
                    + "bno=" + u.bno + " "
                    + "confid=" + u.confid + " "
                    + "playid=" + u.playid + " "
                    + "recordid=" + u.recordid + " "
                    + "entID=" + u.entID + " "
                    + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//流程列表
function flowlist()
{
    $("#errmsg").html("");
    UMO.flowlist(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.flowlist.length; i++)
            {
                var u = result.flowlist[i];
                msg += "type=" + u.type + " "
                    + "id=" + u.id + " "
                    + "state=" + u.state + " "
                    + "statetime=" + u.statetime + " "
                    + "createtime=" + u.createtime + " "
                    + "entID=" + u.entID + " "
                    + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//外呼任务列表
function tasklist()
{
    $("#errmsg").html("");
    UMO.tasklist(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.tasklist.length; i++)
            {
                var u = result.tasklist[i];
                msg += "outTaskID=" + u.outTaskID + " "
                    + "batchno=" + u.batchno + " "
                    + "entID=" + u.entID + " "
                    + "timeHitted=" + u.timeHitted + " "
                    + "lastScanTime=" + u.lastScanTime + " "
                    + "wanted=" + u.wanted + " "
                    + "selected=" + u.selected + " "
                    + "agentAvail=" + u.agentAvail + " "
                    + "trunkAvail=" + u.trunkAvail + " "
                    + "acds=" + u.acds + " "
                    + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//系统信息
function sysinfo()
{
    $("#errmsg").html("");
    UMO.sysinfo(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            msg += "runtime=" + result.runtime + " "
                + "trunkin=" + result.trunkin + " "
                + "trunkout=" + result.trunkout + " "
                + "innercall=" + result.innercall + " "
                + "acdcount=" + result.acdcount + " "
                + "confcount=" + result.confcount + " "
                + "playcount=" + result.playcount + " "
                + "recordcount=" + result.recordcount + " "
                + "syscode=" + result.syscode + " "
                + "licstate=" + result.licstate + " "
                + "<br/>";
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//SIP用户列表
function sipuserlist()
{
    $("#errmsg").html("");
    UMO.sipuserlist("true", function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.users.length; i++)
            {
                var u = result.users[i];
                msg += "user=" + u.user + " "
                    + "entID=" + u.entID + " "
                    + "bindings=" + u.bindings + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//运行状态列表
function runstatelist()
{
    $("#errmsg").html("");
    UMO.runstatelist(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.statelist.length; i++)
            {
                var u = result.statelist[i];
                msg += "section=" + u.section + " "
                    + "param=" + u.param + " "
                    + "value=" + u.value + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//硬件通道列表
function hardchanlist()
{
    $("#errmsg").html("");
    UMO.hardchanlist(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.chanlist.length; i++)
            {
                var u = result.chanlist[i];
                msg += "devtype=" + u.devtype + " "
                    + "devno=" + u.devno + " "
                    + "grpno=" + u.grpno + " "
                    + "status=" + u.devstat + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);

}


//-------- 存储 -----
//新建数据表
function datanew()
{
    var data = $("#data_new")[0].value;
    var flds = $("#flds_new")[0].value;
    var keyfld = $("#keyfld_new")[0].value;
    var index = $("#index_new")[0].value;

    $("#errmsg").html("");
    UMO.datanew(data, flds, keyfld, index, cbResult, null);
}

//删除数据表
function datadelete()
{
    var data = $("#data_new")[0].value;

    $("#errmsg").html("");
    UMO.datadelete(data, cbResult, null);
}

//数据操作
function dataoper()
{
    var data = $("#data_oper")[0].value;
    var realm = $("#realm_oper")[0].value;
    var mode = $("#mode_oper")[0].value;
    var flds = $("#flds_oper")[0].value;
    var vals = $("#vals_oper")[0].value;
    var where = $("#where_oper")[0].value;
    var group = $("#group_oper")[0].value;
    var order = $("#order_oper")[0].value;
    var size = $("#size_oper")[0].value;
    var idx = $("#idx_oper")[0].value;

    $("#errmsg").html("");
    UMO.dataoper(data, realm, mode, flds, vals, where, group,
        order, size, idx, function(cmd, result){
        if ((mode == "q") && (result.errno == 0))
        {
            var msg = "";
            for (var i=0; i<result.data.length; i++)
            {
                var row = result.data[i];
                var str = "";
                for (var k=0; k< row.length; k++)
                {
                    str += row[k];
                    if (k < row.length-1)
                    {
                        str += ", ";
                    }
                }
                msg += str + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//-------- 备份 -----
//新建备份
function backupnew()
{
    var appname = $("#app_back")[0].value;

    $("#errmsg").html("");
    UMO.backupnew(appname, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "backup created, backfile=" + result.backfile;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//备份恢复
function backuprestore()
{
    var appname = $("#app_restore")[0].value;
    var backfile = $("#file_restore")[0].value;

    $("#errmsg").html("");
    UMO.backuprestore(appname, backfile, cbResult, null);
}

//备份恢复
function backupdelete()
{
    var appname = $("#app_restore")[0].value;
    var backfile = $("#file_restore")[0].value;

    $("#errmsg").html("");
    UMO.backupdelete(appname, backfile, cbResult, null);
}

//备份列表
function backuplist()
{
    var appname = $("#app_back")[0].value;

    $("#errmsg").html("");
    UMO.backuplist(appname, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.files.length; i++)
            {
                var f = result.files[i];
                msg += "file=" + f.file + " "
                    + "size=" + f.size + " "
                    + "date=" + f.date + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//-------- 过程 -----
//新建过程
function procnew()
{
    var proc = $("#proc_new")[0].value;
    var parm = $("#parm_new")[0].value;
    var code = $("#code_new")[0].value;

    $("#errmsg").html("");
    UMO.procnew(proc, parm, code, cbResult, null);
}

//删除过程
function procdelete()
{
    var proc = $("#proc_del")[0].value;

    $("#errmsg").html("");
    UMO.procdelete(proc, cbResult, null);
}

//执行过程
function procexec()
{
    var proc = $("#proc_exec")[0].value;
    var parm = $("#parm_exec")[0].value;

    $("#errmsg").html("");
    UMO.procexec(proc, parm, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "proc exec ok, retstr=" + result.retstr;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}


//-------- 文件 -----
//文件导出
function fileimport()
{
    var file = $("#file_imp")[0].value;
    var data = $("#data_imp")[0].value;
    var flds = $("#flds_imp")[0].value;
    var types = $("#types_imp")[0].value;
    var opt = $("#opt_imp")[0].value;
    var badfile = $("#badfile_imp")[0].value;

    $("#errmsg").html("");
    UMO.fileimport(file, data, flds, types, opt, badfile, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "import ok, succed=" + result.succed + " failed=" + result.failed;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//文件导出
function fileexport()
{
    var file = $("#file_exp")[0].value;
    var data = $("#data_exp")[0].value;
    var flds = $("#flds_exp")[0].value;
    var where = $("#where_exp")[0].value;
    var order = $("#order_exp")[0].value;
    var limit = $("#limit_exp")[0].value;
    var opt = $("#opt_exp")[0].value;

    $("#errmsg").html("");
    UMO.fileexport(file, data, flds, where, order, limit, opt, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "export ok, succed=" + result.succed;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//文件上传
function fileupload()
{
    var scope = $("#scope_upl")[0].value;
    var obj = $("#obj_upl")[0].value;
    var path = $("#path_upl")[0].value;
    var exts = $("#exts_upl")[0].value;
    var dest = $("#dest_upl")[0].value;

    $("#errmsg").html("");

    //显示对话框
    $("#dlgUploader").dialog( {width: 600, height: 400});

    UMO.fileupload("uploader", scope, obj, path, exts, dest, cbResult, null);
}

//文件下载
function filedownload()
{
    var scope = $("#scope_dload")[0].value;
    var obj = $("#obj_dload")[0].value;
    var path = $("#path_dload")[0].value;
    var file = $("#file_dload")[0].value;

    $("#errmsg").html("");
    UMO.filedownload(scope, obj, path, file, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "download url=" + result.url;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}


//-------- 配置 -----
//新增配置
function confignew()
{
    var scope = $("#scope_cfg1")[0].value;
    var obj = $("#obj_cfg1")[0].value;
    var file = $("#file_cfg1")[0].value;
    var nodepath = $("#nodepath_cfg1")[0].value;
    var nodeval = $("#nodeval_cfg1")[0].value;

    $("#errmsg").html("");
    UMO.confignew(scope, obj, file, nodepath, nodeval, cbResult, null);
}

//写入配置
function configwrite()
{
    var scope = $("#scope_cfg1")[0].value;
    var obj = $("#obj_cfg1")[0].value;
    var file = $("#file_cfg1")[0].value;
    var nodepath = $("#nodepath_cfg1")[0].value;
    var nodeval = $("#nodeval_cfg1")[0].value;

    $("#errmsg").html("");
    UMO.configwrite(scope, obj, file, nodepath, nodeval, cbResult, null);
}

//读取配置
function configread()
{
    var scope = $("#scope_cfg2")[0].value;
    var obj = $("#obj_cfg2")[0].value;
    var file = $("#file_cfg2")[0].value;
    var nodepath = $("#nodepath_cfg2")[0].value;

    $("#errmsg").html("");
    UMO.configread(scope, obj, file, nodepath, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "config read ok, value=" + result.value;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//删除配置
function configdelete()
{
    var scope = $("#scope_cfg2")[0].value;
    var obj = $("#obj_cfg2")[0].value;
    var file = $("#file_cfg2")[0].value;
    var nodepath = $("#nodepath_cfg2")[0].value;

    $("#errmsg").html("");
    UMO.configdelete(scope, obj, file, nodepath, cbResult, null);
}


//-------- 资源 -----

//资源列表
function resourcelist()
{
    var scope = $("#scope_res")[0].value;
    var obj = $("#obj_res")[0].value;
    var path = $("#path_res")[0].value;
    var exts = $("#exts_res")[0].value;

    $("#errmsg").html("");
    UMO.resourcelist(scope, obj, path, exts, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.files.length; i++)
            {
                var f = result.files[i];
                msg += "file=" + f.file + " "
                    + "size=" + f.size + " "
                    + "date=" + f.date + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}



//FullTest
//-------- 应用 -----
//下载应用
function appdownload()
{
    var appname = $("#app_dload")[0].value;
    var version = $("#ver_dload")[0].value;

    $("#errmsg").html("");
    UMO.appdownload(appname, version, cbResult, null);
}

//安装应用
function appinstall()
{
    var appname = $("#app_inst")[0].value;
    var option = $("#opt_inst")[0].value;

    $("#errmsg").html("");
    UMO.appinstall(appname, option, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "App:<hr/>";
            msg += " name=" + result.app.name
                + " caption=" + result.app.caption
                + " vendor=" + result.app.vendor
                + " type=" + result.app.type
                + " description=" + result.app.description
                + " abilities=" + result.app.abilities
                + " rights=" + result.app.rights
                + " modules=" + result.app.modules + "<br/>";

            msg += "Wigets:<br/>";
            for (var i=0; i<result.widgets.length; i++)
            {
                var f = result.widgets[i];
                msg += " name=" + f.name
                    + " caption=" + f.caption
                    + " abbr=" + f.abbr
                    + " description=" + f.description
                    + " horizon=" + f.horizon
                    + " vertical=" + f.vertical
                    + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//安装确认
function appconfirm()
{
    var appname = $("#app_confirm")[0].value;
    var action = $("#act_confirm")[0].value;
    var option = $("#opt_confirm")[0].value;

    $("#errmsg").html("");
    UMO.appconfirm(appname, action, option, cbResult, null);
}

//应用状态
function appstate()
{
    var appname = $("#app_state");

    $("#errmsg").html("");
    UMO.appstate(appname, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "get app state ok, state=" + result.state
                + " progress=" + result.progress;
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//卸载应用
function appuninstall()
{
    var appname = $("#app_uninst")[0].value;
    var dataclean = $("#clean_uninst")[0].value;
    var option = $("#opt_uninst")[0].value;

    $("#errmsg").html("");
    UMO.appuninstall(appname, dataclean, option, cbResult, null);
}

//已装应用
function appinstalled()
{
    var apptype = $("#app_type");

    $("#errmsg").html("");
    UMO.appinstalled(apptype, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.apps.length; i++)
            {
                var a = result.apps[i];
                msg += "name=" + a.name
                    + " caption=" + a.caption
                    + " vendor=" + a.vendor
                    + " version=" + a.version
                    + " type=" + a.type
                    + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//已装组件
function widgetinstalled()
{
    $("#errmsg").html("");
    UMO.widgetinstalled(function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.widgets.length; i++)
            {
                var a = result.widgets[i];
                msg += "app=" + a.app
                    + " name=" + a.name
                    + " caption=" + a.caption
                    + " horizon=" + a.horizon
                    + " vertical=" + a.vertical
                    + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}


//-------- 企业 -----

//部门列表
function deptlist()
{
    var parentid = $("#parent_deptid")[0].value;

    $("#errmsg").html("");
    UMO.entdeptlist(parentid, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.depts.length; i++)
            {
                var a = result.depts[i];
                msg += "deptid=" + a.deptid
                    + " deptname=" + a.deptname
                    + " parentid=" + a.parentid
                    + " isleaf=" + a.isleaf
                    + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//部门信息
function deptinfo()
{
    var deptid = $("#info_deptid")[0].value;

    $("#errmsg").html("");
    UMO.entdeptinfo(deptid, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "deptid=" + result.deptid + "<br/>"
                    + " deptname=" + result.deptname + "<br/>"
                    + " parentid=" + result.parentid + "<br/>"
                    + " isleaf=" + result.isleaf + "<br/>"
                    + " teleno=" + result.teleno + "<br/>"
                    + " managerid=" + result.managerid + "<br/>"
                    + " misc=" + result.misc + "<br/>"
                    + " memo=" + result.memo + "<br/>"
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//员工列表
function userlist()
{
    var deptid = $("#user_deptid")[0].value;

    $("#errmsg").html("");
    UMO.entuserlist(deptid, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "";
            for (var i=0; i<result.users.length; i++)
            {
                var a = result.users[i];
                msg += "userid=" + a.userid
                    + " username=" + a.username
                    + "<br/>";
            }
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}

//员工信息
function userinfo()
{
    var userid = $("#info_userid")[0].value;

    $("#errmsg").html("");
    UMO.entuserinfo(userid, function(cmd, result){
        if (result.errno == 0)
        {
            var msg = "userid=" + result.userid + "<br/>"
                + " username=" + result.username + "<br/>"
                + " deptid=" + result.deptid + "<br/>"
                + " teleno=" + result.teleno + "<br/>"
                + " fixno=" + result.fixno + "<br/>"
                + " faxno=" + result.faxno + "<br/>"
                + " mobileno=" + result.mobileno + "<br/>"
                + " mailbox=" + result.mailbox + "<br/>"
                + " memo=" + result.memo + "<br/>"
            showMessage(msg);
        }
        cbResult(cmd, result);
    }, null);
}


//------------------------- 工具函数 --------------------------

//结果回调
function cbResult(cmd, result)
{
    if (result.errno == 0)
    {
        $("#errmsg").html(cmd + " ok.");
    }
    else
    {
        $("#errmsg").html(cmd + " fail(" + result.errno + "): " + result.errmsg);
    }
}

//输出事件
function showEvent(msg)
{
    $("#event").append(msg+"<br/>")
}

//显示消息
function showMessage(msg)
{
    if (msg == "")
    {
        msg = "没有数据";
    }
    //alert(msg);
    $("#dlgmsg").html(msg);
    $("#dlgMessage").dialog( {width: 500} );
}


//显示元素
function show(ele)
{
    $(ele).removeClass("hide");
}

//隐藏元素
function hide(ele)
{
    $(ele).addClass("hide");
}

function onOperModeChanged(val)
{
    hide(".dataitem");
    $(".dataitem input").val("");

    if (val == "i")
    {
        show("#tr_flds");
        show("#tr_vals");

        $("#flds_oper").val("value");
        $("#vals_oper").val('"this is test string."')
    }
    else if (val == "d")
    {
        show("#tr_where");

        $("#where_oper").val('value like "%test%"')
    }
    else if (val == "u")
    {
        show("#tr_flds");
        show("#tr_vals");
        show("#tr_where");

        $("#flds_oper").val("value");
        $("#vals_oper").val('"this is another string."')
        $("#where_oper").val("id > 1")
    }
    else if (val == "q")
    {
        show("#tr_flds");
        show("#tr_where");
        show("#tr_group");
        show("#tr_order");
        show("#tr_size");
        show("#tr_idx");

        $("#flds_oper").val("id,value");
        $("#where_oper").val("");
        $("#group_oper").val("");
        $("#order_oper").val("id");
        $("#size_oper").val("20");
        $("#idx_oper").val("1");
    }
}

//显示页
function showPage(idx)
{
    $("#navigate > *").removeClass("active");
    hide("#action > div");

    switch(idx)
    {
        case 1:
            show("#comm");
            $("#navicomm").addClass("active");
            break;
        case 2:
            show("#tele");
            $("#navitele").addClass("active");
            break;
        case 3:
            show("#agent");
            $("#naviagent").addClass("active");
            break;
        case 4:
            show("#storage");
            $("#navistorage").addClass("active");
            break;
        case 5:
            show("#ent");
            $("#navient").addClass("active");
            break;
        case 6:   //FullTest
            show("#app");
            $("#naviapp").addClass("active");
            break;
    }
}


//事件处理
var EvtHandler =
{
    onReadyState: function(status)
    {
        showEvent("onReadyState: " + status);
    },

    onCallincome: function(ano, bno, uud)
    {
        showEvent("onCallincome: ano=" + ano + " bno=" + bno + " uud=" + uud);
    },

    onTalked: function(ano, bno, uud)
    {
        showEvent("onTalked: ano=" + ano + " bno=" + bno + " uud=" + uud);
    },

    onRingStoped: function()
    {
        showEvent("onRingStoped");
    },

    onHookChanged: function(status)
    {
        showEvent("onHookChanged: status=" + status);
    },

    onAgentChanged: function(status)
    {
        showEvent("onAgentChanged: status=" + status);
    },

    onAsyncFinished: function(atype, taskid, ret, desc)
    {
        showEvent("onAsyncFinished: atype=" + atype + " taskid=" + taskid + " ret=" + ret + " desc=" + desc);
    },

    onAllBusy: function(status, acd, quelen)
    {
        showEvent("onAllBusy: status=" + status + " acd=" + acd + " quelen=" + quelen);
    },

    onQuelen: function(acd, quelen)
    {
        showEvent("onQuelen: acd=" + acd + " quelen=" + quelen);
    },

    onSmsincome: function(dtime, from, content, slot)
    {
        showEvent("onSmsincome: dtime=" + dtime + " from=" + from+ " content=" + content + " slot=" + slot);
    },

    onOperCallback: function(flowid, callid, cdrid, direction, teleno, time, menuid, keypress, state)
    {
        showEvent("onOperCallback: : flowid=" + flowid + " callid=" + callid + " cdrid=" + cdrid +  " direction=" + direction
            + " teleno=" + teleno  + " time=" + time  + " menuid=" + menuid + " keypress=" + keypress 
			+ " state=" + state)
    },

    onSpeedCallback: function(flowid, callid, cdrid, direction, teleno, time, menuid, keypress, state, desc, sessionid)
    {
        showEvent("onSpeedCallback: flowid=" + flowid + " callid=" + callid + " cdrid=" + cdrid + " direction=" + direction
            + " teleno=" + teleno  + " time=" + time  + " menuid=" + menuid + " keypress=" + keypress 
			+ " state=" + state  + " desc=" + desc + " sessionid=" + sessionid );
    },

    onTextMessage: function(fromaid, chatmode, text)
    {
        showEvent("onTextMessage: fromaid=" + fromaid + " chatmode=" + chatmode+ " content=" + text);
    }
}

//载入时自动启动
UMO._addEvent(window, 'load', start, false);


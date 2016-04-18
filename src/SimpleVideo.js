/**
 * Created by yuny on 2016/4/17.
 */
(function(oWin, oDoc){
    // Assistant
    var Helper = {
        insertScript: fInsertScript,
        listenEvent: fListenEvent,
        getScriptPath: fGetScriptPath,
        getPath: fGetPath
    };

    function fInsertScript(sSrc, fCallback){
        var oScript = oDoc.createElement('script');
        oDoc.documentElement.appendChild(oScript);
        oScript.onload = function(){
            fCallback && fCallback();
        };
        oScript.src = sSrc;
    }

    function fListenEvent(oDom, sEventName, fCallback, bUseCapture){
        if(oWin.attachEvent){
            oDom.attachEvent('on' + sEventName, function(){
                var oEvent = oWin.event;
                fCallback && fCallback(oEvent);
            });
        }else{
            oDom.addEventListener(sEventName, fCallback, !!bUseCapture);
        }
    }

    function fGetScriptPath(sScriptFileName){
        var oReg = new RegExp(sScriptFileName + '(\.min|)\.js');
        var oScripts = oDoc.getElementsByTagName("script");
        for (var cnt = 0, length = oScripts.length; cnt < length; cnt++) {
            var oScript = oScripts[cnt];
            if (oScript.src.match(oReg)) {
                return this.getPath(oScript.src);
            }
        }
        return "";
    }

    function fGetPath(sUrl){
        return sUrl.split("/").slice(0, -1).join("/");
    }

    var sScriptPath = Helper.getScriptPath('SimpleVideo');

    // SimpleVideo类
    var SimpleVideo = fConstructor;
    // 静态变量
    SimpleVideo.prototype.SWFOBJECT_URL = sScriptPath + '/swfobject.min.js';
    SimpleVideo.prototype.EXPRESS_INSTALL_URL = sScriptPath + '/expressInstall.swf';
    // 静态方法
    SimpleVideo.prototype.isLowVersionIE = fIsLowVersionIE;
    SimpleVideo.prototype.initVariables = fInitVariables;
    SimpleVideo.prototype.setWrapRect = fSetWrapRect;
    SimpleVideo.prototype.render = fRender;
    SimpleVideo.prototype.renderCover = fRenderCover;
    SimpleVideo.prototype.renderBtnPlay = fRenderBtnPlay;
    SimpleVideo.prototype.onBtnPlayClick = fOnBtnPlayClick;
    SimpleVideo.prototype.renderBtnStop = fRenderBtnStop;
    SimpleVideo.prototype.onBtnStopClick = fOnBtnStopClick;
    SimpleVideo.prototype.renderNormalVideo = fRenderNormalVideo;
    SimpleVideo.prototype.renderCompatibleVideo = fRenderCompatibleVideo;
    SimpleVideo.prototype.play = fPlay;
    SimpleVideo.prototype.stop = fStop;

    function fConstructor(oConf){
        var that = this;
        this.initVariables(oConf);
        this.setWrapRect();
        if(this.isLowVersionIE()){
            Helper.insertScript(this.SWFOBJECT_URL, function(){
                that.render();
            });
        }else{
            this.render();
        }
    }

    function fIsLowVersionIE(){
        var sUA = navigator.userAgent;
        return /MSIE 6/.test(sUA) || /MSIE 7/.test(sUA) || /MSIE 8/.test(sUA);
    }

    function fInitVariables(oConf){
        oConf = oConf || {};
        if(oConf.target){
            this.target = oConf.target;
        }else{
            throw new Error("You must pass the DOM of video to target!");
        }

        this.width = oConf.width;
        this.height = oConf.height;
        this.sources = oConf.sources || [];
        this.coverImage = oConf.coverImage || '';
        this.hasCover = oConf.hasCover || false;
        this.params = oConf.params || {};

        this.cover = null; // 封面图片对象
        this.video = null; // 视频对象
        this.btnPlay = null; // 播放按钮对象
        this.btnStop = null; // 停止按钮对象

        this.videoDomID = null; // 视频domID
        this.isPlay = false;
    }

    function fSetWrapRect(){
        var oTarget = this.target;
        oTarget.style.width = this.width + 'px';
        oTarget.style.height = this.height + 'px';
    }

    function fRender(){
        this.renderCover();
        this.renderBtnPlay();
    }

    function fRenderCover(){
        if(this.hasCover){
            this.cover = oDoc.createElement('img');
            this.cover.className = 'w-video-wrap-cover';
            this.cover.src = this.coverImage;
            this.cover.width = this.width;
            this.cover.height = this.height;
            this.target.appendChild(this.cover);
        }
    }

    function fRenderBtnPlay(){
        var that = this;
        this.btnPlay = oDoc.createElement('button');
        this.btnPlay.innerHTML = '播放';
        Helper.listenEvent(this.btnPlay, 'click', function(){
            that.onBtnPlayClick();
        });
        this.target.appendChild(this.btnPlay);
    }

    function fOnBtnPlayClick(){
        if(this.hasCover){
            this.cover.style.display = 'none';
        }
        this.btnPlay.style.display = 'none';
        this.play();
    }

    function fRenderBtnStop(){
        var that = this;
        this.btnStop = oDoc.createElement('button');
        this.btnStop.innerHTML = '停止';
        Helper.listenEvent(this.btnStop, 'click', function(){
            that.onBtnStopClick();
        });
        this.target.appendChild(this.btnStop);
    }

    function fOnBtnStopClick(){
        this.stop();
    }

    function fRenderNormalVideo(){
        this.video = document.createElement('video');
        this.videoDomID = 'video' + new Date().getTime();
        this.video.id = this.videoDomID;
        this.video.src = this.sources.mp4;
        this.video.width = this.width;
        this.video.height = this.height;

        for(var sKey in this.params){
            this.video.setAttribute(sKey, this.params[sKey]);
        }
        this.target.appendChild(this.video);
    }

    function fRenderCompatibleVideo(){
        // 创建flash容器
        this.video = document.createElement('span');
        this.videoDomID = 'rawVideo' + new Date().getTime();
        this.video.id = this.videoDomID;
        this.target.appendChild(this.video);

        var oFlashConf = {};
        var oParams = {
            loop: false,
            wmode: 'opaque'
        };
        var oAttributes = {

        };
        swfobject.embedSWF(this.sources.swf, this.videoDomID, this.width, this.height, 10, this.EXPRESS_INSTALL_URL, oFlashConf, oParams, oAttributes);
    }

    function fPlay(){
        this.isPlay = true;
        this.renderBtnStop();
        if(this.isLowVersionIE()){
            this.renderCompatibleVideo();
        }else{
            this.renderNormalVideo();
        }
    }

    function fStop(){
        if(this.isPlay){
            this.target.removeChild(oDoc.getElementById(this.videoDomID));
            this.target.removeChild(this.btnStop);
            this.video = null;
            this.btnStop = null;
            if(this.hasCover){
                this.cover.style.display = 'block';
            }
            this.btnPlay.style.display = 'block';
            this.isPlay = false;
        }
    }

    // Insert to the global object for using.
    if(!oWin.SimpleVideo){
        oWin.SimpleVideo = SimpleVideo;
    }else{
        throw new Error("It's duplicate to defined 'SimpleVideo', please check the scripts which you has been imported!");
    }
})(window, document);
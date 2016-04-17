About SimpleVideo
===
一个不基于任何框架库并向后兼容IE678浏览器的轻量级视频组件，其在IE678浏览器中通过ember标签插入swf格式的视频，而在其它现代浏览器中则可通过插入video标签来播放通用的mp4格式的视频。

Quick Start
===
+ 直接从上面下载
+ 克隆项目：git clone https://github.com/YunyChan/SimpleVideo.git

依赖
===
+ [swfobject](https://code.google.com/p/swfobject)

使用
===
首先在页面中引入`SimpleVideo.js`JS文件

	<script src="SimpleVideo.js"></script>

然后通过创建SimpleVideo的实例并传入相应的参数来插入并使用组件

	<div id="video"></div>
	<script src="res/SimpleVideo.js"></script>
	<script>
		var oVideo = new SimpleVideo({
			target: document.getElementById('video'),
			width: 400,
			height: 400,
			sources: {
				mp4: 'test_video.mp4',
				swf: 'test_video.swf'
			},
			coverImage: 'test_video.png',
			hasCover: true,
			params: {
				controls: 'controls',
				preload: 'preload',
				autoplay: 'autoplay'
			}
		});
	</script>

由于本组件使用swfobject第三方库，所以如果你的swfobject相关文件放置在SimpleVideo.js相同的目录，那么你可以通过以下方式来配置它们的路径：

	SimpleVideo.prototype.SWFOBJECT_URL = 'swfobject.min.js';
	SimpleVideo.prototype.EXPRESS_INSTALL_URL = 'expressInstall.swf';

下面是组件的配置参数说明：

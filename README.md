# SimpleVideo [![license](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/YunyChan/SimpleVideo/blob/master/LICENSE) #

一个不基于任何框架库并向后兼容IE678浏览器的轻量级视频组件，其在IE678浏览器中通过ember/object标签插入swf格式的视频，而在其它现代浏览器中则可通过插入video标签来播放通用的mp4格式的视频。

## 快速开始 ##

+ 直接从上面下载
+ 克隆项目：git clone https://github.com/YunyChan/SimpleVideo.git

## 依赖 ##

+ [swfobject](https://github.com/swfobject/swfobject)

## 使用 ##

首先在页面中引入`SimpleVideo.js`JS文件

```html
<script src="SimpleVideo.js"></script>
```

然后通过创建SimpleVideo的实例并传入相应的参数来插入并使用组件

```html
<div id="video"></div>
<script src="SimpleVideo.js"></script>
<script>
	var oVideo = new SimpleVideo({
		target: document.getElementById('video'),
		width: 400,
		height: 400,
		sources: {
			mp4: 'test_video.mp4',
			swf: 'test_video.swf'
		},
		hasCover: true,
		coverImage: 'test_video.png'
	});
</script>
```

由于本组件使用swfobject第三方库，所以如果你的swfobject相关文件放置在SimpleVideo.js相同的目录，那么你可以通过以下方式来配置它们的路径：

```js
SimpleVideo.prototype.SWFOBJECT_URL = 'swfobject.min.js';
SimpleVideo.prototype.EXPRESS_INSTALL_URL = 'expressInstall.swf';
```

下面是组件的配置参数说明：

+ `target` - __必须__, 需要插入视频的dom元素
+ `width` - __必须__, 视频宽度（单位px）
+ `height` - __必须__, 视频高度（单位px）
+ `sources` - __必须__, 视频源数据：如果要兼容IE678浏览器，则必须传swf格式（FLV1编码）的视频路径，如果不传swf格式，则表示不兼容IE低版本浏览器（即不渲染组件）；而其它现代浏览器，则需要传mp4格式（AVC1编码）的视频路径，由于经过测试，目前mp4基本兼容所有浏览器，所以组件只兼容mp4格式的视频。
+ `coverImage` - _可选_, 视频未开始播放封面
+ `hasCover` - _default: false_, 是否需要显示未开始播放的封面，与`coverImage`组合使用
+ `autoPlay` - _default: false_, 是否自动播放
+ `params` - _可选_, 用于指定现代浏览器中video标签的属性参数

## 作者 ##

Yuny Chan

+ [GitHub：https://github.com/YunyChan](https://github.com/YunyChan)
+ [博客：http://yuny.me/](http://yuny.me/)
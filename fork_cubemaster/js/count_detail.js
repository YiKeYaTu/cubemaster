/**
 * Created by liuyanhao on 20/5/16.
 */

	//模态框状态
	var modalStatus = document.querySelector("#modal-overlay");
	//列表栏状态
	var navList = document.querySelectorAll(".source-nav li");
	//监听类名点击
	var codeBtn = document.querySelectorAll(".source-content-page a");
	//判断模态框是否正在变化
	var animate = false;

	//监听模态框关闭事件
	document.querySelector(".modal-close").addEventListener("click", function () {
		if(!animate){
			animate = true;
			var opa = 10;
			closeModal(opa);
			document.querySelector(".modal-body-main").innerHTML = '';
		}
	});

	// //监听模态框打开事件
	// for (var i = 0; i < codeBtn.length; i++) {
	// 	codeBtn[i].addEventListener("click", function () {
	// 		// console.log(1)
	// 		if(!animate) {
	// 			animate = true;
	// 			modalStatus.style.display = (modalStatus.style.display == "block") ? "none" : "block";
	// 			var opa = 0;
	// 			document.querySelector(".modal-body-main").innerHTML = '';
	// 			getCode(this.getAttribute('path'));
	// 			showModal(opa);
	// 			animate = false;
	// 		}
	// 	});
	// }

	//点击源码按钮展开事件
	function sourceListAction(navList) {
		var btn = document.querySelector(".code-btn");
		var sourceList = document.querySelector(".source-nav");
		// var source = document.querySelector(".source");
		var mainDetail = document.querySelector(".main-detail");
		var codeContent = document.querySelector(".code-btn-content");

		sourceList.style.display = (sourceList.style.display == "inline-block") ? "none" : "inline-block";
		if (sourceList.style.display == "inline-block") {
			mainDetail.style.minHeight = "1070px";
			btn.style.background = "url('images/down.png') no-repeat 260px 20px rgb(171, 171, 171)";
			btn.style.height = "70px";
			btn.style.lineHeight = "60px";
			btn.style.fontSize = "40px";
			btn.style.display = "inline-block";
			codeContent.style.color = "rgb(82, 81, 81)";
			//隐藏子菜单
			for (var j = 0; j < navList.length; j++) {
				if (navList[j].getAttribute("parentid") != "-1") {
					navList[j].style.display = "none";
				}
			}
			//将滚动条移到最下面
			window.scrollTo(0,document.body.scrollHeight);
		}
		else {
			mainDetail.style.minHeight = "650px";
			btn.style.height = "50px";
			btn.style.lineHeight = "50px";
			btn.style.fontSize = "20px";
			btn.style.display = "inline-block";
			btn.style.background = "url('images/up.png') no-repeat 260px 10px #E8E6E4";
			//隐藏子菜单
			for (var j = 0; j < navList.length; j++) {
				if (navList[j].value == currentActive) {
					navList[j].className = "source-nav-link";
				}
				navList[j].setAttribute("status", "0");
				if (navList[j].style.display == "none") {
					navList[j].style.display = "list-item";
				}
			}
		}
	}

		//监听源码按钮点击事件
		document.querySelector(".code-btn").addEventListener("click", function () {
			loadSourceList();
		});

		//监听下拉框点击事件
		function listenNavListEvent(navList) {
			// alert(1)
			var currentActive;
			//监听下拉框数据
			for (var i = 0; i < navList.length; i++) {
				navList[i].addEventListener("click", function () {

					//判断是否是类名
					var regExp = /.java$/;
					if( regExp.test(this.childNodes[0].innerHTML)){

						if(!animate) {
							animate = true;
							modalStatus.style.display = (modalStatus.style.display == "block") ? "none" : "block";
							document.querySelector(".modal-body-main").innerHTML = '';
							getCode(this.getAttribute('path'));
							var opa = 0;
							showModal(opa);
							animate = false;
						}
					}

					//未展开
					if (this.getAttribute('status') == "0") {
						//显示子菜单
						for (var j = 0; j < navList.length; j++) {
							if (navList[j].getAttribute("parentId") == this.value) {
								navList[j].style.display = "list-item";
								var sourceNavheight = document.querySelector('.source-nav').clientHeight;
								if(sourceNavheight > 380){
									document.querySelector('.main-detail').style.minHeight = 700+sourceNavheight+'px';
								}
							}
						}
						this.setAttribute("status", "1");
					}
					//已经展开
					else {
						//隐藏子菜单
						for (var j = 0; j < navList.length; j++) {
							if (navList[j].getAttribute("parentId") == this.value) {
								hideMoreNav(navList[j].value)
								navList[j].style.display = "none";
							}
						}
						this.setAttribute("status", "0");
					}
					//更改点击前后点击后的样式
					for (var k = 0; k < navList.length; k++) {
						if (navList[k].value == currentActive) {
							navList[k].className = "source-nav-link";
						}
					}
					this.className = "source-nav-active";
					currentActive = this.value;
				});
			}
		}
		// //源代码框
		// function sourceFrame() {
		// 	var source = document.querySelector(".source");
		// 	var opa = 0;
        //
		// 	function show() {
		// 		source.style.opacity = opa;
		// 		opa += 0.2;
		// 		if (source.style.opacity >= 1) {
		// 			clearTimeout(time);
		// 			return;
		// 		}
		// 		var time = setTimeout(function () {
		// 			show();
		// 		}, 200)
		// 	}
        //
		// 	show();
		// }

//详细收缩
// 		function detailMove() {
// 			var mainDetail = document.querySelector(".main-detail");
// 			mainDetail.style.height = "735px";
// 		}

//隐藏多级子菜单
		function hideMoreNav(value) {
			var navList = document.querySelectorAll('.source-nav li');
			for (var i = 0; i < navList.length; i++) {
				if (navList[i].getAttribute("parentId") == value) {
					console.log("aaaaa")
					arguments.callee(navList[i].value);
					navList[i].style.display = "none";
				}
			}
		}

		// function hideNav(navList) {
		// 	for (var j = 0; j < navList.length; j++) {
		// 		if (navList[j].getAttribute("parentId") == this.value) {
		// 			navList[j].style.display = "none";
		// 		}
		// 	}
		// 	this.setAttribute("status", "0");
		// }

//实现源码按钮点击事件
// 		function sourceBtn(maxwid, maxhei) {
// 			var srcBtn = document.querySelector(".source");
// 			srcBtn.style.display = (srcBtn.style.display == "block") ? "none" : "block";
// 			if (srcBtn.style.display == "block") {
// 				//监听java类点击事件
// 				var codeBtn = document.querySelectorAll(".source-content li a");
// 				for (var i = 0; i < codeBtn.length; i++) {
// 					codeBtn[i].addEventListener("click", function () {
// 						modalStatus.style.display = (modalStatus.style.display == "block") ? "none" : "block";
// 						var opa = 0;
// 						showModal(opa);
// 					});
// 				}
//
// 				var wid = 0;
// 				var hei = 0;
// 				//扩大源码框
// 				function move(wid, hei) {
// 					wid += 241;
// 					hei += 88;
// 					if (wid > maxwid && hei > maxhei) {
// 						clearTimeout(time);
// 						return;
// 					}
// 					if (wid <= maxwid) {
// 						srcBtn.style.width = wid + "px";
// 					}
// 					if (hei <= maxhei) {
// 						srcBtn.style.height = hei + "px";
// 					}
// 					var time = setTimeout(function () {
// 						move(wid, hei);
// 					}, 50);
// 				}
//
// 				move(wid, hei);
// 			}
// 		}

//监听类名点击事件
// 		function listenSource(modalStatus) {
// 			for (var i = 0; i < codeBtn.length; i++) {
// 				codeBtn[i].addEventListener("click", function () {
// 					modalStatus.style.display = (modalStatus.style.display == "block") ? "none" : "block";
// 					var opa = 0;
// 					showModal(opa);
// 				});
// 			}
// 		}



		//渐变显示模态框
		function showModal(opa) {
				if (modalStatus.style.opacity >= 1) {
					clearTimeout(time)
					return;
				}
				opa += 0.2;
				modalStatus.style.opacity = opa;
				var time = setTimeout(function () {
					if (modalStatus.style.opacity >= 1) {
						clearTimeout(time)
						document.querySelector("body").style.overflow = 'hidden';
						return;
					}
					showModal(opa);
				}, 100);
		}

		//渐变隐藏模态框
		function closeModal(opa) {
			if (modalStatus.style.opacity <= 0) {
					clearTimeout(time);
					modalStatus.style.display = (modalStatus.style.display == "block") ? "none" : "block";
					animate = false;
					document.querySelector("body").style.overflow = 'auto';
					return;
				}
				opa -= 2;
				modalStatus.style.opacity = opa / 10;
				var time = setTimeout(function () {
					closeModal(opa);
				}, 100);
	}
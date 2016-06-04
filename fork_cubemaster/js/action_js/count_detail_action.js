/**
 * Created by liuyanhao on 31/5/16.
 */
//本算法id
var id;

//获取算法基本数据
    function loadBasicData() {
        //获取url中的算法id
        var param = window.location.search;
        var index = param.indexOf('=');
        id = param.substring(index+1,param.length);

        //获取算法基本信息
        var xmlhttp = new XMLHttpRequest();
        var url = "http://172.22.146.5/FileSystem/servlet/AlgorithmDetailsServlet?protocol=A-2-3-request&algorithm_id="+id;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var content = JSON.parse(xmlhttp.responseText)
                addBasicData(content);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    loadBasicData();

//将基本信息添加到节点上
    function addBasicData(content) {
        var brief = content.algorithm.description;
        //算法名称
        var name = content.algorithm.algorithm_name;
        //算法类型
        var tasks = content.algorithm.associated_tasks;
        //作者
        var author = content.user_name;
        //测试数据集
        var dataTest = content.algorithm.data_test;
        //简介
        var brief = content.algorithm.description;
        //参数个数
        var paraCount = content.algorithm.parameter_count;
        //平台
        var platform = content.algorithm.platform;
        //最新提交时间
        var submitTime = content.algorithm.submit_datetime;
        //关键字
        var keyword = content.key_word[0].keyword;
        //数据需求
        // var requirements = content.algorithm.associated_requirements;
        //输入格式
        var inPattern = content.algorithm.in_pattern;
        //输出格式
        var outPattern = content.algorithm.out_pattern;

        document.querySelector(".count-name").innerHTML = name;
        //判断匿名
        if (author) {
            document.querySelector(".author").innerHTML = author;
        }
        document.querySelector(".update-time").innerHTML = submitTime;
        document.querySelector(".brief-content").innerHTML = brief
        document.querySelector(".pro-type span").innerHTML = tasks;
        document.querySelector(".pro-keyword span").innerHTML = keyword;
        document.querySelector(".pro-platform span").innerHTML = platform;
        document.querySelector(".output-style-content").innerHTML = outPattern;
        document.querySelector(".input-style-content").innerHTML = inPattern;
        document.querySelector(".test-data-content").innerHTML = dataTest;

        //参数列表
        var paraList = content.parameters;
        paraList.forEach(function (item, index, array) {
            var paraObj = document.createElement('ul');

            //参数名称
            var paraName = document.createElement("li");
            var nodeName = document.createTextNode(item.parameter_name);
            paraName.appendChild(nodeName);

            //参数类型
            var paraType = document.createElement("li");
            var nodeType = document.createTextNode(item.parameter_type);
            paraType.appendChild(nodeType);

            //参数值
            var paraVal = document.createElement("li");
            var nodeVal = document.createTextNode(item.parameter_value);
            paraVal.appendChild(nodeVal);

            paraObj.appendChild(paraName);
            paraObj.appendChild(paraType);
            paraObj.appendChild(paraVal);
            document.querySelector(".para-list-content").appendChild(paraObj);
        })
    }

//获取源码下拉框
function loadSourceList() {
    var xmlhttp = new XMLHttpRequest();

    //这是一个测试
    // var url = 'test1.json';
    
    var url = 'http://172.22.147.5:8080/FileSystem/servlet/AlgorithmMenuServlet?algorithm_id='+id;
    xmlhttp.onreadystatechange = function (){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.response.status == '0'){
                var sourceNav = document.querySelector('.source-nav');
                
                addSourceData(xmlhttp.response.menu);
                var sourceList = document.querySelectorAll('.source-nav li');

                //源码按钮事件
                sourceListAction(sourceList);
                //源码下拉框按钮事件
                listenNavListEvent(sourceList);
            }
        }
    }
    xmlhttp.open("GET", url);
    xmlhttp.responseType = 'json';
    xmlhttp.send();
}

//将目录结构添加到节点
function addSourceData(menus) {
    var sourceNav = document.querySelector('.source-nav');

    sourceNav.innerHTML = '';
    menus.forEach(function (item,index,array) {
        var parentId = item.pNode;
        //添加a标签内容
        var aTag = document.createElement('a');
        aTag.style.marginLeft = (item.level - 1)*25+'px';
        var aTagText = document.createTextNode(item.name);
        aTag.appendChild(aTagText);

        //添加li标签
        var liTag = document.createElement('li');
        liTag.appendChild(aTag);
        liTag.setAttribute('path',item.path);
        liTag.setAttribute('parentid',parentId);
        liTag.setAttribute('value',index);
        liTag.setAttribute('status','0');
        liTag.className = 'source-nav-link';
        
        if(item.pNode == '-1') {
            //将li标签放在ul标签里面
            sourceNav.appendChild(liTag);
        }else{
            var cNodes = sourceNav.childNodes;
            var parNode = cNodes[parentId];
            while (true) {
                if (parNode.nextSibling == null ||index < parNode.nextSibling.getAttribute('value')) {
                    sourceNav.insertBefore(liTag, parNode.nextSibling);
                    break;
                }
                parNode = parNode.nextSibling;
            }
        }
    })
}

//得到源码(需要连内网)
function getCode(path) {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://172.22.147.5:8080/FileSystem/servlet/AlgorithmCodeServlet?algorithm_id="+id+"&file_name="+path;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var codeModal = document.querySelector('.modal-body-main');
            codeModal.innerHTML = xmlhttp.responseText;
            codeModal.style.fontSize = "25px";
        }
    }
    xmlhttp.open("GET", url);
    xmlhttp.send();
}

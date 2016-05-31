 /**
 * Created by lenovo on 2016/5/18.
 */
/*var dataObj = {
            "protocol": "A-1-3-request",
            "dataset_id": ,
            "dataset_viewmore": "true"
        };*/

function CreatXHR() {
    var xmlHttp = false;
    try {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e2) {
            xmlHttp = false;
        }
    }
    if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
        xmlHttp = new XMLHttpRequest();
    }
    return xmlHttp;
}
function getDataFromSever() {
    var dataset_id=getQueryStringByName('','dataset_id');
    url='../servlet/DataSetDetailsServlet?protocol=A-1-3-request&dataset_viewmore=false&dataset_id='+dataset_id;
    var req = CreatXHR();
    if (req != null) {
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if ((req.status >= 200) && req.status < 300) {
                    var data = JSON.parse(req.responseText);
                    document.getElementById('data-name').innerHTML = data.dataset.dataset_name;
                    document.getElementById('author').innerHTML = data.user_name;
                    document.getElementById('update-time').innerHTML = data.dataset.submit_datetime;
                    document.getElementById('bref').innerHTML = data.dataset.description;
                    document.getElementById('count').innerHTML = data.dataset.number_download;
                    document.getElementById('area').innerHTML = data.dataset.area;
                    document.getElementById('data-type').innerHTML = data.dataset.associated_tasks;
                    for (var i = 0; i < data.attributes.length; i++) {
                        var name = document.createElement('td');
                        var type = document.createElement('td');
                        var range = document.createElement('td');
                        name.setAttribute('class', 'name');
                        type.setAttribute('class', 'type');
                        range.setAttribute('class', 'range');
                        var tr = document.createElement('tr');
                        tr.appendChild(name);
                        tr.appendChild(type);
                        tr.appendChild(range);
                        var para = document.getElementsByClassName('table');
                        console.log(para);
                        para[0].appendChild(tr);
                        document.getElementsByClassName('name')[i].innerHTML = data.attributes[i].attribute_name;
                        document.getElementsByClassName('type')[i].innerHTML = data.attributes[i].attributes_type;
                        document.getElementsByClassName('range')[i].innerHTML = data.attributes[i].range;

                    }

                }
            }
        }
            req.open('GET', url, false);
            req.send(null);
    }
}
    //加载页面时运行
    window.onload = getDataFromSever();
    //点击查看更多
    function viewmore(){
    document.getElementById('viewmore').style.display='block';
        document.getElementById('fold').style.display='inline-block';
        document.getElementById('data_more').style.display='inline-block';

        var tmp=url.replace(getQueryStringByName('dataset_viewmore'),'true');
        var file_path=tmp;
        datamore();

    }
    //点击隐藏
    function hide(){
        document.getElementById('viewmore').style.display='none';
        document.getElementById('fold').style.display='none';
        document.getElementById('data_more').style.display='none';
        var tmp=url.replace(getQueryStringByName('dataset_viewmore'),'false');
        console.log(tmp)
    }
function data_page() {
    var page=0;
    return function (){
        return page+=1;
    };
}
var result=data_page();
    function datamore(){
        var file = 'http://172.22.146.5/FileSystem/servlet/DataSetDetailsServlet?protocol=A-1-3-request&dataset_id='+getQueryStringByName(url,'dataset_id')+'&dataset_viewmore=true&data_page=' + result();
        var page=getQueryStringByName(file,'data_page');
        var req = CreatXHR();1
            if (req != null) {
                req.onreadystatechange = function () {
                    if (req.readyState === 4) {
                        if ((req.status >= 200) && req.status < 300) {
                            file_data = JSON.parse(req.responseText);
                            var text = document.getElementById('viewmore');
                            var ul=document.createElement('ul');
                            ul.setAttribute('id',page);
                            text.appendChild(ul);
                            console.log('page:'+page);
                            if (file_data.data_source!='') {
                                for (var i =0; i < file_data.data_source.length; i++) {
                                    var list = document.createElement('li');
                                    ul.appendChild(list);
                                    list.setAttribute('class', 'info');
                                    document.getElementById(page).getElementsByClassName('info')[i].innerHTML = file_data.data_source[i];
                                }

                                console.log(list);
                            } else {
                                document.getElementById('data_more').style.display='none';
                                alert('没有更多数据！！');
                            }
                        }
                    }
                }
            }
            req.open('GET', file, false);
            req.send();
    }

    //获取URL中需要的参数名的值
    function getQueryStringByName(url,name){
        if(url=='') {
            var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        }else{
            result=url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        }
        if(result == null || result.length < 1){
            return "";
        }
        console.log(name+':'+result[1]);
        return result[1];
    }


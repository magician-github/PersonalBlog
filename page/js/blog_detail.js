var blogDetail = new Vue({
    el:"#blog_detail",
    data: function () {
        return {
            title:"",
            tags:"",
            content:"",
            views:"",
            ctime:""
        }
    },
    computed:{

    },
    created:function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split('='):"";
        if(searchUrlParams == "") {
            return ;
        }
        var bid = -1;
        for(var i = 0 ;i< searchUrlParams.length;i++) {
            try{
                if(searchUrlParams[i-1] == "bid"){
                    bid = searchUrlParams[i];

                }
            }catch (e){
                console.log(e);
            }
        }
        axios({
            url:'/queryBlogById?bid=' + bid,
            method:"get"
        }).then(function (resp) {
            var result = resp.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
            blogDetail.ctime = result.ctime;

        }).catch(function(err){
            console.log("请求失败");
        })
    }
});
var sendCommen = new Vue({
    el:"#send_commen",
    data:{
        vcode:'vv',
        rightCode:''
        
    },
    computed: {
        changeCode:function () {
            return function () {

                axios({
                    url:'/queryRandomCode',
                    method:'get'
                }).then(function (resp) {
                    sendCommen.vcode = resp.data.data.data;
                    sendCommen.rightCode = resp.data.data.text;

                })
            }
        },
        sendComment: function () {
            return function () {
                var dom = document.getElementById('commen_code');
                console.log(dom.value);
                if(dom.value != sendCommen.rightCode) {
                    alert("验证码有误");
                    return;

                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split('=') : "";
                if (searchUrlParams == "") {
                    return;
                }
                var bid = -1;
                for (var i = 0; i < searchUrlParams.length; i++) {
                    try {
                        if (searchUrlParams[i - 1] == "bid") {
                            bid = searchUrlParams[i];

                        }
                    } catch (e) {
                        console.log(e);
                    }

                }
                var reply = document.getElementById("commen_reply");
                var replyName = document.getElementById("commen_reply_name");

                var name = document.getElementById("commen_name");
                var email = document.getElementById("commen_email");
                var content = document.getElementById("commen_content");
                axios({
                    method:'get',
                    url:'/addComment?bid=' + bid + "&parent=" + reply.value + "&userName=" + name.value + '&email=' + email.value + '&content=' + content.value + '&parentName=' + replyName.value
                }).then(function (resp){
                    alert(resp.data.msg);
                })

            }

        }
    },
    created:function () {
        this.changeCode();
    }
});
var blog_comments = new Vue({
    el:'#blog_Comment',
    data:{
        totalCount:1,
        comments:[
            {id:'1',name:'cs',ctime:'2020-20-1',comments:'hello',options:''},
            {id:'1',name:'cs',ctime:'2020-20-1',comments:'hello'},
            {id:'1',name:'cs',ctime:'2020-20-1',comments:'hello'},


        ]

    },
    computed:{
        reply: function (blogId,blogName) {
            return function (blogId,blogName) {
                document.getElementById('commen_reply').value = blogId;
                document.getElementById('commen_reply_name').value = blogName;
                location.href = '#send_commen';

            }

        }

    },
    created:function(){
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split('='):"";
        if(searchUrlParams == "") {
            return ;
        }
        var bid = -1;
        for(var i = 0 ;i< searchUrlParams.length;i++) {
            try{
                if(searchUrlParams[i-1] == "bid"){
                    bid = searchUrlParams[i];

                }
            }catch (e){
                console.log(e);
            }
        };
        axios({
            method:'get',
            url:'/queryBlogCommentsById?bid='+bid
        }).then(function(resp){
            blog_comments.comments = resp.data.data;
            for(var i = 0; i < blog_comments.comments.length; i++) {
                if(blog_comments.comments[i].parent > -1) {
                    blog_comments.comments[i].options = '回复@' + blog_comments.comments[i].parent_name;
                }
            }
        }).catch(function (err) {
            console.log("请求错误");

        });
        axios({
            method:'get',
            url:'/queryBlogCommentsCountById?bid=' + bid
        }).then(function (resp) {
            blog_comments.totalCount = resp.data.data[0].count;
        }).catch(function(err){
            console.log('请求错误')
        })

    }
})
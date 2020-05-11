const everyDay = new Vue({
    el:"#every_day",
    data: function () {
        return {
            content:'where there is will, there there is a way!'
        }

    },
    computed:{
        getContent: function () {
            return this.content;

        }
    },
    created: function () {
        axios({
            url:'/queryEveryDay',
            method:"get"
        }).then(function (resp) {
            everyDay.content = resp.data.data[0].content;

        }).catch (function (resp) {
            console.log("请求失败");

        })

    }
});
const articleList = new Vue({
    el:'#articleList',
    data:{
        page:1,
        pageSize:5,
        count:100,
        pageNumList:[],
        articleList:[
            {
                title:'Laravel5.4安装passport时遇到的一些问题',
                content:'安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
                ctimes:'2020-12-12',
                views:'10043',
                tags:'biology',
                link:''


            },
            {
                title:'Laravel5.4安装passport时遇到的一些问题',
                content:'安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
                ctimes:'2020-12-12',
                views:'10043',
                tags:'biology',
                link:''


            },
            {
                title:'Laravel5.4安装passport时遇到的一些问题',
                content:'安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
                ctimes:'2020-12-12',
                views:'10043',
                tags:'biology',
                link:''

            }
        ],

    },
    computed:{
        jumpTo:function (){
            return function(page){
                articleList.getPage(page,articleList.pageSize);
            }
        },
        getPage:function (){
            return function (page,pageSize) {
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split('=') : "";
                //if (searchUrlParams == "") {
                //    return;
                //}
                var tag = '';
                for (var i = 0; i < searchUrlParams.length; i++) {
                    try {
                        if (searchUrlParams[i - 1] == "tag") {
                            tag = searchUrlParams[i];

                        }
                    } catch (e) {
                        console.log(e);
                    }

                }
                if(tag == ''){
                    axios({
                        url:'/queryBlogByPage?'+'page='+(page-1)+'&pageSize='+pageSize,
                        method:'get',

                    }).then(function (resp) {
                        var result = resp.data.data;
                        //articleList.articleList = result;
                        var list = [];
                        for(var i = 0;i<result.length;i++){
                            var temp = {};
                            temp.content = result[i].content;
                            temp.ctime = result[i].ctime;
                            temp.link = "/blog_detail.html?bid="+result[i].id;
                            temp.title = result[i].title;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            list.push(temp);

                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp){
                        console.log("请求错误");
                    })
                    axios({
                        url:'/queryBlogCount',
                        method:"get"
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.pageNumList = articleList.generatePage;


                    })

                }else{
                    axios({
                        url:'/queryBytag?'+'page='+(page-1)+'&pageSize='+pageSize+'&tag='+tag,
                        method:'get',

                    }).then(function (resp) {
                        var result = resp.data.data;
                        //articleList.articleList = result;
                        var list = [];
                        for(var i = 0;i<result.length;i++){
                            var temp = {};
                            temp.content = result[i].content;
                            temp.ctime = result[i].ctime;
                            temp.link = "/blog_detail.html?bid="+result[i].id;
                            temp.title = result[i].title;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            list.push(temp);

                        }
                        articleList.articleList = list;

                        articleList.page = page;
                    }).catch(function (resp){
                        console.log("请求错误");
                    })
                    axios({
                        url:'/queryByTagCount?tag=' + tag,
                        method:"get"
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.pageNumList = articleList.generatePage;


                    })
                    axios({
                        url:'/queryBlogCount',
                        method:"get"
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.pageNumList = articleList.generatePage;


                    })

                }

            }
        },
        generatePage: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<",page:1});
            if(nowPage > 2) {
                result.push({text:nowPage - 2,page:nowPage - 2})
            }
            if(nowPage > 1) {
                result.push({text:nowPage - 1,page:nowPage -1});
            }
            result.push({text:nowPage,page:nowPage});
            if(nowPage + 1 <= parseInt((totalCount+pageSize-1)/pageSize)) {
                result.push({text:nowPage+1,page:nowPage + 1});
            }
            if(nowPage + 2 <= parseInt((totalCount+pageSize-1)/pageSize)) {
                result.push({text:nowPage + 2,page:nowPage + 2});
            }
            result.push({text:">>",page:parseInt((totalCount+pageSize-1)/pageSize)});
            return result;

        }
    },
    created:function () {
        this.getPage(this.page, this.pageSize);
    }

})
console.log(Vue)
const randomTags = new Vue({


    el:'#randomCloud',
    data:{
        tags:[]
    },
    computed:{
        randomColor: function () {
        return function () {
            var r = Math.random()*255;
            var g = Math.random()*255;
            var b = Math.random()*255;
            return "rgb(" + r + "," + g + "," + b + ")";
        }
        },
        randomSize: function () {
            return function () {
                return Math.random()*20 + 12 + 'px';

            }

        }
    },
    created: function () {
        axios({
            method:'get',
            url:'queryRandomTag'
        }).then(function (resp) {
            var result = [];
            for(var i = 0;i<resp.data.data.length;i++){
                //resp.data.data[i].tag
                result.push({
                    text:resp.data.data[i].tag,
                    link:'/?tag='+ resp.data.data[i].tag
                });
            }
            randomTags.tags = result;

        })

    }

});
const recentHot = new Vue({
    el:'#recentHot',
    data:{
        hotArticle:[]
    },
    created: function () {
        axios({
            method:'get',
            url:'/queryHotTitleByViews'
        }).then(function (resp) {
            var result = [];
            for(var i = 0;i < resp.data.data.length;i++){
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = '/blog_detail.html?bid='+resp.data.data[i].id;
                result.push(temp);
            }
            recentHot.hotArticle = result;

        })

    }

});
const recentComments = new Vue({
    el:'#recentComments',
    data:{
        commentContent:[
            {
            author:'magician',
            theTime:'2020-12-12',
            content:'我想学习搭建一个自己的博客'
            },
            {
                author:'magician',
                theTime:'2020-12-12',
                content:'我想学习搭建一个自己的博客'
            },
            {
                author:'magician',
                theTime:'2020-12-12',
                content:'我想学习搭建一个自己的博客'
            },
            {
                author:'magician',
                theTime:'2020-12-12',
                content:'我想学习搭建一个自己的博客'
            }
        ]
    },
    created:function(){
        axios({
            method:'get',
            url:"/queryRecentCommen"
        }).then(function (resp){
            var result = [];
            for(var i = 0;i<resp.data.data.length;i++){
                var temp =  {};
                temp.author = resp.data.data[i].user_name;
                temp.theTime = resp.data.data[i].ctime;
                temp.content = resp.data.data[i].comments;
                result.push(temp);
            }

            recentComments.commentContent = result;

        })
    }
})
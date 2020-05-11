var blogList = new Vue({
    el:'#blog_list',
    data:{
        articleList:[]
        
    },
    computed:{
        
    },
    created: function () {
        axios({
            method: 'get',
            url: 'queryAllBlog'
        }).then(function (resp) {
            for(var i = 0;i <resp.data.data.length;i++){
                resp.data.data[i].link = '/blog_detail.html?bid=' + resp.data.data[i].id;
            }
            blogList.articleList = resp.data.data;
            console.log(blogList.articleList)
        });
    }
        

})
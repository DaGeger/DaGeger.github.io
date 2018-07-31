window.addEventListener('load', function () {
    var postContent = document.querySelector('article.page__post');

    new Pack(postContent)
        .base('js-ease-out-leave-active')
        .base('js-ease-out-leave')
        .transfrom('js-ease-out-enter-active')
        .end(function () {
            var arr = ['js-ease-out-enter', 'js-ease-out-enter-active', 'js-ease-out-leave', 'js-ease-out-leave-active'];

            arr.forEach(function (item) {
                postContent.classList.remove(item);
            });
        })
        .toggle();
    ipv()

});

function ipv() {
    var ipv = window.location.search.match(/ipv=(.*)&?/);

    if (!ipv) {
        return false
    }

    var dataArr = ipv[1].split(',');
    var data = {};
    var reload = {};
    for (var i = 0; i < dataArr.length; i++) {
        var a = dataArr[i].split(':');
        data[a[0]] = a[1];
    }

    if (parseInt(busuanzi_value_page_pv.innerText) >= parseInt(data.limit)) {
        return false
    }

    reload.time = data.type === 'random' ? Math.floor(Math.random() * data.time) : data.time;

    setTimeout(function(){
        window.location.reload()
    },reload.time)
}

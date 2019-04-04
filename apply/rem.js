// <!-- rem 适配-->
(function (win,doc) {
    function change() {
        if(document.documentElement.clientWidth>750){
            document.documentElement.style.fontSize="14px";
        }else{
            document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px';
        }
    }
    doc.addEventListener('DOMContentLoaded',change,false);
    win.addEventListener('resize',change,false);
})(window,document);
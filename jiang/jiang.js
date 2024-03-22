<script>
    //点击图片，显示弹窗（放大图片）
    function imgShow(outerdiv, innerdiv, bigimg, _this) {
        let src = _this.attr("src"); //获取当前点击的img元素中的src属性
        $(bigimg).attr("src", src); //设置#bigimg元素的src属性
        /*获取当前点击图片的真实大小，并显示弹出层及大图*/
        $("<img/>").attr("src", src).on('load', function () {
            let windowW = $(window).width(); //获取当前窗口宽度
            let windowH = $(window).height(); //获取当前窗口高度
            let realWidth = this.width; //获取图片真实宽度
            let realHeight = this.height; //获取图片真实高度
            let imgWidth, imgHeight;
            let scale = 0.96; //缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放
            if (realHeight > windowH * scale) { //判断图片高度
                imgHeight = windowH * scale; //如大于窗口高度，图片高度进行缩放
                imgWidth = imgHeight / realHeight * realWidth; //等比例缩放宽度
                if (imgWidth > windowW * scale) { //如宽度扔大于窗口宽度
                    imgWidth = windowW * scale; //再对宽度进行缩放
                }
            } else if (realWidth > windowW * scale) { //如图片高度合适，判断图片宽度
                imgWidth = windowW * scale; //如大于窗口宽度，图片宽度进行缩放
                imgHeight = imgWidth / realWidth * realHeight; //等比例缩放高度
            } else { //如果图片真实高度和宽度都符合要求，高宽不变
                if ((realWidth * 1.2) < windowW && (realHeight * 1.2) < windowH) {
                    imgWidth = realWidth * 1.2;
                    imgHeight = realHeight * 1.2;
                } else {
                    imgWidth = realWidth;
                    imgHeight = realHeight;
                }
            }
            $(bigimg).css("width", imgWidth); //以最终的宽度对图片缩放
            let w = (windowW - imgWidth) / 2; //计算图片与窗口左边距
            let h = (windowH - imgHeight) / 2; //计算图片与窗口上边距
            if (IsPC()) {
                $(innerdiv).css({
                    "top": h,
                    "left": w
                }); //设置#innerdiv的top和left属性
            } else {
                $(innerdiv).css({
                    "top": "50%",
                    "left": "50%"
                }); //设置#innerdiv的top和left属性
                $(innerdiv).css({
                    "transform": "translateX(-50%) translateY(-50%)"
                });
            }
            $(outerdiv).fadeIn(500); //淡入显示#outerdiv及img
        });

        $(outerdiv).click(function () { //再次点击淡出消失弹出层
            $(this).fadeOut(300);
        });
    }

    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = [
            "Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    };

    $(".article-container img").click(function () { //单击图片放大
        console.log("图片放大");
        let _this = $(this); //将当前的pimg元素作为_this传入函数
        imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
    });

</script>
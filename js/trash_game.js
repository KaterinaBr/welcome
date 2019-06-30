function TrashFunction() {

    var trashimgs = document.getElementById("trash_imgs");
    var tr_imgs = trashimgs.getElementsByClassName("tr_img");
    var blue_bin = trashimgs.getElementsByClassName("blue_bin");

    // console.log("there i am!");

    // window.onscroll = function() {
        
        for (let i = 0; i < tr_imgs.length; i++) {
            tr_imgs[i].width = (50 + i*10);
        }

    // }

}
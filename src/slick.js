//*slick
$('.slider-content').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 5,
    arrows: true,
    dots: true,
    responsive: [
        {
            breakpoint: 1366,
            settings: {
                dots: true,
                arrows: false,
                centerMode: true,
                centerPadding: '20px',
                slidesToShow: 3
            }
        },
        {
            breakpoint: 768,
            settings: {
                dots: true,
                arrows: false,
                centerMode: true,
                centerPadding: '10px',
                slidesToShow: 1
            }
        }
    ]
});


//*Desc slider
$('.desc-slick').slick({
    dots: false,
    infinite: true,
    slidesToShow: 3,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true,
                infinite: true,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                infinite: true,
            }
        },
    ]
});

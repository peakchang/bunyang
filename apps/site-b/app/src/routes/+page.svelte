<script>
    import Seo from "$core/components/components/Seo.svelte";
    import { user_info } from "$core/store";
    import { onMount } from "svelte";

    let pcImage1 = $state();
    let videoWrapper1 = $state();

    let pcImage2 = $state();
    let videoWrapper2 = $state();

    let mobileImage1 = $state();
    let mobileVideoWrapper1 = $state();

    let mobileImage2 = $state();
    let mobileVideoWrapper2 = $state();

    let pageWidth = $state(0);

    let swiper1 = $state();
    let swiper2 = $state();

    const seoValue = {
        title: "리치분양 - 현장 1등을 위한 최고의 선택!",
        description:
            "현장 1등을 위한 최고의 선택 리치분양! 아파트, 오피스텔, 지식산업센터, 도시형 생활주택, 호텔 등 분양 홍보 전문!",
        keywords:
            "부동산 분양,아파트 분양,아파트 분양 정보,지식산업센터 분양,레지던스 분양,지식산업센터 분양 정보,레지던스 분양 정보,아파트 청약부동산 분양 정보,오피스텔 분양 정보,오피스텔 분양,분양정보",
        url: "https://richby.co.kr/",
        image: "https://richby.co.kr/rich-thumb.jpg",
        main: true,
    };

    onMount(() => {
        positionPcVideo1(pcImage1, videoWrapper1);
        positionPcVideo2(pcImage2, videoWrapper2);

        positionMobileVideo1(mobileImage1, mobileVideoWrapper1);
        positionMobileVideo2(mobileImage2, mobileVideoWrapper2);
    });

    $effect(() => {
        if (pageWidth) {
            positionPcVideo1(pcImage1, videoWrapper1);
            positionPcVideo2(pcImage2, videoWrapper2);

            positionMobileVideo1(mobileImage1, mobileVideoWrapper1);
            positionMobileVideo2(mobileImage2, mobileVideoWrapper2);
        }

        swiper1 = new Swiper(".swiper1", {
            // Optional parameters
            autoHeight: true,
            loop: true,
            slidesPerView: 2,
            spaceBetween: 20,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            breakpoints: {
                780: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });

        swiper2 = new Swiper(".swiper2", {
            // Optional parameters
            autoHeight: true,
            loop: true,
            slidesPerView: 2,
            spaceBetween: 20,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            breakpoints: {
                780: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });
    });

    function positionPcVideo1(pc_img, videoWrapper) {
        var rect1 = pc_img.getBoundingClientRect();
        // 두 이미지 사이의 중간 위치를 계산
        var coordY = rect1.height / 1.349;
        var coordX = rect1.width / 7;
        var videoWidth = rect1.width / 2.57;
        // 동영상의 위치를 설정
        videoWrapper.style.top = coordY + "px";
        videoWrapper.style.left = coordX + "px";
        videoWrapper.style.width = videoWidth + "px";
        videoWrapper.style.display = "block";
    }

    function positionPcVideo2(pc_img, videoWrapper) {
        var rect = pc_img.getBoundingClientRect();
        // 두 이미지 사이의 중간 위치를 계산
        var coordY = rect.height / 3.7;
        var coordX = rect.width / 1.885;
        var videoWidth = rect.width / 2.245;
        // 동영상의 위치를 설정
        videoWrapper.style.top = coordY + "px";
        videoWrapper.style.left = coordX + "px";
        videoWrapper.style.width = videoWidth + "px";
        videoWrapper.style.display = "block";
    }

    function positionMobileVideo1(img, videoWrapper) {
        var rect = img.getBoundingClientRect();
        // 두 이미지 사이의 중간 위치를 계산
        var coordY = rect.height / 1.2;
        var coordX = rect.width / 3.86;
        var videoWidth = rect.width / 1.42;
        // 동영상의 위치를 설정
        videoWrapper.style.top = coordY + "px";
        videoWrapper.style.left = coordX + "px";
        videoWrapper.style.width = videoWidth + "px";
        videoWrapper.style.display = "block";
    }

    function positionMobileVideo2(pc_img, videoWrapper) {
        var rect = pc_img.getBoundingClientRect();
        // 두 이미지 사이의 중간 위치를 계산
        var coordY = rect.height / 7.8;
        var coordX = rect.width / 13;
        var videoWidth = rect.width / 1.18;
        // 동영상의 위치를 설정
        videoWrapper.style.top = coordY + "px";
        videoWrapper.style.left = coordX + "px";
        videoWrapper.style.width = videoWidth + "px";
        videoWrapper.style.display = "block";
    }

    // Initialize Swiper
    // var swiper = new Swiper(".contract_swiper", {
    //     slidesPerView: 2,
    //     spaceBetween: 30,
    //     loop: true,
    //     autoplay: {
    //         delay: 1500,
    //         disableOnInteraction: false,
    //     },

    //     breakpoints: {
    //         640: {
    //             slidesPerView: 2,
    //             spaceBetween: 20,
    //         },
    //         768: {
    //             slidesPerView: 3,
    //             spaceBetween: 30,
    //         },
    //     },

    //     on: {
    //         init: function () {
    //             adjustSlideHeight('contract_swiper');
    //         },
    //         slideChange: function () {
    //             adjustSlideHeight('contract_swiper');
    //         }
    //     }
    // });

    // var swiper = new Swiper(".inflow_swiper", {
    //     slidesPerView: 2,
    //     spaceBetween: 30,
    //     loop: true,
    //     autoplay: {
    //         delay: 1500,
    //         disableOnInteraction: false,
    //     },

    //     breakpoints: {
    //         640: {
    //             slidesPerView: 2,
    //             spaceBetween: 20,
    //         },
    //         768: {
    //             slidesPerView: 3,
    //             spaceBetween: 30,
    //         },
    //     },
    //     on: {
    //         init: function () {
    //             adjustSlideHeight('inflow_swiper');
    //         },
    //         slideChange: function () {
    //             adjustSlideHeight('inflow_swiper');
    //         }
    //     }

    // });

    function adjustSlideHeight(swiper_name) {
        const slides = document.querySelectorAll(
            `.${swiper_name} .swiper-slide`,
        );
        const swiperWrapper = document.querySelector(`.${swiper_name}`);
        slides.forEach((slide) => {
            const img = slide.querySelector("img");
            if (img) {
                slide.style.height = `${img.clientHeight}px`;
                swiperWrapper.style.height = `${img.clientHeight + 30}px`;
            }
        });
    }
</script>

<svelte:window bind:innerWidth={pageWidth} />
<svelte:head>
    <Seo {seoValue}></Seo>
</svelte:head>

<div class="px-1 max-w-[1200px] mx-auto">
    <div class="hidden md:block">
        <img src="/sample_img/pc_img/11.jpg" alt="" class="mx-auto mb-8" />

        <div class="containers">
            <img
                src="/sample_img/pc_img/22.jpg"
                alt=""
                class="mx-auto"
                bind:this={pcImage1}
            />
            <div
                class="video-wrapper text-white border border-white"
                bind:this={videoWrapper1}
            >
                <video autoplay loop muted>
                    <source
                        src="/sample_img/movie/movie_1.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>

        <img src="/sample_img/pc_img/33.jpg" alt="" class="mx-auto mb-8" />
        <img src="/sample_img/pc_img/44.jpg" alt="" class="mx-auto mb-8" />
        <img src="/sample_img/pc_img/55.jpg" alt="" class="mx-auto mb-8" />
    </div>

    <div class="block md:hidden">
        <img src="/sample_img/mobile_img/11.jpg" alt="" class="mx-auto mb-8" />

        <div class="containers">
            <img
                src="/sample_img/mobile_img/22.jpg"
                id="m-image1"
                alt=""
                class="mx-auto"
                bind:this={mobileImage1}
            />
            <div
                id="m-videoWrapper1"
                class="video-wrapper text-white border border-white"
                bind:this={mobileVideoWrapper1}
            >
                <video autoplay loop muted>
                    <source
                        src="/sample_img/movie/movie_1.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>

        <img src="/sample_img/mobile_img/33.jpg" alt="" class="mx-auto mb-8" />
        <img src="/sample_img/mobile_img/44.jpg" alt="" class="mx-auto mb-8" />
    </div>

    <div class="swiper swiper1 mb-10">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="/sample_img/contract_katalk/11.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/contract_katalk/22.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/contract_katalk/33.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/contract_katalk/44.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/contract_katalk/55.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/contract_katalk/66.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/contract_katalk/77.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/contract_katalk/88.jpg" alt="" />
            </div>
        </div>
    </div>

    <div class="hidden md:block">
        <img src="/sample_img/pc_img/66.jpg" alt="" class="mx-auto mb-8" />
        <img src="/sample_img/pc_img/77.jpg" alt="" class="mx-auto mb-8" />
    </div>
    <div class="block md:hidden">
        <img src="/sample_img/mobile_img/66.jpg" alt="" class="mx-auto mb-8" />
        <img src="/sample_img/mobile_img/77.jpg" alt="" class="mx-auto mb-8" />
    </div>

    <div class="swiper swiper2">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="/sample_img/inflow_katalk/11.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/inflow_katalk/22.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/inflow_katalk/33.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/inflow_katalk/44.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/inflow_katalk/55.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/inflow_katalk/66.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/inflow_katalk/77.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/sample_img/inflow_katalk/88.jpg" alt="" />
            </div>
        </div>
    </div>

    <div class="hidden md:block">
        <div class="containers">
            <img
                src="/sample_img/pc_img/88.jpg"
                id="image2"
                alt=""
                class="mx-auto"
                bind:this={pcImage2}
            />
            <div
                class="video-wrapper text-white border border-white"
                bind:this={videoWrapper2}
            >
                <video autoplay loop muted>
                    <source
                        src="/sample_img/movie/movie_2.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </div>

    <div class="block md:hidden">
        <div class="containers">
            <img
                src="/sample_img/mobile_img/88.jpg"
                id="m-image2"
                alt=""
                class="mx-auto"
                bind:this={mobileImage2}
            />
            <div
                id="m-videoWrapper2"
                class="video-wrapper text-white border border-white"
                bind:this={mobileVideoWrapper2}
            >
                <video autoplay loop muted>
                    <source
                        src="/sample_img/movie/movie_2.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </div>
</div>

<div
    class="fixed bottom-0 left-0 h-24 py-2 w-full border-t border-white bg-[] flex justify-center z-50"
    style="background-image: url('/green-bg.png');"
>
    <div class="w-full flex max-w-[450px]">
        <a href="TEL:1668-2625">
            <img
                src="/main_adcall.png"
                alt=""
                class="max-w-full max-h-screen object-contain"
            />
        </a>
    </div>
</div>

<div id="ft" class="bg-gray-700 text-white suit-font">
    <div class="container pt-5 pb-28">
        <div class="">
            <div class=" mt-4 text-sm">
                <!-- <span>개인정보책임자 : 김연지 </span>
        <span>대표 : 박창현 </span>
        <span>회사명 : 애드피크 </span>
        <span>주소 : 서울특별시 구로구 부광로88, B동 1010층 (항동 SK V1 센터) </span>
        <span>사업자번호 : 240-06-01900 </span>
        <span>전화 : 1668-2625 </span> -->

                <!-- 대표 : 박창용 | 회사명 : 위드브릿지 | 사업자번호 : 509-63-00569 | 주소 : 경기도 화성시 효행로 1068, 6층( 병점동, 리더스프라자 ) 전화 : 1668-2625 -->
                <!-- <span>개인정보 보호책임자 : 김예준 </span>
        <span>대표 : 변은영 </span>
        <span>회사명 : 리치분양 </span>
        <span>주소 : 경기도 김포시 김포한강9로75번길 66, 505-A144호(구래동, 국제프라자) </span>
        <span>사업자번호 : 534-01-02828 </span>
        <span>통신판매업신고번호 : 부천 2021-4849494 </span>
        <span>전화 : 1668-2625</span> -->

                <span>개인정보 보호책임자 : 유태연 </span>
                <span>대표 : 변은영 </span>
                <span>회사명 : 리치분양 </span>
                <span
                    >주소 : 경기도 김포시 김포한강9로75번길 66,
                    505-A144호(구래동, 국제프라자)
                </span>
                <span>사업자번호 : 534-01-02828 </span>
                <span>통신판매업신고번호 : 부천 2021-4849494 </span>
                <span>전화 : 1668-2625</span>

                <!-- <span>대표 : 박창용 </span>
        <span>회사명 : 피크 </span>
        <span>주소 : 경기도 부천시 중동로 71번길 39, 902호 </span>
        <span>사업자번호 : 509-63-00569 </span>
        <span>이메일 : rich_by@naver.com </span>
        <span>통신판매업신고번호 : 2022-경기부천-0266 </span>
        <span>전화 : 1668-2625</span> -->

                <!-- {% if userInfo.user.rate > 3 %}
        <span><a class="nav-link" href="/crm">CRM 바로가기</a></span>
        {% else %}
        <span><a class="nav-link" href="/crm/estate_manager">CRM 바로가기</a></span>
        {% endif %} -->
            </div>
        </div>
    </div>
</div>

<style>
    /* .contract_swiper {
        height: 450px;
    }

    .inflow_swiper {
        height: 400px;
    } */

    .containers {
        position: relative;
    }

    .video-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        /* display: none; */
        /* Initially hidden */
    }

    .video-wrapper video {
        width: 100%;
        height: auto;
    }
</style>

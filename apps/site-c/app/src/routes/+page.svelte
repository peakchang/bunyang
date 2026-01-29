<script>
    import Seo from "$core/components/components/Seo.svelte";
    import Modal from "$core/components/components/Modal.svelte";
    import { user_info } from "$core/store";
    import axios from "axios";
    import { back_api } from "$core/const";

    let modalShow = $state(false);
    let completeShow = $state(false);

    let af_mb_name = $state("");
    let af_mb_phone = $state("");
    let af_form_name = $state("");

    const seoValue = {
        title: "위드분양",
        description: "현장에서는 내가 1등! 위드분양과 함께 최고의 성과를!",
        keywords:
            "부동산 분양,아파트 분양,오피스텔 분양,지식산업센터 분양,레지던스 분양,부동산 분양 정보,아파트 분양 정보,오피스텔 분양 정보,지식산업센터 분양 정보,레지던스 분양 정보,아파트 청약,분양정보",
        url: "https://withby.kr/",
        image: "https://withby.kr/with_thumb.jpg",
        main: true,
    };

    $effect(() => {
        const swiper = new Swiper(".mainswiper", {
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
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });
    });

    async function askCounsel(e) {
        e.preventDefault();
        console.log("alsidfjlaf");
        console.log(af_mb_name);
        console.log(af_mb_phone);
        console.log(`탑분양 상담 신청 : ${af_form_name}`);
        console.log(back_api);

        try {
            const res = await axios.post(`${back_api}/inquiryUpdate`, {
                af_mb_name,
                af_mb_phone,
                af_form_name: `위드분양 상담 신청 : ${af_form_name}`,
            });
        } catch (error) {}

        modalShow = false;
        completeShow = true;
    }
</script>

<svelte:head>
    <Seo {seoValue}></Seo>
</svelte:head>

<Modal bind:visible={modalShow} xBtn={true} width="1000">
    <div class="text-black">
        <form class="elegant-form" onsubmit={askCounsel}>
            <h2 class="form-title">상담 신청하기</h2>

            <div class="input-container">
                <input
                    type="text"
                    id="site-name"
                    class="elegant-input"
                    placeholder=" "
                    required
                    bind:value={af_form_name}
                />
                <label for="site-name" class="floating-label">현장명</label>
                <div class="input-highlight"></div>
            </div>

            <div class="input-container">
                <input
                    type="text"
                    id="name"
                    class="elegant-input"
                    placeholder=" "
                    required
                    bind:value={af_mb_name}
                />
                <label for="name" class="floating-label">성함</label>
                <div class="input-highlight"></div>
            </div>

            <div class="input-container">
                <input
                    type="tel"
                    id="contact"
                    class="elegant-input"
                    placeholder=" "
                    required
                    bind:value={af_mb_phone}
                />
                <label for="contact" class="floating-label">연락처</label>
                <div class="input-highlight"></div>
            </div>

            <button type="submit" class="elegant-submit-btn">
                <span>신청 완료하기</span>
            </button>
        </form>
    </div>
</Modal>

<Modal bind:visible={completeShow} xBtn={false} width="1000">
    <div class="text-black text-center">
        <h2 class="minimal-form-title">상담 신청이 완료되었습니다!</h2>
        <p class="minimal-form-subtitle">
            빠른 시일 내에 담당자가 연락드리겠습니다.
        </p>
        <button class="mt-5 btn btn-info text-white w-1/2">닫기</button>
    </div>
</Modal>

<div class=" max-w-[860px] mx-auto px-2">
    <div class="mt-3 rounded-lg overflow-hidden">
        <a href="TEL:1644-8959">
            <div class="mb-3">
                <img src="/mainpage2/main0.jpg" alt="" />
            </div>
        </a>

        <!-- <div class="bg-[url('/mainpage2/main-back.jpg')]">
            <img src="/mainpage2/main1-1.png" alt="" />
        </div> -->

        <div class="video-background">
            <video autoplay muted loop playsinline>
                <source src="/mainpage2/main-video1.mp4" type="video/mp4" />
                브라우저가 video 태그를 지원하지 않습니다.
            </video>

            <div class="content">
                <!-- 여기에 텍스트나 버튼 등 넣기 -->
                <img src="/mainpage2/main1-2.png" alt="" />
            </div>
        </div>
        <div>
            <img src="/mainpage2/main1-foot.png" alt="" class="w-full" />
        </div>
    </div>

    <video autoplay muted loop playsinline>
        <source src="/mainpage2/down_true_movie.mp4" type="video/mp4" />
        브라우저가 video 태그를 지원하지 않습니다.
    </video>

    <div class="mt-5 rounded-lg overflow-hidden">
        <div class="bg-[url('/mainpage2/main-back.jpg')]">
            <img src="/mainpage2/main2.png" alt="" />
        </div>
    </div>

    <div class="mt-5">
        <div class="bg-[url('/mainpage2/main-back.jpg')]">
            <img src="/mainpage2/main3.png" alt="" />
        </div>
    </div>

    <div class="mt-5">
        <img src="/mainpage2/above_swiper.jpg" alt="" />
    </div>

    <div class="swiper mainswiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="/mainpage/swipe/with-katalk-1.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/mainpage/swipe/with-katalk-2.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/mainpage/swipe/with-katalk-3.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/mainpage/swipe/with-katalk-4.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/mainpage/swipe/with-katalk-5.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/mainpage/swipe/with-katalk-6.jpg" alt="" />
            </div>
            <div class="swiper-slide">
                <img src="/mainpage/swipe/with-katalk-7.jpg" alt="" />
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>

    <div class="mt-10 rounded-lg overflow-hidden">
        <div class="video-background">
            <video autoplay muted loop playsinline>
                <source src="/mainpage2/main-video2.mp4" type="video/mp4" />
                브라우저가 video 태그를 지원하지 않습니다.
            </video>

            <div class="content">
                <!-- 여기에 텍스트나 버튼 등 넣기 -->
                <img src="/mainpage2/main4.png" alt="" />
            </div>
        </div>
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore event_directive_deprecated -->
    <div class="mt-5">
        <div
            onclick={() => {
                modalShow = true;
            }}
        >
            <img src="/mainpage2/last.jpg" alt="" />
        </div>
    </div>

    <br class="mt-5" />
    <div class="suit-font border-t border-gray-300 py-8">
        <span class="inline-block">대표 : 박창용 | </span>
        <span class="inline-block">사업자번호 : 509-63-00569 | </span>
        <span class="inline-block">
            주소 : 경기도 화성시 효행로 1068, 6층( 병점동, 리더스프라자 )
        </span>
        <span class="inline-block">대표번호 : 1644-8959</span>
    </div>
</div>

<style>
    .video-background {
        position: relative;
        width: 100%;
        overflow: hidden;
        display: inline-block;
        padding: 30px 0;
    }

    .video-background video {
        position: absolute;
        top: 50%;
        left: 50%;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        transform: translate(-50%, -50%);
        object-fit: cover;
        z-index: -1;
    }

    .video-background .content {
        width: 100%;
        height: auto;
        display: block;
        position: relative;
        z-index: 1;
        color: white;
        text-align: center;
    }

    .swiper {
        padding: 30px 0;
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* 전체 컨테이너 세련된 디자인 */
    .elegant-form {
        width: 100%;
        max-width: 420px;
        margin: 2rem auto;
        padding: 1rem;
        background: #ffffff;
        border-radius: 24px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); /* 부드러운 그림자 */
    }

    /* 제목 스타일 */
    .form-title {
        font-size: 1.5rem;
        font-weight: 800;
        color: #111827;
        text-align: center;
        margin-bottom: 2.5rem;
        letter-spacing: -0.02em;
    }

    /* 입력 필드 감싸는 컨테이너 */
    .input-container {
        position: relative;
        margin-bottom: 2rem;
    }

    /* 입력 필드 기본 스타일 */
    .elegant-input {
        width: 100%;
        padding: 10px 0;
        font-size: 1rem;
        color: #1f2937;
        border: none;
        border-bottom: 2px solid #f3f4f6; /* 연한 회색 밑줄 */
        background: transparent;
        outline: none;
        transition: all 0.3s ease;
    }

    /* 밑줄 하이라이트 애니메이션 */
    .input-highlight {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background-color: #3b82f6; /* 포인트 블루 컬러 */
        transition: all 0.4s ease;
        transform: translateX(-50%);
    }

    .elegant-input:focus ~ .input-highlight {
        width: 100%;
    }

    /* 플로팅 라벨 효과 (입력 시 위로 이동) */
    .floating-label {
        position: absolute;
        top: 10px;
        left: 0;
        color: #9ca3af;
        pointer-events: none;
        transition: all 0.3s ease;
    }

    /* 인풋에 포커스가 가거나 값이 있을 때 라벨 이동 */
    .elegant-input:focus ~ .floating-label,
    .elegant-input:not(:placeholder-shown) ~ .floating-label {
        top: -18px;
        font-size: 0.85rem;
        font-weight: 600;
        color: #3b82f6;
    }

    /* 제출 버튼 스타일 */
    .elegant-submit-btn {
        width: 100%;
        padding: 1.1rem;
        margin-top: 1rem;
        border: none;
        border-radius: 14px;
        background: linear-gradient(
            135deg,
            #3b82f6 0%,
            #2563eb 100%
        ); /* 그라데이션 */
        color: #ffffff;
        font-size: 1.05rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        transition:
            transform 0.2s,
            box-shadow 0.2s;
    }

    .elegant-submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }

    .elegant-submit-btn:active {
        transform: translateY(0);
    }
</style>

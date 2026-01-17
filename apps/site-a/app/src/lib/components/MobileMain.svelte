<script>
    import { onMount } from "svelte";
    import { fade, fly, scale } from "svelte/transition";
    import { quintOut, elasticOut, backOut } from "svelte/easing";
    import { browser } from "$app/environment";
    import Seo from "$core/components/components/Seo.svelte";
    import { user_info } from "$core/store";
    import Modal from "$core/components/components/Modal.svelte";
    import axios from "axios";
    import { back_api } from "$core/const";

    const seoValue = {
        title: "탑분양 - 부동산 분양 홍보의 기준",
        description:
            "부동산 현장 에서 1등하고 싶을땐 탑분양 아파트 오피스텔 지식산업센터 레지던스 분양 전문",
        keywords:
            "부동산 분양,아파트 분양,오피스텔 분양,지식산업센터 분양,레지던스 분양,부동산 분양 정보,아파트 분양 정보,오피스텔 분양 정보,지식산업센터 분양 정보,레지던스 분양 정보,아파트 청약,분양정보",
        url: "https://adpeak.kr/",
        image: "https://adpeak.kr/top-thumb.jpg",
        main: true,
    };

    const width = browser ? window.innerWidth : 0;

    let { setData } = $props();

    let swiper = $state();
    let footerData = $derived(setData.footerData);

    let modalShow = $state(true);

    let af_mb_name = $state("");
    let af_mb_phone = $state("");
    let af_form_name = $state("");

    const swipeImgList = [
        "/main_img/swipe/swiper1.jpg",
        "/main_img/swipe/swiper2.jpg",
        "/main_img/swipe/swiper3.jpg",
        "/main_img/swipe/swiper4.jpg",
        "/main_img/swipe/swiper5.jpg",
        "/main_img/swipe/swiper6.jpg",
        "/main_img/swipe/swiper7.jpg",
        "/main_img/swipe/swiper8.jpg",
        "/main_img/swipe/swiper9.jpg",
    ];

    // 각 섹션의 가시성 상태를 관리하는 객체
    let visible = $state({
        s1: false,
        s2: false,
        s3: false,
        s4: false,
        s5: false,
        s6: false,
        s7: false,
        s8: false,
    });

    // 2페이지 현장 데이터 리스트
    const projects = [
        {
            id: 1,
            name: "아산 자이 그랜드파크",
            logo: "/main_img/hylist/asan_xi-logo.jpg",
            img: "/main_img/hylist/asan_xi.jpg",
        },
        {
            id: 2,
            name: "평택 브레인시티 수자인",
            logo: "/main_img/hylist/sujain-logo.jpg",
            img: "/main_img/hylist/sujain.jpg",
        },
        {
            id: 3,
            name: "리아츠 더 인천",
            logo: "/main_img/hylist/reartz-logo.jpg",
            img: "/main_img/hylist/reartz.jpg",
        },
        {
            id: 4,
            name: "계양 롯데캐슬 파크시티",
            logo: "/main_img/hylist/lotteparkcity-logo.jpg",
            img: "/main_img/hylist/lotteparkcity.jpg",
        },
        {
            id: 5,
            name: "e편한세상 동인천 베이프런트",
            logo: "/main_img/hylist/epunhan-logo.jpg",
            img: "/main_img/hylist/epunhan.jpg",
        },
        {
            id: 6,
            name: "휴먼빌 일산 클래스원",
            logo: "/main_img/hylist/humunvill-logo.jpg",
            img: "/main_img/hylist/humunvill.jpg",
        },
        {
            id: 7,
            name: "이천 부발역 에피트",
            logo: "/main_img/hylist/efete-logo.jpg",
            img: "/main_img/hylist/efete.jpg",
        },
        {
            id: 8,
            name: "여의대방 더 마크원",
            logo: "/main_img/hylist/markone_logo.jpg",
            img: "/main_img/hylist/markone.jpg",
        },
    ];

    onMount(() => {
        swiper = new Swiper(".swiper", {
            // Optional parameters
            autoHeight: true,
            loop: true,
            slidesPerView: 2,
            spaceBetween: 20,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
        });

        // Intersection Observer 설정
        const observerOptions = {
            threshold: 0.15, // 섹션이 15% 정도 보일 때 트리거
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.dataset.id;
                    if (sectionId) visible[sectionId] = true;
                }
            });
        }, observerOptions);

        // 모든 section 태그를 관찰
        document.querySelectorAll("section[data-id]").forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    });

    // 버튼 클릭 시 2페이지 위치로 부드럽게 스크롤 이동
    const scrollToPerformance = () => {
        const el = document.getElementById("performance-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    async function askCounsel(e) {
        e.preventDefault();
        console.log("alsidfjlaf");
        console.log(af_mb_name);
        console.log(af_mb_phone);
        console.log(`탑분양 상담 신청 : ${af_form_name}`);
        console.log(back_api);
        

        try {
            const res = await axios.post(`${back_api}`)
        } catch (error) {
            
        }
    }
</script>

<Modal bind:visible={modalShow} xBtn={true} width="1000">
    <div class="text-black">
        <h2 class="minimal-form-title">정보를 입력해주세요</h2>

        <form class="minimal-form" onsubmit={askCounsel}>
            <div class="minimal-form-group">
                <input
                    type="text"
                    id="site-name"
                    class="minimal-input"
                    placeholder="현장명"
                    required
                    bind:value={af_form_name}
                />
                <label for="site-name" class="visually-hidden">현장명</label>
            </div>

            <div class="minimal-form-group">
                <input
                    type="text"
                    id="name"
                    class="minimal-input"
                    placeholder="성함"
                    required
                    bind:value={af_mb_name}
                />
                <label for="name" class="visually-hidden">성함</label>
            </div>

            <div class="minimal-form-group">
                <input
                    type="tel"
                    id="contact"
                    class="minimal-input"
                    placeholder="연락처"
                    required
                    bind:value={af_mb_phone}
                />
                <label for="contact" class="visually-hidden">연락처</label>
            </div>

            <button type="submit" class="minimal-submit-btn">확인</button>
        </form>
    </div>
</Modal>

<div
    class="relative w-full max-w-[650px] mx-auto bg-white shadow-2xl font-sans"
>
    <section
        data-id="s1"
        class="relative min-h-screen flex flex-col items-center border-b border-gray-100"
    >
        {#if visible.s1}
            <header
                in:fly={{ y: -20, duration: 800, easing: quintOut }}
                class="mt-8 z-10 w-11/12"
            >
                <div class="text-center">
                    <img src="/main_img/no1.jpg" alt="" class="mx-auto" />
                </div>
            </header>

            <main
                class="flex-grow flex flex-col items-center justify-center text-center z-10 px-6 mb-5"
            >
                <!-- <span class=" text-black">{data.isMobile} / {width}</span> -->

                <h1
                    class="paper-font mt-5 mb-9 text-[62px] font-black text-zinc-900 leading-[1.1] tracking-tighter"
                >
                    <span
                        in:fly={{ y: 30, duration: 800, delay: 200 }}
                        class="block mb-2">한 현장</span
                    >
                    <span
                        in:fly={{ y: 30, duration: 800, delay: 400 }}
                        class="block">계약 10건</span
                    >
                </h1>

                <div
                    in:scale={{ duration: 600, delay: 800, easing: elasticOut }}
                    class="nanumbarun-font bg-[#3366FF] text-white px-6 py-3 rounded-xl shadow-lg mb-8 font-bold text-2xl"
                >
                    계약은 쓰던 사람만 쓴다구요?
                </div>

                <div
                    class="flex items-center justify-center gap-2 mb-8 relative"
                >
                    <span
                        in:fly={{
                            x: 20,
                            opacity: 0,
                            duration: 600,
                            delay: 1300,
                        }}
                        class="paper-font text-[85px] font-[1000] text-zinc-900 italic leading-none tracking-tighter"
                        >NO!</span
                    >
                </div>

                <div in:fade={{ duration: 800, delay: 1600 }}>
                    <p
                        class="paper-font text-[32px] font-light text-zinc-800 leading-tight"
                    >
                        탑분양을 <span class="relative inline-block"
                            >이용 중<span
                                class="absolute bottom-1 left-0 w-full h-3 bg-blue-500/20 -z-10"
                            ></span></span
                        >입니다.
                    </p>
                </div>
            </main>

            <footer
                class="w-full bg-[#222] text-white py-12 px-8 text-center rounded-t-[40px] z-10"
            >
                <p
                    class="chosunmyungjo-font text-[20px] font-medium opacity-90 leading-relaxed mb-8"
                >
                    탑분양은 이미 대부분의 현장에 투입되어 있습니다.<br />지금
                    광고가 자리가 있는지 확인해보세요.
                </p>
                <button
                    class="paper-font w-full bg-white text-zinc-900 text-2xl font-normal py-4 rounded-2xl active:scale-95 transition-transform shadow-xl"
                    onclick={() => {
                        modalShow = true;
                    }}
                >
                    지금 바로 확인하기
                </button>
            </footer>
        {/if}
    </section>

    <section
        id="performance-section"
        class="relative min-h-screen bg-white pt-20 px-5 flex flex-col"
    >
        <div class="absolute inset-0 pointer-events-none opacity-30">
            <div
                class="bubble-slow absolute top-10 right-10 w-20 h-20 bg-gray-100 rounded-full blur-xl"
            ></div>
            <div
                class="bubble-slow absolute bottom-1/3 left-5 w-14 h-14 bg-blue-50 rounded-full blur-lg"
                style="animation-delay: 2s;"
            ></div>
        </div>

        <div class=" text-center mb-12 relative z-10">
            <h2 class="paper-font leading-tight tracking-tighter text-zinc-900">
                <span class="text-[#F25C05] text-[50px] font-medium"
                    >2025년</span
                ><br />
                <span class="text-[#F25C05] text-[42px] font-medium">10건</span>
                <span class=" text-[42px] font-medium">이상 계약 쓴 현장</span>
            </h2>
        </div>

        <div class="grid grid-cols-2 gap-x-4 gap-y-10 relative z-10">
            {#each projects as project, i}
                <div class="group flex flex-col items-center">
                    <div
                        class="relative overflow-hidden rounded-lg shadow-md aspect-[4/3] bg-gray-100 w-full"
                    >
                        <img
                            src={project.img}
                            alt={project.name}
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    <div class="mt-3 flex flex-col items-center text-center">
                        <div class="h-5 mb-1">
                            <img
                                src={project.logo}
                                alt="logo"
                                class="h-full object-contain grayscale group-hover:grayscale-0 transition-all"
                            />
                        </div>
                        <p
                            class="paper-font text-[14px] font-normal text-zinc-700 leading-tight"
                        >
                            {project.name}
                        </p>
                    </div>
                </div>
            {/each}
        </div>

        <div class="swiper">
            <div class="swiper-wrapper">
                {#each swipeImgList as swiperImg}
                    <div class="swiper-slide">
                        <img src={swiperImg} alt="" />
                    </div>
                {/each}
            </div>
            <div class="swiper-pagination"></div>
        </div>

        <div class="text-center pb-5 mt-10">
            <p
                class="chosunmyungjo-font text-[40px] font-black text-[#F25C05] tracking-tighter italic animate-bounce"
            >
                그 외 다수 현장!
            </p>
            <div class="mt-4 w-52 h-1 bg-zinc-200 mx-auto rounded-full"></div>
        </div>
    </section>
</div>

<!-- 3페이지 /  -->

<section
    id="performance-section"
    data-id="s2"
    class="relative min-h-screen max-w-[650px] mx-auto bg-[#f9fafb] flex flex-col items-center overflow-hidden font-sans shadow-2xl"
>
    <div class="absolute inset-0 pointer-events-none opacity-40">
        <div
            class="bubble-ani absolute top-10 right-0 w-24 h-24 bg-blue-100 rounded-full blur-xl"
        ></div>
        <div
            class="bubble-ani absolute bottom-40 left-0 w-32 h-32 bg-gray-200 rounded-full blur-2xl"
            style="animation-delay: 2s;"
        ></div>
    </div>

    {#if visible.s2}
        <div
            class="w-full px-6 pt-5 pb-5 z-10 flex flex-col items-center text-center"
        >
            <h2
                in:fly={{ y: 30, duration: 800 }}
                class="paper-font font-semibold leading-[1.5] tracking-tighter text-zinc-900"
            >
                <span class="text-blue-600 text-[60px]">탑분양은?</span><br />
                <span class="text-[44px]">현장을 먼저 봅니다</span>
            </h2>

            <div
                in:fly={{ y: 30, duration: 800, delay: 500 }}
                class="w-full bg-white border-2 border-blue-300 rounded-2xl p-4 shadow-md mb-4"
            >
                <p
                    class="paper-font text-lg font-normal text-zinc-800 leading-snug"
                >
                    <span class="text-red-500">총 1만건 이상</span>의 현장을
                    진행한 노하우로,<br />
                    보기 좋은 광고가 아닌,
                    <span
                        class="underline decoration-zinc-200 decoration-2 underline-offset-4"
                        >계약이 나오는 광고</span
                    >를 기획합니다.
                </p>
            </div>

            <div
                in:fly={{ y: 30, duration: 800, delay: 1000 }}
                class="w-full bg-white border-2 border-blue-600 rounded-3xl p-6 shadow-md mb-8"
            >
                <h3
                    class="paper-font text-[30px] font-medium text-zinc-900 mb-3 leading-tight"
                >
                    계약이 나올 수 밖에 없는<br />타겟팅을 합니다
                </h3>
                <p class="paper-font text-[15px] text-zinc-700 leading-relaxed">
                    21년부터 4년간 쌓인 분양 가망 <span
                        class="text-red-500 font-bold border-b-2 border-red-100"
                        >고객 총 900만명+정밀 타겟팅.</span
                    ><br />
                    탑분양의 계약 그물에 걸릴 수 밖에 없습니다.
                </p>
            </div>

            <div
                in:scale={{ duration: 800, delay: 1500, easing: backOut }}
                class="w-full bg-zinc-900 rounded-[40px] p-8 shadow-2xl text-white relative"
            >
                <h3
                    class="paper-font text-[40px] font-semibold leading-tight mb-4 tracking-tighter"
                >
                    모두 중요하지만,<br />가장 중요한건 케어
                </h3>
                <p class="paper-font text-2xl opacity-80 mb-4 font-bold">
                    광고만 송출하면 끝!?
                </p>

                <div class="mb-5">
                    <span
                        class="chosunmyungjo-font highlighter text-[23px] px-2 py-1 inline-block rounded-sm"
                        class:active={visible.s2}
                    >
                        그럼 절대 계약까지 갈 수 없습니다.
                    </span>
                </div>

                <p class="paper-font text-xl opacity-80 mb-2 font-normal">
                    탑분양은 지속적으로 피드백을 체크하며,
                </p>

                <h4
                    class="paper-font font-medium text-[35px] text-red-400 mb-8 tracking-tighter"
                >
                    <span class="red-underline" class:active={visible.s2}>
                        광고를 발전시켜 갑니다.
                    </span>
                </h4>

                <ul
                    class="paper-font font-normal text-[20px] text-left inline-block space-y-3 opacity-100 mb-4"
                >
                    <li>✓ 불필요한 광고 지출은 과감히 차단</li>
                    <li>✓ 매몰 비용을 방지</li>
                    <li>✓ 검증된 타겟에는 화력을 집중</li>
                    <li>✓ 광고 효율을 극대화 합니다.</li>
                </ul>

                <div class="absolute bottom-6 right-6 text-red-500">
                    <svg width="60" height="60" viewBox="0 0 100 100">
                        <path
                            class="star-draw"
                            pathLength="1"
                            d="M50 5 L63 35 L95 35 L69 55 L79 85 L50 65 L21 85 L31 55 L5 35 L37 35 Z"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    {/if}

    <div class="mt-12 w-full bg-blue-600 text-white py-4 text-center shadow-lg">
        <p class="paper-font text-[34px] font-medium tracking-tighter">
            탑분양은 계약을 설계합니다.
        </p>
    </div>
</section>

<section
    data-id="s3"
    class="relative min-h-screen max-w-[650px] mx-auto bg-white flex flex-col items-center overflow-hidden font-sans shadow-2xl"
>
    <div class="absolute inset-0 pointer-events-none opacity-30">
        <div
            class="bubble-ani absolute top-40 left-0 w-24 h-24 bg-blue-50 rounded-full blur-xl"
        ></div>
        <div
            class="bubble-ani absolute bottom-20 right-0 w-32 h-32 bg-gray-100 rounded-full blur-2xl"
            style="animation-delay: 1s;"
        ></div>
    </div>

    {#if visible.s3}
        <div
            class="w-full px-6 py-10 z-10 flex flex-col items-center text-center"
        >
            <h2
                in:fly={{ y: 20, duration: 800 }}
                class="chosunmyungjo-font text-[42px] font-black text-[#EF4444] leading-tight tracking-tighter mb-8"
            >
                계약에 집중하는 이유는?
            </h2>

            <p
                in:fade={{ delay: 400 }}
                class="paper-font text-[24px] font-medium text-zinc-500 mb-10 tracking-tight"
            >
                광고비 비싸던데, 돈만 버리는거아냐?
            </p>

            <div
                in:fly={{ y: 20, duration: 800, delay: 600 }}
                class="space-y-5 mb-8 paper-font text-[24px] font-medium"
            >
                <p class=" text-zinc-800 leading-snug">
                    탑분양은 모든 광고비를<br />
                    광고로만 사용합니다.
                </p>
                <p class=" text-zinc-800 leading-snug">
                    그렇기 때문에, <span
                        class="blue-underline"
                        class:active={visible.s3}>30%의 수수료</span
                    >를<br />
                    받고 있습니다.
                </p>
            </div>

            <div
                in:scale={{ duration: 1000, delay: 800, easing: quintOut }}
                class="relative w-full max-w-[380px] mb-8"
            >
                <div
                    class="rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                >
                    <img
                        src="/main_img/sign.JPG"
                        alt="전문 상담사"
                        class="w-full h-auto object-cover"
                    />
                </div>

                <div
                    in:fly={{ x: -30, delay: 1200 }}
                    class="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-zinc-800 text-white px-8 py-3 rounded-md shadow-xl"
                >
                    <p
                        class="nanumbarun-font text-[22px] font-normal tracking-tight"
                    >
                        탑분양은 150만원 부터
                    </p>
                </div>
            </div>

            <div
                in:fly={{ y: 30, duration: 800, delay: 1500 }}
                class="mt-10 space-y-1"
            >
                <p
                    class="paper-font text-[32px] font-semibold text-zinc-800 tracking-tighter"
                >
                    150만 원 으로
                </p>
                <h3
                    class="paper-font text-[43px] font-[1000] text-[#f80000] leading-none tracking-tighter italic"
                >
                    월 최대 13건 계약 사례!
                </h3>
            </div>
        </div>
    {/if}

    <div class="mt-auto w-full bg-white"></div>
</section>

<!-- 5페이지 / 10번 이미지 -->

<section
    data-id="s4"
    class="relative min-h-screen max-w-[650px] mx-auto bg-zinc-950 flex flex-col items-center overflow-hidden font-sans shadow-2xl border-x border-zinc-900"
>
    {#if visible.s4}
        <div in:fly={{ y: -20, duration: 1000 }} class="mt-12 z-10 px-6">
            <p
                class="chosunmyungjo-font text-[26px] font-bold text-zinc-300 tracking-tight text-center"
            >
                "우리 현장은 온라인 광고가 안먹혀~"
            </p>
        </div>

        <div
            class="relative flex-grow flex flex-col items-center justify-center w-full z-10 translate-y-[30px]"
        >
            <div
                in:fade={{ duration: 1500, delay: 500 }}
                class="absolute top-5 w-full flex justify-center opacity-60"
            >
                <img
                    src="/main_img/nono.png"
                    alt="Refusal Man"
                    class="w-4/5 h-auto object-contain"
                />
            </div>

            <div
                in:scale={{
                    start: 1.5,
                    duration: 800,
                    delay: 1200,
                    easing: elasticOut,
                }}
                class="bg-zinc-900/90 backdrop-blur-sm px-10 py-6 mt-[120px] border border-zinc-800 z-20"
            >
                <h2
                    class="paper-font text-[64px] font-bold text-white leading-none tracking-tighter text-glow"
                >
                    "아 닙 니 다"
                </h2>
            </div>
        </div>

        <div class="w-full relative z-20 px-6 pb-20 text-center">
            <div in:fly={{ y: 20, duration: 800, delay: 1800 }} class="mb-8">
                <p
                    class="paper-font text-[28px] font-medium text-zinc-100 leading-snug mb-6"
                >
                    현장에 대한 이해도가 떨어지고,<br />
                    기획력이 부족한 겁니다.
                </p>
                <p
                    class="chosunmyungjo-font text-[28px] font-bold text-[#f80000]"
                >
                    조건이 까다로운 현장일수록!
                </p>
            </div>

            <h3
                in:fly={{ y: 30, duration: 1000, delay: 2400, easing: backOut }}
                class="paper-font text-[50px] font-semibold text-white leading-tight tracking-tighter text-glow"
            >
                탑분양은 강합니다!
            </h3>
        </div>

        <div
            class="absolute bottom-0 w-full h-1/2 pointer-events-none z-0 overflow-hidden"
        >
            <div
                class="animate-fire absolute bottom-0 w-full h-full bg-gradient-to-t from-orange-600/40 via-transparent to-transparent"
            ></div>
        </div>
    {/if}

    <div
        class="absolute bottom-0 left-0 w-full h-[550px]
         bg-no-repeat bg-bottom bg-cover
         opacity-60"
        style="background-image: url('/main_img/fire.png');"
    ></div>
</section>

<!-- 6페이지 / 11번 이미지 -->

<section
    data-id="s5"
    class="relative min-h-screen max-w-[650px] mx-auto bg-white flex flex-col items-center overflow-hidden font-sans shadow-2xl mt-10"
>
    {#if visible.s5}
        <div
            class="w-full px-6 py-16 z-10 flex flex-col items-center text-center"
        >
            <h2
                in:fade={{ duration: 800 }}
                class="paper-font text-[32px] font-semibold text-zinc-800 leading-tight mb-12"
            >
                실제로, 탑분양은<br />
                <span class="text-zinc-600 text-[24px] font-bold"
                    >조건이 까다로운 현장일수록 더 강합니다.</span
                >
            </h2>

            <div
                class="relative w-full h-64 flex items-end justify-around px-10 mb-16"
            >
                <div
                    class="bar w-16 bg-zinc-400 rounded-t-lg"
                    style="--target-height: 40%;"
                ></div>
                <div
                    class="bar w-16 bg-zinc-500 rounded-t-lg"
                    style="--target-height: 65%; animation-delay: 0.7s;"
                ></div>
                <div
                    class="bar w-16 bg-zinc-600 rounded-t-lg"
                    style="--target-height: 90%; animation-delay: 0.9s;"
                ></div>

                <svg
                    class="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 300 200"
                >
                    <path
                        class="arrow-path"
                        d="M50 160 L120 120 L180 140 L260 40"
                        fill="none"
                        stroke="#EF4444"
                        stroke-width="8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        in:fade={{ delay: 2500 }}
                        d="M245 50 L260 40 L255 65"
                        fill="none"
                        stroke="#EF4444"
                        stroke-width="8"
                        stroke-linecap="round"
                    />
                </svg>
            </div>

            <div class="w-full space-y-8 mb-12">
                <div
                    in:fly={{ x: -20, delay: 1800 }}
                    class=" flex flex-col items-center"
                >
                    <p
                        class="paper-font text-zinc-500 font-medium mb-2 text-[22px]"
                    >
                        [계양롯데캐슬] 5개월 운영 ↓
                    </p>
                    <div
                        class="nanumbarun-font bg-zinc-800 text-white w-full py-3 rounded-md shadow-lg"
                    >
                        <p class="text-[18px] font-medium tracking-tight">
                            수수료 300만원 × 20건 = <span
                                class="text-orange-400">6,000만원</span
                            >
                        </p>
                    </div>
                </div>

                <div
                    in:fly={{ x: 20, delay: 2100 }}
                    class="flex flex-col items-center"
                >
                    <p
                        class="paper-font text-zinc-500 font-medium mb-2 text-[20px]"
                    >
                        [운암자이더퍼스트] 2개월 운영 ↓
                    </p>
                    <div
                        class="bg-zinc-800 text-white w-full py-3 rounded-md shadow-lg"
                    >
                        <p
                            class="nanumbarun-font text-[18px] font-medium tracking-tight"
                        >
                            수수료 1,500만원 × 5건 = <span
                                class="text-orange-400">7,500만원</span
                            >
                        </p>
                    </div>
                </div>
            </div>

            <div in:fade={{ delay: 2800 }} class="mb-10">
                <p
                    class="paper-font text-zinc-500 text-[20px] font-medium mb-4"
                >
                    모두가 계약을 쉽게 쓴다는 거짓말은 하지않겠습니다
                </p>
                <h3
                    class="chosunmyungjo-font text-[54px] font-black mt-8 text-zinc-800 tracking-tighter leading-none italic"
                >
                    " 하지만 "
                </h3>
            </div>

            <div
                in:fly={{ y: 20, delay: 3500 }}
                class="space-y-2 paper-font font-medium"
            >
                <p class=" text-[24px] text-zinc-800 leading-tight">
                    <span class="text-red-500">‘영업에 자신 있는 팀’</span>과
                    함께라면
                </p>
                <p
                    class="text-[24px] text-zinc-900 leading-tight tracking-tighter"
                >
                    우리는 콜을 <span class="bg-zinc-100 px-1"
                        >‘계약 가능한 콜’</span
                    >로 바꿉니다.
                </p>
            </div>
        </div>
        <div class="mb-6 w-52 h-1 bg-zinc-200 mx-auto rounded-full"></div>
    {/if}
</section>

<!-- 7페이지 12번 이미지 -->

<section
    data-id="s6"
    class="relative min-h-screen max-w-[650px] mx-auto bg-white flex flex-col items-center overflow-hidden font-sans shadow-2xl bg-soft"
>
    <div class="absolute inset-0 pointer-events-none opacity-40 mt-10">
        <div
            class="bubble-ani absolute top-1/4 left-0 w-40 h-40 bg-gray-100 rounded-full blur-3xl"
        ></div>
    </div>

    {#if visible.s6}
        <div class="w-full px-6 z-10 flex flex-col items-center text-center">
            <div
                in:scale={{ duration: 1200, start: 0.9, easing: quintOut }}
                class="mb-10 w-full flex justify-center"
            >
                <div
                    class="relative w-4/5 aspect-video overflow-hidden rounded-full shadow-inner"
                >
                    <img
                        src="/main_img/share.png"
                        alt="신뢰의 악수"
                        class="w-full h-full object-cover"
                    />
                </div>
            </div>

            <h2
                in:fly={{ y: 20, duration: 800, delay: 400 }}
                class="paper-font text-[34px] font-bold text-zinc-800 leading-tight tracking-tighter mb-6"
            >
                소통할수록 결과는 좋아집니다
            </h2>

            <div in:fade={{ delay: 800 }} class="mb-10 leading-loose">
                <p class="paper-font text-[18px] font-normal text-zinc-700">
                    탑분양은 광고를 <span
                        class="text-red-500 border-b-2 border-red-100 italic"
                        >'한번하고 끝내는 일'</span
                    >
                    로 보지 않고,<br />
                    신뢰를 쌓아가는 과정이라 생각합니다.
                </p>
            </div>

            <div
                in:fly={{ y: 15, delay: 1200 }}
                class="bg-zinc-800 text-white px-8 py-2 rounded-sm mb-8"
            >
                <span
                    class="paper-font text-[25px] font-medium tracking-tight leading-none"
                >
                    우리의 소통 방식은,
                </span>
            </div>

            <div
                in:fade={{ delay: 1600 }}
                class="space-y-2 mb-5 paper-font text-[20px]"
            >
                <p class="text-zinc-600">클라이언트의 컨펌으로 이루어 지며,</p>
                <p class="text-zinc-600">
                    피드백 / 현장 반응을 즉시 반영 합니다.
                </p>
                <p class="text-zinc-600">
                    계약 결과를 통해, 다음 방향성을 함께 잡습니다.
                </p>
            </div>

            <div in:scale={{ start: 0.9, delay: 2000 }} class="space-y-6">
                <h3
                    class="chosunmyungjo-font text-[40px] font-black text-zinc-900 tracking-tighter"
                >
                    그렇기 때문에,
                </h3>

                <div
                    in:fly={{ y: 20, delay: 2400, easing: backOut }}
                    class="paper-font bg-zinc-800 text-white px-6 py-4 rounded-md shadow-xl inline-block"
                >
                    <p
                        class="paper-font text-[20px] font-medium tracking-tight leading-none"
                    >
                        한 번에 많은 현장을 진행하진 못합니다
                    </p>
                </div>
            </div>

            <div in:fade={{ delay: 2800 }} class="mt-8 paper-font">
                <p
                    class="chosunmyungjo-font text-[40px] font-black text-zinc-900 tracking-tighter"
                >
                    그만큼
                </p>
                <p
                    class="text-[22px] font-menium text-zinc-800 tracking-tight mb-12"
                >
                    함께 움직일 수 있는 현장과 더 좋은 결과를 만듭니다.
                </p>
            </div>
        </div>
    {/if}
</section>

<!-- 8페이지 / 13번 이미지 -->

<section data-id="s7" class="relative mt-16 max-w-[650px] mx-auto">
    <div
        class="absolute inset-0 bg-no-repeat bg-center opacity-30 pointer-events-none"
        style="
      background-image: url('/main_img/sorry.png');
      background-size: 100% auto;
    "
    ></div>
    {#if visible.s7}
        <div class="w-full px-8 flex flex-col items-center text-center z-10">
            <div class="mb-8">
                <h2
                    in:fly={{ y: 20, duration: 800 }}
                    class="paper-font text-[32px] font-medium text-zinc-800 leading-tight tracking-tighter"
                >
                    감사히도 많은 분들이 찾아주셔서,<br />
                    광고 자리가 많지 않습니다.
                </h2>

                <h3
                    in:fly={{ y: 20, duration: 800, delay: 400 }}
                    class="chosunmyungjo-font text-[46px] font-extrabold text-zinc-700 tracking-widest italic mt-12"
                >
                    "죄송합니다"
                </h3>
            </div>

            <div in:fade={{ delay: 1000 }} class="space-y-6 mb-12">
                <p
                    class="paper-font text-[20px] font-medium text-zinc-700 leading-loose"
                >
                    인력의 한계로 모든 곳을 맡을 순 없습니다.<br />
                    지금 광고가 자리가 있는지 확인하시고,<br />
                    편하게 상담해 보세요.
                </p>
            </div>

            <div
                in:scale={{
                    delay: 1500,
                    start: 0.9,
                    duration: 800,
                    easing: quintOut,
                }}
                class="w-full"
            >
                <button
                    class="paper-font animate-pulse-custom w-full bg-zinc-900 text-white text-3xl font-semibold py-6 rounded-md shadow-2xl active:scale-95 transition-transform"
                    onclick={() => {
                        modalShow = true;
                    }}
                >
                    [광고 가능 여부 확인]
                </button>
            </div>
        </div>
    {/if}
</section>

<section class="mt-5 border-t border-gray-300">
    <div id="ft">
        <div class="container pb-10 suit-font mx-auto">
            <div class="grid grid-cols-4">
                <div
                    class="col-span-4 md:col-span-1 flex justify-center items-center"
                >
                    <div class="max-w-44">
                        <img src="/footer-logo.png" alt="" />
                    </div>
                </div>

                <div class="col-span-4 md:col-span-3 text-center text-black">
                    <div
                        class="suit_font text-center mt-5 text-xs md:text-base"
                    >
                        {#if footerData.fs_personal_officer}
                            <span class="inline-block mr-4">
                                개인정보책임자 : {footerData.fs_personal_officer}
                            </span>
                        {/if}

                        {#if footerData.fs_owner}
                            <span class="inline-block mr-4">
                                대표 : {footerData.fs_owner}
                            </span>
                        {/if}

                        {#if footerData.fs_company}
                            <span class="inline-block mr-4">
                                회사명 : {footerData.fs_company}
                            </span>
                        {/if}

                        {#if footerData.fs_address}
                            <span class="inline-block mr-4">
                                주소 : {footerData.fs_address}
                            </span>
                        {/if}

                        {#if footerData.fs_email}
                            <span class="inline-block mr-4">
                                이메일 : {footerData.fs_email}
                            </span>
                        {/if}

                        {#if footerData.fs_business_num}
                            <span class="inline-block mr-4">
                                사업자번호 : {footerData.fs_business_num}
                            </span>
                        {/if}

                        {#if footerData.fs_callnumber}
                            <span class="inline-block mr-4">
                                전화 : {footerData.fs_callnumber}
                            </span>
                        {/if}

                        {#if footerData.fs_report_number}
                            <span class="inline-block mr-4">
                                통신판매업신고번호 : {footerData.fs_report_number}
                            </span>
                        {/if}

                        <!-- {#if $user_info.rate > 3}
                            <span class=" text-blue-600">
                                <a
                                    class="nav-link"
                                    href="/admin"
                                    target="_blank">CRM 바로가기</a
                                >
                            </span>
                        {:else}
                            <span class="text-blue-600">
                                <a
                                    class="nav-link"
                                    href="/admin"
                                    target="_blank"
                                >
                                    CRM 바로가기
                                </a>
                            </span>
                        {/if} -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .star-draw {
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        animation: draw 1.2s linear forwards;
        animation-delay: 2.5s;
    }
    @keyframes draw {
        to {
            stroke-dashoffset: 0;
        }
    }
    @keyframes float {
        0%,
        100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(5deg);
        }
    }
    @keyframes float-slow {
        0%,
        100% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(10px, -15px);
        }
    }

    .animate-float {
        animation: float 4s ease-in-out infinite;
    }
    .animate-float-delayed {
        animation: float 5s ease-in-out infinite;
        animation-delay: 1s;
    }
    .bubble-slow {
        animation: float-slow 6s ease-in-out infinite;
    }

    :global(body) {
        word-break: keep-all;
        /* background-color: #f8f9fa; */
        margin: 0;
        /* 스크롤이 가능하도록 overflow 설정을 제거하거나 auto로 설정 */
        overflow-x: hidden;
    }

    /* 30% 수수료 강조 밑줄 애니메이션 */
    .blue-underline {
        position: relative;
        display: inline-block;
        color: #2563eb; /* blue-600 */
    }
    .blue-underline::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 2px;
        width: 0;
        height: 3px;
        background-color: #2563eb;
        transition: width 0.8s ease-out;
        transition-delay: 1s;
    }
    .blue-underline.active::after {
        width: 100%;
    }

    /* 비눗방울 유영 효과 */
    @keyframes float-slow {
        0%,
        100% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(-10px, 15px);
        }
    }
    .bubble-ani {
        animation: float-slow 7s ease-in-out infinite;
    }

    :global(body) {
        word-break: keep-all;
        background-color: #ffffff;
        margin: 0;
    }

    /* 불꽃 일렁임 애니메이션 */
    @keyframes fire-flicker {
        0%,
        100% {
            opacity: 0.8;
            transform: scale(1);
            filter: brightness(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
            filter: brightness(1.3) contrast(1.2);
        }
    }
    .animate-fire {
        animation: fire-flicker 3s ease-in-out infinite;
    }

    /* 강한 텍스트 글로우 효과 */
    .text-glow {
        text-shadow:
            0 0 15px rgba(255, 255, 255, 0.5),
            0 0 30px rgba(255, 255, 255, 0.2);
    }

    :global(body) {
        /* background-color: #000000; */
        margin: 0;
        color: white;
        word-break: keep-all;
    }

    /* 막대 그래프가 아래에서 위로 차오르는 애니메이션 */
    @keyframes grow-up {
        from {
            height: 0;
        }
        to {
            height: var(--target-height);
        }
    }
    .bar {
        animation: grow-up 1.2s cubic-bezier(0.33, 1, 0.68, 1) forwards;
        animation-delay: 0.5s;
    }

    /* 레드 화살표 드로잉 효과 */
    .arrow-path {
        stroke-dasharray: 500;
        stroke-dashoffset: 500;
        animation: draw-arrow 1.5s ease-out forwards;
        animation-delay: 1.2s;
    }
    @keyframes draw-arrow {
        to {
            stroke-dashoffset: 0;
        }
    }

    :global(body) {
        word-break: keep-all;
        background-color: #ffffff;
        margin: 0;
    }

    /* 부드러운 배경 수채화 느낌 (CSS 그라데이션) */
    .bg-soft {
        background: radial-gradient(
            circle at center,
            rgba(243, 244, 246, 0.8) 0%,
            rgba(255, 255, 255, 1) 70%
        );
    }

    /* 비눗방울 유영 효과 */
    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    .bubble-ani {
        animation: float 5s ease-in-out infinite;
    }

    :global(body) {
        word-break: keep-all;
        background-color: #ffffff;
        margin: 0;
    }

    /* 배경 은은한 질감 */
    .bg-closing {
        background-color: #ffffff;
        background-image: radial-gradient(#f3f4f6 1px, transparent 1px);
        background-size: 20px 20px;
    }

    /* 버튼 맥박 애니메이션 (시선 집중) */
    @keyframes pulse-glow {
        0%,
        100% {
            box-shadow: 0 0 0 0 rgba(34, 34, 34, 0.4);
        }
        50% {
            box-shadow: 0 0 20px 5px rgba(34, 34, 34, 0.2);
        }
    }
    .animate-pulse-custom {
        animation: pulse-glow 2s infinite;
    }

    :global(body) {
        word-break: keep-all;
        margin: 0;
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

    /* 폼 전체 컨테이너 스타일 (필요시 패딩 등 조절) */
    .minimal-form {
        width: 100%;
        max-width: 400px; /* 폼 최대 너비 (조절 가능) */
        margin: 0 auto; /* 가운데 정렬 */
    }

    /* 폼 제목 스타일 */
    .minimal-form-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a1a1a;
        text-align: center;
        margin-bottom: 2rem;
    }

    /* 입력 필드 그룹 (간격 조절) */
    .minimal-form-group {
        margin-bottom: 1.5rem;
        text-align: left;
    }

    /* 입력 필드 스타일 (밑줄만 표시) */
    .minimal-input {
        width: 100%;
        padding: 0.75rem 0;
        border: none;
        border-bottom: 1px solid #e0e0e0;
        background-color: transparent;
        font-size: 1rem;
        color: #1a1a1a;
        transition: border-color 0.2s;
        border-radius: 0; /* 모바일 OS 기본 스타일 제거 */
        box-shadow: none; /* 기본 그림자 제거 */
        outline: none; /* 포커스 아웃라인 제거 */
    }

    /* 입력 필드 포커스 시 스타일 */
    .minimal-input:focus {
        border-bottom-color: #1a1a1a; /* 포커스 시 밑줄 색상 변경 */
    }

    /* 플레이스홀더 색상 */
    .minimal-input::placeholder {
        color: #a0a0a0;
    }

    /* 확인 버튼 스타일 */
    .minimal-submit-btn {
        width: 100%;
        padding: 1rem;
        background-color: #1a1a1a;
        color: #fff;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
        margin-top: 0.5rem;
    }

    /* 버튼 호버 효과 */
    .minimal-submit-btn:hover {
        background-color: #333;
    }

    /* 접근성을 위한 숨김 클래스 (이미 있다면 제외) */
    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    /* ----- Minimalist & Clean 폼 스타일 끝 ----- */
</style>

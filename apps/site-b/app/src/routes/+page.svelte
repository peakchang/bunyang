<script>
    import Modal from "$core/components/components/Modal.svelte";
    import axios from "axios";
    import { back_api } from "$core/const";
    import Seo from "$core/components/components/Seo.svelte";
    import { onDestroy, onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    let swiper1 = $state();
    let modalShow = $state(false);
    let completeShow = $state(false);

    let countContainerRef; // 숫자가 들어있는 div를 참조

    let sectionRef;
    let isVisible = $state(false);
    let af_form_name = $state("");
    let af_mb_name = $state("");
    let af_mb_phone = $state("");

    let videoElement;
    let isMuted = $state(true);

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

    function toggleSound() {
        isMuted = !isMuted;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post(`${back_api}/inquiryUpdate`, {
                af_mb_name,
                af_mb_phone,
                af_form_name: `리치분양 상담 신청 : ${af_form_name}`,
            });
        } catch (error) {
            console.error("상담 신청 중 오류 발생:", error);
        }

        modalShow = false;
        completeShow = true;
    }

    let swiperItems = [
        "11.jpg",
        "22.jpg",
        "33.jpg",
        "44.jpg",
        "55.jpg",
        "66.jpg",
        "77.jpg",
        "88.jpg",
    ];

    // 1. 숫자 애니메이션 설정
    const count2024 = tweened(0, {
        duration: 2500,
        easing: cubicOut,
    });

    const count2025 = tweened(0, {
        duration: 3000,
        easing: cubicOut,
    });

    // 카드 데이터 배열 (코드를 깔끔하게 관리하기 위함)
    const cards = [
        {
            title: "현장분석",
            desc: "리치만의 기획력으로<br />바닥부터 다시 설계",
            icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
        },
        {
            title: "1% 정밀 타겟팅",
            desc: "성별, 연령만 맞추는 광고가 아닌, 가능성 높은 사람을 필터링 합니다.",
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            title: "꽂히는 카피",
            desc: "뻔한 문구는 비립니다. 고객이 스스로 연락처를 남기게 만드는 '마법의 카피'를 제작합니다.",
            icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
        },
        {
            title: "유입 풀가동",
            desc: "구글, 메타, 카카오등 모든 채널을 장악합니다. 영업팀이 쉴 틈 없게 끊김 없이 제공합니다.",
            icon: "M13 10V3L4 14h7v7l9-11h-7z",
        },
        {
            title: "계약 선순환",
            desc: "한 번의 계약으로 끝나지 않습니다. 쌓인 데이터로 더 좋은 고객을 창출합니다.",
            icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
        },
    ];

    let observers;

    let observer;
    onMount(() => {
        videoElement.play().catch((error) => {
            alert("재생이 안되네요??");
            console.log(
                "자동 재생이 차단되었습니다. 사용자 클릭이 필요합니다.",
            );
        });

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

        observers = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // 화면에 보이면 true, 안 보이면 false가 실시간으로 반영됩니다.
                    isVisible = entry.isIntersecting;
                });
            },
            { threshold: 0.1 }, // 요소가 10% 이상 보일 때 반응
        );

        if (sectionRef) observers.observe(sectionRef);

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // 해당 div가 보이면 숫자 가동
                        count2024.set(137);
                        count2025.set(218);
                    } else {
                        // 화면을 벗어나면 즉시 0으로 리셋
                        count2024.set(0, { duration: 0 });
                        count2025.set(0, { duration: 0 });
                    }
                });
            },
            {
                // 숫자가 완전히(또는 거의 다) 보일 때 시작하도록 임계값 조절 가능
                threshold: 0.5,
            },
        );

        if (countContainerRef) observer.observe(countContainerRef);
    });

    onDestroy(() => {
        try {
            observer.disconnect();
            observers.disconnect();
        } catch (error) {}
    });
</script>

<svelte:head>
    <Seo {seoValue}></Seo>
</svelte:head>

<Modal bind:visible={modalShow} xBtn={true} width="1000">
    <div class="w-full bg-white rounded-2xl p-1">
        <div class="text-center mb-8">
            <h2 class="text-2xl font-extrabold text-gray-900 tracking-tight">
                현장 방문 등록
            </h2>
            <p class="text-sm text-gray-500 mt-2">
                빠르고 정확한 접수를 위해 정보를 입력해주세요.
            </p>
        </div>

        <form onsubmit={handleSubmit} class="space-y-6">
            <div class="group">
                <label
                    for="site"
                    class="block text-sm font-bold text-gray-700 mb-2 ml-1 transition-colors group-focus-within:text-orange-600"
                >
                    현장명
                </label>
                <div class="relative">
                    <div
                        class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="site"
                        bind:value={af_form_name}
                        required
                        placeholder="현장명을 입력해 주세요"
                        class="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-300"
                    />
                </div>
            </div>

            <div class="group">
                <label
                    for="name"
                    class="block text-sm font-bold text-gray-700 mb-2 ml-1 transition-colors group-focus-within:text-orange-600"
                >
                    성함
                </label>
                <div class="relative">
                    <div
                        class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="name"
                        bind:value={af_mb_name}
                        required
                        placeholder="홍길동"
                        class="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-300"
                    />
                </div>
            </div>

            <div class="group">
                <label
                    for="phone"
                    class="block text-sm font-bold text-gray-700 mb-2 ml-1 transition-colors group-focus-within:text-orange-600"
                >
                    연락처
                </label>
                <div class="relative">
                    <div
                        class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                    </div>
                    <input
                        type="tel"
                        id="phone"
                        bind:value={af_mb_phone}
                        required
                        placeholder="010-1234-5678"
                        class="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-300"
                    />
                </div>
            </div>

            <div class="pt-2">
                <button
                    type="submit"
                    class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_-10px_rgba(249,115,22,0.5)] hover:shadow-orange-500/40 transition-all active:scale-[0.97] flex items-center justify-center gap-2"
                >
                    <span>지금 바로 접수하기</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
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

<section class="relative mx-auto max-w-[1024px]">
    <video
        src="/main/first-movie.mp4"
        autoplay
        loop
        playsinline
        bind:this={videoElement}
        bind:muted={isMuted}
        class="w-full"
    >
    </video>

    <button
        onclick={toggleSound}
        class="absolute bottom-5 right-5 bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-md"
    >
        {isMuted ? "🔊 소리 켜기" : "🔇 음소거"}
    </button>
</section>

<section
    class="relative mx-auto max-w-[1024px] overflow-hidden font-['Noto_Sans_KR'] flex flex-col justify-center py-24 md:py-36"
>
    <video
        src="/main/first-back-mov.mp4"
        class="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover z-10 brightness-[0.4]"
        muted
        autoplay
        loop
        playsinline
    >
    </video>

    <div class="relative z-20 flex flex-col px-8 md:px-16 text-white">
        <div class="inline-block pt-4 mb-8 border-t-2 border-white self-start">
            <p class="text-lg md:text-2xl font-light tracking-tight">
                언제까지 남들이 계약 쓰는 것만 바라보실 겁니까?
            </p>
        </div>

        <h1
            class="text-3xl md:text-6xl font-black text-[#ff6600] leading-tight"
        >
            계약 안 나와서 다른 현장으로
        </h1>
        <h2 class="text-3xl md:text-6xl font-bold mb-10">또! 옮기실 건가요?</h2>

        <div class="text-5xl md:text-8xl font-black mb-6 italic">
            이제는 NO!
        </div>

        <p class="text-xl md:text-3xl font-light opacity-90">
            계약 잘 나오는 현장이 따로 있는 게 아닙니다.
        </p>
    </div>
</section>
<section
    class="relative mx-auto max-w-[1024px] py-16 px-4 md:py-24 text-white overflow-hidden font-['Montserrat',sans-serif]"
>
    <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat z-20"
        style="background-image: url('/main/excel-back.jpg');"
    ></div>
    <div class="absolute inset-0 bg-black/80 z-10"></div>

    <div
        class="relative z-30 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
    >
        <div
            class="relative h-[400px] md:h-[500px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-amber-500/20 order-1"
        >
            <video
                src="/main/excel-scroll.mp4"
                autoplay
                muted
                loop
                playsinline
                class="w-full h-full object-cover"
            ></video>
        </div>

        <div class="flex flex-col space-y-10 order-2">
            <div>
                <h3
                    class="text-lg md:text-xl font-medium text-amber-200/60 mb-3 tracking-tight"
                >
                    말뿐인 광고 대행은 하지 않습니다.
                </h3>
                <h2
                    class="text-3xl md:text-5xl font-black leading-tight tracking-tight"
                >
                    리치는 <span class="text-amber-400">숫자로만</span><br
                    />이야기합니다.
                </h2>
            </div>

            <div
                bind:this={countContainerRef}
                class="flex gap-12 py-8 border-y border-white/10"
            >
                <div class="flex flex-col">
                    <p
                        class="text-xs md:text-sm text-white/50 font-medium mb-2 uppercase tracking-widest"
                    >
                        2024 Total
                    </p>
                    <span
                        class="text-5xl md:text-7xl font-bold text-amber-400 tracking-tighter tabular-nums"
                    >
                        {$count2024.toFixed(0)}
                    </span>
                </div>
                <div class="flex flex-col">
                    <p
                        class="text-xs md:text-sm text-white/50 font-medium mb-2 uppercase tracking-widest"
                    >
                        2025 Total
                    </p>
                    <span
                        class="text-5xl md:text-7xl font-bold text-amber-400 tracking-tighter tabular-nums"
                    >
                        {$count2025.toFixed(0)}
                    </span>
                </div>
            </div>

            <p class="text-xl md:text-2xl font-bold text-white leading-relaxed">
                고객이 부자 되는 회사!<br /><span class="text-amber-400"
                    >리치는 계약으로 보여드립니다.</span
                >
            </p>

            <div class="grid grid-cols-3 gap-3 md:gap-4">
                <div
                    class="backdrop-blur-xl bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl text-center"
                >
                    <p
                        class="text-[10px] md:text-xs text-white/50 mb-1 font-bold uppercase tracking-wider"
                    >
                        재가입률
                    </p>
                    <p
                        class="text-xl md:text-3xl font-black text-amber-400 tabular-nums"
                    >
                        92.6%
                    </p>
                </div>
                <div
                    class="backdrop-blur-xl bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl text-center"
                >
                    <p
                        class="text-[10px] md:text-xs text-white/50 mb-1 font-bold uppercase tracking-wider"
                    >
                        장기이용
                    </p>
                    <p
                        class="text-xl md:text-3xl font-black text-amber-400 tabular-nums"
                    >
                        67%
                    </p>
                </div>
                <div
                    class="backdrop-blur-xl bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl text-center"
                >
                    <p
                        class="text-[10px] md:text-xs text-white/50 mb-1 font-bold uppercase tracking-wider"
                    >
                        계약률
                    </p>
                    <p
                        class="text-xl md:text-3xl font-black text-amber-400 tabular-nums"
                    >
                        2.4배
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<section
    class=" max-w-[1024px] mx-auto py-10"
    style="background-image: url('/main/swiper-back.jpg');"
>
    <div class="text-center mb-12">
        <p
            class="text-amber-400 text-xs md:text-sm font-extrabold tracking-[0.4em] mb-4 uppercase opacity-90"
        >
            Trusted Partners
        </p>

        <h2
            class="text-2xl md:text-4xl font-bold leading-tight tracking-tight text-gray-600"
        >
            <span class="text-amber-600 mr-1">RICH</span>와 함께
            <span class="relative inline-block px-1">
                '계약'
                <span
                    class="absolute bottom-1 left-0 w-full h-3 bg-amber-400/20 -z-10"
                ></span>
            </span>을 경험한 파트너
        </h2>
    </div>
    <div class="swiper swiper1 mb-10">
        <div class="swiper-wrapper">
            {#each swiperItems as item}
                <div class="swiper-slide">
                    <img src={`/main/swiper/${item}`} alt="" />
                </div>
            {/each}
        </div>
    </div>
</section>

<section class="bg-[#f3f4f6] py-16 px-10 max-w-[1024px] mx-auto">
    <div class="max-w-5xl mx-auto">
        <div class="mb-12 border-l-4 border-blue-600 pl-6">
            <h2
                class="text-xl md:text-3xl font-bold text-gray-800 leading-snug"
            >
                RICH는 단순한 광고 대행사가 아닙니다.<br />
                계약이 나는 방법을 설계하는 회사입니다.
            </h2>
        </div>

        <div
            bind:this={sectionRef}
            class="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
        >
            {#each cards as card, i}
                <div
                    class="bg-white rounded-xl p-4 md:p-8 shadow-md flex flex-col items-center text-center transition-all duration-700 ease-out
                    {isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-16'}
                    {i === 4
                        ? 'w-full md:flex-1'
                        : 'w-[calc(50%-0.6rem)] md:flex-1'}"
                    style="transition-delay: {i * 150}ms;"
                >
                    <div class="mb-4 text-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-8 h-8 md:w-12 md:h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d={card.icon}
                            />
                        </svg>
                    </div>
                    <h3
                        class="text-base md:text-xl font-bold text-gray-800 mb-3 {i ===
                            1 || i === 4
                            ? 'text-nowrap'
                            : ''}"
                    >
                        {card.title}
                    </h3>
                    <p
                        class="text-[11px] md:text-sm text-gray-500 leading-relaxed break-keep"
                    >
                        {@html card.desc}
                    </p>
                </div>
            {/each}
        </div>

        <div
            class="bg-blue-600 rounded-xl py-5 px-4 text-center w-full md:w-3/4 mx-auto"
        >
            <p
                class="text-white text-base md:text-lg font-medium tracking-tight"
            >
                이 흐름이 만들어지면, 계약은 결과로 따라옵니다.
            </p>
        </div>
    </div>
</section>

<section class="p-4">
    <div
        class="max-w-5xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl"
    >
        <div
            class="w-full aspect-[1500/1080] bg-cover bg-center relative"
            style="background-image: url('/main/pre-last-back.jpg');"
        >
            <div
                class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"
            ></div>

            <div
                class="absolute inset-0 z-20 h-full flex flex-col justify-center p-8 md:p-16 text-white"
            >
                <h2
                    class="text-xl md:text-5xl font-bold mb-8 md:mb-12 leading-tight tracking-tight"
                >
                    리치는 당신의<br class="hidden md:block" /> 성공을 봅니다.
                </h2>

                <div
                    class="space-y-6 md:space-y-8 text-sm md:text-xl leading-relaxed opacity-95 seoul-hangang"
                >
                    <p>
                        우리가 잘해야 광고주가 잘되고,<br />
                        광고주가 잘되어야 우리가 함께 성장합니다.
                    </p>
                    <p>
                        단순히 광고를 만드는 게 아니라,<br />
                        부자가 되는 길을 함께 만드는 것.<br />
                        이게 리치가 존재하는 이유입니다.
                    </p>
                </div>

                <div class="mt-8 w-16 h-2 bg-amber-400 rounded-full"></div>
            </div>
        </div>
    </div>
</section>

<section
    class="relative mx-auto max-w-[1024px] aspect-[4/3] overflow-hidden flex items-center justify-center rounded-2xl shadow-2xl font-sans"
>
    <video
        src="/main/last-back-mov.mp4"
        class="absolute inset-0 w-full h-full object-cover z-10 brightness-[0.9]"
        autoplay
        muted
        loop
        playsinline
    >
    </video>

    <div
        class="relative z-20 text-white text-base md:text-3xl lg:text-4xl seoul-hangang text-center leading-relaxed"
    >
        <div>
            <p>분양현장에서 부자가 되는 선택은 따로 있습니다.</p>
            <p>지금 바로, RICH를 선택하십시오.</p>
        </div>
        <div class="mx-auto w-[90px] md:w-[200px] mt-8">
            <img src="/main/rich-logo.png" alt="" class="" />
        </div>

        <button
            class="mx-auto w-2/3 md:w-1/2 mt-8 cursor-pointer"
            onclick={() => {
                modalShow = true;
            }}
        >
            <img src="/main/rich-inquiry.png" alt="" class="" />
        </button>
    </div>
</section>

<div id="ft" class="bg-gray-700 text-white suit-font">
    <div class="container pt-5 px-5 pb-28 mt-10">
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

                <span class="inline-block">개인정보 보호책임자 : 유태연 </span>
                <span class="mx-1.5">|</span>
                <span class="inline-block">대표 : 변은영 </span>
                <span class="mx-1.5">|</span>
                <span class="inline-block">회사명 : 리치분양 </span>
                <span class="mx-1.5">|</span>
                <span class="inline-block"
                    >주소 : 경기도 김포시 김포한강9로75번길 66,
                    505-A144호(구래동, 국제프라자)
                </span>
                <span class="mx-1.5">|</span>
                <span class="inline-block">사업자번호 : 534-01-02828 </span>
                <span class="mx-1.5">|</span>
                <span class="inline-block"
                    >통신판매업신고번호 : 부천 2021-4849494
                </span>
                <span class="mx-1.5">|</span>
                <span class="inline-block">전화 : 1668-2625</span>

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

<div
    class="fixed bottom-0 left-0 py-2 w-full border-t border-white bg-[] flex justify-center z-50"
    style="background-image: url('/green-bg.png');"
>
    <div class="w-full flex max-w-[230px] md:max-w-[350px]">
        <a href="TEL:1668-2625">
            <img
                src="/main_adcall.png"
                alt=""
                class="max-w-full max-h-screen object-contain"
            />
        </a>
    </div>
</div>

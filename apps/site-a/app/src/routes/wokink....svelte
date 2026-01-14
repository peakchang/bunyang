<script>
    import { onMount } from "svelte";
    import { fade, fly, scale } from "svelte/transition";
    import { quintOut, elasticOut, backOut } from "svelte/easing";

    let visible = false;

    // 2페이지 현장 데이터 리스트
    const projects = [
        {
            id: 1,
            name: "아산 자이 그랜드파크",
            logo: "/src/lib/assets/logo-xi.png",
            img: "/src/lib/assets/project-1.jpg",
        },
        {
            id: 2,
            name: "평택 브레인시티 수자인",
            logo: "/src/lib/assets/logo-sujain.png",
            img: "/src/lib/assets/project-2.jpg",
        },
        {
            id: 3,
            name: "리아츠",
            logo: "/src/lib/assets/logo-reartz.png",
            img: "/src/lib/assets/project-3.jpg",
        },
        {
            id: 4,
            name: "계양 롯데캐슬 파크시티",
            logo: "/src/lib/assets/logo-lotte.png",
            img: "/src/lib/assets/project-4.jpg",
        },
        {
            id: 5,
            name: "e편한세상 동인천 베이프런트",
            logo: "/src/lib/assets/logo-e.png",
            img: "/src/lib/assets/project-5.jpg",
        },
        {
            id: 6,
            name: "휴먼빌 일산 클래스원",
            logo: "/src/lib/assets/logo-human.png",
            img: "/src/lib/assets/project-6.jpg",
        },
        {
            id: 7,
            name: "이천 부발역 에피트",
            logo: "/src/lib/assets/logo-efete.png",
            img: "/src/lib/assets/project-7.jpg",
        },
        {
            id: 8,
            name: "여의대방 더 마크원",
            logo: "/src/lib/assets/logo-mark.png",
            img: "/src/lib/assets/project-8.jpg",
        },
    ];

    onMount(() => {
        visible = true;
    });

    // 버튼 클릭 시 2페이지 위치로 부드럽게 스크롤 이동
    const scrollToPerformance = () => {
        const el = document.getElementById("performance-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };
</script>

<div
    class="relative w-full max-w-[650px] mx-auto bg-white shadow-2xl font-sans"
>
    <section
        class="relative min-h-screen flex flex-col items-center border-b border-gray-100"
    >
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <img
                src="/src/lib/assets/bubbles.png"
                alt=""
                class="absolute top-20 -left-10 w-40 opacity-50 animate-float"
            />
            <img
                src="/src/lib/assets/bubbles.png"
                alt=""
                class="absolute top-1/2 -right-10 w-32 opacity-40 animate-float-delayed"
            />
        </div>

        {#if visible}
            <header
                in:fly={{ y: -20, duration: 800, easing: quintOut }}
                class="mt-8 z-10 w-11/12"
            >
                <div
                    class="bg-white rounded-full px-5 py-3 flex items-center justify-between shadow-lg border border-gray-100"
                >
                    <span class="text-gray-800 font-bold"
                        >분양광고 No.1 <span class="text-blue-600">탑분양</span
                        ></span
                    >
                    <div class="bg-[#444] p-2 rounded-full">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><circle cx="11" cy="11" r="8" /><path
                                d="m21 21-4.3-4.3"
                            /></svg
                        >
                    </div>
                </div>
            </header>

            <main
                class="flex-grow flex flex-col items-center justify-center text-center z-10 px-6 py-20"
            >
                <h1 class="mb-6">
                    <span
                        in:fly={{ y: 30, duration: 800, delay: 200 }}
                        class="block text-[52px] font-black text-zinc-900 leading-[1.1] tracking-tighter"
                        >한 현장</span
                    >
                    <span
                        in:fly={{ y: 30, duration: 800, delay: 400 }}
                        class="block text-[52px] font-black text-zinc-900 leading-[1.1] tracking-tighter"
                        >계약 10건</span
                    >
                </h1>

                <div
                    in:scale={{ duration: 600, delay: 800, easing: elasticOut }}
                    class="bg-[#3366FF] text-white px-6 py-3 rounded-xl shadow-lg mb-8 font-bold text-lg"
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
                        class="text-[85px] font-[1000] text-zinc-900 italic leading-none tracking-tighter"
                        >NO!</span
                    >
                </div>

                <div in:fade={{ duration: 800, delay: 1600 }}>
                    <p
                        class="text-[28px] font-black text-zinc-800 leading-tight"
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
                    class="text-[17px] font-medium opacity-90 leading-relaxed mb-8"
                >
                    탑분양은 이미 대부분의 현장에 투입되어 있습니다.<br />지금
                    광고가 자리가 있는지 확인해보세요.
                </p>
                <button
                    on:click={scrollToPerformance}
                    class="w-full bg-white text-zinc-900 text-lg font-black py-4 rounded-2xl active:scale-95 transition-transform shadow-xl"
                >
                    지금 바로 확인하기
                </button>
            </footer>
        {/if}
    </section>

    <section
        id="performance-section"
        class="relative min-h-screen bg-white py-20 px-5 flex flex-col"
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

        <div class="text-center mb-12 relative z-10">
            <h2
                class="text-[42px] font-black leading-tight tracking-tighter text-zinc-900"
            >
                <span class="text-[#F25C05]">2025년</span><br />
                <span class="text-[#F25C05]">10건</span> 이상 계약 쓴 현장
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
                            class="text-[13px] font-bold text-zinc-700 leading-tight"
                        >
                            {project.name}
                        </p>
                    </div>
                </div>
            {/each}
        </div>

        <div class="mt-20 text-center pb-10">
            <p
                class="text-[36px] font-black text-[#F25C05] tracking-tighter italic animate-bounce"
            >
                그 외 다수 현장!
            </p>
            <div class="mt-4 w-12 h-1 bg-zinc-200 mx-auto rounded-full"></div>
        </div>
    </section>
</div>

<!-- 3페이지 /  -->

<div
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

    {#if visible}
        <div
            class="w-full px-6 py-16 z-10 flex flex-col items-center text-center"
        >
            <h2
                in:fly={{ y: 30, duration: 800 }}
                class="text-[44px] font-black leading-none tracking-tighter text-zinc-900 mb-8"
            >
                <span class="text-blue-600">탑분양은?</span><br />
                현장을 먼저 봅니다
            </h2>

            <div
                in:fly={{ y: 30, duration: 800, delay: 200 }}
                class="w-full bg-white border border-blue-100 rounded-2xl p-6 shadow-sm mb-4"
            >
                <p class="text-lg font-bold text-zinc-800 leading-snug">
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
                in:fly={{ y: 30, duration: 800, delay: 400 }}
                class="w-full bg-white border-2 border-blue-600 rounded-3xl p-6 shadow-md mb-8"
            >
                <h3
                    class="text-[25px] font-black text-zinc-900 mb-3 leading-tight"
                >
                    계약이 나올 수 밖에 없는<br />타겟팅을 합니다
                </h3>
                <p
                    class="text-[15px] text-zinc-700 font-semibold leading-relaxed"
                >
                    21년부터 4년간 쌓인 분양 가망 <span
                        class="text-red-500 font-bold border-b-2 border-red-100"
                        >고객 총 900만명+정밀 타겟팅.</span
                    ><br />
                    탑분양의 계약 그물에 걸릴 수 밖에 없습니다.
                </p>
            </div>

            <div
                in:scale={{ duration: 800, delay: 600, easing: backOut }}
                class="w-full bg-zinc-900 rounded-[40px] p-8 shadow-2xl text-white relative"
            >
                <h3
                    class="text-[34px] font-black leading-tight mb-4 tracking-tighter"
                >
                    모두 중요하지만,<br />가장 중요한건 케어
                </h3>
                <p class="text-lg opacity-80 mb-4 font-bold">
                    광고만 송출하면 끝!?
                </p>

                <div class="mb-5">
                    <span
                        class="highlighter text-[23px] px-2 py-1 inline-block rounded-sm"
                        class:active={visible}
                    >
                        그럼 절대 계약까지 갈 수 없습니다.
                    </span>
                </div>

                <p class="text-lg opacity-80 mb-2 font-bold">
                    탑분양은 지속적으로 피드백을 체크하며,
                </p>

                <h4
                    class="text-[30px] font-black text-red-500 mb-8 tracking-tighter"
                >
                    <span class="red-underline" class:active={visible}
                        >광고를 발전시켜 갑니다.</span
                    >
                </h4>

                <ul
                    class="text-left inline-block space-y-3 font-bold text-[17px] opacity-100 mb-4"
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

    <div
        class="mt-auto w-full bg-blue-600 text-white py-8 text-center shadow-lg"
    >
        <p class="text-[28px] font-black tracking-tighter">
            탑분양은 계약을 설계합니다.
        </p>
    </div>
</div>

<section
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

    {#if visible}
        <div
            class="w-full px-6 py-16 z-10 flex flex-col items-center text-center"
        >
            <h2
                in:fly={{ y: 20, duration: 800 }}
                class="text-[42px] font-black text-[#EF4444] leading-tight tracking-tighter mb-4"
            >
                계약에 집중하는 이유는?
            </h2>

            <p
                in:fade={{ delay: 400 }}
                class="text-[22px] font-medium text-zinc-500 mb-10 tracking-tight"
            >
                광고비 비싸던데, 돈만 버리는거아냐?
            </p>

            <div
                in:fly={{ y: 20, duration: 800, delay: 600 }}
                class="space-y-2 mb-12"
            >
                <p class="text-[20px] font-bold text-zinc-800 leading-snug">
                    탑분양은 모든 광고비를<br />
                    광고로만 사용합니다.
                </p>
                <p class="text-[20px] font-bold text-zinc-800 leading-snug">
                    그렇기 때문에, <span
                        class="blue-underline"
                        class:active={visible}>30%의 수수료</span
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
                        src="https://via.placeholder.com/400x500/F3F4F6/000000?text=Business+Woman"
                        alt="전문 상담사"
                        class="w-full h-auto object-cover"
                    />
                </div>

                <div
                    in:fly={{ x: -30, delay: 1200 }}
                    class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-zinc-800 text-white px-8 py-3 rounded-md shadow-xl"
                >
                    <p class="text-[18px] font-bold tracking-tight">
                        탑분양은 150만원 부터
                    </p>
                </div>
            </div>

            <div
                in:fly={{ y: 30, duration: 800, delay: 1500 }}
                class="mt-8 space-y-1"
            >
                <p class="text-[28px] font-bold text-zinc-800 tracking-tighter">
                    150만 원 으로
                </p>
                <h3
                    class="text-[48px] font-[1000] text-[#EF4444] leading-none tracking-tighter italic"
                >
                    월 최대 13건 계약 사례
                </h3>
            </div>
        </div>
    {/if}

    <div class="mt-auto w-full py-10 bg-white"></div>
</section>

<!-- 5페이지 / 10번 이미지 -->

<section
    class="relative min-h-screen max-w-[650px] mx-auto bg-zinc-950 flex flex-col items-center overflow-hidden font-sans shadow-2xl border-x border-zinc-900"
>
    {#if visible}
        <div in:fly={{ y: -20, duration: 1000 }} class="mt-16 z-10 px-6">
            <p
                class="text-[20px] font-medium text-zinc-300 tracking-tight text-center"
            >
                " 우리 현장은 온라인 광고가 안먹혀~ "
            </p>
        </div>

        <div
            class="relative flex-grow flex flex-col items-center justify-center w-full z-10"
        >
            <div
                in:fade={{ duration: 1500, delay: 500 }}
                class="absolute top-10 w-full flex justify-center opacity-60"
            >
                <img
                    src="https://via.placeholder.com/400x600/000000/FFFFFF?text=Man+in+Suit"
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
                class="bg-zinc-900/90 backdrop-blur-sm px-10 py-6 border border-zinc-800 z-20"
            >
                <h2
                    class="text-[64px] font-black text-white leading-none tracking-tighter text-glow"
                >
                    "아 닙 니 다"
                </h2>
            </div>
        </div>

        <div class="w-full relative z-20 px-6 pb-20 text-center">
            <div
                in:fly={{ y: 20, duration: 800, delay: 1800 }}
                class="mb-8 space-y-2"
            >
                <p class="text-[20px] font-bold text-zinc-100 leading-snug">
                    현장에 대한 이해도가 떨어지고,<br />
                    기획력이 부족한 겁니다.
                </p>
                <p class="text-[18px] font-medium text-zinc-400">
                    조건이 까다로운 현장일수록!
                </p>
            </div>

            <h3
                in:fly={{ y: 30, duration: 1000, delay: 2400, easing: backOut }}
                class="text-[44px] font-black text-white leading-tight tracking-tighter text-glow"
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
            <img
                src="https://via.placeholder.com/600x400/000000/FF4500?text=Fire+Flame"
                alt="fire"
                class="animate-fire absolute bottom-[-50px] w-full h-auto object-cover mix-blend-screen opacity-50"
            />
        </div>
    {/if}
</section>

<!-- 6페이지 / 11번 이미지 -->

<section
    class="relative min-h-screen max-w-[650px] mx-auto bg-white flex flex-col items-center overflow-hidden font-sans shadow-2xl mt-10"
>
    {#if visible}
        <div
            class="w-full px-6 py-16 z-10 flex flex-col items-center text-center"
        >
            <h2
                in:fade={{ duration: 800 }}
                class="text-[32px] font-black text-zinc-800 leading-tight mb-12"
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
                    class="flex flex-col items-center"
                >
                    <p class="text-zinc-500 font-bold mb-2">
                        [A현장] 5개월 운영 ↓
                    </p>
                    <div
                        class="bg-zinc-800 text-white w-full py-3 rounded-md shadow-lg"
                    >
                        <p class="text-[18px] font-bold tracking-tight">
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
                    <p class="text-zinc-500 font-bold mb-2">
                        [B현장] 2개월 운영 ↓
                    </p>
                    <div
                        class="bg-zinc-800 text-white w-full py-3 rounded-md shadow-lg"
                    >
                        <p class="text-[18px] font-bold tracking-tight">
                            수수료 1,500만원 × 5건 = <span
                                class="text-orange-400">7,500만원</span
                            >
                        </p>
                    </div>
                </div>
            </div>

            <div in:fade={{ delay: 2800 }} class="mb-10">
                <p class="text-zinc-400 font-bold mb-4">
                    모두가 계약을 쉽게 쓴다는 거짓말은 하지않겠습니다
                </p>
                <h3
                    class="text-[54px] font-black text-zinc-800 tracking-tighter leading-none italic"
                >
                    " 하지만 "
                </h3>
            </div>

            <div in:fly={{ y: 20, delay: 3500 }} class="space-y-2">
                <p class="text-[24px] font-bold text-zinc-800 leading-tight">
                    <span class="text-red-500">‘영업에 자신 있는 팀’</span>과
                    함께라면
                </p>
                <p
                    class="text-[24px] font-black text-zinc-900 leading-tight tracking-tighter"
                >
                    우리는 콜을 <span class="bg-zinc-100 px-1"
                        >‘계약 가능한 콜’</span
                    >로 바꿉니다.
                </p>
            </div>
        </div>
    {/if}
</section>

<!-- 7페이지 12번 이미지 -->

<section
    class="relative min-h-screen max-w-[650px] mx-auto bg-white flex flex-col items-center overflow-hidden font-sans shadow-2xl bg-soft"
>
    <div class="absolute inset-0 pointer-events-none opacity-40 mt-10">
        <div
            class="bubble-ani absolute top-1/4 left-0 w-40 h-40 bg-gray-100 rounded-full blur-3xl"
        ></div>
    </div>

    {#if visible}
        <div
            class="w-full px-6 py-20 z-10 flex flex-col items-center text-center"
        >
            <div
                in:scale={{ duration: 1200, start: 0.9, easing: quintOut }}
                class="mb-10 w-full flex justify-center"
            >
                <div
                    class="relative w-4/5 aspect-video overflow-hidden rounded-full shadow-inner"
                >
                    <img
                        src="https://via.placeholder.com/600x400/F3F4F6/333333?text=Handshake"
                        alt="신뢰의 악수"
                        class="w-full h-full object-cover grayscale opacity-90"
                    />
                </div>
            </div>

            <h2
                in:fly={{ y: 20, duration: 800, delay: 400 }}
                class="text-[34px] font-black text-zinc-800 leading-tight tracking-tighter mb-8"
            >
                소통할수록 결과는 좋아집니다
            </h2>

            <div in:fade={{ delay: 800 }} class="space-y-4 mb-10">
                <p class="text-[18px] font-bold text-zinc-700 leading-relaxed">
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
                <span class="text-[18px] font-bold tracking-widest uppercase"
                    >우리의 소통 방식은,</span
                >
            </div>

            <div in:fade={{ delay: 1600 }} class="space-y-2 mb-14">
                <p class="text-[17px] font-semibold text-zinc-600">
                    클라이언트의 컨펌으로 이루어 지며,
                </p>
                <p class="text-[17px] font-semibold text-zinc-600">
                    피드백 / 현장 반응을 즉시 반영 합니다.
                </p>
                <p class="text-[17px] font-semibold text-zinc-600">
                    계약 결과를 통해, 다음 방향성을 함께 잡습니다.
                </p>
            </div>

            <div in:scale={{ start: 0.9, delay: 2000 }} class="space-y-6">
                <h3
                    class="text-[40px] font-black text-zinc-900 tracking-tighter"
                >
                    그렇기 때문에,
                </h3>

                <div
                    in:fly={{ y: 20, delay: 2400, easing: backOut }}
                    class="bg-zinc-800 text-white px-6 py-4 rounded-md shadow-xl inline-block"
                >
                    <p
                        class="text-[20px] font-bold tracking-tight leading-none"
                    >
                        한 번에 많은 현장을 진행하진 못합니다
                    </p>
                </div>
            </div>

            <div in:fade={{ delay: 2800 }} class="mt-12">
                <p class="text-[18px] font-medium text-zinc-500 mb-1">그만큼</p>
                <p class="text-[22px] font-black text-zinc-800 tracking-tight">
                    함께 움직일 수 있는 현장과 더 좋은 결과를 만듭니다.
                </p>
            </div>
        </div>
    {/if}
</section>

<!-- 8페이지 / 13번 이미지 -->

<section
    class="relative min-h-screen max-w-[650px] mx-auto bg-closing flex flex-col items-center justify-center overflow-hidden font-sans shadow-2xl"
>
    {#if visible}
        <div class="w-full px-8 flex flex-col items-center text-center z-10">
            <div in:fade={{ duration: 1500 }} class="mb-10 opacity-30">
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#444"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    /><circle cx="12" cy="7" r="4" />
                </svg>
            </div>

            <div class="space-y-2 mb-8">
                <h2
                    in:fly={{ y: 20, duration: 800 }}
                    class="text-[32px] font-black text-zinc-800 leading-tight tracking-tighter"
                >
                    감사히도 많은 분들이 찾아주셔서,<br />
                    광고 자리가 많지 않습니다.
                </h2>

                <h3
                    in:fly={{ y: 20, duration: 800, delay: 400 }}
                    class="text-[46px] font-black text-zinc-700 tracking-widest italic mt-4 mb-6"
                >
                    "죄송합니다"
                </h3>
            </div>

            <div in:fade={{ delay: 1000 }} class="space-y-6 mb-12">
                <p class="text-[18px] font-bold text-zinc-500 leading-relaxed">
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
                    on:click={handleContact}
                    class="animate-pulse-custom w-full bg-zinc-900 text-white text-[22px] font-black py-6 rounded-md shadow-2xl active:scale-95 transition-transform"
                >
                    [광고 가능 여부 확인]
                </button>
            </div>

            <div in:fade={{ delay: 2000 }} class="mt-16 text-zinc-300">
                <p class="text-sm font-bold tracking-widest uppercase">
                    Top Bunyang Partner Group
                </p>
            </div>
        </div>
    {/if}

    <div class="absolute bottom-0 w-full h-2 bg-zinc-900"></div>
</section>

<style>
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
        background-color: #f8f9fa;
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
</style>

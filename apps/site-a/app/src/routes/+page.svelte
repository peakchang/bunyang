<script>
    import { onMount } from "svelte";

    let main1;
    let hasAnimated = false;
    let text1 = "";
    let text2 = "";
    let showNo = false;
    let text3 = "";

    const fullText1 = "한 현장";
    const fullText2 = "계약 10건";
    const fullText3 = "탑분양을 이용 중 입니다.";

    async function startAnimation() {
        console.log("startAnimation!!!");

        // 1. "한 현장" 한글자씩
        for (let i = 0; i <= fullText1.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 50));
            text1 = fullText1.slice(0, i);
        }

        // "계약 10건" 한글자씩
        for (let i = 0; i <= fullText2.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 50));
            text2 = fullText2.slice(0, i);
        }

        // 2. "NO!" 쾅! 등장
        await new Promise((resolve) => setTimeout(resolve, 300));
        showNo = true;

        // 3. "탑분양을 이용 중 입니다." 한글자씩
        await new Promise((resolve) => setTimeout(resolve, 500));
        for (let i = 0; i <= fullText3.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 50));
            text3 = fullText3.slice(0, i);
        }
    }

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        hasAnimated = true;
                        startAnimation();
                    }
                });
            },
            { threshold: 0.3 },
        );

        if (main1) {
            observer.observe(main1);
        }

        return () => observer.disconnect();
    });
</script>

<div class="max-w-[1080px] mx-auto">
    <div class="main1 mb-5" bind:this={main1}>
        <div class="main1_top_content paper-font font-extrabold lea">
            <div>{text1}</div>
            <div>{text2}</div>
        </div>
        <div class="main1_bottom_content paper-font">
            <div class="main1_bt_no font-extrabold" class:show={showNo}>
                NO!
            </div>
            <div class="main1_bt_use font-semibold">{text3}</div>
        </div>
    </div>

    <div class="mb-5">
        <img src="/main_img/2.gif" alt="" />
    </div>

    <div
        class="main3 bg-black text-yellow-200 p-5 paper-font font-semibold text-center mb-5"
    >
        <p>2025년</p>
        <p>10건 이상 계약 쓴 현장</p>

        <div>
            <img src="/main_img/hylist/1111.jpg" alt="" class="mb-3" />
            <img src="/main_img/hylist/2222.jpg" alt="" class="mb-3" />
            <img src="/main_img/hylist/3333.jpg" alt="" class="mb-3" />
            <img src="/main_img/hylist/4444.jpg" alt="" class="mb-3" />
        </div>
    </div>

    <div class=" h-96"></div>
</div>

<style>
    .main3 {
        font-size: clamp(2rem, 9cqi, 6rem);
    }
    .main1 {
        background-image: url("/main_img/1.jpg");
        width: 100%;
        aspect-ratio: 1080 / 1417;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        font-weight: 600;
        container-type: inline-size;
    }

    .main1_top_content {
        text-align: center;
        padding-top: 16%;
        font-size: clamp(4rem, 14cqi, 8.5rem);
    }

    .main1_top_content p {
        min-height: 1.2em;
    }

    .main1_bottom_content {
        text-align: center;
        margin-top: 15%;
    }

    .main1_bt_no {
        font-size: clamp(4rem, 14cqi, 9rem);
        opacity: 0;
        transform: scale(0.5);
        transition: none;
    }

    .main1_bt_no.show {
        animation: bang 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    }

    @keyframes bang {
        0% {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
        }
        50% {
            transform: scale(1.2) rotate(5deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }

    .main1_bt_use {
        font-size: clamp(2rem, 6cqi, 4rem);
        min-height: 1.2em;
    }

    @keyframes blink {
        0%,
        50% {
            opacity: 1;
        }
        51%,
        100% {
            opacity: 0;
        }
    }
</style>

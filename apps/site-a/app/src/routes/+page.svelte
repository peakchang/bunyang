<script>
    import { onMount } from "svelte";
    import { fly, fade, scale } from "svelte/transition";
    import { elasticOut } from "svelte/easing";

    // 애니메이션 상태 제어
    let step1Visible = false;
    let step2Visible = false;
    let step3Visible = false;

    const fullText = "한 현장 계약 10건";
    let displayedText = "";

    onMount(() => {
        // 1단계: 타이핑 효과 시작
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                displayedText += fullText[i];
                i++;
            } else {
                clearInterval(typingInterval);
                // 타이핑 종료 후 0.5초 뒤 2단계(NO!) 시작
                setTimeout(() => {
                    step2Visible = true;
                }, 500);
            }
        }, 100); // 타이핑 속도 (0.1초)
    });

    // 2단계(NO!)가 켜지면 0.8초 뒤 3단계 시작
    $: if (step2Visible) {
        setTimeout(() => {
            step3Visible = true;
        }, 800);
    }
</script>

<div class=" max-w-[1080px] mx-auto">
    <div class="main1">
        <div class="main1_top_content nanumneo-font font-extrabold">
            <p>한 현장</p>
            <p>계약 10건</p>
        </div>
        <div class="main1_bottom_content">
            <div>NO!</div>
            <div>탑분양을 이용 중 입니다.
            </div>
        </div>
    </div>
</div>

<div class="container">
    <h1 class="headline">
        {#each displayedText as char}
            <span>{char}</span>
        {/each}
    </h1>

    <div class="blue-box">계약은 쓰던 사람만 쓴다구요?</div>

    {#if step2Visible}
        <div
            class="no-text"
            in:scale={{ duration: 400, start: 4, easing: elasticOut }}
        >
            NO!
        </div>
    {/if}

    {#if step3Visible}
        <div class="sub-text" in:fly={{ y: 30, duration: 800 }}>
            탑분양을 이용 중 입니다.
        </div>
    {/if}
</div>

<style>
    .main1 {
        background-image: url("/main_img/1.jpg");
        width: 100%; /* 부모의 가로에 꽉 차게 */

        /* 높이를 지정하지 않아도 aspect-ratio가 높이를 자동으로 계산합니다 */
        aspect-ratio: 1080 / 1417;

        /* 배경 이미지를 박스 크기에 맞게 조절 */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        font-weight: 600;
    }

    .main1_top_content {
        text-align: center;
        padding-top: 17%;
        font-size: clamp(4rem, 9vw, 9rem);
    }

    .main1_bottom_content{
        text-align: center;
        margin-top: 15%;
    }

    /* ************************************************** */
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: "Pretendard", sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
    }

    .headline {
        font-size: 3rem;
        font-weight: 900;
        margin-bottom: 20px;
        height: 1.2em; /* 높이 고정으로 레이아웃 흔들림 방지 */
    }

    .blue-box {
        background-color: #3b82f6;
        color: white;
        padding: 10px 40px;
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 30px;
    }

    .no-text {
        font-size: 6rem;
        font-weight: 900;
        color: #222;
        margin-bottom: 20px;
        /* 쾅! 하는 느낌을 위해 그림자 살짝 추가 가능 */
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }

    .sub-text {
        font-size: 2rem;
        font-weight: 700;
        color: #333;
    }
</style>

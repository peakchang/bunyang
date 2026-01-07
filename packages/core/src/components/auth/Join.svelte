<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    import { user_info } from "$core/store.js";
    import { back_api } from "$core/const.js";

    import axios from "axios";

    let siteName = $state("");

    if (import.meta.env.VITE_BUCKET.includes("adpeak")) {
        siteName = "탑분양";
    } else if (import.meta.env.VITE_BUCKET.includes("with")) {
        siteName = "위드분양";
    } else {
        siteName = "리치분양";
    }

    let userId = $state("");
    let userIdAlertBool = $state(true);

    let userName = $state("");
    let userPhone = $state("");
    let userEmail = $state("");

    let userPwd = $state("");
    let userPwdChk = $state("");

    $effect(() => {
        if ($user_info.id) {
            alert("이미 회원입니다.");
            goto("/");
        }
    });

    // 아이디 입력 란 포커스 아웃시 중복 아이디 체크
    async function idFocusOut() {
        try {
            if (userId) {
                const res = await axios.post(
                    `${back_api}/auth/id_duplicate_chk`,
                    {
                        userId,
                    },
                );

                console.log(res.data);

                // 응답으로 존재 여부를 받아서 처리
                if (res.data.exists) {
                    userIdAlertBool = false;
                } else {
                    userIdAlertBool = true;
                }
            }
        } catch (error) {
            console.error("오류 발생:", error.message);
        }
    }

    // 회원가입 완료 창, 이메일은 포커스 아웃 안하고 에러처리만 함, 기타 내용은 코드 참고
    async function joinSubmit() {
        if (userIdAlertBool == false) {
            alert("아이디 중복 됩니다.");
            return;
        }
        if (!userId) {
            alert("아이디를 입력하세요.");
            return;
        }
        if (!userName) {
            alert("이름을 입력하세요.");
            return;
        }
        if (!userPhone) {
            alert("휴대폰 번호를 입력하세요.");
            return;
        }
        if (!userEmail) {
            alert("이메일 주소를 입력하세요.");
            return;
        }
        if (userPwd != userPwdChk) {
            alert("비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        const resPhone = userPhone.replace(/[^\w]/g, "");
        console.log(resPhone);
        try {
            const res = await axios.post(`${back_api}/auth/register`, {
                userid: userId,
                user_email: userEmail,
                user_phone: userPhone,
                nick: userName,
                password: userPwd,
            });
            alert("회원가입 성공! 로그인을 완료 해주세요.");
            goto("/auth/login");
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                console.error("네트워크 에러 발생! 잠시 후 다시 시도해주세요!");
            }
        }
    }
</script>

<!-- svelte-ignore event_directive_deprecated -->
<div id="container-wrapper">
    <div class="container">
        <h2 class="text-2xl">{siteName} 회원가입</h2>

        <form on:submit={joinSubmit}>
            <div class="input-group">
                <label for="username">아이디</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        id="username"
                        placeholder="아이디를 입력하세요"
                        class={userIdAlertBool ? "" : "alert-input"}
                        on:focusout={idFocusOut}
                        bind:value={userId}
                    />
                    <svg
                        class="input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>

                {#if !userIdAlertBool}
                    <div class=" text-right text-red-400 pr-2 mt-0.5">
                        <span class="text-sm"> 중복된 아이디 입니다. </span>
                    </div>
                {/if}
            </div>

            <div class="input-group">
                <label for="username">이름</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        id="username"
                        placeholder="성함을 입력하세요"
                        bind:value={userName}
                    />
                    <svg
                        class="input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
            </div>

            <div class="input-group">
                <label for="useremail">이메일</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        id="useremail"
                        placeholder="이메일 주소를 입력하세요"
                        bind:value={userEmail}
                    />
                    <svg
                        class="input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path
                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        ></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </div>
            </div>

            <div class="input-group">
                <label for="userphone">휴대폰번호</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        id="userphone"
                        placeholder="전화번호를 입력하세요"
                        bind:value={userPhone}
                    />
                    <svg
                        class="input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"
                        ></rect>
                        <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </svg>
                </div>
            </div>

            <div class="input-group">
                <label for="password">비밀번호</label>
                <div class="input-wrapper">
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력하세요"
                        bind:value={userPwd}
                    />
                    <svg
                        class="input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>

                <!-- svelte-ignore element_invalid_self_closing_tag -->
                <div class=" h-2" />

                <div class="input-wrapper">
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호 확인을 입력하세요"
                        bind:value={userPwdChk}
                    />
                    <svg
                        class="input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
            </div>

            <!-- <div class="input-group">
                <label for="search">검색</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        id="search"
                        placeholder="검색어를 입력하세요"
                    />
                    <svg
                        class="input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </div>
            </div> -->

            <button type="submit">로그인</button>
        </form>
    </div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #container-wrapper {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .container {
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        width: 100%;
        max-width: 500px;
    }

    h2 {
        margin-bottom: 30px;
        color: #333;
        text-align: center;
    }

    .input-group {
        position: relative;
        margin-bottom: 15px;
    }

    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .input-icon {
        position: absolute;
        left: 15px;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 1;
    }

    input {
        width: 100%;
        padding: 15px 15px 15px 50px;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        font-size: 16px;
        transition: all 0.3s ease;
        outline: none;
    }

    .alert-input {
        border-color: #ff4848;
    }

    input:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    label {
        display: block;
        margin-bottom: 8px;
        color: #555;
        font-weight: 500;
        font-size: 14px;
    }

    button {
        width: 100%;
        padding: 15px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        margin-top: 10px;
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }

    button:active {
        transform: translateY(0);
    }
</style>
